import React, { FC } from 'react';
import { Spinner } from 'react-bootstrap';
import styled, { useTheme } from 'styled-components';

interface LoaderProps {
  animation?: any;
  size?: any;
  as?: any;
  w?: any;
  h?: any;
  p?: any;
  z?: any;
  top?: any;
  left?: any;
}

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loader: FC<LoaderProps> = ({
  animation,
  size,
  as,
  w,
  h,
  p,
  z,
  top,
  left,
}) => {
  const theme = useTheme() as any;
  return (
    <LoadingContainer>
      <Spinner
        animation={animation ? animation : 'border'}
        role='status'
        style={{
          width: w ? w : '100px',
          height: h ? h : '100px',
          margin: 'auto',
          top: top ? top : '',
          left: left ? left : '',
          zIndex: z ? z : 'auto',
          color: theme.mode === 'day' ? '#22c2b7' : theme.colors.blue05,
        }}
        size={size}
        as={as}
      ></Spinner>
    </LoadingContainer>
  );
};

export default Loader;
