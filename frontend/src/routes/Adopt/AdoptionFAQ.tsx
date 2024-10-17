import { Fragment, useState } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import { faq } from '../../utils/faq';
import AdoptFaqHigh from '../../components/assets/adopt-faq-high.jpeg';
import Hero from '../../components/Hero';

const AdoptionFAQ = () => {
  const [idx, setIdx] = useState([]) as any;
  return (
    <Fragment>
      <Hero
        src={AdoptFaqHigh}
        title='Frequently Asked Questions'
        link='https://unsplash.com/@matias_ristenpart?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='MATÍAS ALEJANDRO'
      />
      <div className='max-w-screen-lg w-full mx-auto mt-12 px-3'>
        {faq().map((obj, index) => (
          <Accordion key={index} className={`border-[1px] border-zinc-200 hover:border-teal-400 mb-3 rounded-2xl`}>
            <Accordion.Toggle
              as={Button}
              className={`${
                idx.includes(index) ? 'bg-teal-400 text-white rounded-tl-2xl rounded-tr-2xl rounded-br-0 rounded-bl-0 hover:bg-teal-500' : 'rounded-2xl'
              } duration-0 py-0 flex items-center justify-between w-full border-none hover:no-underline focus:outline-none focus:shadow-none hover:bg-teal-400 hover:shadow-lg group`}
              variant='none'
              eventKey={`${index}`}
              onClick={() => {
                if (idx.includes(index)) setIdx(idx.filter((i: any) => i !== index));
                else setIdx([...idx, index]);
              }}
            >
              <p
                className={`${
                  idx.includes(index) ? 'text-white' : ''
                } mr-3 font-Matter-Regular tracking-wide mx-auto group-hover:text-white`}
              >
                {obj.q}
              </p>
              <p className='p-3'>
                <i className={`fas fa-chevron-${!idx.includes(index) ? 'down' : 'up text-white'} group-hover:text-white`}></i>
              </p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`${index}`}>
              <Card.Body className='w-full pt-4 px-2 mx-auto max-w-screen-sm'>
                <p className='font-Matter-Light'>{obj.a}</p>
              </Card.Body>
            </Accordion.Collapse>
          </Accordion>
        ))}
      </div>
    </Fragment>
  );
};

export default AdoptionFAQ;
