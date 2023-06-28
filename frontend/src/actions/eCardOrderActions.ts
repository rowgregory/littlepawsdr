import axios from 'axios';
import {
  ECARD_ORDER_DETAILS_FAIL,
  ECARD_ORDER_DETAILS_REQUEST,
  ECARD_ORDER_DETAILS_SUCCESS,
} from '../constants/eCardOrderContants';

export const getECardOrderDetails = (eCardId: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ECARD_ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/ecard-order/${eCardId}`);

    dispatch({ type: ECARD_ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ECARD_ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
