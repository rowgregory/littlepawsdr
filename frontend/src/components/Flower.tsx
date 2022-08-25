import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const grow = keyframes`
	25%{height: 0;}
	34%{height: 22px;}
	39%{height: 22px;}
	41%{height: 27px;}
	45%{height: 27px;}
	52%{height: 92px;}
	55%{height: 94px;}
	100%{height: 120px;}
`;

const grow_reverse = keyframes`
	25%{height: 120px;}
	34%{height: 94px;}
	39%{height: 92px;}
	41%{height: 27px;}
	45%{height: 27px;}
	52%{height: 22px;}
	55%{height: 22px;}
	100%{height: 0px;}
`;
const leaf1 = keyframes`
	0%{transform: scaleY(0) rotate(-180deg);}
	38%{transform: scaleY(0) rotate(-110deg);}
	50%{transform: scaleY(1) rotate(-110deg);}
`;
const leaf2 = keyframes`
	0%{transform: scaleY(0) rotate(110deg);}
	45%{transform: scaleY(0) rotate(110deg);}
	52%{transform: scaleY(1) rotate(110deg);}
`;
const flower1 = keyframes`
	72%{opacity: 0;}
	74%{opacity: 0.25;}
	78%{opacity: 0.4;}
	82%{opacity: 0.5;}
	86%{opacity: 0.6;}
	90%{opacity: 0.7;}
	94%{opacity: 0.8;}
	98%{opacity: 0.9;}
	100%{opacity: 1;}
`;

const Container = styled.div`
  position: absolute;
  right: 239px;
`;

const FlowerWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 50px;
  transform: rotate(180deg);
`;
const Stem = styled.div<{ show: any; reverse: any }>`
  position: absolute;
  right: 25px;
  width: 5px;
  height: 0px;
  background: linear-gradient(-90deg, #0d0, #0a0);
  animation: ${({ show, reverse }) =>
      show
        ? css`
            ${grow}
          `
        : reverse
        ? css`
            ${grow_reverse}
          `
        : ''}
    2s linear forwards;
`;

const Leaf = styled.div<{ show: any }>`
  position: absolute;
  width: 25px;
  top: -28px;
  left: 14px;
  height: 38px;
  border-radius: 1% 100%;
  background: linear-gradient(70deg, #0e0, #0a0);
  transform-origin: bottom;
  transform: rotate(-110deg);
  animation: ${leaf1} 3s linear;
  &:before {
    position: absolute;
    content: '';
    top: 18px;
    left: -33px;
    width: 30px;
    height: 45px;
    border-radius: 1% 100%;
    background: linear-gradient(70deg, #0e0, #0a0);
    transform: rotate(110deg);
    animation: ${leaf2} 3s linear;
  }
`;

const Dot = styled.div<{ show: any }>`
  position: absolute;
  top: 123px;
  left: 3px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #b2b2e9;
  box-shadow: 0 0 0 4px #8a8ad5, 0 0 8px 4px #444, inset 0 0 8px #8a8ad5;
  opacity: 0;
  animation: ${flower1} 3s linear forwards;
`;

const Flower = ({ show, reverse }: any) => {
  return (
    <Container>
      <FlowerWrapper>
        <Stem show={show} reverse={reverse} />
        <Leaf show={show} />
        <Dot show={show} />
      </FlowerWrapper>
    </Container>
  );
};

export default Flower;
