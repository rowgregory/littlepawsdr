import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Card, Pagination, Fade, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { getDachshundSuccessfulAdoptions } from '../../actions/dachshundsActions';
import Message from '../../components/Message';
import { ScrollTopBtn, StyledCard, Text } from '../../components/styles/Styles';
import { formatDate } from '../../utils/formatDate';

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

const Shimmer = keyframes`
  0% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const LoadingPaginatedDogs = styled.div`
  max-width: 858px;
  width: 100%;
  height: 384px;
  position: relative;
  animation: ${Shimmer} 1500ms infinite;
  background-size: 400%;
  background-image: ${({ theme }) => `linear-gradient(
    90deg,
    ${theme.loading.one} 0%,
    ${theme.loading.one} 40%,
    ${theme.loading.two} 50%,
    ${theme.loading.two} 55%,
    ${theme.loading.one} 65%,
    ${theme.loading.one} 100%
  );`};
`;

const SuccessfulAdoptions = () => {
  const dispatch = useDispatch();
  const successfulAdoptions = useSelector(
    (state: any) => state.dachshundSuccessfulAdoptions
  );
  let {
    loading,
    error,
    successfulAdoptions: successfulAdoptionsSuccess,
  } = successfulAdoptions;
  // loading = true;

  const lastPageNum = localStorage.getItem('pageNumber')
    ? JSON.parse(localStorage.getItem('pageNumber') || '')
    : 1;

  const [paginatedDogs, setPaginatedDogs] = useState<{}[]>([]) as any;
  const [paginatedPage, setPaginatedPage] = useState(lastPageNum);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  const range = () => {
    const successes = [];
    for (let i = 1; i < 11; i++) {
      successes.push(
        <Pagination.Item key={i} active={i === Number(paginatedPage)}>
          {i}
        </Pagination.Item>
      );
    }

    return successes;
  };

  useMemo(() => {
    if (paginatedPage) {
      localStorage.setItem('pageNumber', JSON.stringify(paginatedPage));
    }

    const dogsPerPage = 25;
    const indexOfLastDog = paginatedPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = successfulAdoptionsSuccess?.data?.slice(
      indexOfFirstDog,
      indexOfLastDog
    );

    currentDogs?.length !== 0 && setPaginatedDogs(currentDogs);
  }, [successfulAdoptionsSuccess, paginatedPage]);

  useEffect(() => {
    const listener = () => {
      if (window.pageYOffset > 50) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };

    window.addEventListener('scroll', listener);

    return () => window.removeEventListener('scroll', listener);
  }, []);

  useEffect(() => {
    dispatch(getDachshundSuccessfulAdoptions());
  }, [dispatch]);

  return (
    <>
      <Fade in={isScrolledDown}>
        <ScrollTopBtn
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            localStorage.setItem('pageYOffset', JSON.stringify(0));
          }}
        >
          TOP
        </ScrollTopBtn>
      </Fade>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='justify-content-center'>
            <Pagination
              className='my-3'
              onClick={(e: any) => {
                setIsScrolledDown(false);
                setPaginatedPage(e.target.text);
              }}
            >
              {range()}
            </Pagination>
          </Row>

          <DogContainer className='px-0' lg={12}>
            {loading
              ? [...Array(25).keys()]?.map((_: any, i: number) => (
                  <LoadingPaginatedDogs key={i} />
                ))
              : paginatedDogs?.map((dachshund: any) => {
                  return (
                    <StyledLink
                      to={`successful-adoption/${dachshund.id}`}
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
                                <Text>
                                  Adopted:{' '}
                                  {formatDate(
                                    dachshund?.attributes?.adoptedDate.split(
                                      'T'
                                    )[0]
                                  )}
                                </Text>
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
                            but, don't worry, they were adopted on{' '}
                            {formatDate(
                              dachshund?.attributes?.adoptedDate.split('T')[0]
                            )}{' '}
                            by a loving family 😍
                          </Text>
                        )}
                      </StyledCard>
                    </StyledLink>
                  );
                })}
          </DogContainer>

          <Row className='justify-content-center'>
            <Pagination
              onClick={(e: any) => {
                window.scrollTo(0, 0);
                setPaginatedPage(e.target.text);
              }}
            >
              {range()}
            </Pagination>
          </Row>
        </>
      )}
    </>
  );
};

export default SuccessfulAdoptions;
