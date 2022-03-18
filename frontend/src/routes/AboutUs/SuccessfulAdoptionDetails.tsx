/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Col, Row, Image } from 'react-bootstrap';
import { getDachshundDetails } from '../../actions/dachshundsActions';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import styled from 'styled-components';
import {
  colorsPromise,
  locationsPromise,
  patternsPromise,
  speciesPromise,
} from '../../utils/attributePromises';
import DachshundMap from '../../components/DachshundMap';

const StatsColumns = styled(Col)`
  columns: 1;
  @media (min-width: 680px) {
    columns: 2;
  }
`;

const SuccessfulAdoptionDetails = ({ match }: any) => {
  const dispatch = useDispatch();

  const dachshundDetails = useSelector((state: any) => state.dachshundDetails);
  const { loading, error, dachshund } = dachshundDetails;

  const {
    name,
    rescueId,
    eyeColor,
    sizeCurrent,
    sizeUOM,
    isDeclawed,
    isHouseTrained,
    groomingNeeds,
    sheddingLevel,
    activityLevel,
    adoptedDate,
    adoptionFeeString,
    isDogsOk,
    indoorOutdoor,
    isSpecialNeeds,
    adultSexesOk,
    ageGroup,
    ageString,
    breedString,
    descriptionText,
    energyLevel,
    exerciseNeeds,
    fenceNeeds,
    newPeopleReaction,
    obedienceTraining,
    photos,
    qualities,
    sex,
    isCurrentVaccinations,
    sizeGroup,
    vocalLevel,
  } = dachshund !== undefined && dachshund.data[0].attributes;

  const [typePatterns, setTypePatterns] = useState('');
  const [typeSpecies, setTypeSpecies] = useState('');
  const [typeColors, setTypeColors] = useState('');
  const [typeLocations, setTypeLocations] = useState('');

  useEffect(() => {
    speciesPromise(dachshund, setTypeSpecies);
    colorsPromise(dachshund, setTypeColors);
    patternsPromise(dachshund, setTypePatterns);
    locationsPromise(dachshund, setTypeLocations);
  }, [dachshund]);

  useEffect(() => {
    dispatch(getDachshundDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link
        to='/about/successful-adoptions'
        style={{ border: '3px solid #bfbfbf' }}
        className='btn btn-light my-3'
      >
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col className='my-3 px-5 text-center'>
              <h1>{name}</h1>
              {breedString} {sex} {ageGroup} {sizeGroup}
            </Col>
          </Row>
          <Row>
            <Col>
              <Carousel pause='hover' className='bg-dark'>
                {photos?.map((photo: string, i: number) => (
                  <Carousel.Item key={i}>
                    <Image src={photo} alt={`${photo}-${i}`} fluid />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
          <DachshundMap location={typeLocations} />
          <Row className='mt-5 mb-4 flex-wrap d-flex'>
            <StatsColumns className='my-3'>
              <ul>
                <li>
                  Status:{' '}
                  {adoptedDate
                    ? 'Adopted'
                    : 'This pup will find a loving home soon!'}
                </li>
                <li>Adoption Fee: {adoptionFeeString}</li>
                <li>Species: {typeSpecies !== undefined && typeSpecies}</li>
                <li>Rescue ID: {rescueId}</li>
                {typeColors && (
                  <li>
                    General Color: {typeColors !== undefined && typeColors}
                  </li>
                )}
                {typePatterns && <li>Color: {typePatterns}</li>}
                {eyeColor && <li>Eye Color: {eyeColor}</li>}
                <li>
                  Current Size:{' '}
                  {sizeCurrent !== undefined && sizeCurrent.toFixed(1)}{' '}
                  {sizeUOM}
                </li>
                <li>Current Age: {ageString}</li>
                {activityLevel && <li>Activity Level: {activityLevel}</li>}
                {vocalLevel && <li>Vocal Level: {vocalLevel}</li>}
                {fenceNeeds && <li>Fence Requirements: {fenceNeeds}</li>}
                <li>Declawed: {isDeclawed ? 'Yes' : 'No'}</li>
                <li>Housetrained {isHouseTrained ? 'Yes' : 'No'}</li>
                {obedienceTraining && (
                  <li>Obedience Training Needed: {obedienceTraining}</li>
                )}
                {exerciseNeeds && <li>Exercise Needs: {exerciseNeeds}</li>}
                {groomingNeeds && <li>Grooming Needs: {groomingNeeds}</li>}
                {sheddingLevel && <li>Shedding Amount: {sheddingLevel}</li>}
                {newPeopleReaction && (
                  <li>React to New People: {newPeopleReaction}</li>
                )}
              </ul>
            </StatsColumns>
          </Row>
          <Row>
            <Col className='mx-3 my-3'>
              {descriptionText !== undefined &&
                descriptionText
                  .replace(/&#39;/g, "'")
                  .replace(/&rsquo;/g, "'")
                  .replace(/&nbsp;/g, ' ')}
            </Col>
          </Row>
          <Row>
            <Col className='my-3 mx-3'>
              <h4>More about {name}</h4>
              {isDogsOk ? 'Good with Dogs' : 'Not Good With Dogs'}
              {isCurrentVaccinations
                ? ', Up To date On Vaccinations'
                : ', Not Up To Date On Vaccinations'}
              {indoorOutdoor && `, ${indoorOutdoor}`}
              {isSpecialNeeds ? ', Special Needs' : ', Not Special Needs'}
              {adultSexesOk !== undefined && adultSexesOk === 'All'
                ? `, ${adultSexesOk} Adults Welcome`
                : adultSexesOk !== undefined && `, ${adultSexesOk}`}
              {energyLevel !== undefined && `, ${energyLevel} Energy Level`}
              {qualities !== undefined &&
                qualities.map((quality: string) =>
                  quality === 'Apartment'
                    ? `, ${capitalizeFirstLetter(quality)} OK`
                    : `, ${capitalizeFirstLetter(quality)}`
                )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default SuccessfulAdoptionDetails;
