import axios from 'axios';
import {
  WELCOME_WIENER_PRODUCT_BASE,
  WELCOME_WIENER_PRODUCT_CREATE_FAIL,
  WELCOME_WIENER_PRODUCT_CREATE_REQUEST,
  WELCOME_WIENER_PRODUCT_CREATE_SUCCESS,
  WELCOME_WIENER_PRODUCT_DELETE_FAIL,
  WELCOME_WIENER_PRODUCT_DELETE_REQUEST,
  WELCOME_WIENER_PRODUCT_DELETE_SUCCESS,
  WELCOME_WIENER_PRODUCT_GET_BY_ID_FAIL,
  WELCOME_WIENER_PRODUCT_GET_BY_ID_REQUEST,
  WELCOME_WIENER_PRODUCT_GET_BY_ID_SUCCESS,
  WELCOME_WIENER_PRODUCT_LIST_FAIL,
  WELCOME_WIENER_PRODUCT_LIST_REQUEST,
  WELCOME_WIENER_PRODUCT_LIST_SUCCESS,
  WELCOME_WIENER_PRODUCT_UPDATE_FAIL,
  WELCOME_WIENER_PRODUCT_UPDATE_REQUEST,
  WELCOME_WIENER_PRODUCT_UPDATE_SUCCESS,
} from '../constants/welcomeWienerProductConstants';

export const listWelcomeWienerProducts = () => async (dispatch: any) => {
  try {
    dispatch({ type: WELCOME_WIENER_PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(WELCOME_WIENER_PRODUCT_BASE);

    dispatch({ type: WELCOME_WIENER_PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: WELCOME_WIENER_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : '404 - Not Found',
    });
  }
};

export const getWelcomeWienerProductDetails =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: WELCOME_WIENER_PRODUCT_GET_BY_ID_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${WELCOME_WIENER_PRODUCT_BASE}/${id}`,
        config
      );

      dispatch({
        type: WELCOME_WIENER_PRODUCT_GET_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: WELCOME_WIENER_PRODUCT_GET_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteWelcomeWienerProduct =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: WELCOME_WIENER_PRODUCT_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = (await axios.delete(
        `${WELCOME_WIENER_PRODUCT_BASE}/${id}`,
        config
      )) as any;

      dispatch({ type: WELCOME_WIENER_PRODUCT_DELETE_SUCCESS });

      dispatch({
        type: WELCOME_WIENER_PRODUCT_LIST_SUCCESS,
        payload: data.productList,
      });
    } catch (error: any) {
      dispatch({
        type: WELCOME_WIENER_PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createWelcomeWienerProduct =
  (product: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: WELCOME_WIENER_PRODUCT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        WELCOME_WIENER_PRODUCT_BASE,
        product,
        config
      );

      dispatch({ type: WELCOME_WIENER_PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: WELCOME_WIENER_PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateWelcomeWienerProduct =
  (product: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: WELCOME_WIENER_PRODUCT_UPDATE_REQUEST });

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
        `${WELCOME_WIENER_PRODUCT_BASE}/${product._id}`,
        product,
        config
      );

      dispatch({ type: WELCOME_WIENER_PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: WELCOME_WIENER_PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
