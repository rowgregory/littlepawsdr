import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Text } from '../../components/styles/Styles';
import AdoptionAppHigh from '../../components/assets/adopt-app-high.jpeg';
import AdoptionAppLow from '../../components/assets/adopt-app-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';

const AdoptionApplicationIFrame = styled.iframe<{ pageKey?: string }>`
  border: none;
  height: 15000px;
  max-width: ${({ theme }) => theme.breakpoints[3]};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    height: 12000px;
  }

  @media screen and (orientation: landscape) and (max-width: 900px) {
    height: 15500px;
  }
`;

const AdoptionApplication = () => {
  const theme = useTheme() as any;
  const isDay: boolean = theme.mode === 'day';
  const recipient = 'applications@littlepawsdr.org';
  const subject = 'Help with application';
  return (
    <>
      <Hero
        low={AdoptionAppLow}
        high={AdoptionAppHigh}
        title='Adoption Application'
        link='https://unsplash.com/@erdaest?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='Erda Estremera'
      />

      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Feed A Foster'
            url2='/donate/feed-a-foster'
          />
          <RightArrow text='Adopt a Senior' url='/available/senior' />
        </div>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          About Little Paws Dachshund Rescue
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          We are an east coast based 501(c)3 exempt nonprofit dedicated to the
          rescue and re- homing of our favorite short legged breed.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          We specialize in finding permanent homes for dachshund and dachshund
          mixes. We strive to make the lives of all dogs better through action,
          advocacy, awareness, and education.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          It is LPDR’s goal to identify abandoned, mistreated, or homeless dogs
          and oversee their treatment and wellbeing while working to find loving
          owners for those in our care. If you are looking for a new family
          member, take a look at our available dachshund and dachshund mixes.
        </Text>
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
          Thank you for considering adopting a rescued dachshund or dachshund
          mix.
        </Text>
        <Text
          maxWidth='680px'
          className='mb-3 mt-4 mx-auto'
          fontSize='18px'
          fontWeight='600'
        >
          Adoption Qualification Requirements
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          The following are the standards that our rescue adheres to. Please
          note, each dog is different and may have additional requirements,
          however, the list below applies to every adoption.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          To ensure that we are working with people that are committed to
          adopting and welcoming a rescue into their family, we require all
          individuals to read the dog’s bio/requirements completely to ensure
          the dog of interest is the best match for your family and that the
          needs of the dog can be met.  This will help us to ensure that you as
          the adopter are fully prepared to welcome a new dog into your home.
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>
            Current and previous pets must be spayed or neutered, with some
            exceptions for health reasons. To be considered for a medical
            exception for spay/neuter, vet documentation is required.
          </li>
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>
            Your pets must be current on vaccines, heartworm testing, and
            heartworm and flea/tick prevention.
          </li>
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>
            Veterinary records will be checked, and we utilize the AVMA
            guidelines for preventative care to confirm annual checkups (2x
            annually for seniors), dentals, bloodwork, and treatment provided
            when necessary.
          </li>
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>
            You must be at least 21 years old to be considered to adopt one of
            our dogs.
          </li>
        </Text>
        <Text
          maxWidth='680px'
          className='mb-3 mt-4 mx-auto'
          fontSize='18px'
          fontWeight='600'
        >
          The Adoption Application Process
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          Once your application is received it will be reviewed by our
          application coordinator to determine if you meet the dog’s
          requirements. If your application shows you would a good match, the
          following will take place:
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>Your past and current veterinarians will be contacted.</li>
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>Your personal references will be contacted.</li>
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>Your landlord will be contacted, if applicable.</li>
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>
            We will review the information received with the dog’s foster team
            to determine if a home visit will be scheduled.
          </li>
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          A virtual home visit will be scheduled at a time that is convenient
          for you. We require that everyone living in the home be present during
          the visit, including all animals. The home visit volunteer will
          inspect the locations where the dachshund will eat, sleep, and play,
          etc.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          If your application does not meet the requirements for the dog you
          selected, we will contact you with more detailed information about why
          we’re not moving forward with your application.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          Little Paws reserves the right to deny an application for any reason.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          We look forward to working with you. To get help prior to completing
          an application, please contact us at{' '}
          <span>
            {' '}
            <a href={`mailto:${recipient}?subject=${subject}`}>{recipient}</a>
          </span>
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          Our application can take 15-30 minutes to complete.
        </Text>
        <Text maxWidth='722px' className='mb-3 mt-4 mx-auto'>
          {isDay ? (
            <AdoptionApplicationIFrame
              title='Adoption Application'
              width='100%'
              scrolling='no'
              src='https://toolkit.rescuegroups.org/of/f?c=WHMQCBRV'
            ></AdoptionApplicationIFrame>
          ) : (
            <AdoptionApplicationIFrame
              aria-autocomplete='none'
              scrolling='no'
              title='Adoption Application'
              width='100%'
              src='https://toolkit.rescuegroups.org/of/f?c=ZKCVRYSQ'
            ></AdoptionApplicationIFrame>
          )}
        </Text>
      </div>
    </>
  );
};

export default AdoptionApplication;
