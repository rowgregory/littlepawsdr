import asyncHandler from 'express-async-handler';
import { Auction } from '../../../models/auctionModel.js';
import { auctionPopulateFields } from '../../../db/populateQueries.js';

// @desc    Get auctions
// @route   GET /api/auction/get-auctions
// @access  Public
const getAuctions = asyncHandler(async (req, res) => {
  try {
    const auctions = await Auction.find().populate(auctionPopulateFields).lean();

    res.status(200).json({ auctions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching auctions', error });
  }
});

export default getAuctions;
