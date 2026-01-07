import { api } from './api';

const BASE_URL = '/adoption-fee';

export const adoptionApplicationFeeApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getAdoptionApplicationFees: build.query({
      query: () => BASE_URL,
      providesTags: ['Adoption-Application-Fee'],
    }),
    createAdoptionFee: build.mutation({
      query: (fee: any) => ({
        url: BASE_URL,
        method: 'POST',
        body: fee,
      }),
      invalidatesTags: ['Adoption-Application-Fee'],
    }),
    checkAdoptionSession: build.mutation({
      query: (data: any) => ({
        url: `${BASE_URL}/check-session/${data.id}`,
        method: 'GET',
      }),
      invalidatesTags: ['Adoption-Application-Fee'],
    }),
    getAdoptionApplicationBypassCode: build.query({
      query: () => `${BASE_URL}/bypass-code`,
      providesTags: ['Adoption-Application-Fee'],
    }),
  }),
});

export const {
  useGetAdoptionApplicationFeesQuery,
  useCreateAdoptionFeeMutation,
  useCheckAdoptionSessionMutation,
  useGetAdoptionApplicationBypassCodeQuery,
} = adoptionApplicationFeeApi;
