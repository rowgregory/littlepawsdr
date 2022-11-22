import axios from 'axios';
import {
  RESET_EMAIL_SEND_FAIL,
  RESET_EMAIL_SEND_REQUEST,
  RESET_EMAIL_SEND_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  VERIFY_TOKEN_FAIL,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
} from '../constants/resetPasswordContants';

export const sendResetEmail = (email: any) => async (dispatch: any) => {
  try {
    dispatch({ type: RESET_EMAIL_SEND_REQUEST });

    const { data } = await axios.post(`/api/forgotpassword`, { email });

    dispatch({ type: RESET_EMAIL_SEND_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: RESET_EMAIL_SEND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifyToken = (token: any) => async (dispatch: any) => {
  try {
    dispatch({ type: VERIFY_TOKEN_REQUEST });

    const { data } = await axios.post(`/api/forgotpassword/verifytoken`, {
      token,
    });

    if (
      data === 'Link has expired. Please register again.' ||
      typeof data === 'string'
    ) {
      dispatch({ type: VERIFY_TOKEN_FAIL, payload: data });
    } else {
      dispatch({ type: VERIFY_TOKEN_SUCCESS, payload: data });
    }
  } catch (error: any) {
    dispatch({
      type: VERIFY_TOKEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPassword =
  (email: any, password: any) => async (dispatch: any) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });

      const { data } = await axios.put(`/api/forgotpassword/updatepassword`, {
        email,
        password,
      });

      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message });
    } catch (error: any) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
