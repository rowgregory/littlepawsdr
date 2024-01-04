import {
  EDUCATION_TIP_CREATE_FAIL,
  EDUCATION_TIP_CREATE_REQUEST,
  EDUCATION_TIP_CREATE_RESET,
  EDUCATION_TIP_CREATE_SUCCESS,
  EDUCATION_TIP_DELETE_FAIL,
  EDUCATION_TIP_DELETE_REQUEST,
  EDUCATION_TIP_DELETE_SUCCESS,
  EDUCATION_TIP_DETAILS_FAIL,
  EDUCATION_TIP_DETAILS_REQUEST,
  EDUCATION_TIP_DETAILS_RESET,
  EDUCATION_TIP_DETAILS_SUCCESS,
  EDUCATION_TIP_LIST_FAIL,
  EDUCATION_TIP_LIST_REQUEST,
  EDUCATION_TIP_LIST_RESET,
  EDUCATION_TIP_LIST_SUCCESS,
  EDUCATION_TIP_UPDATE_FAIL,
  EDUCATION_TIP_UPDATE_REQUEST,
  EDUCATION_TIP_UPDATE_RESET,
  EDUCATION_TIP_UPDATE_SUCCESS,
} from '../constants/educationTipConstants';

// @ts-ignore
export const educationTipListReducer = (
  state = { educationTips: [] },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case EDUCATION_TIP_LIST_REQUEST:
      return {
        loading: true,
      };
    case EDUCATION_TIP_LIST_SUCCESS:
      return {
        loading: false,
        educationTips: action.payload,
      };
    case EDUCATION_TIP_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EDUCATION_TIP_LIST_RESET:
      return {
        educationTips: [],
      };
    default:
      return state;
  }
};

// @ts-ignore
export const educationTipCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EDUCATION_TIP_CREATE_REQUEST:
      return {
        loading: true,
      };
    case EDUCATION_TIP_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        educationTip: action.payload,
      };
    case EDUCATION_TIP_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EDUCATION_TIP_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// @ts-ignore
export const educationTipDetailsReducer = (
  state = { educationTip: {} },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case EDUCATION_TIP_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDUCATION_TIP_DETAILS_SUCCESS:
      return {
        loading: false,
        educationTip: action.payload,
        success: true,
      };
    case EDUCATION_TIP_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EDUCATION_TIP_DETAILS_RESET:
      return {
        educationTip: {},
      };
    default:
      return state;
  }
};

// @ts-ignore
export const educationTipUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EDUCATION_TIP_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDUCATION_TIP_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        raffleWinner: action.payload,
      };
    case EDUCATION_TIP_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDUCATION_TIP_UPDATE_RESET:
      return {
        educationTip: {},
      };
    default:
      return state;
  }
};

// @ts-ignore
export const educationTipDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EDUCATION_TIP_DELETE_REQUEST:
      return {
        loading: true,
      };
    case EDUCATION_TIP_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case EDUCATION_TIP_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
