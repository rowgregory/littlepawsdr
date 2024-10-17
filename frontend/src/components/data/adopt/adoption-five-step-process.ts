import { FiveStepProcessProps } from '../../../types/adopt-types';

const fiveStepProcess: FiveStepProcessProps[] = [
  {
    titleKey: 'Step One: Application',
    text: 'Fill out an adoption application.',
    text2:
      'While we encourage you to let us know on your application if one of our dogs has captured your interest, we cannot guarantee you will be selected for that specific dog.',
    text3:
      'NOTE: Adoption Applications expire 6 months from the date of receipt. If you have already submitted an Adoption Application and it has been longer than 6 months, you will need to fill out a new Adoption Application.',
    linkKey: '/adopt',
    path: 'Adoption Application',
  },
  {
    titleKey: 'Step Two: Application Review',
    text: 'Our Application Coordinator will review your application and if all requirements are met your application will move on to the reference check portion of the process.',
  },
  {
    titleKey: 'Step Three: Reference Checks',
    text: 'All references will be checked prior to a potential virtual home visit. We will contact your current and past veterinarian, personal references, and landlord, if applicable.',
  },
  {
    titleKey: 'Step Four: Home Visit',
    text: 'A volunteer will contact you to schedule a virtual home visit. All residents of your home must be present. The visit will include a tour of your home inside and out and discuss the care of your dog of interest. Your home visit does not guarantee approval.',
  },
  {
    titleKey: 'Step Five: Approval',
    text: 'After the above steps have been completed all your information will be reviewed and a decision will be made. If at this point you are approved to adopt, LPDR will notify you of the next steps in the process to complete the adoption. Approval does not mean you will get the dog that you applied for, since we may receive multiple applications for each dog. Approval does mean that you are pre-approved for another dog who is a good match for you and your family. This pre-approval lasts for six months.',
  },
];

export default fiveStepProcess;
