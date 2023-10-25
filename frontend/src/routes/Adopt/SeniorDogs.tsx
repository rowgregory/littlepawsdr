import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import { reasonsToAdoptASeniorData } from '../../utils/reasonsToAdopt';
import SeniorHigh from '../../components/assets/senior-high.jpeg';
import SeniorLow from '../../components/assets/senior-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';

const ViewFees = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
`;
const SeniorDogs = () => {
  return (
    <>
      <Hero
        low={SeniorLow}
        high={SeniorHigh}
        title='Adopt A Senior'
        link='https://unsplash.com/@magdaleny?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='Magdalena Smolnicka'
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
            text2='Adoption Application'
            url2='/adopt'
          />
          <RightArrow text='Adoption Information' url='/adopt/info' />
        </div>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          The Long on Love Senior Program is a way for those more experienced
          pet owners (age 60 and older) to find a loving senior
          dachshund/dachshund mix to join their home.
        </Text>

        <div>
          <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
            Most senior dachshunds are housebroken and wanting to give their
            love to someone. Dachshunds can live to be 18 years old, so senior
            dachshunds still have lots of love to give.
          </Text>
          <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
            Little Paws Dachshund Rescue (LPDR) receive senior dachshunds from
            shelters or owner surrenders. Many times they are surrendered to us
            or to the shelter because the death of owner and other family
            members don’t want the dog; working too many hours; doesn’t get
            along with a new puppy; there is a new baby in the house; need to
            move to a place where dogs are not allowed; kids going off to
            college; allergies; and the new spouse doesn’t like them. How sad
            for these seniors that have given their love to someone their entire
            lives.
          </Text>
          <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
            Little Paws Dachshund Rescue (LPDR) would like to encourage
            experienced pet owners to adopt by offering an adoption discount fee
            to Seniors, 60 years and older, who adopt a senior
            dachshund/dachshund mix from our rescue. This fee includes
            spay/neutering, all shots (Rabies and Distemper) and a microchip
            implant. We will also ensure they receive a dental if needed.{' '}
            <ViewFees to='/adopt/fees'>View our current fees.</ViewFees>
          </Text>
          <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
            To qualify for the program, you must show proof of age and have a
            care plan in place. Senior animals will be identified on our website
            with the notation{' '}
            <strong>“I am part of the Long on Love Senior Program”</strong> in
            the profile.
          </Text>
          <Text
            fontSize='31px'
            marginTop='56px'
            fontWeight={400}
            textAlign='center'
            marginBottom='24px'
          >
            Top 10 Reasons to Adopt An Older Dog
          </Text>
          <div>
            {reasonsToAdoptASeniorData().map((obj, i) => (
              <div key={i}>
                <Text
                  maxWidth='680px'
                  fontSize='16px'
                  className='mx-auto'
                  fontWeight={400}
                >
                  {obj.title}
                </Text>
                <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
                  {obj.reason}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SeniorDogs;
