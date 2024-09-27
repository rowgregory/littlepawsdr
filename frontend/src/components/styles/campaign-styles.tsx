import styled, { keyframes } from 'styled-components';

const progressBar = (width: number, prevWidth: number) => keyframes`
0% { width: ${prevWidth}%; }
100% { width: ${width}% }
`;

const Bar = styled.div<{ width: number; prevWidth: number }>`
  height: 100%;
  width: ${({ width }) => `${width}%`};
  position: relative;
  animation: ${({ width, prevWidth }) => progressBar(width, prevWidth)} 300ms ease-out;
  -webkit-transition: width 300ms ease-out;
  -moz-transition: width 300ms ease-out;
  -o-transition: width 300ms ease-out;
  transition: width 300ms ease-out;
  &:after {
    -webkit-transition: width 300ms ease-out;
    -moz-transition: width 300ms ease-out;
    -o-transition: width 300ms ease-out;
    transition: width 300ms ease-out;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export { Bar };
