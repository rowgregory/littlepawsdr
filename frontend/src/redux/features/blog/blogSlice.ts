import { Reducer, createSlice } from '@reduxjs/toolkit';
import { blogApi } from '../../services/blogApi';

interface BlogStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  blogs: [] | any;
  blog: {};
}

const initialBlogState: BlogStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  blogs: [],
  blog: {},
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState: initialBlogState,
  reducers: {
    resetBlogError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        blogApi.endpoints.getBlogs.matchFulfilled,
        (state, { payload }: any) => {
          state.blogs = payload.blogs;
        }
      )
      .addMatcher(blogApi.endpoints.getBlog.matchFulfilled, (state, { payload }: any) => {
        state.blog = payload.blog;
      })
      .addMatcher(
        blogApi.endpoints.updateBlog.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        blogApi.endpoints.createBlog.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        blogApi.endpoints.deleteBlog.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected') &&
          action.payload?.data?.sliceName === 'blogApi',
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const blogReducer = blogSlice.reducer as Reducer<BlogStatePayload>;

export const { resetBlogError } = blogSlice.actions;
