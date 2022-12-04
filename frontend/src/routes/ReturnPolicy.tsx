import React from 'react';
import styled from 'styled-components';
import { Text } from '../components/styles/Styles';

const Container = styled.div`
  maxwidth: 1450px;
  width: 100%;
  padding-inline: 16px;
  margin-block: 128px;
`;

const ReturnPolicy = () => {
  return (
    <Container>
      <Text fontSize='30px' fontWeight={600} marginBottom='20px'>
        RETURN POLICY
      </Text>
      <Text fontSize='15px' fontWeight={400} marginBottom='48px'>
        Last updated December 03, 2022
      </Text>
      <Text fontSize='22px' fontWeight={600} marginBottom='20px'>
        REFUNDS
      </Text>
      <Text fontSize='15px' fontWeight={400} marginBottom='48px'>
        All sales are final and no refund will be issued.
      </Text>
      <Text fontSize='22px' fontWeight={600} marginBottom='20px'>
        QUESTIONS
      </Text>
      <Text fontSize='15px' fontWeight={400} marginBottom='18px'>
        If you have any questions concerning our return policy, contact us at:
      </Text>
      <Text fontSize='15px' fontWeight={400} marginBottom='18px'>
        lpdr@littlepawsdr.org
      </Text>
    </Container>
  );
};

export default ReturnPolicy;
