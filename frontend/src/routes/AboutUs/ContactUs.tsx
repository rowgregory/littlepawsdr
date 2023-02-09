import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Text } from '../../components/styles/Styles';
import ContactHigh from '../../components/assets/contact-high.jpg';
import ContactLow from '../../components/assets/contact-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import { Spinner } from 'react-bootstrap';

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
  const [showIFrameLoader, setShowIFrameLoader] = useState(true);
  return (
    <>
      <Hero
        low={ContactLow}
        high={ContactHigh}
        title='Contact Us'
        link={`https://pixabay.com/users/kenway_photography-19020757/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5995679`}
        photographer='Jessica Dähne'
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
            text2='Little Paws Crew'
            url2='/about/team-members'
          />
          <RightArrow text='Available Dachshunds' url='/available' />
        </div>

        <Text
          fontSize='32px'
          marginTop='56px'
          fontWeight={400}
          className='mb-4 mx-auto'
        >
          If you have any questions, comments, or concerns please feel free to
          fill out our online contact form or email us at{' '}
          <a href='mailto:LPDR@littlepawsdr.org'>LPDR@littlepawsdr.org</a>
        </Text>
        <Text fontSize='16px' maxWidth='680px'>
          You will receive a confirmation email upon completion.
        </Text>
        {showIFrameLoader && (
          <div className='d-flex justify-content-center mt-4'>
            <Spinner animation='grow' />
          </div>
        )}
        <Text maxWidth='680px' className='mt-5 mx-auto'>
          {isDay ? (
            <ContactUsIFrame
              onLoad={() => setShowIFrameLoader(false)}
              style={{ border: 'none' }}
              title='Contact Us'
              width='100%'
              height='100%'
              scrolling='no'
              src='https://toolkit.rescuegroups.org/of/f?c=WBTGVKTH'
            ></ContactUsIFrame>
          ) : (
            <ContactUsIFrame
              onLoad={() => setShowIFrameLoader(false)}
              style={{ border: 'none' }}
              title='Contact Us'
              width='100%'
              height='100%'
              scrolling='no'
              src='https://toolkit.rescuegroups.org/of/f?c=GDHFSFSP'
            ></ContactUsIFrame>
          )}
        </Text>
      </div>
    </>
  );
};

export default ContactUs;
