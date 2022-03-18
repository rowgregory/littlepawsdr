import {
  NEWSLETTER_EMAIL_CREATE_FAIL,
  NEWSLETTER_EMAIL_CREATE_REQUEST,
  // NEWSLETTER_EMAIL_CREATE_RESET,
  NEWSLETTER_EMAIL_CREATE_SUCCESS,
  NEWSLETTER_EMAIL_DELETE_FAIL,
  NEWSLETTER_EMAIL_DELETE_REQUEST,
  NEWSLETTER_EMAIL_DELETE_SUCCESS,
  NEWSLETTER_EMAIL_LIST_FAIL,
  NEWSLETTER_EMAIL_LIST_REQUEST,
  NEWSLETTER_EMAIL_LIST_SUCCESS,
} from '../constants/newsletterConstants';

export const newsletterCreateReducer = (state = '', action: any) => {
  switch (action.type) {
    case NEWSLETTER_EMAIL_CREATE_REQUEST:
      return {
        loading: true,
      };
    case NEWSLETTER_EMAIL_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case NEWSLETTER_EMAIL_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    // case NEWSLETTER_EMAIL_CREATE_RESET:
    //   return {
    //     loading: false,
    //     success: false,
    //   };
    default:
      return state;
  }
};

export const newsletterEmailListReducer = (
  state = { newsletterEmails: [] },
  action: any
) => {
  switch (action.type) {
    case NEWSLETTER_EMAIL_LIST_REQUEST:
      return {
        loading: true,
      };
    case NEWSLETTER_EMAIL_LIST_SUCCESS:
      return {
        loading: false,
        newsletterEmails: action.payload,
      };
    case NEWSLETTER_EMAIL_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const newsletterEmailDeleteReducer = (
  state = { newsletterEmail: {} },
  action: any
) => {
  switch (action.type) {
    case NEWSLETTER_EMAIL_DELETE_REQUEST:
      return {
        loading: true,
      };
    case NEWSLETTER_EMAIL_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case NEWSLETTER_EMAIL_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
