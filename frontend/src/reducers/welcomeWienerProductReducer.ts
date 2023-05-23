import {
  WELCOME_WIENER_PRODUCT_LIST_REQUEST,
  WELCOME_WIENER_PRODUCT_LIST_SUCCESS,
  WELCOME_WIENER_PRODUCT_LIST_FAIL,
  WELCOME_WIENER_PRODUCT_LIST_RESET,
  WELCOME_WIENER_PRODUCT_CREATE_REQUEST,
  WELCOME_WIENER_PRODUCT_CREATE_SUCCESS,
  WELCOME_WIENER_PRODUCT_CREATE_FAIL,
  WELCOME_WIENER_PRODUCT_CREATE_RESET,
  WELCOME_WIENER_PRODUCT_UPDATE_REQUEST,
  WELCOME_WIENER_PRODUCT_UPDATE_SUCCESS,
  WELCOME_WIENER_PRODUCT_UPDATE_FAIL,
  WELCOME_WIENER_PRODUCT_UPDATE_RESET,
  WELCOME_WIENER_PRODUCT_GET_BY_ID_REQUEST,
  WELCOME_WIENER_PRODUCT_GET_BY_ID_SUCCESS,
  WELCOME_WIENER_PRODUCT_GET_BY_ID_FAIL,
  WELCOME_WIENER_PRODUCT_DELETE_REQUEST,
  WELCOME_WIENER_PRODUCT_DELETE_SUCCESS,
  WELCOME_WIENER_PRODUCT_DELETE_FAIL,
} from '../constants/welcomeWienerProductConstants';

export const welcomeWienerProductListReducer = (state: any, action: any) => {
  switch (action.type) {
    case WELCOME_WIENER_PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WELCOME_WIENER_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        productList: action.payload,
      };
    case WELCOME_WIENER_PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case WELCOME_WIENER_PRODUCT_LIST_RESET:
      return {
        ...state,
        productList: [],
      };
    default:
      return { ...state };
  }
};
export const welcomeWienerProductCreateReducer = (state: any, action: any) => {
  switch (action.type) {
    case WELCOME_WIENER_PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WELCOME_WIENER_PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        success: true,
      };
    case WELCOME_WIENER_PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case WELCOME_WIENER_PRODUCT_CREATE_RESET:
      return {
        product: {},
      };
    default:
      return { ...state };
  }
};

export const welcomeWienerProductUpdateReducer = (state: any, action: any) => {
  switch (action.type) {
    case WELCOME_WIENER_PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WELCOME_WIENER_PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case WELCOME_WIENER_PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case WELCOME_WIENER_PRODUCT_UPDATE_RESET:
      return {
        product: {},
      };
    default:
      return { ...state };
  }
};
export const welcomeWienerProductDetailsReducer = (state: any, action: any) => {
  switch (action.type) {
    case WELCOME_WIENER_PRODUCT_GET_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WELCOME_WIENER_PRODUCT_GET_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case WELCOME_WIENER_PRODUCT_GET_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
export const welcomeWienerProductDeleteReducer = (state: any, action: any) => {
  switch (action.type) {
    case WELCOME_WIENER_PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WELCOME_WIENER_PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case WELCOME_WIENER_PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
