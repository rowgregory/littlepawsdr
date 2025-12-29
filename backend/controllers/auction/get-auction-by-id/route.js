import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { auctionPopulateFields } from '../../../db/populateQueries.js';
import { Auction } from '../../../models/auctionModel.js';

/**
 @desc    Get auction
 @route   GET /api/auction/:id
 @access  Private/Admin
*/
const getAuctionById = asyncHandler(async (req, res) => {
  try {
    const { auctionId } = req.params;

    const auction = await Auction.findById(auctionId).populate(auctionPopulateFields);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    res.status(200).json({ auction });
  } catch (err) {
    await Error.create({
      functionName: 'ADMIN_GET_AUCTION_BY_ID',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({ message: `Failed to get auction by id` });
  }
});

export default getAuctionById;
