import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import styled, { useTheme } from 'styled-components';
import { Text, StyledCard } from '../../components/styles/Styles';

const VolunteerApplicationIFrame = styled.iframe`
  border: none;
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation: landscape) {
    min-height: 3800px;
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation: portrait) {
    min-height: 3800px;
  }
  @media only screen and (min-width: 760px) {
    height: 3500px;
  }
  @media only screen and (max-width: 759px) {
    height: 3600px;
  }
  @media only screen and (max-width: 480px) {
    height: 3900px;
  }
`;

const Container = styled.div`
  margin: 0 48px;
`;

const VolunteerApplication = () => {
  const theme = useTheme() as any;
  const isDay = theme.mode === 'day';
  return (
    <Container>
      <Row>
        <Col className='my-3'>
          <StyledCard>
            <Card.Body>
              <Text>
                {' '}
                Thank you for applying to volunteer with Little Paws Dachshund
                Rescue (LPDR)!
              </Text>
              <Text>
                This application will take 15 - 30 minutes to complete.
              </Text>
              <Text>
                We look forward to having you join our team. We rely on our
                volunteers to accomplish our mission of helping unwanted and
                abandoned animals find new homes, and we sincerely thank you for
                helping us to achieve that goal.
              </Text>
              <Text>Little Paws Dachshund Rescue Board of Directors</Text>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>

      {isDay ? (
        <VolunteerApplicationIFrame
          title='Volunteer-Application'
          width='100%'
          scrolling='no'
          src='https://toolkit.rescuegroups.org/of/f?c=FPGYBJHM'
        ></VolunteerApplicationIFrame>
      ) : (
        <VolunteerApplicationIFrame
          title='Volunteer-Application'
          width='100%'
          height='7000px'
          scrolling='no'
          src='https://toolkit.rescuegroups.org/of/f?c=WCVGSBQJ'
        ></VolunteerApplicationIFrame>
      )}
    </Container>
  );
};

export default VolunteerApplication;
