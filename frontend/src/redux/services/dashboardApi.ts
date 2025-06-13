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
    fetchDashboardData: build.query({
      query: () => '/dashboard/fetch-dashboard-data',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetAdoptionApplicationBypassCodeQuery, useGetWelcomeWienerOrdersQuery, useGetEcardOrdersQuery, useFetchDashboardDataQuery } =
  dashboardApi;
