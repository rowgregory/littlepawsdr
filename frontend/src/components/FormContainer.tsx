import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children, overflow }: any) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col
          xs={12}
          sm={12}
          md={10}
          xl={12}
          style={{ overflow: overflow ? overflow : '' }}
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
