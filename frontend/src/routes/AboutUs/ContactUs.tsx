import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled, { useTheme } from 'styled-components';
import { Text } from '../../components/styles/Styles';

const ContactUsIFrame = styled.iframe`
  border: none;
  height: 1000px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    height: 750px;
  }
`;

const ContactUs = () => {
  const theme = useTheme() as any;
  const isDay = theme.mode === 'day';
  return (
    <div
      style={{
        maxWidth: '980px',
        width: '100%',
        marginInline: 'auto',
        marginBottom: '96px',
        paddingInline: '16px',
      }}
    >
      <Text
        fontSize='32px'
        fontWeight={400}
        marginBottom='32px'
        marginTop='56px'
      >
        Contact Us
      </Text>
      <Row>
        <Col>
          <Text>
            If you have any questions, comments, or concerns please feel free to
            fill out our online contact form or email us at{' '}
            <a href='mailto:LPDR@littlepawsdr.org'>LPDR@littlepawsdr.org</a>
          </Text>
          <Text>You will receive a confirmation email upon completion.</Text>
        </Col>
      </Row>
      <Row>
        <Col className='mt-5'>
          {isDay ? (
            <ContactUsIFrame
              style={{ border: 'none' }}
              title='Contact Us'
              width='100%'
              height='100%'
              scrolling='no'
              src='https://toolkit.rescuegroups.org/of/f?c=WBTGVKTH'
            ></ContactUsIFrame>
          ) : (
            <ContactUsIFrame
              style={{ border: 'none' }}
              title='Contact Us'
              width='100%'
              height='100%'
              scrolling='no'
              src='https://toolkit.rescuegroups.org/of/f?c=GDHFSFSP'
            ></ContactUsIFrame>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ContactUs;
