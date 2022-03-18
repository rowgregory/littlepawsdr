import axios from 'axios';
import {
  DONATE_CREATE_REQUEST,
  DONATE_CREATE_SUCCESS,
  DONATE_CREATE_FAIL,
  DONATE_DETAILS_REQUEST,
  DONATE_DETAILS_SUCCESS,
  DONATE_DETAILS_FAIL,
  DONATE_LIST_REQUEST,
  DONATE_LIST_SUCCESS,
  DONATE_LIST_FAIL,
  DONATE_UPDATE_REQUEST,
  DONATE_UPDATE_SUCCESS,
  DONATE_UPDATE_FAIL,
  DONATE_DELETE_REQUEST,
  DONATE_DELETE_SUCCESS,
  DONATE_DELETE_FAIL,
} from '../constants/donationConstants';

export const createDonation = (donation: any) => async (dispatch: any) => {
  try {
    dispatch({ type: DONATE_CREATE_REQUEST });

    const { data } = await axios.post(`/api/donations`, donation);

    dispatch({ type: DONATE_CREATE_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: DONATE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//@ts-ignore
export const getDonationById = (id: any) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DONATE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/donations/${id}`, config);

    dispatch({
      type: DONATE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DONATE_DETAILS_FAIL,
      payload: message,
    });
  }
};
//@ts-ignore
export const listDonations = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DONATE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/donations`, config);

    dispatch({ type: DONATE_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: DONATE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDonation =
  (donation: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: DONATE_UPDATE_REQUEST });

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
        `/api/donations/${donation._id}`,
        donation,
        config
      );

      dispatch({ type: DONATE_UPDATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: DONATE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteDonation =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: DONATE_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/donations/${id}`, config);

      dispatch({ type: DONATE_DELETE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: DONATE_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
