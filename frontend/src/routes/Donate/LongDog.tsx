import React, { useState } from 'react';
import Heart from '../../components/svg/Heart';
import LongDogQRCode from '../../components/assets/LongDogQRCode.png';
import LongDogBasket from '../../components/assets/long-dog-basket.jpg';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import { Image } from 'react-bootstrap';
import { DonateBtn } from './Donate';

const CountDownContainer = styled.section`
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

const LongDogContest = styled.h3`
  text-transform: uppercase;
  font-family: 'Paytone One';
  text-align: center;
  font-size: 80px;
  line-height: 80px;
  color: #5a2b6b;
  text-shadow: 0 20px 15px #6f3b82, 0 -2px 1px #5a2b6b;
  letter-spacing: -4px;
`;

const Timer = styled.h1`
  font-size: 54px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: 66px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 90px;
  }
`;

const Colon = styled.div`
  font-size: 68px;
  color: #fff;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: 80px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 106px;
  }
`;

const LongDog = ({ timer, timerComponents }: any) => {
  const [donationBtnClicked, setDonationBtnClicked] = useState(false);

  const todaysDate = new Date().toISOString().split('T')[0];
  const startDate = '2023-02-04';
  const endDate = '2023-02-12';

  const d1 = startDate.split('-') as any;
  const d2 = endDate.split('-') as any;
  const c = todaysDate.split('-') as any;

  const from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]); // -1 because months are from 0 to 11
  const to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
  const check = new Date(c[0], parseInt(c[1]) - 1, c[2]);

  const longDogFundraiserShouldDisplay =
    check >= from && check <= to && timer === '00 : 00 : 00 : 00';

  return (
    <>
      {!longDogFundraiserShouldDisplay && (
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
            <LongDogContest>LONG DOG CONTEST</LongDogContest>
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
      {longDogFundraiserShouldDisplay && (
        <div
          className='d-flex align-items-center justify-content-center flex-column mx-auto'
          style={{
            padding: '128px 0',
            overflow: 'hidden',
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
            Longest Dog Contest! 🐶
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
          <Image
            src={LongDogBasket}
            alt='Long Dog Contest Prize'
            style={{
              maxWidth: '250px',
              width: '100%',
              borderRadius: '50%',
              border: '7px solid #5a2b6b',
              marginBottom: '48px',
            }}
          />

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
            style={{ maxWidth: '192px', width: '100%' }}
            alt='LPDR Long Dog QR Code'
          />
        </div>
      )}
    </>
  );
};

export default LongDog;
