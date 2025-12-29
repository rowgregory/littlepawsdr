import { IAuctionItem } from '../../types/entities/auction-item';
import { auctionInitialState } from './auciton';

export const auctionItemInitialState: IAuctionItem = {
  _id: '',
  auction: auctionInitialState,
  photos: [],
  bids: [],
  instantBuyers: [],
  name: '',
  description: '',
  sellingFormat: 'auction',
  startingPrice: 0,
  buyNowPrice: 0,
  totalQuantity: 1,
  requiresShipping: true,
  shippingCosts: 0,
  status: 'Unsold',
  currentBid: 0,
  minimumBid: 0,
  totalBids: 0,
  highestBidAmount: 0,
  soldPrice: 0,
  topBidder: '',
  isAuction: true,
  isFixed: false,
  isDigital: false,
};
