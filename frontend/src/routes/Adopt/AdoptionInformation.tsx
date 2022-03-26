import React from 'react';
import { Row, Col, Carousel, Image } from 'react-bootstrap';
import {
  mandatoryRequirementsForAdoptionData,
  fiveStepProcess,
} from '../../utils/adoptionInfo';
import Paw from '../../components/assets/transparent-paw.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CardTitle } from '../../components/styles/Styles';
import { Container, MainText } from './Adoption';
import { HorizontalLine } from '../../components/styles/product-details/Styles';

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
      &.steps {
      }
    }
  }
`;

export const Step = styled(Link)<{ link?: string }>`
  cursor: ${({ link }) => (link ? 'pointer' : 'text')};
  width: fit-content;
  border: ${({ link }) => (link ? '3px solid #bfbfbf' : '')};
  :hover {
    border: ${({ link }) => (link ? '3px solid #a0a0a0' : '')};
  }
  text-decoration: ${({ link }) => (link ? 'underline' : '')};
  font-size: 1rem;
`;

const Title = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.quaternary};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: 1.75rem;
  }
`;

const informationPups = [
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/14490/14490448/69709137_4032x3024.jpg',
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/14490/14490448/69710726_2180x1978.jpg',
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/14490/14490448/71191181_1490x1865.jpg',
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/14490/14490448/71191182_1490x1865.jpg',
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/14490/14490448/71191179_1616x2144.jpg',
];

const AdoptionInformation = ({ setTabCategory }: any) => {
  return (
    <Container>
      <Title>LPDR Adopting Guidelines</Title>
      <Row className='mx-0 px-0'>
        <Col md={12} lg={6} className='px-0'>
          <MainText className='my-3'>
            We want you to inquire with us if you are interested in a specific
            dog. It’s important to us that we help you find a dog that will fit
            your needs, and that each dog finds the home that fits their needs.
            Following submission of the adoption application, we encourage you
            and the dog’s foster family to be in contact, as we highly value the
            input of our foster families
          </MainText>
          <MainText>
            We DO NOT have a physical location, as all of our dogs are fostered
            in individual homes. Dogs will be transported to their new homes if
            they are not currently in the same state as the adopting party. We
            want to find the best family for the dachshund, even if they are out
            of state.
          </MainText>
          <MainText className='my-3'>
            LPDR is a non-profit and is 100% funded by donations, including
            adoption donations.
          </MainText>
          <HorizontalLine />
          <Title className='mb-3'>Mandatory Requirements for Adoption</Title>
          <RequirementSection>
            {mandatoryRequirementsForAdoptionData().map((req, i) => (
              <div key={i} className='my-1 d-flex align-items-center'>
                <img src={Paw} alt='little-paw' className='mr-1' />
                <MainText className='mb-3'>{req}</MainText>
              </div>
            ))}
          </RequirementSection>
          <HorizontalLine />
        </Col>
        <Col>
          <Carousel pause='hover'>
            {informationPups.map((pup, i) => (
              <Carousel.Item key={i}>
                <Image src={pup} alt={`information-pup-${i}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>{' '}
        <HorizontalLine />
      </Row>
      <Title>Puppies</Title>
      <MainText className='my-3'>
        The general guideline is that puppies may be left alone, for no longer
        in hours than the number of months of their ages. Puppies will require a
        lot of attention – especially at first. Please consider a young adult if
        you don’t have a schedule that will permit a puppy frequent potty
        breaks.
      </MainText>
      <HorizontalLine />
      <Title className='mb-3'>The Five Step Adoption Process</Title>
      <SixStepSection>
        {fiveStepProcess().map((obj, i) => (
          <div key={i} className='mb-4 pb-3'>
            <div className='py-0'>
              <CardTitle className='mt-3'>{obj.titleKey}</CardTitle>
              {obj?.linkKey ? (
                <Step
                  onClick={() => setTabCategory(obj?.path)}
                  to={obj?.linkKey}
                  link={obj?.linkKey}
                  className='mb-3 border-0'
                >
                  {obj.text}
                </Step>
              ) : (
                <MainText className='mb-0'>{obj.text}</MainText>
              )}
              <MainText className='steps'>{obj?.text2}</MainText>
              <MainText className='steps'>{obj?.text3}</MainText>
            </div>
          </div>
        ))}
      </SixStepSection>
    </Container>
  );
};

export default AdoptionInformation;
