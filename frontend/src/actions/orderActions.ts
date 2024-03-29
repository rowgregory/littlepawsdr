import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_SHIP_REQUEST,
  ORDER_SHIP_SUCCESS,
  ORDER_SHIP_FAIL,
  ORDER_EMAIL_CONFIRMATION_REQUEST,
  ORDER_EMAIL_CONFIRMATION_SUCCESS,
  ORDER_EMAIL_CONFIRMATION_FAIL,
  TRACKING_NUMBER_REQUEST,
  TRACKING_NUMBER_SUCCESS,
  TRACKING_NUMBER_FAIL,
} from '../constants/orderConstants';

export const createOrder = (order: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const { data } = await axios.post(`/api/order`, order);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

    dispatch({ type: CART_CLEAR_ITEMS });
    localStorage.removeItem('cartItems');
  } catch (error: any) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: {
        message: error.response.data.message,
        data: error.response.data.data,
        email: error.response.data.email,
        isShipped: error.response.data.isShipped,
      },
    });
  }
};

export const getOrderDetails = (orderId: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/order/${orderId}`);

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

    const { data } = await axios.get(`/api/order/my-orders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: {
        orders: data.orders,
        adoptionApplicationFees: data.adoptionApplicationFees,
      },
    });
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

    const { data } = await axios.get(`/api/order`, config);

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
  (id: any, isShipped: boolean) => async (dispatch: any, getState: any) => {
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
        `/api/order/${id}/ship`,
        { isShipped },
        config
      );

      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
      dispatch({ type: ORDER_SHIP_SUCCESS });
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

export const submitTrackingNumber =
  (trackingNumber: string, id: any) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: TRACKING_NUMBER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        `/api/order/${id}/tracking-number`,
        { trackingNumber },
        config
      );

      dispatch({ type: TRACKING_NUMBER_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: TRACKING_NUMBER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
