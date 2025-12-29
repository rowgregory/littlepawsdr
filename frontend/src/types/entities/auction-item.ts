import { IAuction } from './auction';
import { AuctionItemStatusEnum, SellingFormatEnum } from '../enums';
import { IAuctionItemPhoto } from './auction-item-photo';
import { IBid } from './bid';
import { IAuctionItemInstantBuyer } from './auction-item-instant-buyer';

export interface IAuctionItem {
  _id: string;

  auction: IAuction;

  photos: IAuctionItemPhoto[];
  bids: IBid[];
  instantBuyers: IAuctionItemInstantBuyer[];

  name: string;
  description: string;

  sellingFormat: SellingFormatEnum;

  startingPrice: number;
  buyNowPrice: number;
  totalQuantity: number;

  requiresShipping?: boolean;
  shippingCosts?: number;

  status: AuctionItemStatusEnum;

  currentBid: number;
  minimumBid: number;
  totalBids: number;
  highestBidAmount?: number;
  soldPrice?: number;

  topBidder?: string;

  isAuction: boolean;
  isFixed: boolean;
  isDigital: boolean;
}
