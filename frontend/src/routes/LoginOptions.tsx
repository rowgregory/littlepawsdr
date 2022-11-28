import React, { useState, useEffect, useRef } from 'react';
import { Col, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { registerGuestUser } from '../actions/guestUserActions';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import { FormContainer, Text } from '../components/styles/Styles';
import { CSSTransition } from 'react-transition-group';
import { useWindowSize } from '../utils/useWindowSize';

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: flex;
    flex-direction: row;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5rem;
  }
`;

const Titles = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.625rem;
`;

const VerticalSeparator = styled.div`
  border-right: 1px solid ${({ theme }) => theme.separator};
  height: auto;
`;

const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary};
  transition: 300ms;
  :hover,
  :active,
  :disabled {
    background: ${({ theme }) => theme.colors.secondary};
    filter: brightness(0.9);
  }
`;

const LoginOptions = ({ history }: any) => {
  const dispatch = useDispatch();
  const [guestEmail, setGuestEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [menuHeight, setMenuHeight] = useState() as any;
  const signInRef = useRef() as any;

  const {
    guestUserRegister: {
      loading: loadingGuestUserRegister,
      error: errorGuestUserRegister,
      success: successGuestUserRegister,
      guestUserInfo,
    },
    userLogin: { loading: loadingUserLogin, userInfo, error: errorUserLogin },
  } = useSelector((state: any) => state);

  const continueAsGuestHandler = (e: any) => {
    e.preventDefault();
    dispatch(registerGuestUser(guestEmail));
  };

  const singInHandler = (e: any) => {
    e.preventDefault();
    localStorage.removeItem('guestUserInfo');
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push({
        pathname: '/cart/place-order',
        state: { isGuestUser: false },
      });
    } else if (successGuestUserRegister) {
      history.push({
        pathname: '/cart/place-order',
        state: { isGuestUser: true, guestUserEmail: guestUserInfo?.email },
      });
    }
  }, [email, guestUserInfo, history, successGuestUserRegister, userInfo]);

  const [width] = useWindowSize() as any;

  const calcHeight = (el: any) => setMenuHeight(el.offsetHeight);

  return (
    <>
      <Container style={{ overflow: 'hidden' }}>
        <Col>
          <div style={{ width: '324px' }}>
            <FormContainer>
              <Titles>Guest</Titles>
              <Text fontSize='0.85rem' marginBottom='1.25rem'>
                You can create an account when you check out.
              </Text>
              {errorGuestUserRegister && (
                <Message variant='danger'>{errorGuestUserRegister}</Message>
              )}
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group controlId='guestEmail'>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={guestEmail}
                    onChange={(e: any) => setGuestEmail(e.target.value)}
                    required={true}
                  ></Form.Control>
                </Form.Group>
                <StyledButton
                  disabled={
                    loadingGuestUserRegister ||
                    loadingUserLogin ||
                    guestEmail === ''
                  }
                  className='d-flex align-items-center border-0 w-100 justify-content-center'
                  onClick={(e: any) => {
                    e.preventDefault();
                    continueAsGuestHandler(e);
                  }}
                >
                  <Text fontSize='0.9375rem' color='#fff'>
                    Guest Checkout
                  </Text>
                  {loadingGuestUserRegister && (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  )}
                </StyledButton>
              </Form>
            </FormContainer>
          </div>
        </Col>
        <VerticalSeparator />
        <Col style={{ overflow: width > 768 ? 'hidden' : '' }}>
          <div
            style={{
              height: `${menuHeight}px`,
              overflow: 'hidden',
              transition: `height 300ms ease`,
            }}
          >
            <CSSTransition
              in={true}
              unmountOnExit
              timeout={500}
              classNames='slide-1'
              onEnter={calcHeight}
              ref={signInRef}
            >
              <div style={{ width: '324px' }}>
                <FormContainer>
                  <Titles>Sign In</Titles>
                  {errorUserLogin && (
                    <Message variant='danger'>{errorUserLogin}</Message>
                  )}
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Form.Group controlId='email'>
                      <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        required={true}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                      <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e: any) => {
                          setPassword(e.target.value);
                        }}
                        required={true}
                      ></Form.Control>
                    </Form.Group>
                    <StyledButton
                      disabled={
                        loadingGuestUserRegister ||
                        loadingUserLogin ||
                        email === '' ||
                        password === ''
                      }
                      onClick={(e: any) => {
                        e.preventDefault();
                        singInHandler(e);
                      }}
                      className='d-flex align-items-center border-0 w-100  justify-content-center'
                    >
                      <Text color='#fff'>
                        Sign{loadingUserLogin && 'ing'} In
                        {loadingUserLogin && '...'}&nbsp;&nbsp;
                      </Text>
                      {loadingUserLogin && (
                        <Spinner
                          as='span'
                          animation='border'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                        />
                      )}
                    </StyledButton>
                  </Form>
                </FormContainer>
              </div>
            </CSSTransition>
          </div>
        </Col>
      </Container>
    </>
  );
};

export default LoginOptions;
