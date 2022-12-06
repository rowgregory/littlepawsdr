import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import { reasonsToAdoptASeniorData } from '../../utils/reasonsToAdopt';
import SeniorDog from '../../components/assets/senior_01.jpeg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import { Image } from 'react-bootstrap';

const ViewFees = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
`;
const SeniorDogs = () => {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image
          src={SeniorDog}
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
          Adopt A Senior
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://unsplash.com/@magdaleny?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
              '_blank'
            )
          }
          fontWeight={500}
          fontSize='10px'
          color='#fff'
          cursor='pointer'
          style={{
            mixBlendMode: 'difference',
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
          }}
        >
          Photo by Magdalena Smolnicka
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
          <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
            Most senior dachshunds are housebroken and wanting to give their
            love to someone. Dachshunds can live to be 18 years old, so senior
            dachshunds still have lots of love to give.
          </Text>
          <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
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
          <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
            Little Paws Dachshund Rescue (LPDR) would like to encourage
            experienced pet owners to adopt by offering an adoption discount fee
            to Seniors, 60 years and older, who adopt a senior
            dachshund/dachshund mix from our rescue. This fee includes
            spay/neutering, all shots (Rabies and Distemper) and a microchip
            implant. We will also ensure they receive a dental if needed.{' '}
            <ViewFees to='/adopt/fees'>View our current fees.</ViewFees>
          </Text>
          <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
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
          <div className='py-3'>
            {reasonsToAdoptASeniorData().map((obj, i) => (
              <div key={i} className='mb-2 pb-2'>
                <Text
                  maxWidth='680px'
                  fontSize='18px'
                  className='mb-2 mx-auto'
                  fontWeight={400}
                >
                  {obj.title}
                </Text>
                <Text maxWidth='680px' fontSize='18px' className='mb-4 mx-auto'>
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
