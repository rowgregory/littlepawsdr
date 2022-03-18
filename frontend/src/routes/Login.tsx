import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import { Text } from '../components/styles/Styles';
import styled, { useTheme } from 'styled-components';
import { isCapsLock } from '../utils/capsLock';
import { RightBtn } from '../components/ContinueSessionModal';
import NightLogo from '../components/assets/neon-purple-logo.png';
import DayLogo from '../components/assets/transparent-logo.png';
export interface ThemeProps {
  mode: string;
}

export const StyledBtn = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary};
  transition: 300ms;
  :hover {
    background: ${({ theme }) => theme.colors.secondary};
    filter: brightness(1.1);
  }
`;
export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.blue06};
  :hover {
    color: ${({ theme }) => theme.colors.blue06};
    text-decoration: none;
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const CreateAccountContainer = styled(Col)`
  color: ${({ theme }) => theme.text};
  text-align: center;\
  border: 1px solid ${({ theme }) => theme.input.border};
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

    document.addEventListener('keypress', (e) => {
      const result = isCapsLock(e);
      setCapsLocksOn(result);
    });
  }, [history, redirect, userInfo]);

  const submitHandler = (e: any) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <Container>
      {error && <Message variant='danger'>{error}</Message>}
      <div className='mx-auto' style={{ maxWidth: '340px', width: '100%' }}>
        <Image
          onClick={() => history.push('/')}
          src={isDay ? DayLogo : NightLogo}
          alt='Little Paws Dachshund Rescue'
          width='150px'
          height='100px'
          style={{
            objectFit: 'cover',
            cursor: 'pointer',
            margin: '1.5rem auto',
            display: 'flex',
          }}
        />
        <Text
          fontFamily={`Ubuntu, sans-serif`}
          fontSize='1.5rem'
          textAlign='center'
          marginBottom='1.5rem'
        >
          Sign in to Little Paws
        </Text>
        <FormContainer className='p-4'>
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
                <StyledLink to='/forgot-password'>Forgot Password</StyledLink>
              </div>
              <Form.Control
                autoComplete='off'
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                required
              ></Form.Control>
            </Form.Group>
            <RightBtn type='submit' className='d-flex align-items-center w-100'>
              {loading ? (
                <div className='d-flex align-items-center mx-auto'>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                    className='mr-2'
                  />
                  <Text color='#fff'>Signing In</Text>
                </div>
              ) : (
                <Text className='mx-auto' color='#fff'>
                  Sign In
                </Text>
              )}
            </RightBtn>
          </Form>
        </FormContainer>
        <CreateAccountContainer className='py-3 mt-3'>
          New to Little Paws?{' '}
          <StyledLink
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
            Create an account
          </StyledLink>
        </CreateAccountContainer>
      </div>
    </Container>
  );
};

export default Login;
