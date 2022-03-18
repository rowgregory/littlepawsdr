import axios from 'axios';
import {
  GUEST_USER_REGISTER_FAIL,
  GUEST_USER_REGISTER_REQUEST,
  GUEST_USER_REGISTER_SUCCESS,
} from '../constants/guestUserConstants';

export const registerGuestUser = (email: any) => async (dispatch: any) => {
  try {
    dispatch({ type: GUEST_USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/guest', { email }, config);

    localStorage.setItem('guestUserInfo', JSON.stringify(data));

    dispatch({ type: GUEST_USER_REGISTER_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: GUEST_USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
