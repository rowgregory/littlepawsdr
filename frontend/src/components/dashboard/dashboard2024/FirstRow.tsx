import styled from 'styled-components';
import SalesOverviewGraph from './SalesOverviewGraph';
import Clock from './Clock';
import TotalDogs from './TotalDogs';

const GridItem = styled.div`
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;

  &.box-1 {
    grid-area: 4 / 1 / 5 / 1;
    overflow: hidden;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 2 / 1 / 4 / 3;
    }
  }

  &.box-2 {
    grid-area: 5 / 1 / 6 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 2 / 3 / 2 / 3;
    }
  }

  &.box-3 {
    background: rgb(167, 216, 47);
    background: linear-gradient(129deg, rgba(167, 216, 47, 1) 66%, rgba(237, 216, 48, 1) 100%);
    justify-content: start;
    align-items: start;
    grid-area: 6 / 1 / 7 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 3 / 3 / 4 / 4;
    }
  }
`;

const FirstRow = () => {
  return (
    <>
      <GridItem className='box-1'>
        <SalesOverviewGraph />
      </GridItem>
      <GridItem className='box-2'>
        <Clock />
      </GridItem>
      <GridItem className='box-3'>
        <TotalDogs />
      </GridItem>
    </>
  );
};

export default FirstRow;
