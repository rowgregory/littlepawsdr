import DachshundCard from '../../components/DachshundCard';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotAvaiableForAdoptionYet, NotAvailableYet } from '../../components/assets';
import { useGetDachshundsByStatusMutation } from '../../redux/services/rescueGroupsApi';
import PageBanner from '../../components/common/PageBanner';

const NotAvailableForAdoptionYet = () => {
  const dachshund = useAppSelector((state: RootState) => state.dachshund);
  const [getDachshunds] = useGetDachshundsByStatusMutation();

  useEffect(() => {
    getDachshunds({ status: 'Hold' });
  }, [getDachshunds]);

  return (
    <>
      <PageBanner imgSrc={NotAvailableYet} title='Not Available For Adoption Yet' />
      <div className='max-w-screen-lg w-full mx-auto mt-12 px-3 mb-32'>
        <h1 className='font-matter-medium text-4xl text-teal-400 text-center mb-24'>
          In addition to our Dog&apos;s Available for Adoption page we&apos;re also sharing our dogs in foster homes being evaluated for future
          adoptions.
        </h1>
        <div className='grid grid-cols-12 gap-y-10 md:gap-10 items-center mb-24 w-full'>
          <div className='col-span-12 md:col-span-5 flex flex-col gap-y-5'>
            <h2 className='font-matter-bold text-3xl text-center'>
              These dogs are at different stages of the evaluation process. They are all safe, happy, and well cared for in their foster homes.
            </h2>
            <h4 className='font-matter-regular text-2xl text-center'>
              We&apos;re providing you with some basic information about each dog. We hope these dogs will be up for adoption soon and we will share
              additional details as they become available.
            </h4>
          </div>
          <img
            src={NotAvaiableForAdoptionYet}
            alt='Not Available for Adoption Yet'
            className='col-span-12 md:col-span-7 aspect-square object-cover w-full'
          />
        </div>
        <h3 className='text-3xl font-matter-bold text-slate-800 text-center mb-10'>
          Keep an eye on our Available Dogs page for updates on when your desired dog is ready for adoption. We&apos;ll gladly accept your application
          at that time!
        </h3>

        {/* Support Foster Link with animated background */}
        <Link
          to='/donate'
          className="relative overflow-hidden block py-16 mt-24 text-center rounded-lg text-white text-2xl font-semibold no-underline before:absolute before:inset-0 before:bg-[url('/src/components/assets/aqua_tile.jpg')] before:bg-repeat before:z-[-1] hover:before:animate-moveLeft"
        >
          Support a Foster Here
        </Link>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-20'>
          {dachshund.dachshunds?.map((d: any) => (
            <DachshundCard key={d?.id} dachshund={d} />
          ))}
        </div>
      </div>
    </>
  );
};

export default NotAvailableForAdoptionYet;
