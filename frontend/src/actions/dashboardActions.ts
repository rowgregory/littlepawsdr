import {
  LINE_CHART_DATA,
  OPEN_CLOSE_DASHBOARD_MODAL,
} from '../constants/dashboardConstants';

interface OrderType {
  createdAt: string;
}

export const openCloseDashboardModal =
  (openCloseDashboardModal: boolean) => async (dispatch: any) => {
    dispatch({
      type: OPEN_CLOSE_DASHBOARD_MODAL,
      payload: openCloseDashboardModal,
    });
  };

export const getLineChartData = (orders: any) => async (dispatch: any) => {
  const circles = 'rgba(151,97,169, 0.05)';
  const rods = '#9761aa';
  const year = new Date().getFullYear();

  const sortedByDate = orders?.sort(
    (a: OrderType, b: OrderType) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // flatMap() to flatten the nested arrays in a single step.
  const dateArr =
    sortedByDate?.flatMap((obj: any) =>
      obj.orderItems?.map((order: any) => ({
        ...order,
        createdAt: obj.createdAt.split('T')[0],
      }))
    ) ?? [];

  // new Set() to get unique summed up dates
  const summedUpDates = new Set(
    dateArr?.map((t: any) => t.createdAt.substring(0, 7))
  );

  const sumUpDate = (date: any) => {
    let sum = 0;
    dateArr?.forEach((t: any) => {
      if (t.createdAt.substring(0, 7) === date.substring(0, 7)) {
        sum += t.price * t.quantity;
      }
    });
    return sum;
  };

  const revenueFromOrders: { [key: string]: number } = {};

  summedUpDates.forEach((date: any) => {
    const sum = sumUpDate(date);
    revenueFromOrders[date] = sum;
  });

  const graphData = Array.from(
    { length: 12 },
    (_, index) =>
      revenueFromOrders[`${year}-${String(index + 1).padStart(2, '0')}`] ?? null
  );

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Total product sales',
        data: graphData?.map((num: any) => num),
        fill: true,
        backgroundColor: circles,
        borderColor: rods,
        tension: 0.1,
        spanGaps: true,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        grid: {
          drawBorder: false,
          color: '#fff',
        },
        ticks: {
          color: '#c4c4c4',
        },
      },
      x: {
        grid: {
          drawBorder: false,
          color: '#fff',
        },
        ticks: {
          color: '#c4c4c4',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  } as any;

  dispatch({
    type: LINE_CHART_DATA,
    payload: { data, options },
  });
};
