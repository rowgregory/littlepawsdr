import axios from 'axios';
import {
  GUEST_ORDER_CREATE_FAIL,
  GUEST_ORDER_CREATE_REQUEST,
  GUEST_ORDER_CREATE_SUCCESS,
  GUEST_ORDER_LIST_FAIL,
  GUEST_ORDER_LIST_REQUEST,
  GUEST_ORDER_LIST_SUCCESS,
  GUEST_ORDER_SHIP_FAIL,
  GUEST_ORDER_SHIP_REQUEST,
  GUEST_ORDER_SHIP_SUCCESS,
} from '../constants/guestOrderConstants';

export const createGuestOrder = (order: any) => async (dispatch: any) => {
  try {
    dispatch({ type: GUEST_ORDER_CREATE_REQUEST });

    const { data } = await axios.post(`/api/guest-orders`, order);

    dispatch({ type: GUEST_ORDER_CREATE_SUCCESS, payload: data });

    localStorage.removeItem('cartItems');
    localStorage.removeItem('newOrder');
    localStorage.removeItem('guestUserInfo');
  } catch (error: any) {
    dispatch({
      type: GUEST_ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listGuestOrders = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: GUEST_ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/guest-orders`, config);

    dispatch({ type: GUEST_ORDER_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: GUEST_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const shipGuestOrder =
  (order: any, isShipped: boolean) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: GUEST_ORDER_SHIP_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/guest-orders/${order._id}/ship`,
        { isShipped },
        config
      );

      dispatch({ type: GUEST_ORDER_SHIP_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: GUEST_ORDER_SHIP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };