import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getDogsByStatusPicturesAndVideours } from '../../actions/dachshundsActions';
import styled from 'styled-components';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { LoadingImg, StyledCard, Text } from '../../components/styles/Styles';
import { formatDate } from '../../utils/formatDate';
import SponsorSanctuary from './SponsorSanctuary';
import ReactPlayer from 'react-player/lazy';

const DogContainer = styled(Col)`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StatusDogList = ({ tab }: any) => {
  const dispatch = useDispatch();
  const [paginatedDogs, setPaginatedDogs] = useState<{}[]>([]) as any;
  const [paginatedPage, setPaginatedPage] = useState(1);

  const dachshund = useSelector(
    (state: any) => state.dachshundPicturesVideosStatuses
  );
  const { error, dachshunds, loading } = dachshund;

  useEffect(() => {
    setPaginatedPage(1);
    const statusId = {
      'rainbow-bridge': 'Passed Away',
      hold: 'Hold',
      sanctuary: 'Free Roaming',
      'successful-adoptions': 'Adopted',
    } as any;

    if (statusId[tab])
      dispatch(getDogsByStatusPicturesAndVideours(statusId[tab]));
  }, [dispatch, tab]);

  const range = () => {
    const amountOfPagesArr = [];

    if (Math.ceil(dachshunds?.length / 20 + 1) > 2) {
      for (let i = 1; i < Math.ceil(dachshunds?.length / 20 + 1); i++) {
        amountOfPagesArr.push(
          <Pagination.Item
            active={i === Number(paginatedPage)}
            key={i}
            value={i}
            onClick={(e) => {
              if (+paginatedPage !== i) {
                setPaginatedPage(i);
              }
            }}
          >
            {i}
          </Pagination.Item>
        );
      }
    }
    return amountOfPagesArr;
  };

  useEffect(() => {
    const dogsPerPage = 20;
    const indexOfLastDog = paginatedPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;

    setPaginatedDogs(dachshunds?.slice(indexOfFirstDog, indexOfLastDog));
  }, [paginatedPage, dachshunds, tab, loading]);

  return (
    <>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {tab === 'sanctuary' && <SponsorSanctuary />}
          <Row className='justify-content-center'>
            <Pagination className='my-3'>{range()}</Pagination>
          </Row>
          <DogContainer className='px-0' lg={12}>
            {loading
              ? [...Array(10).keys()]?.map((_: any, i: number) => (
                  <LoadingImg h='384px' w='100%' key={i} />
                ))
              : paginatedDogs?.map((dachshund: any) => {
                  return (
                    <div key={dachshund.id} style={{ height: '384px' }}>
                      <StyledCard
                        key={dachshund.id}
                        className=' p-3 rounded d-flex justify-content-center h-100'
                      >
                        {dachshund?.attributes?.photos?.length > 0 ? (
                          <Row>
                            <Col
                              xl={
                                dachshund?.attributes?.videos?.length > 0
                                  ? 8
                                  : 6
                              }
                              lg={12}
                            >
                              {dachshund?.attributes?.videos?.length > 0 ? (
                                <ReactPlayer
                                  controls={true}
                                  playing={true}
                                  volume={5}
                                  light={
                                    dachshund?.attributes?.videos[0]
                                      .urlThumbnail
                                  }
                                  muted={true}
                                  loop={true}
                                  url={dachshund?.attributes?.videos[0]?.url}
                                  width='100%'
                                />
                              ) : (
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
                              )}
                            </Col>
                            <Col
                              className='align-self-center'
                              xl={
                                dachshund?.attributes?.videos?.length > 0
                                  ? 3
                                  : 6
                              }
                              lg={12}
                            >
                              <Link
                                to={`/about/${tab}/${dachshund.id}`}
                                className='d-flex align-self-center justify-content-center mt-3'
                              >
                                <Text
                                  fontSize={
                                    dachshund?.attributes?.videos?.length
                                      ? '1.3rem'
                                      : '1.46rem'
                                  }
                                  className='name'
                                >
                                  {dachshund?.attributes?.name}
                                </Text>
                              </Link>
                              <Card.Body className='d-block text-center'>
                                {tab !== 'rainbow-bridge' &&
                                  tab !== 'hold' &&
                                  dachshund?.attributes?.adoptedDate && (
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
                          <Text className='mb-0 d-flex justify-content-center align-items-center h-100'>
                            We're sorry, we don't have any pictures in our
                            records of &nbsp;
                            <Link
                              to={`/about/${tab}/${dachshund.id}`}
                              style={{
                                cursor: 'pointer',
                                fontWeight: 'bold',
                              }}
                            >
                              {dachshund?.attributes?.name}
                            </Link>{' '}
                            {/* {dachshund?.attributes?.adoptedDate && (
                              <div>
                                but, don't worry, they were adopted on{' '}
                                {formatDate(
                                  dachshund?.attributes?.adoptedDate?.split(
                                    'T'
                                  )[0]
                                )}{' '}
                                by a loving family 😍
                              </div>
                            )} */}
                          </Text>
                        )}
                      </StyledCard>
                    </div>
                  );
                })}
          </DogContainer>
        </>
      )}
    </>
  );
};

export default StatusDogList;
