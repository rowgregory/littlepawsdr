import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '../../components/styles/Styles';
import { LoadingImg } from '../../components/LoadingImg';
import RainbowHigh from '../../components/assets/rainbow-high.jpeg';
import RainbowLow from '../../components/assets/rainbow-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import {
  Container,
  DogContainer,
  LoadMoreBtn,
} from '../../components/styles/GridDogStyles';
import DachshundCard from '../../components/DachshundCard';

const RainbowBridge = () => {
  const [displayCount, setDisplayCount] = useState(50);
  const state = useSelector((state: any) => state);
  const loading = state.dachshundPicturesVideosStatuses.loading;
  const allDahchshunds = state.dachshundPicturesVideosStatuses.dachshunds;
  const rainbowBridge = allDahchshunds?.filter(
    (dachshund: any) => dachshund.relationships.statuses.data[0].id === '7'
  );

  const displayedData = rainbowBridge?.slice(0, displayCount);

  const loadMore = () => {
    setDisplayCount(displayCount + 50);
  };

  return (
    <>
      <Hero
        low={RainbowLow}
        high={RainbowHigh}
        title='Rainbow Bridge'
        link='https://unsplash.com/@hannesnetzell?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='Hannes Netzell'
        gradient='#e6261f,#eb7532,#f7d038,#a3e048,#49da9a,#34bbe6,#4355db,#d23be7,#4355db,#34bbe6,#49da9a,#a3e048,#f7d038,#eb7532,#e6261f'
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
        <DogContainer>
          {displayedData?.map((dachshund: any) => (
            <DachshundCard key={dachshund?.id} dachshund={dachshund} />
          ))}
        </DogContainer>
        {displayCount < rainbowBridge?.length && (
          <LoadMoreBtn onClick={loadMore}>Load More</LoadMoreBtn>
        )}
      </Container>
    </>
  );
};

export default RainbowBridge;
