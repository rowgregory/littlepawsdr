import axios from 'axios';
import {
  DACHSHUND_DETAILS_REQUEST,
  DACHSHUND_DETAILS_SUCCESS,
  DACHSHUND_DETAILS_FAIL,
  DACHSHUND_REQUEST,
  DACHSHUNDS_SUCCESS,
  DACHSHUNDS_FAIL,
} from '../constants/dachshundConstants';
import { getPicturesAndVideos } from '../utils/getPicturesAndVideos';

const headers = {
  'Content-Type': 'application/vnd.api+json',
  Authorization: `${process.env.REACT_APP_RESCUE_GROUPS_API_KEY}`,
  Accept: 'application/vnd.api+json',
};

export const getDachshundDetails = (id: number) => async (dispatch: any) => {
  try {
    dispatch({ type: DACHSHUND_DETAILS_REQUEST });

    const { data } = await axios.get(
      `https://api.rescuegroups.org/v5/public/orgs/5798/animals/${id}`,
      {
        headers,
      }
    );

    if (data?.data) {
      getPicturesAndVideos(data);
    }

    dispatch({ type: DACHSHUND_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: DACHSHUND_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAvailableDogs = () => async (dispatch: any) => {
  try {
    dispatch({ type: DACHSHUND_REQUEST });

    const { data } = await axios.get(
      `https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/available/dogs?`,
      {
        headers,
      }
    );

    if (data?.data) {
      getPicturesAndVideos(data);
    }

    dispatch({ type: DACHSHUNDS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: DACHSHUNDS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
