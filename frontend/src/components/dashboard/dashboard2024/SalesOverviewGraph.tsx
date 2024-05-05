import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Flex, Text } from '../../styles/Styles';
import { useSelector } from 'react-redux';
import JumpingRumpLoader from '../../Loaders/JumpingRopLoader';

const SalesOverviewGraph = () => {
  const dashboard = useSelector((state: any) => state.dashboard);
  const lineChart = dashboard.currentYearData?.lineChart;
  const loading = dashboard.loading;

  const [options, setOptions] = useState({
    options: {
      chart: {
        type: 'area',
        height: 250,
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        fontSize: '14px',
        fontFamily: 'Rust'
      },
      colors: ['#aaf4ff', '#ebc3ff', '#a7d82f', '#fa7092'],
      xaxis: {
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Rust',
          },
        },
        tooltip: {
          enabled: false
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Rust',
          },
        }
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: false,
        theme: true,
        style: {
          fontSize: '16px',
          fontFamily: 'Rust',
        },
      },
    },
    series: [
      {
        name: '',
        data: [],
      },
    ],
  }) as any;

  useEffect(() => {
    setOptions((prev: any) => ({ ...prev, series: lineChart?.series ?? [{ name: '', data: [] }] }));
  }, [lineChart]);

  return (
    <div className='w-100'>
      <Text fontFamily='Rust' fontSize='17px'>
        Sales Overview
      </Text>
      {loading ? (
        <Flex height='200px' alignItems='center'>
          <JumpingRumpLoader color='#ebc3ff' />

        </Flex>
      ) : (
        <Chart options={options.options} series={options?.series} type='area' width='100%' height={250} />
      )}
    </div>
  );
};

export default SalesOverviewGraph;
