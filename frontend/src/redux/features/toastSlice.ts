import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  success: null,
  open: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast: (state, { payload }) => {
      state.message = payload.message;
      state.success = payload.success;
      state.open = payload.open;
    },
    closeToast: (state) => {
      state.message = null;
      state.success = null;
      state.open = false;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;

export const toastReducer = toastSlice.reducer;
