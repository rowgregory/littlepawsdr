import axios from 'axios';
import {
  WELCOME_WIENER_DACHSHUND_LIST_REQUEST,
  WELCOME_WIENER_DACHSHUND_LIST_SUCCESS,
  WELCOME_WIENER_DACHSHUND_LIST_FAIL,
  WELCOME_WIENER_DACHSHUND_CREATE_REQUEST,
  WELCOME_WIENER_DACHSHUND_CREATE_SUCCESS,
  WELCOME_WIENER_DACHSHUND_CREATE_FAIL,
  WELCOME_WIENER_DACHSHUND_UPDATE_REQUEST,
  WELCOME_WIENER_DACHSHUND_UPDATE_SUCCESS,
  WELCOME_WIENER_DACHSHUND_UPDATE_FAIL,
  WELCOME_WIENER_DACHSHUND_GET_BY_ID_REQUEST,
  WELCOME_WIENER_DACHSHUND_GET_BY_ID_SUCCESS,
  WELCOME_WIENER_DACHSHUND_GET_BY_ID_FAIL,
  WELCOME_WIENER_DACHSHUND_DELETE_REQUEST,
  WELCOME_WIENER_DACHSHUND_DELETE_SUCCESS,
  WELCOME_WIENER_DACHSHUND_DELETE_FAIL,
  TOGGLE_WELCOME_DACHSHUND_REQUEST,
  TOGGLE_WELCOME_DACHSHUND_SUCCESS,
  TOGGLE_WELCOME_DACHSHUND_FAIL,
} from '../constants/welcomeWienerDachshundConstants';
import { WELCOME_WIENER_DACHSHUND_BASE } from '../constants/welcomeWienerDachshundConstants';

export const listWelcomeWienerDachshunds = () => async (dispatch: any) => {
  try {
    dispatch({ type: WELCOME_WIENER_DACHSHUND_LIST_REQUEST });

    const { data } = await axios.get(WELCOME_WIENER_DACHSHUND_BASE);

    dispatch({ type: WELCOME_WIENER_DACHSHUND_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: WELCOME_WIENER_DACHSHUND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : '404 - Not Found',
    });
  }
};

export const getWelcomeWienerDachshundDetails =
  (id: any) => async (dispatch: any) => {
    try {
      dispatch({ type: WELCOME_WIENER_DACHSHUND_GET_BY_ID_REQUEST });

      const { data } = await axios.get(
        `${WELCOME_WIENER_DACHSHUND_BASE}/${id}`
      );

      dispatch({
        type: WELCOME_WIENER_DACHSHUND_GET_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: WELCOME_WIENER_DACHSHUND_GET_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteWelcomeWienerDachshund =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: WELCOME_WIENER_DACHSHUND_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = (await axios.delete(
        `${WELCOME_WIENER_DACHSHUND_BASE}/${id}`,
        config
      )) as any;

      dispatch({ type: WELCOME_WIENER_DACHSHUND_DELETE_SUCCESS });

      dispatch({
        type: WELCOME_WIENER_DACHSHUND_LIST_SUCCESS,
        payload: data.dachshundList,
      });
    } catch (error: any) {
      dispatch({
        type: WELCOME_WIENER_DACHSHUND_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createWelcomeWienerDachshund =
  (product: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: WELCOME_WIENER_DACHSHUND_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        WELCOME_WIENER_DACHSHUND_BASE,
        product,
        config
      );

      dispatch({
        type: WELCOME_WIENER_DACHSHUND_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: WELCOME_WIENER_DACHSHUND_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateWelcomeWienerDachshund =
  (product: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: WELCOME_WIENER_DACHSHUND_UPDATE_REQUEST });

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
        `${WELCOME_WIENER_DACHSHUND_BASE}/${product._id}`,
        product,
        config
      );

      dispatch({
        type: WELCOME_WIENER_DACHSHUND_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: WELCOME_WIENER_DACHSHUND_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const toggleWelcomeDachshund =
  (welcomeDachshund: boolean, id: any) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: TOGGLE_WELCOME_DACHSHUND_REQUEST });

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
        `${WELCOME_WIENER_DACHSHUND_BASE}/toggle-live`,
        { welcomeDachshund, id },
        config
      );

      dispatch({
        type: TOGGLE_WELCOME_DACHSHUND_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: TOGGLE_WELCOME_DACHSHUND_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
