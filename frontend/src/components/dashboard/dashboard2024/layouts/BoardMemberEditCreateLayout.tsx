import styled from 'styled-components';
import { Text } from '../../../styles/Styles';

const Container = styled.div`
  width: 100%;
  background: #e8e8e5;
  min-height: 100vh;
  padding: 0px 24px 24px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 62px 62px 62px 100px 100px 100px 100px 100px 100px 375px 100px ;
  gap: 18px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 62px 100px 100px 100px 100px 100px 100px 375px 100px;
  }
`;

const GridItem = styled.div<{ error: string }>`
  background: #fff;
  height: 100%;
  padding: 6px 12px;
  display: flex;

  &.box-1 {
    align-items: center;
    grid-area: 1 / 1 / 1 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 1 / 1 / 1 / 1;
    }
  }
  &.box-2 {
    align-items: center;
    grid-area: 2 / 1 / 3 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 1 / 2 / 2 / 2;
    }
  }
  &.box-3 {
    background: ${({ error }) =>
    error
      ? 'linear-gradient(132deg, rgba(255, 165, 0, 1) 0%, rgba(255, 87, 34, 1) 100%)'
      : 'linear-gradient(129deg, rgba(167, 216, 47, 1) 66%, rgba(237, 216, 48, 1) 100%)'};
    grid-area: 3 / 1 / 4 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 1 / 3 / 1 / 3;
    }
  }
  &.box-4 {
    justify-content: center;
    grid-area: 4 / 1 / 6 / 1;
    width: 100%;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 2 / 1 / 4 / 3;
    }
  }
  &.box-5 {
    align-items: center;
    justify-content: center;
    grid-area: 6 / 1 / 7 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 4 / 1 / 5 / 2;
    }
  }
  &.box-6 {
    align-items: center;
    justify-content: center;
    grid-area: 7 / 1 / 8 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 4 / 2 / 5 / 3;
    }
  }
  &.box-7 {
    align-items: center;
    grid-area: 8 / 1 / 9 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 5 / 1 / 6 / 2;
    }
  }
  &.box-8 {
    align-items: center;
    grid-area: 9 / 1 / 10 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 5 / 2 / 6 / 3;
    }
  }
  &.box-9 {
    align-items: center;
    grid-area: 10 / 1 / 11 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 6 / 1 / 8 / 3;
    }
  }
  &.box-10 {
    align-items: center;
    overflow-y: scroll;
    grid-area: 10 / 1 / 11 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 8 / 1 / 9 / 3;
    }
  }
  &.box-11 {
    align-items: center;
    grid-area: 11 / 1 / 12 / 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      grid-area: 9 / 1 / 10 / 2;
    }
  }
`;

const BoardMemberEditCreateLayout = ({ box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, error }: any) => {
  return (
    <Container>
      <GridItem error={error} className='box-1'>
        <Text fontFamily='Rust' fontSize='24px' textAlign='center' width='100%' color='#fc5b82'>
          {box1}
        </Text>
      </GridItem>
      <GridItem error={error} className='box-2'>
        {box2}
      </GridItem>
      <GridItem error={error} className='box-3'>
        {box3}
      </GridItem>
      <GridItem error={error} className='box-4'>
        {box4}
      </GridItem>
      <GridItem error={error} className='box-5'>
        {box5}
      </GridItem>
      <GridItem error={error} className='box-6'>
        {box6}
      </GridItem>
      <GridItem error={error} className='box-7'>
        {box7}
      </GridItem>
      <GridItem error={error} className='box-8'>
        {box8}
      </GridItem>
      <GridItem error={error} className='box-9'>
        {box9}
      </GridItem>
      <GridItem error={error} className='box-10'>
        {box10}
      </GridItem>
      <GridItem error={error} className='box-11'>
        {box11}
      </GridItem>
    </Container>
  )
}

export default BoardMemberEditCreateLayout