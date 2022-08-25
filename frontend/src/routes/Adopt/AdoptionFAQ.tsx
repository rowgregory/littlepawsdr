import React, { useState } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import { CardTitle, Text } from '../../components/styles/Styles';
import { faq } from '../../utils/faq';
import styled from 'styled-components';

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[3]};
  margin: 1rem;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 2rem 0 5rem 0;
  }
`;

const StyledAccordion = styled(Accordion)`
  background: ${({ theme }) => theme.input.bg};
  padding: 1rem;
  margin-inline: 1rem;
  border-radius: 0.875rem;
`;

const AdoptionFAQ = () => {
  const [idx, setIdx] = useState([]) as any;
  return (
    <Container>
      {faq().map((obj, index) => (
        <StyledAccordion key={index} className='mb-3'>
          <Accordion.Toggle
            as={Button}
            className='py-0 px-2 d-flex align-items-center justify-content-between w-100'
            variant='none'
            eventKey={`${index}`}
            onClick={() => {
              if (idx.includes(index))
                setIdx(idx.filter((i: any) => i !== index));
              else setIdx([...idx, index]);
            }}
          >
            <CardTitle className='mr-3' style={{ textAlign: 'left' }}>
              {obj.q}
            </CardTitle>
            <Text>
              <i
                className={`fas fa-chevron-${
                  !idx.includes(index) ? 'down' : 'up'
                }`}
              ></i>
            </Text>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={`${index}`}>
            <Card.Body className='pt-2 px-2'>
              <Text>{obj.a}</Text>
            </Card.Body>
          </Accordion.Collapse>
        </StyledAccordion>
      ))}
    </Container>
  );
};

export default AdoptionFAQ;
