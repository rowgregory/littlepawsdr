import { AuctionItemPaymentStatusEnum, AuctionWinningBidderPaymentStatusEnum } from '../enums';
import { IAuction } from './auction';
import { IAuctionItem } from './auction-item';
import { IUser } from './user';

export interface IAuctionWinningBidder {
  _id: string;
  auction: IAuction;
  user: IUser;
  auctionItems: IAuctionItem[];
  winningBidPaymentStatus: AuctionWinningBidderPaymentStatusEnum;
  auctionItemPaymentStatus: AuctionItemPaymentStatusEnum;
  auctionPaymentNotificationEmailHasBeenSent: boolean;
  emailNotificationCount: number;
  subtotal: number;
  totalPrice: number;
  shipping: number;
  shippingStatus: { type: String; default: 'Pending Payment Confirmation' };
  paidOn: Date;
  payPalId: string;
  paymentMethod: string;
  manualPayment: boolean;
}
