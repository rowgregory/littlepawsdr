import {
  MANUALLY_ADD_USER_CREATE_FAIL,
  MANUALLY_ADD_USER_CREATE_REQUEST,
  MANUALLY_ADD_USER_CREATE_RESET,
  MANUALLY_ADD_USER_CREATE_SUCCESS,
  MANUALLY_ADD_USER_DELETE_FAIL,
  MANUALLY_ADD_USER_DELETE_REQUEST,
  MANUALLY_ADD_USER_DELETE_SUCCESS,
  MANUALLY_ADD_USER_DETAILS_FAIL,
  MANUALLY_ADD_USER_DETAILS_REQUEST,
  MANUALLY_ADD_USER_DETAILS_SUCCESS,
  MANUALLY_ADD_USER_LIST_FAIL,
  MANUALLY_ADD_USER_LIST_REQUEST,
  MANUALLY_ADD_USER_LIST_SUCCESS,
  MANUALLY_ADD_USER_UPDATE_FAIL,
  MANUALLY_ADD_USER_UPDATE_REQUEST,
  MANUALLY_ADD_USER_UPDATE_RESET,
  MANUALLY_ADD_USER_UPDATE_SUCCESS,
} from '../constants/manuallyAddUserConstants';

export const manuallyAddUserListReducer = (
  state = { manuallyAddedUsers: [] },
  action: any
) => {
  switch (action.type) {
    case MANUALLY_ADD_USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case MANUALLY_ADD_USER_LIST_SUCCESS:
      return {
        loading: false,
        manuallyAddedUsers: action.payload,
      };
    case MANUALLY_ADD_USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// @ts-ignore
export const manuallyAddUserCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MANUALLY_ADD_USER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case MANUALLY_ADD_USER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        manuallyAddedUser: action.payload,
      };
    case MANUALLY_ADD_USER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case MANUALLY_ADD_USER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// @ts-ignore
export const manuallyAddUserDetailsReducer = (
  state = { manuallyAddedUser: {} },
  action: any
) => {
  switch (action.type) {
    case MANUALLY_ADD_USER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case MANUALLY_ADD_USER_DETAILS_SUCCESS:
      return {
        loading: false,
        manuallyAddedUser: action.payload,
      };
    case MANUALLY_ADD_USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// @ts-ignore
export const manuallyAddUserUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MANUALLY_ADD_USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case MANUALLY_ADD_USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case MANUALLY_ADD_USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case MANUALLY_ADD_USER_UPDATE_RESET:
      return {
        manuallyAddedUser: {},
      };
    default:
      return state;
  }
};

// @ts-ignore
export const manuallyAddUserDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MANUALLY_ADD_USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case MANUALLY_ADD_USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case MANUALLY_ADD_USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
