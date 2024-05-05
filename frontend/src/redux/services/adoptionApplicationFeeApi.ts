import { api } from './api';

const BASE_URL = '/adoption-fee';

export const adoptionApplicationFeeApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getAdoptionApplicationFees: build.query({
      query: () => BASE_URL,
      providesTags: ['Adoption-Application-Fee'],
    }),
    createAdoptionApplicationFee: build.mutation({
      query: (fee: any) => ({
        url: BASE_URL,
        method: 'POST',
        body: fee,
      }),
      invalidatesTags: ['User'],
    }),
    checkIfUserHasActiveAdoptionFeeSession: build.mutation({
      query: (product: any) => ({
        url: `${BASE_URL}/active-session`,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Adoption-Application-Fee'],
    }),
    jwtCheckValidityAdoptionFee: build.mutation({
      query: (token: any) => ({
        url: `${BASE_URL}/check-jwt-validity`,
        method: 'POST',
        body: token,
      }),
      invalidatesTags: ['Adoption-Application-Fee'],
    }),
    updateAdoptionApplicationFee: build.mutation({
      query: (id: any) => ({
        url: `${BASE_URL}/expired`,
        method: 'PATCH',
        body: id,
      }),
      invalidatesTags: ['User', 'Adoption-Application-Fee'],
    }),
  }),
});

export const {
  useGetAdoptionApplicationFeesQuery,
  useCreateAdoptionApplicationFeeMutation,
  useCheckIfUserHasActiveAdoptionFeeSessionMutation,
  useJwtCheckValidityAdoptionFeeMutation,
  useUpdateAdoptionApplicationFeeMutation,
} = adoptionApplicationFeeApi;
