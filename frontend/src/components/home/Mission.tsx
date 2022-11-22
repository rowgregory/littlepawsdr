import React from 'react';
import styled from 'styled-components';
import MaskBtn from './MaskBtn';
import Logo from '../../components/assets/logo-background-transparent-purple.png';
import { Image } from 'react-bootstrap';
import { Text } from '../styles/Styles';

export const MissionContainer = styled.div`
  background: ${({ theme }) => theme.secondaryBg};
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 128px 16px;
  flex-direction: column;
`;

const StatementAndLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 980px;
  width: 100%;
  margin-inline: auto;
  margin-bottom: 96px;
`;

export const MissionStatement = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 32px;
`;

const Mission = () => {
  return (
    <MissionContainer>
      <StatementAndLinkContainer>
        <Image
          src={Logo}
          width='100%'
          style={{ maxWidth: '250px', objectFit: 'cover', margin: '0 auto' }}
        />
        <Text
          fontSize='32px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
        >
          LITTLE PAWS DACHSHUND RESCUE is an east coast based 501(c)3 exempt
          nonprofit dedicated to the rescue and re-homing of our favorite short
          legged breed
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          We specialize in finding permanent homes for dachshund and dachshund
          mixes. We strive to make the lives of all dogs better through action,
          advocacy, awareness and education.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          It is LPDR’s goal to identify abandoned, mistreated, or homeless dogs
          and oversee their treatment and wellbeing while working to find loving
          owners for those in our care.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          If you are looking for a new family member take a look at our
          available dachshund and dachshund mixes.
        </Text>
        <div style={{ marginInline: 'auto', marginTop: '64px' }}>
          <MaskBtn
            linkKey='/about/successful-adoptions'
            textKey='VIEW SUCCESSFUL ADOPTIONS'
          />
        </div>
      </StatementAndLinkContainer>
    </MissionContainer>
  );
};

export default Mission;
