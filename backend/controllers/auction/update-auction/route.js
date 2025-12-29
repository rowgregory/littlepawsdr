import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Auction } from '../../../models/auctionModel.js';

/**
 @desc    Update aution
 @route   PUT /api/auction
 @access  Private/Admin
*/
const updateAuction = asyncHandler(async (req, res) => {
  try {
    const { id, ...updates } = req.body;

    const auction = await Auction.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    res.status(200).json({ auction });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_AUCTION',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({ message: 'Error updating auction' });
  }
});

export default updateAuction;
