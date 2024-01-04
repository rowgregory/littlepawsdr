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
  Legend,
  ArcElement,
  Filler
);

const PieChart = ({ details, loading }: any) => {
  const ordersTotal =
    details?.productOrdersItemsTotal +
    details?.ecardOrdersItemsTotal +
    details?.welcomeWienerOrdersItemsTotal;

  const data = {
    labels: ['Products', 'Ecards', 'Welcome Wieners'],
    datasets: [
      {
        data: [
          details?.productOrdersItemsTotal,
          details?.ecardOrdersItemsTotal,
          details?.welcomeWienerOrdersItemsTotal,
        ],
        backgroundColor: ['#9761aa', '#22c2b7', '#8BBF9F'],
        borderColor: ['#9761aa', '#22c2b7', '#8BBF9F'],
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

  const noData = ordersTotal === 0;
  return (
    <TotalSalesContainer>
      <Text
        color='#373737'
        fontWeight={500}
        fontSize='17px'
        marginBottom={noData ? '24px' : ''}
      >
        Total Sales
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
            <Doughnut data={data} options={options} />
          </LineChartContainer>
        )
      )}
    </TotalSalesContainer>
  );
};

export default PieChart;
