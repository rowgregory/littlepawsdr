import React, { useState } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import { CardTitle, Text } from '../../components/styles/Styles';
import { faq } from '../../utils/faq';
import styled from 'styled-components';

const StyledAccordion = styled(Accordion)`
  background: ${({ theme }) => theme.input.bg};
  border: 1px solid ${({ theme }) => theme.text};
`;

const AdoptionFAQ = () => {
  const [idx, setIdx] = useState([]) as any;
  return (
    <>
      <Text
        fontFamily='EB Garamond'
        fontSize='3.75rem'
        marginBottom='3rem'
        textAlign='center'
      >
        Frequently Asked Questions
      </Text>
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
    </>
  );
};

export default AdoptionFAQ;
