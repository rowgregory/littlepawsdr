import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import { Text } from '../styles/Styles';
import { LineChartContainer, SpinnerContainer, TotalSalesContainer } from '../styles/DashboardStyles';
import { Spinner } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);

const PieChart = ({ pieChart, loading }: any) => {
  return (
    <TotalSalesContainer>
      <Text color='#373737' fontWeight={500} fontSize='17px' marginBottom={pieChart?.noData ? '24px' : ''}>
        Total Sales
      </Text>
      {loading ? (
        <SpinnerContainer>
          <Spinner animation='border' size='sm' />
        </SpinnerContainer>
      ) : pieChart?.noData ? (
        <Text>No data to display</Text>
      ) : (
        !pieChart?.noData &&
        pieChart?.data?.labels?.length > 0 && (
          <LineChartContainer>
            <Doughnut data={pieChart?.data} options={pieChart?.options} />
          </LineChartContainer>
        )
      )}
    </TotalSalesContainer>
  );
};

export default PieChart;
