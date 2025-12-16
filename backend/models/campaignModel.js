import mongoose from 'mongoose';

const SellingFormatEnum = ['auction', 'fixed'];
const WinningBidPaymentStatus = ['Pending Fulfillment', 'Complete', 'Awaiting Payment'];
const CampaignStatusEnum = ['Pre-Campaign', 'Active Campaign', 'Post-Campaign'];
const BidderStatusEnum = ['Registered', 'Bidding', 'Winner', 'Lost'];
const BidEnum = ['Outbid', 'Top Bid'];
const AuctionItemStatusEnum = ['Sold', 'Unsold'];
const AuctionItemPaymentStatusEnum = ['Pending', 'Paid'];

const auctionItemPhotoSchema = mongoose.Schema(
  {
    url: { type: String },
    name: { type: String },
    size: { type: String },
  },
  { timestamps: true }
);

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
    status: { type: String, enum: BidEnum, default: 'Top Bid' },
    sentWinnerEmail: { type: Boolean, default: false },
    emailCount: { type: Number, default: 0 },
    outBidEmailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const itemSchema = mongoose.Schema(
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
    sellingFormat: { type: String, enum: SellingFormatEnum },
    startingPrice: { type: Number },
    buyNowPrice: { type: Number },
    totalQuantity: { type: Number },
    requiresShipping: { type: Boolean, default: true },
    shippingCosts: { type: Number },
    status: { type: String, enum: AuctionItemStatusEnum, default: 'Unsold' },
    currentBid: { type: Number },
    minimumBid: { type: Number },
    totalBids: { type: Number },
    retailValue: { type: String },
    highestBidAmount: { type: Number },
    soldPrice: { type: Number },
    itemBtnText: { type: String },
    topBidder: { type: String },
    isAuction: { type: Boolean },
    isFixed: { type: Boolean },
    isDigital: { type: Boolean, default: false },
  },
  { timestamps: true }
);

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
    paymentStatus: { type: String, enum: AuctionItemPaymentStatusEnum, default: 'Paid' },
    shippingStatus: { type: String },
    shippingProvider: { type: String },
    trackingNumber: { type: String },
    totalPrice: { type: Number },
    isDigital: { type: Boolean },
    payPalId: { type: String },
  },
  { timestamps: true }
);

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
    status: { type: String, enum: BidderStatusEnum, default: 'Registered' },
  },
  { timestamps: true }
);

const auctionWinningBidderSchema = mongoose.Schema(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    auctionItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuctionItem',
      },
    ],
    winningBidPaymentStatus: {
      type: String,
      enum: WinningBidPaymentStatus,
      default: 'Awaiting Payment',
    },
    auctionItemPaymentStatus: {
      type: String,
      enum: AuctionItemPaymentStatusEnum,
      default: 'Pending',
    },
    auctionPaymentNotificationEmailHasBeenSent: { type: Boolean, default: false },
    emailNotificationCount: { type: Number, default: 0 },
    elapsedTimeSinceAuctionItemWon: { type: String },
    subtotal: { type: Number },
    totalPrice: { type: Number },
    shipping: { type: Number },
    shippingStatus: { type: String, default: 'Pending Payment Confirmation' },
    paidOn: { type: Date },
    payPalId: { type: String },
    paymentMethod: { type: String },
    manualPayment: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const auctionSchema = mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
    },
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
    settings: {
      startDate: Date,
      endDate: Date,
      isAuctionPublished: { type: Boolean, default: true },
      anonymousBidding: { type: Boolean, default: true },
      hasBegun: { type: Boolean, default: false },
      hasEnded: { type: Boolean, default: false },
      auctionStatus: { type: String, default: 'Bidding opens' },
      status: { type: String, default: 'UPCOMING' },
    },
  },
  {
    timestamps: true,
  }
);

const AuctionButtonStatsSchema = new mongoose.Schema({
  clickCount: {
    type: Number,
    default: 0,
  },
  campaignTitle: {
    type: String,
  },
});

const campaignSchema = mongoose.Schema(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
    },
    title: { type: String },
    subtitle: { type: String },
    goal: { type: Number, default: 1000 },
    themeColor: {
      xlight: { type: String, default: 'bg-teal-50' },
      light: { type: String, default: 'bg-teal-100' },
      dark: { type: String, default: 'bg-teal-500' },
      darker: { type: String, default: 'bg-teal-700' },
      text: { type: String, default: 'text-teal-700' },
      text2: { type: String, default: 'text-teal-400' },
      border: { type: String, default: 'border-teal-700' },
      border2: { type: String, default: 'border-teal-400' },
      borderLight: { type: String, default: 'border-teal-500' },
      gradient: { type: String, default: 'bg-g-teal' },
      fill: { type: String, default: 'fill-teal-700' },
    },
    coverPhoto: { type: String },
    coverPhotoName: { type: String },
    maintainAspectRatio: { type: Boolean, default: true },
    totalCampaignRevenue: { type: Number, default: 0 },
    supporters: { type: Number, default: 0 },
    supporterEmails: { type: [] },
    story: {
      type: String,
      default:
        'Little Paws Dachshund Rescue is a 501c3 volunteer run organization specializing in finding permanent homes for dachshunds and dachshund mixes!',
    },
    campaignStatus: { type: String, enum: CampaignStatusEnum, default: 'Pre-Campaign' },
    customCampaignLink: { type: String },
    isCampaignPublished: { type: Boolean, default: true },
    isMoneyRaisedVisible: { type: Boolean, default: true },
    imgPreference: { type: String },
    modalButtonClicks: AuctionButtonStatsSchema,
  },
  {
    timestamps: true,
  }
);

const Auction = mongoose.model('Auction', auctionSchema);
const AuctionItem = mongoose.model('AuctionItem', itemSchema);
const AuctionItemInstantBuyer = mongoose.model('AuctionItemInstantBuyer', auctionItemInstantBuyerSchema);
const AuctionItemPhoto = mongoose.model('AuctionItemPhoto', auctionItemPhotoSchema);
const Campaign = mongoose.model('Campaign', campaignSchema);
const Bid = mongoose.model('Bid', bidSchema);
const AuctionBidder = mongoose.model('AuctionBidder', auctionBidderSchema);
const AuctionWinningBidder = mongoose.model('AuctionWinningBidder', auctionWinningBidderSchema);

export { Auction, AuctionItemInstantBuyer, AuctionItem, AuctionItemPhoto, Bid, Campaign, AuctionBidder, AuctionWinningBidder };
