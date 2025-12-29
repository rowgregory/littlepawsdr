import mongoose from 'mongoose';
import { BID_STATUS } from '../enums/auction/enums.js';

const bidSchema = mongoose.Schema(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    auctionItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AuctionItem',
    },
    bidAmount: { type: Number },
    bidder: { type: String },
    email: { type: String },
    status: { type: String, enum: BID_STATUS, default: 'Top Bid' },
    sentWinnerEmail: { type: Boolean, default: false },
    emailCount: { type: Number, default: 0 },
    outBidEmailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Bid = mongoose.model('Bid', bidSchema);
