import {
  USER_CHECK_IF_CONFIRMED_RESET,
  USER_CONFIRMED_FAIL,
  USER_CONFIRMED_REQUEST,
  USER_CONFIRMED_RESET,
  USER_CONFIRMED_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_GENERATE_NEW_TOKEN_FAIL,
  USER_GENERATE_NEW_TOKEN_REQUEST,
  USER_GENERATE_NEW_TOKEN_RESET,
  USER_GENERATE_NEW_TOKEN_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_RESET,
  USER_LOGOUT_SUCCESS,
  USER_OLD_PASSWORD_FAIL,
  USER_OLD_PASSWORD_REQUEST,
  USER_OLD_PASSWORD_RESET,
  USER_OLD_PASSWORD_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
  USER_VERIFY_EMAIL_FAIL,
  USER_VERIFY_EMAIL_REQUEST,
  USER_VERIFY_EMAIL_RESET,
  USER_VERIFY_EMAIL_SUCCESS,
  USER_WHO_WE_ARE_LIST_FAIL,
  USER_WHO_WE_ARE_LIST_REQUEST,
  USER_WHO_WE_ARE_LIST_RESET,
  USER_WHO_WE_ARE_LIST_SUCCESS,
} from '../constants/userConstants';

// @ts-ignore
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGIN_RESET:
      return {
        loading: false,
        success: false,
        error: '',
      };
    default:
      return state;
  }
};
// @ts-ignore
export const userRegisterReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};
// @ts-ignore
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        isAdmin: action.payload.isAdmin,
        name: action.payload.name,
        email: action.payload.email,
        success: true,
        updatedAt: action.payload.updatedAt,
        createdAt: action.payload.createdAt,
      };
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};
// @ts-ignore
export const userPasswordReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case USER_OLD_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_OLD_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case USER_OLD_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_OLD_PASSWORD_RESET:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};
// @ts-ignore
export const userUpdateProfileReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_PROFILE_RESET:
      return {
        userInfo: {},
      };
    default:
      return state;
  }
};
// @ts-ignore
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LIST_RESET:
      return {
        users: [],
      };
    default:
      return state;
  }
};

// @ts-ignore
export const userWhoWeAreListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_WHO_WE_ARE_LIST_REQUEST:
      return {
        loading: true,
      };
    case USER_WHO_WE_ARE_LIST_SUCCESS:
      return {
        loading: false,
        boardMembers: action.payload.boardMembers,
      };
    case USER_WHO_WE_ARE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_WHO_WE_ARE_LIST_RESET:
      return {
        users: [],
      };
    default:
      return state;
  }
};
// @ts-ignore
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_DELETE_RESET:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};
// @ts-ignore
export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

// @ts-ignore
export const userLogoutReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: null,
      };
    case USER_LOGOUT_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case USER_LOGOUT_RESET:
      return {
        loading: false,
        success: false,
        userInfo: null,
      };
    default:
      return state;
  }
};
// @ts-ignore
export const userVerifyEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_EMAIL_REQUEST:
      return {
        loading: true,
      };
    case USER_VERIFY_EMAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_VERIFY_EMAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_VERIFY_EMAIL_RESET:
      return {
        loading: false,
        error: action.payload,
        userInfo: {},
        success: false,
      };
    default:
      return state;
  }
};

// @ts-ignore
export const userConfirmedReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_CONFIRMED_REQUEST:
      return {
        loading: true,
      };
    case USER_CONFIRMED_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_CONFIRMED_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        userInfo: {},
      };
    case USER_CONFIRMED_RESET:
      return {
        loading: false,
        succes: false,
        error: action.payload,
        userInfo: {},
      };
    default:
      return state;
  }
};

// @ts-ignore
export const generatTokenForNewSessionReducer = (state = {}, action: any) => {
  switch (action.type) {
    case USER_GENERATE_NEW_TOKEN_REQUEST:
      return {
        loading: true,
      };
    case USER_GENERATE_NEW_TOKEN_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_GENERATE_NEW_TOKEN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_GENERATE_NEW_TOKEN_RESET:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

// @ts-ignore
export const checkUsersConfirmationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHECK_IF_CONFIRMED_RESET:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};
