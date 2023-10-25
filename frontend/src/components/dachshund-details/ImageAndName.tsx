import {
  AdoptMeLink,
  DefaultNoDogImg,
  DogDetailsContainer,
  FlexContainer,
  ImageAndNameProps,
  StyledCarousel,
} from '../styles/AvailableDog/Styles';
import NoImgDog from '../../components/assets/no_image_dog.jpg';
import { Carousel, Image } from 'react-bootstrap';
import { Text } from '../styles/Styles';
import { FC } from 'react';

const ImageAndName: FC<ImageAndNameProps> = ({ info }) => {
  const statusId = info?.relationships?.statuses?.data[0]?.id;
  return (
    <FlexContainer>
      {info?.attributes?.photos?.length === 0 ? (
        <DefaultNoDogImg
          src={NoImgDog}
          alt={`Sorry, there currently is no image of ${info?.attributes?.name}`}
        />
      ) : (
        <StyledCarousel pause='hover'>
          {info?.attributes?.photos?.map((photo: string, i: number) => (
            <Carousel.Item key={i} interval={4000}>
              <Image
                src={photo}
                alt={`${photo}-${i}`}
                style={{ aspectRatio: '1/1' }}
              />
            </Carousel.Item>
          ))}
        </StyledCarousel>
      )}
      <DogDetailsContainer>
        <Text fontSize='36px' fontWeight='500'>
          {info?.attributes?.name}
        </Text>
        <Text marginBottom='24px'>
          {info?.attributes?.ageGroup} {info?.attributes?.sex}{' '}
          {info?.attributes?.breedString}
        </Text>
        {statusId === '1' && (
          <AdoptMeLink to='/adopt' type='button'>
            Adopt
          </AdoptMeLink>
        )}
      </DogDetailsContainer>
    </FlexContainer>
  );
};

export default ImageAndName;
