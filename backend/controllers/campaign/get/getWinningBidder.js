import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { AuctionWinningBidder, Campaign } from '../../../models/campaignModel.js';

/**
 @desc    Get winning auction item bidder
 @route   GET /api/campaign/auction/winning-bidder/:id
 @access  Public
*/
const getWinningBidder = asyncHandler(async (req, res) => {
  try {
    const winner = await AuctionWinningBidder.findById(req.params.id).populate([
      { path: 'auctionItem', populate: [{ path: 'photos' }] },
      { path: 'user', select: 'name email shippingAddress' },
    ]);

    const campaign = await Campaign.findOne({ auction: winner.auction });

    const winningBidder = {
      ...winner.toObject(),
      theme: campaign.themeColor,
      customCampaignLink: campaign.customCampaignLink,
    };

    res.status(200).json({ winningBidder });
  } catch (err) {
    await Error.create({
      functionName: 'GET_WINNING_BIDDER_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error feteching winning bidder`,
      sliceName: 'campaignApi',
    });
  }
});

export default getWinningBidder;
