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
  height: 14250px;
  max-width: ${({ theme }) => theme.breakpoints[3]};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    height: 11500px;
  }

  @media screen and (orientation: landscape) and (max-width: 900px) {
    height: 15150px;
  }
`;

const AdoptionApplication = () => {
  const theme = useTheme() as any;
  const isDay: boolean = theme.mode === 'day';
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
        <Text fontSize='32px' fontWeight={400} marginTop='56px'>
          Thank you for considering adopting a rescued dachshund. Submission of
          this application does not guarantee that you will receive a dog. We do
          not adopt to anyone under the age of 21.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          This application can take 15 - 30 minutes to complete.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          Once your application is received and your vet and personal references
          are approved, you will be notified that a LPDR volunteer will conduct
          a homevisit. A homevisit is scheduled at a time that is convenient for
          you. We require that everyone living in the home must be present at
          the time of the homevisit, including all animals. The homevisit
          volunteer will inspect the locations where the dachshund will eat,
          sleep and play.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          <u>TRANSPORTATION HELP!</u>
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          If you see a dog that is a match for your family a LPDR volunteer
          transport may be arranged to bring the dog to you. However, some of
          our dogs have distance restrictions and need to be adopted within a
          specific number of miles from their foster homes. We’ll inform you if
          the dog you’ve applied for is not able to travel long distances by
          car. A paid transport can also be arranged for any dog that does not
          have travel restrictions.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          <u>OFF-LEASH AND INVISIBLE FENCE POLICY</u>
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          We understand that some of the very best adopters don't have fenced
          yards. Unlike some other rescues, we do not impose the rule that all
          adopters must have fenced yards in order to adopt.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          Dachshunds are, by breed definition, scent hounds. They wi ll often go
          into hunting mode, zoning out their humans. For their own protection,
          the majority of LPDR dogs will need to be adopted into home
          environments that allow them to run free in physically fenced areas
          and/or with people who are devoted to leash walking. Please understand
          that there is a subset of dogs that do not do well on leashes and will
          only be adoptable to applicants with fenced homes.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
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
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          Again, thank you for wanting to adopt.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          Sincerely,
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          Little Paws Dachshund Rescue Board of Directors
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
