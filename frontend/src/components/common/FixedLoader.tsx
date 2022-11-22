import React from 'react';
import styled from 'styled-components';
import Loader from '../Loader';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
  background: rgb(0 0 0/0.25);
`;

const FixedLoader = () => (
  <Container>
    <Loader />
  </Container>
);

export default FixedLoader;
