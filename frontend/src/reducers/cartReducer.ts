import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { loading: false, cartItems: [], shippingAddress: {} },
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
        cartItems: [],
      };
    case CART_ADD_ITEM_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
