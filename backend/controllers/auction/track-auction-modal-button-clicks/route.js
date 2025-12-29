import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Auction } from '../../../models/auctionModel.js';

const trackAuctionModalButtonClick = asyncHandler(async (req, res) => {
  try {
    const { auctionId } = req.body;

    await Auction.findByIdAndUpdate(
      auctionId,
      { $inc: { 'modalButtonClicks.clickCount': 1 } },
      { new: false }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    await Error.create({
      functionName: 'ERROR_TRACKING_AUCTION_MODAL_BUTTON_CLICK',
      name: err.name,
      message: err.message,
      ...(req?.user?._id && { user: { id: req?.user?._id, email: req?.user?.email } }),
    });

    res.status(500).send({
      message: 'Error tracking auction modal button click',
    });
  }
});

export default trackAuctionModalButtonClick;
