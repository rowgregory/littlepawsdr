import {
  Auction,
  AuctionItem,
  AuctionSettings,
  Bid,
  Bidder,
  Campaign,
  CampaignsByStatus,
  CampaignStatePayload,
  InstantBuy,
  InstantBuyer,
  Photo,
  ThemeColor,
  User,
  Winner,
  WinningBid,
} from '../../../types/campaign-types';

export const initialCampaignsByStatus: CampaignsByStatus = {
  upcoming: [],
  active: [],
  past: [],
};

export const initialPhoto: Photo = {
  _id: '',
  url: '',
  name: '',
  size: '',
};

export const initialThemeColor: ThemeColor = {
  xlight: '',
  light: '',
  dark: '',
  darker: '',
  text: '',
  text2: '',
  gradient: '',
  border: '',
  border2: '',
  fill: '',
};

export const initialUser: User = {
  name: '',
};

export const initialBid: Bid = {
  _id: '',
  amount: 0,
  bidder: '',
  timestamp: '',
};

export const initialInstantBuyer: InstantBuyer = {
  _id: '',
  buyer: '',
  quantity: 0,
  purchasePrice: 0,
  timestamp: '',
};

export const initialAuctionSettings: AuctionSettings = {
  startDate: '',
  endDate: '',
  isAuctionPublished: false,
  anonymousBidding: false,
  hasBegun: false,
  hasEnded: false,
  status: '',
};

export const initialBidder: Bidder = {
  _id: '',
  user: { ...initialUser },
  totalBids: 0,
  highestBid: 0,
};

export const initialWinningBid: WinningBid = {
  _id: '',
  auctionItem: '',
  bidder: '',
  amount: 0,
  timestamp: '',
};

export const initialAuctionItem: AuctionItem = {
  _id: '',
  name: '',
  description: '',
  photos: [{ ...initialPhoto }],
  instantBuyers: [],
  sellingFormat: 'auction',
  startingPrice: 1,
  buyNowPrice: 5,
  totalQuantity: 1,
  requiresShipping: false,
  shippingCosts: 0,
  currentBid: 0,
  minimumBid: 0,
  totalBids: 0,
  bidIncrement: 0,
  retailValue: 0,
  highestBidAmount: 0,
  bids: [],
  total: 0,
  topBidder: '',
  soldPrice: 0,
};

export const initialAuction: Auction = {
  _id: '',
  settings: { ...initialAuctionSettings },
  items: [],
  bidders: [],
  winningBids: [],
  instantBuyers: [],
  bids: [],
};

export const initialCampaign: Campaign = {
  _id: '',
  title: '',
  goal: 0,
  totalCampaignRevenue: 0,
  supporters: 0,
  customCampaignLink: '',
  isCampaignPublished: false,
  isMoneyRaisedVisible: false,
  campaignStatus: 'Pre-Campaign',
  auction: { ...initialAuction },
  imgPreference: '',
};

export const initialWinner: Winner = {
  _id: '',
  auctionItemPaymentStatus: 'pending',
  hasShippingAddress: false,
  itemSoldPrice: 0,
  shipping: 0,
  totalPrice: 0,
  theme: { ...initialThemeColor },
  user: { ...initialUser },
  auctionItem: {
    _id: '',
    photos: [{ ...initialPhoto }],
    name: '',
    description: '',
    instantBuyers: [],
    sellingFormat: 'auction',
    startingPrice: 0,
    buyNowPrice: 0,
    totalQuantity: 0,
    requiresShipping: false,
    shippingCosts: 0,
    currentBid: 0,
    minimumBid: 0,
    totalBids: 0,
    bidIncrement: 0,
    retailValue: 0,
    highestBidAmount: 0,
    bids: [],
    total: 0,
    topBidder: '',
    soldPrice: 0,
  },
  customCampaignLink: '',
};

export const initialInstantBuy: InstantBuy = {};

export const initialCampaignState: CampaignStatePayload = {
  // Loading and status states
  loading: false,
  success: false,
  error: null,
  message: '',

  // IDs for different sections
  campaignId: '',
  detailsId: '',
  sharingId: '',
  auctionId: '',
  settingsId: '',

  // Campaign collections
  campaigns: { ...initialCampaignsByStatus },
  campaignsForAdminView: [],

  // Current campaign and related data
  campaign: { ...initialCampaign },
  auctionItem: { ...initialAuctionItem },
  instantBuy: { ...initialInstantBuy },
  winner: { ...initialWinner },

  // Bidding related
  confirmedBidAmount: 0,
  bids: [],

  // Utility fields
  type: '',
  customCampaignLink: '',
  status: '',

  // Modal and UI states
  hasHandledAuctionModal: false,
  isAuctionModalOpen: false,
  campaignStatus: 'Pre-Campaign',

  // Filtering and sorting
  text: '',
  filteredArray: [],
  sortKey: '',
  sortDirection: 'asc',
  sortedData: [],

  // Payment sync state
  hasHandledWinningBidPaymentAndCampaignSync: false,
  toggleAuctionItemCreateDrawer: false,
  toggleAuctionItemUpdateDrawer: false,
  allCampaigns: [],

  placeBidSuccess: false,
};

export default initialCampaignState;
