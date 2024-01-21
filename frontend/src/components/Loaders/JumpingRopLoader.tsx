import styled, { keyframes } from 'styled-components';

const animLoader = keyframes`
0% {
  box-shadow: -38px -6px, -14px 6px,  14px -6px;
}
33% {
  box-shadow: -38px 6px, -14px -6px,  14px 6px;
}
66% {
  box-shadow: -38px -6px, -14px 6px, 14px -6px;
}
100% {
  box-shadow: -38px 6px, -14px -6px, 14px 6px;
}
`;

const LoaderContainer = styled.div<{ color?: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  margin: 30px auto;
  position: relative;
  color: ${({ color }) => color};
  box-sizing: border-box;
  animation: ${animLoader} 1s linear infinite alternate;
`;

const JumpingRumpLoader = ({ color }: { color: string }) => {
  return <LoaderContainer color={color} />;
};

export default JumpingRumpLoader;