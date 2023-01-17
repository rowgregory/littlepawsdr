import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Accordion } from './styles/place-order/Styles';
import { Text } from './styles/Styles';

const Container = styled.div`
  position: fixed;
  z-index: 101;
  background: #ededed;
  display: flex;
  flex-direction: column;
  width: 100vw;
  bottom: 0;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  div {
    div {
      padding: 10px;
      font-size: 11px;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    bottom: 16px;
    right: 16px;
    width: 100%;
    max-width: 400px;
    div {
      div {
        font-size: 16px;
        padding: 14px;
      }
    }
  }
`;

const CookiePolicyPopUp = () => {
  let showCookiePopUp: any = localStorage.getItem('agreedToCookies')
    ? JSON.parse(localStorage.getItem('agreedToCookies') || '')
    : '';

  const [cookiesAccepted, setCookiesAccepted] = useState(
    showCookiePopUp ? false : true
  );

  const consentToCookies = () => {
    localStorage.setItem('agreedToCookies', 'true');
    setCookiesAccepted(false);
  };

  return (
    <Container>
      <Accordion toggle={cookiesAccepted} maxheight='208px'>
        <Text background='#262e39' color='#fff' p='32px 24px' fontSize='18px'>
          This website uses cookies to ensure you get the best experience on our
          website.
          <br />
          <Link to='/cookie-policy'>Learn More</Link>
        </Text>
        <Text
          textAlign='center'
          width='100%;'
          p='18px'
          background='#9761aa'
          color='#fff'
          fontSize='18px'
          cursor='pointer'
          onClick={() => consentToCookies()}
        >
          Got it!
        </Text>
      </Accordion>
    </Container>
  );
};

export default CookiePolicyPopUp;
