import { Reducer, createSlice } from '@reduxjs/toolkit';
import addToExistingCartItem from '../../../utils/cart-utils/addToExistingCartItem';
import addNewCartItem from '../../../utils/cart-utils/addNewCartItem';
import cartRemoveItem from '../../../utils/cart-utils/cartRemoveItem';
import cartDeleteItemSuccess from '../../../utils/cart-utils/cartDeleteItemSuccess';

interface CartStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message?: string;
  cartItems: [];
  cartItem: {};
  cartDrawer: boolean;
  cartItemsAmount: number;
  subtotal: number;
  shippingPrice: number;
  isPhysicalProduct: boolean;
  totalPrice: number;
  step: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
  };
  isProduct: boolean;
  showModal: boolean;
  fields: {} | null | any;
}

const initialCartState: CartStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  cartItems: [],
  cartItem: {},
  cartDrawer: false,
  cartItemsAmount: 0,
  subtotal: 0,
  shippingPrice: 0,
  isPhysicalProduct: false,
  totalPrice: 0,
  step: {
    step1: true,
    step2: false,
    step3: false,
  },
  isProduct: false,
  showModal: false,
  fields: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    toggleCartDrawer: (state, { payload }) => {
      state.cartDrawer = payload;
    },
    addToCart: (state, { payload }) => {
      const item = payload.item;
      const existingItem: any = state.cartItems.find((x: any) =>
        item?.dachshundId
          ? x?.productId === item?.productId && x?.dachshundId === item?.dachshundId
          : x?.productId === item?.productId && x?.size === item?.size
      );

      if (existingItem && !item.isEcard) {
        return addToExistingCartItem(item, state, existingItem);
      }
      return addNewCartItem(item, state);
    },
    removeFromCart: (state, { payload }) => {
      const item = payload.item;
      return cartRemoveItem(item, state);
    },
    deleteProductFromCart: (state, { payload }) => {
      const item = payload.item;
      return cartDeleteItemSuccess(item, state);
    },
    resetCart: () => {
      return initialCartState;
    },
    setStep: (state, { payload }) => {
      state.step = payload;
    },
    setShowModal: (state, { payload }) => {
      state.showModal = payload;
    },
  },
});

export const cartReducer = cartSlice.reducer as Reducer<CartStatePayload>;

export const {
  toggleCartDrawer,
  addToCart,
  removeFromCart,
  deleteProductFromCart,
  resetCart,
  setStep,
  setShowModal,
} = cartSlice.actions;
