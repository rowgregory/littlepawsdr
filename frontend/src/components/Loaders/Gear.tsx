import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const Gear = styled.i<{ color: string }>`
  color: ${({ color }) => (color ? color : '')};
  animation: ${rotate} 5s linear infinite;

`;

const GearLoader = ({ color, size }: { color: string; size: string }) => {
  return (
    <Gear color={color} className={`fas fa-gear ${size}`}></Gear>
  )
}

export default GearLoader