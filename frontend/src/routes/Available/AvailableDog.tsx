import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { Text } from '../../components/styles/Styles';
import LeftArrow from '../../components/svg/LeftArrow';
import {
  AdoptMeLink,
  BottomSection,
  Container,
  Description,
  DetailsGrid,
  DogDetailsContainer,
  FlexContainer,
  StyledCarousel,
} from '../../components/styles/AvailableDog/Styles';
import NoImgDog from '../../components/assets/no_image_dog.jpg';

const AvailableDog = () => {
  const { state, pathname } = useLocation() as any;

  if (pathname === '/available/dogs/18728573') {
    return <Redirect to='/adopt/fees' />;
  }

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
    adoptionFeeString,
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
        url={`/${state?.directBackTo}`}
      />

      {state?.pathName === 'home' && (
        <>
          <Text>Or</Text>
          <LeftArrow text={`See all available dachshunds`} url={`/available`} />
        </>
      )}

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
            alt={`Sorry, we currently do not have an image for ${name}`}
          />
        ) : (
          <StyledCarousel pause='hover'>
            {photos?.map((photo: string, i: number) => (
              <Carousel.Item key={i} interval={4000}>
                <Image
                  src={photo}
                  alt={`${name}`}
                  style={{ aspectRatio: '1/1' }}
                />
              </Carousel.Item>
            ))}
          </StyledCarousel>
        )}
        <DogDetailsContainer>
          <Text fontSize='2.25rem' fontWeight='500'>
            {name}
          </Text>
          <Text marginBottom='1.875rem'>
            {ageGroup} {sex} {breedString}
          </Text>
          <AdoptMeLink to='/adopt/application' type='button'>
            Adopt
          </AdoptMeLink>
        </DogDetailsContainer>
      </FlexContainer>
      <FlexContainer>
        <div className='d-flex flex-column mr-4' style={{ flex: '1 1 0px' }}>
          <Text fontSize='1.5rem' fontWeight='600' marginBottom='1.875rem'>
            About {name}
          </Text>
          <Text
            border='1px solid rgb(68, 68, 68)'
            p='0.5rem 1rem'
            fontSize='1.15rem'
            marginBottom='32px'
          >
            Adoption Fee: {adoptionFeeString}
          </Text>
          <Description
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          ></Description>
        </div>
        <div style={{ flex: '1 1 0px' }}>
          <Text fontSize='1.5rem' fontWeight='600' marginBottom='1.875rem'>
            Details
          </Text>
          <DetailsGrid>
            {detailsData().map((obj: any, i: number) => (
              <div className='d-flex flex-column' key={i}>
                <Text>{obj.title}</Text>
                <Text fontSize='0.875rem'>{obj.textKey}</Text>
              </div>
            ))}
          </DetailsGrid>
        </div>
      </FlexContainer>
      <BottomSection>
        <div className='d-flex flex-column p-3'>
          <Text fontWeight='bold' fontSize='1.15rem' marginBottom='0.55rem'>
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
          <Text fontWeight='bold' fontSize='1.15rem' marginBottom='0.55rem'>
            Transportation Help
          </Text>
          <Text>
            If you see a furbaby that would be a match for your family, please
            don’t let distance stand in the way of your adoption. LPDR can work
            with you to have a volunteer transport to assist with transportation
            or refer you to a paid transport.
          </Text>
        </div>
      </BottomSection>
    </Container>
  );
};

export default AvailableDog;
