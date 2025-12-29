import { api } from './api';

const BASE_URL = '/public';

export const publicApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getPublicAppData: build.query({
      query: () => `${BASE_URL}/app-data`,
      providesTags: ['Public'],
    }),
  }),
});

export const { useGetPublicAppDataQuery } = publicApi;
