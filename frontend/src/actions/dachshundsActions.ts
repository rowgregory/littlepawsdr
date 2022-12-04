import axios from 'axios';
import {
  DACHSHUND_REQUEST,
  DACHSHUNDS_SUCCESS,
  DACHSHUNDS_FAIL,
  DACHSHUND_DETAILS_REQUEST,
  DACHSHUND_DETAILS_SUCCESS,
  DACHSHUND_DETAILS_FAIL,
  DACHSHUND_PICS_VIDS_STASTUSES_REQUEST,
  DACHSHUND_PICS_VIDS_STASTUSES_SUCCESS,
  DACHSHUND_PICS_VIDS_STASTUSES_FAIL,
} from '../constants/dachshundConstants';
import API from '../utils/api';
import { getPicturesAndCoordinates } from '../utils/getPicturesAndCoordinates';

const headers = {
  'Content-Type': 'application/vnd.api+json',
  Authorization: `${process.env.REACT_APP_RESCUE_GROUPS_API_KEY}`,
  Accept: 'application/vnd.api+json',
};

export const getAvailableDachshunds = () => async (dispatch: any) => {
  try {
    dispatch({ type: DACHSHUND_REQUEST });

    const { data } = await axios.get(
      'https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/available/dogs?',
      { headers }
    );

    if (data?.data) {
      getPicturesAndCoordinates(data);
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

export const getDachshundDetails = (id: number) => async (dispatch: any) => {
  try {
    dispatch({ type: DACHSHUND_DETAILS_REQUEST });

    const response = await API.getDachshundById(id);

    if (response?.data) {
      getPicturesAndCoordinates(response);
    }

    dispatch({ type: DACHSHUND_DETAILS_SUCCESS, payload: response });
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

export const getDogsByStatusPicturesAndVideours =
  (criteria: string) => async (dispatch: any) => {
    try {
      dispatch({ type: DACHSHUND_PICS_VIDS_STASTUSES_REQUEST });

      const response = await API.getPicturesStatusesAndVideo(criteria);

      if (response?.data) {
        getPicturesAndCoordinates(response);
      }

      dispatch({
        type: DACHSHUND_PICS_VIDS_STASTUSES_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: DACHSHUND_PICS_VIDS_STASTUSES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
