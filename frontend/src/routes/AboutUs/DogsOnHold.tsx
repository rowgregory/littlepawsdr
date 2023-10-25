import { useSelector } from 'react-redux';
import { Text } from '../../components/styles/Styles';
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
} from '../../components/styles/GridDogStyles';
import DachshundCard from '../../components/DachshundCard';

const DogsOnHold = () => {
  const state = useSelector((state: any) => state);
  const loading = state.dachshundPicturesVideosStatuses.loading;
  const allDahchshunds = state.dachshundPicturesVideosStatuses.dachshunds;
  const dachshundsOnHold = allDahchshunds?.filter(
    (dachshund: any) => dachshund.relationships.statuses.data[0].id === '17'
  );

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
        <Text maxWidth='700px' className='mb-3 mt-4 mx-auto' fontSize='16px'>
          These dogs are at different stages of the evaluation process. They are
          all safe, happy, and well cared for in their foster homes.
        </Text>
        <Text maxWidth='700px' className='my-3 mx-auto' fontSize='16px'>
          We’re providing you with some basic information about each dog. We
          hope these dogs will be up for adoption soon and we will share
          additional details as they become available.
        </Text>
        <Text maxWidth='700px' className='my-3 mx-auto' fontSize='16px'>
          Please continue to watch our Available Dogs page to see when a dog you
          may be interested in is ready for his or her forever home. That’s when
          we’ll be happy to accept an application from you
        </Text>
        <SupportFoster
          to='/donate'
          className='d-flex w-100 justify-content-center'
        >
          <div>Support a Foster Here</div>
        </SupportFoster>
        <DogContainer>
          {loading
            ? [...Array(3).keys()].map((z: any, i: number) => (
                <LoadingImg key={i} w='100%' mw='300px' />
              ))
            : dachshundsOnHold?.map((dachshund: any) => (
                <DachshundCard key={dachshund?.id} dachshund={dachshund} />
              ))}
        </DogContainer>
      </Container>
    </>
  );
};

export default DogsOnHold;
