import axios from 'axios';
import {
  ARCHIVE_ANNUAL_DATA_REQUEST,
  ARCHIVE_ANNUAL_DATA_SUCCESS,
  ARCHIVE_ANNUAL_DATA_FAIL,
} from '../constants/archiveConstants';

export const getAnnualData =
  (year: number) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: ARCHIVE_ANNUAL_DATA_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/archive/data/${year}`, config);

      dispatch({ type: ARCHIVE_ANNUAL_DATA_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ARCHIVE_ANNUAL_DATA_FAIL,
        payload: {
          error: error.response.data.message,
          isExpired: error.response.data.isExpired,
        },
      });
    }
  };
