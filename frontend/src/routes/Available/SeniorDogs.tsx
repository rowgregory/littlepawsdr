import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLine } from '../../components/styles/product-details/Styles';
import { Text, PageHeader, CardTitle } from '../../components/styles/Styles';
import { reasonsToAdoptASeniorData } from '../../utils/reasonsToAdopt';

export const ViewFees = styled(Link)`
  text-decoration: underline;
  :hover {
    cursor: pointer;
  }
`;

const SeniorDogs = ({ history }: any) => {
  return (
    <>
      <Row className='mx-0'>
        <Col md={12} className='mb-5 px-0'>
          <div>
            <Text marginBottom='1rem'>
              The <strong>Long on Love Senior Program</strong> is a way for
              those more experienced pet owners (age 60 and older) to find a
              loving senior dachshund/dachshund mix to join their home.
            </Text>
            <Text marginBottom='1rem'>
              Most senior dachshunds are housebroken and wanting to give their
              love to someone. Dachshunds can live to be 18 years old, so senior
              dachshunds still have lots of love to give.
            </Text>
            <Text marginBottom='1rem'>
              Little Paws Dachshund Rescue (LPDR) receive senior dachshunds from
              shelters or owner surrenders. Many times they are surrendered to
              us or to the shelter because the death of owner and other family
              members don’t want the dog; working too many hours; doesn’t get
              along with a new puppy; there is a new baby in the house; need to
              move to a place where dogs are not allowed; kids going off to
              college; allergies; and the new spouse doesn’t like them. How sad
              for these seniors that have given their love to someone their
              entire lives.
            </Text>
            <Text marginBottom='1rem'>
              Little Paws Dachshund Rescue (LPDR) would like to encourage
              experienced pet owners to adopt by offering an adoption discount
              fee to Seniors, 60 years and older, who adopt a senior
              dachshund/dachshund mix from our rescue. This fee includes
              spay/neutering, all shots (Rabies and Distemper) and a microchip
              implant. We will also ensure they receive a dental if needed.{' '}
              <ViewFees to={{ pathname: '/adopt', state: 'Fees' }}>
                View our current fees.
              </ViewFees>
            </Text>
            <Text marginBottom='1rem'>
              To qualify for the program, you must show proof of age and have a
              care plan in place. Senior animals will be identified on our
              website with the notation{' '}
              <strong>“I am part of the Long on Love Senior Program”</strong> in
              the profile.
            </Text>
          </div>
        </Col>
        <Col md={12} className='px-0'>
          <PageHeader>Top 10 Reasons to Adopt An Older Dog</PageHeader>
          <div className='py-3'>
            {reasonsToAdoptASeniorData().map((obj, i) => (
              <div key={i} className='my-1'>
                <CardTitle>{obj.title}</CardTitle>
                <Text>{obj.reason}</Text>

                <HorizontalLine />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SeniorDogs;
