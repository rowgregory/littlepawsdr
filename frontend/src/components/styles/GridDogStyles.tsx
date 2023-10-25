import { Card, Col } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import LegacyWallpaper from '../../components/assets/aqua_tile.jpg';
import { Link } from 'react-router-dom';

export const DogContainer = styled(Col)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  margin-bottom: 48px;
  margin-top: 75px;
  padding-inline: 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const Container = styled.div`
  max-width: 980px;
  width: 100%;
  margin-inline: auto;
  margin-bottom: 96px;
  padding-inline: 16px;
`;
export const TextContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(0 0 0/ 0.5);
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  padding: 4px;
  min-width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const MoveLeft = keyframes`
 0% {
    background-position: 0 0;
 }
 100% {
    background-position: -100% 0;
 }
`;

export const SupportFoster = styled(Link)`
  padding-block: 60px;
  margin-top: 96px;
  position: relative;
  overflow: hidden;
  text-decoration: none !important;
  &:before {
    content: '';
    position: absolute;
    background: url(${LegacyWallpaper});
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  :hover {
    &:before {
      animation: ${MoveLeft} 20s linear infinite;
    }
  }
  div {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    :hover {
      text-decoration: none;
    }
  }
`;

export const LoadMoreBtn = styled.button`
  border: none;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7a7a7a;
  border: 1px solid #d1d1d1;
  background: transparent;
  font-size: 15px;
  border-radius: 8px;
  transition: 300ms;
  :hover {
    color: #111;
    border: 1px solid #767676;
    box-shadow: 0 1px 2px #00000014;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    height: 80px;
  }
`;

export const DachshundImage = styled(Card.Img)`
  aspect-ratio: 1/1;
  object-fit: cover;
  width: 100%;
`;
