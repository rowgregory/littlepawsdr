import React from 'react';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import FosterHigh from '../../components/assets/foster-high.jpeg';
import FosterLow from '../../components/assets/foster-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import { Container } from '../../components/styles/GridDogStyles';

const FosterApplicationIFrame = styled.iframe`
  border: none;
  height: 7800px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    height: 7000px;
  }
  @media screen and (orientation: landscape) {
    height: 7000px;
  }
  @media screen and (orientation: portrait) and (min-device-width: 768px) and (max-device-width: 1024px) {
    height: 7000px;
  }
`;

const FosterApplication = () => {
  return (
    <>
      <Hero
        low={FosterLow}
        high={FosterHigh}
        title='Foster Application'
        link='https://unsplash.com/@chelsea777?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='Kojirou Sasaki'
      />

      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Volunteer Application'
            url2='/volunteer/volunteer-application'
          />
          <RightArrow text='Merch' url='/merch' />
        </div>
        <Text
          fontSize='32px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Fostering is our transitional step from a shelter/surrender to a
          forever home.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          During this time it’s important that we give each dachshund a safe
          environment where it can learn to trust again, to heal and to learn
          how to become a loving family member. Many of the dachshunds that we
          pull from shelters or receive from an owner surrender just need a
          temporary home until their new furever home can be found.
        </Text>
        <Text
          fontSize='24px'
          marginTop='56px'
          fontWeight={400}
          marginBottom='24px'
          maxWidth='680px'
          className='mx-auto'
        >
          It is the responsibility of the foster parent to provide the
          dachshund(s) with food, monthly flea/tick medication, training and
          love.{' '}
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          The rescue will provide a handbook on all policy and procedures, pay
          for all vetting care (as outlined in the handbook), monthly heartworm
          preventative, education and support.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          Thank you for wanting to foster for Little Paws Dachshund Rescue
          (LPDR).
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          This application can take 15 - 30 minutes to complete.
        </Text>
        <Text
          fontSize='24px'
          marginTop='56px'
          fontWeight={400}
          marginBottom='24px'
          maxWidth='680px'
          className='mx-auto'
        >
          Once we receive your application, we will contact your vet and
          personal references.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          After you have passed those criteria's we will ask a volunteer to set
          up a time for a homevisit. A homevisit volunteer will come to your
          home and look at the places that a foster dog will eat, play and
          sleep. We require that everyone in your home be present at the time of
          the homevisit.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          LPDR is responsible for all vetting for foster dogs. We will also
          provide you with a handbook to answer many of your questions about our
          foster policies and procedures.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          Fostering is a rewarding experience but is a commitment for any
          person. You will be asked to bring home a dog that may have just been
          pulled out of the shelter into your home or one that was surrendered
          by their owner. Some fosters do not get along with your dogs while
          others will warm up very quickly. There will be some that are sick and
          will need your attention. But the reward when they go to their forever
          home is something you will never forget.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          We look forward to having you on the LPDR Foster Team!
        </Text>
        <Text
          maxWidth='680px'
          fontSize='16px'
          className='mb-4 mx-auto'
          color='#9761aa'
        >
          Little Paws Dachshund Rescue Board of Directors
        </Text>
        <Text maxWidth='680px' className='mx-auto'>
          <FosterApplicationIFrame
            title='Foster-Application'
            width='100%'
            src='https://toolkit.rescuegroups.org/of/f?c=DGKQZWCQ'
          ></FosterApplicationIFrame>
        </Text>
      </Container>
    </>
  );
};

export default FosterApplication;
