import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import styled, { css, keyframes } from 'styled-components';
import Heart from '../../components/svg/Heart';
import Logo from '../../components/assets/logo-white2.png';

const Container = styled.div`
  margin: 0 auto;
  background: #f7f7f7;
  width: 100%;
  padding-block: 160px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const DonateBtn = styled.button`
  font-family: Oswald;
  font-size: 18px;
  background: linear-gradient(
    180deg,
    rgba(79, 249, 237, 1) 0%,
    rgba(34, 194, 183, 1) 100%
  );
  color: #fff;
  padding: 20px 70px;
  width: fit-content;
  border-radius: 16px;
  border: none;
  box-shadow: none;
  transition: 300ms;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  :hover {
    transform: translateY(-4px);
    box-shadow: 0 19px 100px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }

  :active,
  .focus-within,
  .focus-visible {
    transform: translateY(8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

export const DonateTitle = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 48px;
  margin-bottom: 32px;
  font-family: Oswald;
`;

const fadeIn = keyframes`
from {
  transform: scale(0);
  opacity:0;

}
to {
  transform: scale(1);
  opacity:1;
  z-index: 5;
}
`;

export const ThankYou = styled.div<{ anim: any }>`
  animation: ${({ anim }) =>
    anim
      ? css`
          ${fadeIn} 300ms ease-in forwards
        `
      : ''};
  animation-delay: 2000ms;
  position: absolute;
  z-index: -1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h2,
  h5 {
    color: #fff;
  }
`;

const Donate = () => {
  const [donationBtnClicked, setDonationBtnClicked] = useState(false);

  return (
    <Container>
      <DonateTitle>DONATE TODAY!</DonateTitle>
      <Heart anim={donationBtnClicked} />
      <ThankYou anim={donationBtnClicked}>
        <h2>Thank you</h2>
        <h5>from</h5>
        <Image
          src={Logo}
          alt='LPDR'
          style={{ maxWidth: '300px', width: '100%' }}
        />
      </ThankYou>
      <form
        className='d-flex flex-column align-items-start'
        action='https://www.paypal.com/donate'
        method='post'
        target='_top'
      >
        <input
          type='hidden'
          name='hosted_button_id'
          value='C4SMAYNF4L948'
          id='donate'
        />

        <DonateBtn
          onClick={() => setDonationBtnClicked(true)}
          className='donate-btn'
        >
          DONATE
        </DonateBtn>
      </form>
    </Container>
  );
};

export default Donate;
