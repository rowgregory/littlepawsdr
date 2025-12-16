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
  changelogModal: boolean;
}

export type { ErrorPayload, DashboardStatePayload };
