import { AuctionItemPaymentStatusEnum } from '../enums';
import { IAuction } from './auction';
import { IAuctionItem } from './auction-item';
import { IUser } from './user';

export interface IAuctionItemInstantBuyer {
  _id: string;

  auction: IAuction;
  auctionItem: IAuctionItem;
  user: IUser;

  name: string;
  email: string;

  paymentStatus: AuctionItemPaymentStatusEnum;
  shippingStatus: string;
  totalPrice: number;
  isDigital: boolean;
  payPalId: string;

  createdAt: string;
  updatedAt: string;
}
