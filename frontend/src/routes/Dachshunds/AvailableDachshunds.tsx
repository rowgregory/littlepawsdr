import { Fragment, useRef } from 'react';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import { useGetDachshundsByStatusMutation } from '../../redux/services/rescueGroupsApi';
import { AdoptAppHigh } from '../../components/assets';
import AvailableDachshundCard from '../../components/common/AvailableDachshundCard';
import HowToAdoptDachshunds from '../../components/dachshund/HowToAdoptDachshunds';
import SideBySideDachshunds from '../../components/dachshund/SideBySideDachshunds';
import AboutLittlePaws from '../../components/dachshund/AboutLittlePaws';
import PageBanner from '../../components/common/PageBanner';

const AvailableDachshunds = () => {
  const isMounted = useRef(false);
  const dachshund = useAppSelector((state: RootState) => state.dachshund);

  const [getDachshunds] = useGetDachshundsByStatusMutation({
    selectFromResult: () => ({}),
  });

  if (!isMounted.current) {
    getDachshunds({ status: 'Available' });
    isMounted.current = true;
  }

  return (
    <Fragment>
      <PageBanner imgSrc={AdoptAppHigh} title='Available Dachshunds' />
      <div className='pt-28'>
        <section className='max-w-screen-xl w-full mx-auto flex flex-col items-center justify-center'>
          <h1 className='text-xl text-teal-400 font-QBold mb-4'>Meet The Dachshunds</h1>
          <h2 className='text-5xl text-charcoal font-QBold mb-4 text-center'>
            Available For Adoption
          </h2>
          <p className='font-QLight max-w-screen-sm w-full text-center px-3'>
            Waiting for a loving family to give them the care and attention they deserve, one paw at
            a time, through Little Paws Dachshund Rescue.
          </p>
        </section>
        <div className='px-4'>
          <section className='pt-12 mb-24 max-w-screen-xl w-full mx-auto'>
            <div className='grid grid-cols-12 gap-y-12 sm:gap-12'>
              {dachshund?.dachshunds?.map((obj, i) => (
                <AvailableDachshundCard key={i} obj={obj} />
              ))}
            </div>
          </section>
        </div>
        <section className='px-4'>
          <SideBySideDachshunds dachshunds={dachshund?.dachshunds} />
        </section>
        <section className='px-4'>
          <AboutLittlePaws />
        </section>
        <section className='bg-[#f2f2ee]'>
          <HowToAdoptDachshunds />
        </section>
      </div>
    </Fragment>
  );
};

export default AvailableDachshunds;
