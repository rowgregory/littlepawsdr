import { Reducer, createSlice } from '@reduxjs/toolkit';
import { donationApi } from '../../services/donationApi';

interface DonationStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  donations: [] | any;
  donation: {};
}

const initialDonationState: DonationStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  donations: [],
  donation: {},
};

export const donationSlice = createSlice({
  name: 'donation',
  initialState: initialDonationState,
  reducers: {
    resetDonationError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(donationApi.endpoints.getDonations.matchFulfilled, (state, { payload }: any) => {
        state.donations = payload.donations;
      })
      .addMatcher(
        donationApi.endpoints.createDonation.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'donationApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const eventReducer = donationSlice.reducer as Reducer<DonationStatePayload>;
export const { resetDonationError } = donationSlice.actions;
