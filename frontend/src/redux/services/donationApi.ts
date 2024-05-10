import { api } from './api';

const BASE_URL = '/donation';

export const donationApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getDonations: build.query({
      query: () => BASE_URL,
      providesTags: ['Donation'],
    }),
    getDonationsByEmail: build.query({
      query: (email: string) => `${BASE_URL}/${email}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'Donation', id: arg }],
    }),
    createDonation: build.mutation({
      query: (donation: any) => ({
        url: BASE_URL,
        method: 'POST',
        body: donation,
      }),
      invalidatesTags: ['Donation', 'User'],
    }),
  }),
});

export const { useGetDonationsQuery, useGetDonationsByEmailQuery, useCreateDonationMutation } =
  donationApi;
