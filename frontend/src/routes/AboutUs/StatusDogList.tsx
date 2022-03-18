import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getDachshundSanctuaryOrPassedAway } from '../../actions/dachshundsActions';
import styled, { keyframes } from 'styled-components';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { LoadingImg, StyledCard, Text } from '../../components/styles/Styles';
import { formatDate } from '../../utils/formatDate';
import SponsorSanctuary from './SponsorSanctuary';

const DogContainer = styled(Col)`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledLink = styled(Link)`
  :hover {
    text-decoration: none;
    .name {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const shine = keyframes`
    to {
      background-position: 200% center;
    }
`;

export const RainbowText = styled.h4`
  background: -webkit-linear-gradient(
    left,
    orange,
    yellow,
    green,
    cyan,
    blue,
    violet
  ); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(
    right,
    orange,
    yellow,
    green,
    cyan,
    blue,
    violet
  ); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(
    right,
    orange,
    yellow,
    green,
    cyan,
    blue,
    violet
  ); /* For Firefox 3.6 to 15 */
  background: linear-gradient(
    to right,
    orange,
    yellow,
    green,
    cyan,
    blue,
    violet
  ); /* Standard syntax (must be last) */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 350px;
  background-size: 200% auto;
  animation: ${shine} 10s linear infinite;
  font-family: 'Duru', sans-serif;
`;

const PaginationItem = styled(Pagination.Item)<{ isactive: string }>`
  background: ${({ theme, isactive }) =>
    isactive === 'true' ? theme.colors.secondary : ''};
  color: ${({ theme }) => theme.text};
`;

const StatusDogList = ({ tab }: any) => {
  const dispatch = useDispatch();
  const [paginatedDogs, setPaginatedDogs] = useState<{}[]>([]) as any;
  const [paginatedPage, setPaginatedPage] = useState(1);
  const sanctuary = useSelector(
    (state: any) => state.dachshundSanctuaryOrPassedAway
  );
  const { error, dachshunds, loading } = sanctuary;

  useEffect(() => {
    setPaginatedPage(1);
    const statusId = {
      'rainbow-bridge': '7',
      hold: '17',
      sanctuary: '15',
    } as any;
    dispatch(getDachshundSanctuaryOrPassedAway(statusId[tab]));
  }, [dispatch, tab]);

  const range = () => {
    const successes = [];
    for (let i = 1; i < Math.round(dachshunds?.length / 10 + 1); i++) {
      successes.push(
        <PaginationItem isactive={(i === +paginatedPage).toString()} key={i}>
          {i}
        </PaginationItem>
      );
    }

    return successes;
  };

  useEffect(() => {
    const dogsPerPage = 10;
    const indexOfLastDog = paginatedPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;

    dachshunds?.length > 0 &&
      setPaginatedDogs(dachshunds?.slice(indexOfFirstDog, indexOfLastDog));
  }, [paginatedPage, dachshunds, tab]);

  return (
    <>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {tab === 'sanctuary' && <SponsorSanctuary />}
          <Row className='justify-content-center'>
            <Pagination
              className='my-3'
              onClick={(e: any) => {
                setPaginatedPage(e.target.text);
              }}
            >
              {range()}
            </Pagination>
          </Row>
          <DogContainer className='px-0' lg={12}>
            {loading
              ? [...Array(10).keys()]?.map((_: any, i: number) => (
                  <LoadingImg h='384px' w='100%' key={i} />
                ))
              : paginatedDogs?.map((dachshund: any) => {
                  return (
                    <StyledLink
                      to={`${tab}/${dachshund.id}`}
                      key={dachshund.id}
                    >
                      <StyledCard
                        key={dachshund.id}
                        className=' p-3 rounded d-flex'
                      >
                        {dachshund?.attributes?.photos.length > 0 ? (
                          <Row>
                            <Col xl={6} lg={12}>
                              {dachshund?.attributes?.photos[0] !==
                              undefined ? (
                                <Card.Img
                                  style={{
                                    maxHeight: '350px',
                                    objectFit: 'cover',
                                  }}
                                  onClick={() => {
                                    localStorage.setItem(
                                      'pageYOffset',
                                      JSON.stringify(window.pageYOffset)
                                    );
                                  }}
                                  src={dachshund?.attributes?.photos[0]}
                                  alt='successes'
                                />
                              ) : (
                                <Spinner animation='border' />
                              )}
                            </Col>
                            <Col className='align-self-center' xl={6} lg={12}>
                              <Card.Title className='d-flex align-self-center justify-content-center mt-3'>
                                <Text fontSize='2.75rem' className='name'>
                                  {dachshund?.attributes?.name}
                                </Text>
                              </Card.Title>
                              <Card.Body className='d-block text-center'>
                                {dachshund?.attributes?.adoptedDate && (
                                  <Text>
                                    Adopted:{' '}
                                    {formatDate(
                                      dachshund?.attributes?.adoptedDate?.split(
                                        'T'
                                      )[0]
                                    )}
                                  </Text>
                                )}
                                <Text>
                                  {dachshund?.attributes?.breedString}
                                </Text>
                              </Card.Body>
                            </Col>
                          </Row>
                        ) : (
                          <Text className='mb-0'>
                            We're sorry, we don't have any pictures in our
                            records of{' '}
                            <u
                              style={{ cursor: 'pointer', fontWeight: 'bold' }}
                            >
                              {dachshund?.attributes?.name}
                            </u>{' '}
                            {dachshund?.attributes?.adoptedDate && (
                              <div>
                                but, don't worry, they were adopted on{' '}
                                {formatDate(
                                  dachshund?.attributes?.adoptedDate?.split(
                                    'T'
                                  )[0]
                                )}{' '}
                                by a loving family 😍
                              </div>
                            )}
                          </Text>
                        )}
                      </StyledCard>
                    </StyledLink>
                  );
                })}
          </DogContainer>
        </>
      )}
    </>
  );
};

export default StatusDogList;
