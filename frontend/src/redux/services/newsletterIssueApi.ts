import { api } from './api';

const BASE_URL = '/newsletter-issue';

export const newsletterIssueApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getNewsletterIssues: build.query({
      query: () => BASE_URL,
      providesTags: ['Newsletter-Issue'],
    }),

    getNewsletterIssueById: build.query({
      query: (id: string) => `${BASE_URL}/${id}`,
      providesTags: (result: any, error: any, id: string) => [{ type: 'Newsletter-Issue', id }],
    }),

    getNewsletterIssuesByYear: build.query({
      query: (year: number) => `${BASE_URL}/year/${year}`,
      providesTags: ['Newsletter-Issue'],
    }),

    createNewsletterIssue: build.mutation({
      query: (body: any) => ({
        url: BASE_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Newsletter-Issue'],
    }),

    updateNewsletterIssue: build.mutation({
      query: ({ id, ...body }: any) => ({
        url: `${BASE_URL}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result: any, error: any, { id }: any) => [{ type: 'Newsletter-Issue', id }, 'Newsletter-Issue'],
    }),

    deleteNewsletterIssue: build.mutation({
      query: (id: string) => ({
        url: `${BASE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Newsletter-Issue'],
    }),
  }),
});

export const {
  useGetNewsletterIssuesQuery,
  useGetNewsletterIssueByIdQuery,
  useGetNewsletterIssuesByYearQuery,
  useCreateNewsletterIssueMutation,
  useUpdateNewsletterIssueMutation,
  useDeleteNewsletterIssueMutation,
} = newsletterIssueApi;
