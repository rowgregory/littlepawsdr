import React from 'react';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import TransportApplicationDog from '../../components/assets/transport-application.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';

const TransportApplicationIFrame = styled.iframe<{ pageKey?: string }>`
  border: none;
  height: 1900px;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  margin-top: 96px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    height: 1700px;
  }

  @media screen and (orientation: landscape) {
    height: 1750px;
  }

  @media screen and (orientation: portrait) and (min-device-width: 768px) and (max-device-width: 1024px) {
    height: 1750px;
  }
`;

const ApplicationContent = styled.section`
  max-width: 980px;
  width: 100%;
  margin-inline: auto;
  margin-bottom: 96px;
  padding-inline: 16px;
`;

const TransportApplication = () => {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image
          src={TransportApplicationDog}
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
            mixBlendMode: 'difference',
          }}
        >
          Transport Application
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://www.pexels.com/photo/black-yellow-and-green-swing-1686790/',
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
          Photo by Visually Us
        </Text>
      </div>
      <ApplicationContent>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Adoption FAQ'
            url2='/adopt/faq'
          />
          <RightArrow
            text='Volunteer Application'
            url='/volunteer/volunteer-application'
          />
        </div>
        <TransportApplicationIFrame
          title='Transport Application'
          width='100%'
          height='7250px'
          scrolling='no'
          src='https://toolkit.rescuegroups.org/of/f?c=PKYHTHRH'
        >
          TransportApplication
        </TransportApplicationIFrame>
      </ApplicationContent>
    </>
  );
};

export default TransportApplication;
