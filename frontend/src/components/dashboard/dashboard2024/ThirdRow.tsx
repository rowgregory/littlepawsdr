import styled from 'styled-components';
import OrderFeed from './OrderFeed';
import RevenuePerItemRadialChart from './RevenuePerItemRadialChart';

const GridContainer = styled.section`
  background: #fff;
  width: 100%;
  &.box-1 {
    grid-area: 10 / 1 / 11 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-area: 6 / 1 /8 / 3;
    }
  }
  &.box-2 {
    padding: 12px 18px;
    grid-area: 11 / 1 / 12 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-area: 6 / 3 / 8 / 3;
    }
  }
`;

const ThirdRow = () => {

  return (
    <>
      <GridContainer className='box-1'><OrderFeed /></GridContainer>
      <GridContainer className='box-2'>
        <RevenuePerItemRadialChart />
      </GridContainer>
    </>
  );
};

export default ThirdRow;
