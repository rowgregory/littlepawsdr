import { Reducer, createSlice } from '@reduxjs/toolkit';
import { productApi } from '../../services/productApi';

interface ProductStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  products: [] | any;
  product: {} | null;
  type: string;
}

const initialProductState: ProductStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  products: [],
  product: null,
  type: '',
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
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(productApi.endpoints.getProducts.matchFulfilled, (state, { payload }: any) => {
        state.products = payload.products;
      })
      .addMatcher(productApi.endpoints.getProduct.matchFulfilled, (state, { payload }: any) => {
        state.product = payload.product;
      })
      .addMatcher(productApi.endpoints.updateProduct.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
        state.success = true;
        state.type = payload.type;
      })
      .addMatcher(productApi.endpoints.createProduct.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(productApi.endpoints.deleteProduct.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(
        productApi.endpoints.deleteProductPhoto.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'productApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const productReducuer = productSlice.reducer as Reducer<ProductStatePayload>;

export const { clearProduct, resetSuccess, resetProductError } = productSlice.actions;
