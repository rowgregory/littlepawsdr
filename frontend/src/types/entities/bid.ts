import { Types } from 'mongoose';
import { IAuction } from './auction';
import { IUser } from './user';
import { IAuctionItem } from './auction-item';

export interface IBid {
  _id: Types.ObjectId;
  auction: IAuction;
  user: IUser;
  auctionItem: IAuctionItem;
  bidAmount: number;
  bidder: string;
  email: string;
  sentWinnerEmail: boolean;
  emailCount: number;
  outBidEmailSend: true;

  createdAt?: Date;
  updatedAt?: Date;
}
