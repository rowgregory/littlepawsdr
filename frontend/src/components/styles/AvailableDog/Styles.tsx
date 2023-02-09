import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface DachshundDetailsProps {
  dachshundDetails: {
    loading: boolean;
    error: string;
    dachshund: {
      meta: any;
      data: [
        {
          attributes: any;
          id: any;
        }
      ];
      included: any;
    };
  };
}

export const StyledCarousel = styled(Carousel)`
  background: ${({ theme }) => theme.card.bg};
  border: 1px solid ${({ theme }) => theme.input.border};
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 65%;
    height: 65%;
  }
`;

export const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[3]};
  margin-inline: auto;
  padding-inline: 8px;
  margin-top: 96px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 16px;
  }
`;

export const AdoptMeLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  text-align: center;
  font-size: 1.25rem;
  padding: 0.375rem 1.5rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  transition: 300ms;
  margin-bottom: 48px;
  :hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.white};
    text-decoration: none;
  }
  :active {
    background: ${({ theme }) => theme.colors.blue03};
  }
`;

export const BottomSection = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin: 5rem 0rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
  div {
    color: #fff;
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export const DogDetailsContainer = styled.div`
  margin: 0.75rem 0 0;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-left: 1.875rem;
  }
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
    margin-bottom: 60px;
  }
`;

export const Description = styled.div`
  font-size: 15px;
  margin-bottom: 48px;
  font-family: 'Roboto' !important;
  font-weight: 300;

  p {
    font-weight: 300;
    line-height: 20px !important;
    span {
      font-family: 'Roboto' !important;
      font-size: 15px !important;
      line-height: 20px !important;
      background: transparent !important;
      color: ${({ theme }) => theme.text} !important;

      span {
        text-indent: 20px !important;
        background: transparent !important;
        color: ${({ theme }) => theme.text} !important;
        strong {
          font-size: 15px !important;
          font-family: 'Roboto' !important;
        }
      }
    }
    strong {
      font-family: 'Roboto' !important;
    }
  }
`;
