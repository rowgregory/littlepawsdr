import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import BackgroundImage from '../components/assets/404-bg.png';
import SilverPawsSad from '../components/assets/silver-paws-sad.png';
import SilverPawsHello from '../components/assets/archive-kitty.png';
import WindowBottomTileLeft from '../components/assets/window_bottom_tile_left.png';
import GreenCircleBtn from '../components/assets/green_circle_btn.png';
import BlueBackBtn from '../components/assets/blue_back_btn.png';
import Pole from '../components/assets/pole.png';
import WindowPiece from '../components/assets/window_top_tile_right_piece.png';
import { useState } from 'react';
import SplitTextToChars from '../utils/SplitTextToChars';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${BackgroundImage}) no-repeat;
  background-size: cover;
  min-height: 100vh;
  position: fixed;
  width: 100%;
`;
const SilverPawsSadImage = styled(Image)`
  with: 100%;
  object-fit: cover;
  z-index: 10;
  transform: scaleX(-1);
  justify-self: center;
  position: absolute;
  margin-right: 16.5px;
  max-height: 60px;
  margin-top: 16px;
  cursor: pointer;
  @media screen and (min-width: 353px) {
    margin-right: 24px;
    max-height: 76px;
    margin-top: 24px;
  }
  @media screen and (min-width: 800px) {
    margin-right: 50px;
    margin-top: 50px;
    max-height: 174px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    margin-right: 60px;
    margin-top: 50px;
    max-height: 200px;
  }
`;
const Text404 = styled.div`
  color: #fff;
  font-size: 91px;
  font-family: 'Hyperspace-Bold', sans-serif;
  position: absolute;
  @media screen and (min-width: 353px) {
    font-size: 119px;
  }
  @media screen and (min-width: 800px) {
    font-size: 260px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    font-size: 300px;
    line-height: 252px;
  }
`;
const OopsText = styled.div`
  color: #fff;
  font-family: 'Hyperspace-Bold', sans-serif;
  position: absolute;
  font-size: 14px;
  left: -85px;
  top: -54px;
  @media screen and (min-width: 353px) {
    font-size: 20px;
    left: -113px;
    top: -70px;
  }
  @media screen and (min-width: 800px) {
    font-size: 35px;
    left: -242px;
    top: -137px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    font-size: 42px;
    left: -278px;
    top: -156px;
  }
`;
const WindowTileLeft = styled(Image)`
  position: absolute;
  padding-inline: 16px;
  max-width: 298px;
  top: 0px;

  @media screen and (min-width: 353px) {
    max-width: 380px;
    top: -3px;
  }
  @media screen and (min-width: 800px) {
    max-width: 700px;
    top: 10px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    max-width: 800px;
    top: 10px;
  }
`;

const moveArrow = keyframes`
0% {
  transform: scale(0.7);
}
50% {
  transform: scale(1.15);
}
100% {
  transform: scale(0.7) ;
  }
`;
const rotateGreenCircle = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;
const GreenCircleImage = styled(Image)<{ rotate: string }>`
  position: absolute;
  max-width: 47px;
  top: 49px;
  left: -134px;
  animation: ${({ rotate }) =>
    rotate === 'true'
      ? css`
          ${rotateGreenCircle} 5000ms linear infinite
        `
      : ''};
  @media screen and (min-width: 353px) {
    max-width: 54px;
    top: 65px;
    left: -172px;
  }
  @media screen and (min-width: 800px) {
    max-width: 80px;
    top: 65px;
    left: -400px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    max-width: 80px;
    top: 74px;
    left: -450px;
  }
`;

const BlueBackBtnImage = styled(Image)`
  position: absolute;
  animation: ${moveArrow} 1s linear infinite;
  max-width: 25px;
  top: 61px;
  left: -125px;
  @media screen and (min-width: 353px) {
    max-width: 33px;
    top: 75px;
    left: -164px;
  }
  @media screen and (min-width: 800px) {
    max-width: 44px;
    top: 83px;
    left: -386px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    top: 92px;
    left: -435px;
  }
`;
const PoleImage = styled(Image)`
  left: 128px;
  top: -124px;
  height: 169px;
  position: absolute;

  @media screen and (min-width: 353px) {
    left: 168px;
    top: -140px;
    height: 196px;
  }
  @media screen and (min-width: 800px) {
    left: 323px;
    top: -227px;
    height: 349px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    left: 371px;
    top: -262px;
    height: 400px;
  }
`;

const BackLink = styled(Link)`
  cursor: pointer;
  position: relative;
`;

const Illustrator = styled.a`
  font-size: 10px;
  position: fixed;
  bottom: 0;
  right: 0;
  mix-blend-mode: hard-light;
`;

const WindowPieceImage = styled(Image)`
  position: absolute;
  left: 94.5px;
  top: -139px;
  width: 37px;
  @media screen and (min-width: 353px) {
    left: 131px;
    top: -156px;
    width: 41px;
  }
  @media screen and (min-width: 800px) {
    left: 263px;
    top: -254px;
    width: 68px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    left: 290px;
    top: -297px;
    width: 89px;
  }
`;
const GreenCircleImage2 = styled(Image)<{ rotate: string }>`
  position: absolute;
  max-width: 47px;
  top: -105px;
  left: 76px;
  animation: ${({ rotate }) =>
    rotate === 'true'
      ? css`
          ${rotateGreenCircle} 5000ms linear infinite
        `
      : ''};
  @media screen and (min-width: 353px) {
    max-width: 54px;
    top: -117px;
    left: 108px;
  }
  @media screen and (min-width: 800px) {
    max-width: 80px;
    top: -188px;
    left: 231px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    max-width: 80px;
    top: -215px;
    left: 261px;
  }
`;

const BlueBackBtnImage2 = styled(Image)`
  position: absolute;
  animation: ${moveArrow} 1s linear infinite;
  max-width: 25px;
  top: -94px;
  left: 85px;
  @media screen and (min-width: 353px) {
    max-width: 33px;
    top: -106px;
    left: 117px;
  }
  @media screen and (min-width: 800px) {
    max-width: 44px;
    top: -169px;
    left: 246px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    top: -196px;
    left: 277px;
  }
`;

const PageNotFound = () => {
  const [helloSilverPaws, setHelloSilverPaws] = useState(false);

  return (
    <Container>
      <div className='flex h-full flex-col items-center justify-center relative flex-0'>
        <OopsText>OOPS!</OopsText>
        <Text404>404</Text404>
        <SilverPawsSadImage
          onClick={() => setHelloSilverPaws(true)}
          src={helloSilverPaws ? SilverPawsHello : SilverPawsSad}
          alt='404 Error'
        />
        <WindowTileLeft src={WindowBottomTileLeft} />
        <BackLink to='/'>
          <div>
            <GreenCircleImage rotate={helloSilverPaws.toString()} src={GreenCircleBtn} />
            <BlueBackBtnImage src={BlueBackBtn} />
          </div>
        </BackLink>
        <PoleImage src={Pole} />
        <WindowPieceImage src={WindowPiece} />
        <BackLink to='/'>
          <div>
            <GreenCircleImage2 rotate={helloSilverPaws.toString()} src={GreenCircleBtn} />
            <BlueBackBtnImage2 src={BlueBackBtn} />
          </div>
        </BackLink>
      </div>
      {helloSilverPaws && (
        <div className='flex absolute'>
          <SplitTextToChars
            text={`Click on the blue arrows to go home`}
            fontSize='12px'
            fontFamily={`'Hyperspace-Bold', sans-serif`}
            color='#fff'
            mt='321px'
            width='280px'
            justifyContent='center'
          />
        </div>
      )}
      <Illustrator target='_blank' href='https://icons8.com/illustrations/author/GrbQqWBEhaDS'>
        Illustration by Liam Moore
      </Illustrator>
    </Container>
  );
};

export default PageNotFound;
