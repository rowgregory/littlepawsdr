import axios from 'axios';
import {
  ECARD_ORDER_CREATE_FAIL,
  ECARD_ORDER_CREATE_REQUEST,
  ECARD_ORDER_CREATE_SUCCESS,
  ECARD_ORDER_DETAILS_FAIL,
  ECARD_ORDER_DETAILS_REQUEST,
  ECARD_ORDER_DETAILS_SUCCESS,
  ECARD_ORDERS_LIST_REQUEST,
  ECARD_ORDERS_LIST_SUCCESS,
  ECARD_ORDERS_LIST_FAIL,
} from '../constants/eCardOrderContants';

export const createECardOrder = (eCard: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ECARD_ORDER_CREATE_REQUEST });

    const { data } = await axios.post(`/api/ecard-order`, eCard);

    dispatch({ type: ECARD_ORDER_CREATE_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ECARD_ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getECardOrderDetails = (eCardId: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ECARD_ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/ecard-order/${eCardId}`);

    dispatch({ type: ECARD_ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ECARD_ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listECardOrders = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: ECARD_ORDERS_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/ecard-order/list`, config);

    dispatch({ type: ECARD_ORDERS_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ECARD_ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
