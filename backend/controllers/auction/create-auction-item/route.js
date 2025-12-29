import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { AuctionItemPhoto } from '../../../models/auctionItemPhotoModel.js';
import { AuctionItem } from '../../../models/auctionItemModel.js';
import { Auction } from '../../../models/auctionModel.js';
import Log from '../../../models/logModel.js';

/**
 @desc    Create auction item
 @route   POST /api/auction/item
 @access  Private/Admin
*/
const createAuctionItem = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { auction, ...itemData } = req.body;

    let photoIds = [];

    // Batch create photos if they exist
    if (itemData.photos?.length > 0) {
      const photos = await AuctionItemPhoto.insertMany(
        itemData.photos.map((photo) => ({
          name: photo.name,
          url: photo.url,
          size: photo.size,
        })),
        { session }
      );
      photoIds = photos.map((photo) => photo._id);
    }

    // Create auction item with photo references
    const [auctionItem] = await AuctionItem.create(
      [
        {
          auction,
          name: itemData.name,
          description: itemData.description,
          sellingFormat: itemData.sellingFormat,
          startingPrice: itemData.startingPrice,
          buyNowPrice: itemData.buyNowPrice,
          totalQuantity: itemData.totalQuantity,
          requiresShipping: itemData.requiresShipping,
          shippingCosts: itemData.shippingCosts,
          photos: photoIds,
          // Computed fields
          isFixed: itemData.sellingFormat === 'fixed',
          isAuction: itemData.sellingFormat === 'auction',
          currentBid: itemData.sellingFormat === 'auction' ? itemData.startingPrice : null,
          minimumBid: itemData.sellingFormat === 'auction' ? itemData.startingPrice : null,
          totalBids: itemData.sellingFormat === 'auction' ? 0 : null,
          isDigital: itemData.sellingFormat === 'fixed' ? itemData.isDigital : false,
        },
      ],
      { session }
    );

    // Update auction with new item
    await Auction.findByIdAndUpdate(
      auction,
      { $push: { items: auctionItem._id } },
      { new: false, session }
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Return fully populated for Redux dispatch
    const populateItem = await auctionItem.populate('photos');

    // Create log entry
    await Log.create({
      journey: `CREATE_AUCTION_ITEM_${auctionItem._id}`,
      events: [
        {
          message: 'AUCTION ITEM CREATED SUCCESSFULLY',
          data: {
            auctionItemId: auctionItem._id,
            auctionId: auction,
            itemName: auctionItem.name,
            photosCount: photoIds.length,
          },
        },
      ],
    });

    res
      .status(201)
      .json({ auctionItem: populateItem, message: 'Successfully created an auction item!' });
  } catch (err) {
    await Error.create({
      functionName: 'ERROR_CREATE_AUCTION_ITEM_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error creating auction item',
    });
  }
});

export default createAuctionItem;
