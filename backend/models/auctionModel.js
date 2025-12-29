import mongoose from 'mongoose';

const AuctionButtonStatsSchema = new mongoose.Schema({
  clickCount: {
    type: Number,
    default: 0,
  },
  auctionTitle: {
    type: String,
  },
});

const auctionSchema = mongoose.Schema(
  {
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuctionItem',
        default: [],
      },
    ],
    instantBuyers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuctionItemInstantBuyer',
      },
    ],
    bidders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuctionBidder',
        default: [],
      },
    ],
    winningBids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuctionWinningBidder',
        default: [],
      },
    ],
    bids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid',
      },
    ],
    title: { type: String },
    goal: { type: Number, default: 1000 },
    totalAuctionRevenue: { type: Number, default: 0 },
    supporters: { type: Number, default: 0 },
    supporterEmails: { type: [] },
    customAuctionLink: { type: String },
    modalButtonClicks: AuctionButtonStatsSchema,
    status: {
      type: String,
      enum: ['DRAFT', 'ACTIVE', 'ENDED'],
      default: 'DRAFT',
      required: true,
    },
    startDate: {
      type: Date,
      default: () => {
        const date = new Date();
        date.setUTCHours(14, 0, 0, 0); // 9 AM EST
        return new Date(date.getTime() + 14 * 24 * 60 * 60 * 1000); // 2 weeks from today
      },
    },
    endDate: {
      type: Date,
      default: () => {
        const date = new Date();
        date.setUTCHours(1, 0, 0, 0); // 8 PM EST
        return new Date(date.getTime() + 21 * 24 * 60 * 60 * 1000); // 3 weeks from today
      },
    },
    anonymousBidding: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Helper function to check if live
auctionSchema.virtual('isLive').get(function () {
  const now = new Date();
  return this.status === 'ACTIVE' && this.startDate <= now && this.endDate > now;
});

// const auction = await Auction.findById(id)
// if (auction.isLive) {
// Auction is currently live
// }

export const Auction = mongoose.model('Auction', auctionSchema);
