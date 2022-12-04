import React from 'react';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import Dog404 from '../../components/assets/404_dog01.png';

const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageNotFound = () => (
  <Container>
    <Image src={Dog404} style={{ maxWidth: '500px', width: '100%' }} />
  </Container>
);

export default PageNotFound;
