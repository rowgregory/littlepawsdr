import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Auction, AuctionItem, AuctionItemPhoto } from '../../../models/campaignModel.js';
import mongoose from 'mongoose';

/**
 @desc    Delete auction item
 @route   DELETE /api/campaign/auction/item/:auctionItemnId
 @access  Private/Admin
*/
const deleteAuctionItem = asyncHandler(async (req, res) => {
  const { auctionItemId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const auctionItem = await AuctionItem.findById(auctionItemId).session(session);

    if (auctionItem) {
      const photoIds = auctionItem.photos;

      await AuctionItemPhoto.deleteMany({ _id: { $in: photoIds } }).session(session);
    }

    await Auction.findByIdAndUpdate(
      auctionItem.auction,
      { $pull: { items: auctionItemId } },
      { new: true }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    await auctionItem.deleteOne();

    res.status(200).json({
      message: 'Auction item deleted',
      sliceName: 'campaignApi',
    });
  } catch (err) {
    await Error.create({
      functionName: 'GET_CAMPAIGNS_FOR_ADMIN_TABLE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error deleting auction item',
      sliceName: 'campaignApi',
    });
  }
});

export default deleteAuctionItem;
