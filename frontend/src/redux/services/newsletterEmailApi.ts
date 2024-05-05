import { api } from './api';

const BASE_URL = '/newsletter';

export const newsletterEmailApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getNewsletterEmails: build.query({
      query: () => BASE_URL,
      providesTags: ['Newsletter-Email'],
    }),
    createNewsletterEmail: build.mutation({
      query: (newsletterEmail: any) => ({
        url: BASE_URL,
        method: 'POST',
        body: newsletterEmail,
      }),
      invalidatesTags: ['Newsletter-Email'],
    }),
    deleteNewsletterEmail: build.mutation({
      query: (newsletterEmail: any) => ({
        url: `${BASE_URL}/${newsletterEmail.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Newsletter-Email'],
    }),
  }),
});

export const {
  useGetNewsletterEmailsQuery,
  useCreateNewsletterEmailMutation,
  useDeleteNewsletterEmailMutation,
} = newsletterEmailApi;
