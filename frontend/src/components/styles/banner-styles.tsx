import styled, { keyframes } from 'styled-components';
import { AquaTile } from '../assets';

export const Draw = keyframes`
  from {
    stroke-dashoffset: 400
  }
  to {
    stroke-dashoffset: 0;
  }
`;

export const Wave = styled.svg`
  height: 150px;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 0;
  path {
    stroke-dasharray: 400;
    stroke-linecap: round;
    animation-timing-function: ease-in;
    animation: ${Draw} 6s infinite;
    animation-direction: alternate-reverse;
    opacity: 0.2;
  }
`;

export const QuickOptionContainerDesktop = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    color: #fff;
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    border-top: 1px solid rgb(255, 255, 255, 0.5);
    width: 100%;

    a:nth-child(1) {
      padding: 40px 25px;
      :hover {
        &:before {
          content: '';
          position: absolute;
          background: url(${AquaTile});
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 33.3%;
          opacity: 0.7;
          color: #fff;
          z-index: -1;
        }
      }
    }

    a:nth-child(2) {
      padding: 40px 25px;
      border-left: 1px solid rgb(255, 255, 255, 0.5);
      border-right: 1px solid rgb(255, 255, 255, 0.5);
      :hover {
        &:before {
          content: '';
          position: absolute;
          background: url(${AquaTile});
          top: 0;
          left: 33.3%;
          bottom: 0;
          right: 0;
          width: 33.3%;
          opacity: 0.7;
          color: #fff;
          z-index: -1;
        }
      }
    }
    a:nth-child(3) {
      padding: 40px 25px;
      :hover {
        &:before {
          content: '';
          position: absolute;
          background: url(${AquaTile});
          top: 0;
          left: 66.6%;
          bottom: 0;
          right: 0;
          width: 33.3%;
          opacity: 0.7;
          color: #fff;
          z-index: -1;
        }
      }
    }
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 2rem;
      cursor: pointer;
      text-decoration: none;
      div {
        color: #fff !important;
      }
    }
  }
`;

export const QuickOptionContainerMobile = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  color: #fff;
  width: 100%;
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 2rem;
    cursor: pointer;
    text-decoration: none;
    transition: 300ms;
    border-top: 2px solid rgb(255, 255, 255);
    background: url(${AquaTile});
    height: 125px;
    div {
      color: #fff;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: none;
  }
`;
