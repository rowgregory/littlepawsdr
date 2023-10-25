import { useState } from 'react';
import { ImagesContainer } from '../styles/product-details/Styles';
import { LoadingImg } from '../LoadingImg';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';

const MainImage = styled(Image)`
  max-width: 700px;
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

const SmallerImages = styled(Image)`
  object-fit: cover;
  aspect-ratio: 1/1;
  width: 75px;
`;
const SmallerImagesContainer = styled.div<{ morethanoneimage: string }>`
  margin-top: 24px;
  gap: 8px;
  overflow-x: scroll;
  cursor: pointer;
  display: ${({ morethanoneimage }) =>
    morethanoneimage === 'true' ? 'flex' : 'none'};

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

const MerchImages = ({
  loading,
  product,
}: {
  loading: boolean;
  product: any;
}) => {
  const [scaleImage, setScaleImage] = useState({ isScaled: false, id: '' });

  return (
    <ImagesContainer>
      {loading ? (
        <LoadingImg maxw='700px' w='100%' ar='1/1' />
      ) : (
        <MainImage src={scaleImage?.id || product?.image} />
      )}
      <SmallerImagesContainer
        morethanoneimage={(product?.images?.length >= 2).toString()}
      >
        {product?.images?.map((img: string, i: number) => (
          <SmallerImages
            key={i}
            src={img}
            onMouseEnter={() =>
              setScaleImage({ isScaled: !scaleImage.isScaled, id: img })
            }
          />
        ))}
      </SmallerImagesContainer>
    </ImagesContainer>
  );
};

export default MerchImages;
