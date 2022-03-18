import { DONATE_CREATE_REQUEST, DONATE_CREATE_SUCCESS, DONATE_CREATE_FAIL, DONATE_CREATE_RESET, DONATE_DETAILS_REQUEST, DONATE_DETAILS_SUCCESS, DONATE_DETAILS_FAIL, DONATE_LIST_SUCCESS, DONATE_LIST_REQUEST, DONATE_LIST_RESET, DONATE_LIST_FAIL, DONATE_UPDATE_REQUEST, DONATE_UPDATE_FAIL, DONATE_UPDATE_RESET, DONATE_UPDATE_SUCCESS, DONATE_DELETE_REQUEST, DONATE_DELETE_SUCCESS, DONATE_DELETE_FAIL, DONATE_DETAILS_RESET} from '../constants/donationConstants'

// @ts-ignore
export const donateCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATE_CREATE_REQUEST:
      return {
        loading: true,
      };
    case DONATE_CREATE_SUCCESS:
      return {
        donation: action.payload,
        success: true,
        loading: false,
      };
    case DONATE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case DONATE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// @ts-ignore
export const donateDetailsReducer = (state = { loading: true, donation: {} },action) => {
  switch (action.type) {
    case DONATE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DONATE_DETAILS_SUCCESS:
      return {
        loading: false,
        donation: action.payload,
      }
    case DONATE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case DONATE_DETAILS_RESET:
      return {}
    default:
      return state
  }
}
// @ts-ignore
export const donateListReducer = (state = {  donations: [] },action) => {
  switch (action.type) {
    case DONATE_LIST_REQUEST:
      return {
        loading: true,
      }
    case DONATE_LIST_SUCCESS:
      return {
        loading: false,
        donations: action.payload,
      }
    case DONATE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case DONATE_LIST_RESET:
      return {
        donations: []
      }
    default:
      return state
  }
}

// @ts-ignore
export const donateUpdateReducer = (state = { donation: {} }, action) => {
  switch (action.type) {
    case DONATE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DONATE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        donation: action.payload,
      };
    case DONATE_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DONATE_UPDATE_RESET:
      return {
        donation: {}
      };
    default:
      return state;
  }
};

// @ts-ignore
export const donateDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATE_DELETE_REQUEST:
      return {
        loading: true,
      };
    case DONATE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DONATE_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};