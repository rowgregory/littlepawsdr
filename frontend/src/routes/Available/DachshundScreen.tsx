import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Carousel, Image } from 'react-bootstrap';
import { getDachshundDetails } from '../../actions/dachshundsActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import DachshundMap from '../../components/DachshundMap';
import { StyledCarousel, Text } from '../../components/styles/Styles';
import styled, { useTheme } from 'styled-components';
import { locationsPromise } from '../../utils/attributePromises';
import { HorizontalLine } from '../../components/styles/product-details/Styles';

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

const Container = styled.div`
  margin: 0 48px;
`;

const AdoptMeLink = styled(Link)`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.white};
  width: fit-content;
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.25rem;
  :hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.white};
    filter: brightness(0.9);
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
  margin-top: 5rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr 1fr;\
  }
  div {
    color: #fff;
    background: ${({ theme }) => theme.colors.secondary};

  }
`;

const GoBack = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  margin-bottom: 2rem;
`;
const DogDetailsContainer = styled.div`
  background: ${({ theme }) => theme.tertiary};
  padding: 1rem;
  div {
    font-family: 'Ubuntu', sans-serif;
    font-size: 1.15rem;
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

const DachshundScreen = ({ match, history }: any) => {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const isDay = theme.mode === 'day';
  const [typeLocations, setTypeLocations] = useState('');

  const dachshundDetails = useSelector(
    (state: DachshundDetails) => state.dachshundDetails
  );
  const { loading, error, dachshund } = dachshundDetails;

  useEffect(() => {
    dispatch(getDachshundDetails(match.params.id));
  }, [dispatch, match]);
  useEffect(() => {
    locationsPromise(dachshund, setTypeLocations);
  }, [dachshund]);

  const {
    name,
    breedString,
    ageGroup,
    sex,
    adultSexesOk,
    isYardRequired,
    fenceNeeds,
    adoptionFeeString,
    descriptionText,
    photos,
    isDogsOk,
    isKidsOk,
  } = dachshund !== undefined && dachshund?.data[0]?.attributes;

  return (
    <Container>
      <GoBack onClick={() => history.push('/available')}>
        <i className='fas fa-arrow-left mr-1'></i>Go Back
      </GoBack>

      {loading && <Loader />}
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col lg={5} md={12}>
              <StyledCarousel pause='hover'>
                {photos?.map((photo: string, i: number) => (
                  <Carousel.Item key={i} interval={2000}>
                    <Image src={photo} alt={`${photo}-${i}`} fluid />
                  </Carousel.Item>
                ))}
              </StyledCarousel>
              <div className='d-flex align-items-center justify-content-center mb-3 mt-5 w-100'>
                <Text
                  bold='bold'
                  fontSize='1.5rem'
                  style={{ color: isDay ? '#9a82b1' : '#a5fe91' }}
                >
                  {adoptionFeeString?.split('').includes('$')
                    ? adoptionFeeString
                    : `$${adoptionFeeString}`}
                </Text>
                <AdoptMeLink
                  to='/adopt/application'
                  className='btn-block border-0 d-flex justify-content-center align-items-center p-2 ml-3'
                  type='button'
                >
                  Adopt Me
                </AdoptMeLink>
              </div>
            </Col>
            <Col lg={7} md={12} className='d-flex flex-column'>
              <Text
                fontFamily={`Ubuntu, sans-serif`}
                fontSize='2rem'
                bold='bold'
              >
                {name}
              </Text>
              <Text letterSpacing='2px'>{breedString}</Text>
              <Text>
                {ageGroup} {sex}
              </Text>
              <HorizontalLine />
              <DogDetailsContainer>
                {adultSexesOk && (
                  <div className='d-flex align-items-start'>
                    <PawPrint />
                    <Text marginLeft='1rem' marginBottom='0.4rem'>
                      Preferred owner: {adultSexesOk}
                    </Text>
                  </div>
                )}
                {isDogsOk && (
                  <div className='d-flex align-items-start'>
                    <PawPrint />
                    <Text marginLeft='1rem' marginBottom='0.4rem'>
                      Good with Dogs
                    </Text>
                  </div>
                )}
                {isYardRequired && (
                  <div className='d-flex align-items-start'>
                    <PawPrint />
                    <Text marginLeft='1rem' marginBottom='0.4rem'>
                      Needs a yard
                    </Text>
                  </div>
                )}
                {fenceNeeds && (
                  <div className='d-flex align-items-start'>
                    <PawPrint />
                    <Text marginLeft='1rem' marginBottom='0.4rem'>
                      {fenceNeeds === 'Not Required'
                        ? 'No fence required'
                        : `Fence required: ${fenceNeeds}`}
                    </Text>
                  </div>
                )}
                <div className='d-flex align-items-start'>
                  <PawPrint />
                  <Text marginLeft='1rem' marginBottom='0.4rem'>
                    {isKidsOk ? 'Good with Kids' : 'Not good with Kids'}
                  </Text>
                </div>
              </DogDetailsContainer>
              <HorizontalLine />
              <div className='d-flex align-items-baseline'>
                <Text
                  bold='bold'
                  fontFamily={`Ubuntu, sans-serif`}
                  fontSize='1rem'
                >
                  Location:{' '}
                </Text>
                <Text className='ml-2'>{typeLocations}</Text>
              </div>
              <div className='my-3'>
                <DachshundMap location={typeLocations} />
              </div>
              <HorizontalLine />
            </Col>
          </Row>
          <div className='p-3 mt-4'>
            <Text
              fontSize='1.25rem'
              textIndent='1rem'
              style={{ whiteSpace: 'pre-line' }}
            >
              {descriptionText !== undefined &&
                descriptionText
                  .replace(/&#39;/g, "'")
                  .replace(/&rsquo;/g, "'")
                  .replace(/&amp;/g, '&')
                  .replace(/&nbsp;/g, '')}
            </Text>
          </div>
          <HorizontalLine />
          <BottomSection>
            <div className='d-flex flex-column p-3'>
              <Text
                bold='bold'
                fontSize='1.25rem'
                marginBottom='0.75rem'
                fontFamily='Duru Sans'
              >
                Dogs Adopted in New England
              </Text>
              <Text fontFamily='Duru Sans'>
                Dogs adopted in New England are subject to additional rules and
                regulations by the state departments of agriculture. Complying
                with these regulations is expensive for our rescue, and some
                dogs adopted in New England states are charged an additional
                $175.00 to cover regulatory requirements.
              </Text>
            </div>
            <div className='d-flex flex-column p-3'>
              <Text
                bold='bold'
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
                bold='bold'
                fontSize='1.25rem'
                marginBottom='0.75rem'
                fontFamily='Duru Sans'
              >
                Transportation Help
              </Text>
              <Text fontFamily='Duru Sans'>
                If you see a furbaby that would be a match for your family,
                please don’t let distance stand in the way of your adoption.
                LPDR can work with you to have a volunteer transport to assist
                with transportation or refer you to a paid transport.
              </Text>
            </div>
          </BottomSection>
        </>
      )}
    </Container>
  );
};

export default DachshundScreen;
