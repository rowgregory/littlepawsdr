import axios from 'axios';
import {
  DACHSHUND_REQUEST,
  DACHSHUNDS_SUCCESS,
  DACHSHUNDS_FAIL,
  DACHSHUND_DETAILS_REQUEST,
  DACHSHUND_DETAILS_SUCCESS,
  DACHSHUND_DETAILS_FAIL,
  DACHSHUND_SUCCESSFUL_ADOPTIONS_REQUEST,
  DACHSHUND_SUCCESSFUL_ADOPTIONS_SUCCESS,
  DACHSHUND_SUCCESSFUL_ADOPTIONS_FAIL,
  DACHSHUND_SANCTUARY_OR_PASSED_AWAY_REQUEST,
  DACHSHUND_SANCTUARY_OR_PASSED_AWAY_SUCCESS,
  DACHSHUND_SANCTUARY_OR_PASSED_AWAY_FAIL,
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

    console.log('DATA: ', data);

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

export const getDachshundSuccessfulAdoptions = () => async (dispatch: any) => {
  try {
    dispatch({ type: DACHSHUND_SUCCESSFUL_ADOPTIONS_REQUEST });

    const response = await API.getAllSuccessfulAdoptions();

    if (response?.data) {
      getPicturesAndCoordinates(response);
    }

    dispatch({
      type: DACHSHUND_SUCCESSFUL_ADOPTIONS_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    dispatch({
      type: DACHSHUND_SUCCESSFUL_ADOPTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDachshundSanctuaryOrPassedAway =
  (id: string) => async (dispatch: any) => {
    try {
      dispatch({ type: DACHSHUND_SANCTUARY_OR_PASSED_AWAY_REQUEST });

      const response = await API.getSanctuaryAndPassedAway();

      if (response?.data) {
        getPicturesAndCoordinates(response);
      }

      const filteredDogs = response?.data?.filter(
        (dachshund: any) => dachshund.relationships.statuses.data[0].id === id
      );

      dispatch({
        type: DACHSHUND_SANCTUARY_OR_PASSED_AWAY_SUCCESS,
        payload: filteredDogs,
      });
    } catch (error: any) {
      dispatch({
        type: DACHSHUND_SANCTUARY_OR_PASSED_AWAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
