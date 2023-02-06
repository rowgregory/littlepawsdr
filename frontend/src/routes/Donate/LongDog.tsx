import React, { useState } from 'react';
import Heart from '../../components/svg/Heart';
import LongDogQRCode from '../../components/assets/LongDogQRCode.png';
import LongDogBasket from '../../components/assets/long-dog-basket.jpg';
import styled, { keyframes } from 'styled-components';
import { Text } from '../../components/styles/Styles';
import { Image } from 'react-bootstrap';
import { DonateBtn, ThankYou } from './Donate';
import Logo from '../../components/assets/logo-white2.png';

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
  margin-bottom: 52px;
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
    position: absolute;
    transform: translate(0%, -100%);
    max-width: 500px;
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

const LongDog = ({ timerComponents, showFundraiser }: any) => {
  const [donationBtnClicked, setDonationBtnClicked] = useState(false);

  return (
    <>
      {!showFundraiser && (
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
              Coming Soon
            </h3>
            <ContestTitle>LONG DOG CONTEST</ContestTitle>
            <div className='d-flex justify-content-center'>
              {timerComponents?.map((obj: any, i: number) => (
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
              ))}
            </div>
            <div
              className='d-flex'
              style={{ justifyContent: 'space-evenly' }}
            ></div>
          </div>
        </CountDownContainer>
      )}
      {showFundraiser && (
        <div
          className='d-flex align-items-center justify-content-center flex-column mx-auto'
          style={{
            padding: '128px 16px',
            maxWidth: '520px',
            width: '100%',
          }}
        >
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: '#9761aa',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            Enter to win 🏆 the Little Paws 🐾 <br />
            Long Dog Contest! 🐶
          </h1>
          <h5 className='font-weight-bolder mb-4'>
            How long 📏 is your dog? 🌭
          </h5>
          <Text fontSize='16px' textAlign='center' marginBottom='24px'>
            Measure your dog 📏 from nose to end of tail and make a post on
            Instagram with the hashtag #️⃣ #littlepawslongdog and tag 🏷️
            @littlepawsdr along with making a $10 donation 💰
          </Text>
          <Text fontSize='16px' marginBottom='24px' fontWeight={400}>
            All dachshund and dachshund mixes are invited! 🤗
          </Text>

          <Text fontSize='16px' marginBottom='24px' textAlign='center'>
            Please include your Instagram handle in the notes 🗒 section when
            checking out! 📱
          </Text>
          <Text fontSize='20px' fontWeight={400} marginBottom='48px'>
            You can win a fabulous gift 🛍️ basket!
          </Text>
          <CircleWrapper>
            <Circle className='circle' />
            <Image
              className='anim'
              src={LongDogBasket}
              alt='Long Dog Contest Prize'
            />
          </CircleWrapper>
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
              DONATE
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
          <Text fontSize='14px' textAlign='center'>
            USA 🇺🇸 shipping only. International entry/winner would pay own
            shipping. 📦
          </Text>
        </div>
      )}
    </>
  );
};

export default LongDog;
