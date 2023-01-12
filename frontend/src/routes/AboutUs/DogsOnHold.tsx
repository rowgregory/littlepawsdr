import React, { useEffect, useState } from 'react';
import { Pagination, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getDogsByStatusPicturesAndVideours } from '../../actions/dachshundsActions';
import styled, { keyframes } from 'styled-components';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { Text } from '../../components/styles/Styles';
import NoImgDog from '../../components/assets/no_image_dog.jpg';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { PaginationContainer } from '../../components/styles/admin/Styles';
import { rangeV2 } from '../../components/common/Pagination';
import OnHoldDog from '../../components/assets/hold01.jpeg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import { LoadingImg } from '../../components/LoadingImg';
import LegacyWallpaper from '../../components/assets/aqua_tile.jpg';

const DogContainer = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr;
  padding-block: 1rem;
  grid-row-gap: 100px;
  margin-bottom: 96px;
  margin-top: 75px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Container = styled.div`
  max-width: 980px;
  width: 100%;
  margin-inline: auto;
  margin-bottom: 96px;
`;

const TextContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  padding: 16px 0 0;
  min-width: 200px;
  border-radius: 100px 100px 0 0;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const MoveLeft = keyframes`
 0% {
    background-position: 0 0;
 }
 100% {
    background-position: -100% 0;
 }
`;

const SupportFoster = styled.div`
  padding-block: 60px;
  margin-top: 96px;
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    background: url(${LegacyWallpaper});
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  :hover {
    &:before {
      animation: ${MoveLeft} 20s linear infinite;
    }
  }
  a {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    :hover {
      text-decoration: none;
    }
  }
`;

const DogsOnHold = () => {
  const dispatch = useDispatch();
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const dachshund = useSelector(
    (state: any) => state.dachshundPicturesVideosStatuses
  );
  const { error, dachshunds, loading } = dachshund;

  useEffect(() => {
    const itemsPerPage = 21;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(dachshunds?.slice(indexOfFirstItem, indexOfLastItem));
  }, [dachshunds, paginatedPage]);

  useEffect(() => {
    dispatch(getDogsByStatusPicturesAndVideours('Hold'));
  }, [dispatch]);

  return (
    <>
      {loading && <HexagonLoader />}
      <div style={{ position: 'relative', marginTop: '75px' }}>
        <Image
          src={OnHoldDog}
          width='100%'
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Text
          fontWeight={500}
          fontSize='48px'
          color='#fff'
          style={{
            position: 'absolute',
            top: '200px',
            left: '50px',
            zIndex: 2,
          }}
        >
          Not Available For Adoption Yet
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://unsplash.com/@jummmm?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
              '_blank'
            )
          }
          fontWeight={500}
          fontSize='10px'
          color='#fff'
          cursor='pointer'
          style={{
            mixBlendMode: 'difference',
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
          }}
        >
          Photo by jum.jpeg
        </Text>
      </div>
      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow text='Home' url='/' text2='Surrender' url2='/surrender' />
          <RightArrow
            text='Successful Adoptions'
            url='/about/successful-adoptions'
          />
        </div>
        <SupportFoster className='d-flex w-100 justify-content-center'>
          <Link to='/donate'>Support a Foster Here</Link>
        </SupportFoster>
        {error && <Message variant='danger'>{error}</Message>}

        {loading && (
          <DogContainer>
            {[...Array(6).keys()].map((z: any, i: number) => (
              <LoadingImg key={i} w='100%' mw='300px' />
            ))}
          </DogContainer>
        )}
        <DogContainer>
          {paginatedItems?.map((dachshund: any) => (
            <div
              key={dachshund.id}
              className='rounded d-flex justify-content-center h-100'
              style={{ position: 'relative' }}
            >
              <Image
                src={dachshund?.attributes?.photos[0] ?? NoImgDog}
                alt='successful-adoption'
                style={{
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  width: '100%',
                }}
              />

              <TextContainer>
                <Link
                  to={{
                    pathname: `/about/dachshund`,
                    state: {
                      dog: dachshund,
                      directBackTo: 'hold',
                      pathName: 'Dogs On Hold',
                    },
                  }}
                  className='d-flex align-self-center'
                >
                  <Text
                    fontSize='14px'
                    fontWeight={400}
                    className='justify-content-center d-flex'
                  >
                    {dachshund?.attributes?.name}
                  </Text>
                </Link>
              </TextContainer>
            </div>
          ))}
        </DogContainer>
        <PaginationContainer>
          <Pagination className='my-3'>
            {rangeV2(dachshunds, paginatedPage, setPaginatedPage, 12)}
          </Pagination>
        </PaginationContainer>
      </Container>
    </>
  );
};

export default DogsOnHold;
