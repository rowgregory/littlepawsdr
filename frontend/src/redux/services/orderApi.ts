import { api } from './api';

const BASE_URL = '/order';

export const orderApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getOrders: build.query({
      query: () => BASE_URL,
      providesTags: ['Order'],
    }),
    getOrder: build.query({
      query: (orderId: string) => `${BASE_URL}/${orderId}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'Order', id: arg }],
    }),
    updateTrackingNumber: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/tracking-number`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Order', 'User'],
    }),
    createOrder: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order', 'Product', 'User'],
    }),
    getMyOrders: build.query({
      query: () => `${BASE_URL}/my-orders`,
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateTrackingNumberMutation,
  useCreateOrderMutation,
  useGetMyOrdersQuery,
} = orderApi;
