import styled from 'styled-components';
import React from 'react';
import { Text } from '../../styles/Styles';
import { useSelector } from 'react-redux';
import GearLoader from '../../Loaders/Gear';

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-inline: auto;
  margin-block: 24px;
`;

const Step = styled.div<{ step: string }>`
  height: 27px;
  width: 27px;
  border-radius: 50%;
  background: ${({ step }) => (step === 'true' ? '#4cb71a' : '#dddddd')};
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
  width: 124px;
  max-width: 150px;
  margin-inline: 16px;
  background: ${({ step }) => (step === 'true' ? '#4cb71a' : '#eeeeee')};
  position: absolute;
  top: 13px;
  &.line-1 {
    left: 45px;
  }
  &.line-2 {
    left: 211px;
  }
`;



interface ProgressTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  step: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
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
      <div className='d-flex flex-column align-items-center'>
        <Step step={step.step1.toString()}>
          {step.step2 ? <i className='fas fa-check text-white'></i> : 1}
        </Step>
        <Text>Accept Terms</Text>
      </div>
      <Line step={step.step2.toString()} className='line-1'></Line>
      <div className='d-flex flex-column align-items-center'>
        <Step step={step.step2.toString()}>
          {step.step3 ? (
            <i className='fas fa-check text-white'></i>
          ) : loadingAdoptionFeeCheckActiveSession ? (
            <GearLoader color='#fff' size='fa-xl' />
          ) : (
            2
          )}
        </Step>
        <Text>Payment</Text>
      </div>
      <Line step={step.step3.toString()} className='line-2'></Line>
      <div className='d-flex flex-column align-items-center'>
        <Step step={step.step3.toString()}>
          {step.step3 ? (
            <i className='fas fa-check text-white'></i>
          ) : (loadingAdoptionFeeCreate || orderLoader) ? (
            <GearLoader color='#1a1a1a' size='fa-xl' />
          ) : (
            3
          )}
        </Step>

        <Text>Application</Text>
      </div>
    </Container>
  );
};

export default ProgressTracker;
