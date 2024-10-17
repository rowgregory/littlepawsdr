import { Fragment } from 'react';
import TransportAppHigh from '../../components/assets/transport-app-high.jpg';
import Hero from '../../components/Hero';

const TransportApplication = () => {
  return (
    <Fragment>
      <Hero
        src={TransportAppHigh}
        title='Transport Application'
        link='https://www.pexels.com/photo/black-yellow-and-green-swing-1686790/'
        photographer='Visually Us'
      />
      <div className='max-w-screen-lg w-full mx-auto mt-12 px-3'>
        <h1 className='font-Matter-Bold text-5xl text-teal-400 text-center mb-24'>
          Streamlining Dachshund Rescue Transport
        </h1>
        <p className='font-Matter-Light text-lg mb-16'>
          This application supports Little Paws Dachshund Rescue by simplifying the logistics of
          moving rescued dachshunds between locations. It allows for seamless coordination of
          transport routes and volunteer assignments, ensuring that every dog reaches their new home
          with the utmost care and efficiency.
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
    </Fragment>
  );
};

export default TransportApplication;
