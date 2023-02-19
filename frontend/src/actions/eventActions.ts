import axios from 'axios';
import {
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_FAIL,
} from '../constants/eventConstants';

export const listEvents = () => async (dispatch: any) => {
  try {
    dispatch({ type: EVENT_LIST_REQUEST });

    const { data } = await axios.get(`/api/events`);

    if (typeof data === 'string') {
      return dispatch({
        type: EVENT_LIST_FAIL,
        payload: 'Axios Error',
      });
    }

    dispatch({ type: EVENT_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: EVENT_LIST_FAIL,
      payload:
        error?.response && error.response.data.message
          ? error.response.data.message
          : '404 - Not Found',
    });
  }
};

export const deleteEvent =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: EVENT_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/events/${id}`, config);

      dispatch({ type: EVENT_DELETE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: EVENT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createEvent =
  (event: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: EVENT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/events`, event, config);

      dispatch({ type: EVENT_CREATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: EVENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listEventDetails = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST });

    const config = {
      headers: {
        'Cache-Control': 'max-age=3153600',
      },
    };

    const { data } = await axios.get(`/api/events/${id}`, config);

    dispatch({ type: EVENT_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEvent =
  (event: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: EVENT_UPDATE_REQUEST });

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
        `/api/events/${event._id}`,
        event,
        config
      );

      dispatch({ type: EVENT_UPDATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: EVENT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
