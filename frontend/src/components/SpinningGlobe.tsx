import React from 'react';
import styled, { keyframes } from 'styled-components';

const movimiento = keyframes`
  0% { background-position:0 0 }
  100% { background-position:355px 0 }
`;

const Globe = styled.div`
  background: url(https://i.imgur.com/bYSnuNE.jpg?1);
  background-size: cover;
  border: 2px solid #000;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  animation: ${movimiento} 5s linear 0s infinite;
  box-shadow: 0 0 25px RGBA(255, 255, 255, 0.1), -8px -8px 15px #000 inset,
    2px 2px 25px #000 inset, -45px -45px 25px RGBA(0, 0, 0, 0.5) inset,
    25px 25px 45px RGBA(0, 0, 0, 0.45) inset;
  margin: 6em auto;
  transform: rotateX(6deg) rotateY(6deg) rotateZ(6deg);
`;

const SpinningGlobe = () => {
  return <Globe></Globe>;
};

export default SpinningGlobe;
