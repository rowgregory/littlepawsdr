import { api } from './api';

const BASE_URL = '/education-tips';

export const educationTipApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getEducationTips: build.query({
      query: () => BASE_URL,
      providesTags: ['Education-Tip'],
    }),
    getEducationTip: build.query({
      query: (educationTipId: string) => `${BASE_URL}/${educationTipId}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'Education-Tip', id: arg }],
    }),
    createEducationTip: build.mutation({
      query: (blog: any) => ({
        url: BASE_URL,
        method: 'POST',
        body: blog,
      }),
      invalidatesTags: ['Education-Tip'],
    }),
    updateEducationTip: build.mutation({
      query: (educationTip: any) => ({
        url: `${BASE_URL}/${educationTip.id}`,
        method: 'PUT',
        body: educationTip,
      }),
      invalidatesTags: ['Education-Tip'],
    }),
    deleteEducationTip: build.mutation({
      query: (educationTip: any) => ({
        url: `${BASE_URL}/${educationTip.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Education-Tip'],
    }),
  }),
});

export const {
  useGetEducationTipsQuery,
  useGetEducationTipQuery,
  useCreateEducationTipMutation,
  useUpdateEducationTipMutation,
  useDeleteEducationTipMutation,
} = educationTipApi;
