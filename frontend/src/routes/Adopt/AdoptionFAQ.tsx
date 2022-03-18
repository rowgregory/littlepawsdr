import React from 'react';
import { Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { StyledCard, CardTitle, Text } from '../../components/styles/Styles';
import { faq } from '../../utils/faq';

const AdoptionFAQ = () => {
  return (
    <Row>
      <Col>
        {faq().map((obj, i) => (
          <Accordion key={i} defaultActiveKey={`${0}`}>
            <StyledCard className='border-0'>
              <Col className='my-3'>
                <Accordion.Toggle
                  className='py-0 px-2'
                  as={Button}
                  variant='none'
                  eventKey={`${i}`}
                >
                  <CardTitle style={{ textAlign: 'left' }}>{obj.q}</CardTitle>
                </Accordion.Toggle>
              </Col>

              <Accordion.Collapse eventKey={`${i}`}>
                <Card.Body className='pt-0 px-4'>
                  <Text>{obj.a}</Text>
                </Card.Body>
              </Accordion.Collapse>
            </StyledCard>
          </Accordion>
        ))}
      </Col>
    </Row>
  );
};

export default AdoptionFAQ;
