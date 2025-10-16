import { PayloadAction, Reducer, createSlice } from '@reduxjs/toolkit';
import { campaignApi } from '../../services/campaignApi';
import { CampaignStatePayload } from '../../../types/campaign-types';
import initialCampaignState, { initialAuctionItem } from './campaign-initial-state';

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState: initialCampaignState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
    resetCampaignError: (state) => {
      state.error = null;
    },
    saveHasHandledAuctionModalToLocalStorage: (state) => {
      state.hasHandledAuctionModal = true;
      localStorage.setItem('handledAuctionModal', JSON.stringify(true));
    },
    setCampaign(state, action: PayloadAction<any>) {
      state.campaign = { ...state.campaign, ...action.payload };

      const handledAuctionModal = JSON.parse(localStorage.getItem('handledAuctionModal') || 'false');

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
    openAuctionModal(state) {
      state.isAuctionModalOpen = true;
    },
    setSearchQuery: (state, { payload }) => {
      state.text = payload?.text;

      const query = payload?.text?.toLowerCase();
      state.filteredArray = payload?.arrayToFilter?.filter(
        (data: any) =>
          data?.auctionItem?.name?.toLowerCase()?.includes(query) ||
          String(data?.totalPrice)?.includes(query) ||
          data?.winningBidPaymentStatus?.toLowerCase()?.includes(query) ||
          data?.name?.toLowerCase()?.includes(query) ||
          data?.shippingStatus?.toLowerCase()?.includes(query) ||
          data?.email?.toLowerCase()?.includes(query) ||
          data?.user?.name?.toLowerCase()?.includes(query) ||
          data?.user?._id?.toLowerCase()?.includes(query) ||
          data?.user?.email?.toLowerCase()?.includes(query) ||
          data?.status?.toLowerCase()?.includes(query) ||
          String(data?.currentBid)?.includes(query) ||
          String(data?.buyNowPrice)?.includes(query) ||
          data?._id?.toLowerCase()?.includes(query) ||
          data?.sellingFormat?.toLowerCase()?.includes(query) ||
          String(data?.totalBids)?.includes(query)
      );
    },
    setInitialArray: (state, { payload }) => {
      state.filteredArray = payload.arrayToFilter;
    },
    sortTable: (state, action) => {
      const { arrayToSort, key } = action.payload;

      const direction = state.sortKey === key && state.sortDirection === 'asc' ? 'desc' : 'asc';

      state.sortKey = key;
      state.sortDirection = direction;

      const getValueFromObject = (obj: any, key: any) => {
        const keys = key?.split('.');
        return keys.reduce((acc: any, curr: any) => acc?.[curr], obj);
      };

      const sortedData = [...arrayToSort].sort((a, b) => {
        let valueA = a;
        let valueB = b;

        valueA = getValueFromObject(valueA, key);
        valueB = getValueFromObject(valueB, key);

        if (key === 'bids') {
          valueA = +a.bids.length;
          valueB = +b.bids.length;
        }

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          if (valueA.toLowerCase() < valueB.toLowerCase()) return direction === 'asc' ? -1 : 1;
          if (valueA.toLowerCase() > valueB.toLowerCase()) return direction === 'asc' ? 1 : -1;
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return direction === 'asc' ? valueA - valueB : valueB - valueA;
        }

        return 0;
      });

      state.filteredArray = sortedData;
    },
    updateCampaignInState: (state, action) => {
      state.campaign = action.payload;
    },
    updateAuctionInState: (state, action) => {
      state.campaign.auction = action.payload;
    },
    setCloseAuctionItemCreateDrawer: (state) => {
      state.toggleAuctionItemCreateDrawer = false;
    },
    setOpenAuctionItemCreateDrawer: (state) => {
      state.toggleAuctionItemCreateDrawer = true;
    },
    setCloseAuctionItemUpdateDrawer: (state) => {
      state.toggleAuctionItemUpdateDrawer = false;
    },
    setOpenAuctionItemUpdateDrawer: (state, { payload }) => {
      state.toggleAuctionItemUpdateDrawer = true;
      state.auctionItem = payload;
    },
    resetAuctionItem: (state) => {
      state.auctionItem = initialAuctionItem;
    },
    addAuctionItemToAuction: (state, { payload }) => {
      state.campaign.auction.items.push(payload.auctionItem);
    },
    updateAuctionItemInAuction: (state, { payload }) => {
      const auctionItem = payload.auctionItem;

      if (state.campaign?.auction?.items && auctionItem?._id) {
        const itemIndex = state.campaign.auction.items.findIndex((item) => item._id === auctionItem._id);

        if (itemIndex !== -1) {
          state.campaign.auction.items = state.campaign.auction.items.map((item, index) => (index === itemIndex ? auctionItem : item));
        }
      }
    },
    setCampaigns: (state, { payload }) => {
      state.allCampaigns = payload.campaigns;
    },
    resetPlaceBidSuccess: (state) => {
      state.placeBidSuccess = false;
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
      .addMatcher(campaignApi.endpoints.createCampaign.matchFulfilled, (state, { payload }: any) => {
        state.campaignId = payload.campaignId;
      })
      .addMatcher(campaignApi.endpoints.updateCampaign.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
        state.success = true;
        state.type = payload.type;
        state.campaign = payload.campaign;
      })
      .addMatcher(campaignApi.endpoints.getCampaign.matchFulfilled, (state, { payload }: any) => {
        state.campaign = payload.campaign;
      })
      .addMatcher(campaignApi.endpoints.updateAuction.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
        state.success = true;
        state.type = payload.type;
      })
      .addMatcher(campaignApi.endpoints.createAuctionItem.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(campaignApi.endpoints.updateAuctionItem.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(campaignApi.endpoints.getAuctionItem.matchFulfilled, (state, { payload }: any) => {
        state.auctionItem = payload.auctionItem;
      })
      .addMatcher(campaignApi.endpoints.deleteAuctionItemPhoto.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(campaignApi.endpoints.getCampaigns.matchFulfilled, (state, { payload }: any) => {
        state.campaigns = payload.campaigns;
      })
      .addMatcher(campaignApi.endpoints.getCampaignsForAdminView.matchFulfilled, (state, { payload }: any) => {
        state.campaignsForAdminView = payload.campaigns;
      })
      .addMatcher(campaignApi.endpoints.getCampaignByCustomLinkId.matchFulfilled, (state, { payload }: any) => {
        state.campaign = payload.campaign;
      })
      .addMatcher(campaignApi.endpoints.createInstantBuy.matchFulfilled, (state, { payload }: any) => {
        state.instantBuy = payload.instantBuy;
      })
      .addMatcher(campaignApi.endpoints.placeBid.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
        state.confirmedBidAmount = payload.confirmedBidAmount;
        state.placeBidSuccess = true;
      })
      .addMatcher(campaignApi.endpoints.getWinningBidder.matchFulfilled, (state, { payload }: any) => {
        state.winner = payload.winningBidder;
      })
      .addMatcher(campaignApi.endpoints.updateAuctionWinningBidder.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
        state.hasHandledWinningBidPaymentAndCampaignSync = true;
      })
      .addMatcher(campaignApi.endpoints.deleteAuctionItem.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(campaignApi.endpoints.getCustomCampaignLink.matchFulfilled, (state, { payload }: any) => {
        state.customCampaignLink = payload.customCampaignLink;
        state.campaignStatus = payload.campaignStatus;
      })
      .addMatcher(campaignApi.endpoints.fetchLiveCampaign.matchFulfilled, (state, { payload }: any) => {
        state.campaign.campaignStatus = payload.campaign.campaignStatus;
        state.campaign.title = payload.campaign.title;
        state.campaign.customCampaignLink = payload.campaign.customCampaignLink;
      })
      .addMatcher(campaignApi.endpoints.trackAuctionModalButtonClick.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'campaignApi',
        (state, action: any) => {
          state.loading = false;
          state.error = action.error.message;
          state.hasHandledWinningBidPaymentAndCampaignSync = false;
          state.success = false;
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
  openAuctionModal,
  closeAuctionModal,
  setSearchQuery,
  setInitialArray,
  sortTable,
  updateCampaignInState,
  updateAuctionInState,
  setCloseAuctionItemCreateDrawer,
  setOpenAuctionItemCreateDrawer,
  setCloseAuctionItemUpdateDrawer,
  setOpenAuctionItemUpdateDrawer,
  resetAuctionItem,
  addAuctionItemToAuction,
  updateAuctionItemInAuction,
  setCampaigns,
  resetPlaceBidSuccess,
} = campaignSlice.actions;
