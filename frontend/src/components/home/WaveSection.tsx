import { WaveDivider } from './WaveDivider';
import { ImageGallery } from './styles';
import { Image } from 'react-bootstrap';
import Shop from './Shop';
import One from '../../components/assets/dog-row-home-1.png';
import Two from '../../components/assets/dog-row-home-2.webp';
import Three from '../../components/assets/dog-row-home-3.webp';
import Four from '../../components/assets/dog-row-home-4.webp';
import Five from '../../components/assets/dog-row-home-5.webp';

const WaveSection = () => {
  const homeImages = [One, Two, Three, Four, Five];

  return (
    <>
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
    </>
  );
};

export default WaveSection;
