import { Reducer, createSlice } from '@reduxjs/toolkit';

interface NavbarStatePayload {
  loading: boolean;
  toggle: {
    leftDrawer: boolean;
    bgColor: boolean;
    userDropdown: boolean;
  };
}

const initialNavbarState = {
  loading: false,
  toggle: {
    leftDrawer: false,
    bgColor: false,
    userDropdown: false,
  },
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: initialNavbarState,
  reducers: {
    toggleLeftDrawer: (state, { payload }) => {
      state.toggle.leftDrawer = payload.leftDrawer;
    },
    toggleBgColor: (state, { payload }) => {
      state.toggle.bgColor = payload.bgColor;
    },
    toggleUserDropdown: (state, { payload }) => {
      state.toggle.userDropdown = payload.userDropdown;
    },
  },
});

export const navbarReducer = navbarSlice.reducer as Reducer<NavbarStatePayload>;

export const { toggleLeftDrawer, toggleBgColor, toggleUserDropdown } =
  navbarSlice.actions;
