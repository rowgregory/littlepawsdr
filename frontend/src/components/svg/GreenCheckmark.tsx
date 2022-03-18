import React from 'react';

const GreenCheckmark = ({ width }: { width?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 512 512'
      enableBackground='new 0 0 512 512'
      width={width ? width : '30px'}
    >
      <polygon
        fill='#77b300'
        points='202.624,478.016 0,291.36 70.512,214.8 191.968,326.656 431.44,33.984 512,99.904 '
      />
    </svg>
  );
};

export default GreenCheckmark;
