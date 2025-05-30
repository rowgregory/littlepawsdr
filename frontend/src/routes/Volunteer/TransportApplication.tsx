import { Fragment } from 'react';
import TransportAppHigh from '../../components/assets/transport-app-high.jpg';
import PageBanner from '../../components/common/PageBanner';

const TransportApplication = () => {
  return (
    <Fragment>
      <PageBanner imgSrc={TransportAppHigh} title='Transport Application' />
      <div className='px-3'>
        <div className='max-w-screen-lg w-full mx-auto my-12'>
          <h1 className='font-Matter-Bold text-5xl text-teal-400 text-center mb-24'>
            Streamlining Dachshund Rescue Transport
          </h1>
          <p className='font-Matter-Light text-lg mb-16'>
            This application supports Little Paws Dachshund Rescue by simplifying the logistics of
            moving rescued dachshunds between locations. It allows for seamless coordination of
            transport routes and volunteer assignments, ensuring that every dog reaches their new
            home with the utmost care and efficiency.
          </p>
          <div className='border-[1px] border-gray-200 rounded-xl py-4'>
            <iframe
              className='h-[600px] overflow-y-scroll'
              title='Transport Application'
              width='100%'
              src='https://toolkit.rescuegroups.org/of/f?c=PKYHTHRH'
            >
              TransportApplication
            </iframe>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TransportApplication;
