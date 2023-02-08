import React from 'react';
import {
  mandatoryRequirementsForAdoptionData,
  fiveStepProcess,
} from '../../utils/adoptionInfo';
import Paw from '../../components/assets/transparent-paw.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '../../components/styles/Styles';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import AdoptionInfoHigh from '../../components/assets/adopt-info-high.jpeg';
import AdoptionInfoLow from '../../components/assets/adopt-info-low.jpg';
import Hero from '../../components/Hero';

const RequirementSection = styled.div`
  div {
    display: flex;
    line-height: 22px;

    img {
      width: 15px;
      height: 15px;
      @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
        width: 20px;
        height: 20px;
      }
    }
    div {
      padding: 0 0 0 0.5rem;
    }
  }
`;

export const SixStepSection = styled.div`
  div {
    display: flex;
    flex-direction: column;
    span {
      font-weight: bold;
      font-size: 20px;
    }
    div {
      margin: 0;
    }
  }
`;

export const Step = styled(Link)<{ link?: string }>`
  cursor: ${({ link }) => (link ? 'pointer' : 'text')};
  width: fit-content;
  text-decoration: ${({ link }) => (link ? 'underline' : '')};
  font-size: 18px;
  max-width: 680px;
  margin-inline: auto;
`;

const AdoptionInformation = () => {
  return (
    <>
      <Hero
        low={AdoptionInfoLow}
        high={AdoptionInfoHigh}
        title='Adoption Information'
        link='https://unsplash.com/es/@davidiz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='David Izquierdo'
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
            text2='Adopt a Senior'
            url2='/available/senior'
          />
          <RightArrow text='Fees' url='/adopt/fees' />
        </div>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Adopting is a big decision
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          You are taking into your home a dog that is intelligent, loyal, fun
          loving, full of love, and more than likely very vocal. However, owning
          a dachshund will bring you so much enjoyment, fun and fulfillment.
          They have this fantastic way of bringing joy to their families every
          day!
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          We are committed to matching our dachshunds with good, responsible and
          loving new owners. We strive to make the best match we can, setting
          each dog and adopter up for success. Our number one concern is for our
          dachshunds.
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          For more information visit our{' '}
          <span>
            <u>Adoption Information</u>
          </span>
          &nbsp;page. We currently adopt to the following states: Alabama,
          Connecticut, Delaware, DC, Florida, Georgia, Kentucky, Maine,
          Maryland, Massachusetts, New Hampshire, New Jersey, North Carolina,
          Ohio, Pennsylvania, Rhode Island, South Carolina, Tennessee, Vermont,
          Virginia, West Virginia.
        </Text>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          LPDR Adopting Guidelines
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          We want you to inquire with us if you are interested in a specific
          dog. It’s important to us that we help you find a dog that will fit
          your needs, and that each dog finds the home that fits their needs.
          Following submission of the adoption application, we encourage you and
          the dog’s foster family to be in contact, as we highly value the input
          of our foster families
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          We DO NOT have a physical location, as all of our dogs are fostered in
          individual homes. Dogs will be transported to their new homes if they
          are not currently in the same state as the adopting party. We want to
          find the best family for the dachshund, even if they are out of state.
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          LPDR is a non-profit and is 100% funded by donations, including
          adoption donations.
        </Text>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Mandatory Requirements for Adoption
        </Text>
        <RequirementSection>
          {mandatoryRequirementsForAdoptionData().map((req, i) => (
            <Text
              maxWidth='680px'
              key={i}
              className='mb-4 d-flex align-items-center mx-auto'
            >
              <img src={Paw} alt='little-paw' className='mr-1' />
              <Text fontSize='18px'>{req}</Text>
            </Text>
          ))}
        </RequirementSection>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Puppies
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          The general guideline is that puppies may be left alone, for no longer
          in hours than the number of months of their ages. Puppies will require
          a lot of attention – especially at first. Please consider a young
          adult if you don’t have a schedule that will permit a puppy frequent
          potty breaks.
        </Text>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
          className='mb-3'
        >
          The Five Step Adoption Process
        </Text>
        <SixStepSection>
          {fiveStepProcess().map((obj, i) => (
            <div key={i} className='mb-4 pb-3 py-0'>
              <Text
                maxWidth='680px'
                fontSize='18px'
                className='mb-2 mx-auto w-100'
                fontWeight={400}
              >
                {obj.titleKey}
              </Text>
              {obj?.linkKey ? (
                <Step
                  to={obj?.linkKey}
                  link={obj?.linkKey}
                  className='mb-4 mx-auto w-100'
                >
                  {obj.text}
                </Step>
              ) : (
                <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
                  {obj.text}
                </Text>
              )}
              {obj?.text2 && (
                <>
                  <Text
                    maxWidth='680px'
                    fontSize='18px'
                    className='mb-4 mx-auto'
                  >
                    {obj?.text2}
                  </Text>
                  <Text
                    maxWidth='680px'
                    fontSize='18px'
                    className='mb-4 mx-auto'
                  >
                    {obj?.text3}
                  </Text>
                </>
              )}
            </div>
          ))}
        </SixStepSection>
      </div>
    </>
  );
};

export default AdoptionInformation;
