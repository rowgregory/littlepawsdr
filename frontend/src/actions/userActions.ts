import axios from 'axios';
import { GUEST_USER_REGISTER_RESET } from '../constants/guestUserConstants';
import {
  USER_CHECK_IF_CONFIRMED_RESET,
  USER_CONFIRMED_FAIL,
  USER_CONFIRMED_REQUEST,
  USER_CONFIRMED_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_GENERATE_NEW_TOKEN_FAIL,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_OLD_PASSWORD_FAIL,
  USER_OLD_PASSWORD_REQUEST,
  USER_OLD_PASSWORD_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_VERIFY_EMAIL_FAIL,
  USER_VERIFY_EMAIL_REQUEST,
  USER_VERIFY_EMAIL_SUCCESS,
  USER_WHO_WE_ARE_LIST_FAIL,
  USER_WHO_WE_ARE_LIST_REQUEST,
  USER_WHO_WE_ARE_LIST_SUCCESS,
} from '../constants/userConstants';

export const login = (email: any, password: any) => async (dispatch: any) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    dispatch({ type: GUEST_USER_REGISTER_RESET });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const userData = { email, password };

    const { data } = await axios.post('/api/users/login', userData, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.removeItem('guestUserInfo');
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: any) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (name: string, email: any, password: any) => async (dispatch: any) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users/${id}`, config);

      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const getConfirmationOfOldPassword =
  (id: any, oldpassword: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: USER_OLD_PASSWORD_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/users/oldpassword/${id}`,
        { oldpassword },
        config
      );

      if (data.message === 'Password is incorrect') {
        dispatch({ type: USER_OLD_PASSWORD_FAIL, payload: data });
      } else {
        dispatch({ type: USER_OLD_PASSWORD_SUCCESS, payload: data });
      }
    } catch (error: any) {
      dispatch({
        type: USER_OLD_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUserProfile =
  (user: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/users/profile`, user, config);

      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listUsers = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listWhoWeAreUsers = () => async (dispatch: any) => {
  try {
    dispatch({ type: USER_WHO_WE_ARE_LIST_REQUEST });

    const { data } = await axios.get(`/api/users/who-we-are`);

    dispatch({ type: USER_WHO_WE_ARE_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: USER_WHO_WE_ARE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : '404 - Not Found',
    });
  }
};

export const deleteUser = (id: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateUser =
  (user: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/users/${user._id}`, user, config);

      dispatch({ type: USER_UPDATE_SUCCESS });

      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

      dispatch({ type: USER_DETAILS_RESET });
    } catch (error: any) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = (user: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put('/api/users/logout', user, config);
    if (data === 'LOGOUT_SUCCESS') {
      document.location.href = '/login';

      const cartItems = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems') || '')
        : [];
      const continuedToSite = sessionStorage.getItem('continuedToSite')
        ? JSON.parse(sessionStorage.getItem('continuedToSite') || '')
        : false;
      const newsletterEmail = localStorage.getItem('newsletterEmail')
        ? JSON.parse(localStorage.getItem('newsletterEmail') || '')
        : false;
      const agreedToCookies = localStorage.getItem('agreedToCookies')
        ? JSON.parse(localStorage.getItem('agreedToCookies') || '')
        : false;
      const rememberMe = localStorage.getItem('rememberMe')
        ? JSON.parse(localStorage.getItem('rememberMe') || '')
        : {};
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      sessionStorage.setItem(
        'continuedToSite',
        JSON.stringify(continuedToSite)
      );
      localStorage.setItem('newsletterEmail', JSON.stringify(newsletterEmail));
      localStorage.setItem('agreedToCookies', JSON.stringify(agreedToCookies));
      localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
    }
  } catch (error: any) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendRegisterConfirmationEmail =
  (name: any, email: any, token: any, id: any) => async (dispatch: any) => {
    try {
      dispatch({ type: USER_VERIFY_EMAIL_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `/api/users/register-confirmation`,
        { name, email, token, id },
        config
      );

      dispatch({ type: USER_VERIFY_EMAIL_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: USER_VERIFY_EMAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const updatedUserToConfirmed =
  (email: any, token: any, name: string, id: any) => async (dispatch: any) => {
    try {
      dispatch({ type: USER_CONFIRMED_REQUEST });

      dispatch({ type: USER_CHECK_IF_CONFIRMED_RESET });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/confirmed`,
        { email, name, id },
        config
      );

      dispatch({ type: USER_CONFIRMED_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: USER_CONFIRMED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const generateTokenForNewSession =
  () => async (dispatch: any, getState: any) => {
    try {
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
        `/api/users/generate-new-token`,
        {},
        config
      );

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: USER_GENERATE_NEW_TOKEN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
