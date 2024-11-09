import { Reducer, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../services/userApi';
import { UserStatePayload } from '../../../types/user-types';

const initialUserState: UserStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  users: [],
  newsletterEmails: [],
  user: null,
  type: '',
  bids: [],
  auctionDonations: [],
  donations: [],
  instantBuys: [],
  orders: null,
  winningBids: null,
  adoptionApplicationFees: null,
  hasShippingAddress: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    resetUserSuccess: (state) => {
      state.success = false;
      state.type = '';
    },
    resetUserError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (build) => {
    build
      .addMatcher(userApi.endpoints.getUsers.matchFulfilled, (state, { payload }: any) => {
        state.users = payload.users;
      })
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, { payload }: any) => {
        state.user = payload.user;
      })
      .addMatcher(
        userApi.endpoints.getUserShippingAddress.matchFulfilled,
        (state, { payload }: any) => {
          state.hasShippingAddress = payload.hasShippingAddress;
        }
      )
      .addMatcher(userApi.endpoints.updateUser.matchFulfilled, (state, { payload }: any) => {
        state.user = payload.user;
        state.success = true;
        state.type = payload.type;
        state.message = payload.message;
      })
      .addMatcher(userApi.endpoints.updateUserRole.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(userApi.endpoints.deleteUser.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(userApi.endpoints.fetchPersonalData.matchFulfilled, (state, { payload }: any) => {
        state.bids = payload.bids;
        state.auctionDonations = payload.auctionDonations;
        state.instantBuys = payload.instantBuys;
        state.orders = payload.orders;
        state.winningBids = payload.winningBids;
        state.adoptionApplicationFees = payload.adoptionApplicationFees;
        state.user = payload.user;
        state.donations = payload.donations;
      })
      .addMatcher(
        userApi.endpoints.updateUserProfileDetails.matchFulfilled,
        (state, { payload }: any) => {
          state.user = {
            ...state.user,
            ...payload.user,
          };
        }
      )
      .addMatcher(
        userApi.endpoints.fetchUserProfileDetails.matchFulfilled,
        (state, { payload }: any) => {
          state.user = payload.user;
        }
      )
      .addMatcher(
        userApi.endpoints.fetchUserAnonStatusAndShippingAddressDetails.matchFulfilled,
        (state, { payload }: any) => {
          state.user = payload.user;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith('/rejected') && action?.payload?.data?.sliceName === 'userApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const userReducuer = userSlice.reducer as Reducer<UserStatePayload>;

export const { resetUserSuccess, resetUserError } = userSlice.actions;
