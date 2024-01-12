import axios from 'axios';
import {
  ACTION_HISTORY_LIST_FAIL,
  ACTION_HISTORY_LIST_REQUEST,
  ACTION_HISTORY_LIST_SUCCESS,
} from '../constants/actionHistoryConstants';

export const listActionHistories = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: ACTION_HISTORY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/action-history`, config);

    dispatch({ type: ACTION_HISTORY_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ACTION_HISTORY_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};
