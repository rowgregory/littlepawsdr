import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const slideLeft = () => keyframes`
100% { transform: translateX(-10px); }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  i {
    color: ${({ theme }) => theme.colors.primary};
  }
  :hover {
    text-decoration: none;
    i {
      color: ${({ theme }) => theme.colors.primary};
      animation: ${slideLeft()} 0.9s infinite;
    }
  }
`;

const GoBackBtn = ({ to }: any) => {
  return (
    <StyledLink to={to} className='my-3'>
      <i className='fas fa-arrow-left mr-1'></i>Go Back
    </StyledLink>
  );
};

export default GoBackBtn;
