interface SixStepProcessProps {
  titleKey: string;
  text: string;
  text2?: string;
  text3?: string;
  linkKey?: string;
  path?: string;
}

export const mandatoryRequirementsForAdoptionData = () => {
  return [
    'All LPDR dogs will be spayed/neutered prior to any adoption.',
    'All adopting individuals will have to completely fill out and sign the Adoption Application which must be verified and approved.',
    'All adopting individuals, who live in a single family home and plan to allow their dogs to free access to the yard via doggie door must show that their yard is fenced.',
    'All adopting individuals, who live in an apartment / condo / townhouse must be able to show how the dachshund will exercise.',
    'All adopting individuals who live in rental property will have to have a written approval document from their landlord.',
    'All adopting individuals must have a home visit in order to verify application and conditions of the potential “forever home”.',
    'All dogs and cats in the adopting home must be spayed or neutered unless there is a medical reason that a spay or neuter cannot be done. This will be verified by a vet.',
    'All dogs and cats in the adopting home must be current on vaccinations.',
    'We do not have a specific age requirement for adopters and LPDR reserves the right to make decisions for all our dogs on a case-by-case basis.',
  ];
};

export const fiveStepProcess = (): SixStepProcessProps[] => {
  return [
    {
      titleKey: 'Step One: Application',
      text: 'Fill out an adoption application.',
      text2:
        'While we encourage you to let us know on your application if one of our dogs has captured your interest, we cannot guarantee you will be selected for that specific dog.',
      text3:
        'NOTE: Adoption Applications expire 6 months from the date of receipt. If you have already submitted an Adoption Application and it has been longer than 6 months, you will need to fill out a new Adoption Application.',
      linkKey: '/adopt',
      path: 'Application',
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
      text: 'After the above steps have been completed all your information will be reviewed and a decision will be made. If at this point you are approved to adopt, LPDR will notify you of the next steps in the process to complete the adoption.',
    },
  ];
};
