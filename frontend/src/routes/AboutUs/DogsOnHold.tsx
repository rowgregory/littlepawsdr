import { useSelector } from 'react-redux';
import { Text } from '../../components/styles/Styles';
import OnHoldHigh from '../../components/assets/notavailable.jpg';
import OnHoldLow from '../../components/assets/notavailable-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import DachshundCard from '../../components/DachshundCard';
import { RootState } from '../../redux/toolkitStore';
import { Fragment, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { AquaTile } from '../../components/assets';
import { useGetDachshundsByStatusMutation } from '../../redux/services/rescueGroupsApi';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';

const MoveLeft = keyframes`
 0% {
    background-position: 0 0;
 }
 100% {
    background-position: -100% 0;
 }
`;

const SupportFoster = styled(Link)`
  padding-block: 60px;
  margin-top: 96px;
  position: relative;
  overflow: hidden;
  text-decoration: none !important;
  &:before {
    content: '';
    position: absolute;
    background: url(${AquaTile});
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
  div {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    :hover {
      text-decoration: none;
    }
  }
`;

const DogsOnHold = () => {
  const dachshund = useSelector((state: RootState) => state.dachshund);

  const [getDachshunds, { isLoading }] = useGetDachshundsByStatusMutation({
    selectFromResult: () => ({}),
  });

  useEffect(() => {
    getDachshunds({ status: 'Hold' });
  }, [getDachshunds]);

  if (isLoading) return <GreenRotatingTransparentCircle />;

  return (
    <Fragment>
      <Hero
        low={OnHoldLow}
        high={OnHoldHigh}
        title='Not Available For Adoption Yet'
        link='https://www.pexels.com/photo/close-up-of-sausage-dog-on-leash-10606528/'
        photographer='TranStudios Photography & Video'
      />
      <div className='max-w-screen-xl w-full mx-auto mb-24 px-3'>
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
        <div className='grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-20'>
          {dachshund.dachshunds?.map((dachshund: any) => (
            <DachshundCard key={dachshund?.id} dachshund={dachshund} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default DogsOnHold;
