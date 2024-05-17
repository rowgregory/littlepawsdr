import styled from 'styled-components';
import React from 'react';

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
  z-index: 10;
`;

const Line = styled.div<{ step: string }>`
  height: 3px;
  background: ${({ step }) => (step === 'true' ? '#4cb71a' : '#eeeeee')};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

interface ProgressTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  step: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
  }
}

const ProgressTracker = (props: ProgressTrackerProps) => {
  const { step } = props as any;

  return (
    <div className='max-w-[400px] w-full flex justify-between items-center relative mx-auto mt-6 mb-10 px-[20px]'>
      <Step step={step.step1.toString()}>
        {step.step2 ? <i className='fas fa-check text-white'></i> : '1'}
      </Step>
      <p className='absolute text-sm font-Matter-Light top-[29px] left-[13px]'>Terms</p>
      <Line step={step.step2.toString()} style={{ left: '10%', width: '25%' }} />
      <Step step={step.step2.toString()}>
        {step.step3 ? <i className='fas fa-check text-white'></i> : '2'}
      </Step>
      <p className='absolute text-sm font-Matter-Light top-[29px] left-[101px]'>Applicant Info</p>
      <Line step={step.step3.toString()} style={{ left: '38%', width: '25%' }} />
      <Step step={step.step3.toString()}>
        {step.step4 ? <i className='fas fa-check text-white'></i> : '3'}
      </Step>
      <p className='absolute text-sm font-Matter-Light top-[29px] right-[116px]'>Payment</p>
      <Line step={step.step4.toString()} style={{ left: '66%', width: '25%' }} />
      <Step step={step.step4.toString()}>
        {step.step4 ? <i className='fas fa-check text-white'></i> : '4'}
      </Step>
      <p className='absolute text-sm font-Matter-Light top-[29px] right-[-3px]'>Application</p>
    </div>
  );
};

export default ProgressTracker;
