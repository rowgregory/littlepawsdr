import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
  OPEN_CART_DRAWER,
  WELCOME_WIENER_ADD_CART_ITEM_FAIL,
  WELCOME_WIENER_ADD_CART_ITEM_REQUEST,
  WELCOME_WIENER_ADD_CART_ITEM_SUCCESS,
  WELCOME_WIENER_DELETE_CART_ITEM_SUCCESS,
  WELCOME_WIENER_REMOVE_CART_ITEM,
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

export const addWelcomeWienerProductToCart =
  (cartItem: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: WELCOME_WIENER_ADD_CART_ITEM_REQUEST,
      });
      dispatch({
        type: WELCOME_WIENER_ADD_CART_ITEM_SUCCESS,
        payload: cartItem,
      });

      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (err: any) {
      dispatch({
        type: WELCOME_WIENER_ADD_CART_ITEM_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const deletWelcomeWienerProductFromCart =
  (cartItem: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: WELCOME_WIENER_DELETE_CART_ITEM_SUCCESS,
        payload: cartItem,
      });

      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (err: any) {
      dispatch({
        type: WELCOME_WIENER_ADD_CART_ITEM_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const removeWelcomeWienerProductFromCart =
  (cartItem: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: WELCOME_WIENER_REMOVE_CART_ITEM,
        payload: cartItem,
      });

      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (err: any) {
      dispatch({
        type: WELCOME_WIENER_ADD_CART_ITEM_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const openCartDrawer = (show: any) => async (dispatch: any) =>
  dispatch({ type: OPEN_CART_DRAWER, payload: show });
