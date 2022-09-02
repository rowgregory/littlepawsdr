import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getDogsByStatusPicturesAndVideours } from '../../actions/dachshundsActions';
import styled from 'styled-components';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { Text } from '../../components/styles/Styles';
import { formatDate } from '../../utils/formatDate';
import SponsorSanctuary from './SponsorSanctuary';
import ReactPlayer from 'react-player/lazy';
import { LoadingImg } from '../../components/LoadingImg';

const DogContainer = styled(Col)`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr;
  padding: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr;
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

  const title = () => {
    switch (tab) {
      case 'rainbow-bridge':
        return 'Rainbow Bridge';
      case 'successful-adoptions':
        return 'Successful Adoptions';
      case 'sanctuary':
        return '';
      default:
        return 'On Hold';
    }
  };

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
                window.scrollTo(0, 0);
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
          <Text fontSize='2rem' marginBottom='1rem'>
            {title()}
          </Text>
          <DogContainer lg={12}>
            {loading
              ? [...Array(10).keys()]?.map((_: any, i: number) => (
                  <LoadingImg h='384px' w='100%' key={i} />
                ))
              : paginatedDogs?.map((dachshund: any) => {
                  return (
                    <div
                      style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}
                      key={dachshund.id}
                      className='rounded d-flex justify-content-center h-100'
                    >
                      {dachshund?.attributes?.photos?.length > 0 ? (
                        <div>
                          {dachshund?.attributes?.videos?.length > 0 ? (
                            <ReactPlayer
                              controls={true}
                              playing={true}
                              volume={5}
                              light={
                                dachshund?.attributes?.videos[0].urlThumbnail
                              }
                              muted={true}
                              loop={true}
                              url={dachshund?.attributes?.videos[0]?.url}
                              width='100%'
                            />
                          ) : (
                            <Card.Img
                              style={{
                                aspectRatio: '1 / 1',
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
                          <div className='px-3 pb-5'>
                            <Link
                              to={`/about/${tab}/${dachshund.id}`}
                              className='d-flex align-self-center mt-3'
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
                            <div>
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
                              <Text>{dachshund?.attributes?.breedString}</Text>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Text className='mb-0 p-3 d-flex flex-column justify-content-center align-items-center h-100'>
                          We're sorry, we don't have any pictures in our records
                          of
                          <Link
                            to={`/about/${tab}/${dachshund.id}`}
                            style={{
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              color: '#121212',
                              fontSize: '1.3rem',
                            }}
                          >
                            {dachshund?.attributes?.name}
                          </Link>
                        </Text>
                      )}
                    </div>
                  );
                })}
          </DogContainer>
          <Row className='justify-content-center mx-0'>
            <Pagination className='my-3'>{range()}</Pagination>
          </Row>
        </>
      )}
    </>
  );
};

export default StatusDogList;
