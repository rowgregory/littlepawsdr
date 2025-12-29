export const SELLING_FORMATS = ['auction', 'fixed'] as const;
export const AUCTION_ITEM_STATUSES = ['Sold', 'Unsold'] as const;
export const AUCTION_STATUSES = ['DRAFT', 'ACTIVE', 'ENDED'] as const;
export const AUCTION_ITEM_PAYMENT_STATUS = ['Pending', 'Paid'] as const;
export const AUCTION_BIDDER_STATUS = ['Registered', 'Bidding', 'Winner', 'Lost'] as const;
export const AUCTION_WINNING_BIDDER_PAYMENT_STATUS = [
  'Pending Fulfillment',
  'Complete',
  'Awaiting Payment',
] as const;

export const AUCTION_WINNING_BIDDER_SHIPPING_STATUS = [
  'Pending Payment Confirmation',
  'Pending Fulfillment',
  'Digital',
  'Complete',
] as const;

export type SellingFormatEnum = (typeof SELLING_FORMATS)[number];
export type AuctionItemStatusEnum = (typeof AUCTION_ITEM_STATUSES)[number];
export type AuctionStatusEnum = (typeof AUCTION_STATUSES)[number];
export type AuctionItemPaymentStatusEnum = (typeof AUCTION_ITEM_PAYMENT_STATUS)[number];
export type AuctionBidderStatusEnum = (typeof AUCTION_BIDDER_STATUS)[number];
export type AuctionWinningBidderPaymentStatusEnum =
  (typeof AUCTION_WINNING_BIDDER_PAYMENT_STATUS)[number];
export type AuctionWinningBidderShippingStatusEnum =
  (typeof AUCTION_WINNING_BIDDER_SHIPPING_STATUS)[number];
