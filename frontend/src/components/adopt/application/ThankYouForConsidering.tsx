import { Text } from '../../styles/Styles';

const ThankYouForConsidering = () => {
  const recipient = 'applications@littlepawsdr.org';
  const subject = 'Help with application';
  const textClassName = 'mb-4 mx-auto';
  return (
    <>
      <Text
        fontSize='31px'
        marginTop='56px'
        fontWeight={400}
        textAlign='center'
        maxWidth='680px'
        marginBottom='24px'
        marginLeft='auto'
        marginRight='auto'
      >
        Thank you for considering adopting a rescued dachshund or dachshund mix.
      </Text>
      <Text
        maxWidth='680px'
        className='mb-3 mx-auto'
        fontSize='16px'
        fontWeight='600'
      >
        Adoption Qualification Requirements
      </Text>
      <Text maxWidth='680px' className={textClassName} fontSize='16px'>
        The following are the standards that our rescue adheres to. Please note,
        each dog is different and may have additional requirements, however, the
        list below applies to every adoption.
      </Text>
      <Text maxWidth='680px' className={textClassName} fontSize='16px'>
        To ensure that we are working with people that are committed to adopting
        and welcoming a rescue into their family, we require all individuals to
        read the dog’s bio/requirements completely to ensure the dog of interest
        is the best match for your family and that the needs of the dog can be
        met.  This will help us to ensure that you as the adopter are fully
        prepared to welcome a new dog into your home.
      </Text>
      <Text maxWidth='680px' fontSize='16px' className={textClassName}>
        <li>
          Current and previous pets must be spayed or neutered, with some
          exceptions for health reasons. To be considered for a medical
          exception for spay/neuter, vet documentation is required.
        </li>
      </Text>
      <Text maxWidth='680px' fontSize='16px' className={textClassName}>
        <li>
          Your pets must be current on vaccines, heartworm testing, and
          heartworm and flea/tick prevention.
        </li>
      </Text>
      <Text maxWidth='680px' fontSize='16px' className={textClassName}>
        <li>
          Veterinary records will be checked, and we utilize the AVMA guidelines
          for preventative care to confirm annual checkups (2x annually for
          seniors), dentals, bloodwork, and treatment provided when necessary.
        </li>
      </Text>
      <Text maxWidth='680px' fontSize='16px' className={textClassName}>
        <li>
          You must be at least 21 years old to be considered to adopt one of our
          dogs.
        </li>
      </Text>
      <Text
        maxWidth='680px'
        className='mb-3 mx-auto'
        fontSize='16px'
        fontWeight='600'
      >
        The Adoption Application Process
      </Text>
      <Text maxWidth='680px' className={textClassName} fontSize='16px'>
        Once your application is received it will be reviewed by our application
        coordinator to determine if you meet the dog’s requirements. If your
        application shows you would a good match, the following will take place:
      </Text>
      <Text maxWidth='680px' fontSize='16px' className={textClassName}>
        <li>Your past and current veterinarians will be contacted.</li>
      </Text>
      <Text maxWidth='680px' fontSize='16px' className={textClassName}>
        <li>Your personal references will be contacted.</li>
      </Text>
      <Text maxWidth='680px' fontSize='16px' className={textClassName}>
        <li>Your landlord will be contacted, if applicable.</li>
      </Text>
      <Text maxWidth='680px' fontSize='16px' className={textClassName}>
        <li>
          We will review the information received with the dog’s foster team to
          determine if a home visit will be scheduled.
        </li>
      </Text>
      <Text maxWidth='680px' className={textClassName} fontSize='16px'>
        A virtual home visit will be scheduled at a time that is convenient for
        you. We require that everyone living in the home be present during the
        visit, including all animals. The home visit volunteer will inspect the
        locations where the dachshund will eat, sleep, and play, etc.
      </Text>
      <Text maxWidth='680px' className={textClassName} fontSize='16px'>
        If your application does not meet the requirements for the dog you
        selected, we will contact you with more detailed information about why
        we’re not moving forward with your application.
      </Text>
      <Text maxWidth='680px' className={textClassName} fontSize='16px'>
        Little Paws reserves the right to deny an application for any reason.
      </Text>
      <Text maxWidth='680px' className={textClassName} fontSize='16px'>
        We look forward to working with you. To get help prior to completing an
        application, please contact us at{' '}
        <span>
          {' '}
          <a href={`mailto:${recipient}?subject=${subject}`}>{recipient}</a>
        </span>
      </Text>
      <Text maxWidth='680px' className={textClassName} fontSize='16px'>
        Our application can take 15-30 minutes to complete.
      </Text>
    </>
  );
};

export default ThankYouForConsidering;
