import { Fragment } from 'react';
import { faq } from '../../components/data/adopt/faq';
import AdoptFaqHigh from '../../components/assets/adopt-faq-high.jpeg';
import Accordion from '../../components/common/Accordion';
import PageBanner from '../../components/common/PageBanner';

const AdoptionFAQ = () => {
  return (
    <Fragment>
      <PageBanner imgSrc={AdoptFaqHigh} title='Frequently Asked Questions' />
      <div className='max-w-screen-lg w-full mx-auto my-12 px-3'>
        <Accordion items={faq} />
      </div>
    </Fragment>
  );
};

export default AdoptionFAQ;
