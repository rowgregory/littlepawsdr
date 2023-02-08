import React, { useEffect, useState } from 'react';
import { Card, Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getDogsByStatusPicturesAndVideours } from '../../actions/dachshundsActions';
import { Link } from 'react-router-dom';
import { Text } from '../../components/styles/Styles';
import { LoadingImg } from '../../components/LoadingImg';
import RainbowHigh from '../../components/assets/rainbow-high.jpeg';
import RainbowLow from '../../components/assets/rainbow-low.jpg';
import NoImgDog from '../../components/assets/no_image_dog.jpg';
import { PaginationContainer } from '../../components/styles/admin/Styles';
import { rangeV2 } from '../../components/common/Pagination';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import {
  Container,
  DogContainer,
  TextContainer,
} from '../../components/styles/GridDogStyles';

const RainbowBridge = () => {
  const dispatch = useDispatch();
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const dachshund = useSelector(
    (state: any) => state.dachshundPicturesVideosStatuses
  );
  const { dachshunds, loading } = dachshund;

  useEffect(() => {
    const itemsPerPage = 12;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(dachshunds?.slice(indexOfFirstItem, indexOfLastItem));
  }, [dachshunds, paginatedPage]);

  useEffect(() => {
    dispatch(getDogsByStatusPicturesAndVideours('Passed Away'));
  }, [dispatch]);

  return (
    <>
      <Hero
        low={RainbowLow}
        high={RainbowHigh}
        title='Rainbow Bridge'
        link='https://unsplash.com/@hannesnetzell?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='Hannes Netzell'
      />

      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Successful Adoptions'
            url2='/about/successful-adoptions'
          />
          <RightArrow text='Donate' url='/donate' />
        </div>
        <Text
          fontSize='32px'
          marginTop='56px'
          fontWeight={400}
          className='mb-3 mx-auto text-center'
        >
          The Little Paws Family cherishes each and every dog that joins our
          rescue.
        </Text>
        <Text className='mb-3 mt-4 text-center' fontSize='16px'>
          We find comfort that they were all loved and well cared for in their
          foster and forever homes.
        </Text>
        <Text className='mb-3 mt-4 text-center' fontSize='16px'>
          We will miss you forever, and see you at the Rainbow Bridge. 🌈
        </Text>
        {loading && (
          <DogContainer>
            {[...Array(3).keys()].map((z: any, i: number) => (
              <LoadingImg key={i} w='100%' mw='300px' />
            ))}
          </DogContainer>
        )}
        <DogContainer lg={12}>
          {paginatedItems?.map((dachshund: any) => (
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
                      directBackTo: 'rainbow-bridge',
                      pathName: 'Rainbow Bridge',
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

export default RainbowBridge;
