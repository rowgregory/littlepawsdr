import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../styles/Styles';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
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
}: any) => {
  return (
    <Container>
      <StyledLink to={url1} className='mr-1'>
        {step1}
      </StyledLink>
      <i className='fas fa-chevron-right fa-sm mr-1'></i>
      <StyledLink to={url2} className='mr-1'>
        {step2}
      </StyledLink>
      <i className='fas fa-chevron-right fa-sm mr-1'></i>
      <StyledLink to={url3} className='mr-1'>
        {step3}
      </StyledLink>
      {step3 && <i className='fas fa-chevron-right fa-sm mr-1'></i>}
      <Text className='mr-1'>{step4}</Text>
      {step3 && <i className='fas fa-chevron-right fa-sm mr-1'></i>}
      <Text>{step5}</Text>
    </Container>
  );
};

export default BreadCrumb;
