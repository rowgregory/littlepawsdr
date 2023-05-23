import {
  WELCOME_WIENER_DACHSHUND_LIST_REQUEST,
  WELCOME_WIENER_DACHSHUND_LIST_SUCCESS,
  WELCOME_WIENER_DACHSHUND_LIST_FAIL,
  WELCOME_WIENER_DACHSHUND_LIST_RESET,
  WELCOME_WIENER_DACHSHUND_CREATE_REQUEST,
  WELCOME_WIENER_DACHSHUND_CREATE_SUCCESS,
  WELCOME_WIENER_DACHSHUND_CREATE_FAIL,
  WELCOME_WIENER_DACHSHUND_CREATE_RESET,
  WELCOME_WIENER_DACHSHUND_UPDATE_REQUEST,
  WELCOME_WIENER_DACHSHUND_UPDATE_SUCCESS,
  WELCOME_WIENER_DACHSHUND_UPDATE_FAIL,
  WELCOME_WIENER_DACHSHUND_UPDATE_RESET,
  WELCOME_WIENER_DACHSHUND_GET_BY_ID_REQUEST,
  WELCOME_WIENER_DACHSHUND_GET_BY_ID_SUCCESS,
  WELCOME_WIENER_DACHSHUND_GET_BY_ID_FAIL,
  WELCOME_WIENER_DACHSHUND_DELETE_REQUEST,
  WELCOME_WIENER_DACHSHUND_DELETE_SUCCESS,
  WELCOME_WIENER_DACHSHUND_DELETE_FAIL,
  TOGGLE_WELCOME_DACHSHUND_REQUEST,
  TOGGLE_WELCOME_DACHSHUND_FAIL,
  TOGGLE_WELCOME_DACHSHUND_SUCCESS,
  TOGGLE_WELCOME_DACHSHUND_RESET,
} from '../constants/welcomeWienerDachshundConstants';

export const welcomeWienerDachshundListReducer = (state: any, action: any) => {
  switch (action.type) {
    case WELCOME_WIENER_DACHSHUND_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WELCOME_WIENER_DACHSHUND_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        dachshundList: action.payload,
      };
    case WELCOME_WIENER_DACHSHUND_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case WELCOME_WIENER_DACHSHUND_LIST_RESET:
      return {
        ...state,
        dachshundList: [],
      };
    default:
      return { ...state };
  }
};
export const welcomeWienerDachshundCreateReducer = (
  state: any,
  action: any
) => {
  switch (action.type) {
    case WELCOME_WIENER_DACHSHUND_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WELCOME_WIENER_DACHSHUND_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        dachshund: action.payload,
        success: true,
      };
    case WELCOME_WIENER_DACHSHUND_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case WELCOME_WIENER_DACHSHUND_CREATE_RESET:
      return {
        dachshund: {},
      };
    default:
      return { ...state };
  }
};

export const welcomeWienerDachshundUpdateReducer = (
  state: any,
  action: any
) => {
  switch (action.type) {
    case WELCOME_WIENER_DACHSHUND_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WELCOME_WIENER_DACHSHUND_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        dachshund: action.payload,
      };
    case WELCOME_WIENER_DACHSHUND_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case WELCOME_WIENER_DACHSHUND_UPDATE_RESET:
      return {
        dachshund: {},
      };
    default:
      return { ...state };
  }
};
export const welcomeWienerDachshundDetailsReducer = (
  state: any,
  action: any
) => {
  switch (action.type) {
    case WELCOME_WIENER_DACHSHUND_GET_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WELCOME_WIENER_DACHSHUND_GET_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        dachshund: action.payload,
      };
    case WELCOME_WIENER_DACHSHUND_GET_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
export const welcomeWienerDachshundDeleteReducer = (
  state: any,
  action: any
) => {
  switch (action.type) {
    case WELCOME_WIENER_DACHSHUND_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WELCOME_WIENER_DACHSHUND_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case WELCOME_WIENER_DACHSHUND_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const welcomeWienerDachshundToggledReducer = (
  state: { loading: false; welcomeDachshund: false },
  action: any
) => {
  switch (action.type) {
    case TOGGLE_WELCOME_DACHSHUND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TOGGLE_WELCOME_DACHSHUND_SUCCESS:
      return {
        ...state,
        loading: false,
        welcomeDachshund: action.payload.welcomeDachshund,
      };
    case TOGGLE_WELCOME_DACHSHUND_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TOGGLE_WELCOME_DACHSHUND_RESET:
      return {};
    default:
      return { ...state };
  }
};
