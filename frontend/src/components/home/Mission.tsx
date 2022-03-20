import React from 'react';
import { Col, Image } from 'react-bootstrap';
import styled from 'styled-components';
import { missionStatementData } from '../../utils/homeData';
import { SectionTitle } from './styles';

export const MissionContainer = styled(Col)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  width: 100%;
  margin: 0 auto;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const MissionCard = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MissionImg = styled(Image)`
  max-width: '';
  max-height: '';
  width: 100%;
  height: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;

export const MissionBodyContainer = styled.div`
  backdrop-filter: blur(15px);
`;

export const MissionTitle = styled.h3<{ title?: string }>`
  font-family: 'Ubuntu', sans-serif;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  margin: 2rem auto;
  text-align: center;
  position: relative;
`;

export const MissionStatement = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.text};
  padding: 0 3rem 3rem;
`;

const SectionContainer = styled.div`
  margin: 0 48px 84px;
`;

const Mission = () => {
  return (
    <SectionContainer>
      <SectionTitle to='/adopt'>Mission</SectionTitle>
      <MissionContainer className='px-0'>
        {missionStatementData().map((d) => (
          <MissionCard key={d.title}>
            <Col className='d-flex flex-column px-0 align-items-center'>
              <div>
                <MissionImg src={d?.image} alt={d?.title.replace(' ', '-')} />
              </div>
              <MissionBodyContainer>
                <MissionTitle title={d?.title}>{d?.title}</MissionTitle>
                <MissionStatement>{d?.text}</MissionStatement>
              </MissionBodyContainer>
            </Col>
          </MissionCard>
        ))}
      </MissionContainer>
    </SectionContainer>
  );
};

export default Mission;
