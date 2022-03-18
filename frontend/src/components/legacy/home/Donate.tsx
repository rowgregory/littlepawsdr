import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export const DonateBtnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  position: relative;

  button {
    position: relative;
    display: inline-block;
    border: none;
    border-radius: 50px;
    background: none;
    padding: 75px 175px;
    margin: 30px;
    font-size: 1.5rem;
    font-family: 'Ubunut', sans-serif;
    :hover {
      div {
        /* letter-spacing: 3px; */
        &:before {
          transform: skewX(40deg) translateX(200%);
        }
      }
      &:before,
      &:after {
        height: 50%;
        width: 80%;
        border-radius: 30px;
        transition-delay: 0.3s;
      }
      &:before {
        bottom: 0;
      }
      &:after {
        top: 0;
      }
    }
    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 10px;
      border-radius: 10px;
      transition: all 0.4s ease-in-out;
      transition-delay: 0s;
        background: #2bd2ff;
        box-shadow: 
          0 0 5px #2bd2ff,
          0 0 15px #2bd2ff,
          0 0 30px #2bd2ff,
          0 0 60px #2bd2ff
      
      }
    }

    &:before {
      bottom: -5px;
    }
    &:after {
      top: -5px;
    }
  }

  button div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    color: #fff;
    z-index: 1;
    font-weight: 400;
    letter-spacing: 1px;
    text-decoration: none;
    overflow: hidden;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        to left,
        rgba(255, 255, 255, 0.15),
        transparent
      );
      transform: skewX(40deg) translateX(0);
      transition: all 0.5s ease-out;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  padding: 75px 80px;
  max-width: 920px;
  text-align: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    padding: 75px 120px;
  }
`;
const Title = styled.div`
  font-family: 'Ubuntu', sans-serif;
  font-size: 2rem;
  color: #fff;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: 3rem;
  }
`;

const DonateButton = () => {
  const history = useHistory();

  return (
    <>
      <Container>
        <TitleContainer>
          <Title>Interested in supporting Little Paws Dachshund Rescue?</Title>
        </TitleContainer>
        <DonateBtnContainer>
          <button>
            <div
              onClick={() => {
                setTimeout(() => {
                  history.push('/donate');
                }, 750);
              }}
            >
              Donate
            </div>
          </button>
        </DonateBtnContainer>
      </Container>
    </>
  );
};

export default DonateButton;
