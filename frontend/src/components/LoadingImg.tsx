import { FC } from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingImmProps {
  h?: any;
  w?: any;
  mw?: any;
  borderRadius?: any;
  mr?: any;
  ar?: any;
  maxw?: any;
  mt?: string;
}

const Shimmer = keyframes`
  0% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const LoadingContainer = styled.div<{
  h?: string;
  w?: string;
  mw?: string;
  borderRadius?: string;
  mr?: string;
  ar?: string;
  maxw?: string;
  mt?: string;
}>`
  height: ${({ h }) => h};
  width: ${({ w }) => w};
  min-width: ${({ mw }) => (mw ? mw : '')};
  max-width: ${({ maxw }) => (maxw ? maxw : '')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '')};
  border: none;
  position: relative;
  animation: ${Shimmer} 1500ms infinite;
  background-size: 400%;
  background-image: ${({ theme }) => `linear-gradient(
    90deg,
    ${theme.loading.one} 0%,
    ${theme.loading.one} 40%,
    ${theme.loading.two} 50%,
    ${theme.loading.two} 55%,
    ${theme.loading.one} 65%,
    ${theme.loading.one} 100%
  );`};
  aspect-ratio: ${({ ar }) => (ar ? ar : '1/1')};
  margin-right: ${({ mr }) => (mr ? mr : '')};
  margin-top: ${({ mt }) => (mt ? mt : '')};
`;

export const LoadingImg: FC<LoadingImmProps> = ({
  h,
  w,
  mw,
  borderRadius,
  mr,
  ar,
  maxw,
  mt,
}) => {
  return (
    <LoadingContainer
      h={h}
      w={w}
      mw={mw}
      mr={mr}
      ar={ar}
      borderRadius={borderRadius}
      maxw={maxw}
      mt={mt}
    />
  );
};
