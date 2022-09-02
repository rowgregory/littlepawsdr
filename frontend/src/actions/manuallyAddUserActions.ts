import axios from 'axios';
import {
  MANUALLY_ADD_USER_CREATE_FAIL,
  MANUALLY_ADD_USER_CREATE_REQUEST,
  MANUALLY_ADD_USER_CREATE_SUCCESS,
  MANUALLY_ADD_USER_DELETE_FAIL,
  MANUALLY_ADD_USER_DELETE_REQUEST,
  MANUALLY_ADD_USER_DELETE_SUCCESS,
  MANUALLY_ADD_USER_DETAILS_FAIL,
  MANUALLY_ADD_USER_DETAILS_REQUEST,
  MANUALLY_ADD_USER_DETAILS_SUCCESS,
  MANUALLY_ADD_USER_LIST_FAIL,
  MANUALLY_ADD_USER_LIST_REQUEST,
  MANUALLY_ADD_USER_LIST_SUCCESS,
  MANUALLY_ADD_USER_UPDATE_FAIL,
  MANUALLY_ADD_USER_UPDATE_REQUEST,
  MANUALLY_ADD_USER_UPDATE_SUCCESS,
} from '../constants/manuallyAddUserConstants';

export const manuallyAddUser = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: MANUALLY_ADD_USER_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/manually-add-user`, {}, config);

    dispatch({ type: MANUALLY_ADD_USER_CREATE_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: MANUALLY_ADD_USER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getManuallyAddedUserDetails =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: MANUALLY_ADD_USER_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/manually-add-user/${id}`, config);

      dispatch({ type: MANUALLY_ADD_USER_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: MANUALLY_ADD_USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listManuallyAddedUsers = () => async (dispatch: any) => {
  try {
    dispatch({ type: MANUALLY_ADD_USER_LIST_REQUEST });

    const { data } = await axios.get(`/api/manually-add-user`);

    dispatch({ type: MANUALLY_ADD_USER_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: MANUALLY_ADD_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateManuallyAddedUser =
  (user: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: MANUALLY_ADD_USER_UPDATE_REQUEST });

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
        `/api/manually-add-user/${user._id}`,
        user,
        config
      );

      dispatch({ type: MANUALLY_ADD_USER_UPDATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: MANUALLY_ADD_USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteManuallyAddedUser =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: MANUALLY_ADD_USER_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/manually-add-user/${id}`, config);

      dispatch({ type: MANUALLY_ADD_USER_DELETE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: MANUALLY_ADD_USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
