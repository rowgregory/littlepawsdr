import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Flex, Text } from '../../styles/Styles';
import { useSelector } from 'react-redux';
import JumpingRumpLoader from '../../Loaders/JumpingRopLoader';
import { RootState } from '../../../redux/toolkitStore';

const SalesComparisonRadialGraph = () => {
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const salesComparison = dashboard?.currentYearData?.salesComparison;
  const percentageChange = salesComparison?.percentageChange;
  const loading = dashboard?.loading;

  const [chartData, setChartData] = useState({
    series: [Number(percentageChange)],
    options: {
      aspectRatio: 1,
      chart: {
        type: 'radialBar',
        height: '100%',
        offsetY: 35,
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#ebc4ff'],
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            margin: 0,
            size: '62%',
            background: 'transparent',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
          },
          track: {
            background: '#e7e7e7',
            strokeWidth: '100%',
            margin: 5, // margin is in pixels
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: '0px',
            },
          },
        },
      },
      grid: {
        show: false,
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
        active: {
          filter: {
            type: 'none',
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ebc3ff'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
          colorStops: [
            [
              {
                offset: 0,
                color: '#aaf4ff',
                opacity: 50,
              },
              {
                offset: 100,
                color: '#ebc3ff',
                opacity: 1,
              },
            ],
          ],
        },
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
      labels: [''],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  }) as any;

  useEffect(() => {
    setChartData((prev: any) => ({ ...prev, series: [Number(percentageChange)] }));
  }, [percentageChange]);

  return (
    <>
      <Text fontFamily='Rust' fontSize='17px'>
        Sales Comparison
      </Text>
      <Text fontFamily='Rust' fontSize='12px' color='gray'>
        Annual Month Sales Comparison
      </Text>
      {loading ? (
        <Flex height='200px' alignItems='center'>
          <JumpingRumpLoader color='#cbdaff' />
        </Flex>
      ) : (
        <>
          <Flex justifyContent='center' position='relative'>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type='radialBar'
              width='100%'
              height={300}
            />
          </Flex>
          <Text textAlign='center' marginTop='-40px' fontFamily='Rust' fontSize='36px' color='#fc5b82'>
            {percentageChange ?? 0}%
          </Text>
          <Text textAlign='center' marginTop='-10px' fontFamily='Rust' fontSize='12px' color='gray'>
            This Month vs. Last Year
          </Text>
          <Text textAlign='center' marginTop='0px' fontFamily='Rust' fontSize='12px' color='gray'>
            {salesComparison?.currentYearTotal ?? 0} / {salesComparison?.previousYearTotal ?? 0}
          </Text>
        </>
      )}
    </>
  );
};

export default SalesComparisonRadialGraph;
