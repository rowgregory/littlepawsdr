import { AuctionStatusEnum } from '../enums';
import { IAuctionItem } from './auction-item';
import { IAuctionItemInstantBuyer } from './auction-item-instant-buyer';
import { IAuctionBidder } from './auction-bidder';
import { IAuctionWinningBidder } from './auction-winning-bidder';
import { IBid } from './bid';

export interface IAuctionButtonStats {
  clickCount: number;
  auctionTitle?: string;
}

export interface IAuction {
  _id: string;

  isLive: any;
  items: IAuctionItem[];
  instantBuyers: IAuctionItemInstantBuyer[];
  bidders: IAuctionBidder[];
  winningBids: IAuctionWinningBidder[];
  bids: IBid[];

  title: string;
  goal: number;
  totalAuctionRevenue: number;

  supporters: number;
  supporterEmails: string[];

  customAuctionLink: string;

  modalButtonClicks: IAuctionButtonStats;

  status: AuctionStatusEnum | null;

  startDate: string;
  endDate: string;

  anonymousBidding: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
