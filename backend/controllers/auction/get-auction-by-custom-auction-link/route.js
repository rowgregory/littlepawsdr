import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Auction } from '../../../models/auctionModel.js';
import { auctionPopulateFields } from '../../../db/populateQueries.js';

/**
 @desc    Get auction by custom auction link 
 @route   GET /api/auction/custom-auction-link/:customAuctionLink
 @access  Public
*/
const getAuctionByCustomAuctionLink = asyncHandler(async (req, res) => {
  try {
    const { customAuctionLink } = req.params;

    const auction = await Auction.findOne({
      customAuctionLink,
    }).populate(auctionPopulateFields);

    res.status(200).json({ auction });
  } catch (err) {
    await Error.create({
      functionName: 'GET_AUCTION_BY_CUSTOM_AUCTION_LINK',
      name: err.name,
      message: err.message,
    });

    res.status(500).send({
      message: 'Failed to get auction by custom auction link',
    });
  }
});

export default getAuctionByCustomAuctionLink;
