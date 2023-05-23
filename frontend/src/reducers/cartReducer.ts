import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_ADD_ITEM_RESET,
  WELCOME_WIENER_ADD_CART_ITEM_REQUEST,
  WELCOME_WIENER_ADD_CART_ITEM_SUCCESS,
  WELCOME_WIENER_ADD_CART_ITEM_FAIL,
  WELCOME_WIENER_ADD_CART_ITEM_RESET,
  OPEN_CART_DRAWER,
  WELCOME_WIENER_DELETE_CART_ITEM_SUCCESS,
  WELCOME_WIENER_REMOVE_CART_ITEM,
} from '../constants/cartConstants';

export const cartReducer = (
  state = {
    loading: false,
    cartItem: {},
    cartItems: [],
    shippingAddress: {},
    welcomeWienerCartItems: [],
    success: false,
    cartItemsAmount: 0,
    cartDrawer: null,
  },
  action: any
) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem: any = state.cartItems.find(
        (x: any) => x.product === item.product && x.size === item.size
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x: any) =>
            x.product === existItem.product && x.size === existItem.size
              ? item
              : x
          ),
          loading: false,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          loading: false,
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x: any) =>
          x.size !== ''
            ? x.size !== action.payload.size || x.product !== action.payload.id
            : x.product !== action.payload.id
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        loading: false,
        cartItems: [],
        cartItem: {},
        cartItemsAmount: 0,
        subtotal: 0,
      };
    case CART_ADD_ITEM_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    case CART_ADD_ITEM_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case CART_ADD_ITEM_RESET:
      return {
        ...state,
        success: false,
      };
    case WELCOME_WIENER_ADD_CART_ITEM_REQUEST:
      return { ...state, loading: true };
    case WELCOME_WIENER_ADD_CART_ITEM_SUCCESS:
      const itemExists: any = state.cartItems.find(
        (x: any) =>
          x.productId === action.payload.productId &&
          x.dachshundId === action.payload.dachshundId
      );

      if (itemExists) {
        itemExists.quantity += 1;

        const updatedCartItem = state.cartItems.map((item: any) =>
          item.productId === action.payload.productId &&
          item.dachshundId === action.payload.dachshundId
            ? itemExists
            : item
        );

        let totalItems = 0;

        updatedCartItem.forEach((item) => {
          totalItems += item.quantity || 1;
        });

        return {
          ...state,
          loading: false,
          cartItem: action.payload,
          cartItems: updatedCartItem,
          cartItemsAmount: totalItems,
          cartDrawer: true,
          subtotal: updatedCartItem
            .reduce(
              (acc: any, item: any) => acc + Number(item.price) * item.quantity,
              0
            )
            .toLocaleString('en-us', { style: 'currency', currency: 'USD' }),
        };
      }

      const newCartItem = [
        ...state.cartItems,
        { ...action.payload, quantity: 1 },
      ];

      let totalNewCartItems = 0;

      newCartItem.forEach((item) => {
        totalNewCartItems += item.quantity || 1;
      });

      return {
        ...state,
        loading: false,
        cartItem: action.payload,
        cartItems: newCartItem,
        cartItemsAmount: totalNewCartItems,
        cartDrawer: true,
        subtotal: newCartItem
          .reduce(
            (acc: any, item: any) => acc + Number(item.price) * item.quantity,
            0
          )
          .toLocaleString('en-us', { style: 'currency', currency: 'USD' }),
      };
    case WELCOME_WIENER_DELETE_CART_ITEM_SUCCESS:
      const itemAlreadyExists: any = state.cartItems.find(
        (x: any) =>
          x.productId === action.payload.productId &&
          x.dachshundId === action.payload.dachshundId
      );

      if (itemAlreadyExists) {
        itemAlreadyExists.quantity -= 1;

        const updatedCartItem = state.cartItems.map((item: any) =>
          item.productId === action.payload.productId &&
          item.dachshundId === action.payload.dachshundId
            ? itemAlreadyExists
            : item
        );

        let totalItems = 0;

        updatedCartItem.forEach((item) => {
          totalItems += item.quantity || 1;
        });

        return {
          ...state,
          loading: false,
          cartItem: action.payload,
          cartItems: updatedCartItem,
          cartItemsAmount: totalItems,
          cartDrawer: true,
          subtotal: updatedCartItem
            .reduce(
              (acc: any, item: any) => acc + Number(item.price) * item.quantity,
              0
            )
            .toLocaleString('en-us', { style: 'currency', currency: 'USD' }),
        };
      }
      return {
        ...state,
      };
    case WELCOME_WIENER_ADD_CART_ITEM_FAIL:
      return { ...state, loading: false };
    case WELCOME_WIENER_ADD_CART_ITEM_RESET:
      return {};
    case WELCOME_WIENER_REMOVE_CART_ITEM:
      const itemsLeftInCart = state.cartItems.filter(
        (x: any) =>
          x.productId !== action.payload.productId ||
          x.dachshundId !== action.payload.dachshundId
      );

      let totalItemsLeftInCart = 0;

      itemsLeftInCart.forEach((item: any) => {
        totalItemsLeftInCart += item.quantity || 1;
      });

      return {
        ...state,
        cartItem: action.payload,
        cartItems: itemsLeftInCart,
        cartItemsAmount: totalItemsLeftInCart,
        cartDrawer: false,
        subtotal: itemsLeftInCart
          .reduce(
            (acc: any, item: any) => acc + Number(item.price) * item.quantity,
            0
          )
          .toLocaleString('en-us', { style: 'currency', currency: 'USD' }),
      };
    case OPEN_CART_DRAWER:
      return {
        ...state,
        cartDrawer: action.payload,
      };
    default:
      return state;
  }
};
