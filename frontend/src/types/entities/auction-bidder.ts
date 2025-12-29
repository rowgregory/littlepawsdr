import { IAuction } from './auction';
import { IUser } from './user';
import { IBid } from './bid';
import { AuctionBidderStatusEnum } from '../enums';

export interface IAuctionButtonStats {
  clickCount: number;
  auctionTitle?: string;
}

export interface IAuctionBidder {
  _id: string;

  auction: IAuction;
  user: IUser;
  bids: IBid[];
  status: AuctionBidderStatusEnum;

  createdAt?: Date;
  updatedAt?: Date;
}
