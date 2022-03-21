import React from 'react';
import styled, { keyframes } from 'styled-components';

const stroke = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const scale = keyframes`
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
`;
const fill = () => {
  return keyframes`
  to {
    box-shadow:inset 0px 0px 0px 30px green;
  }
`;
};

const CheckmarkSVG = styled.svg`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: block;
  stroke-width: 4;
  stroke: #fff;
  stroke-miterlimit: 10;
  animation: ${fill} 0.4s ease-in-out 0.4s forwards,
    ${scale} 0.3s ease-in-out 0.9s both;
  circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #7ac142;
    fill: none;
    animation: ${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  path {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }
`;

const Checkmark = () => {
  return (
    <CheckmarkSVG
      className='checkmark'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 52 52'
    >
      <circle
        className='checkmark__circle'
        cx='26'
        cy='26'
        r='25'
        fill='none'
      />
      <path
        className='checkmark__check'
        fill='none'
        d='M14.1 27.2l7.1 7.2 16.7-16.8'
      />
    </CheckmarkSVG>
  );
};

export default Checkmark;
