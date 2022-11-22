import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../styles/Styles';

const StyledArrow = styled(Link)`
  cursor: pointer;
  display: flex;
  :hover {
    text-decoration: none;
    svg {
      path {
        fill: ${({ theme }) => theme.colors.quinary} !important;
      }
    }
  }
`;

const RightArrow = ({ text, url }: any) => {
  return (
    <StyledArrow to={url}>
      <Text marginRight='10px'>{text}</Text>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        viewBox='0 0 476.213 476.213'
        className='d-flex'
        width='20px'
        height='20px'
      >
        <polygon
          fill='#7f8282'
          points='476.213,238.105 400,161.893 400,223.106 0,223.106 0,253.106 400,253.106 400,314.32 '
        />
      </svg>
    </StyledArrow>
  );
};

export default RightArrow;
