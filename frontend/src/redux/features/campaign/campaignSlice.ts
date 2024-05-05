import { Reducer, createSlice } from '@reduxjs/toolkit';
import { campaignApi } from '../../services/campaignApi';

export interface CampaignPayload {
  _id: string;
  title: string;
  subtitle: string;
  goal: number;
  isTheme: boolean;
  themeColor: {
    xlight: string;
    light: string;
    dark: string;
    darker: string;
    text: string;
    text2: string;
    gradient: string;
    border: string;
    border2: string;
    fill: string;
  };
  coverPhoto: string;
  coverPhotoName: string;
  maintainAspectRatio: boolean;
  totalCampaignRevenue: number;
  supporters: number;
  story: string;
  customCampaignLink: string;
  isCampaignPublished: boolean;
  isMoneyRaisedVisible: boolean;
  isTipsEnabled: boolean;
  feesRequired: boolean;
  campaignStatus: string;
  auction: {
    _id: string;
    settings: {
      startDate: string;
      endDate: string;
      isAuctionPublished: boolean;
      anonymousBidding: boolean;
      hasBegun: boolean;
      hasEnded: boolean;
      auctionStatus: string;
    };
    donations: [];
    items: [];
    bidders: [];
    winningBids: [];
    itemFulfillments: [];
  };
  imgPreference: string;
}
export interface CampaignStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  campaignId: string;
  detailsId: string;
  sharingId: string;
  auctionId: string;
  settingsId: string;
  campaigns: {
    active: [];
    past: [];
  };
  campaignsForAdminView: [];
  campaign: CampaignPayload;
  auctionItem: {
    _id: string;
    name: string;
    description: string;
    photos: [
      {
        _id: string;
        url: string;
        name: string;
        size: string;
      }
    ];
    instantBuyers: [];
    sellingFormat: string;
    startingPrice: number;
    buyNowPrice: number;
    totalQuantity: number;
    requiresShipping: boolean;
    shippingCosts: number;
    currentBid: number;
    minimumBid: number;
    totalBids: number;
    bidIncrement: number;
    retailValue: number;
    highestBidAmount: number;
    bids: [];
    total: number;
    topBidder: string;
    soldPrice: number;
  };
  instantBuy: {} | any;
  confirmedBidAmount: number;
  type: string;
  winner: {
    auctionItem: {};
  };
}

export const initialCampaignState: CampaignStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  campaignId: '',
  detailsId: '',
  sharingId: '',
  auctionId: '',
  settingsId: '',
  campaigns: {
    active: [],
    past: [],
  },
  campaignsForAdminView: [],
  campaign: {
    _id: '',
    title: '',
    subtitle: '',
    goal: 0,
    isTheme: false,
    themeColor: {
      xlight: '',
      light: '',
      dark: '',
      darker: '',
      text: '',
      text2: '',
      gradient: '',
      border: '',
      border2: '',
      fill: '',
    },
    coverPhoto: '',
    coverPhotoName: '',
    maintainAspectRatio: false,
    totalCampaignRevenue: 0,
    supporters: 0,
    story: '',
    customCampaignLink: '',
    isCampaignPublished: false,
    isMoneyRaisedVisible: false,
    isTipsEnabled: false,
    feesRequired: false,
    campaignStatus: '',
    auction: {
      _id: '',
      settings: {
        startDate: '',
        endDate: '',
        isAuctionPublished: false,
        anonymousBidding: false,
        hasBegun: false,
        hasEnded: false,
        auctionStatus: '',
      },
      donations: [],
      items: [],
      bidders: [],
      winningBids: [],
      itemFulfillments: [],
    },
    imgPreference: '',
  },
  auctionItem: {
    _id: '',
    name: '',
    description: '',
    photos: [
      {
        _id: '',
        url: '',
        name: '',
        size: '',
      },
    ],
    instantBuyers: [],
    sellingFormat: 'auction',
    startingPrice: 1,
    buyNowPrice: 5,
    totalQuantity: 1,
    requiresShipping: false,
    shippingCosts: 0,
    currentBid: 0,
    minimumBid: 0,
    totalBids: 0,
    bidIncrement: 0,
    retailValue: 0,
    highestBidAmount: 0,
    bids: [],
    total: 0,
    topBidder: '',
    soldPrice: 0,
  },
  instantBuy: {},
  confirmedBidAmount: 0,
  type: '',
  winner: {
    auctionItem: {},
  },
};

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState: initialCampaignState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
    resetCampaignError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        campaignApi.endpoints.createCampaign.matchFulfilled,
        (state, { payload }: any) => {
          state.campaignId = payload.campaignId;
        }
      )
      .addMatcher(
        campaignApi.endpoints.updateCampaign.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
          state.success = true;
          state.type = payload.type;
          state.campaign = payload.campaign;
        }
      )
      .addMatcher(
        campaignApi.endpoints.getCampaign.matchFulfilled,
        (state, { payload }: any) => {
          state.campaign = payload.campaign;
        }
      )
      .addMatcher(
        campaignApi.endpoints.updateAuction.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
          state.success = true;
          state.type = payload.type;
        }
      )
      .addMatcher(
        campaignApi.endpoints.createAuctionItem.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        campaignApi.endpoints.updateAuctionItem.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        campaignApi.endpoints.getAuctionItem.matchFulfilled,
        (state, { payload }: any) => {
          state.auctionItem = payload.auctionItem;
        }
      )
      .addMatcher(
        campaignApi.endpoints.deleteAuctionItemPhoto.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        campaignApi.endpoints.getCampaigns.matchFulfilled,
        (state, { payload }: any) => {
          state.campaigns = payload.campaigns;
        }
      )
      .addMatcher(
        campaignApi.endpoints.getCampaignsForAdminView.matchFulfilled,
        (state, { payload }: any) => {
          state.campaignsForAdminView = payload.campaigns;
        }
      )
      .addMatcher(
        campaignApi.endpoints.getCampaignByCustomLinkId.matchFulfilled,
        (state, { payload }: any) => {
          state.campaign = payload.campaign;
        }
      )
      .addMatcher(
        campaignApi.endpoints.createOneTimeAuctionDonation.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        campaignApi.endpoints.createInstantBuy.matchFulfilled,
        (state, { payload }: any) => {
          state.instantBuy = payload.instantBuy;
        }
      )
      .addMatcher(
        campaignApi.endpoints.placeBid.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
          state.confirmedBidAmount = payload.confirmedBidAmount;
        }
      )
      .addMatcher(
        campaignApi.endpoints.getWinningBidder.matchFulfilled,
        (state, { payload }: any) => {
          state.winner = payload.winningBidder;
        }
      )
      .addMatcher(
        campaignApi.endpoints.updateAuctionWinningBidder.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
          state.success = true;
        }
      )
      .addMatcher(
        campaignApi.endpoints.updateItemFulfillment.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        campaignApi.endpoints.deleteAuctionItem.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected') &&
          action.payload?.data?.sliceName === 'campaignApi',
        (state, action: any) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const campaignReducer = campaignSlice.reducer as Reducer<CampaignStatePayload>;

export const { resetSuccess, resetCampaignError } = campaignSlice.actions;
