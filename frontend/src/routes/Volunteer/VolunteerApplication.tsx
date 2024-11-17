import { Link } from 'react-router-dom';
import VolunteerAppHigh from '../../components/assets/volunteer-app-high.jpeg';
import { Fragment } from 'react';
import PageBanner from '../../components/common/PageBanner';

const VolunteerApplication = () => {
  return (
    <Fragment>
      <PageBanner imgSrc={VolunteerAppHigh} title='Volunteer Application' />
      <div className=' px-3'>
        <div className='max-w-screen-lg w-full mx-auto my-12'>
          <h1 className='font-Matter-Bold text-5xl text-teal-400 text-center mb-24'>
            Get Involved!
          </h1>
          <p className='font-Matter-Light text-lg text-center mb-3'>
            Would you like to donate to Little Paws?{' '}
            <Link to='/donate' className='text-teal-400 font-Matter-Regular'>
              Go to our donation page!
            </Link>
          </p>
          <p className='font-Matter-Light text-lg text-center mb-4'>
            Or would you rather give to Little Paws as you do your daily online shopping? Visit our{' '}
            <Link
              to={{ pathname: '/donate/shop-to-help' }}
              className='text-teal-400 font-Matter-Regular'
            >
              Shop to Help{' '}
            </Link>
            page to learn more.
          </p>
          <h3 className='font-Matter-Bold text-3xl text-zinc-700 text-center mb-6'>
            Join the Little Paws Family!
          </h3>
          <p className='font-Matter-Light text-lg mb-4'>
            We are always seeking new volunteers or fosters! Visit our{' '}
            <Link to='/volunteer/foster-application'>Foster Application</Link> or our{' '}
            <Link to='/volunteer/volunteer-application'>Volunteer Application</Link> page below.
          </p>
          <h3 className='font-Matter-Bold text-3xl text-zinc-700 text-center mb-6'>
            Are you crafty?
          </h3>
          <p className='font-Matter-Light text-lg mb-16'>
            We need your help! We are also looking for artists and crafters for our{' '}
            <Link to='/campaigns' className='text-teal-400 font-Matter-Regular'>
              upcoming auctions
            </Link>
            . Thank you for applying to volunteer with Little Paws Dachshund Rescue (LPDR)! This
            application will take 15 - 30 minutes to complete. We look forward to having you join
            our team. We rely on our volunteers to accomplish our mission of helping unwanted and
            abandoned animals find new homes, and we sincerely thank you for helping us to achieve
            that goal.
          </p>
          <div className='border-[1px] border-gray-200 rounded-xl py-4'>
            <iframe
              className='h-[600px] overflow-y-scroll'
              title='Volunteer-Application'
              width='100%'
              src='https://toolkit.rescuegroups.org/of/f?c=FPGYBJHM'
            ></iframe>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VolunteerApplication;
