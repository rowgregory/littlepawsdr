import axios from 'axios';
import {
  WELCOME_WIENER_ORDER_CREATE_FAIL,
  WELCOME_WIENER_ORDER_CREATE_REQUEST,
  WELCOME_WIENER_ORDER_CREATE_SUCCESS,
  WELCOME_WIENER_ORDER_DETAILS_FAIL,
  WELCOME_WIENER_ORDER_DETAILS_REQUEST,
  WELCOME_WIENER_ORDER_DETAILS_SUCCESS,
  WELCOME_WIENER_ORDER_LIST_FAIL,
  WELCOME_WIENER_ORDER_LIST_REQUEST,
  WELCOME_WIENER_ORDER_LIST_SUCCESS,
} from '../constants/welcomeWienerOrderConstants';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';

export const createWelcomeWienerOrder =
  (order: any) => async (dispatch: any) => {
    try {
      dispatch({ type: WELCOME_WIENER_ORDER_CREATE_REQUEST });

      const { data } = await axios.post(`/api/welcome-wiener-order`, order);

      dispatch({ type: WELCOME_WIENER_ORDER_CREATE_SUCCESS, payload: data });

      dispatch({ type: CART_CLEAR_ITEMS });

      localStorage.removeItem('cartItems');
    } catch (error: any) {
      dispatch({
        type: WELCOME_WIENER_ORDER_CREATE_FAIL,
        payload: {
          message: error.response.data.message,
          data: error.response.data.data,
        },
      });
    }
  };

export const getWelcomeWienerOrderDetails =
  (orderId: any) => async (dispatch: any) => {
    try {
      dispatch({ type: WELCOME_WIENER_ORDER_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/welcome-wiener-order/${orderId}`);

      dispatch({ type: WELCOME_WIENER_ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: WELCOME_WIENER_ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listWelcomeWienerOrders = () => async (dispatch: any) => {
  try {
    dispatch({ type: WELCOME_WIENER_ORDER_LIST_REQUEST });

    const { data } = await axios.get(`/api/welcome-wiener-order`);

    dispatch({ type: WELCOME_WIENER_ORDER_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: WELCOME_WIENER_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : '404 - Not Found',
    });
  }
};
