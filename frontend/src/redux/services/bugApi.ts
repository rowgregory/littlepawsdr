import { api } from './api';

const BASE_URL = '/bug';

export const bugApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getBugs: build.query({
      query: (params?: { status?: string; severity?: string; category?: string }) => ({
        url: BASE_URL,
        params,
      }),
      providesTags: ['Bug'],
    }),

    getBugsById: build.query({
      query: (bugId: string) => `${BASE_URL}/get-bugs-by-id`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'Bug', id: arg }],
    }),

    createBug: build.mutation({
      query: (bug: any) => ({
        url: `${BASE_URL}/create`,
        method: 'POST',
        body: bug,
      }),
      invalidatesTags: ['Bug', 'User'],
    }),

    updateBug: build.mutation({
      query: (bug: any) => ({
        url: `${BASE_URL}/${bug._id}/update`,
        method: 'PUT',
        body: bug,
      }),
      invalidatesTags: ['Bug', 'User'],
    }),

    resolveBug: build.mutation({
      query: ({ bugId, resolutionNote }: { bugId: string; resolutionNote?: string }) => ({
        url: `${BASE_URL}/${bugId}/resolve`,
        method: 'PUT',
        body: { resolutionNote },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        'Bug',
        { type: 'Bug', id: arg.bugId },
      ],
    }),

    deleteBug: build.mutation({
      query: (bugId: string) => ({
        url: `${BASE_URL}/${bugId}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bug'],
    }),
  }),
});

export const {
  useGetBugsQuery,
  useGetBugByIdQuery,
  useCreateBugMutation,
  useUpdateBugMutation,
  useResolveBugMutation,
  useDeleteBugMutation,
} = bugApi;
