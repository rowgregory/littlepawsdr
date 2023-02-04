import React, { useState } from 'react';
import { Card, Button, Accordion, Image } from 'react-bootstrap';
import { CardTitle, Text } from '../../components/styles/Styles';
import { faq } from '../../utils/faq';
import styled from 'styled-components';
import AdoptionFaqDog from '../../components/assets/adoption_faq_dog01.jpeg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';

const StyledAccordion = styled(Accordion)`
  background: ${({ theme }) => theme.input.bg};
  border: 1px solid ${({ theme }) => theme.text};
  :hover {
    border: 1px solid ${({ theme }) => theme.colors.quinary};
  }
`;

const AdoptionFAQ = () => {
  const [idx, setIdx] = useState([]) as any;
  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image
          src={AdoptionFaqDog}
          width='100%'
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Text
          fontWeight={500}
          fontSize='48px'
          color='#fff'
          style={{
            position: 'absolute',
            top: '200px',
            left: '50px',
            zIndex: 2,
          }}
        >
          Frequently Asked Questions
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://unsplash.com/@matias_ristenpart?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
              '_blank'
            )
          }
          fontWeight={500}
          fontSize='10px'
          color='#fff'
          cursor='pointer'
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
          }}
        >
          Photo by MATÍAS ALEJANDRO
        </Text>
      </div>
      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '128px',
          paddingInline: '16px',
        }}
      >
        <div
          className='w-100 d-flex justify-content-between mt-3'
          style={{ marginBottom: '96px' }}
        >
          <LeftArrow text='Home' url='/' text2='Fees' url2='/adopt/fees' />
          <RightArrow
            text='Transport Application'
            url='/adopt/transport-application'
          />
        </div>
        {faq().map((obj, index) => (
          <StyledAccordion key={index} className='mb-3'>
            <Accordion.Toggle
              as={Button}
              style={{ borderRadius: 'none !important' }}
              className='py-0 d-flex align-items-center justify-content-between w-100 faq'
              variant='none'
              eventKey={`${index}`}
              onClick={() => {
                if (idx.includes(index))
                  setIdx(idx.filter((i: any) => i !== index));
                else setIdx([...idx, index]);
              }}
            >
              <CardTitle className='mr-3 mx-auto'>{obj.q}</CardTitle>
              <Text className='p-3'>
                <i
                  className={`fas fa-chevron-${
                    !idx.includes(index) ? 'down' : 'up'
                  }`}
                ></i>
              </Text>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`${index}`}>
              <Card.Body
                className='w-100 pt-4 px-2 mx-auto'
                style={{ maxWidth: '600px' }}
              >
                <Text
                  fontWeight={300}
                  style={{
                    fontStyle: 'italic',
                    fontFamily: 'Montseratt, sans-serif',
                  }}
                >
                  {obj.a}
                </Text>
              </Card.Body>
            </Accordion.Collapse>
          </StyledAccordion>
        ))}
      </div>
    </>
  );
};

export default AdoptionFAQ;
