import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text, CardTitle } from '../../components/styles/Styles';
import { reasonsToAdoptASeniorData } from '../../utils/reasonsToAdopt';

const Container = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template: repeat(2, 50%);
  max-width: ${({ theme }) => theme.breakpoints[3]};
  margin: 1rem;
  section {
    grid-area: 2/1;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 2rem 0 0;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    section {
      grid-area: 1/2;
    }
  }
`;

const ViewFees = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
`;

const SeniorDogs = () => {
  return (
    <Container>
      <section>
        <Text fontSize='1.5rem' letterSpacing='-2px'>
          Top 10 Reasons to Adopt An Older Dog
        </Text>
        <div className='py-3'>
          {reasonsToAdoptASeniorData().map((obj, i) => (
            <div
              key={i}
              className='mb-4 pb-2'
              style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.15)' }}
            >
              <CardTitle>{obj.title}</CardTitle>
              <Text>{obj.reason}</Text>
            </div>
          ))}
        </div>
      </section>
      <div>
        <Text marginBottom='1rem'>
          The <strong>Long on Love Senior Program</strong> is a way for those
          more experienced pet owners (age 60 and older) to find a loving senior
          dachshund/dachshund mix to join their home.
        </Text>
        <Text marginBottom='1rem'>
          Most senior dachshunds are housebroken and wanting to give their love
          to someone. Dachshunds can live to be 18 years old, so senior
          dachshunds still have lots of love to give.
        </Text>
        <Text marginBottom='1rem'>
          Little Paws Dachshund Rescue (LPDR) receive senior dachshunds from
          shelters or owner surrenders. Many times they are surrendered to us or
          to the shelter because the death of owner and other family members
          don’t want the dog; working too many hours; doesn’t get along with a
          new puppy; there is a new baby in the house; need to move to a place
          where dogs are not allowed; kids going off to college; allergies; and
          the new spouse doesn’t like them. How sad for these seniors that have
          given their love to someone their entire lives.
        </Text>
        <Text marginBottom='1rem'>
          Little Paws Dachshund Rescue (LPDR) would like to encourage
          experienced pet owners to adopt by offering an adoption discount fee
          to Seniors, 60 years and older, who adopt a senior dachshund/dachshund
          mix from our rescue. This fee includes spay/neutering, all shots
          (Rabies and Distemper) and a microchip implant. We will also ensure
          they receive a dental if needed.{' '}
          <ViewFees to={{ pathname: '/adopt', state: 'Fees' }}>
            View our current fees.
          </ViewFees>
        </Text>
        <Text marginBottom='1rem'>
          To qualify for the program, you must show proof of age and have a care
          plan in place. Senior animals will be identified on our website with
          the notation{' '}
          <strong>“I am part of the Long on Love Senior Program”</strong> in the
          profile.
        </Text>
      </div>
    </Container>
  );
};

export default SeniorDogs;
