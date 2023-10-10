import {
  MobileImageSection,
  ParallaxImg,
  ParallaxSectionContent,
  ParallaxWindow,
} from './styles';
import { Image } from 'react-bootstrap';
import HomeDog from '../../components/assets/home_dog_11.jpeg';

const ChangingLives = () => {
  return (
    <>
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
    </>
  );
};

export default ChangingLives;
