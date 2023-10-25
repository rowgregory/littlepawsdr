import {
  SEARCH_BAR_LIST_FAIL,
  SEARCH_BAR_LIST_REQUEST,
  SEARCH_BAR_LIST_SUCCESS,
} from '../constants/searchBarConstants';

export const searchBarListReducer = (state = { list: [] }, action: any) => {
  switch (action.type) {
    case SEARCH_BAR_LIST_REQUEST:
      return {
        loading: true,
      };
    case SEARCH_BAR_LIST_SUCCESS:
      return {
        loading: false,
        list: action.payload,
      };
    case SEARCH_BAR_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
