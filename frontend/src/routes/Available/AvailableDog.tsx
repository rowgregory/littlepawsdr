import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';
import { getDachshundDetails } from '../../actions/dachshundsActions';
import Message from '../../components/Message';
import { Text } from '../../components/styles/Styles';
import styled from 'styled-components';
import { locationsPromise } from '../../utils/attributePromises';
import { LoadingImg } from '../../components/LoadingImg';
import LeftArrow from '../../components/svg/LeftArrow';

interface DachshundDetails {
  dachshundDetails: {
    loading: boolean;
    error: string;
    dachshund: {
      meta: any;
      data: [
        {
          attributes: any;
          id: any;
        }
      ];
      included: any;
    };
  };
}

const StyledCarousel = styled(Carousel)`
  background: ${({ theme }) => theme.card.bg};
  border: 1px solid ${({ theme }) => theme.input.border};
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 425px;
    height: 425px;
  }
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[3]};
  margin-inline: auto;
  margin-top: 96px;
  padding: 16px;
`;
const AdoptMeLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  width: fit-content;
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.25rem;
  padding: 0.375rem 1.5rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  transition: 300ms;
  :hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.white};
    text-decoration: none;
  }
  :active {
    background: ${({ theme }) => theme.colors.blue03};
  }
`;

const BottomSection = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin: 5rem 0rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  div {
    color: #fff;
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const DogDetailsContainer = styled.div`
  margin: 0.75rem 0 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-left: 1.875rem;
  }
`;

const Path = styled.path<{ fill?: string }>`
  fill: ${({ theme, fill }) => (fill ? fill : theme.colors.secondary)};
  stroke: none;
`;

export const PawPrint: FC<{ fill?: string }> = ({ fill }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='25px'
      height='25px'
      viewBox='0 0 595.276 841.89'
      fillRule='evenodd'
    >
      <g transform='translate(269.81467,-650.62904)'>
        <Path
          fill={fill}
          d='m -126.267,1038.85 c 22.737,50.44 15.792,102.75 -15.51,116.87 -31.303,14.12 -75.11,-15.31 -97.845,-65.74 -22.737,-50.43 -15.793,-102.745 15.51,-116.863 31.303,-14.114 75.108,15.317 97.845,65.733 z'
        />
        <Path
          fill={fill}
          d='m 183.155,1038.85 c -22.738,50.44 -15.793,102.75 15.512,116.87 31.303,14.12 75.106,-15.31 97.846,-65.74 22.734,-50.43 15.789,-102.745 -15.513,-116.863 -31.301,-14.114 -75.108,15.317 -97.845,65.733 z'
        />
        <Path
          fill={fill}
          d='m 6.7856,937.757 c 11.6548,54.069 -6.1108,103.763 -39.6787,111.003 -33.5654,7.23 -70.2249,-30.74 -81.8779,-84.804 -11.653,-54.068 6.112,-103.764 39.6792,-110.997 33.5669,-7.236 70.2246,30.729 81.8774,84.798 z'
        />
        <Path
          fill={fill}
          d='m 49.2676,937.803 c -11.6446,54.068 6.1084,103.767 39.6738,110.997 33.5676,7.24 70.2256,-30.73 81.8776,-84.797 11.654,-54.069 -6.109,-103.765 -39.678,-110.998 -33.5678,-7.234 -70.225,30.729 -81.8734,84.798 z'
        />
        <Path
          fill={fill}
          d='m -35.2275,1118.5 c -8.1924,14.15 -46.1563,60.99 -72.4145,76.97 -26.256,15.98 -58.792,39.38 -53.332,93.11 5.457,53.74 60.575,76.74 96.8597,74.7 36.2867,-2.03 104.6993,-8.71 153.543,-1.94 48.8413,6.77 110.4863,1.64 124.9223,-49.81 14.436,-51.45 -17.85,-84.23 -43.044,-102.83 -25.193,-18.59 -67.265,-74.2 -80.2269,-99.73 -12.96,-25.52 -78.9268,-72.26 -126.3076,9.53 z'
        />
      </g>
    </svg>
  );
};

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 0;
    flex-direction: row;
  }
`;

const AvailableDog = ({ match }: any) => {
  const dispatch = useDispatch();
  const [typeLocations, setTypeLocations] = useState('');
  const { state } = useLocation() as any;

  const dachshundDetails = useSelector(
    (state: DachshundDetails) => state.dachshundDetails
  );
  const { loading, error, dachshund } = dachshundDetails;

  useEffect(() => {
    dispatch(getDachshundDetails(match.params.id));
    window.scrollTo(0, 0);
  }, [dispatch, match]);
  useEffect(() => {
    locationsPromise(dachshund, setTypeLocations);
  }, [dachshund]);

  const {
    name,
    breedString,
    ageGroup,
    sex,
    adoptionFeeString,
    descriptionText,
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
  } = dachshund !== undefined && dachshund?.data[0]?.attributes;

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

      {error && <Message variant='danger'>{error}</Message>}

      <FlexContainer style={{ marginBottom: '60px', marginTop: '32px' }}>
        {loading ? (
          <StyledCarousel>
            <LoadingImg w='100%' />
          </StyledCarousel>
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
          <Text fontSize='2.25rem' fontWeight='500'>
            {name}
          </Text>
          <Text>
            {ageGroup} {sex} {breedString}
          </Text>
          <Text marginBottom='1.875rem'>{typeLocations}</Text>
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
          >
            Adoption Fee: {adoptionFeeString}
          </Text>
          <Text fontSize='0.875rem' style={{ whiteSpace: 'pre-line' }}>
            {descriptionText !== undefined &&
              descriptionText
                .replace(/&#39;/g, "'")
                .replace(/&rsquo;/g, "'")
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, '')}
          </Text>
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
          <Text
            fontWeight='bold'
            fontSize='1.25rem'
            marginBottom='0.75rem'
            fontFamily='Duru Sans'
          >
            Dogs Adopted in New England
          </Text>
          <Text fontFamily='Duru Sans'>
            Dogs adopted in New England are subject to additional rules and
            regulations by the state departments of agriculture. Complying with
            these regulations is expensive for our rescue, and some dogs adopted
            in New England states are charged an additional $175.00 to cover
            regulatory requirements.
          </Text>
        </div>
        <div className='d-flex flex-column p-3'>
          <Text
            fontWeight='bold'
            fontSize='1.25rem'
            marginBottom='0.75rem'
            fontFamily='Duru Sans'
          >
            Adoption Fee Info
          </Text>
          <Text fontFamily='Duru Sans'>
            There will be a $45 fee for a health certificate if you will be
            traveling over state lines. This is required by law.
          </Text>
        </div>
        <div className='d-flex flex-column p-3'>
          <Text
            fontWeight='bold'
            fontSize='1.25rem'
            marginBottom='0.75rem'
            fontFamily='Duru Sans'
          >
            Transportation Help
          </Text>
          <Text fontFamily='Duru Sans'>
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
