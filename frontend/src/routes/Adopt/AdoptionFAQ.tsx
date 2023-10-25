import React, { useState } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import { CardTitle, Text } from '../../components/styles/Styles';
import { faq } from '../../utils/faq';
import styled from 'styled-components';
import AdoptFaqHigh from '../../components/assets/adopt-faq-high.jpeg';
import AdoptFaqLow from '../../components/assets/adopt-faq-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';

const StyledAccordion = styled(Accordion)<{ isopen?: string }>`
  border: 1px solid ${({ theme }) => theme.text};
  button {
    background: ${({ theme, isopen }) =>
      isopen === 'true' ? theme.colors.quinary : theme.input.bg};
    div {
      color: ${({ theme, isopen }) =>
        isopen === 'true' ? theme.input.bg : ''};
    }
  }
  :hover {
    border: 1px solid ${({ theme }) => theme.colors.quinary};
  }
`;

const AdoptionFAQ = () => {
  const [idx, setIdx] = useState([]) as any;
  return (
    <>
      <Hero
        low={AdoptFaqLow}
        high={AdoptFaqHigh}
        title='Frequently Asked Questions'
        link='https://unsplash.com/@matias_ristenpart?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='MATÍAS ALEJANDRO'
      />
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
          <StyledAccordion
            key={index}
            className='mb-3'
            isopen={idx.includes(index).toString()}
          >
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
