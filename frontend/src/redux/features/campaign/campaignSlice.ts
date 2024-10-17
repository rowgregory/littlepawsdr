import { PayloadAction, Reducer, createSlice } from '@reduxjs/toolkit';
import { campaignApi } from '../../services/campaignApi';
import { CampaignStatePayload } from '../../../types/campaign-types';
import initialCampaignState from './campaign-initial-state';

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
    saveHasHandledAuctionModalToLocalStorage: (state) => {
      state.hasHandledAuctionModal = true;
      localStorage.setItem('handledAuctionModal', JSON.stringify(true));
    },
    setCampaign(state, action: PayloadAction<any>) {
      state.campaign = {...state.campaign, ...action.payload}

      const handledAuctionModal = JSON.parse(
        localStorage.getItem('handledAuctionModal') || 'false'
      );

      state.hasHandledAuctionModal = handledAuctionModal;

      if (action.payload?.campaignStatus === 'Active Campaign' && !handledAuctionModal) {
        if (!handledAuctionModal) {
          state.isAuctionModalOpen = true;
        } else {
          state.isAuctionModalOpen = false;
        }
      }

      if (Object.keys(action.payload).length === 0) {
        localStorage.removeItem('handledAuctionModal');
        state.hasHandledAuctionModal = false;
        state.isAuctionModalOpen = false;
      }
    },
    closeAuctionModal(state) {
      state.isAuctionModalOpen = false;
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
          state.campaignStatus = payload.campaignStatus;
        }
      )
      .addMatcher(
        campaignApi.endpoints.fetchLiveCampaign.matchFulfilled,
        (state, { payload }: any) => {
          state.campaign = payload.campaign;
        }
      )
      .addMatcher(
        campaignApi.endpoints.trackAuctionModalButtonClick.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
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

export const {
  resetSuccess,
  resetCampaignError,
  saveHasHandledAuctionModalToLocalStorage,
  setCampaign,
  closeAuctionModal,
} = campaignSlice.actions;
