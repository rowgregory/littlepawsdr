import mongoose from 'mongoose';
import { AUCTION_BIDDER_STATUS } from '../enums/auction/enums.js';

const auctionBidderSchema = mongoose.Schema(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    bids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid',
      },
    ],
    status: { type: String, enum: AUCTION_BIDDER_STATUS, default: 'Registered' },
  },
  { timestamps: true }
);

export const AuctionBidder = mongoose.model('AuctionBidder', auctionBidderSchema);
