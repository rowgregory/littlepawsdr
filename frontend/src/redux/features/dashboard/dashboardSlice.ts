import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { dashboardApi } from '../../services/dashboardApi';
import { DashboardStatePayload } from '../../../types/dashboard-types';

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
  changelogModal: false,
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
    closeAdminMobileNavigation: (state) => {
      state.sidebar = false;
    },
    openAdminMobileNavigation: (state) => {
      state.sidebar = true;
    },
    setOpenChangelogModal: (state) => {
      state.changelogModal = true;
    },
    setCloseChangelogModal: (state) => {
      state.changelogModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(dashboardApi.endpoints.getAdoptionApplicationBypassCode.matchFulfilled, (state, { payload }: any) => {
        state.bypassCode = payload.bypassCode;
      })
      .addMatcher(dashboardApi.endpoints.getWelcomeWienerOrders.matchFulfilled, (state, { payload }: any) => {
        state.welcomeWienerOrders = payload.welcomeWienerOrders;
        state.welcomeWienerRevenue = payload.welcomeWienerRevenue;
        state.totalWelcomeWieners = payload.totalWelcomeWieners;
        state.firstWelcomeWienerOrderCreatedAt = payload.firstWelcomeWienerOrderCreatedAt;
      })
      .addMatcher(dashboardApi.endpoints.getEcardOrders.matchFulfilled, (state, { payload }: any) => {
        state.ecardOrders = payload.ecardOrders;
        state.ecardOrderRevenue = payload.ecardOrderRevenue;
        state.totalEcardOrders = payload.totalEcardOrders;
      })
      .addMatcher(dashboardApi.endpoints.fetchDashboardData.matchFulfilled, (state, { payload }: any) => {
        state.success = true;
      })
      .addMatcher(
        (action: any) => action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'dashboardApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const dashboardReducer = dashboardSlice.reducer as Reducer<DashboardStatePayload>;

export const {
  openCloseDashboardModal,
  setAdoptionApplicationBypassCode,
  closeAdminMobileNavigation,
  openAdminMobileNavigation,
  setCloseChangelogModal,
  setOpenChangelogModal,
} = dashboardSlice.actions;
