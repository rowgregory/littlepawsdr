import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
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
import { Text } from '../styles/Styles';
import { LineChartContainer } from '../styles/DashboardStyles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  background: ${({ theme }) => theme.input.bg};
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 8px;
`;

const PieChart = ({ orders, eCards }: any) => {
  const data = {
    labels: ['Orders', 'Ecards'],
    datasets: [
      {
        data: [orders, eCards],
        backgroundColor: ['#9761aa', '#c0a0cc'],
        borderColor: ['#9761aa', '#c0a0cc'],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#c4c4c4',
        },
        position: 'bottom' as const,
      },
      title: {
        display: true,
      },
    },
  } as any;
  return (
    <Container>
      <Text fontWeight={500} fontSize='17px' color='#373737'>
        Sales By Type
      </Text>
      <LineChartContainer>
        <Doughnut data={data} options={options} />
      </LineChartContainer>
    </Container>
  );
};

export default PieChart;
