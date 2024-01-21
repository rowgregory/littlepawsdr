import styled from 'styled-components';
import Wallet from './Wallet';
import SalesComparisonRadialGraph from './SalesComparisonRadialGraph';
import ProductTracker from './ProductTracker';

const GridContainer = styled.section`
  background: #fff;
  padding: 12px 18px;
  &.box-1 {
    grid-area: 7 / 1 / 8 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-area: 4 / 1 / 6 / 2;
    }
  }
  &.box-2 {
    grid-area: 8 / 1 / 9 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-area: 4 / 2 / 6 / 2;
    }
  }
  &.box-3 {
    grid-area: 9 / 1 / 10 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-area: 4 / 3 / 6 / 3;
    }
  }
`;

const SecondRow = () => {
  return (
    <>
      <GridContainer className='box-1'>
        <Wallet />
      </GridContainer>
      <GridContainer className='box-2'>
        <SalesComparisonRadialGraph />
      </GridContainer>
      <GridContainer className='box-3'>
        <ProductTracker />
      </GridContainer>
    </>
  );
};

export default SecondRow;
