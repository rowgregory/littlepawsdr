import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getPicturesAndVideos } from '../../utils/getPicturesAndVideos';
import { setDachshunds } from '../features/dachshund/dachshundSlice';

const fetchDataFromApi = async (baseQuery: any) => {
  const promises = Array.from({ length: 6 }, (_, index) =>
    baseQuery(`https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/dogs?sort=-animals.adoptedDate&page=${index + 1}&limit=250`)
  );
  const response = await Promise.all(promises);
  return response;
};

export const rescueGroupsApi = createApi({
  reducerPath: 'rescueGroupsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.rescuegroups.org/v5/public/orgs/5798',
    prepareHeaders: (headers, { getState }) => {
      (headers as Headers).set('Authorization', `${process.env.REACT_APP_RESCUE_GROUPS_API_KEY}`);
      (headers as Headers).set('Content-Type', 'application/vnd.api+json');
      (headers as Headers).set('Accept', 'application/vnd.api+json');
      return headers;
    },
  }),
  endpoints: (builder: any) => ({
    getDachshundById: builder.query({
      query: (id: string) => `/animals/${id}`,
      transformResponse: (response: { data: { data: [] } }) => {
        if (response?.data) {
          getPicturesAndVideos(response);
        }

        return response;
      },
    }),
    getTotalDachshundCount: builder.query({
      queryFn: async (arg: any, api: any, extraOptions: any, baseQuery: any) => {
        const response = await fetchDataFromApi(baseQuery);

        const countDachshunds = (dataStructure: any) => dataStructure.reduce((total: any, record: any) => total + record?.data?.data?.length, 0);

        const total = countDachshunds(response);

        return { data: { dachshundCount: total } };
      },
    }),
    // In your rescueGroupsApi.ts
    getDachshundsByStatus: builder.mutation({
      query: (status: string) => ({
        url: `/animals/search/dogs?limit=250`,
        method: 'POST',
        body: {
          data: {
            filters: [
              {
                fieldName: 'statuses.name',
                operation: 'equals',
                criteria: status,
              },
            ],
          },
        },
      }),
      transformResponse: (response: { data: { data: [] } }) => {
        if (response?.data) {
          getPicturesAndVideos(response);
        }
        return response;
      },
      async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;

          // Fix: It's data.data, not data.data.data
          dispatch(setDachshunds(data?.data || [])); // Changed this line
        } catch (error) {
          console.error('❌ Mutation failed:', error);
        }
      },
    }),
  }),
}) as any;

export const { useGetDachshundByIdQuery, useGetTotalDachshundCountQuery, useGetDachshundsByStatusMutation } = rescueGroupsApi;
