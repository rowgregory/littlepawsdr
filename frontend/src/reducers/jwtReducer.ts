import {
  JWT_CHECK_VALIDITY_FAIL,
  JWT_CHECK_VALIDITY_REQUEST,
  JWT_CHECK_VALIDITY_SUCCESS,
  JWT_CHECK_VALIDITY_ADOPTION_FEE_REQUEST,
  JWT_CHECK_VALIDITY_ADOPTION_FEE_SUCCESS,
  JWT_CHECK_VALIDITY_ADOPTION_FEE_FAIL,
  JWT_CHECK_VALIDITY_ADOPTION_FEE_RESET,
} from '../constants/jwtConstants';

export const jwtCheckValidityReducer = (state = {}, action: any) => {
  switch (action.type) {
    case JWT_CHECK_VALIDITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JWT_CHECK_VALIDITY_SUCCESS:
      return {
        ...state,
        loading: false,
        isExpired: action.payload.isExpired,
        message: action.payload.message,
        statusCode: action.payload.statusCode,
      };
    case JWT_CHECK_VALIDITY_FAIL:
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
export const jwtCheckValidityAdoptionFeeReducer = (
  state = {},
  action: any
) => {
  switch (action.type) {
    case JWT_CHECK_VALIDITY_ADOPTION_FEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JWT_CHECK_VALIDITY_ADOPTION_FEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isExpired: action.payload.isExpired,
        message: action.payload.message,
        statusCode: action.payload.statusCode,
        exp: action.payload.exp,
      };
    case JWT_CHECK_VALIDITY_ADOPTION_FEE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case JWT_CHECK_VALIDITY_ADOPTION_FEE_RESET:
      return {
        isExpired: true,
        success: false,
        loading: false,
        error: '',
        exp: null,
        message: '',
      };
    default:
      return state;
  }
};
