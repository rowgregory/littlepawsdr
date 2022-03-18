import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTheme } from 'styled-components';
import { Text } from '../../components/styles/Styles';

const ContactUs = () => {
  const theme = useTheme() as any;
  const isDay = theme.mode === 'day';
  return (
    <>
      <Row>
        <Col>
          <Text>
            If you have any questions, comments, or concerns please feel free to
            fill out our online contact form or email us at{' '}
            <a href='mailto:LPDR@littlepawsdr.org'>LPDR@littlepawsdr.org</a>
          </Text>
        </Col>
      </Row>
      <Row>
        <Col className='mt-5'>
          {isDay ? (
            <iframe
              style={{ border: 'none' }}
              title='Contact Us'
              width='100%'
              height='720px'
              scrolling='no'
              src='https://toolkit.rescuegroups.org/of/f?c=WBTGVKTH'
            ></iframe>
          ) : (
            <iframe
              style={{ border: 'none' }}
              title='Contact Us'
              width='100%'
              height='720px'
              scrolling='no'
              src='https://toolkit.rescuegroups.org/of/f?c=GDHFSFSP'
            ></iframe>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ContactUs;
