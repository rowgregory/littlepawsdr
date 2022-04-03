import React, { useState, useEffect } from 'react';
import { Col, Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { registerGuestUser } from '../actions/guestUserActions';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { Text } from '../components/styles/Styles';
import { CSSTransition } from 'react-transition-group';
import { sendResetEmail } from '../actions/forgotPasswordActions';
import { USER_LOGIN_RESET } from '../constants/userConstants';
import '../index';
import { RESET_EMAIL_SEND_RESET } from '../constants/resetPasswordContants';

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 7rem auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.secondaryBg};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 2rem 3rem;
    display: flex;
    flex-direction: row;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 4rem 6.5rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

const Titles = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.625rem;
`;

const LoginBtn = styled(Button)`
  border-radius: 0;
  background-color: ${({ theme }) => theme.colors.blue04};
  height: 3.125rem !important;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;
  border: none;
  transition: 300ms;
  :hover,
  :active,
  :focus {
    background-color: ${({ theme }) => theme.colors.blue04};
    filter: brightness(1.3);
    box-shadow: none;
  }
`;

const VerticalSeparator = styled.div`
  border-right: 1px solid ${({ theme }) => theme.separator};
  height: auto;
`;

const ForgotPasswordLink = styled.div`
  font-size: 0.8rem;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const LoginOptions = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeMenu, setActiveMenu] = useState('dropdown-slide-1') as any;
  const [menuHeight, setMenuHeight] = useState() as any;

  const guestUserRegister = useSelector(
    (state: any) => state.guestUserRegister
  );
  const {
    loading: loadingGuestUserRegister,
    error: errorGuestUserRegister,
    success: successGuestUserRegister,
    guestUserInfo,
  } = guestUserRegister;

  const [guestEmail, setGuestEmail] = useState(guestUserInfo?.email || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordEmail, setforgotPasswordEmail] = useState('');

  const userLogin = useSelector((state: any) => state.userLogin);
  const {
    userInfo,
    loading: loadingUserLogin,
    error: errorUserLogin,
  } = userLogin;

  const sendEmail = useSelector((state: any) => state.sendEmail);
  const {
    loading: loadingSendEmail,
    success: successSendEmail,
    error: errorSendEmail,
  } = sendEmail;

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
    const thereIsNoOrderInLocalStorage =
      (localStorage.getItem('newOrder')
        ? JSON.parse(localStorage.getItem('newOrder') || '')
        : []
      ).length === 0;
    if (thereIsNoOrderInLocalStorage) history.push('/');

    if (successGuestUserRegister || userInfo) history.push('/cart/place-order');
  }, [history, successGuestUserRegister, userInfo]);

  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  const calcHeight = (el: any) => setMenuHeight(el.offsetHeight);

  return (
    <>
      <Container>
        <Col md={6} className='d-flex mb-5'>
          <FormContainer>
            <Titles>Guest</Titles>
            <Text fontSize='0.85rem' marginBottom='1.25rem'>
              You can create an account when you check out.
            </Text>
            {errorGuestUserRegister && (
              <Message variant='danger'>{errorGuestUserRegister}</Message>
            )}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='guestEmail'>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={guestEmail}
                  onChange={(e: any) => setGuestEmail(e.target.value)}
                  required={true}
                ></Form.Control>
              </Form.Group>
              <LoginBtn onClick={(e: any) => continueAsGuestHandler(e)}>
                {loadingGuestUserRegister ? (
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                ) : (
                  <Text fontSize='0.9375rem' color='#fff'>
                    Guest Checkout
                  </Text>
                )}
              </LoginBtn>
            </Form>
          </FormContainer>
        </Col>
        <VerticalSeparator />
        <Col md={6} style={{ overflow: 'hidden' }}>
          <div
            style={{
              height: `${menuHeight}px`,
              overflow: 'hidden',
              transition: `height 500ms ease`,
            }}
          >
            <CSSTransition
              in={activeMenu === 'dropdown-slide-1'}
              unmountOnExit
              timeout={500}
              classNames='slide-1'
              onEnter={calcHeight}
            >
              <div className='w-100' style={{ paddingBottom: '7rem' }}>
                <FormContainer>
                  <Titles>Sign In</Titles>
                  {errorUserLogin && (
                    <Message variant='danger'>{errorUserLogin}</Message>
                  )}
                  <Form>
                    <Form.Group controlId='email'>
                      <Form.Control
                        autoComplete='off'
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        required={true}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                      <Form.Control
                        autoComplete='off'
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e: any) => {
                          setPassword(e.target.value);
                        }}
                        required={true}
                      ></Form.Control>
                    </Form.Group>
                    <ForgotPasswordLink
                      onClick={() => {
                        setforgotPasswordEmail('');
                        dispatch({ type: RESET_EMAIL_SEND_RESET });
                        setActiveMenu('dropdown-slide-2');
                      }}
                    >
                      Forgot password
                    </ForgotPasswordLink>

                    <LoginBtn
                      onClick={(e: any) => singInHandler(e)}
                      className='d-flex align-items-center border-0 font-weight-bold btn-lg mt-3'
                    >
                      {loadingUserLogin ? (
                        <>
                          <Spinner
                            as='span'
                            animation='border'
                            size='sm'
                            role='status'
                            aria-hidden='true'
                            className='mr-2'
                          />
                          <Text fontSize='0.9375rem' color='#fff'>
                            Loading...
                          </Text>
                        </>
                      ) : (
                        <Text fontSize='0.9375rem' color='#fff'>
                          Sign In
                        </Text>
                      )}
                    </LoginBtn>
                  </Form>
                </FormContainer>
              </div>
            </CSSTransition>
            <CSSTransition
              in={activeMenu === 'dropdown-slide-2'}
              unmountOnExit
              timeout={500}
              classNames='slide-2'
              onEnter={calcHeight}
            >
              <div className='w-100' style={{ paddingBottom: '5rem' }}>
                <FormContainer>
                  <Titles>Forgot Password</Titles>
                  <ForgotPasswordLink
                    onClick={() => {
                      dispatch({ type: USER_LOGIN_RESET });
                      setActiveMenu('dropdown-slide-1');
                    }}
                  >
                    Sign In
                  </ForgotPasswordLink>

                  <CSSTransition
                    in={
                      (errorSendEmail !== null &&
                        errorSendEmail !== undefined &&
                        Object.keys(errorSendEmail).length > 0) ||
                      successSendEmail
                    }
                    unmountOnExit
                    classNames='fade'
                    timeout={500}
                    // appear
                    onEntered={() => {}}
                    onExit={() => {}}
                  >
                    <div>
                      {errorSendEmail && (
                        <Message variant='danger'>{errorSendEmail}</Message>
                      )}
                      {successSendEmail && (
                        <Message variant='success'>
                          An email has been sent to {forgotPasswordEmail}
                        </Message>
                      )}
                    </div>
                  </CSSTransition>

                  <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group controlId='forgotPasswordemail'>
                      <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={forgotPasswordEmail}
                        onChange={(e: any) =>
                          setforgotPasswordEmail(e.target.value)
                        }
                        required={true}
                      ></Form.Control>
                    </Form.Group>
                    <LoginBtn
                      onClick={() =>
                        dispatch(sendResetEmail(forgotPasswordEmail))
                      }
                      className='d-flex align-items-center border-0 font-weight-bold btn-lg mt-3'
                    >
                      {loadingSendEmail ? (
                        <Spinner
                          as='span'
                          animation='border'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                          className='mr-2'
                        />
                      ) : (
                        <Text fontSize='0.9375rem' color='#fff'>
                          Reset Password
                        </Text>
                      )}
                    </LoginBtn>
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
