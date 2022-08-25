import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)<{ color?: string }>`
  cursor: pointer;
  color: ${({ color }) => (color ? color : '')};
  background: tranparent;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 300ms;
  position: relative;
  :hover {
    text-decoration: none;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
  }
`;

const GoBackBtn = ({ to, color }: any) => {
  return (
    <StyledLink to={to} color={color}>
      <i className='fas fa-arrow-left'></i>
    </StyledLink>
  );
};

export default GoBackBtn;
