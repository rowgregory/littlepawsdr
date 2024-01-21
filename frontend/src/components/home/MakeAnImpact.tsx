import { Background03Parallax, Background404 } from '../../components/assets/index';
import { Image } from 'react-bootstrap';
import { BannerLayer, ParallaxBanner } from 'react-scroll-parallax';
import styled from 'styled-components';
import { StyledText, TextContainer } from './styles';

const StyledImage = styled(Image)`
  position: absolute;
`;

const MakeAnImpact = () => {
  const headline: BannerLayer = {
    translateY: [0, 50],
    scale: [1, 1.05, 'easeOutCubic'],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <TextContainer className='d-flex aligniitems-center justify-content-center'>
        <StyledText>You can make an impact!</StyledText>
      </TextContainer>
    ),
  };
  const image: BannerLayer = {
    translateY: [-10, 70],
    scale: [0.4, 0.8, 'easeOutCubic'],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <TextContainer className='d-flex aligniitems-center justify-content-center'>
        <StyledImage src={Background03Parallax} />
      </TextContainer>
    ),
  };

  return (
    <ParallaxBanner
      style={{
        minHeight: '100vh',
        position: 'relative',
      }}
      layers={[{ image: Background404, speed: -30 }, headline, image]}
    ></ParallaxBanner>
  );
};

export default MakeAnImpact;
