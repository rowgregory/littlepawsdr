import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const addToCart =
  (id: any, qty: number, size: string, sizes: any) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: CART_ADD_ITEM_REQUEST });

      const { data } = await axios.get(`/api/products/client/${id}`);

      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty,
          size,
          sizes,
        },
      });

      dispatch({ type: CART_ADD_ITEM_SUCCESS });

      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error: any) {
      dispatch({
        type: CART_ADD_ITEM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const removeFromCart =
  (id: any, size: string) => async (dispatch: any, getState: any) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: { id, size },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const saveShippingAddress =
  (data: any) => async (dispatch: any, getState: any) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };
export const savePaymentMethod = (data: any) => async (dispatch: any) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
