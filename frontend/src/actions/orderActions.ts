import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_SHIP_REQUEST,
  ORDER_SHIP_SUCCESS,
  ORDER_SHIP_FAIL,
  ORDER_GUEST_DETAILS_REQUEST,
  ORDER_GUEST_DETAILS_SUCCESS,
  ORDER_GUEST_DETAILS_FAIL,
  ORDER_EMAIL_CONFIRMATION_REQUEST,
  ORDER_EMAIL_CONFIRMATION_SUCCESS,
  ORDER_EMAIL_CONFIRMATION_FAIL,
} from '../constants/orderConstants';

export const createOrder =
  (order: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/orders`, order, config);

      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      dispatch({
        type: CART_CLEAR_ITEMS,
        payload: data,
      });
      localStorage.removeItem('cartItems');
    } catch (error: any) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getOrderDetails =
  (orderId: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/${orderId}`, config);

      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getGuestOrderDetails =
  (guestOrderId: any) => async (dispatch: any) => {
    try {
      dispatch({ type: ORDER_GUEST_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/guest-orders/${guestOrderId}`);

      dispatch({ type: ORDER_GUEST_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ORDER_GUEST_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const payOrder =
  (orderId: any, paymentResult: any) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyOrders = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/my-orders`, config);

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const shipOrder =
  (order: any, isShipped: boolean) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: ORDER_SHIP_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${order._id}/ship`,
        { isShipped },
        config
      );

      dispatch({ type: ORDER_SHIP_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ORDER_SHIP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const sendOrderConfirmationEmail =
  (order: any, email?: any) => async (dispatch: any) => {
    try {
      dispatch({ type: ORDER_EMAIL_CONFIRMATION_REQUEST });

      const { data } = await axios.post(
        `/api/orders/send-order-confirmation-email`,
        { order, email }
      );

      dispatch({ type: ORDER_EMAIL_CONFIRMATION_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ORDER_EMAIL_CONFIRMATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
