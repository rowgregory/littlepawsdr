import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 40px;
  margin-inline: 16px;

  p,
  li {
    color: #575757;
    font-size: 15px;
  }
`;

const InnerContainer = styled.div`
  height: 500px;
  overflow-y: scroll;
  padding: 16px 12px;
  border: 1px solid #ededed;
  border-radius: 12px;

  h5 {
    font-size: 1.2rem;
  }
  p,
  li {
    font-weight: 300;
  }
`;

const StepOne = ({ setStep }: any) => {
  const [hasReadConditions, setHasReadConditions] = useState(false);
  const scrollableDivRef = useRef(null) as any;

  const handleScroll = () => {
    const div = scrollableDivRef.current;
    if (div) {
      const isAtBottom = div.scrollTop + div.clientHeight === div.scrollHeight;
      if (isAtBottom) {
        setHasReadConditions(true);
      }
    }
  };

  useEffect(() => {
    const div = scrollableDivRef.current;

    if (div) {
      div.addEventListener('scroll', handleScroll);

      return () => {
        div.removeEventListener('scroll', handleScroll);
        setHasReadConditions(false);
      };
    }
  }, []);

  return (
    <Container>
      <InnerContainer ref={scrollableDivRef}>
        <h5>Our Mission</h5>
        <p>
          Little Paws Dachshund Rescue is an east coast based 501(c)3 exempt nonprofit dedicated to the rescue
          and re-homing of our favorite short legged breed. We specialize in finding permanent homes for
          dachshund and dachshund mixes. We strive to make the lives of all dogs better through action,
          advocacy, awareness, and education.
        </p>
        <h5>Our Goal</h5>
        <p>
          It is LPDR’s goal to identify abandoned, mistreated, or homeless dogs and oversee their treatment
          and wellbeing while working to find loving owners for those in our care. If you are looking for a
          new family member, take a look at our available dachshund and dachshund mixes.
        </p>
        <p>Thank you for considering adopting a rescued dachshund or dachshund mix.</p>
        <h5>Application Fee</h5>
        <p>
          To ensure that our Applications Team is working with families that are committed to adopting and
          welcoming a rescued dachshund into their family LPDR’s asks for a non-refundable application fee of
          $15.00. We take the application fee as an additional measure to ensure that a family is ready to
          move forward as well as to support our current and future rescue dogs.
        </p>
        <h5>Adoption Qualification Requirements</h5>
        <p>
          The following are the standards that our rescue adheres to. Please note, each dog is different and
          may have additional requirements, however, the list below applies to every adoption.
        </p>
        <p>
          We require all individuals to read the dog’s bio/requirements completely to ensure the dog of
          interest is the best match for your family and that the needs of the dog can be met. This will help
          us to ensure that you as the adopter are fully prepared to welcome a new dog into your home.
        </p>
        <ul>
          <li>
            Current and previous pets must be spayed or neutered, with some exceptions for health reasons. To
            be considered for a medical exception for spay/neuter, vet documentation is required.
          </li>
          <li>
            Your pets must be current on vaccines, heartworm testing, and heartworm and flea/tick prevention.
          </li>
          <li>
            Veterinary records will be checked, and we utilize the AVMA guidelines for preventative care to
            confirm annual checkups (2x annually for seniors), dentals, bloodwork, and treatment provided when
            necessary.
          </li>
          <li>You must be at least 21 years old to be considered to adopt one of our dogs.</li>
        </ul>
        <h5>The Adoption Application Process</h5>
        <p>
          Once your application is received it will be reviewed by our application coordinator to determine if
          you meet the dog’s requirements.  If your application shows you would a good match, the following
          will take place:
        </p>
        <ul>
          <li>Your past and current veterinarians will be contacted.</li>
          <li>Your personal references will be contacted.</li>
          <li>Your landlord will be contacted, if applicable.</li>
          <li>
            We will review the information received with the dog’s foster team to determine if a home visit
            will be scheduled.
          </li>
        </ul>
        <h5>Virtual Home Visit</h5>
        <p>
          A virtual home visit will be scheduled at a time that is convenient for you. We require that
          everyone living in the home be present during the visit, including all animals. The home visit
          volunteer will inspect the locations where the dachshund will eat, sleep, and play, etc.
        </p>
        <p>
          We will keep your application and fee on file, and you are welcome to contact us at
          applications@littlepawsdr.org within 6 months of your original adoption application submission with
          the name of another dog that interests you if the following occurs:
        </p>
        <ul>
          <li>The dog you applied for is adopted by another applicant.</li>
          <li>The dog you applied for is no longer available by the time your application is received.</li>
          <li>You do not meet the dog’s requirements.</li>
          <li>
            The dog you applied for has been removed from availability  If your application does not meet the
            requirements for the dog you selected, we will contact you with more detailed information about
            why we’re not moving forward with your application.
          </li>
        </ul>
        <p>
          Little Paws reserves the right to deny an application for any reason. We look forward to working
          with you. To get help prior to completing an application, please contact us at{' '}
          <a href='mailto:applications@littlepawsdr.org'>applications@littlepawsdr.org</a>. Our application
          can take 15-30 minutes to complete.
        </p>
      </InnerContainer>
      <Button
        style={{ cursor: !hasReadConditions ? 'not-allowed' : '' }}
        onClick={() => setStep((prev: any) => ({ ...prev, step2: true }))}
        variant='success'
        className='mt-4 w-100'
        disabled={!hasReadConditions}
      >
        I accept the conditions
      </Button>
    </Container>
  );
};

export default StepOne;
