import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Flex, Text } from '../../styles/Styles';
import formatCurrency from '../../../utils/formatCurrency';
import { useSelector } from 'react-redux';
import JumpingRumpLoader from '../../Loaders/JumpingRopLoader';
import { RootState } from '../../../redux/toolkitStore';

const Wallet = () => {
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const dashboardDetails = dashboard?.currentYearData;
  const loading = dashboard?.loading;

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: 'area',
        height: '100%',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#fc5b82', '#fd7e61', '#fd9c45', '#fed710'],
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: ['#fc5b82'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          colorStops: [
            [
              {
                offset: 30,
                color: '#fc5b82',
                opacity: 1,
              },
              {
                offset: 60,
                color: '#fdb594',
                opacity: 1,
              },
              {
                offset: 100,
                color: '#fff9e5',
                opacity: 1,
              },
            ],
          ],
        },
      },
      stroke: {
        curve: 'straight',
        lineCap: 'butt',
        colors: ['#f9f4af'],
        width: [4, 4],
      },
      xaxis: {
        categories: [''],
        labels: {
          formatter: (value: any) => {
            return '';
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: false,
        style: {
          fontSize: '16px',
          fontFamily: 'Rust',
        },
      },
    },
    series: [
      {
        name: 'Series 1',
        data: [0],
      },
    ],
  }) as any;

  useEffect(() => {
    setChartData((prev: any) => ({
      ...prev,
      series: dashboardDetails?.lineChart?.totalCurrentMonthlySales ?? [{ name: '', data: [] }],
    }));
  }, [dashboardDetails?.lineChart]);

  return (
    <>
      <Text fontFamily='Rust' fontSize='17px'>
        Income Snapshot
      </Text>
      <Text fontFamily='Rust' fontSize='12px' color='gray'>
        Quick glance at your earnings
      </Text>
      {loading ? (
        <Flex height='200px' alignItems='center'>
          <JumpingRumpLoader color='#fda591' />
        </Flex>
      ) : (
        <>
          <Text
            fontSize='54px'
            color='#fc5b82'
            textAlign='center'
            fontFamily='Rust'
            marginTop='17px'
            lineHeight='1'
          >
            {formatCurrency(Number(dashboardDetails?.revenue?.currentYear ?? 0))}
          </Text>
          <Text fontFamily='Rust' textAlign='center' fontSize='12px' color='gray'>
            Year To Date
          </Text>
          <Flex justifyContent='center' marginTop='-40px' position='relative'>
            <Chart options={chartData.options} series={chartData.series} type='area' width='100%' />
          </Flex>
        </>
      )}
    </>
  );
};

export default Wallet;
