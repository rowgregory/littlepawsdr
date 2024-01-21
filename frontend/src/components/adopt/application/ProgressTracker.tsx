import styled from 'styled-components';
import React from 'react';
import { Text } from '../../styles/Styles';
import { useSelector } from 'react-redux';
import GearLoader from '../../Loaders/Gear';

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  margin-inline: auto;
  margin-block: 24px;
`;

const Step = styled.div<{ step: string }>`
  height: 27px;
  width: 27px;
  border-radius: 50%;
  background: ${({ step }) => (step === 'true' ? '#4cb71a' : '#eeeeee')};
  margin-bottom: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #fff;
  margin-inline: auto;
`;

const Line = styled.div<{ step: string }>`
  height: 3px;

  max-width: 150px;
  margin-inline: 16px;
  background: ${({ step }) => (step === 'true' ? '#4cb71a' : '#eeeeee')};
  position: absolute;
  top: 13px;
  &.line-1 {
    left: 50px;
    width: 80px;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      left: 74px;
      width: 89px;
    }
  }
  &.line-2 {
    left: 155px;
    width: 73px;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      left: 190px;
      width: 89px;
    }
  }
  &.line-3 {
    left: 253px;
    width: 73px;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      left: 305px;
      width: 89px;
    }
  }
`;

const StepAndTitleContainer = styled.div`
width: 79px;
`



interface ProgressTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  step: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
  };
  orderLoader?: boolean;
}

const ProgressTracker = (props: ProgressTrackerProps) => {
  const { step, orderLoader } = props;
  const state = useSelector((state: any) => state);
  const loadingAdoptionFeeCreate = state?.adoptionFeeCreate?.loading;
  const loadingAdoptionFeeCheckActiveSession =
    state?.adoptionFeeCheckActiveSession?.loading;

  return (
    <Container>
      <StepAndTitleContainer className='d-flex flex-column align-items-center'>
        <Step step={step?.step1?.toString()}>
          {step?.step2 ? <i className='fas fa-check text-white'></i> : 1}
        </Step>
        <Text>Accept Terms</Text>
      </StepAndTitleContainer>
      <Line step={step?.step2?.toString()} className='line-1'></Line>
      <StepAndTitleContainer className='d-flex flex-column align-items-center'>
        <Step step={step?.step2?.toString()}>
          {step?.step3 ? (
            <i className='fas fa-check text-white'></i>
          ) : loadingAdoptionFeeCheckActiveSession ? (
            <GearLoader color='#fff' size='fa-xl' />
          ) : (
            2
          )}
        </Step>
        <Text>Applicant Info</Text>
      </StepAndTitleContainer>
      <Line step={step?.step3?.toString()} className='line-2'></Line>
      <StepAndTitleContainer className='d-flex flex-column align-items-center'>
        <Step step={step?.step3?.toString()}>
          {step?.step4 ? (
            <i className='fas fa-check text-white'></i>
          ) : loadingAdoptionFeeCheckActiveSession ? (
            <GearLoader color='#fff' size='fa-xl' />
          ) : (
            3
          )}
        </Step>
        <Text>Payment</Text>
      </StepAndTitleContainer>
      <Line step={step?.step4?.toString()} className='line-3'></Line>
      <StepAndTitleContainer className='d-flex flex-column align-items-center'>
        <Step step={step?.step4?.toString()}>
          {step?.step4 ? (
            <i className='fas fa-check text-white'></i>
          ) : (loadingAdoptionFeeCreate || orderLoader) ? (
            <GearLoader color='#1a1a1a' size='fa-xl' />
          ) : (
            4
          )}
        </Step>
        <Text>Application</Text>
      </StepAndTitleContainer>
    </Container>
  );
};

export default ProgressTracker;
