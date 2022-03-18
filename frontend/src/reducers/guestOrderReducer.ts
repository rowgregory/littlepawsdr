import {
  GUEST_ORDER_CREATE_FAIL,
  GUEST_ORDER_CREATE_REQUEST,
  GUEST_ORDER_CREATE_RESET,
  GUEST_ORDER_CREATE_SUCCESS,
  GUEST_ORDER_LIST_FAIL,
  GUEST_ORDER_LIST_REQUEST,
  GUEST_ORDER_LIST_SUCCESS,
  GUEST_ORDER_SHIP_FAIL,
  GUEST_ORDER_SHIP_REQUEST,
  GUEST_ORDER_SHIP_RESET,
  GUEST_ORDER_SHIP_SUCCESS,
} from '../constants/guestOrderConstants';

export const guestOrderCreateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GUEST_ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case GUEST_ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        guestOrder: action.payload,
      };
    case GUEST_ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GUEST_ORDER_CREATE_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const guestOrderListReducer = (
  state = { guestOrders: [] },
  action: any
) => {
  switch (action.type) {
    case GUEST_ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case GUEST_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        guestOrders: action.payload,
      };
    case GUEST_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const guestOrderShipReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GUEST_ORDER_SHIP_REQUEST:
      return {
        loading: true,
      };
    case GUEST_ORDER_SHIP_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case GUEST_ORDER_SHIP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GUEST_ORDER_SHIP_RESET:
      return {};
    default:
      return state;
  }
};
