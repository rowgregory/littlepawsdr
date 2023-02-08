import React from 'react';
import styled from 'styled-components';
import TransportAppHigh from '../../components/assets/transport-app-high.jpg';
import TransportAppLow from '../../components/assets/transport-app-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';

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
      <Hero
        low={TransportAppLow}
        high={TransportAppHigh}
        title='Transport Application'
        link='https://www.pexels.com/photo/black-yellow-and-green-swing-1686790/'
        photographer='Visually Us'
      />
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
