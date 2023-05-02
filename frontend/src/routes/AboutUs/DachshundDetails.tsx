import React from 'react';
import { useLocation } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { Text } from '../../components/styles/Styles';
import LeftArrow from '../../components/svg/LeftArrow';
import NoImgDog from '../../components/assets/no_image_dog.jpg';
import {
  BottomSection,
  Container,
  Description,
  DetailsGrid,
  DogDetailsContainer,
  FlexContainer,
  StyledCarousel,
} from '../../components/styles/AvailableDog/Styles';

const DachshundDetails = () => {
  const { state } = useLocation() as any;

  const {
    name,
    breedString,
    ageGroup,
    sex,
    photos,
    isDogsOk,
    isKidsOk,
    ageString,
    sizeGroup,
    colorDetails,
    groomingNeeds,
    isHousetrained,
    housetrainedReasonNot,
    newPeopleReaction,
    isCatsOk,
    vocalLevel,
    descriptionHtml,
  } = state?.dog?.attributes;

  const detailsData = () => [
    {
      title: 'Name',
      textKey: name,
    },
    {
      title: 'Age',
      textKey: ageString,
    },
    {
      title: 'Gender',
      textKey: sex,
    },
    {
      title: 'Size',
      textKey: sizeGroup,
    },
    {
      title: 'Primary Color',
      textKey: colorDetails,
    },
    {
      title: 'Grooming Needs',
      textKey: groomingNeeds,
    },
    {
      title: 'Ok with kids',
      textKey: isKidsOk ? 'YES' : 'NO',
    },
    {
      title: 'Housetrained',
      textKey: isHousetrained ? 'YES' : housetrainedReasonNot,
    },
    {
      title: 'New People Reaction',
      textKey: newPeopleReaction,
    },
    {
      title: 'Vocal Level',
      textKey: vocalLevel,
    },
    {
      title: 'Ok with dogs',
      textKey: isDogsOk ? 'YES' : 'NO',
    },
    {
      title: 'Okay with cats',
      textKey: isCatsOk ? 'YES' : 'NO',
    },
  ];

  return (
    <Container>
      <LeftArrow
        text={`Back to ${state?.pathName}`}
        url={`/about/${state?.directBackTo}`}
      />
      <FlexContainer>
        {photos?.length === 0 ? (
          <Image
            src={NoImgDog}
            style={{
              aspectRatio: '1/1',
              maxWidth: '425px',
              width: '100%',
              objectFit: 'cover',
            }}
            alt={`Sorry, there currently is no image of ${name}`}
          />
        ) : (
          <StyledCarousel pause='hover'>
            {photos?.map((photo: string, i: number) => (
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
            {name}
          </Text>
          <Text>
            {ageGroup} {sex} {breedString}
          </Text>
        </DogDetailsContainer>
      </FlexContainer>
      <FlexContainer>
        <div className='d-flex flex-column mr-4' style={{ flex: '1 1 0px' }}>
          <Text fontSize='24px' fontWeight='600' marginBottom='30px'>
            About {name}
          </Text>
          <Description
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          ></Description>
        </div>
        <div style={{ flex: '1 1 0px' }}>
          <Text fontSize='24px' fontWeight='600' marginBottom='30px'>
            Details
          </Text>
          <DetailsGrid>
            {detailsData().map((obj: any, i: number) => (
              <div className='d-flex flex-column' key={i}>
                <Text fontWeight={400} fontSize='14px'>
                  {obj.title}
                </Text>
                <Text>{obj.textKey}</Text>
              </div>
            ))}
          </DetailsGrid>
        </div>
      </FlexContainer>
      <BottomSection>
        <div className='d-flex flex-column p-3'>
          <Text fontWeight='bold' fontSize='24px' marginBottom='12px'>
            Dogs Adopted in New England
          </Text>
          <Text>
            Dogs adopted in New England are subject to additional rules and
            regulations by the state departments of agriculture. Complying with
            these regulations is expensive for our rescue, and some dogs adopted
            in New England states are charged an additional $175.00 to cover
            regulatory requirements.
          </Text>
        </div>
        <div className='d-flex flex-column p-3'>
          <Text fontWeight='bold' fontSize='24px' marginBottom='12px'>
            Transportation Help
          </Text>
          <Text>
            If you see a dog that is a match for your family a LPDR volunteer
            transport may be arranged to bring the dog to you. However, some of
            our dogs have distance restrictions and need to be adopted within a
            specific number of miles from their foster homes. We’ll inform you
            if the dog you’ve applied for is not able to travel long distances
            by car. A paid transport can also be arranged for any dog that does
            not have travel restrictions.
          </Text>
        </div>
        <div className='d-flex flex-column p-3'>
          <Text fontWeight='bold' fontSize='1.15rem' marginBottom='0.55rem'>
            Adopting across state costs extra
          </Text>
          <Text>
            If the dog is adopted over a state line, there will be an additional
            charge for a health certificate (required by law) of anywhere
            between $45.00 and $100.00. The amount depends upon what the
            veterinarian charges LPDR.
          </Text>
        </div>
      </BottomSection>
    </Container>
  );
};

export default DachshundDetails;
