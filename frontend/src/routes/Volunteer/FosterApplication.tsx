import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Text } from '../../components/styles/Styles';

const FosterApplicationIFrame = styled.iframe`
  border: none;
  height: 8000px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    height: 7000px;
  }
`;

const FosterApplication = () => {
  const theme = useTheme() as any;
  const isDay = theme.mode === 'day';
  return (
    <>
      <Text fontSize='2rem' marginBottom='1rem'>
        Foster Application
      </Text>
      <Text marginBottom='1rem'>
        Fostering is our transitional step from a shelter/surrender to a forever
        home. During this time it’s important that we give each dachshund a safe
        environment where it can learn to trust again, to heal and to learn how
        to become a loving family member. Many of the dachshunds that we pull
        from shelters or receive from an owner surrender just need a temporary
        home until their new furever home can be found.
      </Text>
      <Text marginBottom='1rem'>
        It is the responsibility of the foster parent to provide the
        dachshund(s) with food, monthly flea/tick medication, training and love.
        The rescue will provide a handbook on all policy and procedures, pay for
        all vetting care (as outlined in the handbook), monthly heartworm
        preventative, education and support.
      </Text>
      <Text marginBottom='1rem'>
        Thank you for wanting to foster for Little Paws Dachshund Rescue (LPDR).
      </Text>
      <Text marginBottom='1rem'>
        This application can take 15 - 30 minutes to complete.
      </Text>
      <Text marginBottom='1rem'>
        Once we receive your application, we will contact your vet and personal
        references. After you have passed those criteria's we will ask a
        volunteer to set up a time for a homevisit. A homevisit volunteer will
        come to your home and look at the places that a foster dog will eat,
        play and sleep. We require that everyone in your home be present at the
        time of the homevisit.
      </Text>
      <Text marginBottom='1rem'>
        LPDR is responsible for all vetting for foster dogs. We will also
        provide you with a handbook to answer many of your questions about our
        foster policies and procedures.
      </Text>
      <Text marginBottom='1rem'>
        Fostering is a rewarding experience but is a commitment for any person.
        You will be asked to bring home a dog that may have just been pulled out
        of the shelter into your home or one that was surrendered by their
        owner. Some fosters do not get along with your dogs while others will
        warm up very quickly. There will be some that are sick and will need
        your attention. But the reward when they go to their forever home is
        something you will never forget.
      </Text>
      <Text>We look forward to having you on the LPDR Foster Team!</Text>
      <Text>Little Paws Dachshund Rescue Board of Directors</Text>

      {isDay ? (
        <FosterApplicationIFrame
          scrolling='no'
          title='Foster-Application'
          width='100%'
          src='https://toolkit.rescuegroups.org/of/f?c=DGKQZWCQ'
        ></FosterApplicationIFrame>
      ) : (
        <FosterApplicationIFrame
          scrolling='no'
          title='Foster-Application'
          width='100%'
          src='https://toolkit.rescuegroups.org/of/f?c=NXGDQBDV'
        ></FosterApplicationIFrame>
      )}
    </>
  );
};

export default FosterApplication;
