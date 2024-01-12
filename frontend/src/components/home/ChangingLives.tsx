import { BannerLayer, ParallaxBanner } from 'react-scroll-parallax';
import { StyledText, TextContainer } from './styles';
import { HomeDog } from '../assets';

const ChangingLives = () => {
  const headline: BannerLayer = {
    translateY: [0, 70],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <TextContainer className='d-flex aligniitems-center justify-content-center'>
        <StyledText>Changing lives four paws at a time</StyledText>
      </TextContainer>
    ),
  };
  return (
    <ParallaxBanner
      style={{
        minHeight: '550px',
        position: 'relative',
      }}
      layers={[{ image: HomeDog, speed: -10 }, headline]}
    ></ParallaxBanner>
  );
};

export default ChangingLives;
