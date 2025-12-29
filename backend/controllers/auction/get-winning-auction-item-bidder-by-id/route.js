import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { AuctionWinningBidder } from '../../../models/auctionWinningBidderModel.js';
import { Auction } from '../../../models/auctionModel.js';

/**
 @desc    Get winning auction item bidder by id
 @route   GET /api/auction/winning-bidder/:winningBidderId
 @access  Public
*/
const getWinningAuctionItemBidderById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const auctionWinningBidder = await AuctionWinningBidder.findById(id).populate([
      { path: 'auctionItems', populate: [{ path: 'photos' }] },
      { path: 'user', select: 'name email shippingAddress' },
    ]);

    const auction = await Auction.findById(auctionWinningBidder.auction);

    const winningAuctionItemBidderWithCustomAuctionLink = {
      ...auctionWinningBidder.toObject(),
      customAuctionLink: auction.customAuctionLink,
    };

    res.status(200).json({ winningAuctionItemBidderWithCustomAuctionLink });
  } catch (err) {
    await Error.create({
      functionName: 'GET_WINNING_BIDDER',
      name: err.name,
      message: err.message,
    });

    res.status(500).send({
      message: `Error feteching winning bidder`,
    });
  }
});

export default getWinningAuctionItemBidderById;
