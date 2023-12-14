import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const ArrowFixedAnim = keyframes`
  5% {
    opacity: 0;
  }
  20% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const ArrowsAnim = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  5% {
    transform: translateX(-0.1rem);
  }
  100% {
    transform: translateX(1rem);
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  right: -5px;

  svg {
    g {
      fill: ${({ theme }) => theme.colors.secondary};
    }
    width: 70px;
    height: auto;
    margin: 0;
    cursor: pointer;
    overflow: visible;
    polygon,
    path {
      transition: all 1.2s cubic-bezier(0.2, 1, 0.3, 1);
    }

    :hover polygon,
    :hover path {
      transition: all 1s cubic-bezier(0.2, 1, 0.3, 1);
      fill: ${({ theme }) => theme.colors.primary};
    }

    :hover .arrow {
      animation: ${ArrowsAnim} 2.5s cubic-bezier(0.2, 1, 0.3, 1) infinite;
    }
    :hover .arrow-fixed {
      animation: ${ArrowFixedAnim} m 2.5s cubic-bezier(0.2, 1, 0.3, 1) infinite;
    }
  }
`;

const AnimatedBackArrow: FC<{ url?: string; setOpenMenu: Function }> = ({
  url,
  setOpenMenu,
}) => {
  const history = useNavigate();
  return (
    <Wrapper
      onClick={() => {
        if (url) {
          history(`${url}`);
        } else {
          setOpenMenu(false);
        }
      }}
    >
      <svg
        width='36px'
        height='17px'
        viewBox='0 0 18 17'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g
          id='prev'
          transform='translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)'
          fill='#a17bfc'
        >
          <polygon
            className='arrow'
            points='16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596'
          ></polygon>
          <polygon
            className='arrow-fixed'
            points='16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596'
          ></polygon>
          <path d='M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z'></path>
        </g>
      </svg>
    </Wrapper>
  );
};

export default AnimatedBackArrow;
