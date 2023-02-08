import React, { useState } from 'react';
import Heart from '../../components/svg/Heart';
import LongDogQRCode from '../../components/assets/LongDogQRCode.png';
import LongDogBasket from '../../components/assets/long-dog-basket.jpg';
import styled, { keyframes } from 'styled-components';
import { Text } from '../../components/styles/Styles';
import { Image } from 'react-bootstrap';
import { DonateBtn, ThankYou } from './Donate';
import Logo from '../../components/assets/logo-white2.png';
import useCountDown from '../../utils/hooks/useCountDown';
import LongDogExample from '../../components/assets/long-dog-example.jpg';
import Paw from '../../components/assets/transparent-paw.png';

export const CountDownContainer = styled.section`
  background: linear-gradient(
    90deg,
    hsla(284, 30%, 52%, 1) 0%,
    hsla(284, 33%, 73%, 1) 100%
  );
  background: -moz-linear-gradient(
    90deg,
    hsla(284, 30%, 52%, 1) 0%,
    hsla(284, 33%, 73%, 1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    hsla(284, 30%, 52%, 1) 0%,
    hsla(284, 33%, 73%, 1) 100%
  );

  padding-block: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const ContestTitle = styled.h3`
  text-transform: uppercase;
  font-family: 'Paytone One';
  text-align: center;
  font-size: 80px;
  line-height: 80px;
  color: #5a2b6b;
  text-shadow: 0 20px 15px #6f3b82, 0 -2px 1px #5a2b6b;
  letter-spacing: -4px;
`;

export const Timer = styled.h1`
  font-size: calc(60px + 16 * ((100vw - 700px) / 700));
`;

export const Colon = styled.div`
  font-size: calc(60px + 16 * ((100vw - 700px) / 700));
  color: #fff;
`;

const Spin = keyframes`
  100% { 
    transform: rotate(360deg);
  }
`;

const CircleWrapper = styled.div`
  position: relative;
  max-width: 520px;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  :hover {
    cursor: pointer;
  }
  :active {
    .circle {
      animation: ${Spin} 10s linear infinite;
      border: 5px dashed ${({ theme }) => theme.colors.secondary};
    }
    .anim {
      transform: translate(0%, -100%) scale(0.95);
    }
  }

  .anim {
    transform: translate(0%, -100%);
    max-width: 550px;
    width: 100%;
    border-radius: 50%;
    aspect-ratio: 1/1;
    object-fit: cover;
    padding: 10px;
    transition: 300ms;
  }
`;

const Circle = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-clip: content-box;
  animation: ${Spin} 15s linear infinite;
  border: 5px dashed #6f3b82;
`;

const Top = styled.div`
  display: grid;

  grid-template-columns: 1fr;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-gap: 48px;

    grid-template-columns: fit-content(70ch) fit-content(56ch);
  }
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
`;
const Bottom = styled.div`
  display: grid;
  grid-gap: 48px;
  grid-template-columns: 1fr;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-gap: 48px;
    grid-template-columns: fit-content(70ch) fit-content(56ch);
  }
`;

const SubBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 128px;
`;

const AnimatedArrow = keyframes`
0% {opacity:0}
40% {opacity:1}
80% {opacity:0}
100% {opacity:0}
`;

const Arrow = styled.svg`
  width: 60px;
  height: 72px;
  position: absolute;
  margin-top: -100px;
  path {
    stroke: ${({ theme }) => theme.colors.quinary};
    fill: transparent;
    stroke-width: 2px;
    animation: ${AnimatedArrow} 2s infinite;
    -webkit-animation: ${AnimatedArrow} 2s infinite;
  }
  .a1 {
    animation-delay: -1s;
    -webkit-animation-delay: -1s; /* Safari 和 Chrome */
  }
  .a2 {
    animation-delay: -0.5s;
    -webkit-animation-delay: -0.5s; /* Safari 和 Chrome */
  }
  .a3 {
    animation-delay: 0s;
    -webkit-animation-delay: 0s; /* Safari 和 Chrome */
  }
`;

const DonateArrow = () => {
  return (
    <Arrow className='arrows'>
      <path className='a1' d='M0 0 L30 32 L60 0'></path>
      <path className='a2' d='M0 20 L30 52 L60 20'></path>
      <path className='a3' d='M0 40 L30 72 L60 40'></path>
    </Arrow>
  );
};

const RaffleTitle = styled.h1`
  font-size: clamp(30px, calc(60px + 16 * ((100vw - 400px) / 400)), 95px);
  font-weight: 600;
  color: #9761aa;
  margin-bottom: 24px;
  text-transform: uppercase;
  font-family: 'Paytone One';
  filter: drop-shadow(0px 10px 5px rgb(0 0 0/0.4));

  text-align: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    text-align: left;
  }
`;

const LongDog = () => {
  const [donationBtnClicked, setDonationBtnClicked] = useState(false);
  const year = new Date().getFullYear();

  const { timerComponents, status, loading } = useCountDown(
    `${year}/02/05`,
    `${year}/02/12`,
    `${year + 1}/02/05`
  );

  if (!status.active) {
    return (
      <CountDownContainer>
        <div style={{ position: 'relative' }}>
          <h3
            style={{
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            {status.past
              ? 'Thank you to everybody who participated. See you next year!'
              : 'Coming Soon'}
          </h3>
          <ContestTitle>LONG DOG CONTEST</ContestTitle>
          <div className='d-flex justify-content-center'>
            {loading ? (
              <ContestTitle>LOADING</ContestTitle>
            ) : (
              timerComponents?.map((obj: any, i: number) => (
                <div className='d-flex flex-column justify-content-end' key={i}>
                  <div className='d-flex align-items-baseline'>
                    <div className='d-flex flex-column'>
                      <Timer
                        className='d-flex font-weight-bold text-white'
                        style={{
                          filter: 'drop-shadow(0px 10px 10px rgb(0 0 0/0.4))',
                        }}
                      >
                        {obj?.time}
                      </Timer>
                      <Text textAlign='center' color='#fff'>
                        {obj?.tag}
                      </Text>
                    </div>
                    <Colon
                      style={{
                        display: obj?.tag === 'SECONDS' ? 'none' : 'block',
                      }}
                    >
                      &nbsp;:&nbsp;
                    </Colon>
                  </div>
                </div>
              ))
            )}
          </div>
          <div
            className='d-flex'
            style={{ justifyContent: 'space-evenly' }}
          ></div>
        </div>
      </CountDownContainer>
    );
  }

  return (
    <div
      className='d-flex justify-content-center flex-column mx-auto'
      style={{
        padding: '128px 16px',
        maxWidth: '1000px',
        width: '100%',
      }}
    >
      <div className='d-flex flex-column w-100'>
        <Top>
          <RaffleTitle>
            Little Paws <br />
            Long Dog <br />
            Raffle 🐶
          </RaffleTitle>
          <Image
            className='w-100'
            src={LongDogExample}
            alt='LPDR Long Dog Raffle Example'
          />
        </Top>
        <Middle>
          <h4 className='font-weight-bold text-center my-5'>
            How long 📏 is your dog? 🌭
          </h4>
          <Text fontSize='20px' fontWeight={400} marginBottom='8px'>
            ✅ Take a picture of your Long Dog.
          </Text>
          <Text fontSize='20px' fontWeight={400} marginBottom='8px'>
            ✅ Send it to us by email or make a post on social media.
          </Text>
          <Text fontSize='20px' fontWeight={400} marginBottom='8px'>
            ✅ Make a $10 donation.
          </Text>
          <Text fontSize='20px' fontWeight={400} marginBottom='8px'>
            ✅ Become eligible to win a fabulous gift 🛍️ basket.
          </Text>
          <Text fontSize='20px' fontWeight={600} className='mt-5'>
            To enter:
          </Text>
          <Text fontSize='20px' fontWeight={400}>
            Post on Instagram or Facebook with the hashtag #️⃣ #littlepawslongdog
            plus tag 🏷️ @littlepawsdr
          </Text>
          <Text fontSize='20px' fontWeight={600} className='my-2'>
            or
          </Text>
          <Text fontSize='20px' fontWeight={400} marginBottom='32px'>
            Email us at juliejohnson@littlepawsdr.org with the subject as LONG
            DOG RAFFLE.
          </Text>
          <Text fontSize='20px' color='#6f3b82' fontWeight={600}>
            ACCEPTING SUBMISSIONS FROM
          </Text>
          <Text
            fontSize='20px'
            marginBottom='8px'
            color='#6f3b82'
            fontWeight={600}
          >
            February 5th - February 12th, {new Date().getFullYear()}
          </Text>
        </Middle>
        <Bottom className='mt-4'>
          <div className='d-flex flex-column'>
            <Text fontSize='20px' fontWeight={600} marginBottom='8px'>
              Details
            </Text>
            <Text fontSize='20px' marginBottom='8px' fontWeight={400}>
              <Image src={Paw} width='20px' alt='LPDR Paw' /> All long dogs
              welcome to enter 🌭🐶
            </Text>
            <Text fontSize='20px' marginBottom='8px' fontWeight={400}>
              <Image src={Paw} width='20px' alt='LPDR Paw' /> Measure from nose
              to end of tail
            </Text>
            <Text fontSize='20px' marginBottom='8px' fontWeight={400}>
              <Image src={Paw} width='20px' alt='LPDR Paw' /> Random Long Dog
              will be chosen 🎊
            </Text>
            <Text fontSize='20px' marginBottom='8px' fontWeight={400}>
              <Image src={Paw} width='20px' alt='LPDR Paw' /> Shipping available
              within the USA 🇺🇸 only
            </Text>
            <Text fontSize='20px' marginBottom='8px' fontWeight={400}>
              <Image src={Paw} width='20px' alt='LPDR Paw' /> This raffle 🎟️ is
              not associated with Instagram
            </Text>
          </div>
          <CircleWrapper>
            <Circle className='circle' />
            <Image
              className='anim'
              src={LongDogBasket}
              alt='Long Dog Contest Prize'
            />
          </CircleWrapper>
        </Bottom>
        <SubBottom>
          <ThankYou anim={donationBtnClicked}>
            <h2>Thank you</h2>
            <h5>from</h5>
            <Image
              src={Logo}
              alt='LPDR'
              style={{ maxWidth: '300px', width: '100%' }}
            />
          </ThankYou>
          <Heart anim={donationBtnClicked} />
          <DonateArrow />
          <form
            action='https://www.paypal.com/donate'
            method='post'
            target='_top'
          >
            <input
              type='hidden'
              name='hosted_button_id'
              value='5YB4RBLX3H5W8'
            />
            <DonateBtn
              onClick={() => setDonationBtnClicked(true)}
              className='donate-btn'
            >
              DONATE TO LONG DOG
            </DonateBtn>
          </form>
          <Text className='mt-4 mb-3'>Or</Text>
          <Text fontSize='16px' marginBottom='24px'>
            Scan the QR code with your smart phone!
          </Text>
          <Image
            src={LongDogQRCode}
            style={{ maxWidth: '192px', width: '100%', marginBottom: '36px' }}
            alt='LPDR Long Dog QR Code'
          />
          <Text fontWeight={400} fontSize='20px' className='mt-4 text-center'>
            All donations help save dachshunds 🌭 looking for forever homes.🏡
          </Text>
        </SubBottom>
      </div>
    </div>
  );
};

export default LongDog;
