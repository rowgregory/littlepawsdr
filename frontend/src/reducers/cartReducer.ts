import {
  CART_ADD_ITEM_SUCCESS,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  OPEN_CART_DRAWER,
  CART_DELETE_ITEM_SUCCESS,
  UPDATE_CART,
} from '../constants/cartConstants';
import cartAddItemSuccess from './cart/cartAddItemSuccess';
import cartDeleteItemSuccess from './cart/cartDeleteItemSuccess';
import cartRemoveItem from './cart/cartRemoveItem';

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
    case CART_ADD_ITEM_SUCCESS:
      return cartAddItemSuccess(state, action);
    case CART_REMOVE_ITEM:
      return cartRemoveItem(state, action);
    case CART_DELETE_ITEM_SUCCESS:
      return cartDeleteItemSuccess(state, action);
    case CART_CLEAR_ITEMS:
      return {
        loading: false,
        cartItem: {},
        cartItems: [],
        cartItemsAmount: 0,
        cartDrawer: false,
        subtotal: 0,
        shippingPrice: 0,
      };
    case OPEN_CART_DRAWER:
      return {
        ...state,
        cartDrawer: action.payload,
      };
    case UPDATE_CART:
      const { shippingPrice, cartItemsAmount, subtotal } =
        action.payload.reduce(
          (acc: any, item: any) => {
            return {
              shippingPrice:
                acc.shippingPrice +
                Number(item.shippingPrice) * Number(item.quantity),
              cartItemsAmount: (acc.cartItemsAmount += Number(item.quantity)),
              subtotal:
                acc.subtotal + Number(item.price) * Number(item.quantity),
            };
          },
          { shippingPrice: 0, cartItemsAmount: 0, subtotal: 0 }
        );

      const isPhysicalProduct = action.payload.some(
        (item: any) => item.isPhysicalProduct
      );

      const totalPrice = shippingPrice + subtotal;

      localStorage.setItem(
        'cartItems',
        JSON.stringify({
          cartItems: action.payload,
          cartItemsAmount,
          subtotal,
          shippingPrice,
          isPhysicalProduct,
          totalPrice,
        })
      );

      return {
        ...state,
        loading: false,
        cartItem: {},
        cartItems: action.payload,
        cartItemsAmount,
        cartDrawer: false,
        subtotal,
        shippingPrice,
        isPhysicalProduct,
        totalPrice,
      };
    default:
      return state;
  }
};
