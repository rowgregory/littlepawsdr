import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Flex, Text } from '../../styles/Styles';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import JumpingRumpLoader from '../../Loaders/JumpingRopLoader';
import { RootState } from '../../../redux/toolkitStore';

const Breakdown = styled.div`
  border: none;
  background: linear-gradient(90deg, rgba(156, 254, 253, 1) 0%, rgba(207, 253, 251, 1) 100%);
  font-family: Rust;
  color: #504f4a;
  font-size: 20px;
  padding: 10px 40px;
  margin-top: 32px;
  position: relative;
  display: flex;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    right: 0;
    top: 0;
    clip-path: polygon(100% 100%, 0% 100%, 100% 0%);
    background-image: linear-gradient(129deg, rgba(193, 224, 255, 1) 35%, rgba(224, 205, 245, 1) 100%);
  }
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const RevenuePerItemRadialChart = () => {
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const welcomeWienerStats = dashboard.currentYearData?.welcomeWienerStats;
  const welcomeWienerRevenue = dashboard.currentYearData?.revenue?.welcomeWienerRevenue;
  const loading = dashboard.loading;
  const totalRevenue = welcomeWienerStats?.welcomeWienerRevenue;
  const colors = ['#fc5b82', '#fd7e61', '#fd9c45', '#fed710'];


  const [chartData, setChartData] = useState({
    series: welcomeWienerStats?.percentageArray ?? [''],
    optionsRadial: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      colors,
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '18px',
              fontFamily: 'Rust',
              offsetY: -6,
            },
            value: {
              fontSize: '36px',
              fontFamily: 'Rust',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w: any) {
                return totalRevenue ?? 0;
              },
            },
          },
        },
      },
      labels: welcomeWienerStats?.nameArray ?? [''],
      legend: {
        show: false,
      },
    },
  }) as any;

  useEffect(() => {
    setChartData((prev: any) => ({
      ...prev,
      series: welcomeWienerStats?.percentageArray ?? [0],
      optionsRadial: {
        labels: welcomeWienerStats?.nameArray ?? [''],
        colors: ['#fc5b82', '#fd7e61', '#fd9c45', '#fed710'],
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '18px',
                fontFamily: 'Rust',
                offsetY: -6,
              },
              value: {
                fontSize: '36px',
                fontFamily: 'Rust',
              },
              total: {
                fontFamily: 'Rust',
                show: true,
                label: 'Total',
                formatter: () => {
                  return `$${totalRevenue ?? 0}`;
                },
              },
            },
          },
        },
      },
    }));
  }, [totalRevenue, welcomeWienerStats]);


  return (
    <>
      <Text fontFamily='Rust' fontSize='17px'>
        WW Breakdown
      </Text>
      <Text fontFamily='Rust' fontSize='12px' color='gray'>
        Top 4 WW by earnings
      </Text>
      {loading ? (
        <Flex height='100%' alignItems='center'>
          <JumpingRumpLoader color='#fd7e61' />

        </Flex>
      ) : (
        <>
          <div className='py-4 w-100 d-flex flex-column align-items-center'>
            {welcomeWienerStats?.totalRevenueArray?.map((obj: any, i: number) => (
              <Flex key={i} alignItems='center' width='50%'>
                <Text style={{ background: colors[i] }} height='10px' width='10px' marginRight='10px'></Text>
                <Text fontFamily='Rust' fontSize='16px'>{obj.name}: </Text>
                <Text marginLeft='6px' fontFamily='Rust' fontSize='20px'>${obj.revenue}</Text>
              </Flex>
            ))}
          </div>
          <ChartContainer>
            <Chart
              options={chartData?.optionsRadial}
              series={chartData?.series}
              type='radialBar'
              width='100%'
              height={300}
            />
            <Breakdown>Revenue: ${welcomeWienerRevenue}</Breakdown>
          </ChartContainer>
        </>
      )}
    </>
  );
};

export default RevenuePerItemRadialChart;
