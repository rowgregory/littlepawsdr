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
import styled from 'styled-components';
import { Text } from '../styles/Styles';
import { LineChartContainer } from '../styles/DashboardStyles';

const Container = styled.div`
  background: ${({ theme }) => theme.input.bg};
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
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
  const circles = 'rgba(151,97,169, 0.05)';
  const rods = '#9761aa';
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
        label: 'Total product sales',
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
        fill: true,
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
  return (
    <Container>
      <Text
        color='#373737'
        fontWeight={500}
        marginBottom='1.5rem'
        fontSize='1.05rem'
      >
        Monthly Product Sales
      </Text>
      <LineChartContainer>
        <Line data={data} options={options} />
      </LineChartContainer>
    </Container>
  );
};

export default LineChart;
