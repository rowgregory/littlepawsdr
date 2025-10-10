import { Reducer, createSlice } from '@reduxjs/toolkit';
import { orderApi } from '../../services/orderApi';

interface OrdersStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  orders: [] | null;
  productOrders: [] | null;
  ecardOrders: [] | null;
  welcomeWienerOrders: [] | null;
  order: {} | null | any;
  adoptionApplicationFees: [] | null;
}

const initialOrdersState: OrdersStatePayload = {
  loading: false,
  success: false,
  error: null,
  orders: [],
  productOrders: [],
  ecardOrders: [],
  welcomeWienerOrders: [],
  order: {},
  message: '',
  adoptionApplicationFees: [],
};

export const orderSlide = createSlice({
  name: 'order',
  initialState: initialOrdersState,
  reducers: {
    resetOrderError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(orderApi.endpoints.getOrders.matchFulfilled, (state, { payload }: any) => {
        state.orders = payload.orders;
        state.ecardOrders = payload.ecardOrders;
        state.welcomeWienerOrders = payload.welcomeWienerOrders;
        state.productOrders = payload.productOrders;
      })
      .addMatcher(orderApi.endpoints.getOrder.matchFulfilled, (state, { payload }: any) => {
        state.order = payload.order;
      })
      .addMatcher(orderApi.endpoints.updateOrderStatus.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(
        (action: any) => action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'orderApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const ordersReducer = orderSlide.reducer as Reducer<OrdersStatePayload>;

export const { resetOrderError } = orderSlide.actions;
