import React, { useEffect, useState } from 'react';
import { Col, Card, Pagination, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getDogsByStatusPicturesAndVideours } from '../../actions/dachshundsActions';
import styled from 'styled-components';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { Text } from '../../components/styles/Styles';
import { formatDate } from '../../utils/formatDate';
import { LoadingImg } from '../../components/LoadingImg';
import Successful from '../../components/assets/successful03.jpeg';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { PaginationContainer } from '../../components/styles/admin/Styles';
import { rangeV2 } from '../../components/common/Pagination';
import NoImgDog from '../../components/assets/no_image_dog.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';

const DogContainer = styled(Col)`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr;
  padding: 1rem;
  grid-row-gap: 120px;
  margin-bottom: 96px;
  margin-top: 56px;
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
  padding-inline: 16px;
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
  padding: 16px;
  padding: 16px 0 0;
  min-width: 200px;
  border-radius: 100px 100px 0 0;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SuccessfulAdoptions = () => {
  const dispatch = useDispatch();
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const dachshund = useSelector(
    (state: any) => state.dachshundPicturesVideosStatuses
  );
  let { error, dachshunds, loading } = dachshund;

  useEffect(() => {
    const itemsPerPage = 24;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(dachshunds?.slice(indexOfFirstItem, indexOfLastItem));
  }, [dachshunds, paginatedPage]);

  useEffect(() => {
    dispatch(getDogsByStatusPicturesAndVideours('Adopted'));
  }, [dispatch]);

  return (
    <>
      {loading && <HexagonLoader />}
      <div style={{ position: 'relative', marginTop: '56px' }}>
        <Image
          src={Successful}
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
          Successful Adoptions
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://unsplash.com/@nivia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
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
          Photo by Nivia Espinoza
        </Text>
      </div>
      {error && <Message variant='danger'>{error}</Message>}
      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='To Home'
            url='/'
            text2='On Hold'
            url2='/about/hold'
          />
          <RightArrow text='Rainbow Bridge' url='/about/rainbow-bridge' />
        </div>
        {loading && (
          <DogContainer>
            {[...Array(6).keys()].map((z: any, i: number) => (
              <LoadingImg key={i} w='100%' mw='300px' />
            ))}
          </DogContainer>
        )}
        <DogContainer lg={12}>
          {paginatedItems?.map((dachshund: any) => {
            return (
              <div
                key={dachshund.id}
                className='rounded d-flex justify-content-center h-100'
                style={{ position: 'relative' }}
              >
                <Card.Img
                  src={dachshund?.attributes?.photos[0] ?? NoImgDog}
                  alt='successful-adoption'
                  style={{
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                    maxWidth: '300px',
                    width: '100%',
                  }}
                />

                <TextContainer>
                  <Link
                    to={{
                      pathname: `/about/dachshund`,
                      state: {
                        dog: dachshund,
                        directBackTo: 'successful-adoptions',
                        pathName: 'Sucessful Adoptions',
                      },
                    }}
                    className='d-flex align-self-center'
                  >
                    <Text fontSize='18px' fontWeight={400}>
                      {dachshund?.attributes?.name.split('(')[0]}
                    </Text>
                  </Link>
                  <Text>
                    Adopted:{' '}
                    {formatDate(
                      dachshund?.attributes?.adoptedDate?.split('T')[0]
                    )}
                  </Text>
                </TextContainer>
              </div>
            );
          })}
        </DogContainer>
        <PaginationContainer>
          <Pagination className='my-3'>
            {rangeV2(dachshunds, paginatedPage, setPaginatedPage, 24)}
          </Pagination>
        </PaginationContainer>
      </Container>
    </>
  );
};

export default SuccessfulAdoptions;
