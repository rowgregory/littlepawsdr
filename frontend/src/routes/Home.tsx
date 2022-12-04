import React from 'react';
import Mission from '../components/home/Mission';
import Banner from '../components/home/Banner';
import OurLovablePals from '../components/home/OurLovablePals';
import { Text } from '../components/styles/Styles';
import Shop from '../components/home/Shop';
import styled, { useTheme } from 'styled-components';
import HomeDog from '../components/assets/home_dog_12.jpg';
import One from '../components/assets/footer_img_1.png';
import Two from '../components/assets/our-purpose-2.jpeg';
import Three from '../components/assets/our-purpose-3.jpeg';
import Four from '../components/assets/the-goal-2.jpeg';
import Five from '../components/assets/pretzel-1.jpg';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  margin: 96px auto 0;
  width: 100%;
`;

const ParallaxWindow = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: block;
    position: relative;
    width: 100%;
    padding-bottom: 60%;
  }
`;
const ParallaxSectionContent = styled.div`
  top: 25%;
  marign-left: auto;
  margin-right: auto;
  position: absolute;
  padding: 0 20px;
  z-index: 25;
  color: #fff;
  font-size: 28px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: 44px;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
`;
const ParallaxImg = styled.div`
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  background-image: url(${HomeDog});
  background-repeat: no-repeat;
  filter: brightness(0.8);
`;
const ParallaxImg2 = styled.div`
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  background-image: url('https://res.cloudinary.com/little-paws-dachshund-rescue/image/upload/v1657117988/parallax-img-1_lglhxi.jpg');
  background-repeat: no-repeat;
  filter: brightness(0.8);
`;

const ImageGallery = styled.div`
  background: ${({ theme }) => theme.header.bg};
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
  }
`;

const Divider = () => {
  return (
    <svg
      viewBox='0 -20 700 110'
      width='100%'
      height='80'
      preserveAspectRatio='none'
      style={{ position: 'absolute', top: '-80px', zIndex: 100 }}
    >
      <path
        d='M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z'
        fill='#211e2f'
      />
    </svg>
  );
};

const threeOptionData = (colors: any) => {
  return [
    {
      title: 'Donate',
      text: 'Every gift can make a difference for a dachshund in need.',
      bgColor: colors.tertiary,
      linkKey: '/donate',
    },
    {
      title: 'Events',
      text: "Don't forget to participate in our monthly fundraisers and events.",
      bgColor: colors.secondary,
      linkKey: '/events',
    },
    {
      title: 'Blog',
      text: 'Our dedicated volunteers keep you up to date with the latest dachshund news.',
      bgColor: colors.tertiary,
      linkKey: '/about/blog',
    },
  ];
};

export const hex2rgba = (hex: any, alpha: number) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x: any) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

const ThreeOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  box-sizing: border-box;

  gap: 0.5rem;
  width: 75%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const DifferenceCard = styled(Link)<{
  bgcolor: string;
}>`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    aspect-ratio: 1/1;
    position: relative;
    width: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    text-align: center;
    background: ${({ bgcolor }) => bgcolor};
    div {
      color: #fff;
    }
    :hover {
      text-decoration: none;
    }
  }
`;

const MobileImageSection = styled.div`
  display: block;
  position: relative;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: none;
  }
`;

const Home = () => {
  const homeImages = [One, Two, Three, Four, Five];
  const theme = useTheme() as any;

  return (
    <>
      <Banner />
      <Text
        className='d-flex justify-content-end'
        marginRight='4px'
        marginTop='4px'
        cursor='pointer'
        fontSize='9px'
        onClick={() =>
          window.open('https://mixkit.co/@rubenvelasco/', '_blank')
        }
      >
        Video by Ruben Velasco{' '}
      </Text>
      <HomeContainer>
        <OurLovablePals />
        <Mission />
        <MobileImageSection>
          <Image
            src={HomeDog}
            alt='LPDR'
            width='100%'
            height='600px'
            style={{ objectFit: 'cover' }}
          />
          <ParallaxSectionContent>
            Changing lives four paws at a time
          </ParallaxSectionContent>
        </MobileImageSection>
        <ParallaxWindow>
          <ParallaxSectionContent>
            Changing lives four paws at a time
          </ParallaxSectionContent>
          <ParallaxImg />
        </ParallaxWindow>
        <div style={{ position: 'relative', width: '100%' }}>
          <Divider />
        </div>
        <ImageGallery>
          {homeImages.map((img: any, i: number) => (
            <Image src={img} alt={`${img}-${i}`} key={i} />
          ))}
        </ImageGallery>
        <Shop />
        <div
          style={{
            position: 'absolute',
            zIndex: 100,
            width: '100%',
            transform: 'rotateX(180deg)',
          }}
        >
          <Divider />
        </div>
        <MobileImageSection>
          <Image
            src='https://res.cloudinary.com/little-paws-dachshund-rescue/image/upload/v1657117988/parallax-img-1_lglhxi.jpg'
            alt='LPDR'
            width='100%'
          />
          <ParallaxSectionContent>
            You can make an impact
            <ThreeOptions>
              {threeOptionData(theme.colors).map((obj: any, i: number) => (
                <DifferenceCard
                  to={obj.linkKey}
                  key={i}
                  bgcolor={hex2rgba(obj.bgColor, 0.7)}
                >
                  <Text fontSize='2rem' fontWeight='500' marginBottom='1.25rem'>
                    {obj.title}
                  </Text>
                  <Text fontSize='1.125rem'>{obj.text}</Text>
                </DifferenceCard>
              ))}
            </ThreeOptions>
          </ParallaxSectionContent>
        </MobileImageSection>{' '}
        <ParallaxWindow>
          <ParallaxSectionContent>
            You can make an impact
          </ParallaxSectionContent>
          <ParallaxImg2 />
        </ParallaxWindow>
      </HomeContainer>
    </>
  );
};

export default Home;
