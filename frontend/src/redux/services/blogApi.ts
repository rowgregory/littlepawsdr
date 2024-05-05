import { api } from './api';

const BASE_URL = '/blog';

export const blogApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getBlogs: build.query({
      query: () => BASE_URL,
      providesTags: ['Blog'],
    }),
    getBlog: build.query({
      query: (blogId: string) => `${BASE_URL}/${blogId}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'Blog', id: arg }],
    }),
    createBlog: build.mutation({
      query: (blog: any) => ({
        url: BASE_URL,
        method: 'POST',
        body: blog,
      }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: build.mutation({
      query: (blog: any) => ({
        url: `${BASE_URL}/${blog.id}`,
        method: 'PUT',
        body: blog,
      }),
      invalidatesTags: ['Blog'],
    }),
    deleteBlog: build.mutation({
      query: (blog: any) => ({
        url: `${BASE_URL}/${blog.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogApi;
