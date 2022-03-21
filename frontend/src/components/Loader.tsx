import React, { FC } from 'react';
import { Spinner } from 'react-bootstrap';
import { useTheme } from 'styled-components';

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
  );
};

export default Loader;
