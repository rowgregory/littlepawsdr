import { api } from './api';

const BASE_URL = '/action-history';

export const actionHistoryApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getActionHistories: build.query({
      query: () => BASE_URL,
    }),
  }),
});

export const { useGetActionHistoriesQuery } = actionHistoryApi;
