import { useEffect, useState } from 'react';
import ProgressTracker from '../../components/adopt/application/ProgressTracker';
import StepOne from '../../components/adopt/application/StepOne';
import StepTwo from '../../components/adopt/application/StepTwo';

const AdoptionApplicationTermsAndPayment = () => {
  let [orderLoader, setOrderLoader] = useState(false);
  const [step, setStep] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <div className='w-full max-w-screen-lg px-[20px] mx-auto md:px-[24px] lg:px-8 pt-12 animate-fadeIn'>
      <p className='text-2xl mb-8 font-Matter-Medium text-center'>Adoption Application Process</p>
      <ProgressTracker step={step} />
      <div className='w-full max-w-screen-sm mx-auto'>
        {step.step1 && !step.step2 && !step.step3 && <StepOne setStep={setStep} />}
        {step.step1 && (step.step2 || step.step3) && !step.step4 && (
          <StepTwo setOrderLoader={setOrderLoader} orderLoader={orderLoader} setStep={setStep} />
        )}
      </div>
    </div>
  );
};

export default AdoptionApplicationTermsAndPayment;
