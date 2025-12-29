import { Reducer, createSlice } from '@reduxjs/toolkit';

interface OrdersStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  orders: [] | null;
  order: {} | null | any;
  adoptionApplicationFees: [] | null;
  orderDrawer: boolean;
}

const initialOrdersState: OrdersStatePayload = {
  loading: false,
  success: false,
  error: null,
  orders: [],
  order: {},
  message: '',
  adoptionApplicationFees: [],
  orderDrawer: false,
};

export const orderSlide = createSlice({
  name: 'order',
  initialState: initialOrdersState,
  reducers: {
    resetOrderError: (state) => {
      state.error = null;
      state.message = null;
    },
    setOrders: (state, { payload }) => {
      state.orders = payload;
    },
    setOrder: (state, { payload }) => {
      state.order = payload;
    },
    setOpenOrderDrawer: (state) => {
      state.orderDrawer = true;
    },
    setCloseOrderDrawer: (state) => {
      state.orderDrawer = false;
    },
  },
});

export const ordersReducer = orderSlide.reducer as Reducer<OrdersStatePayload>;

export const { resetOrderError, setOrders, setOrder, setCloseOrderDrawer, setOpenOrderDrawer } =
  orderSlide.actions;
