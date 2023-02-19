import React from 'react';
import Mission from '../components/home/Mission';
import Banner from '../components/home/Banner';
import OurLovablePals from '../components/home/OurLovablePals';
import { Text } from '../components/styles/Styles';
import Shop from '../components/home/Shop';
import HomeDog from '../components/assets/home_dog_11.jpeg';
import One from '../components/assets/dog-row-home-1.png';
import Two from '../components/assets/dog-row-home-2.webp';
import Three from '../components/assets/dog-row-home-3.webp';
import Four from '../components/assets/dog-row-home-4.webp';
import Five from '../components/assets/dog-row-home-5.webp';
import { Image } from 'react-bootstrap';
import Parallax2 from '../components/assets/parallax-2.jpg';
import {
  HomeContainer,
  ImageGallery,
  MobileImageSection,
  ParallaxImg,
  ParallaxImg2,
  ParallaxSectionContent,
  ParallaxWindow,
} from '../components/home/styles';
import { WaveDivider } from '../components/home/WaveDivider';

const Home = () => {
  const homeImages = [One, Two, Three, Four, Five];

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
        Video by Ruben Velasco
      </Text>
      <HomeContainer>
        <OurLovablePals />
        <Mission />
        <MobileImageSection>
          <Image
            src={HomeDog}
            alt='LPDR'
            width='100%'
            style={{ objectFit: 'cover', height: '100vh' }}
            loading='lazy'
          />
          <ParallaxSectionContent
            style={{
              textAlign: 'center',
              filter: 'drop-shadow(0px 20px 10px rgb(0 0 0/0.4))',
              fontSize: '56px',
            }}
          >
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
          <WaveDivider />
        </div>
        <ImageGallery>
          {homeImages.map((img: any, i: number) => (
            <Image src={img} alt={`${img}-${i}`} key={i} loading='lazy' />
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
          <WaveDivider />
        </div>
        <MobileImageSection>
          <Image
            src={Parallax2}
            alt='LPDR'
            width='100%'
            loading='lazy'
            style={{ objectFit: 'cover', height: '100vh' }}
          />
          <ParallaxSectionContent
            style={{
              textAlign: 'center',
              filter: 'drop-shadow(0px 20px 10px rgb(0 0 0/0.4))',
              fontSize: '56px',
            }}
          >
            You can make an impact
          </ParallaxSectionContent>
        </MobileImageSection>
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
