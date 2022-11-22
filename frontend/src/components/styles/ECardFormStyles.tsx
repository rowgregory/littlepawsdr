import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  margin-inline: auto;
  padding: 96px 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

export const Occasions = styled.div`
  width: 100%;
  padding: 20px 15px 0px 30px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    min-width: 300px;
    miax-width: 300px;
    width: 300px;
  }
`;

export const ECardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 0;
  }
`;

export const BrowseECards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 1.5rem;
  padding-right: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const ImageContainer = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
`;
export const ECardImage = styled(Image)`
  aspect-ratio: 1/1;
  max-width: 280px;
  width: 100%;
  object-fit: cover;
`;

export const ECardPrice = styled.div`
  position: absolute;
  z-index: 10;
  top: 5px;
  right: 5px;
  background: yellow;
  color: #000;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  :before,
  :after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background: yellow;
  }

  :before {
    transform: rotate(30deg);
  }
  :after {
    transform: rotate(60deg);
  }
`;

export const EcardDetailsContainer = styled.div`
  margin-inline: auto;
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1260px;
  padding: 1rem;

  a {
    font-size: 12px;
  }
`;

export const ECardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Half = styled.div`
  width: 100%;
`;

export const Personalize = styled(Link)`
  background: #ffd813;
  color: #0f1111;
  font-weight: bold;
  font-family: Arial;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 0;
  :hover {
    filter: brightness(0.95);
    background: #ffd813;
    color: #0f1111;
    text-decoration: none;
  }
  :focus {
    background: #ffd813;
  }
`;
