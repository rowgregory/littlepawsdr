import { Fragment, useEffect, useState } from 'react';
import ProgressTracker from '../../components/adopt/application/ProgressTracker';
import StepOne from '../../components/adopt/application/StepOne';
import StepTwo from '../../components/adopt/application/StepTwo';
import PageBanner from '../../components/common/PageBanner';
import { AdoptionApplicationImg } from '../../components/assets';

const AdoptionApplicationTermsAndPayment = () => {
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
    <Fragment>
      <PageBanner imgSrc={AdoptionApplicationImg} title='Adoption Application' />
      <div className='px-3 py-20 min-h-[calc(100vh-812px)] fade-in'>
        <div className='w-full max-w-screen-sm mx-auto'>
          <p className='text-xl sm:text-2xl mb-8 font-QBold text-charcoal text-center'>
            Adoption Application Process
          </p>
          <ProgressTracker step={step} />
          {step.step1 && !step.step2 && !step.step3 && <StepOne setStep={setStep} />}
          {step.step1 && (step.step2 || step.step3) && !step.step4 && <StepTwo setStep={setStep} />}
        </div>
      </div>
    </Fragment>
  );
};

export default AdoptionApplicationTermsAndPayment;
