import { IAuction, IAuctionButtonStats } from '../../types/entities/auction';

export const auctionButtonStatsInitialState: IAuctionButtonStats = {
  clickCount: 0,
  auctionTitle: '',
};

export const auctionInitialState: IAuction = {
  _id: '',
  isLive: false,
  items: [],
  instantBuyers: [],
  bidders: [],
  winningBids: [],
  bids: [],

  title: '',
  goal: 1000,
  totalAuctionRevenue: 0,

  supporters: 0,
  supporterEmails: [],

  customAuctionLink: '',

  modalButtonClicks: auctionButtonStatsInitialState,

  status: null,

  startDate: '',
  endDate: '',

  anonymousBidding: true,
};
