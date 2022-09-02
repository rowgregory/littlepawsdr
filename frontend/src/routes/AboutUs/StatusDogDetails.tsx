/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Col, Row, Image } from 'react-bootstrap';
import { getDachshundDetails } from '../../actions/dachshundsActions';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GoBackBtn from '../../utils/GoBackBtn';
import { Text } from '../../components/styles/Styles';
import { HorizontalLine } from '../../components/styles/product-details/Styles';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import ReactPlayer from 'react-player/lazy';
import { LoadingImg } from '../../components/LoadingImg';

const DetailsContainer = styled(Col)`
  background: ${({ theme }) => theme.secondaryBg};
  padding: 2rem;
`;

const StatusDogDetails = ({ match }: any) => {
  const dispatch = useDispatch();

  const dachshundDetails = useSelector((state: any) => state.dachshundDetails);
  const { dachshund, loading } = dachshundDetails;

  useEffect(() => {
    dispatch(getDachshundDetails(match.params.id));
  }, [dispatch, match]);

  const { pathname } = useLocation();

  return loading ? (
    <LoadingImg w='100%' h='100%' />
  ) : (
    <>
      <GoBackBtn to={`/about/${pathname.split('/')[2]}`} />
      {dachshund?.data[0]?.attributes?.photos?.length > 0 && (
        <Row className='mt-3'>
          <Col>
            <Carousel pause='hover' className=''>
              {dachshund?.data[0]?.attributes?.photos?.map(
                (photo: string, i: number) => (
                  <Carousel.Item key={i}>
                    <Image src={photo} alt={`${photo}-${i}`} fluid />
                  </Carousel.Item>
                )
              )}
            </Carousel>
          </Col>
        </Row>
      )}
      <Row
        className='d-flex mx-auto mt-5'
        style={{ maxWidth: '1240px', width: '100%' }}
      >
        <DetailsContainer md={12}>
          <Text fontSize='2.5rem' marginBottom='2rem' fontWeight={500}>
            {dachshund?.data[0]?.attributes?.name}
          </Text>
          <Text>{dachshund?.data[0]?.attributes?.breedPrimary}</Text>
          <HorizontalLine />
          <Text>
            {dachshund?.data[0]?.attributes?.sex} -{' '}
            {dachshund?.data[0]?.attributes?.ageGroup} -{' '}
            {dachshund?.data[0]?.attributes?.sizeGroup} -{' '}
            {dachshund?.data[0]?.attributes?.colorDetails}
          </Text>
          <HorizontalLine />
          <div className='w-100 d-flex justify-content-center'>
            {dachshund?.data[0]?.attributes?.videos[0]?.url && (
              <ReactPlayer
                controls={true}
                playing={true}
                volume={5}
                light={dachshund?.data[0]?.attributes?.videos[0].urlThumbnail}
                muted={true}
                loop={true}
                url={dachshund?.data[0]?.attributes?.videos[0].url}
                style={{ width: '100px' }}
              />
            )}
          </div>
          <HorizontalLine />
          <Text fontSize='1.875rem' marginBottom='1rem'>
            About
          </Text>
          <Text marginBottom='0.25rem' fontWeight={400}>
            CHARACTERISTICS
          </Text>
          <Text fontSize='0.875rem' marginBottom='1.25rem'>
            {dachshund?.data[0]?.attributes?.newPeopleReaction &&
              `${dachshund?.data[0]?.attributes?.newPeopleReaction}, `}
            {dachshund?.data[0]?.attributes?.activityLevel &&
              `${dachshund?.data[0]?.attributes?.activityLevel} activity level, `}
            {dachshund?.data[0]?.attributes?.exerciseNeeds &&
              `${dachshund?.data[0]?.attributes?.exerciseNeeds} exercise needs, `}
            {dachshund?.data[0]?.attributes?.eyeColor &&
              `${dachshund?.data[0]?.attributes?.eyeColor} eye color, `}
            {dachshund?.data[0]?.attributes?.isDogsOk && `Dogs are okay`}
          </Text>
          <Text marginBottom='0.25rem'>QUALITIES</Text>
          <Text fontSize='0.875rem' marginBottom='1.25rem'>
            {dachshund?.data[0]?.attributes?.qualities?.map((quality: string) =>
              quality === 'Apartment'
                ? `${capitalizeFirstLetter(quality)} OK, `
                : `${capitalizeFirstLetter(quality)}, `
            )}
          </Text>
          <Text marginBottom='0.25rem'>COAT LENGTH</Text>
          <Text fontSize='0.875rem' marginBottom='1.25rem'>
            {dachshund?.data[0]?.attributes?.coatLength}
          </Text>
          <Text marginBottom='0.25rem'>HEALTH</Text>
          <Text fontSize='0.875rem' marginBottom='1.25rem'>
            {dachshund?.data[0]?.attributes?.isCurrentVaccinations
              ? 'Vaccinations up to date'
              : 'Vaccinations not up to date'}
          </Text>
          <Text fontSize='1.875rem' marginBottom='1rem'>
            Meet {dachshund?.data[0]?.attributes?.name}
          </Text>

          <Text>
            {dachshund?.data[0]?.attributes?.name} is{' '}
            {dachshund?.data[0]?.attributes?.isDogsOk
              ? 'Good with Dogs. '
              : 'Not Good With Dogs. '}
            {dachshund?.data[0]?.attributes?.sex === 'Female'
              ? 'She is '
              : 'He is '}
            {dachshund?.data[0]?.attributes?.indoorOutdoor &&
              `${dachshund?.data[0]?.attributes?.indoorOutdoor}, `}
            {dachshund?.data[0]?.attributes?.isSpecialNeeds
              ? 'Special Needs and '
              : 'Not Special Needs and, '}
            {dachshund?.data[0]?.attributes?.energyLevel !== undefined &&
              `${dachshund?.data[0]?.attributes?.energyLevel} Energy Level`}
          </Text>
        </DetailsContainer>
      </Row>
    </>
  );
};

export default StatusDogDetails;
