import React from 'react';
import { Line } from 'react-chartjs-2';
import styled, { useTheme } from 'styled-components';
const Container = styled.div`
  background: ${({ theme }) => theme.input.bg};
  border: ${({ theme }) => `1px solid ${theme.separator}`};
  padding: 1.5rem;
  border-radius: 0.5rem;
  height: 100%;
`;

const LineChart = ({ revenueFromOrders }: any) => {
  const theme = useTheme() as any;
  const circles = theme.colors.primary;
  const rods = theme.colors.secondary;
  const year = new Date().getFullYear();
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
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
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
