import { api } from './api';

export const dashboardApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getDashboardData: build.query({
      query: () => '/dashboard',
      providesTags: ['Dashboard'],
    }),
    getAdoptionApplicationBypassCode: build.query({
      query: () => '/dashboard/adoption-application-bypass-code',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetDashboardDataQuery, useGetAdoptionApplicationBypassCodeQuery } = dashboardApi;
