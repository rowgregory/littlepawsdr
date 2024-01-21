import styled from 'styled-components';
import AdoptionApplicationBypassCode from './AdoptionApplicationBypassCode';
import AdoptionApplicationFeeRevenue from './AdoptionApplicationFeeRevenue';
import SearchBar from './SearchBar';

const GridItem = styled.div`
  background: #fff;

  &.box-1 {
    grid-area: 1 / 1 / 2 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 1 / 1 / 1 / 1;
    }
  }
  &.box-2 {
    grid-area: 2 / 1 / 3 / 1;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 1 / 2 / 2 / 2;
    }
  }
  &.box-3 {
    grid-area: 3 / 1 / 4 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 1 / 3 / 1 / 3;
    }
  }
`;

const ZeroRow = () => {
  return (
    <>
      <GridItem className='box-1'>
        <AdoptionApplicationFeeRevenue />
      </GridItem>
      <GridItem className='box-2'>
        <AdoptionApplicationBypassCode />
      </GridItem>
      <GridItem className='box-3'>
        <SearchBar />
      </GridItem>
    </>
  );
};

export default ZeroRow;
