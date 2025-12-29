import mongoose from 'mongoose';
import {
  AUCTION_ITEM_PAYMENT_STATUS,
  AUCTION_WINNING_BIDDER_PAYMENT_STATUS,
  AUCTION_WINNING_BIDDER_SHIPPING_STATUS,
} from '../enums/auction/enums.js';

const auctionWinningBidderSchema = mongoose.Schema(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    auctionItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuctionItem',
      },
    ],
    winningBidPaymentStatus: {
      type: String,
      enum: AUCTION_WINNING_BIDDER_PAYMENT_STATUS,
      default: 'Awaiting Payment',
    },
    auctionItemPaymentStatus: {
      type: String,
      enum: AUCTION_ITEM_PAYMENT_STATUS,
      default: 'Pending',
    },
    auctionPaymentNotificationEmailHasBeenSent: { type: Boolean, default: false },
    emailNotificationCount: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    shippingStatus: {
      type: String,
      enum: AUCTION_WINNING_BIDDER_SHIPPING_STATUS,
      default: 'Pending Payment Confirmation',
    },
    paidOn: { type: Date },
    payPalId: { type: String },
    paymentMethod: { type: String },
    manualPayment: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AuctionWinningBidder = mongoose.model(
  'AuctionWinningBidder',
  auctionWinningBidderSchema
);
