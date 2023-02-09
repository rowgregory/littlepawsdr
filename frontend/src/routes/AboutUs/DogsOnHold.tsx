import React, { useEffect, useState } from 'react';
import { Pagination, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getDogsByStatusPicturesAndVideours } from '../../actions/dachshundsActions';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { Text } from '../../components/styles/Styles';
import NoImgDog from '../../components/assets/no_image_dog.jpg';
import { PaginationContainer } from '../../components/styles/admin/Styles';
import { rangeV2 } from '../../components/common/Pagination';
import OnHoldHigh from '../../components/assets/notavailable.jpg';
import OnHoldLow from '../../components/assets/notavailable-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import { LoadingImg } from '../../components/LoadingImg';
import Hero from '../../components/Hero';
import {
  Container,
  DogContainer,
  SupportFoster,
  TextContainer,
} from '../../components/styles/GridDogStyles';

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
      <Hero
        low={OnHoldLow}
        high={OnHoldHigh}
        title='Not Available For Adoption Yet'
        link='https://www.pexels.com/photo/close-up-of-sausage-dog-on-leash-10606528/'
        photographer='TranStudios Photography & Video'
      />
      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow text='Home' url='/' text2='Surrender' url2='/surrender' />
          <RightArrow
            text='Successful Adoptions'
            url='/about/successful-adoptions'
          />
        </div>
        <Text
          fontSize='32px'
          marginTop='56px'
          fontWeight={400}
          className='text-center'
        >
          In addition to our Dog’s Available for Adoption page we’re also
          sharing our dogs in foster homes being evaluated for future adoptions.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='16px'>
          These dogs are at different stages of the evaluation process. They are
          all safe, happy, and well cared for in their foster homes.
        </Text>
        <Text maxWidth='680px' className='my-3 mx-auto' fontSize='16px'>
          We’re providing you with some basic information about each dog. We
          hope these dogs will be up for adoption soon and we will share
          additional details as they become available.
        </Text>
        <Text maxWidth='680px' className='my-3 mx-auto' fontSize='16px'>
          Please continue to watch our Available Dogs page to see when a dog you
          may be interested in is ready for his or her forever home. That’s when
          we’ll be happy to accept an application from you
        </Text>
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
                alt={`${dachshund?.attributes?.name} will be ready for adoption soon!`}
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
            {rangeV2(dachshunds, paginatedPage, setPaginatedPage, 21)}
          </Pagination>
        </PaginationContainer>
      </Container>
    </>
  );
};

export default DogsOnHold;
