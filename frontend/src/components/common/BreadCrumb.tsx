import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../styles/Styles';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const StyledLink = styled(Link)`
  font-size: 16px;
  margin-right: 4px;
  font-family: Rust;
  color: ${({ theme }) => theme.colors.quinary};
  :hover {
    color: ${({ theme }) => theme.colors.quinary};
  }
`;

const BreadCrumb = ({
  step1,
  step2,
  step3,
  step4,
  step5,
  url1,
  url2,
  url3,
  setProductType,
  productType,
}: any) => {
  return (
    <Container>
      <StyledLink to={url1}>{step1}</StyledLink>
      <i className='fas fa-chevron-right fa-xs mr-1'></i>
      <StyledLink to={url2}>{step2}</StyledLink>
      {step3 && <i className='fas fa-chevron-right fa-xs mr-1'></i>}
      {url3 ? (
        <StyledLink
          onClick={() => productType && setProductType('Orders')}
          to={url3}
        >
          {step3}
        </StyledLink>
      ) : (
        <Text
          fontWeight={400}
          color='#9761aa'
          fontSize='16px'
          marginRight='4px' fontFamily='Rust'
        >
          {step3}
        </Text>
      )}
      {step4 !== '' && productType !== 'Orders' && (
        <i className='fas fa-chevron-right fa-xs mr-1'></i>
      )}
      {productType !== 'Orders' && (
        <Text
          fontWeight={400}
          color='#9761aa'
          fontSize='16px'
          marginRight='4px'
          fontFamily='Rust'
        >
          {step4}
        </Text>
      )}
      {step5 && <i className='fas fa-chevron-right fa-xs mr-1'></i>}
      <Text fontSize='13px'>{step5}</Text>
    </Container>
  );
};

export default BreadCrumb;
