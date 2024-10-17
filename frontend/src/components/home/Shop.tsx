import styled from 'styled-components';
import MaskBtn from './MaskBtn';

const Container = styled.div`
  width: 100%;
  background: #2c2a3b;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 5.3125rem 1rem;
`;

const ContentContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const CheckOutText = styled.div`
  font-size: 2rem;
  color: #d89253;
  letter-spacing: -1.5px;
  margin-bottom: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-bottom: 0;
  }
`;

const Shop = () => {
  return (
    <Container>
      <ContentContainer>
        <CheckOutText>Check out our latest merchandise</CheckOutText>
        <MaskBtn linkKey='/store' textKey='STORE' />
      </ContentContainer>
    </Container>
  );
};

export default Shop;
