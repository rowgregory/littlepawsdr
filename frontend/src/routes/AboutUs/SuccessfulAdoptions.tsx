import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '../../components/styles/Styles';
import { LoadingImg } from '../../components/LoadingImg';
import SuccessfulHigh from '../../components/assets/successful-high.jpeg';
import SuccessfulLow from '../../components/assets/successful-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import {
  Container,
  DogContainer,
  LoadMoreBtn,
} from '../../components/styles/GridDogStyles';
import DachshundCard from '../../components/DachshundCard';

const SuccessfulAdoptions = () => {
  const [displayCount, setDisplayCount] = useState(50);
  const state = useSelector((state: any) => state);
  const loading = state.dachshundPicturesVideosStatuses.loading;
  const allDahchshunds = state.dachshundPicturesVideosStatuses.dachshunds;
  const successfulAdoptions = allDahchshunds?.filter(
    (dachshund: any) => dachshund.relationships.statuses.data[0].id === '3'
  );

  const displayedData = successfulAdoptions?.slice(0, displayCount);

  const loadMore = () => {
    setDisplayCount(displayCount + 50);
  };

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
        {}
        <DogContainer>
          {loading
            ? [...Array(3).keys()].map((_: any, i: number) => (
                <LoadingImg key={i} w='100%' mw='300px' />
              ))
            : displayedData?.map((dachshund: any) => (
                <DachshundCard
                  key={dachshund.id}
                  dachshund={dachshund}
                  type='successful-adoptions'
                />
              ))}
        </DogContainer>
        {displayCount < successfulAdoptions?.length && (
          <LoadMoreBtn onClick={loadMore}>Load More</LoadMoreBtn>
        )}
      </Container>
    </>
  );
};

export default SuccessfulAdoptions;
