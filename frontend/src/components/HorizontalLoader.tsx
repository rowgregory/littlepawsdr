import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

const securityLoader = keyframes`
  0% {
    left: -25%;
  }
  49% {
    left: 100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: -25%;
  }
`;

const popupLoader = keyframes`
  0% {
    left: 8%;
    background: #fff;
  }
  49% {
    left: 100%;
    
  }
  50% {
    left: 100%;
  }
  100% {
    left: 8%;
    background: #fff;
  }
`;

const Loader = styled.div<{ path: string }>`
  height: 3px;
  width: 25%;
  .bar {
    width: 25%;
    position: absolute;
    height: 3px;

    background-color: ${({ theme }) => theme.colors.primary};
    animation-name: ${({ path }) =>
      path === '/'
        ? css`
            ${popupLoader}
          `
        : css`
            ${securityLoader}
          `};
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
`;

const HorizontalLoader = () => {
  const { pathname } = useLocation();
  return (
    <div
      style={{
        position: pathname === '/settings/security' ? 'relative' : 'static',
        overflow: 'hidden',
      }}
    >
      <Loader className='loader' path={pathname}>
        <div className='bar'></div>
      </Loader>
    </div>
  );
};

export default HorizontalLoader;
