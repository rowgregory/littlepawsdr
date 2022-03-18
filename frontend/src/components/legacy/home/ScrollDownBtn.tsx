import React, { FC } from 'react';

const DownArrow = () => {
  return (
    <svg
      style={{
        bottom: '0',
        right: '18% ',
        height: '100px',
        width: '50px',
      }}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 25 25'
      width='30px'
      height='60px'
    >
      <path
        style={{ fill: '#544e42' }}
        d='m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z'
      />
    </svg>
  );
};

interface ScrollDownBtnProps {
  scrollRef: any;
  arrowRef: any;
  position: any;
}

const ScrollDownBtn: FC<ScrollDownBtnProps> = ({
  scrollRef,
  arrowRef,
  position,
}) => {
  const handleScroll = () => {
    // gsap.to(window, {
    //   duration: 0,
    //   scrollTo: position,
    //   ease: 'power3',
    // });
  };
  return (
    <div
      style={{
        color: '#544e42',
        fontSize: '1.5rem',
        cursor: 'pointer',
        position: 'absolute',
        bottom: '0px',
        display: 'flex',
        width: '200px',
        height: '100px',
      }}
      onClick={() => handleScroll()}
      ref={scrollRef}
      // ref={scroll}
    >
      <div style={{ transform: 'rotate(90deg)' }}>Scroll</div>
      <div
        ref={arrowRef}
        // ref={arrow}
        style={{
          position: 'absolute',
          left: '70px',
          bottom: '20px',
        }}
      >
        <DownArrow />
      </div>
    </div>
  );
};

export default ScrollDownBtn;
