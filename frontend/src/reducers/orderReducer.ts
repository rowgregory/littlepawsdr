import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_CREATE_RESET,
  ORDER_SHIP_REQUEST,
  ORDER_SHIP_SUCCESS,
  ORDER_SHIP_FAIL,
  ORDER_SHIP_RESET,
  ORDER_EMAIL_CONFIRMATION_FAIL,
  ORDER_EMAIL_CONFIRMATION_SUCCESS,
  ORDER_EMAIL_CONFIRMATION_REQUEST,
  ORDER_DETAILS_RESET,
  TRACKING_NUMBER_REQUEST,
  TRACKING_NUMBER_SUCCESS,
  TRACKING_NUMBER_FAIL,
  TRACKING_NUMBER_RESET,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = { order: {} }, action: any) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {
        success: false,
        order: {},
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, order: {} },
  action: any
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DETAILS_RESET:
      return {
        order: {},
      };
    default:
      return state;
  }
};

export const orderListMyReducer = (
  state = { orders: [], adoptionApplicationFees: [] },
  action: any
) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      console.log(action.payload);
      return {
        loading: false,
        orders: action.payload.orders,
        adoptionApplicationFees: action.payload.adoptionApplicationFees,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action: any) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderShipReducer = (state = {}, action: any) => {
  switch (action.type) {
    case ORDER_SHIP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_SHIP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ORDER_SHIP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ORDER_SHIP_RESET:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const orderEmailConfirmationReducer = (state = {}, action: any) => {
  switch (action.type) {
    case ORDER_EMAIL_CONFIRMATION_REQUEST:
      return {
        loading: true,
      };
    case ORDER_EMAIL_CONFIRMATION_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_EMAIL_CONFIRMATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderTrackingNumberReducer = (state = {}, action: any) => {
  switch (action.type) {
    case TRACKING_NUMBER_REQUEST:
      return {
        loading: true,
      };
    case TRACKING_NUMBER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TRACKING_NUMBER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TRACKING_NUMBER_RESET:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};
