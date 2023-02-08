import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { Text } from './styles/Styles';

const Hero = ({ low, high, title, link, photographer }: any) => {
  const [showImageLoader, setShowImageLoader] = useState(true);

  return (
    <div style={{ position: 'relative' }}>
      <Image
        onLoad={() => setShowImageLoader(false)}
        src={showImageLoader ? low : high}
        width='100%'
        style={{ height: '575px', objectFit: 'cover' }}
      />
      <Text
        fontWeight={500}
        fontSize='48px'
        color='#fff'
        style={{
          position: 'absolute',
          top: '200px',
          left: '50px',
          zIndex: 2,
          mixBlendMode: 'difference',
        }}
      >
        {title}
      </Text>
      {title === 'Ecards' && (
        <Text
          fontSize='22px'
          color='#fff'
          fontWeight={600}
          style={{
            position: 'absolute',
            zIndex: 2,
            maxWidth: '250px',
            width: 'fit-content',
            mixBlendMode: 'difference',
            top: '255px',
            left: '50px',
          }}
          maxWidth='400px'
        >
          Offers an effortless way to stay in touch!
        </Text>
      )}
      <Text
        onClick={() => window.open(link, '_blank')}
        fontWeight={500}
        fontSize='10px'
        color='#fff'
        cursor='pointer'
        style={{
          mixBlendMode: 'difference',
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          zIndex: 2,
        }}
      >
        Photo by {photographer}
      </Text>
    </div>
  );
};

export default Hero;
