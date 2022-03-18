import React from 'react';
import { Row, Col, Card, Carousel, Image } from 'react-bootstrap';
import {
  mandatoryRequirementsForAdoptionData,
  fiveStepProcess,
} from '../../utils/adoptionInfo';
import Paw from '../../components/assets/transparent-paw.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Text,
  CardTitle,
  PageHeader,
  StyledCard,
} from '../../components/styles/Styles';

const RequirementSection = styled.div`
  div {
    display: flex;
    line-height: 22px;

    img {
      width: 20px;
      height: 20px;
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

const informationPups = [
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/14490/14490448/69709137_4032x3024.jpg',
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/14490/14490448/69710726_2180x1978.jpg',
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/14490/14490448/71191181_1490x1865.jpg',
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/14490/14490448/71191182_1490x1865.jpg',
  'https://s3.amazonaws.com/filestore.rescuegroups.org/5798/pictures/animals/14490/14490448/71191179_1616x2144.jpg',
];

const AdoptionInformation = () => {
  return (
    <>
      <PageHeader>LPDR Adopting Guidelines</PageHeader>

      <Row>
        <Col md={12} lg={6}>
          <StyledCard>
            <Card.Body>
              <Text
                marginBottom='1rem'
                fontSize='1.15rem'
                fontFamily='Duru Sans'
              >
                We want you to inquire with us if you are interested in a
                specific dog. It’s important to us that we help you find a dog
                that will fit your needs, and that each dog finds the home that
                fits their needs. Following submission of the adoption
                application, we encourage you and the dog’s foster family to be
                in contact, as we highly value the input of our foster families
              </Text>
              <Text
                marginBottom='1rem'
                fontSize='1.15rem'
                fontFamily='Duru Sans'
              >
                We DO NOT have a physical location, as all of our dogs are
                fostered in individual homes. Dogs will be transported to their
                new homes if they are not currently in the same state as the
                adopting party. We want to find the best family for the
                dachshund, even if they are out of state.
              </Text>
              <Text
                marginBottom='1rem'
                fontSize='1.15rem'
                fontFamily='Duru Sans'
              >
                LPDR is a non-profit and is 100% funded by donations, including
                adoption donations.
              </Text>
            </Card.Body>
          </StyledCard>
          <Row>
            <Col className='mt-4 mb-2'>
              <PageHeader>Mandatory Requirements for Adoption</PageHeader>
            </Col>
          </Row>
          <StyledCard>
            <Card.Body>
              <RequirementSection>
                {mandatoryRequirementsForAdoptionData().map((req, i) => (
                  <div key={i} className='my-1'>
                    <img src={Paw} alt='little-paw' className='mr-1' />
                    <Text
                      marginBottom='1rem'
                      fontSize='1.15rem'
                      fontFamily='Duru Sans'
                    >
                      {req}
                    </Text>
                  </div>
                ))}
              </RequirementSection>
            </Card.Body>
          </StyledCard>
        </Col>
        <Col>
          <Carousel pause='hover'>
            {informationPups.map((pup, i) => (
              <Carousel.Item key={i}>
                <Image src={pup} alt={`information-pup-${i}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      <Row>
        <Col className='mt-4 mb-2'>
          <PageHeader>Puppies</PageHeader>
        </Col>
      </Row>
      <StyledCard>
        <Card.Body>
          <Text fontSize='1.15rem' fontFamily='Duru Sans'>
            The general guideline is that puppies may be left alone, for no
            longer in hours than the number of months of their ages. Puppies
            will require a lot of attention – especially at first. Please
            consider a young adult if you don’t have a schedule that will permit
            a puppy frequent potty breaks.
          </Text>
        </Card.Body>
      </StyledCard>

      <Row>
        <Col className='mt-4 mb-2'>
          <PageHeader>The Five Step Adoption Process</PageHeader>
        </Col>
      </Row>
      <SixStepSection>
        {fiveStepProcess().map((obj, i) => {
          return (
            <StyledCard key={i} className='mb-4 pb-3'>
              <Card.Body className='py-0'>
                <CardTitle className='mt-3'>{obj.titleKey}</CardTitle>
                {obj?.linkKey ? (
                  <Step
                    to={obj?.linkKey}
                    link={obj?.linkKey}
                    className='mb-3 border-0'
                  >
                    {obj.text}
                  </Step>
                ) : (
                  <Text
                    className='mb-0'
                    fontSize='1.15rem'
                    fontFamily='Duru Sans'
                  >
                    {obj.text}
                  </Text>
                )}
                <Text
                  className='steps'
                  fontSize='1.15rem'
                  fontFamily='Duru Sans'
                >
                  {obj?.text2}
                </Text>
                <Text
                  className='steps'
                  fontSize='1.15rem'
                  fontFamily='Duru Sans'
                >
                  {obj?.text3}
                </Text>
              </Card.Body>
            </StyledCard>
          );
        })}
      </SixStepSection>
    </>
  );
};

export default AdoptionInformation;
