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
      providesTags: (_: any, __: any, arg: any) => [{ type: 'Order', id: arg }],
    }),
    updateShippingStatus: build.mutation({
      query: ({ orderId }) => ({
        url: `${BASE_URL}/${orderId}/update-shipping-status`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Public', 'Order', 'User'],
    }),
    createOrder: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Public', 'Order', 'Product', 'User'],
    }),
    getMyOrders: build.query({
      query: () => `${BASE_URL}/my-orders`,
    }),
    createFailedOrder: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/create-failed-order`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Public', 'Order', 'Product', 'User'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateShippingStatusMutation,
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useCreateFailedOrderMutation,
} = orderApi;
