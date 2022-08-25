import React from 'react';
import styled from 'styled-components';
import { missionStatementData_V2 } from '../../utils/homeData';
import MaskBtn from './MaskBtn';

export const MissionContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 100px 1rem 150px;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    max-width: 900px;
    flex-direction: row;
    width: 100%;
    padding: 48px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    max-width: 1100px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    max-width: 1300px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    max-width: 1500px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[5]}) {
    max-width: 1700px;
  }
`;

const RescueTitle = styled.div`
  padding-right: 40px;
  width: 100%;
  margin-bottom: 2rem;
  font-family: Duru Sans;
  font-size: 28px;
  color: ${({ theme }) => theme.text};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 40%;
    display: flex;
    justify-content: flex-end;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    padding-right: 80px;
    width: 40%;
  }
`;

const StatementAndLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: flex;
    justify-content: flex-end;
    padding-left: 40px;
    width: 60%;
    border-left: 1px solid rgb(0, 0, 0, 0.1);
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    padding-left: 80px;
    display: flex;
    justify-content: flex-end;
  }
`;

export const MissionStatement = styled.div`
  font-family: 'Duru Sans';
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  line-height: 2;
  margin-bottom: 2rem;
`;

const Mission = () => {
  return (
    <MissionContainer>
      <RescueTitle>Little Paws Dachshund Rescue</RescueTitle>
      <StatementAndLinkContainer>
        <MissionStatement>{missionStatementData_V2()}</MissionStatement>
        <MaskBtn
          linkKey='/about/successful-adoptions'
          textKey='VIEW SUCCESSFUL ADOPTIONS'
        />
      </StatementAndLinkContainer>
    </MissionContainer>
  );
};

export default Mission;
