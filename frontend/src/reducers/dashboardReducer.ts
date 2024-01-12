import {
  ADOPTION_APPLICATION_FEE_BYPASS_CODE_FAIL,
  ADOPTION_APPLICATION_FEE_BYPASS_CODE_REQUEST,
  ADOPTION_APPLICATION_FEE_BYPASS_CODE_SUCCESS,
} from '../constants/adoptionConstants';
import {
  DASHBOARD_CURRENT_YEAR_DATA_FAIL,
  DASHBOARD_CURRENT_YEAR_DATA_REQUEST,
  DASHBOARD_CURRENT_YEAR_DATA_SUCCESS,
  OPEN_CLOSE_DASHBOARD_MODAL,
} from '../constants/dashboardConstants';

export const dashboardReducer = (
  state = {
    modal: { openOrClose: false },
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
    default:
      return state;
  }
};

// @ts-ignore
export const dashboardCurrentYearDataReducer = (
  state = {
    tenMostRecentOrders: [],
    revenue: {
      previousYear: 0,
      currentYear: 0,
      welcomeWienerRevenue: 0,
      ecardRevenue: 0,
      productRevenue: 0,
      adoptionFeesRevenue: 0,
    },
    topSellingProducts: [],
    totalAmounts: {
      welcomeWienerOrders: 0,
      users: 0,
      ecardOrders: 0,
      productOrders: 0,
      orders: 0,
      adoptionFees: 0,
    },
    lineChart: {},
    pieChart: {},
  },
  action: any
) => {
  switch (action.type) {
    case DASHBOARD_CURRENT_YEAR_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DASHBOARD_CURRENT_YEAR_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        currentYearData: action.payload,
      };

    case DASHBOARD_CURRENT_YEAR_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adoptionApplicationFeeBypassCodeReducer = (state = { bypassCode: '' }, action: any) => {
  switch (action.type) {
    case ADOPTION_APPLICATION_FEE_BYPASS_CODE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADOPTION_APPLICATION_FEE_BYPASS_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        bypassCode: action.payload,
      };
    case ADOPTION_APPLICATION_FEE_BYPASS_CODE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
