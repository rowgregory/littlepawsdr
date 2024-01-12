import {
  ARCHIVE_ANNUAL_DATA_FAIL,
  ARCHIVE_ANNUAL_DATA_REQUEST,
  ARCHIVE_ANNUAL_DATA_RESET,
  ARCHIVE_ANNUAL_DATA_SUCCESS,
} from '../constants/archiveConstants';

export const archiveYearlyDataReducer = (state = {}, action: any) => {
  switch (action.type) {
    case ARCHIVE_ANNUAL_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ARCHIVE_ANNUAL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        annualData: action.payload,
      };
    case ARCHIVE_ANNUAL_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.pauload,
      };
    case ARCHIVE_ANNUAL_DATA_RESET:
      return {
        ...state,
        loading: false,
        annualData: [],
      };
    default:
      return state;
  }
};
