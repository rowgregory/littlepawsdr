import React from 'react';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import MaskBtn from './MaskBtn';

const Container = styled.div`
  width: 100%;
  background: #2c2a3b;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 5.3125rem 0;
`;

const ContentContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Shop = () => {
  return (
    <Container>
      <ContentContainer>
        <Text
          fontSize='2rem'
          fontFamily='Duru Sans'
          color='#d89253'
          letterSpacing='-2px'
        >
          Check out our latest products
        </Text>
        <MaskBtn linkKey='/shop' textKey='LITTLE PAWS SHOP' />
      </ContentContainer>
    </Container>
  );
};

export default Shop;
