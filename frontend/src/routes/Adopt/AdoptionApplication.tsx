import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Text } from '../../components/styles/Styles';
import AdoptionAppHigh from '../../components/assets/adopt-app-high.jpeg';
import AdoptionAppLow from '../../components/assets/adopt-app-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import { Container } from '../../components/styles/GridDogStyles';
import AboutLittlePaws from '../../components/adopt/application/AboutLittlePaws';
import ThankYouForConsidering from '../../components/adopt/application/ThankYouForConsidering';

const AdoptionApplicationIFrame = styled.iframe<{ pageKey?: string }>`
  border: none;
  height: 15000px;
  max-width: ${({ theme }) => theme.breakpoints[3]};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    height: 12000px;
  }

  @media screen and (orientation: landscape) and (max-width: 900px) {
    height: 15500px;
  }
`;

const AdoptionApplication = () => {
  const theme = useTheme() as any;
  const isDay: boolean = theme.mode === 'day';

  return (
    <>
      <Hero
        low={AdoptionAppLow}
        high={AdoptionAppHigh}
        title='Adoption Application'
        link='https://unsplash.com/@erdaest?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='Erda Estremera'
      />

      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Feed A Foster'
            url2='/donate/feed-a-foster'
          />
          <RightArrow text='Adopt a Senior' url='/adopt/senior' />
        </div>

        <AboutLittlePaws />

        <ThankYouForConsidering />
        <Text maxWidth='722px' className='mb-3 mt-5 mx-auto'>
          {isDay ? (
            <AdoptionApplicationIFrame
              title='Adoption Application'
              width='100%'
              src='https://toolkit.rescuegroups.org/of/f?c=WHMQCBRV'
            ></AdoptionApplicationIFrame>
          ) : (
            <AdoptionApplicationIFrame
              title='Adoption Application'
              width='100%'
              src='https://toolkit.rescuegroups.org/of/f?c=ZKCVRYSQ'
            ></AdoptionApplicationIFrame>
          )}
        </Text>
      </Container>
    </>
  );
};

export default AdoptionApplication;
