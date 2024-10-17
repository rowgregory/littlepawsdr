import { useSelector } from 'react-redux';
import Hero from '../../components/Hero';
import DachshundCard from '../../components/DachshundCard';
import { RootState } from '../../redux/toolkitStore';
import { Fragment, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { AquaTile, NotAvaiableForAdoptionYet } from '../../components/assets';
import { useGetDachshundsByStatusMutation } from '../../redux/services/rescueGroupsApi';
import { NotAvailableForAdotionVideo } from '../../components/assets/videos';

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

const NotAvailableForAdoptionYet = () => {
  const dachshund = useSelector((state: RootState) => state.dachshund);
  const isMounted = useRef(false);

  const [getDachshunds] = useGetDachshundsByStatusMutation({
    selectFromResult: () => ({}),
  });

  if (!isMounted.current) {
    getDachshunds({ status: 'Hold' });
    isMounted.current = true;
  }

  return (
    <Fragment>
      <Hero src={NotAvailableForAdotionVideo} title='Not Available For Adoption Yet' />
      <div className='max-w-screen-lg w-full mx-auto mt-12 px-3'>
        <h1 className='font-Matter-Medium text-4xl text-teal-400 text-center mb-24'>
          In addition to our Dog&apos;s Available for Adoption page we&apos;re also sharing our dogs
          in foster homes being evaluated for future adoptions.
        </h1>
        <div className='grid grid-cols-12 gap-y-10 md:gap-10 items-center mb-24 w-full'>
          <div className='col-span-12 md:col-span-5 flex flex-col gap-y-5'>
            <h2 className='font-Matter-Bold text-3xl text-center'>
              These dogs are at different stages of the evaluation process. They are all safe,
              happy, and well cared for in their foster homes.
            </h2>
            <h4 className='font-Matter-Regular text-2xl text-center'>
              We&apos;re providing you with some basic information about each dog. We hope these
              dogs will be up for adoption soon and we will share additional details as they become
              available.
            </h4>
          </div>
          <img
            src={NotAvaiableForAdoptionYet}
            alt='Not Available for Adoption Yet'
            className='col-span-12 md:col-span-7 aspect-square object-cover w-full'
          />
        </div>
        <h3 className='text-3xl font-Matter-Bold text-slate-800 text-center mb-10'>
          Keep an eye on our Available Dogs page for updates on when your desired dog is ready for
          adoption. We&apos;ll gladly accept your application at that time!
        </h3>
        <SupportFoster to='/donate' className='flex w-full justify-center'>
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

export default NotAvailableForAdoptionYet;
