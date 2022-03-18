import axios from 'axios';
import {
  NEWSLETTER_EMAIL_CREATE_FAIL,
  NEWSLETTER_EMAIL_CREATE_REQUEST,
  NEWSLETTER_EMAIL_CREATE_SUCCESS,
  NEWSLETTER_EMAIL_DELETE_FAIL,
  NEWSLETTER_EMAIL_DELETE_REQUEST,
  NEWSLETTER_EMAIL_DELETE_SUCCESS,
  NEWSLETTER_EMAIL_LIST_FAIL,
  NEWSLETTER_EMAIL_LIST_REQUEST,
  NEWSLETTER_EMAIL_LIST_SUCCESS,
} from '../constants/newsletterConstants';

export const createNewsletterEmail = (email: any) => async (dispatch: any) => {
  try {
    dispatch({ type: NEWSLETTER_EMAIL_CREATE_REQUEST });

    const { data } = await axios.post(`/api/newsletter`, { email });

    dispatch({ type: NEWSLETTER_EMAIL_CREATE_SUCCESS, payload: data });

    localStorage.setItem('newsletterEmail', JSON.stringify(true));
  } catch (error: any) {
    dispatch({
      type: NEWSLETTER_EMAIL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listNewsletterEmail =
  () => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: NEWSLETTER_EMAIL_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/newsletter`, config);

      dispatch({ type: NEWSLETTER_EMAIL_LIST_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: NEWSLETTER_EMAIL_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteNewsletterEmail =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: NEWSLETTER_EMAIL_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/newsletter/${id}`, config);

      dispatch({ type: NEWSLETTER_EMAIL_DELETE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: NEWSLETTER_EMAIL_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
