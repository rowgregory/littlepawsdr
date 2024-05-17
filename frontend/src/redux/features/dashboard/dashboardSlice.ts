import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { dashboardApi } from '../../services/dashboardApi';

interface ErrorPayload {
  message: string;
  errorCode: string;
}

interface DashboardStatePayload {
  loading: boolean;
  success: boolean;
  error: ErrorPayload | null;
  modal: { openOrClose: boolean };
  currentYearData: {
    tenMostRecentOrders: [];
    revenue: {
      previousYear: number;
      currentYear: number;
      welcomeWienerRevenue: number;
      ecardRevenue: number;
      productRevenue: number;
      adoptionFeesRevenue: number;
    };
    topSellingProducts: any[] | unknown;
    totalAmounts: {
      welcomeWienerOrders: number;
      users: number;
      ecardOrders: number;
      productOrders: number;
      orders: number;
      adoptionFees: number;
    };
    lineChart: {
      series: any[] | unknown;
      totalCurrentMonthlySales: any[] | unknown;
    };
    pieChart: {};
    salesComparison: {
      currentYearTotal: number;
      previousYearTotal: number;
      percentageChange: number;
    };
    productTracker: {
      product: {
        qtySold: number;
        percentage: number;
      };
      eCard: {
        qtySold: number;
        percentage: number;
      };
      welcomeWiener: {
        qtySold: number;
        percentage: number;
      };
    };
    welcomeWienerStats: {
      nameArray: any[];
      percentageArray: any[];
      totalWelcomeWieners: number;
      quantityPerItem: number;
      welcomeWienerRevenue: number;
      totalRevenueArray: any[];
    };
  };
  bypassCode: string;
  sidebar: boolean;
  welcomeWienerOrders: [];
  welcomeWienerRevenue: number;
  totalWelcomeWieners: number;
  firstWelcomeWienerOrderCreatedAt: string;
  ecardOrders: [];
  ecardOrderRevenue: number;
  totalEcardOrders: number;
}

const initialDashboardState: DashboardStatePayload = {
  loading: false,
  success: false,
  error: null,
  modal: { openOrClose: false },
  currentYearData: {
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
    lineChart: {
      series: [],
      totalCurrentMonthlySales: [],
    },
    pieChart: {},
    salesComparison: {
      currentYearTotal: 0,
      previousYearTotal: 0,
      percentageChange: 0,
    },
    productTracker: {
      product: {
        qtySold: 0,
        percentage: 0,
      },
      eCard: {
        qtySold: 0,
        percentage: 0,
      },
      welcomeWiener: {
        qtySold: 0,
        percentage: 0,
      },
    },
    welcomeWienerStats: {
      nameArray: [],
      percentageArray: [],
      totalWelcomeWieners: 0,
      quantityPerItem: 0,
      welcomeWienerRevenue: 0,
      totalRevenueArray: [],
    },
  },
  bypassCode: '',
  sidebar: false,
  welcomeWienerOrders: [],
  welcomeWienerRevenue: 0,
  totalWelcomeWieners: 0,
  firstWelcomeWienerOrderCreatedAt: '',
  ecardOrders: [],
  ecardOrderRevenue: 0,
  totalEcardOrders: 0,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialDashboardState,
  reducers: {
    openCloseDashboardModal: (state, action: PayloadAction<boolean>) => {
      state.modal.openOrClose = action.payload;
    },
    setAdoptionApplicationBypassCode: (state, { payload }) => {
      state.bypassCode = payload.bypassCode;
    },
    toggleSidebar: (state, { payload }) => {
      state.sidebar = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        dashboardApi.endpoints.getAdoptionApplicationBypassCode.matchFulfilled,
        (state, { payload }: any) => {
          state.bypassCode = payload.bypassCode;
        }
      )
      .addMatcher(
        dashboardApi.endpoints.getWelcomeWienerOrders.matchFulfilled,
        (state, { payload }: any) => {
          state.welcomeWienerOrders = payload.welcomeWienerOrders;
          state.welcomeWienerRevenue = payload.welcomeWienerRevenue;
          state.totalWelcomeWieners = payload.totalWelcomeWieners;
          state.firstWelcomeWienerOrderCreatedAt = payload.firstWelcomeWienerOrderCreatedAt;
        }
      )
      .addMatcher(
        dashboardApi.endpoints.getEcardOrders.matchFulfilled,
        (state, { payload }: any) => {
          state.ecardOrders = payload.ecardOrders;
          state.ecardOrderRevenue = payload.ecardOrderRevenue;
          state.totalEcardOrders = payload.totalEcardOrders;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'dashboardApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const dashboardReducer = dashboardSlice.reducer as Reducer<DashboardStatePayload>;

export const { openCloseDashboardModal, setAdoptionApplicationBypassCode, toggleSidebar } =
  dashboardSlice.actions;
