import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { AuctionItemInstantBuyer } from '../../../models/auctionItemInstantBuyerModel.js';

/**
 @desc    Update aution
 @route   PUT /api/auction/item/:id/update-instant-buyer-shipping-address
 @access  Private/Admin
*/
const updateAuctionItemInstantBuyerShippingStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const auction = await AuctionItemInstantBuyer.findByIdAndUpdate(
      id,
      { shippingStatus: 'Complete' },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!auction) {
      return res.status(404).json({ message: 'Auction item instant buyer not found' });
    }

    res.status(200).json({ auction });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_AUCTION_ITEM_INSTANT_BUYER_SHIPPING_STATUS',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({ message: 'Error updating auction item instant buyer shipping status' });
  }
});

export default updateAuctionItemInstantBuyerShippingStatus;
