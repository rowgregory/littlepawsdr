import React, { useState } from 'react';
import { Modal, OverlayTrigger, Popover, Image } from 'react-bootstrap';
import styled, { keyframes, useTheme } from 'styled-components';
import { SMData } from '../../utils/sociaMediaData';
import { Content } from '../ContinueSessionModal';
import NightGram from '../../components/assets/littlepawsdr_qr 2.png';
import DayGram from '../../components/assets/littlepawsdr_qr 3.png';
import { Text } from '../../components/styles/Styles';

// const SMContianer = styled.div`
//   width: 100%;
//   height: 30px;
//   background: ${({ theme }) => theme.smcontainer.bg};
//   display: flex;
//   align-items: center;
//   padding: 0 0.25rem;
//   margin-top: 67.99px;
//   position: fixed;
//   z-index: 10;
// `;

const InsideContainer = styled.div`
  /* max-width: 1836px; */
  /* width: 100%; */
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;
  /* margin: 0 auto; */
  /* @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 0 1px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 0 48px;
  } */
`;

const SMIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  transition: 300ms;
  cursor: pointer;
  border-radius: 15px;
  :hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: #000;
  }
`;

const InstagramBtn = styled.div`
  width: 200px;
  background: linear-gradient(45deg, #ffdd55 0%, #ff543e 52%, #c837ab 100%);
  color: #fff;
  height: 50px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: 300ms;
  /* :hover {
    letter-spacing: 2px;
    background: linear-gradient(45deg, #ebcc50 0%, #e14d3a 52%, #a7308f 100%);
  } */
`;

const moveUpAndDown = keyframes`
  0%, 100% {
    top: 147px;
  }
  50% {
    top: 157px;
  }
`;

const InstaArrow = styled.i`
  background: linear-gradient(45deg, #ebcc50 0%, #e14d3a 52%, #a7308f 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;

  animation: ${moveUpAndDown} 1s linear infinite;
  margin-bottom: 1rem;
`;

const SocialMediaNavbar = () => {
  const theme = useTheme() as any;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isDay = theme.mode === 'day';
  const imgSrc = isDay ? DayGram : NightGram;
  return (
    <>
      <Modal show={show} centered onHide={handleClose} size='lg'>
        <Content className='d-flex justify-content-center flex-column align-items-center'>
          <InstagramBtn
            onClick={() =>
              window.open(
                'https://www.instagram.com/littlepawsdr/?hl=en',
                '_blank'
              )
            }
          >
            Instagram
          </InstagramBtn>
          <Text marginBottom='1rem'>Or</Text>
          <Text fontFamily={`Duru Sans`} textAlign='center' marginBottom='3rem'>
            Scan QR Code
          </Text>
          <InstaArrow className='fas fa-arrow-down fa-2x'></InstaArrow>
          <Image
            src={imgSrc}
            alt='insta-qr'
            style={{ maxWidth: '600px', width: '100%' }}
          />
        </Content>
      </Modal>

      {/* <SMContianer> */}
      <InsideContainer>
        {SMData().map((obj: any, i: number) => (
          <OverlayTrigger
            key={i}
            trigger={['hover', 'focus']}
            placement='top'
            overlay={
              <Popover className='p-2' id='popover-positioned-bottom'>
                {obj.popTag}
              </Popover>
            }
          >
            <SMIconContainer
              onClick={() =>
                obj.popTag === 'Instagram'
                  ? handleShow()
                  : obj.linkKey
                  ? window.open(obj.linkKey, '_blank')
                  : window.scrollTo(0, document.body.scrollHeight)
              }
            >
              <i className={obj.className} style={obj.color}></i>
            </SMIconContainer>
          </OverlayTrigger>
        ))}
      </InsideContainer>
      {/* </SMContianer> */}
    </>
  );
};

export default SocialMediaNavbar;
