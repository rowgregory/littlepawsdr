import {
  addAuctionItemToAuction,
  setCampaign,
  updateAuctionInState,
  updateAuctionItemInAuction,
  updateCampaignInState,
} from '../features/campaign/campaignSlice';
import { setInputs } from '../features/form/formSlice';
import { api } from './api';

const BASE_URL = '/campaign';

export const campaignApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getCampaign: build.query({
      query: (campaignId: string) => `${BASE_URL}/${campaignId}`,
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled;
        const newCampaign = data.campaign;
        dispatch(updateCampaignInState(newCampaign));
      },
      providesTags: ['Campaign'],
    }),
    createCampaign: build.mutation({
      query: (campaign: any) => ({
        url: BASE_URL,
        method: 'POST',
        body: campaign,
      }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled;
        const newCampaign = data.campaign;
        dispatch(updateCampaignInState(newCampaign));
      },
    }),
    updateCampaign: build.mutation({
      query: (campaign: any) => ({
        url: BASE_URL,
        method: 'PUT',
        body: campaign,
      }),
    }),
    updateAuction: build.mutation({
      query: (auction: any) => ({
        url: `${BASE_URL}/auction`,
        method: 'PUT',
        body: auction,
      }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled;
        const newAuction = data.auction;
        dispatch(updateAuctionInState(newAuction));
        dispatch(setInputs({ formName: 'campaignAuctionForm', data: newAuction }));
      },
    }),
    getAuctionItem: build.query({
      query: (item: any) => `${BASE_URL}/auction/item/${item?.auctionItemId}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'Auction-Item', id: arg }],
    }),
    createAuctionItem: build.mutation({
      query: (auctionItem: any) => ({
        url: `${BASE_URL}/auction/item`,
        method: 'POST',
        body: auctionItem,
      }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled;

        const newAuctionItem = data.auctionItem;
        dispatch(addAuctionItemToAuction({ auctionItem: newAuctionItem }));
        dispatch(setInputs({ formName: 'campaignAuctionForm', data: null }));
      },
    }),
    updateAuctionItem: build.mutation({
      query: (auctionItem: any) => ({
        url: `${BASE_URL}/auction/item`,
        method: 'PUT',
        body: auctionItem,
      }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled;

        const updatedAuctionItem = data.auctionItem;
        dispatch(updateAuctionItemInAuction({ auctionItem: updatedAuctionItem }));
        dispatch(setInputs({ formName: 'campaignAuctionForm', data: null }));
      },
    }),
    deleteAuctionItemPhoto: build.mutation({
      query: (campaign: any) => ({
        url: `${BASE_URL}/auction/item/photo/${campaign.photoId}/${campaign.auctionItemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Auction-Item', 'Campaign'],
    }),
    getCampaigns: build.query({
      query: () => BASE_URL,
      invalidatesTags: ['Campaign'],
    }),
    getCampaignsForAdminView: build.query({
      query: () => `${BASE_URL}/admin/view`,
      invalidatesTags: ['Campaign'],
    }),
    getCampaignByCustomLinkId: build.query({
      query: (customLinkId: string) => `${BASE_URL}/custom-link/${customLinkId}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'Campaign', id: arg }],
    }),
    createInstantBuy: build.mutation({
      query: (instantBuy: any) => ({
        url: `${BASE_URL}/auction/item/instant-buy`,
        method: 'POST',
        body: instantBuy,
      }),
      invalidatesTags: ['Campaign'],
    }),
    placeBid: build.mutation({
      query: (bid: any) => ({
        url: `${BASE_URL}/auction/item/place-bid`,
        method: 'POST',
        body: bid,
      }),
      invalidatesTags: ['Campaign', 'Auction', 'Auction-Item'],
    }),
    getWinningBidder: build.query({
      query: (id: string) => `${BASE_URL}/auction/winning-bidder/${id}`,
      invalidatesTags: ['Campaign'],
    }),
    updateAuctionWinningBidder: build.mutation({
      query: (winningBidder: any) => ({
        url: `${BASE_URL}/auction/winning-bidder`,
        method: 'PATCH',
        body: winningBidder,
      }),
      invalidatesTags: ['Campaign'],
    }),
    deleteAuctionItem: build.mutation({
      query: (auctionItem: any) => ({
        url: `${BASE_URL}/auction/item/${auctionItem?.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Campaign'],
    }),
    getCustomCampaignLink: build.query({
      query: () => `${BASE_URL}/custom-campaign-link`,
      providesTags: ['Campaign'],
    }),
    fetchLiveCampaign: build.query({
      query: () => `${BASE_URL}/live`,
      providesTags: ['Campaign'],
      async onQueryStarted(_: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCampaign(data.campaign));
        } catch {}
      },
    }),
    trackAuctionModalButtonClick: build.mutation({
      query: (campaignId: any) => {
        return {
          url: `${BASE_URL}/clicks`,
          method: 'PATCH',
          body: { campaignId },
        };
      },
      invalidatesTags: ['Campaign'],
    }),
  }),
});

export const {
  useGetCampaignQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useUpdateAuctionMutation,
  useGetAuctionItemQuery,
  useCreateAuctionItemMutation,
  useUpdateAuctionItemMutation,
  useDeleteAuctionItemPhotoMutation,
  useGetCampaignsQuery,
  useGetCampaignsForAdminViewQuery,
  useGetCampaignByCustomLinkIdQuery,
  useCreateInstantBuyMutation,
  usePlaceBidMutation,
  useGetWinningBidderQuery,
  useUpdateAuctionWinningBidderMutation,
  useDeleteAuctionItemMutation,
  useGetCustomCampaignLinkQuery,
  useFetchLiveCampaignQuery,
  useTrackAuctionModalButtonClickMutation,
} = campaignApi;
