import { DACHSHUND_REQUEST, DACHSHUNDS_SUCCESS, DACHSHUNDS_FAIL, DACHSHUND_DETAILS_REQUEST, DACHSHUND_DETAILS_SUCCESS, DACHSHUND_DETAILS_FAIL, DACHSHUND_SUCCESSFUL_ADOPTIONS_REQUEST, DACHSHUND_SUCCESSFUL_ADOPTIONS_SUCCESS, DACHSHUND_SUCCESSFUL_ADOPTIONS_FAIL, DACHSHUND_SANCTUARY_OR_PASSED_AWAY_REQUEST, DACHSHUND_SANCTUARY_OR_PASSED_AWAY_SUCCESS, DACHSHUND_SANCTUARY_OR_PASSED_AWAY_FAIL } from "../constants/dachshundConstants";

const initialState = {
  dachshunds: [],
  loading: true,
};

// @ts-ignore
export const dachshundListReducer = (state = initialState, action) => {
  switch (action.type) {
    case DACHSHUND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DACHSHUNDS_SUCCESS:
      return {
        ...state,
        dachshunds: action.payload,
        loading: false,
      };
    case DACHSHUNDS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

// @ts-ignore
export const dachshundDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case DACHSHUND_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DACHSHUND_DETAILS_SUCCESS:
      return {
        ...state,
        dachshund: action.payload,
        loading: false,
      };
    case DACHSHUND_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
// @ts-ignore
export const dachshundSuccessfulAdoptionsReducer = (state = [], action) => {
  switch (action.type) {
    case DACHSHUND_SUCCESSFUL_ADOPTIONS_REQUEST:
      return {
        loading: true,
      };
    case DACHSHUND_SUCCESSFUL_ADOPTIONS_SUCCESS:
      return {
        ...state,
        successfulAdoptions: action.payload,
        loading: false,
      };
    case DACHSHUND_SUCCESSFUL_ADOPTIONS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
// @ts-ignore
export const dachshundSanctuaryOrPassedAwayReducer = (state = [], action) => {
  switch (action.type) {
    case DACHSHUND_SANCTUARY_OR_PASSED_AWAY_REQUEST:
      return {
        loading: true,
      };
    case DACHSHUND_SANCTUARY_OR_PASSED_AWAY_SUCCESS:
      return {
        ...state,
        dachshunds: action.payload,
        loading: false,
      };
    case DACHSHUND_SANCTUARY_OR_PASSED_AWAY_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
