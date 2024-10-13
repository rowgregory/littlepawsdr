import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { AuctionItem } from '../../../models/campaignModel.js';
import mongoose from 'mongoose';

const auctionItemAggregate = (auctionItemId) => [
    { $match: { _id: new mongoose.Types.ObjectId(auctionItemId) } },
    {
      $set: {
        total: {
          $add: ['$buyNowPrice', '$shippingCosts'],
        },
      },
    },
    {
      $lookup: {
        from: 'auctionitemphotos',
        localField: 'photos',
        foreignField: '_id',
        as: 'photos',
      },
    },
    {
      $lookup: {
        from: 'auctioniteminstantbuyers',
        localField: 'instantBuyers',
        foreignField: '_id',
        as: 'instantBuyers',
      },
    },
    {
      $lookup: {
        from: 'bids',
        localField: 'bids',
        foreignField: '_id',
        as: 'bids',
      },
    },
  ]

/**
 @desc    Get auction item by id
 @route   GET /api/campaign/auction/item/:auctionItemId/:campaignId
 @access  Public/Private
*/
const getAuctionItemById = asyncHandler(async (req, res) => {
  try {
    const { auctionItemId } = req.params;

    const auctionItem = await AuctionItem.aggregate(auctionItemAggregate(auctionItemId));

    res.status(200).json({ auctionItem: auctionItem[0] });
  } catch (err) {
    await Error.create({
      functionName: 'GET_AUCTION_ITEM_BY_ID_PUBLIC_&_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error fetching auction item',
      sliceName: 'campaignApi',
    });
  }
});

export default getAuctionItemById;
