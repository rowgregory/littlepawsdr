import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { AuctionItemPhoto } from '../../../models/auctionItemPhotoModel.js';
import { AuctionItem } from '../../../models/auctionItemModel.js';
import { Auction } from '../../../models/auctionModel.js';
import Error from '../../../models/errorModel.js';

/**
 @desc    Delete auction item
 @route   DELETE /api/auction/auction/item/:auctionItemnId
 @access  Private/Admin
*/
const deleteAuctionItem = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { auctionItemId } = req.params;

    const auctionItem = await AuctionItem.findById(auctionItemId).session(session);

    if (!auctionItem) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Auction item not found' });
    }

    // Delete photos
    if (auctionItem.photos?.length > 0) {
      await AuctionItemPhoto.deleteMany({ _id: { $in: auctionItem.photos } }).session(session);
    }

    // Remove from auction
    await Auction.findByIdAndUpdate(
      auctionItem.auction,
      { $pull: { items: auctionItemId } },
      { new: false }
    ).session(session);

    // Delete item
    await AuctionItem.findByIdAndDelete(auctionItemId).session(session);

    // Commit if all succeeds
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      id: auctionItemId,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    await Error.create({
      functionName: 'ADMIN_DELETE_AUCTION_ITEM',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error deleting auction item',
    });
  }
});

export default deleteAuctionItem;
