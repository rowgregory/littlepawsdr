import { AuctionItem } from '../../../models/auctionItemModel.js';
import { AuctionItemPhoto } from '../../../models/auctionItemPhotoModel.js';
import asyncHandler from 'express-async-handler';

/**
 @desc    Update auction item
 @route   PUT /api/auction/auction/item
 @access  Private/Admin
*/
const updateAuctionItem = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const auctionItem = await AuctionItem.findById(req.body.id)
      .populate('photos')
      .populate('auction')
      .session(session);

    if (!auctionItem) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Auction item not found' });
    }

    const isAuctionLive = auctionItem.auction?.status === 'ACTIVE';

    // Fields that can ONLY be updated when the auction is NOT live
    const restrictedFields = [
      'sellingFormat',
      'startingPrice',
      'buyNowPrice',
      'requiresShipping',
      'shippingCosts',
      'minimumBid',
      'currentBid',
      'totalBids',
      'isAuction',
      'isFixed',
      'isDigital',
    ];

    // ---- 1. Resolve photos (batched, transaction-aware) ----
    // Body photos are the source of truth. Existing photos not present in the
    // body are detached; photos with no _id (or an _id that doesn't exist yet)
    // are created.
    const bodyPhotos = req.body.photos || [];

    // Look up which incoming _ids already exist (single round trip)
    const incomingIds = bodyPhotos.map((p) => p._id).filter(Boolean);
    const existingDocs = incomingIds.length
      ? await AuctionItemPhoto.find({ _id: { $in: incomingIds } }).session(session)
      : [];
    const existingIdSet = new Set(existingDocs.map((p) => String(p._id)));

    // Anything in the body without a known _id needs to be created
    const photosToCreate = bodyPhotos.filter((p) => !p._id || !existingIdSet.has(String(p._id)));

    const createdPhotos = photosToCreate.length
      ? await AuctionItemPhoto.insertMany(
          photosToCreate.map((p) => ({ name: p.name, url: p.url, size: p.size })),
          { session },
        )
      : [];

    // Final photo set = existing body photos that already exist + newly created
    const keptPhotoIds = existingDocs.map((p) => p._id);
    const finalPhotoIds = [...keptPhotoIds, ...createdPhotos.map((p) => p._id)];

    // Detach (and delete) photos that were removed from the item
    const finalIdSet = new Set(finalPhotoIds.map((id) => String(id)));
    const removedPhotoIds = auctionItem.photos
      .map((p) => p._id)
      .filter((id) => !finalIdSet.has(String(id)));

    if (removedPhotoIds.length) {
      await AuctionItemPhoto.deleteMany({ _id: { $in: removedPhotoIds } }, { session });
    }

    // ---- 2. Build the update object ----
    const droppedFields = [];
    const updateData = Object.keys(req.body).reduce(
      (acc, key) => {
        if (key === 'id' || key === 'photos') return acc;
        if (isAuctionLive && restrictedFields.includes(key)) {
          droppedFields.push(key);
          return acc;
        }
        acc[key] = req.body[key];
        return acc;
      },
      { photos: finalPhotoIds },
    );

    // ---- 3. Keep computed/bid fields consistent (non-live edits only) ----
    // Mirrors the create handler: currentBid/minimumBid track startingPrice,
    // and format flips null out the irrelevant fields.
    if (!isAuctionLive) {
      const nextFormat = updateData.sellingFormat ?? auctionItem.sellingFormat;

      if (nextFormat === 'auction') {
        const nextStarting =
          updateData.startingPrice != null ? updateData.startingPrice : auctionItem.startingPrice;

        updateData.isAuction = true;
        updateData.isFixed = false;
        updateData.isDigital = false;

        // Only reset bid fields if no bids have been placed yet
        if ((auctionItem.totalBids ?? 0) === 0) {
          updateData.currentBid = nextStarting;
          updateData.minimumBid = nextStarting;
          updateData.totalBids = 0;
        }
      } else if (nextFormat === 'fixed') {
        updateData.isAuction = false;
        updateData.isFixed = true;
        updateData.currentBid = null;
        updateData.minimumBid = null;
        updateData.totalBids = null;
      }
    }

    // ---- 4. Apply update ----
    const updatedAuctionItem = await AuctionItem.findByIdAndUpdate(auctionItem._id, updateData, {
      new: true,
      session,
    }).populate('photos');

    await session.commitTransaction();
    session.endSession();

    // ---- 5. Log (outside the transaction) ----
    await Log.create({
      journey: `UPDATE_AUCTION_ITEM_${auctionItem._id}`,
      events: [
        {
          message: 'AUCTION ITEM UPDATED SUCCESSFULLY',
          data: {
            auctionItemId: auctionItem._id,
            auctionId: auctionItem.auction?._id,
            itemName: updatedAuctionItem.name,
            photosKept: keptPhotoIds.length,
            photosCreated: createdPhotos.length,
            photosRemoved: removedPhotoIds.length,
            droppedFields,
            wasLive: isAuctionLive,
          },
        },
      ],
    });

    res.status(200).json({
      auctionItem: updatedAuctionItem,
      droppedFields: droppedFields.length ? droppedFields : undefined,
      message: isAuctionLive
        ? 'Auction item updated (some fields were locked during the live auction)'
        : 'Successfully updated auction item!',
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    await Error.create({
      functionName: 'UPDATE_AUCTION_ITEM_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({ message: 'Error updating auction item' });
  }
});

export default updateAuctionItem;
