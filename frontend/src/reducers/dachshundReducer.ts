import {
  DACHSHUND_REQUEST,
  DACHSHUNDS_SUCCESS,
  DACHSHUNDS_FAIL,
  DACHSHUND_DETAILS_REQUEST,
  DACHSHUND_DETAILS_SUCCESS,
  DACHSHUND_DETAILS_FAIL,
  DACHSHUND_SUCCESSFUL_ADOPTIONS_REQUEST,
  DACHSHUND_SUCCESSFUL_ADOPTIONS_SUCCESS,
  DACHSHUND_SUCCESSFUL_ADOPTIONS_FAIL,
  DACHSHUND_SANCTUARY_OR_PASSED_AWAY_REQUEST,
  DACHSHUND_SANCTUARY_OR_PASSED_AWAY_SUCCESS,
  DACHSHUND_SANCTUARY_OR_PASSED_AWAY_FAIL,
  DACHSHUND_PICS_VIDS_STASTUSES_REQUEST,
  DACHSHUND_PICS_VIDS_STASTUSES_SUCCESS,
  DACHSHUND_PICS_VIDS_STASTUSES_FAIL,
  DACHSHUND_DETAILS_RESET,
  TOTAL_DACHSHUND_COUNT_REQUEST,
  TOTAL_DACHSHUND_COUNT_SUCCESS,
  TOTAL_DACHSHUND_COUNT_FAIL,
} from '../constants/dachshundConstants';

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
        error: action.payload,
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
        error: action.payload,
      };
    case DACHSHUND_DETAILS_RESET:
      return {
        loading: false,
        dachshund: {},
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
        error: action.payload,
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
        error: action.payload,
      };
    default:
      return state;
  }
};

// @ts-ignore
export const dachshundPicturesVideosStatusReducer = (state = { dachshunds: [] }, action: any) => {
  switch (action.type) {
    case DACHSHUND_PICS_VIDS_STASTUSES_REQUEST:
      return {
        loading: true,
      };
    case DACHSHUND_PICS_VIDS_STASTUSES_SUCCESS:
      return {
        ...state,
        dachshunds: action.payload,
        loading: false,
      };
    case DACHSHUND_PICS_VIDS_STASTUSES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const totalDachshundCountReducer = (state = { dachshundCount: 0 }, action: any) => {
  switch (action.type) {
    case TOTAL_DACHSHUND_COUNT_REQUEST:
      return {
        loading: true,
      };
    case TOTAL_DACHSHUND_COUNT_SUCCESS:
      return {
        ...state,
        dachshundCount: action.payload,
        loading: false,
      };
    case TOTAL_DACHSHUND_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
