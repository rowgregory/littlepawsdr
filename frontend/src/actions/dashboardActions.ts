import axios from 'axios';
import {
  OPEN_CLOSE_DASHBOARD_MODAL,
  DASHBOARD_CURRENT_YEAR_DATA_REQUEST,
  DASHBOARD_CURRENT_YEAR_DATA_SUCCESS,
  DASHBOARD_CURRENT_YEAR_DATA_FAIL,
  SET_BUBBLE_LINKS,
} from '../constants/dashboardConstants';
import {
  ADOPTION_APPLICATION_FEE_BYPASS_CODE_FAIL,
  ADOPTION_APPLICATION_FEE_BYPASS_CODE_REQUEST,
  ADOPTION_APPLICATION_FEE_BYPASS_CODE_SUCCESS,
} from '../constants/adoptionConstants';

export const openCloseDashboardModal = (openCloseDashboardModal: boolean) => async (dispatch: any) => {
  dispatch({
    type: OPEN_CLOSE_DASHBOARD_MODAL,
    payload: openCloseDashboardModal,
  });
};

export const getCurrentYearData = () => async (dispatch: any, getState: any) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({ type: DASHBOARD_CURRENT_YEAR_DATA_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/dashboard`, config);

    dispatch({ type: DASHBOARD_CURRENT_YEAR_DATA_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: DASHBOARD_CURRENT_YEAR_DATA_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getAdoptionApplicationBypassCode = () => async (dispatch: any, getState: any) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({ type: ADOPTION_APPLICATION_FEE_BYPASS_CODE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/dashboard/adoption-application-bypass-code`, config);

    dispatch({ type: ADOPTION_APPLICATION_FEE_BYPASS_CODE_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ADOPTION_APPLICATION_FEE_BYPASS_CODE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const closeBubbleLinks = () => async (dispatch: any) => {
  dispatch({ type: SET_BUBBLE_LINKS, payload: '' });
};
