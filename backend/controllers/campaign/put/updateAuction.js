import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Auction } from '../../../models/campaignModel.js';

/**
 @desc    Update aution
 @route   PUT /api/campaign/auction
 @access  Private/Admin
*/
const updateAuction = asyncHandler(async (req, res) => {
  try {
    const { type, ...rest } = req.body;

    const auction = await Auction.findById(req.body.id).populate([{ path: 'items', populate: [{ path: 'photos' }] }]);
    if (auction) {
      auction.settings = {
        ...auction.settings, // Keep existing settings
        ...rest.data, // Update with new fields
      };
    }

    await auction.save();

    res.status(201).json({ auction, message: 'Auction updated', type, sliceName: 'campaignApi' });
  } catch (err) {
    await Error.create({
      functionName: 'ERROR_UPDATE_AUCTION_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error updating auction`,
      sliceName: 'campaignApi',
    });
  }
});

export default updateAuction;
