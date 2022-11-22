import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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
        transition: 1300ms;
        div {
          &::before {
            content: '';
            position: absolute;
            top: 6px;
            left: 6px;
            right: 6px;
            bottom: 70px;
            z-idnex: 20px;
            border: 5px solid white;
            opacity: 0.6;
          }
          img {
            transform: rotate(20deg) scale(1.5);
          }
        }
      }
    }
    div {
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
  }
`;

export const shine = keyframes`
    to {
      background-position: 200% center;
    }
`;

export const ComingSoonText = styled.div`
  font-size: 3.2rem;
  margin-top: 36px;
  font-family: 'Hammersmith One', sans-serif;
  text-align: center;

  background: -webkit-linear-gradient(
    left,
    #009603,
    #00888b,
    #060f92,
    #500094,
    #6a007e,
    #500094,
    #060f92,
    #00888b,
    #009603
  ); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(
    right,
    #009603,
    #00888b,
    #060f92,
    #500094,
    #6a007e,
    #500094,
    #060f92,
    #00888b,
    #009603
  ); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(
    right,
    #009603,
    #00888b,
    #060f92,
    #500094,
    #6a007e,
    #500094,
    #060f92,
    #00888b,
    #009603
  ); /* For Firefox 3.6 to 15 */
  background: linear-gradient(
    to right,
    #009603,
    #00888b,
    #060f92,
    #500094,
    #6a007e,
    #500094,
    #060f92,
    #00888b,
    #009603
  ); /* Standard syntax (must be last) */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: ${shine} 10s linear infinite;
  font-family: 'Duru', sans-serif;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 4rem;
  }
`;

export const GetReadText = styled.div`
  font-size: 16px;
  padding: 8px 16px;
`;
