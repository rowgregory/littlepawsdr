import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_GUEST_UPDATE_FAIL,
  PRODUCT_GUEST_UPDATE_REQUEST,
  PRODUCT_GUEST_UPDATE_RESET,
  PRODUCT_GUEST_UPDATE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_RESET,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_PUBLIC_DETAILS_FAIL,
  PRODUCT_PUBLIC_DETAILS_REQUEST,
  PRODUCT_PUBLIC_DETAILS_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_AND_ECARD_LIST_REQUEST,
  PRODUCT_AND_ECARD_LIST_SUCCESS,
  PRODUCT_AND_ECARD_LIST_FAIL,
} from '../constants/productContstants';

export const productListReducer = (
  state = { products: [] },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_LIST_RESET:
      return {
        loading: false,
        products: [],
      };
    default:
      return state;
  }
};
export const productAndEcardListReducer = (
  state = { products: [] },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case PRODUCT_AND_ECARD_LIST_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_AND_ECARD_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_AND_ECARD_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productPublicDetailsReducer = (
  state = { product: {} },
  action: any
) => {
  switch (action.type) {
    case PRODUCT_PUBLIC_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_PUBLIC_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_PUBLIC_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productDeletesReducer = (
  state = {},
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productCreateReducer = (
  state = {},
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (
  state = { product: {} },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRODUCT_UPDATE_RESET:
      return {
        product: {},
      };
    default:
      return state;
  }
};

export const productUpdateGuestReducer = (
  state = { product: {} },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case PRODUCT_GUEST_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_GUEST_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_GUEST_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_GUEST_UPDATE_RESET:
      return {
        product: {},
      };
    default:
      return state;
  }
};
