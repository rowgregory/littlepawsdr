import { api } from './api';

const BASE_URL = '/ecard';

export const ecardApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getEcards: build.query({
      query: () => BASE_URL,
      providesTags: ['Ecard'],
    }),
    getEcard: build.query({
      query: (ecardId: string) => `${BASE_URL}/${ecardId}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'Ecard', id: arg }],
    }),
    createEcard: build.mutation({
      query: (ecard: any) => ({
        url: BASE_URL,
        method: 'POST',
        body: ecard,
      }),
      invalidatesTags: ['Ecard'],
    }),
    updateEcard: build.mutation({
      query: (ecard: any) => ({
        url: `${BASE_URL}/${ecard.id}`,
        method: 'PUT',
        body: ecard,
      }),
      invalidatesTags: ['Ecard'],
    }),
    deleteEcard: build.mutation({
      query: (ecard: any) => ({
        url: `${BASE_URL}/${ecard.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Ecard'],
    }),
  }),
});

export const {
  useGetEcardsQuery,
  useGetEcardQuery,
  useCreateEcardMutation,
  useUpdateEcardMutation,
  useDeleteEcardMutation,
} = ecardApi;
