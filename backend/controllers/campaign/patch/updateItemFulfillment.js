import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import {
  AuctionItemFulfillment,
  AuctionItemInstantBuyer,
  AuctionWinningBidder,
} from '../../../models/campaignModel.js';
import getTrackingService from '../../../utils/getTrackingService.js';
import { sendEmail } from '../../../utils/sendEmail.js';

/**
 @desc    Update auction item fulfillment
 @route   PATCH /api/campaign/auction/item-fulfillment
 @access  Private/Admin
*/
const updateItemFulfillment = asyncHandler(async (req, res) => {
  try {
    const auctionItemFulfillment = await AuctionItemFulfillment.findByIdAndUpdate(
      req.body.id,
      {
        shippingStatus: 'Complete',
        shippingProvider: getTrackingService(req.body.data.trackingNumber),
        trackingNumber: req.body.data.trackingNumber,
      },
      { new: true }
    );

    const populateAuctionItemFulfillment = await AuctionItemFulfillment.findById(
      auctionItemFulfillment?._id
    ).populate([
      { path: 'auctionItem', populate: [{ path: 'photos' }] },
      { path: 'user' },
      { path: 'winningBidder' },
      { path: 'instantBuyer' },
    ]);

    if (populateAuctionItemFulfillment.instantBuyer) {
      await AuctionItemInstantBuyer.findByIdAndUpdate(
        populateAuctionItemFulfillment.instantBuyer,
        {
          shippingProvider: populateAuctionItemFulfillment.shippingProvider,
          trackingNumber: populateAuctionItemFulfillment.trackingNumber,
          shippingStatus: 'Complete',
        },
        { new: true }
      );
    }

    if (populateAuctionItemFulfillment.winningBidder) {
      await AuctionWinningBidder.findOneAndUpdate(populateAuctionItemFulfillment.winningBidder, {
        shippingProvider: populateAuctionItemFulfillment.shippingProvider,
        trackingNumber: populateAuctionItemFulfillment.trackingNumber,
        shippingStatus: 'Complete',
      });
    }

    const objToSendToEmail = {
      email: populateAuctionItemFulfillment?.email,
      name: populateAuctionItemFulfillment?.auctionItem?.name,
      image: populateAuctionItemFulfillment?.auctionItem?.photos[0]?.url,
      shippingAddress: populateAuctionItemFulfillment?.user?.shippingAddress,
      shippingProvider: populateAuctionItemFulfillment?.shippingProvider,
      trackingNumber: populateAuctionItemFulfillment?.trackingNumber,
    };

    sendEmail(objToSendToEmail, 'AUCTION_ITEM_ORDER_SHIPPED_CONFIRMATION');

    res.status(200).json({
      message: 'Auction item fulfillment updated',
      shippingProvider: auctionItemFulfillment.shippingProvider,
      trackingNumber: auctionItemFulfillment.trackingNumber,
      sliceName: 'campaignApi',
    });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_AUCTION_ITEM_FULFILLMENT',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error updating item fulfillment`,
      sliceName: 'campaignApi',
    });
  }
});

export default updateItemFulfillment;
