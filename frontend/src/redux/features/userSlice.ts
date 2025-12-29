import { Reducer, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/entities/user';
import { IBid } from '../../types/entities/bid';
import { IAuctionItemInstantBuyer } from '../../types/entities/auction-item-instant-buyer';
import { IAuctionWinningBidder } from '../../types/entities/auction-winning-bidder';

interface UserStatePayload {
  loading: boolean;
  error: null;
  success: boolean;
  message: string | null;
  users: IUser[];
  newsletterEmails: [];
  user: IUser | null;
  type: string;
  bids: IBid[];
  donations: [];
  instantBuys: IAuctionItemInstantBuyer[] | null;
  orders: [] | null;
  winningBids: IAuctionWinningBidder[] | null;
  adoptionApplicationFees: [] | null;
  openUserDrawer: boolean;
  currentVersion: string;
}

const userState: UserStatePayload = {
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
  openUserDrawer: false,
  currentVersion: '0.0.0',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
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
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    hydrateVersion: (state, { payload }) => {
      state.currentVersion = payload;
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
});

export const userReducuer = userSlice.reducer as Reducer<UserStatePayload>;

export const {
  resetUserSuccess,
  resetUserError,
  hydrateUserState,
  resetUser,
  setOpenUserDrawer,
  setCloseUserDrawer,
  hydrateVersion,
  setUsers,
} = userSlice.actions;
