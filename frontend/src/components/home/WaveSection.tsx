import { Five, Four, One, Three, Two } from '../assets';
import Shop from './Shop';
import styled from 'styled-components';

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

export const WaveDivider = () => {
  return (
    <svg
      className='absolute -top-20 z-[100]'
      viewBox='0 -20 700 110'
      width='100%'
      height='80'
      preserveAspectRatio='none'
    >
      <path d='M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z' fill='#211e2f' />
    </svg>
  );
};

const WaveSection = () => {
  const homeImages = [One, Two, Three, Four, Five];

  return (
    <div className='mb-96'>
      <div className='relative w-full'>
        <WaveDivider />
      </div>
      <ImageGallery>
        {homeImages.map((img: any, i: number) => (
          <img src={img} alt={`${img}-${i}`} key={i} />
        ))}
      </ImageGallery>
      <Shop />
      <div className='absolute z-[100] w-full -rotate-180'>
        <WaveDivider />
      </div>
    </div>
  );
};

export default WaveSection;
