import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import GradientText from './GradientText';
import { Text } from './styles/Styles';

const HeroImg = styled(Image)`
  object-fit: cover;
  width: 100%;
  margin-top: 75px;
  height: 300px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    margin-top: 0;
    height: 575px;
  }
`;

const HeroTitle = styled.div`
  font-weight: 500;
  color: #fff;
  zindex: 2;
  position: absolute;
  font-size: 10px;
  bottom: 8px;
  left: 8px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgb(0 0 0/0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: none;
  }
`;

const GradientWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-family: 'Paytone One';
    font-size: clamp(30px, calc(54px + 16 * ((100vw - 1000px) / 1000)), 60px);
    left: 50px;
    width: 100%;
    max-width: 500px;
    height: auto;
    text-align: left;
    justify-content: flex-start;
    background: none;
    color: ${({ theme }) => theme.white};
    bottom: auto;
    height: 100%;
    filter: drop-shadow(0 35px 10px rgb(0 0 0 / 0.5));
  }
`;

const Hero = ({ low, high, title, link, photographer, gradient }: any) => {
  const [showImageLoader, setShowImageLoader] = useState(true);

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <HeroTitle onClick={() => window.scrollTo(0, 300)}>{title}</HeroTitle>
      <GradientWrapper>
        <GradientText
          text={title}
          gradient={gradient ?? '#22c2b7, #fff, #9761aa, #fff, #22c2b7'}
          fontSize='clamp(30px, calc(54px + 16 * ((100vw - 1000px) / 1000)), 60px)'
          fontFamily='Paytone One'
        />
      </GradientWrapper>
      <HeroImg
        onLoad={() => setShowImageLoader(false)}
        src={showImageLoader ? low : high}
        alt={`Page title: ${title}`}
      />
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
