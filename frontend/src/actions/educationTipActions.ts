import axios from 'axios';
import {
  EDUCATION_TIP_CREATE_FAIL,
  EDUCATION_TIP_CREATE_REQUEST,
  EDUCATION_TIP_CREATE_SUCCESS,
  EDUCATION_TIP_DELETE_FAIL,
  EDUCATION_TIP_DELETE_REQUEST,
  EDUCATION_TIP_DELETE_SUCCESS,
  EDUCATION_TIP_DETAILS_FAIL,
  EDUCATION_TIP_DETAILS_REQUEST,
  EDUCATION_TIP_DETAILS_SUCCESS,
  EDUCATION_TIP_LIST_FAIL,
  EDUCATION_TIP_LIST_REQUEST,
  EDUCATION_TIP_LIST_SUCCESS,
  EDUCATION_TIP_UPDATE_FAIL,
  EDUCATION_TIP_UPDATE_REQUEST,
  EDUCATION_TIP_UPDATE_SUCCESS,
} from '../constants/educationTipConstants';

export const listEducationTips = () => async (dispatch: any) => {
  try {
    dispatch({ type: EDUCATION_TIP_LIST_REQUEST });

    const { data } = await axios.get(`/api/education-tips`);

    dispatch({ type: EDUCATION_TIP_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: EDUCATION_TIP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createEducationTip =
  () => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: EDUCATION_TIP_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/education-tips`, {}, config);

      dispatch({ type: EDUCATION_TIP_CREATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: EDUCATION_TIP_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getEducationTipDetails = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: EDUCATION_TIP_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/education-tips/${id}`);

    dispatch({ type: EDUCATION_TIP_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: EDUCATION_TIP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEducationTip =
  (educationTip: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: EDUCATION_TIP_UPDATE_REQUEST });

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
        `/api/education-tips/${educationTip._id}`,
        educationTip,
        config
      );

      dispatch({ type: EDUCATION_TIP_UPDATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: EDUCATION_TIP_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteEducationTip =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: EDUCATION_TIP_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/education-tips/${id}`, config);

      dispatch({ type: EDUCATION_TIP_DELETE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: EDUCATION_TIP_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
