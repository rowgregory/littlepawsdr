import {
  ECARD_CREATE_FAIL,
  ECARD_CREATE_REQUEST,
  ECARD_CREATE_RESET,
  ECARD_CREATE_SUCCESS,
  ECARD_DELETE_FAIL,
  ECARD_DELETE_REQUEST,
  ECARD_DELETE_SUCCESS,
  ECARD_DETAILS_FAIL,
  ECARD_DETAILS_REQUEST,
  ECARD_DETAILS_SUCCESS,
  ECARD_DETAILS_RESET,
  ECARD_LIST_FAIL,
  ECARD_LIST_REQUEST,
  ECARD_LIST_RESET,
  ECARD_LIST_SUCCESS,
  ECARD_UPDATE_FAIL,
  ECARD_UPDATE_REQUEST,
  ECARD_UPDATE_RESET,
  ECARD_UPDATE_SUCCESS,
  ECARD_FILTERED_LIST_REQUEST,
  ECARD_FILTERED_LIST_SUCCESS,
  ECARD_FILTERED_LIST_FAIL,
} from '../constants/eCardConstants';

// @ts-ignore
export const ecardListReducer = (state = { ecards: [] }, action) => {
  switch (action.type) {
    case ECARD_LIST_REQUEST:
      return {
        loading: true,
      };
    case ECARD_LIST_SUCCESS:
      return {
        loading: false,
        ecards: action.payload,
      };
    case ECARD_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ECARD_LIST_RESET:
      return {
        ecards: [],
      };
    default:
      return state;
  }
};

export const ecardFilteredListReducer = (
  state = { filteredEcards: [] },
  action: any
) => {
  switch (action.type) {
    case ECARD_FILTERED_LIST_REQUEST:
      return {
        loading: true,
      };
    case ECARD_FILTERED_LIST_SUCCESS:
      return {
        loading: false,
        filteredEcards: action.payload,
      };
    case ECARD_FILTERED_LIST_FAIL:
      return {
        loading: false,
        filteredEcards: action.payload,
      };
    default:
      return state;
  }
};

// @ts-ignore
export const ecardCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ECARD_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ECARD_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        ecard: action.payload,
      };
    case ECARD_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ECARD_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// @ts-ignore
export const ecardDetailsReducer = (state = { ecard: {} }, action) => {
  switch (action.type) {
    case ECARD_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ECARD_DETAILS_SUCCESS:
      return {
        loading: false,
        ecard: action.payload,
        success: true,
      };
    case ECARD_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ECARD_DETAILS_RESET:
      return {
        ecard: {},
      };
    default:
      return state;
  }
};

// @ts-ignore
export const ecardUpdateReducer = (state = { ecard: {} }, action) => {
  switch (action.type) {
    case ECARD_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ECARD_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        ecard: action.payload,
      };
    case ECARD_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ECARD_UPDATE_RESET:
      return {
        ecard: {},
      };
    default:
      return state;
  }
};

// @ts-ignore
export const ecardDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ECARD_DELETE_REQUEST:
      return {
        loading: true,
      };
    case ECARD_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ECARD_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
