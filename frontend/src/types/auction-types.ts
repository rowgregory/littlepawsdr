import { IAuction } from './entities/auction';
import { IAuctionItem } from './entities/auction-item';
import { IUser } from './entities/user';

// Base utility types
export type SortDirection = 'asc' | 'desc';

export interface IAuctionItemButtonBox {
  ifAuctionIsOver: boolean;
  auctionItem: IAuctionItem | undefined;
  auction: IAuction | null;
  customAuctionLink: string;
  user: IUser | null;
  triggerLightning: any;
}

export interface SparkleData {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export type AuctionItemDetailsSectionProps = {
  auction: IAuction;
  auctionItem: IAuctionItem | undefined;
};
