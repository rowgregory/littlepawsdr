import {
  GUEST_USER_REGISTER_FAIL,
  GUEST_USER_REGISTER_REQUEST,
  GUEST_USER_REGISTER_RESET,
  GUEST_USER_REGISTER_SUCCESS,
  GUEST_USER_SUCCESS_RESET,
} from '../constants/guestUserConstants';

// @ts-ignore
export const guestUserRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case GUEST_USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case GUEST_USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
        guestUserInfo: action.payload,
      };
    case GUEST_USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GUEST_USER_REGISTER_RESET:
      return {
        guestUserInfo: null,
        success: false,
      };
    case GUEST_USER_SUCCESS_RESET:
      return {
        success: false,
        guestUserInfo: action.payload,
      };
    default:
      return state;
  }
};
