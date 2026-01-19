import { AuctionItem } from '../../../models/auctionItemModel.js';
import { AuctionItemPhoto } from '../../../models/auctionItemPhotoModel.js';
import asyncHandler from 'express-async-handler';

/**
 @desc    Update auction item
 @route   PUT /api/auction/auction/item
 @access  Private/Admin
*/
const updateAuctionItem = asyncHandler(async (req, res) => {
  try {
    const auctionItem = await AuctionItem.findById(req.body.id)
      .populate('photos')
      .populate('auction');
    if (!auctionItem) return res.status(404).json({ message: 'Auction item not found' });

    // Check if auction is live
    const isAuctionLive = auctionItem.auction?.status === 'ACTIVE';

    // Fields that can ONLY be updated when auction is NOT live
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

    // Handle photo updates (always allowed)
    const newPhotosToCreate =
      req.body.photos?.filter(
        (bodyPhoto) =>
          !auctionItem.photos.some((auctionItemPhoto) =>
            auctionItemPhoto._id.equals(bodyPhoto._id),
          ),
      ) || [];

    const auctionItemPhotos = await Promise.all(
      newPhotosToCreate.map(async (photo) => {
        const existingPhoto = await AuctionItemPhoto.findOne({ _id: photo._id });

        if (!existingPhoto) {
          return await AuctionItemPhoto.create({
            name: photo.name,
            url: photo.url,
            size: photo.size,
          });
        } else {
          return existingPhoto;
        }
      }),
    );

    const newPhotoIds = auctionItemPhotos.map((photo) => photo._id);
    const updatedPhotoIds = [
      ...new Set([...auctionItem.photos.map((photo) => photo._id), ...newPhotoIds]),
    ];

    // Build update object - filter out restricted fields if auction is live
    const updateData = Object.keys(req.body).reduce(
      (acc, key) => {
        if (key === 'id') return acc; // Skip id field
        if (key === 'photos') return acc; // Handle photos separately
        if (isAuctionLive && restrictedFields.includes(key)) return acc; // Skip restricted fields when live
        acc[key] = req.body[key];
        return acc;
      },
      { photos: updatedPhotoIds },
    );

    const updatedAuctionItem = await AuctionItem.findByIdAndUpdate(auctionItem._id, updateData, {
      new: true,
    }).populate('photos');

    res.status(200).json({
      auctionItem: updatedAuctionItem,
      message: isAuctionLive
        ? 'Auction item updated (limited fields during live auction)'
        : 'Successfully updated auction item!',
    });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_AUCTION_ITEM_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error updating auction item`,
    });
  }
});

export default updateAuctionItem;
