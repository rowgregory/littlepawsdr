import { api } from './api';

const BASE_URL = '/auction';

export const auctionApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    // QUERIES - Auction retrieval
    getAuctions: build.query({
      query: () => BASE_URL,
      providesTags: ['Auction'],
    }),
    getAuctionById: build.query({
      query: (auctionId: string) => `${BASE_URL}/${auctionId}`,
      providesTags: ['Auction'],
    }),
    getAuctionByCustomAuctionLink: build.query({
      query: (customAuctionLink: string) => `${BASE_URL}/custom-auction-link/${customAuctionLink}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'Auction', id: arg }],
    }),
    getCustomAuctionLink: build.query({
      query: () => `${BASE_URL}/custom-auction-link`,
      providesTags: ['Auction'],
    }),

    // QUERIES - Winning bidder
    getWinningBidder: build.query({
      query: (id: string) => `${BASE_URL}/winning-bidder/${id}`,
      providesTags: ['Auction'],
    }),

    // MUTATIONS - Auction management
    createAuction: build.mutation({
      query: (auction: any) => ({
        url: BASE_URL,
        method: 'POST',
        body: auction,
      }),
      invalidatesTags: ['Auction'],
    }),
    updateAuction: build.mutation({
      query: (auction: any) => ({
        url: BASE_URL,
        method: 'PUT',
        body: auction,
      }),
      invalidatesTags: ['Auction'],
    }),

    // MUTATIONS - Winning bidder & payments
    recordWinningBidPayment: build.mutation({
      query: (winningBidder: any) => ({
        url: `${BASE_URL}/winning-bidder`,
        method: 'PATCH',
        body: winningBidder,
      }),
      invalidatesTags: ['Auction'],
    }),
    markWinningBidAsPaid: build.mutation({
      query: ({ id, paymentMethod }: { id: string; paymentMethod: string }) => ({
        url: `${BASE_URL}/winning-bidder/mark-paid`,
        method: 'PATCH',
        body: { id, paymentMethod },
      }),
      invalidatesTags: ['Auction'],
    }),

    // MUTATIONS - Tracking
    trackAuctionModalButtonClick: build.mutation({
      query: (auctionId: any) => ({
        url: `${BASE_URL}/clicks`,
        method: 'PATCH',
        body: { auctionId },
      }),
      invalidatesTags: ['Auction'],
    }),
    getAuctionItem: build.query({
      query: (item: any) => `${BASE_URL}/item/${item?.auctionItemId}`,
      providesTags: ['Auction'],
    }),
    createAuctionItem: build.mutation({
      query: (auctionItem: any) => ({
        url: `${BASE_URL}/item`,
        method: 'POST',
        body: auctionItem,
      }),
      invalidatesTags: ['Auction'],
    }),
    updateAuctionItem: build.mutation({
      query: (auctionItem: any) => ({
        url: `${BASE_URL}/item`,
        method: 'PUT',
        body: auctionItem,
      }),
      invalidatesTags: ['Auction'],
    }),
    deleteAuctionItem: build.mutation({
      query: (auctionItem: any) => ({
        url: `${BASE_URL}/item/${auctionItem?.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Auction'],
    }),
    deleteAuctionItemPhoto: build.mutation({
      query: (auction: any) => ({
        url: `${BASE_URL}/item/photo/${auction.photoId}/${auction.auctionItemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Auction'],
    }),
    createInstantBuy: build.mutation({
      query: (instantBuy: any) => ({
        url: `${BASE_URL}/item/instant-buy`,
        method: 'POST',
        body: instantBuy,
      }),
      invalidatesTags: ['Auction'],
    }),
    placeBid: build.mutation({
      query: (bid: any) => ({
        url: `${BASE_URL}/item/place-bid`,
        method: 'POST',
        body: bid,
      }),
      invalidatesTags: ['Auction'],
    }),
    updateInstantBuyerShippingStatus: build.mutation({
      query: ({ id }) => ({
        url: `${BASE_URL}/item/${id}/update-instant-buyer-shipping-address`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Auction'],
    }),
  }),
});

export const {
  useUpdateAuctionMutation,
  useGetWinningBidderQuery,
  useRecordWinningBidPaymentMutation,
  useMarkWinningBidAsPaidMutation,
  useGetAuctionByIdQuery,
  useCreateAuctionMutation,
  useGetAuctionsQuery,
  useGetAuctionByCustomAuctionLinkQuery,
  useGetCustomAuctionLinkQuery,
  useTrackAuctionModalButtonClickMutation,
  useGetAuctionItemQuery,
  useCreateAuctionItemMutation,
  useUpdateAuctionItemMutation,
  useDeleteAuctionItemMutation,
  useDeleteAuctionItemPhotoMutation,
  useCreateInstantBuyMutation,
  usePlaceBidMutation,
  useUpdateInstantBuyerShippingStatusMutation,
} = auctionApi;
