import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 75px;
  padding-inline: 16px;
  margin-bottom: 128px;
`;

export const TopSection = styled.div`
  max-width: 980px;
  width: 100%;
  margin-inline: auto;
  padding-inline: 16px;
`;
export const WelcomeWienerGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  margin-inline: auto;
  max-width: 1000px;
  :last-child {
    grid-column: 1 / -1;
  }

  @media screen and (min-width: 600px) {
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    margin: 0 auto;
  }
`;

export const WelcomeWienerCardContainer = styled(Link)`
  position: relative;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  &:hover .overlay {
    transform: translateY(-15%);
    transition: 300ms;
  }
  &:hover .img {
    height: 85%;
    transition: 300ms;
  }
  .overlay {
    &.visible {
      transform: translateY(-15%);
      transition: 300ms;
    }
  }
  .img {
    &.visible {
      height: 85%;
      transition: 300ms;
    }
  }

  cursor: pointer;
  display: flex;
  flex-direction: column;
  aspect-ratio: 1/1;
  width: 100%;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, minmax(320px, 1fr));
    margin: 0 auto;
  }
`;

export const IsLiveIndicator = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: green;
  right: 15px;
  top: 5px;
  z-index: 100;
  i {
    color: #fff;
  }
`;

export const WienerThumbnail = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 300ms;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  transition: transform 300ms;
`;

export const Name = styled.h3`
  color: #fff;
  font-size: 16px;
  transition: 300ms;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
`;
