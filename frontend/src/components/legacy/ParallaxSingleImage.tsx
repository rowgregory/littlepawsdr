import React from 'react';
import styled from 'styled-components';
import { Parallax } from 'react-parallax';

const StyledParallax = styled(Parallax)`
  img {
    bottom: -210px;
  }
`;

const ParallaxSingleImage = () => {
  const panel = {
    one: 'https://res.cloudinary.com/doyd0ewgk/image/upload/v1643692143/dog-gabd78b127_1920.jpg',
  };

  return (
    <StyledParallax bgImage={panel.one} strength={500} className='first-img'>
      <div style={{ height: 500 }}>
        <div
          style={{
            backdropFilter: 'blur(15px)',
            padding: 20,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          Chaning Lives Four Paws At A Time
        </div>
      </div>
    </StyledParallax>
  );
};

export default ParallaxSingleImage;
