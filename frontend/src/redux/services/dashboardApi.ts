import { api } from './api';

export const dashboardApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getAdoptionApplicationBypassCode: build.query({
      query: () => '/dashboard/adoption-application-bypass-code',
      providesTags: ['Dashboard'],
    }),
    getWelcomeWienerOrders: build.query({
      query: () => '/dashboard/orders/welcome-wieners',
      providesTags: ['Dashboard'],
    }),
    getEcardOrders: build.query({
      query: () => '/dashboard/orders/ecards',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useGetAdoptionApplicationBypassCodeQuery,
  useGetWelcomeWienerOrdersQuery,
  useGetEcardOrdersQuery,
} = dashboardApi;
