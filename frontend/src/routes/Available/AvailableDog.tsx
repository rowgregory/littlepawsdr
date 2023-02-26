import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getDachshundDetails } from '../../actions/dachshundsActions';
import { LoadingImg } from '../../components/LoadingImg';

const AvailableDog = ({ match }: any) => {
  const { state, pathname } = useLocation() as any;
  const dispatch = useDispatch();
  const dogId = match?.params?.id;

  const {
    dachshundDetails: { loading, dachshund },
  } = useSelector((state: any) => state);

  useEffect(() => {
    if (state?.dog === undefined) {
      dispatch(getDachshundDetails(dogId));
    }
  }, [dispatch, dogId, state]);

  if (pathname === '/available/dogs/18728573') {
    return <Redirect to='/adopt/fees' />;
  }

  const attributes = state?.dog?.attributes || dachshund?.data[0]?.attributes;

  const detailsData = () => [
    {
      title: 'Name',
      textKey: attributes?.name,
    },
    {
      title: 'Age',
      textKey: attributes?.ageString,
    },
    {
      title: 'Gender',
      textKey: attributes?.sex,
    },
    {
      title: 'Size',
      textKey: attributes?.sizeGroup,
    },
    {
      title: 'Primary Color',
      textKey: attributes?.colorDetails,
    },
    {
      title: 'Grooming Needs',
      textKey: attributes?.groomingNeeds,
    },
    {
      title: 'Ok with kids',
      textKey: attributes?.isKidsOk ? 'YES' : 'NO',
    },
    {
      title: 'Housetrained',
      textKey: attributes?.isHousetrained
        ? 'YES'
        : attributes?.housetrainedReasonNot,
    },
    {
      title: 'New People Reaction',
      textKey: attributes?.newPeopleReaction,
    },
    {
      title: 'Vocal Level',
      textKey: attributes?.vocalLevel,
    },
    {
      title: 'Ok with dogs',
      textKey: attributes?.isDogsOk ? 'YES' : 'NO',
    },
    {
      title: 'Okay with cats',
      textKey: attributes?.isCatsOk ? 'YES' : 'NO',
    },
  ];

  return (
    <Container>
      <LeftArrow text='Back' url='/available' />
      {state?.pathName === 'home' && (
        <>
          <Text>Or</Text>
          <LeftArrow text={`See all available dachshunds`} url={`/available`} />
        </>
      )}
      <FlexContainer>
        {loading ? (
          <LoadingImg mw='65%' w='' />
        ) : attributes?.photos?.length === 0 ? (
          <Image
            src={NoImgDog}
            style={{
              aspectRatio: '1/1',
              maxWidth: '425px',
              width: '100%',
              objectFit: 'cover',
            }}
            alt={`Sorry, we currently do not have an image for ${attributes?.name}`}
          />
        ) : (
          <StyledCarousel pause='hover'>
            {attributes?.photos?.map((photo: string, i: number) => (
              <Carousel.Item key={i} interval={4000}>
                <Image
                  src={photo}
                  alt={`${attributes?.name}`}
                  style={{ aspectRatio: '1/1' }}
                />
              </Carousel.Item>
            ))}
          </StyledCarousel>
        )}
        <DogDetailsContainer>
          <Text fontSize='2.25rem' fontWeight='500'>
            {attributes?.name}
          </Text>
          <Text marginBottom='1.875rem'>
            {attributes?.ageGroup} {attributes?.sex} {attributes?.breedString}
          </Text>
          <AdoptMeLink to='/adopt/application' type='button'>
            Adopt
          </AdoptMeLink>
        </DogDetailsContainer>
      </FlexContainer>
      <FlexContainer>
        <div className='d-flex flex-column mr-4' style={{ flex: '1 1 0px' }}>
          <Text fontSize='1.5rem' fontWeight='600' marginBottom='1.875rem'>
            About {attributes?.name}
          </Text>
          <Text
            border='1px solid rgb(68, 68, 68)'
            p='0.5rem 1rem'
            fontSize='1.15rem'
            marginBottom='32px'
          >
            Adoption Fee: {attributes?.adoptionFeeString}
          </Text>
          <Description
            dangerouslySetInnerHTML={{ __html: attributes?.descriptionHtml }}
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
            If you see a dog that is a match for your family a LPDR volunteer
            transport may be arranged to bring the dog to you. However, some of
            our dogs have distance restrictions and need to be adopted within a
            specific number of miles from their foster homes. We’ll inform you
            if the dog you’ve applied for is not able to travel long distances
            by car. A paid transport can also be arranged for any dog that does
            not have travel restrictions.
          </Text>
        </div>
      </BottomSection>
    </Container>
  );
};

export default AvailableDog;
