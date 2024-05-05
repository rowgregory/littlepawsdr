import { useState } from 'react';
import { LoadingImg } from '../LoadingImg';
import styled from 'styled-components';

const SmallerImagesContainer = styled.div<{ morethanoneimage: string }>`
  margin-top: 24px;
  gap: 8px;
  overflow-x: scroll;
  cursor: pointer;
  display: ${({ morethanoneimage }) => (morethanoneimage === 'true' ? 'flex' : 'none')};

  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent; /* Hide the thumb */
  }

  ::-webkit-scrollbar-track {
    background: transparent; /* Hide the track */
  }
`;

const MerchImages = ({ loading, product }: { loading: boolean; product: any }) => {
  const [scaleImage, setScaleImage] = useState({ isScaled: false, id: '' });

  return (
    <div className='w-full mb-8 col-span-12 md:mb-0 md:col-span-5'>
      {loading ? (
        <LoadingImg maxw='700px' w='100%' ar='1/1' />
      ) : (
        <img
          className='max-w-screen-lg w-full object-cover aspect-square'
          src={scaleImage?.id || product?.image || product?.displayUrl}
          alt={product?.name}
        />
      )}
      <SmallerImagesContainer morethanoneimage={(product?.images?.length >= 2).toString()}>
        {product?.images?.map((img: string, i: number) => (
          <img
            className='object-cover aspect-square w-20'
            alt='LPDR merch'
            key={i}
            src={img}
            onMouseEnter={() => setScaleImage({ isScaled: !scaleImage.isScaled, id: img })}
          />
        ))}
      </SmallerImagesContainer>
    </div>
  );
};

export default MerchImages;
