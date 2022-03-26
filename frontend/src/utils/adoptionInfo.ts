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
        'While we encourage you to let us know on your application if one of our dogs has captured your interest, we use this simply as a guide for matching and your listing of specific dog in no way implies claim to this particular dog.',
      text3:
        'NOTE: Adoption Applications expire 6 months from the date of receipt. If you have already submitted an Adoption Application and it has been longer than 6 months, you will need to fill out a new Adoption Application.',
      linkKey: '/adopt',
      path: 'Application',
    },
    {
      titleKey: 'Step Two: Reference Checks',
      text: 'All references will be checked prior to home visit. We will contact your current vet, if you have one, for a reference.',
    },
    {
      titleKey: 'Step Three: Application Review',
      text: 'Processor reviews the application, calls the vet if you have one, verifies vaccinations and spay/neuter. We email personal references (if email is provided) or call them if necessary. Email is best since as references can respond when they are available.',
    },
    {
      titleKey: 'Step Four: Home Visit',
      text: 'A volunteer will come to your home to visit with you and discuss care of dachshunds. Also, the volunteer will look for any potential problems and check to be sure that your fencing is secure. Your home visit does not mean you have been approved.',
    },
    {
      titleKey: 'Step Five: Approval',
      text: 'After the above steps have been completed all your information will be reviewed and a decision will be made about adoption. If at this point you are approved to adopt, LPDR will help guide you to the appropriate dog for your family.',
    },
  ];
};
