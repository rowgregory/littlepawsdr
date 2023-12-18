import axios from 'axios';
import {
  JWT_CHECK_VALIDITY_FAIL,
  JWT_CHECK_VALIDITY_REQUEST,
  JWT_CHECK_VALIDITY_SUCCESS,
} from '../constants/jwtConstants';
import { USER_LOGIN_SUCCESS } from '../constants/userConstants';

export const jwtCheckValidity =
  (userEmail: string, userToken: string, userName: string, userId: any) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: JWT_CHECK_VALIDITY_REQUEST });

      const url = `/api/jwt/check-validity`;

      const { data } = await axios.post(url, {
        userEmail,
        userToken,
        userName,
        userId,
      });

      if (data.isExpired) {
        dispatch({ type: JWT_CHECK_VALIDITY_SUCCESS, payload: data });
      } else {
        dispatch({
          type: JWT_CHECK_VALIDITY_SUCCESS,
          payload: {
            isExpired: false,
            message: 'Welcome to Little Paws Dachshund Rescue!',
          },
        });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
      }
    } catch (error: any) {
      dispatch({
        type: JWT_CHECK_VALIDITY_FAIL,
        payload: {
          errorMsg:
            error?.response && error.response.data.message
              ? error.response.data.message
              : `There's nothing here...`,
          statusCode: 404,
          isExpired: true,
        },
      });
    }
  };
