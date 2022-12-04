import React from 'react';
import { Image } from 'react-bootstrap';
import styled, { useTheme } from 'styled-components';
import { Text } from '../../components/styles/Styles';
import ContactDog from '../../components/assets/contact02.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';

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
    <>
      <div style={{ position: 'relative', marginTop: '75px' }}>
        <Image
          src={ContactDog}
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
          Contact Us
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://pixabay.com/users/kenway_photography-19020757/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5995679',
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
          Photo by Jessica Dähne
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
            text='To Home'
            url='/'
            text2='About Us'
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

        <Text maxWidth='680px' className='mt-5 mx-auto'>
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
        </Text>
      </div>
    </>
  );
};

export default ContactUs;
