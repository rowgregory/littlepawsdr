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
import { useDispatch, useSelector } from 'react-redux';
import { getLineChartData } from '../../actions/dashboardActions';
import { useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ orders, loading }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (orders) {
      dispatch(getLineChartData(orders));
    }
  }, [dispatch, orders]);

  const state = useSelector((state: any) => state);

  const data = state?.dashboard?.linechart?.data;
  const options = state?.dashboard?.linechart?.options;

  const noData = data === undefined && options === undefined;

  return (
    <TotalSalesContainer>
      <Text
        color='#373737'
        fontWeight={500}
        marginBottom='24px'
        fontSize='17px'
      >
        Monthly Welcome Wiener Donations
      </Text>
      {loading ? (
        <SpinnerContainer>
          <Spinner animation='border' size='sm' />
        </SpinnerContainer>
      ) : noData ? (
        <Text>No data to display</Text>
      ) : (
        !noData && (
          <LineChartContainer>
            <Line data={data} options={options} />
          </LineChartContainer>
        )
      )}
    </TotalSalesContainer>
  );
};

export default LineChart;
