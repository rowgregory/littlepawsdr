import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_RESET,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
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
  ORDER_GUEST_DETAILS_REQUEST,
  ORDER_GUEST_DETAILS_SUCCESS,
  ORDER_GUEST_DETAILS_FAIL,
  ORDER_EMAIL_CONFIRMATION_FAIL,
  ORDER_EMAIL_CONFIRMATION_SUCCESS,
  ORDER_EMAIL_CONFIRMATION_REQUEST,
  ORDER_DETAILS_RESET,
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
  state = { loading: true, orderItems: [], shippingAddress: {} },
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

export const orderGuestDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action: any
) => {
  switch (action.type) {
    case ORDER_GUEST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_GUEST_DETAILS_SUCCESS:
      return {
        loading: false,
        guestOrder: action.payload,
      };
    case ORDER_GUEST_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action: any) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action: any) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
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

export const orderShipReducer = (state = { isShipped: false }, action: any) => {
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
        isShipped: action.payload,
      };
    case ORDER_SHIP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ORDER_SHIP_RESET:
      return {
        success: false,
        isShipped: false,
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
