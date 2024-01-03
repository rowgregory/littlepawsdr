import {
  ADOPTION_FEE_ACTIVE_SESSION_FAIL,
  ADOPTION_FEE_ACTIVE_SESSION_REQUEST,
  ADOPTION_FEE_ACTIVE_SESSION_RESET,
  ADOPTION_FEE_ACTIVE_SESSION_SUCCESS,
  ADOPTION_FEE_FAIL,
  ADOPTION_FEE_LIST_FAIL,
  ADOPTION_FEE_LIST_REQUEST,
  ADOPTION_FEE_LIST_SUCCESS,
  ADOPTION_FEE_REQUEST,
  ADOPTION_FEE_RESET,
  ADOPTION_FEE_SUCCESS,
} from '../constants/adoptionConstants';

export const adoptionFeeCreateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case ADOPTION_FEE_REQUEST:
      return {
        loading: true,
      };
    case ADOPTION_FEE_SUCCESS:
      return {
        loading: false,
        success: true,
        token: action.payload.token,
      };
    case ADOPTION_FEE_FAIL:
      return {
        loading: false,
        error: action.payload,
        message: action.payload.message,
      };
    case ADOPTION_FEE_RESET:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const adoptionFeeCheckActiveSessionReducer = (
  state = {},
  action: any
) => {
  switch (action.type) {
    case ADOPTION_FEE_ACTIVE_SESSION_REQUEST:
      return {
        loading: true,
      };
    case ADOPTION_FEE_ACTIVE_SESSION_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload.message,
        isExpired: action.payload.isExpired,
      };
    case ADOPTION_FEE_ACTIVE_SESSION_FAIL:
      return {
        loading: false,
        error: action.payload.error,
        isExpired: action.payload.isExpired,
      };
    case ADOPTION_FEE_ACTIVE_SESSION_RESET:
      return {
        isExpired: false,
        success: false,
        loading: false,
        message: '',
      };
    default:
      return state;
  }
};

export const adoptionFeeListReducer = (
  state = { adoptionFees: [] },
  action: any
) => {
  switch (action.type) {
    case ADOPTION_FEE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADOPTION_FEE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        adoptionFees: action.payload,
      };
    case ADOPTION_FEE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
