import React, { useEffect, useState } from 'react';
import { Card, Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getDogsByStatusPicturesAndVideours } from '../../actions/dachshundsActions';
import { Link } from 'react-router-dom';
import { Text } from '../../components/styles/Styles';
import { formatDate } from '../../utils/formatDate';
import { LoadingImg } from '../../components/LoadingImg';
import SuccessfulHigh from '../../components/assets/successful-high.jpeg';
import SuccessfulLow from '../../components/assets/successful-low.jpg';
import { PaginationContainer } from '../../components/styles/admin/Styles';
import { rangeV2 } from '../../components/common/Pagination';
import NoImgDog from '../../components/assets/no_image_dog.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import {
  Container,
  DogContainer,
  TextContainer,
} from '../../components/styles/GridDogStyles';

const SuccessfulAdoptions = () => {
  const dispatch = useDispatch();
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const dachshund = useSelector(
    (state: any) => state.dachshundPicturesVideosStatuses
  );
  let { dachshunds, loading } = dachshund;

  useEffect(() => {
    const itemsPerPage = 30;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(dachshunds?.slice(indexOfFirstItem, indexOfLastItem));
  }, [dachshunds, paginatedPage]);

  useEffect(() => {
    dispatch(getDogsByStatusPicturesAndVideours('Adopted'));
  }, [dispatch]);

  return (
    <>
      <Hero
        low={SuccessfulLow}
        high={SuccessfulHigh}
        title='Successful Adoptions'
        link='https://unsplash.com/@nivia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='Nivia Espinoza'
      />
      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Not Available for Adoption Yet'
            url2='/about/hold'
          />
          <RightArrow text='Rainbow Bridge' url='/about/rainbow-bridge' />
        </div>
        <Text
          fontSize='32px'
          marginTop='56px'
          fontWeight={400}
          className='mb-3 mx-auto text-center'
        >
          Successful Adoptions are why we rescue!
        </Text>
        <Text className='mb-3 mt-4 text-center' fontSize='16px'>
          We love seeing happy dachshunds living their best lives
        </Text>
        <Text className='mb-3 mt-4 text-center' fontSize='16px'>
          Share your updates and photos of your adopted Little Paws doxie with
          us on our social media pages!
        </Text>
        {loading && (
          <DogContainer>
            {[...Array(3).keys()].map((z: any, i: number) => (
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
                  loading='lazy'
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
                    {
                      formatDate(
                        dachshund?.attributes?.adoptedDate?.split('T')[0]
                      ).split(',')[0]
                    }
                  </Text>
                </TextContainer>
              </div>
            );
          })}
        </DogContainer>
        <PaginationContainer>
          <Pagination className='my-3'>
            {rangeV2(dachshunds, paginatedPage, setPaginatedPage, 30)}
          </Pagination>
        </PaginationContainer>
      </Container>
    </>
  );
};

export default SuccessfulAdoptions;
