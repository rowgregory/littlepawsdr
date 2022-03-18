import axios from 'axios';
import {
  RAFFLE_WINNER_CREATE_FAIL,
  RAFFLE_WINNER_CREATE_REQUEST,
  RAFFLE_WINNER_CREATE_SUCCESS,
  RAFFLE_WINNER_DELETE_FAIL,
  RAFFLE_WINNER_DELETE_REQUEST,
  RAFFLE_WINNER_DELETE_SUCCESS,
  RAFFLE_WINNER_DETAILS_FAIL,
  RAFFLE_WINNER_DETAILS_REQUEST,
  RAFFLE_WINNER_DETAILS_SUCCESS,
  RAFFLE_WINNER_LIST_FAIL,
  RAFFLE_WINNER_LIST_REQUEST,
  RAFFLE_WINNER_LIST_SUCCESS,
  RAFFLE_WINNER_UPDATE_FAIL,
  RAFFLE_WINNER_UPDATE_REQUEST,
  RAFFLE_WINNER_UPDATE_SUCCESS,
} from '../constants/raffleWinnerContants';

export const listRaffleWinners = () => async (dispatch: any) => {
  try {
    dispatch({ type: RAFFLE_WINNER_LIST_REQUEST });

    const { data } = await axios.get(`/api/raffle-winner`);

    dispatch({ type: RAFFLE_WINNER_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: RAFFLE_WINNER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createRaffleWinner =
  () => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: RAFFLE_WINNER_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/raffle-winner`, {}, config);

      dispatch({ type: RAFFLE_WINNER_CREATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: RAFFLE_WINNER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getRaffleWinnerDetails = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: RAFFLE_WINNER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/raffle-winner/${id}`);

    dispatch({ type: RAFFLE_WINNER_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: RAFFLE_WINNER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateRaffleWinner =
  (raffleWinner: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: RAFFLE_WINNER_UPDATE_REQUEST });

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
        `/api/raffle-winner/${raffleWinner._id}`,
        raffleWinner,
        config
      );

      dispatch({ type: RAFFLE_WINNER_UPDATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: RAFFLE_WINNER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteRaffleWinner =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: RAFFLE_WINNER_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/raffle-winner/${id}`, config);

      dispatch({ type: RAFFLE_WINNER_DELETE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: RAFFLE_WINNER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
