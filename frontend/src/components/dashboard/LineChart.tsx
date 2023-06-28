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
import { Text } from '../styles/Styles';
import {
  LineChartContainer,
  SpinnerContainer,
  TotalSalesContainer,
} from '../styles/DashboardStyles';
import { Spinner } from 'react-bootstrap';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ lineChart, loading }: any) => {
  const noData = lineChart?.data?.datasets.every((obj: any) =>
    obj.data?.every((month: any) => month === null)
  );

  return (
    <TotalSalesContainer>
      <Text
        color='#373737'
        fontWeight={500}
        marginBottom='24px'
        fontSize='17px'
      >
        Monthly Order Sales
      </Text>
      {loading ? (
        <SpinnerContainer>
          <Spinner animation='border' size='sm' />
        </SpinnerContainer>
      ) : noData ? (
        <Text>No data to display</Text>
      ) : (
        !noData &&
        lineChart?.data?.labels?.length > 0 && (
          <LineChartContainer>
            <Line data={lineChart?.data} options={lineChart?.options} />
          </LineChartContainer>
        )
      )}
    </TotalSalesContainer>
  );
};

export default LineChart;
