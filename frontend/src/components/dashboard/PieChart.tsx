import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import styled, { useTheme } from 'styled-components';
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
  padding: 1.5rem;
  border-radius: 0.5rem;

  /* height: 100%; */
  /* display: flex;
  flex-direction: column; */
  /* @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    height: 500px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    height: 100%;
  } */
`;

const PieChart = ({ orders, donations, eCards }: any) => {
  const theme = useTheme() as any;
  const data = {
    labels: ['Orders', 'Donations', 'Ecards'],
    datasets: [
      {
        data: [orders, donations, eCards],
        backgroundColor: ['#ad88bb', '#ccafd6', theme.colors.quinary],
        borderColor: ['#ad88bb', '#ccafd6', theme.colors.quinary],
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
      <Text fontWeight={500} fontSize='1.05rem' color='#373737'>
        Sales By Type
      </Text>
      <LineChartContainer>
        <Doughnut data={data} options={options} />
      </LineChartContainer>
    </Container>
  );
};

export default PieChart;
