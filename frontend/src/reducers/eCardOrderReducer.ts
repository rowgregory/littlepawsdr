import {
  ECARD_ORDERS_LIST_FAIL,
  ECARD_ORDERS_LIST_REQUEST,
  ECARD_ORDERS_LIST_SUCCESS,
  ECARD_ORDER_CREATE_FAIL,
  ECARD_ORDER_CREATE_REQUEST,
  ECARD_ORDER_CREATE_RESET,
  ECARD_ORDER_CREATE_SUCCESS,
  ECARD_ORDER_DETAILS_FAIL,
  ECARD_ORDER_DETAILS_REQUEST,
  ECARD_ORDER_DETAILS_SUCCESS,
} from '../constants/eCardOrderContants';

// @ts-ignore
export const eCardOrderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ECARD_ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ECARD_ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        eCardOrder: action.payload,
      };
    case ECARD_ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ECARD_ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const eCardOrderDetailsReducer = (
  state = { eCardOrder: {} },
  action: any
) => {
  switch (action.type) {
    case ECARD_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ECARD_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        eCardOrder: action.payload,
      };
    case ECARD_ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
// @ts-ignore
export const eCardOrdersListReducer = (state = { eCardOrders: [] }, action) => {
  switch (action.type) {
    case ECARD_ORDERS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ECARD_ORDERS_LIST_SUCCESS:
      return {
        loading: false,
        eCardOrders: action.payload,
      };
    case ECARD_ORDERS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
