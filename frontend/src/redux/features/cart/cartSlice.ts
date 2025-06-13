import { PayloadAction, Reducer, createSlice } from '@reduxjs/toolkit';
import addToExistingCartItem from '../../../utils/cart-utils/addToExistingCartItem';
import addNewCartItem from '../../../utils/cart-utils/addNewCartItem';
import cartRemoveItem from '../../../utils/cart-utils/cartRemoveItem';
import cartDeleteItemSuccess from '../../../utils/cart-utils/cartDeleteItemSuccess';
import CryptoJS from 'crypto-js';

const secretKey = process.env.SECRET_KEY || 'default-secret-key';

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
    saveFormData: (_, { payload }) => {
      const encryptedData = localStorage.getItem('formData');
      let existingData = {};

      if (encryptedData) {
        try {
          const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
          existingData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
          console.error('Failed to decrypt form data:', error);
        }
      }

      // Combine existing data with new data
      const updatedData = {
        ...existingData,
        ...payload.inputs,
      };

      // Encrypt the updated data
      const newEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(updatedData), secretKey).toString();

      // Save the updated encrypted data to local storage
      localStorage.setItem('formData', newEncryptedData);
    },
    updateFormData: (_, { payload }) => {
      let existingData = {};

      const encryptedData = localStorage.getItem('formData');
      if (encryptedData) {
        try {
          const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
          existingData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
          console.error('Failed to decrypt form data:', error);
        }
      }

      // Merge existing data with new data
      const updatedData = {
        ...existingData,
        ...payload.inputs,
      };

      // Encrypt the updated data
      const newEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(updatedData), secretKey).toString();

      // Save the updated encrypted data to local storage
      localStorage.setItem('formData', newEncryptedData);
    },
    decryptFormData: (state) => {
      const encryptedData = localStorage.getItem('formData');

      // If no data is found, simply return without logging anything
      if (!encryptedData) {
        return;
      }

      try {
        // Attempt to decrypt the data
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        // Ensure the decrypted string is valid before parsing
        if (!decryptedString) {
          console.error('Decryption returned an empty string or invalid data.', decryptedString);
          return;
        }

        const decryptedData = JSON.parse(decryptedString);
        state.fields = decryptedData;
      } catch (error) {
        console.error('Failed to decrypt or parse form data:', error);
      }
    },
    resetForm: (state) => {
      state.loading = false;
      state.success = false;
      state.fields = null;
    },
    setCartFromStorage: (state, { payload }) => {
      state.cartItems = payload;
      state.cartItemsAmount = payload.length;
    },
    setCart: (state, action: PayloadAction<CartStatePayload>) => {
      return action.payload; // replace the whole cart state
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
  saveFormData,
  updateFormData,
  decryptFormData,
  resetForm,
  setCartFromStorage,
  setCart,
} = cartSlice.actions;
