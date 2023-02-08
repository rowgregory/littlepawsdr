import { Col } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import LegacyWallpaper from '../../components/assets/aqua_tile.jpg';

export const DogContainer = styled(Col)`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr;
  padding: 1rem;
  grid-row-gap: 120px;
  margin-bottom: 96px;
  margin-top: 75px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
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
  background: #fff;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  padding: 16px;
  padding: 16px 0 0;
  min-width: 200px;
  border-radius: 100px 100px 0 0;
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

export const SupportFoster = styled.div`
  padding-block: 60px;
  margin-top: 96px;
  position: relative;
  overflow: hidden;
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
  a {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    :hover {
      text-decoration: none;
    }
  }
`;
