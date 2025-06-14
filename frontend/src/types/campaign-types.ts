// Base utility types
export type SortDirection = 'asc' | 'desc';
export type CampaignStatus = 'Pre-Campaign' | 'Active Campaign' | 'Post-Campaign';
export type SellingFormat = 'auction' | 'fixed';
export type AuctionStatus = 'UPCOMING' | 'LIVE' | 'CLOSED' | '';
export type PaymentStatus = 'pending' | 'paid';

// Photo interface
export interface Photo {
  _id: string;
  url: string;
  name: string;
  size: string;
}

// Theme color interface
export interface ThemeColor {
  xlight: string;
  light: string;
  dark: string;
  darker: string;
  text: string;
  text2: string;
  gradient: string;
  border: string;
  border2: string;
  fill: string;
}

// User interface
export interface User {
  name: string;
  // Add more user properties as needed
}

// Bid interface
export interface Bid {
  _id: string;
  amount: number;
  bidder: string;
  timestamp: string;
  // Add more bid properties as needed
}

// Instant buyer interface
export interface InstantBuyer {
  _id: string;
  name: string;
  email: string;
  totalPrice: number;
  isDigital: boolean;
  // Add more instant buyer properties as needed
}

// Auction item interface
export interface AuctionItem {
  _id: string;
  name: string;
  description: string;
  photos: Photo[];
  instantBuyers: InstantBuyer[];
  sellingFormat: SellingFormat;
  startingPrice: number;
  buyNowPrice: number;
  totalQuantity: number;
  requiresShipping: boolean;
  shippingCosts: number;
  currentBid: number;
  minimumBid: number;
  totalBids: number;
  bidIncrement: number;
  retailValue: number;
  highestBidAmount: number;
  bids: Bid[];
  total: number;
  topBidder: string;
  soldPrice: number;
}

// Auction settings interface
export interface AuctionSettings {
  startDate: string;
  endDate: string;
  isAuctionPublished: boolean;
  anonymousBidding: boolean;
  hasBegun: boolean;
  hasEnded: boolean;
  status: AuctionStatus;
}

// Bidder interface
export interface Bidder {
  _id: string;
  user: User;
  totalBids: number;
  highestBid: number;
  // Add more bidder properties as needed
}

// Winning bid interface
export interface WinningBid {
  _id: string;
  auctionItem: string;
  bidder: string;
  amount: number;
  timestamp: string;
  // Add more winning bid properties as needed
}

// Auction interface
export interface Auction {
  _id: string;
  settings: AuctionSettings;
  items: AuctionItem[];
  bidders: Bidder[];
  winningBids: WinningBid[];
  instantBuyers: InstantBuyer[];
  bids: Bid[];
}

// Winner interface
export interface Winner {
  _id: string;
  auctionItemPaymentStatus: PaymentStatus;
  hasShippingAddress: boolean;
  itemSoldPrice: number;
  shipping: number;
  totalPrice: number;
  theme: ThemeColor;
  user: User;
  auctionItem: AuctionItem;
  customCampaignLink: string;
}

// Campaign interface
export interface Campaign {
  _id: string;
  title: string;
  goal: number;
  totalCampaignRevenue: number;
  supporters: number;
  customCampaignLink: string;
  isCampaignPublished: boolean;
  isMoneyRaisedVisible: boolean;
  campaignStatus: CampaignStatus;
  auction: Auction;
  imgPreference: string;
}

// Campaigns grouped by status
export interface CampaignsByStatus {
  upcoming: Campaign[];
  active: Campaign[];
  past: Campaign[];
}

// Instant buy interface (currently empty, extend as needed)
export interface InstantBuy {
  // Add properties as needed
  totalPrice: number;
}

// Main campaign state payload interface
export interface CampaignStatePayload {
  // Loading and status states
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string;

  // IDs for different sections
  campaignId: string;
  detailsId: string;
  sharingId: string;
  auctionId: string;
  settingsId: string;

  // Campaign collections
  campaigns: CampaignsByStatus;
  campaignsForAdminView: Campaign[];

  // Current campaign and related data
  campaign: Campaign;
  auctionItem: AuctionItem;
  instantBuy: InstantBuy;
  winner: Winner;

  // Bidding related
  confirmedBidAmount: number;
  bids: Bid[];

  // Utility fields
  type: string;
  customCampaignLink: string;
  status: string;

  // Modal and UI states
  hasHandledAuctionModal: boolean;
  isAuctionModalOpen: boolean;
  campaignStatus: CampaignStatus;

  // Filtering and sorting
  text: string;
  filteredArray: any[]; // Consider making this more specific
  sortKey: string;
  sortDirection: SortDirection;
  sortedData: any[]; // Consider making this more specific

  // Payment sync state
  hasHandledWinningBidPaymentAndCampaignSync: boolean;
  toggleAuctionItemCreateDrawer: boolean;
  toggleAuctionItemUpdateDrawer: boolean;
  allCampaigns: any;

  placeBidSuccess: boolean;
}
