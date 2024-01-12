import {
  ACTION_HISTORY_LIST_FAIL,
  ACTION_HISTORY_LIST_REQUEST,
  ACTION_HISTORY_LIST_RESET,
  ACTION_HISTORY_LIST_SUCCESS,
} from '../constants/actionHistoryConstants';

export const actionHistoryListReducer = (
  state = { actionHistories: [] },
  action: any
) => {
  switch (action.type) {
    case ACTION_HISTORY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTION_HISTORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        actionHistories: action.payload,
      };
    case ACTION_HISTORY_LIST_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ACTION_HISTORY_LIST_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        error: '',
        actionHistories: [],
      };
    default:
      return state;
  }
};
