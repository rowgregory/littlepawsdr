import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled, { useTheme } from 'styled-components';

const Container = styled.div`
  background: ${({ theme }) => theme.input.bg};
  border: ${({ theme }) => `1px solid ${theme.separator}`};
  padding: 1.5rem;
  border-radius: 0.5rem;
  height: 400px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    height: 500px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    height: 100%;
  }
`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ revenueFromOrders }: any) => {
  const theme = useTheme() as any;
  const circles = theme.colors.primary;
  const rods = theme.colors.secondary;
  const year = new Date().getFullYear();
  const isDay = theme.mode === 'day';

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
        label: 'Total sales by month',
        data: [
          revenueFromOrders[`${year}-01`] ?? null,
          revenueFromOrders[`${year}-02`] ?? null,
          revenueFromOrders[`${year}-03`] ?? null,
          revenueFromOrders[`${year}-04`] ?? null,
          revenueFromOrders[`${year}-05`] ?? null,
          revenueFromOrders[`${year}-06`] ?? null,
          revenueFromOrders[`${year}-07`] ?? null,
          revenueFromOrders[`${year}-08`] ?? null,
          revenueFromOrders[`${year}-09`] ?? null,
          revenueFromOrders[`${year}-10`] ?? null,
          revenueFromOrders[`${year}-11`] ?? null,
          revenueFromOrders[`${year}-12`] ?? null,
        ],
        fill: false,
        backgroundColor: circles,
        borderColor: rods,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDay ? '#ededed' : '#171717',
        },
      },
      x: {
        grid: {
          color: isDay ? '#ededed' : '#171717',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Product Sales',
      },
    },
  } as any;
  return (
    <Container>
      <Line data={data} options={options} />
    </Container>
  );
};

export default LineChart;
