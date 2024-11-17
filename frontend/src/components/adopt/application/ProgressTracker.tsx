import { FC } from 'react';
import { ProgressTrackerProps } from '../../../types/adopt-types';

const styles = (step: boolean) => ({
  line: `h-[3px] w-1/3 absolute top-1/2 -translate-1/2 ${step ? 'bg-teal-400' : 'bg-gray-200'}`,
  p: `absolute text-sm font-QBook top-8`,
  step: `h-7 w-7 rounded-full flex items-center justify-center text-xs text-white z-10 ${
    step ? 'bg-teal-400' : 'bg-gray-200'
  }`,
});

const ProgressTracker: FC<ProgressTrackerProps> = ({ step: { step1, step2, step3, step4 } }) => {
  return (
    <div className='sm:px-3'>
      <div className='px-2.5 max-w-screen-sm w-full flex justify-between items-center relative mx-auto mt-6 mb-10'>
        <span className={styles(step1).step}>
          {step2 ? <i className='fas fa-check text-white'></i> : '1'}
        </span>
        <p className={`${styles(step1).p} left-0`}>Terms</p>
        <div className={`${styles(step2).line} left-[5%]`} />
        <span className={styles(step2).step}>
          {step3 ? <i className='fas fa-check text-white'></i> : '2'}
        </span>
        <p className={`${styles(step2).p} left-[32%] sm:left-[32.5%]`}>Info</p>
        <div className={`${styles(step3).line} left-[35%]`} />
        <span className={styles(step3).step}>
          {step4 ? <i className='fas fa-check text-white'></i> : '3'}
        </span>
        <p className={`${styles(step3).p} right-[26%] sm:right-[30%]`}>Payment</p>
        <div className={`${styles(step4).line} left-[63%]`} />
        <span className={styles(step4).step}>
          {step4 ? <i className='fas fa-check text-white'></i> : '4'}
        </span>
        <p className={`${styles(step4).p} right-0`}>Access</p>
      </div>
    </div>
  );
};

export default ProgressTracker;
