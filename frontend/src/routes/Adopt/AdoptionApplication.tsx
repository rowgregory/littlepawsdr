import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Text } from '../../components/styles/Styles';

import AdoptionAppDog from '../../components/assets/adoption_app01.jpg';
import { Image } from 'react-bootstrap';

const AdoptionApplicationIFrame = styled.iframe<{ pageKey?: string }>`
  border: none;
  height: 14100px;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    height: 11500px;
  }
`;

const AdoptionApplication = () => {
  const theme = useTheme() as any;
  const isDay: boolean = theme.mode === 'day';
  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image
          src={AdoptionAppDog}
          width='100%'
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Text
          fontWeight={500}
          fontSize='48px'
          color='#fff'
          style={{
            position: 'absolute',
            top: '200px',
            left: '50px',
            zIndex: 2,
          }}
        >
          Adoption Application
        </Text>
      </div>
      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        <Text fontSize='32px' fontWeight={400} marginTop='56px'>
          Thank you for considering adopting a rescued dachshund. Submission of
          this application does not guarantee that you will receive a dog. We do
          not adopt to anyone under the age of 21.
        </Text>
        <Text className='mb-3 mt-4' fontWeight={400}>
          This application can take 15 - 30 minutes to complete.
        </Text>
        <Text>
          Once your application is received and your vet and personal references
          are approved, you will be notified that a LPDR volunteer will conduct
          a homevisit. A homevisit is scheduled at a time that is convenient for
          you. We require that everyone living in the home must be present at
          the time of the homevisit, including all animals. The homevisit
          volunteer will inspect the locations where the dachshund will eat,
          sleep and play.
        </Text>
        <Text className='my-3' fontSize='14px'>
          <u>TRANSPORTATION HELP!</u>
        </Text>
        <Text>
          If you see a furbaby that would be a match for your family, please
          don’t let distance stand in the way of your adoption. LPDR can work
          with you to have a volunteer transport to assist with transportation
          or refer you to a paid transport. We are currently working with mainly
          inSectioniduals on the East Coast but will consider other locations
          also!
        </Text>
        <Text className='my-3' fontSize='14px'>
          <u>OFF-LEASH AND INVISIBLE FENCE POLICY</u>
        </Text>
        <Text>
          We understand that some of the very best adopters don't have fenced
          yards. Unlike some other rescues, we do not impose the rule that all
          adopters must have fenced yards in order to adopt.
        </Text>
        <Text className='my-3'>
          Dachshunds are, by breed definition, scent hounds. They wi ll often go
          into hunting mode, zoning out their humans. For their own protection,
          the majority of LPDR dogs will need to be adopted into home
          environments that allow them to run free in physically fenced areas
          and/or with people who are devoted to leash walking. Please understand
          that there is a subset of dogs that do not do well on leashes and will
          only be adoptable to applicants with fenced homes.
        </Text>
        <Text>
          It is LPDR's position that invisible fences are not suitable for
          dachshunds for a number of reasons. Dachshunds are known for
          protecting their humans and others they view as part of their pack.
          Invisible fences pose two very large problems. First, a dachshund may
          chase something out of the yard and run right through the invisible
          fence only to realize that the associated collar zap hurt. Thus
          preventing them from returning to their yard as they do not want to
          feel that pain again. Secondly, invisible fences largely serve to keep
          your dog in, but do not keep your pet safe from other dogs or wild
          animals entering their territory. This false sense of security has
          been the downfall of many small dogs. For those reasons, it will be
          uncommon that we adopt to people who utilize invisible fences.
        </Text>
        <Text className='my-3'>Again, thank you for wanting to adopt.</Text>
        <Text>Sincerely,</Text>
        <Text className='mb-3'>
          Little Paws Dachshund Rescue Board of Directors
        </Text>
        {isDay ? (
          <AdoptionApplicationIFrame
            title='Adoption Application'
            width='100%'
            height='7250px'
            scrolling='no'
            src='https://toolkit.rescuegroups.org/of/f?c=WHMQCBRV'
          ></AdoptionApplicationIFrame>
        ) : (
          <AdoptionApplicationIFrame
            aria-autocomplete='none'
            scrolling='no'
            title='Adoption Application'
            width='100%'
            height='7250px'
            src='https://toolkit.rescuegroups.org/of/f?c=ZKCVRYSQ'
          ></AdoptionApplicationIFrame>
        )}
      </div>
    </>
  );
};

export default AdoptionApplication;
