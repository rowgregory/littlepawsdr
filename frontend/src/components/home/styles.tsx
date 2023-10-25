import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import LegacyWallpaper from '../../components/assets/aqua_tile.jpg';
import HomeDog from '../../components/assets/home_dog_11.jpeg';
import Parallax2 from '../../components/assets/parallax-2.jpg';

export const SectionContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[5]};
  width: 100%;
  margin: 0 auto 128px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 0 auto 128px;
  }
`;

export const SectionTitle = styled(Link)`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.quinary};
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  cursor: pointer;
  transition: 300ms;
  :hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.quinary};
    letter-spacing: 3px;
  }
`;

export const DogContainer = styled(Row)`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  width: 100%;
  @media screen and (min-width: 520px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  a {
    overflow: hidden;
    text-decoration: none;
    position: relative;

    :hover {
      div {
        img {
          transform: rotate(20deg) scale(1.5);
        }
      }
    }
    div {
      img {
        transition: transform 300ms ease-out;
        object-fit: cover;
        aspect-ratio: 1/1;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export const ImageContainer = styled.div`
  transition: 1300ms;
  position: relative;
  overflow: hidden;
  :hover {
    &::after {
      content: '';
      position: absolute;
      top: 6px;
      left: 6px;
      right: 6px;
      bottom: 6px;
      z-index: 20px;
      border: 5px solid #fff;
      opacity: 0.6;
    }
  }
`;

export const Draw = keyframes`
  from {
    stroke-dashoffset: 400
  }
  to {
    stroke-dashoffset: 0;
  }
`;

export const Wave = styled.svg`
  height: 150px;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 0;
  path {
    stroke-dasharray: 400;
    stroke-linecap: round;
    animation-timing-function: ease-in;
    animation: ${Draw} 6s infinite;
    animation-direction: alternate-reverse;
    opacity: 0.2;
  }
`;

export const QuickOptionContainerDesktop = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    color: #fff;
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    border-top: 1px solid rgb(255, 255, 255, 0.5);
    width: 100%;

    a:nth-child(1) {
      padding: 40px 25px;
      :hover {
        &:before {
          content: '';
          position: absolute;
          background: url(${LegacyWallpaper});
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 33.3%;
          opacity: 0.7;
          color: #fff;
          z-index: -1;
        }
      }
    }

    a:nth-child(2) {
      padding: 40px 25px;
      border-left: 1px solid rgb(255, 255, 255, 0.5);
      border-right: 1px solid rgb(255, 255, 255, 0.5);
      :hover {
        &:before {
          content: '';
          position: absolute;
          background: url(${LegacyWallpaper});
          top: 0;
          left: 33.3%;
          bottom: 0;
          right: 0;
          width: 33.3%;
          opacity: 0.7;
          color: #fff;
          z-index: -1;
        }
      }
    }
    a:nth-child(3) {
      padding: 40px 25px;
      :hover {
        &:before {
          content: '';
          position: absolute;
          background: url(${LegacyWallpaper});
          top: 0;
          left: 66.6%;
          bottom: 0;
          right: 0;
          width: 33.3%;
          opacity: 0.7;
          color: #fff;
          z-index: -1;
        }
      }
    }
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 2rem;
      cursor: pointer;
      text-decoration: none;
      div {
        color: #fff !important;
      }
    }
  }
`;

export const QuickOptionContainerMobile = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  color: #fff;
  width: 100%;
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 2rem;
    cursor: pointer;
    text-decoration: none;
    transition: 300ms;
    border-top: 2px solid rgb(255, 255, 255);
    background: url(${LegacyWallpaper});
    height: 125px;
    div {
      color: #fff;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: none;
  }
`;

export const Container = styled.div`
  position: relative;
  height: 100vh;
`;

export const HomeContainer = styled.div`
  margin: 96px auto 0;
  width: 100%;
`;

export const ParallaxWindow = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: block;
    position: relative;
    width: 100%;
    padding-bottom: 60%;
    height: 100vh;
  }
`;
export const ParallaxSectionContent = styled.h3`
  top: 50%;
  marign-left: auto;
  margin-right: auto;
  position: absolute;
  padding: 0 20px;
  z-index: 25;
  color: #fff;
  font-size: 28px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-weight: 400;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: 60px;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    filter: drop-shadow(0px 20px 10px rgb(0 0 0/0.4));
  }
`;
export const ParallaxImg = styled.div`
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  background-image: url(${HomeDog});
  background-repeat: no-repeat;
`;
export const ParallaxImg2 = styled.div`
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  background-image: url(${Parallax2});
  background-repeat: no-repeat;
`;

export const ImageGallery = styled.div`
  background: ${({ theme }) => theme.header.bg};
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
  }
`;

export const MobileImageSection = styled.div`
  display: block;
  position: relative;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: none;
  }
`;
