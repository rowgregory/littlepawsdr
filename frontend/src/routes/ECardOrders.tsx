import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Text } from '../components/styles/Styles';

const MyOrdersContainer = styled(Col)`
  margin: 3rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 2rem 4rem;
  }
`;

const MyECards = () => {
  return (
    <MyOrdersContainer>
      <Text
        fontFamily={`Ubuntu, sans-serif`}
        fontSize='1.875rem'
        marginBottom='2rem'
      >
        Coming Soon!
      </Text>
    </MyOrdersContainer>
  );
};

export default MyECards;
