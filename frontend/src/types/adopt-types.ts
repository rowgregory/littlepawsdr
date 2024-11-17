interface FiveStepProcessProps {
  titleKey: string;
  text: string;
  text2?: string;
  text3?: string;
  linkKey?: string;
  path?: string;
}

interface ReasonsToAdoptASeniorProps {
  title: string;
  reason: string;
}
interface StepTwoProps {
  setStep: (step: any) => void;
}

interface ProgressTrackerProps {
  step: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
  };
}

export type {
  FiveStepProcessProps,
  ReasonsToAdoptASeniorProps,
  StepTwoProps,
  ProgressTrackerProps,
};
