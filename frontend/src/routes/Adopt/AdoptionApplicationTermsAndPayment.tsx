import { useState } from 'react';
import { Text } from '../../components/styles/Styles';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import ProgressTracker from '../../components/adopt/application/ProgressTracker';
import StepOne from '../../components/adopt/application/StepOne';
import StepTwo from '../../components/adopt/application/StepTwo';
import {
  AdoptionApplicationTermsAndPaymentContainer,
  AdoptionApplicationTermsAndPaymentInnerContainer,
} from '../../components/styles/adoption-application/styles';

const AdoptionApplicationTermsAndPayment = () => {
  let [orderLoader, setOrderLoader] = useState(false);
  const [step, setStep] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
  });

  return (
    <AdoptionApplicationTermsAndPaymentContainer>
      <div className='w-100 d-flex justify-content-between mt-3'>
        <LeftArrow
          text='Home'
          url='/'
          text2='Feed A Foster'
          url2='/donate/feed-a-foster'
        />
        <RightArrow text='Adopt a Senior' url='/adopt/senior' />
      </div>
      <Text
        fontSize='32px'
        textAlign='center'
        marginBottom='34px'
        marginTop='48px'
        fontWeight={500}
      >
        Adoption Application
      </Text>
      <ProgressTracker step={step} orderLoader={orderLoader} />
      <AdoptionApplicationTermsAndPaymentInnerContainer>
        {step.step1 && !step.step2 && !step.step3 && (
          <StepOne setStep={setStep} />
        )}
        {step.step1 && (step.step2 || step.step3) && !step.step4 && (
          <StepTwo setOrderLoader={setOrderLoader} orderLoader={orderLoader} setStep={setStep} />
        )}
      </AdoptionApplicationTermsAndPaymentInnerContainer>
    </AdoptionApplicationTermsAndPaymentContainer>
  );
};

export default AdoptionApplicationTermsAndPayment;
