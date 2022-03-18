import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from 'styled-components';

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
  return <Doughnut data={data} />;
};

export default PieChart;
