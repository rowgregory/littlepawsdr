import { Reducer, createSlice } from '@reduxjs/toolkit';

interface WelcomeWienerStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string;
  welcomeWieners: [] | any;
  welcomeWiener: {} | any | null;
  welcomeWienerProducts: [];
  welcomeWienerProduct: {};
  welcomeWienerDrawer: boolean;
}

const initialWelcomeWienerState: WelcomeWienerStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  welcomeWieners: [],
  welcomeWiener: {},
  welcomeWienerProducts: [],
  welcomeWienerProduct: {},
  welcomeWienerDrawer: false,
};

export const welcomeWienerSlice = createSlice({
  name: 'welcomeWiener',
  initialState: initialWelcomeWienerState,
  reducers: {
    resetWelcomeWienerError: (state: any) => {
      state.error = null;
      state.message = null;
    },
    setWelcomeWienerDogs: (state, { payload }) => {
      state.welcomeWieners = payload;
    },
    setOpenWelcomeWienerDrawer: (state) => {
      state.welcomeWienerDrawer = true;
    },
    setCloseWelcomeWienerDrawer: (state) => {
      state.welcomeWienerDrawer = false;
    },
    setWelcomeWienerProducts: (state, { payload }) => {
      state.welcomeWienerProducts = payload;
    },
  },
});

export const welcomeWienerReducer =
  welcomeWienerSlice.reducer as Reducer<WelcomeWienerStatePayload>;

export const {
  resetWelcomeWienerError,
  setWelcomeWienerDogs,
  setCloseWelcomeWienerDrawer,
  setOpenWelcomeWienerDrawer,
  setWelcomeWienerProducts,
} = welcomeWienerSlice.actions;
