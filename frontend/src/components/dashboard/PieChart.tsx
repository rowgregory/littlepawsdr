import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from 'styled-components';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PieChart = ({ orders, donations, eCards }: any) => {
  const theme = useTheme() as any;
  const data = {
    labels: ['Orders', 'Donations', 'ECards'],
    datasets: [
      {
        data: [orders, donations, eCards],
        backgroundColor: [
          theme.colors.primary,
          theme.colors.secondary,
          theme.colors.quinary,
        ],
        borderColor: [
          theme.colors.primary,
          theme.colors.secondary,
          theme.colors.quinary,
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Total Sales',
      },
    },
  } as any;
  return <Doughnut data={data} options={options} />;
};

export default PieChart;
