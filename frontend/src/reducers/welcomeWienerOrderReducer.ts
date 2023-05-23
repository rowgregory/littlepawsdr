import {
  WELCOME_WIENER_ORDER_CREATE_FAIL,
  WELCOME_WIENER_ORDER_CREATE_REQUEST,
  WELCOME_WIENER_ORDER_CREATE_RESET,
  WELCOME_WIENER_ORDER_CREATE_SUCCESS,
  WELCOME_WIENER_ORDER_DETAILS_FAIL,
  WELCOME_WIENER_ORDER_DETAILS_REQUEST,
  WELCOME_WIENER_ORDER_DETAILS_RESET,
  WELCOME_WIENER_ORDER_DETAILS_SUCCESS,
  WELCOME_WIENER_ORDER_EMAIL_COMFIRMATION_FAIL,
  WELCOME_WIENER_ORDER_EMAIL_COMFIRMATION_REQUEST,
  WELCOME_WIENER_ORDER_EMAIL_COMFIRMATION_SUCCESS,
  WELCOME_WIENER_ORDER_LIST_FAIL,
  WELCOME_WIENER_ORDER_LIST_REQUEST,
  WELCOME_WIENER_ORDER_LIST_SUCCESS,
} from '../constants/welcomeWienerOrderConstants';

export const welcomeWienerOrderCreateReducer = (
  state = { welcomeWienerOrder: {}, loading: false, success: false, error: '' },
  action: any
) => {
  switch (action.type) {
    case WELCOME_WIENER_ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case WELCOME_WIENER_ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        welcomeWienerOrder: action.payload,
      };
    case WELCOME_WIENER_ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case WELCOME_WIENER_ORDER_CREATE_RESET:
      return {
        success: false,
        welcomeWienerOrder: {},
      };
    default:
      return state;
  }
};

export const welcomeWienerOrderDetailsReducer = (
  state = { loading: true, welcomeWienerOrder: [], error: '' },
  action: any
) => {
  switch (action.type) {
    case WELCOME_WIENER_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WELCOME_WIENER_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        welcomeWienerOrder: action.payload,
      };
    case WELCOME_WIENER_ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case WELCOME_WIENER_ORDER_DETAILS_RESET:
      return {
        welcomeWienerOrder: {},
      };
    default:
      return state;
  }
};

export const welcomeWienerOrderListReducer = (
  state = { welcomeWienerOrders: [] },
  action: any
) => {
  switch (action.type) {
    case WELCOME_WIENER_ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case WELCOME_WIENER_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        welcomeWienerOrders: action.payload,
      };
    case WELCOME_WIENER_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const welcomeWienerOrderEmailConfirmationReducer = (
  state = {},
  action: any
) => {
  switch (action.type) {
    case WELCOME_WIENER_ORDER_EMAIL_COMFIRMATION_REQUEST:
      return {
        loading: true,
      };
    case WELCOME_WIENER_ORDER_EMAIL_COMFIRMATION_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case WELCOME_WIENER_ORDER_EMAIL_COMFIRMATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
