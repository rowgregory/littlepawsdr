import mongoose from 'mongoose';
import {
  AUCTION_INSTANT_BUY_SHIPPING_STATUS,
  AUCTION_ITEM_PAYMENT_STATUS,
} from '../enums/auction/enums.js';

const auctionItemInstantBuyerSchema = mongoose.Schema(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
    },
    auctionItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AuctionItem',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: { type: String },
    email: { type: String },
    paymentStatus: {
      type: String,
      enum: AUCTION_ITEM_PAYMENT_STATUS,
      default: 'Paid',
    },
    shippingStatus: {
      type: String,
      enum: AUCTION_INSTANT_BUY_SHIPPING_STATUS,
      default: 'Digital',
    },
    totalPrice: { type: Number },
    isDigital: { type: Boolean },
    payPalId: { type: String },
  },
  { timestamps: true }
);

export const AuctionItemInstantBuyer = mongoose.model(
  'AuctionItemInstantBuyer',
  auctionItemInstantBuyerSchema
);
