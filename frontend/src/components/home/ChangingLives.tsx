import { BannerLayer, ParallaxBanner } from 'react-scroll-parallax';
import { HomeDog } from '../assets';

const ChangingLives = () => {
  const headline: BannerLayer = {
    translateY: [0, 70],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,

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
