import axios from 'axios';
import {
  ECARD_CREATE_FAIL,
  ECARD_CREATE_REQUEST,
  ECARD_CREATE_SUCCESS,
  ECARD_DELETE_FAIL,
  ECARD_DELETE_REQUEST,
  ECARD_DELETE_SUCCESS,
  ECARD_DETAILS_FAIL,
  ECARD_DETAILS_REQUEST,
  ECARD_DETAILS_SUCCESS,
  ECARD_FILTERED_LIST_FAIL,
  ECARD_FILTERED_LIST_REQUEST,
  ECARD_FILTERED_LIST_SUCCESS,
  ECARD_LIST_FAIL,
  ECARD_LIST_REQUEST,
  ECARD_LIST_SUCCESS,
  ECARD_UPDATE_FAIL,
  ECARD_UPDATE_REQUEST,
  ECARD_UPDATE_SUCCESS,
} from '../constants/eCardConstants';

export const listECards = () => async (dispatch: any) => {
  try {
    dispatch({ type: ECARD_LIST_REQUEST });

    const { data } = await axios.get(`/api/ecard`);

    dispatch({ type: ECARD_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ECARD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : '404 - Not Found',
    });
  }
};

export const listFilteredEcards =
  (category: string) => async (dispatch: any) => {
    try {
      dispatch({ type: ECARD_FILTERED_LIST_REQUEST });

      const { data } = await axios.get(`/api/ecard/filtered/${category}`);

      dispatch({ type: ECARD_FILTERED_LIST_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ECARD_FILTERED_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : '404 - Not Found',
      });
    }
  };

export const createECard =
  (ecard: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: ECARD_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/ecard`, ecard, config);

      dispatch({ type: ECARD_CREATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ECARD_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getECardDetails =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: ECARD_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/ecard/${id}`, config);

      dispatch({ type: ECARD_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ECARD_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateECard =
  (eCard: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: ECARD_UPDATE_REQUEST });

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
        `/api/ecard/${eCard._id}`,
        eCard,
        config
      );

      dispatch({ type: ECARD_UPDATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ECARD_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteECard =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: ECARD_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/ecard/${id}`, config);

      dispatch({ type: ECARD_DELETE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ECARD_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
