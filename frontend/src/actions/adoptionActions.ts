import axios from 'axios';
import {
  ADOPTION_FEE_ACTIVE_SESSION_FAIL,
  ADOPTION_FEE_ACTIVE_SESSION_REQUEST,
  ADOPTION_FEE_ACTIVE_SESSION_SUCCESS,
  ADOPTION_FEE_FAIL,
  ADOPTION_FEE_LIST_FAIL,
  ADOPTION_FEE_LIST_REQUEST,
  ADOPTION_FEE_LIST_SUCCESS,
  ADOPTION_FEE_REQUEST,
  ADOPTION_FEE_SUCCESS,
} from '../constants/adoptionConstants';

export const createAdoptionFee = (fee: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ADOPTION_FEE_REQUEST });

    const { data } = await axios.post(`/api/adoption-fee`, fee);

    dispatch({ type: ADOPTION_FEE_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ADOPTION_FEE_FAIL,
      payload:
        error?.response && error.response.data.message ? error.response.data.message : '404 - Not found',
    });
  }
};

export const checkIfUserHasActiveAdoptionFeeSession = (values: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ADOPTION_FEE_ACTIVE_SESSION_REQUEST });

    const { data } = await axios.post(`/api/adoption-fee/active-session`, values);

    dispatch({ type: ADOPTION_FEE_ACTIVE_SESSION_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ADOPTION_FEE_ACTIVE_SESSION_FAIL,
      payload: {
        error: error.response.data.message,
        isExpired: error.response.data.isExpired,
      },
    });
  }
};

export const listAdoptionFees = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: ADOPTION_FEE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/adoption-fee`, config);

    dispatch({ type: ADOPTION_FEE_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ADOPTION_FEE_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};
