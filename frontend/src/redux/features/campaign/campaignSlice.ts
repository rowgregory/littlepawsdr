import { Reducer, createSlice } from '@reduxjs/toolkit';
import { campaignApi } from '../../services/campaignApi';
import { CampaignStatePayload } from '../../../components/types/campaign-types';

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
    upcoming: [],
    active: [],
    past: [],
  },
  campaignsForAdminView: [],
  campaign: {
    _id: '',
    title: '',
    subtitle: '',
    goal: 0,
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
    _id: '',
    auctionItemPaymentStatus: '',
    hasShippingAddress: false,
    itemSoldPrice: 0,
    shipping: 0,
    totalPrice: 0,
    theme: {} as any,
    user: {
      name: '',
    },
    auctionItem: {
      _id: '',
      photos: [
        {
          _id: '',
          url: '',
          name: '',
          size: '',
        },
      ],
      name: '',
      description: '',
      instantBuyers: [],
      sellingFormat: '',
      startingPrice: 0,
      buyNowPrice: 0,
      totalQuantity: 0,
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
    customCampaignLink: '',
  },
  customCampaignLink: '',
  status: ''
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
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
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
      .addMatcher(campaignApi.endpoints.getCampaign.matchFulfilled, (state, { payload }: any) => {
        state.campaign = payload.campaign;
      })
      .addMatcher(campaignApi.endpoints.updateAuction.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
        state.success = true;
        state.type = payload.type;
      })
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
      .addMatcher(campaignApi.endpoints.getCampaigns.matchFulfilled, (state, { payload }: any) => {
        state.campaigns = payload.campaigns;
      })
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
      .addMatcher(campaignApi.endpoints.placeBid.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
        state.confirmedBidAmount = payload.confirmedBidAmount;
      })
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
        campaignApi.endpoints.getCustomCampaignLink.matchFulfilled,
        (state, { payload }: any) => {
          state.customCampaignLink = payload.customCampaignLink;
          state.status = payload.status;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'campaignApi',
        (state, action: any) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const campaignReducer = campaignSlice.reducer as Reducer<CampaignStatePayload>;

export const { resetSuccess, resetCampaignError } = campaignSlice.actions;
