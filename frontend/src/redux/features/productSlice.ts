import { Reducer, createSlice } from '@reduxjs/toolkit';

interface ProductStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  products: [] | any;
  product: {} | null;
  type: string;
  productDrawer: boolean;
}

const initialProductState: ProductStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  products: [],
  product: null,
  type: '',
  productDrawer: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    clearProduct: (state) => {
      state.product = {};
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    resetProductError: (state) => {
      state.error = null;
      state.message = null;
    },
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
    setOpenProductDrawer: (state) => {
      state.productDrawer = true;
    },
    setCloseProductDrawer: (state) => {
      state.productDrawer = false;
    },
  },
});

export const productReducuer = productSlice.reducer as Reducer<ProductStatePayload>;

export const {
  clearProduct,
  resetSuccess,
  resetProductError,
  setProducts,
  setCloseProductDrawer,
  setOpenProductDrawer,
} = productSlice.actions;
