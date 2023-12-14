import {
  MobileImageSection,
  ParallaxImg2,
  ParallaxSectionContent,
  ParallaxWindow,
} from './styles';
import { Image } from 'react-bootstrap';

const MakeAnImpact = () => {
  return (
    <>
      <MobileImageSection>
        <ParallaxImg2 />
        {/* <Image
          src={ParallaxImg2}
          alt='LPDR'
          width='100%'
          loading='lazy'
          style={{ objectFit: 'cover', height: '100vh' }}
        /> */}
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
        <ParallaxSectionContent>You can make an impact</ParallaxSectionContent>
        <ParallaxImg2 />
      </ParallaxWindow>
    </>
  );
};

export default MakeAnImpact;
