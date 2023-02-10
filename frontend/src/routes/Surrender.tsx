import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Text } from '../components/styles/Styles';
import SurrenderHigh from '../components/assets/surrender.jpg';
import SurrenderLow from '../components/assets/surrender-low.jpg';
import LeftArrow from '../components/svg/LeftArrow';
import RightArrow from '../components/svg/RightArrow';
import Hero from '../components/Hero';

const SurrenderApplicationIFrame = styled.iframe`
  border: none;
  height: 4400px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    height: 3900px;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 1) {
    height: 4200px;
  }
`;

const Surrender = () => {
  const theme = useTheme() as any;
  const isDay = theme.mode === 'day';
  return (
    <>
      <Hero
        low={SurrenderLow}
        high={SurrenderHigh}
        title='Surrender an animal'
        link='https://www.pexels.com/photo/photo-of-dog-inside-mailbox-906065/'
        photographer='Noelle Otto'
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
            text2='Sanctuary'
            url2='/about/sanctuary'
          />
          <RightArrow text='Not Available for Adoption Yet' url='/about/hold' />
        </div>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Ideally, all dogs live in one loving home from puppyhood until death.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          However, LPDR understands this is not always possible. People become
          ill, die, divorce, move overseas, develop allergies, lose their jobs,
          lose their homes, etc. Any of these situations, among others, can be a
          reason for a dog coming into rescue. We currently help rescue in the
          following states: Alabama, Connecticut, Delaware, DC, Florida,
          Georgia, Maine, Maryland, Massachusetts, New Hampshire, New Jersey,
          North Carolina, Pennsylvania, Rhode Island, South Carolina, Tennessee,
          Vermont, Virginia, West Virginia
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          <li style={{ fontSize: '16px' }}>
            If you are considering re-homing your dachshund because of behavior
            problems, there may be other options you can consider first. Talk to
            your vet about the issue to ensure the behavior is not a result of a
            medical problem or perhaps because the dog has not been spayed or
            neutered. You may also want to consider consulting a behaviorist who
            may be able to help resolve the problem with training (for you and
            your dog).
          </li>
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          <li style={{ fontSize: '16px' }}>
            If you are considering re-homing your dachshund because of financial
            issues or high vet costs/bills, know that there are foundations and
            other organizations that may be able to offer financial assistance.
            A search of resources serving your geographic area may yield good
            results. Additionally, local governments offer lower costs
            veterinary services.
          </li>
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          <li style={{ fontSize: '16px' }}>
            Consider exploring your own personal networks of trusted friends,
            family, and co-workers who may be able to provide a good home for
            your dog.
          </li>
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
          When all options have been considered and you believe that
          surrendering your dog is the best option for you and your dachshund,
          Little Paws Dachshund Rescue may be able to help. All of the
          dachshunds that come into our rescue live in the home of an approved
          foster. Generally, the dog stays with the foster two weeks before the
          dog is posted on our website for adoption so we can better understand
          the needs and personality of the dog. All potential adopters go
          through a rigorous application process and are carefully screened.
        </Text>
        <Text maxWidth='680px' fontSize='16px' className='mb-5 mx-auto'>
          To be considered for surrender, please complete and submit the
          following Surrender Questionnaire:
        </Text>
        <Text maxWidth='722px' className='mx-auto'>
          {isDay ? (
            <SurrenderApplicationIFrame
              title='Surrender Application'
              width='100%'
              scrolling='no'
              src='https://toolkit.rescuegroups.org/of/f?c=QCVXZJTH'
            ></SurrenderApplicationIFrame>
          ) : (
            <SurrenderApplicationIFrame
              title='Surrender Application'
              width='100%'
              scrolling='no'
              src='https://toolkit.rescuegroups.org/of/f?c=RXYMKGSJ'
            ></SurrenderApplicationIFrame>
          )}
        </Text>
      </div>
    </>
  );
};

export default Surrender;
