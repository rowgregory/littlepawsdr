import { Reducer, createSlice } from '@reduxjs/toolkit';
import { newsletterEmailApi } from '../../services/newsletterEmailApi';

interface NewsletterEmailStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string;
  newsletterEmails: [] | any;
}

const initialNewsletterEmailState: NewsletterEmailStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  newsletterEmails: [],
};

export const newsletterEmailSlice = createSlice({
  name: 'newsletterEmail',
  initialState: initialNewsletterEmailState,
  reducers: {
    resetNewsletterEmailError: (state: any) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        newsletterEmailApi.endpoints.getNewsletterEmails.matchFulfilled,
        (state, { payload }: any) => {
          state.newsletterEmails = payload.newsletterEmails;
        }
      )
      .addMatcher(
        newsletterEmailApi.endpoints.createNewsletterEmail.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        newsletterEmailApi.endpoints.deleteNewsletterEmail.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected') &&
          action.payload?.data?.sliceName === 'newsletterEmailApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const newsletterEmailReducuer =
  newsletterEmailSlice.reducer as Reducer<NewsletterEmailStatePayload>;

export const { resetNewsletterEmailError } = newsletterEmailSlice.actions;
