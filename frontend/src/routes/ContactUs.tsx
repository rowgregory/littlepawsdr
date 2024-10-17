import { Fragment } from 'react';
import ContactHigh from '../components/assets/contact-high.jpg';
import ContactLow from '../components/assets/contact-low.jpg';
import Hero from '../components/Hero';

const ContactUs = () => {
  return (
    <Fragment>
      <Hero
        low={ContactLow}
        high={ContactHigh}
        title='Contact Us'
        link={`https://pixabay.com/users/kenway_photography-19020757/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5995679`}
        photographer='Jessica Dähne'
      />
      <div className='max-w-[980px] w-full mx-auto mb-24 px-4'>
        <p className='mb-4 mx-auto text-3xl mt-16'>
          If you have any questions, comments, or concerns please feel free to fill out our online
          contact form or email us at{' '}
          <a href='mailto:LPDR@littlepawsdr.org'>LPDR@littlepawsdr.org</a>
        </p>
        <p className='max-w-[680px]'>You will receive a confirmation email upon completion.</p>
        <div className='max-w-screen-md mx-auto border-[1px] border-gray-200 rounded-xl'>
          <iframe
            className='h-[600px] overflow-y-scroll'
            title='Contact Us'
            width='100%'
            src='https://toolkit.rescuegroups.org/of/f?c=WBTGVKTH'
          ></iframe>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactUs;
