import {
  RESET_EMAIL_SEND_FAIL,
  RESET_EMAIL_SEND_REQUEST,
  RESET_EMAIL_SEND_RESET,
  RESET_EMAIL_SEND_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  VERIFY_TOKEN_FAIL,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
} from '../constants/resetPasswordContants';

export const sendEmailReducer = (state = {}, action: any) => {
  switch (action.type) {
    case RESET_EMAIL_SEND_REQUEST:
      return {
        loading: true,
      };
    case RESET_EMAIL_SEND_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      };
    case RESET_EMAIL_SEND_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_EMAIL_SEND_RESET:
      return {
        loading: false,
        error: '',
        success: false,
      };
    default:
      return state;
  }
};

export const verifyTokenReducer = (state = {}, action: any) => {
  switch (action.type) {
    case VERIFY_TOKEN_REQUEST:
      return {
        loading: true,
      };
    case VERIFY_TOKEN_SUCCESS:
      return {
        loading: false,
        result: action.payload,
      };
    case VERIFY_TOKEN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action: any) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      };
    case RESET_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
