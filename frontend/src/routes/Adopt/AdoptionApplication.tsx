import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import styled, { useTheme } from 'styled-components';
import { Text, CardTitle, StyledCard } from '../../components/styles/Styles';

const AdoptionApplicationIFrame = styled.iframe<{ pageKey?: string }>`
  border: none;
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation: landscape) {
    min-height: 7800px;
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation: portrait) {
    min-height: 7800px;
  }
  @media only screen and (min-width: 760px) {
    height: 7600px;
  }
  @media only screen and (max-width: 759px) {
    height: 7600px;
  }
  @media only screen and (max-width: 620px) {
    height: 7800px;
  }
  @media only screen and (max-width: 480px) {
    height: 8700px;
  }
`;

const AdoptionApplication = () => {
  const theme = useTheme() as any;
  const isDay: boolean = theme.mode === 'day';
  return (
    <>
      <Row>
        <Col>
          <StyledCard>
            <Card.Body>
              <CardTitle>
                Thank you for considering adopting a rescued dachshund.
                Submission of this application does not guarantee that you will
                receive a dog. We do not adopt to anyone under the age of 21.
              </CardTitle>
              <Text
                marginBottom='0.5rem'
                fontSize='1.15rem'
                fontFamily='Duru Sans'
              >
                This application can take 15 - 30 minutes to complete.
              </Text>
              <Text
                marginBottom='0.5rem'
                fontSize='1.15rem'
                fontFamily='Duru Sans'
              >
                Once your application is received and your vet and personal
                references are approved, you will be notified that a LPDR
                volunteer will conduct a homevisit. A homevisit is scheduled at
                a time that is convenient for you. We require that everyone
                living in the home must be present at the time of the homevisit,
                including all animals. The homevisit volunteer will inspect the
                locations where the dachshund will eat, sleep and play.
              </Text>
              <Text>
                <u>TRANSPORTATION HELP!</u>
              </Text>
              <Text
                marginBottom='0.5rem'
                fontSize='1.15rem'
                fontFamily='Duru Sans'
              >
                If you see a furbaby that would be a match for your family,
                please don’t let distance stand in the way of your adoption.
                LPDR can work with you to have a volunteer transport to assist
                with transportation or refer you to a paid transport. We are
                currently working with mainly inSectioniduals on the East Coast
                but will consider other locations also!
              </Text>
              <Text>
                <u>OFF-LEASH AND INVISIBLE FENCE POLICY</u>
              </Text>
              <Text
                marginBottom='0.5rem'
                fontSize='1.15rem'
                fontFamily='Duru Sans'
              >
                We understand that some of the very best adopters don't have
                fenced yards. Unlike some other rescues, we do not impose the
                rule that all adopters must have fenced yards in order to adopt.
              </Text>
              <Text
                marginBottom='0.5rem'
                fontSize='1.15rem'
                fontFamily='Duru Sans'
              >
                Dachshunds are, by breed definition, scent hounds. They wi ll
                often go into hunting mode, zoning out their humans. For their
                own protection, the majority of LPDR dogs will need to be
                adopted into home environments that allow them to run free in
                physically fenced areas and/or with people who are devoted to
                leash walking. Please understand that there is a subset of dogs
                that do not do well on leashes and will only be adoptable to
                applicants with fenced homes.
              </Text>
              <Text
                marginBottom='0.5rem'
                fontSize='1.15rem'
                fontFamily='Duru Sans'
              >
                It is LPDR's position that invisible fences are not suitable for
                dachshunds for a number of reasons. Dachshunds are known for
                protecting their humans and others they view as part of their
                pack. Invisible fences pose two very large problems. First, a
                dachshund may chase something out of the yard and run right
                through the invisible fence only to realize that the associated
                collar zap hurt. Thus preventing them from returning to their
                yard as they do not want to feel that pain again. Secondly,
                invisible fences largely serve to keep your dog in, but do not
                keep your pet safe from other dogs or wild animals entering
                their territory. This false sense of security has been the
                downfall of many small dogs. For those reasons, it will be
                uncommon that we adopt to people who utilize invisible fences.
              </Text>
              <Text>Again, thank you for wanting to adopt.</Text>
              <Text>Sincerely,</Text>
              <Text>Little Paws Dachshund Rescue Board of Directors</Text>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>
      <Row>
        {isDay ? (
          <AdoptionApplicationIFrame
            title='Adoption Application'
            width='100%'
            height='7250px'
            scrolling='no'
            src='https://toolkit.rescuegroups.org/of/f?c=WHMQCBRV'
          ></AdoptionApplicationIFrame>
        ) : (
          <AdoptionApplicationIFrame
            aria-autocomplete='none'
            scrolling='no'
            title='Adoption Application'
            width='100%'
            height='7250px'
            src='https://toolkit.rescuegroups.org/of/f?c=ZKCVRYSQ'
          ></AdoptionApplicationIFrame>
        )}
      </Row>
    </>
  );
};

export default AdoptionApplication;
