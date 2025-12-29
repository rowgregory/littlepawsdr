import asyncHandler from 'express-async-handler';
import { Auction } from '../../../models/auctionModel.js';
import Error from '../../../models/errorModel.js';

/**
 @desc    Create an auction
 @route   POST /api/auction
 @access  Private/Admin
*/
const createAuction = asyncHandler(async (req, res) => {
  try {
    const { text } = req.body;
    const auction = await Auction.create({
      title: text,
      customAuctionLink: text.substring(0, 6).toUpperCase().replace(/\s+/g, ''),
    });

    res.status(201).json({ auction, message: 'Auction created successfully!' });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_AUCTION_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({ message: `Error creating auction` });
  }
});

export default createAuction;
