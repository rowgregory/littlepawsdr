import { Reducer, createSlice } from '@reduxjs/toolkit';

interface CartStatePayload {
  cartItems: CartItem[];
  cartItem: CartItem | null;
  cartDrawer: boolean;
  cartItemsAmount: number;
  subtotal: number;
  shippingPrice: number;
  isPhysicalProduct: boolean;
  totalPrice: number;
}

interface CartItem {
  itemId: string;
  itemType: 'product' | 'ecard' | 'welcomeWiener';
  itemName: string;
  itemImage: string;
  quantity: number;
  price: number;
  shippingPrice: number;
  isPhysicalProduct?: boolean;
  size?: string;
  message?: string;
  dateToSend?: Date;
  sendNow?: 'send-now' | 'send-later';
  recipientsEmail?: string;
  recipientsFullName?: string;
  dachshundName?: string;
}

const initialCartState: CartStatePayload = {
  cartItems: [],
  cartItem: null,
  cartDrawer: false,
  cartItemsAmount: 0,
  subtotal: 0,
  shippingPrice: 0,
  isPhysicalProduct: false,
  totalPrice: 0,
};

// Helper function
const updateCartTotals = (state: any) => {
  const { shippingPrice, totalItems, subtotal } = state.cartItems.reduce(
    (acc: any, item: any) => ({
      shippingPrice: acc.shippingPrice + (item.shippingPrice || 0) * item.quantity,
      totalItems: acc.totalItems + item.quantity,
      subtotal: acc.subtotal + item.price * item.quantity,
    }),
    { shippingPrice: 0, totalItems: 0, subtotal: 0 }
  );

  state.cartItemsAmount = totalItems;
  state.subtotal = subtotal;
  state.shippingPrice = shippingPrice;
  state.isPhysicalProduct = state.cartItems.some((item: any) => item.isPhysicalProduct);
  state.totalPrice = shippingPrice + subtotal;

  localStorage.setItem('cartData', JSON.stringify(state.cartItems));
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

      // Simple match: itemId + size (if exists)
      const existingItem: any = state.cartItems.find(
        (x: any) => x.itemId === item.itemId && x.size === item.size
      );

      if (existingItem && item.itemType !== 'ecard') {
        existingItem.quantity += 1;
        state.cartItem = existingItem;
      } else {
        const newItem = { ...item, quantity: item.quantity || 1 };
        state.cartItems.push(newItem);
        state.cartItem = newItem;
      }

      updateCartTotals(state);
    },
    removeFromCart: (state, { payload }) => {
      const item = payload.item;
      state.cartItems = state.cartItems.filter(
        (x: any) => !(x.itemId === item.itemId && x.size === item.size)
      );
      updateCartTotals(state);
    },

    deleteProductFromCart: (state, { payload }) => {
      const item = payload.item;

      const existingItem = state.cartItems.find(
        (x: any) => x.itemId === item.itemId && x.size === item.size
      );

      if (existingItem) {
        existingItem.quantity -= 1;

        // Remove entirely if quantity reaches 0
        if (existingItem.quantity <= 0) {
          state.cartItems = state.cartItems.filter(
            (x: any) => !(x.itemId === item.itemId && x.size === item.size)
          );
        }
      }

      updateCartTotals(state);
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.cartItem = null;
      state.subtotal = 0;
      state.cartItemsAmount = 0;
      state.cartDrawer = false;
      state.totalPrice = 0;
      state.isPhysicalProduct = false;
    },
  },
});

export const cartReducer = cartSlice.reducer as Reducer<CartStatePayload>;

export const { toggleCartDrawer, addToCart, removeFromCart, deleteProductFromCart, resetCart } =
  cartSlice.actions;
