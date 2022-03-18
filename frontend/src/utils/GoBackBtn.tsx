import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.text};
`;

const GoBackBtn = ({ to }: any) => {
  return (
    <StyledLink to={to} className='btn btn-tranparent my-3'>
      <i className='fas fa-arrow-left mr-1'></i>Go Back
    </StyledLink>
  );
};

export default GoBackBtn;
