import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { DashboardStatePayload } from '../../types/dashboard-types';

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
