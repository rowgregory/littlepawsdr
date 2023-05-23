import {
  LINE_CHART_DATA,
  OPEN_CLOSE_DASHBOARD_MODAL,
} from '../constants/dashboardConstants';

export const dashboardReducer = (
  state = {
    modal: { openOrClose: false },
    linechart: {},
  },
  action: any
) => {
  switch (action.type) {
    case OPEN_CLOSE_DASHBOARD_MODAL:
      return {
        ...state,
        modal: {
          openOrClose: action.payload,
        },
      };
    case LINE_CHART_DATA:
      return {
        ...state,
        linechart: {
          data: action.payload.data,
          options: action.payload.options,
        },
      };
    default:
      return state;
  }
};
