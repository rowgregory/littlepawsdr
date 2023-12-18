import {
  JWT_CHECK_VALIDITY_FAIL,
  JWT_CHECK_VALIDITY_REQUEST,
  JWT_CHECK_VALIDITY_SUCCESS,
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
