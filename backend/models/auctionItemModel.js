import mongoose from 'mongoose';
import { AUCTION_ITEM_STATUSES, SELLING_FORMATS } from '../enums/auction/enums.js';

const auctionItemSchema = mongoose.Schema(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
    },

    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuctionItemPhoto',
      },
    ],
    bids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid',
      },
    ],
    instantBuyers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuctionItemInstantBuyer',
      },
    ],
    name: { type: String },
    description: { type: String },
    sellingFormat: { type: String, enum: SELLING_FORMATS, default: 'auction' },
    startingPrice: { type: Number },
    buyNowPrice: { type: Number },
    totalQuantity: { type: Number },
    requiresShipping: { type: Boolean, default: true },
    shippingCosts: { type: Number },
    status: { type: String, enum: AUCTION_ITEM_STATUSES, default: 'Unsold' },
    currentBid: { type: Number },
    minimumBid: { type: Number },
    totalBids: { type: Number },
    highestBidAmount: { type: Number },
    soldPrice: { type: Number },
    topBidder: { type: String },
    isAuction: { type: Boolean },
    isFixed: { type: Boolean },
    isDigital: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AuctionItem = mongoose.model('AuctionItem', auctionItemSchema);
