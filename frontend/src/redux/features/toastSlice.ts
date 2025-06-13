import { createSlice } from '@reduxjs/toolkit';

export type Position = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
export type AlertType = 'success' | 'error' | 'warning' | 'info';

const initialState = {
  message: null,
  open: false,
  toastId: 0,
  id: 0,
  position: 'bc' as Position,
  type: 'success' as AlertType,
};

let toastId = 0;

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast: (state, { payload }) => {
      state.message = payload.message;
      state.open = true;
      state.toastId = Date.now();
      state.id = ++toastId;
      state.type = payload.type;
      state.position = payload.position;
    },
    closeToast: (state) => {
      state.message = null;
      state.open = false;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;

export const toastReducer = toastSlice.reducer;
