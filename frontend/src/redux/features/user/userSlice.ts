import { Reducer, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../services/userApi';

interface Address {
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
  lastLoginTime: string;
  anonymousBidding: boolean;
  firstName: string;
  lastName: string;
  firstNameFirstInitial: string;
  lastNameFirstInitial: string;
  shippingAddress?: Address;
  addressRef?: Address;
  hasAddress: boolean;
}

interface UserStatePayload {
  loading: boolean;
  error: null;
  success: boolean;
  message: string | null;
  users: [];
  newsletterEmails: [];
  user: User | null;
  type: string;
  bids: [];
  donations: [];
  instantBuys: [];
  orders: [] | null;
  winningBids: [] | null;
  adoptionApplicationFees: [] | null;
  dataReady: boolean;
  openUserDrawer: boolean;
}

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
  donations: [],
  instantBuys: [],
  orders: null,
  winningBids: null,
  adoptionApplicationFees: null,
  dataReady: false,
  openUserDrawer: false,
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
    hydrateUserState: (state, { payload }) => {
      state.user = payload.user;
      state.dataReady = true;
    },
    resetUser: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
      state.users = [];
      state.user = null;
      state.bids = [];
      state.donations = [];
      state.instantBuys = [];
      state.winningBids = null;
      state.adoptionApplicationFees = null;
    },
    setOpenUserDrawer: (state) => {
      state.openUserDrawer = true;
    },
    setCloseUserDrawer: (state) => {
      state.openUserDrawer = false;
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
      .addMatcher(userApi.endpoints.updateUserRole.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(userApi.endpoints.deleteUser.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(userApi.endpoints.updateUserProfile.matchFulfilled, (state, { payload }: any) => {
        state.user = {
          ...state.user,
          ...payload.user,
        };
      })
      .addMatcher(userApi.endpoints.fetchUserProfile.matchFulfilled, (state, { payload }: any) => {
        state.bids = payload.bids;
        state.instantBuys = payload.instantBuys;
        state.orders = payload.orders;
        state.winningBids = payload.winningBids;
        state.adoptionApplicationFees = payload.adoptionApplicationFees;
        state.user = payload.user;
        state.donations = payload.donations;
      })
      .addMatcher(userApi.endpoints.removeUserAddress.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(
        (action: any) => action.type.endsWith('/rejected') && action?.payload?.data?.sliceName === 'userApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const userReducuer = userSlice.reducer as Reducer<UserStatePayload>;

export const { resetUserSuccess, resetUserError, hydrateUserState, resetUser, setOpenUserDrawer, setCloseUserDrawer } = userSlice.actions;
