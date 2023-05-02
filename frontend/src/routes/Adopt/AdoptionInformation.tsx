import React from 'react';
import { fiveStepProcess } from '../../utils/adoptionInfo';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '../../components/styles/Styles';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import AdoptionInfoHigh from '../../components/assets/adopt-info-high.jpeg';
import AdoptionInfoLow from '../../components/assets/adopt-info-low.jpg';
import Hero from '../../components/Hero';

export const FiveStepSection = styled.div`
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
          You are considering adopting a dog that is intelligent, loyal, fun
          loving, full of love, and more than likely very vocal. A dachshund
          will bring you so much enjoyment, fun, and fulfillment. They have this
          fantastic way of bringing joy to their families every day!
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          We are committed to finding each of our dachshunds responsible and
          loving new owners. We strive to make the best match we can, setting
          each dog and adopter up for success. Our number one concern is for our
          dogs.
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          We currently adopt to the following states: Alabama, Connecticut,
          Delaware, DC, Florida, Georgia, Kentucky, Maine, Maryland,
          Massachusetts, New Hampshire, New Jersey, North Carolina, Ohio,
          Pennsylvania, Rhode Island, South Carolina, Tennessee, Vermont,
          Virginia, West Virginia.
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
          Our Adoption Guidelines & Requirements
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          To ensure that we are working with people who are committed to
          adopting and welcoming a rescue into their family,
          <span style={{ fontWeight: '600' }}>
            {' '}
            we require all individuals to read each dog’s bio/requirements
            completely to ensure the dog of interest is the best match for your
            family and that the needs of the dog can be met.
          </span>{' '}
          This will help us to ensure that you as the adopter are fully prepared
          to welcome a new dog into your home.{' '}
          <span style={{ fontWeight: '600' }}>
            We also encourage you to be in contact with the dog’s foster family,
            as we highly value the input of our foster families.
          </span>{' '}
          You can find the email address in the dog’s bio.
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          Below are requirements to which we strongly adhere.
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>
            Your current and previous pets must be spayed or neutered, with some
            exceptions for health reasons, which need to be clarified by your
            veterinarian.
          </li>
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>
            Your current pets must be up to date on core vaccines, heartworm
            testing and taking heartworm and flea and tick preventative.
          </li>
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>
            You must be at least 21 years old to be considered to adopt one of
            our dogs.
          </li>
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>
            OFF-LEASH AND INVISIBLE FENCE POLICY - We understand that some of
            the best adopters do not have fenced yards. Unlike some rescues, we
            do not impose the rule that adopters must have fenced yards to
            adopt. Dachshunds are, by breed definition, scent hounds. They will
            often go into hunting mode, zoning out their humans. For their own
            protection, the majority of LPDR dogs will need to be adopted into
            home environments that allow them to run free in securely fenced
            areas or with people who are devoted to leash walking. Please
            understand that there is a subset of dogs that do not deal well
            leashed and will only be adoptable to applicants with fenced yards.
          </li>
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>
            It is LPDR&#39;s position that invisible fences are not suitable for
            dachshunds for several reasons. Dachshunds are known for protecting
            their humans and others they view as part of their pack. Invisible
            fences pose two large problems. First, a dachshund may chase
            something out of the yard as they are prey driven and they will run
            right through the invisible fence only to realize that the
            associated collar zap hurt, thus preventing them from returning to
            their yard as they do not want to feel that pain again. Second,
            invisible fences serve to keep your dog in, but do not keep your pet
            safe from other dogs or wild animals entering their territory. This
            false sense of security has been the downfall of many small dogs.
            For those reasons, it will be uncommon that we adopt to people who
            utilize invisible fences.
          </li>
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          <li>
            USE OF DOGGY DOOR - Homes with Doggy Doors must show proof of a
            securely fenced yard. LPDR must confirm that someone will watch over
            one of our dogs when outside and not let the dog have unsupervised
            use of an open doggy door, to make sure the door is closed at night.
            We have had instances where dogs were within their securely fenced
            yard and required immediate veterinary care. First, a woodchuck
            somehow entered the fenced area and attacked one of our dogs.
            Secondly, one of our dogs was stung by a bee and swelled up.
            Fortunately, these were both instances where the dog owners were
            home to care for them. A lot of thought has gone into our decision
            to not place our dogs in homes where they will be left unattended in
            their backyard.
          </li>
        </Text>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Adopting a Puppy
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          The general guideline is that puppies may be left alone, for no longer
          in hours than the number of months of their ages. Puppies will require
          a lot of attention – especially at first. Please consider a young
          adult if you do not have a schedule that will permit a puppy frequent
          potty breaks.
        </Text>

        <FiveStepSection>
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
        </FiveStepSection>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          TRANSPORTATION HELP
        </Text>
        <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
          We do not have a physical location, as all our dogs are fostered in
          individual homes on the east coast. A LPDR volunteer transport may be
          arranged to bring a dog to you. However, some of our dogs have
          distance restrictions and need to be adopted within a specific number
          of miles from their foster homes. We will inform you if the dog you
          applied for is not able to travel long distances by car. We want to
          find the best family for each of our dachshunds, even if they are out
          of state. Please read the bio for your dog of interest to see if there
          is a distance restriction.
        </Text>
      </div>
    </>
  );
};

export default AdoptionInformation;
