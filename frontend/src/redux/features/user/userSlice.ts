import { Reducer, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../services/userApi';

export interface ShippingAddress {
  address: string;
  city: string;
  state: string;
  zipPostalCode: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar: string;
  online: boolean;
  token: string;
  confirmed: boolean;
  lastLoginTime: string;
  onlineStatus: string;
  theme: string;
  anonymousBidding: boolean;
  firstName: string;
  lastName: string;
  firstNameFirstInitial: string;
  lastNameFirstInitial: string;
  shippingAddress: ShippingAddress;
}

export interface UserStatePayload {
  loading: boolean;
  error: null;
  success: boolean;
  message: string | null;
  users: [];
  boardMembers: [];
  newsletterEmails: [];
  user: User | null;
  type: string;

  bids: [];
  auctionDonations: [];
  donations: [];
  instantBuys: [];
  orders: [] | null;
  winningBids: [] | null;
  adoptionApplicationFees: [] | null;
}

export const initialUserState: UserStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  users: [],
  boardMembers: [],
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
        state.donations = payload.donations;
        state.auctionDonations = payload.auctionDonations;
        state.instantBuys = payload.instantBuys;
        state.orders = payload.orders;
        state.winningBids = payload.winningBids;
        state.adoptionApplicationFees = payload.adoptionApplicationFees;
        state.user = payload.user;
      })
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
