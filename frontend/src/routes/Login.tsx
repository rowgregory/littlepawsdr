import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import { Text } from '../components/styles/Styles';
import styled, { useTheme } from 'styled-components';
import { isCapsLock } from '../utils/capsLock';
import NightLogo from '../components/assets/neon-purple-logo.png';
import DayLogo from '../components/assets/transparent-logo.png';
import toaster from 'toasted-notes';
import { ToastAlert } from '.';
export interface ThemeProps {
  mode: string;
}
export const StyledLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: #fff;
  min-height: 100vh;
`;

const CreateAccountContainer = styled(Col)`
  color: ${({ theme }) => theme.text};
  text-align: center;\
  border: 1px solid ${({ theme }) => theme.input.border};
  border-radius: 0.4rem;
`;
const FormContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.input.border};
`;

const Login = ({ location, history }: any) => {
  const theme = useTheme() as ThemeProps;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [capsLockOn, setCapsLocksOn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isDay = theme.mode === 'day' ? true : false;
  const dispatch = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo?.isAdmin) {
      history.push('/admin');
    } else if (userInfo) {
      history.push('/');
    }

    const listener = (e: any) => {
      const result = isCapsLock(e);
      setCapsLocksOn(result);
    };
    document.addEventListener('keypress', listener);

    return () => document.removeEventListener('keypress', listener);
  }, [history, redirect, userInfo]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toaster.notify(
        ({ onClose }) =>
          ToastAlert('Incorrect email address or password', onClose, 'error'),
        { position: 'bottom' }
      );
    }
  }, [error]);

  return (
    <Container>
      {error && <Message variant='danger'>{error}</Message>}
      <div
        className='mx-auto px-3'
        style={{ maxWidth: '340px', width: '100%' }}
      >
        <Link to='/'>
          <Image
            src={isDay ? DayLogo : NightLogo}
            alt='Little Paws Dachshund Rescue'
            width='150px'
            style={{
              objectFit: 'cover',
              cursor: 'pointer',
              marginInline: 'auto',
              display: 'flex',
              aspectRatio: '1/1',
            }}
          />
        </Link>
        <Text
          letterSpacing='-1px'
          fontSize='1.5rem'
          textAlign='center'
          marginBottom='0.65rem'
        >
          Sign in to Little Paws
        </Text>
        <FormContainer
          className='p-3 mt-3'
          style={{ background: '#f5f8fa', borderRadius: '0.4rem' }}
        >
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                autoComplete='off'
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <div className='d-flex justify-content-between'>
                <Form.Label className='d-flex'>
                  <Text fontSize='14px' className='d-flex align-items-center'>
                    Password
                  </Text>
                  {capsLockOn && (
                    <Text fontSize='14px' color='red' className='ml-2'>
                      (Caps Lock is on)
                    </Text>
                  )}
                </Form.Label>
                <Form.Label>
                  <StyledLink to='/forgot-password'>Forgot Password</StyledLink>
                </Form.Label>
              </div>
              <div
                className='d-flex align-items-center'
                style={{ position: 'relative' }}
              >
                <Form.Control
                  autoComplete='off'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={password}
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                  required
                ></Form.Control>
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className='fas fa-eye'
                  aria-hidden='true'
                  style={{ position: 'absolute', right: '10px' }}
                ></i>
              </div>
            </Form.Group>
            <Button
              disabled={loading}
              type='submit'
              className='d-flex align-items-center border-0 w-100 bg-success'
            >
              {loading ? (
                <div className='d-flex align-items-center mx-auto'>
                  <Text color='#fff'>Signing In...</Text>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                    className='mr-2'
                  />
                </div>
              ) : (
                <Text className='mx-auto' color='#fff' fontSize='0.875rem'>
                  Sign In
                </Text>
              )}
            </Button>
          </Form>
        </FormContainer>
        <CreateAccountContainer className='py-3 mt-3'>
          New to Little Paws?{' '}
          <StyledLink
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
            Create an account
          </StyledLink>
          .
        </CreateAccountContainer>
      </div>
    </Container>
  );
};

export default Login;
