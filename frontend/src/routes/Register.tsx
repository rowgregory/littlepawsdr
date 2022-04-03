import React, { useEffect, useState } from 'react';
import { Form, Spinner, Image, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  register,
  updatedUserToConfirmed,
  sendRegisterConfirmationEmail,
} from '../actions/userActions';
import Message from '../components/Message';
import { Text } from '../components/styles/Styles';
import { Container, StyledBtn, StyledLink, ThemeProps } from './Login';
import HorizontalLoader from '../components/HorizontalLoader';
import PasswordMeter from '../components/PasswordMeter';
import {
  USER_REGISTER_RESET,
  USER_VERIFY_EMAIL_RESET,
} from '../constants/userConstants';
import DayLogo from '../components/assets/transparent-logo.png';
import styled, { useTheme } from 'styled-components';
import NightLogo from '../components/assets/neon-purple-logo.png';
import toaster from 'toasted-notes';
import { ToastAlert } from './index';

const FormContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.input.border};
`;

const LoginContainer = styled(Col)`
  color: ${({ theme }) => theme.text};
  text-align: center;\
  border: 1px solid ${({ theme }) => theme.input.border};
`;

const Register = ({ location, history, match }: any) => {
  const theme = useTheme() as ThemeProps;
  const userToken = match.params.to;
  const userEmail = match.params.em;
  const userName = match.params.na;
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null || '');
  const isDay = theme.mode === 'day' ? true : false;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo: userLoginInfo } = userLogin;

  const userRegister = useSelector((state: any) => state.userRegister);
  const {
    loading: userRegisterLoading,
    success: userRegisterSuccess,
    error: userRegisterError,
    userInfo: userRegisterInfo,
  } = userRegister;

  const userConfirmed = useSelector((state: any) => state.userConfirmed);
  const { loading: loadingUserConfirmed, error: errorUserConfirmed } =
    userConfirmed;

  const userVerifyEmail = useSelector((state: any) => state.userVerifyEmail);
  const {
    userInfo: userInfoVerifyEmail,
    error: errorVerifyEmailSent,
    success: succesVerifyEmailSent,
    loading: loadingVerifyEmailSent,
  } = userVerifyEmail;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  let expiredToken: boolean = false;

  const jwtHasNotExpiredYet = () => {
    const currentTime = Date.now().valueOf() / 1000;
    const jwt: any = userToken?.split('.') as any;
    if (JSON.parse(atob(jwt[1]))?.exp < currentTime) {
      expiredToken = true;
      return false;
    }
    expiredToken = false;
    return true;
  };

  useEffect(() => {
    if (userLoginInfo?.confirmed) {
      dispatch({ type: USER_REGISTER_RESET });
      history.push(redirect);
    } else if (userToken !== undefined && jwtHasNotExpiredYet()) {
      dispatch(updatedUserToConfirmed(userEmail, userToken, userName, userId));
    } else if (expiredToken) {
      setMessage('Token has expired, please register again');
      history.push('/register?redirect=/');
    } else if (userRegisterSuccess) {
      dispatch(
        sendRegisterConfirmationEmail(
          userRegisterInfo.name,
          userRegisterInfo.email,
          userRegisterInfo.token,
          JSON.stringify(userRegisterInfo.password)
        )
      );
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userRegisterSuccess, userEmail, userLoginInfo]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage('');
      if (strength === 4) {
        dispatch(register(name, email, password));
      }
    }
  };

  const validations = [
    password.length >= 5 ? 1 : 0,
    password.search(/[A-Z]/) > -1 ? 1 : 0,
    password.search(/[0-9]/) > -1 ? 1 : 0,
    password.search(/[$&+,:;=?@#]/) > -1 ? 1 : 0,
  ];

  const strength = validations.reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    (userRegisterError ||
      message ||
      errorVerifyEmailSent ||
      errorUserConfirmed) &&
      toaster.notify(
        ({ onClose }) =>
          ToastAlert(
            userRegisterError ||
              message ||
              errorVerifyEmailSent ||
              errorUserConfirmed,
            onClose,
            'error'
          ),
        { position: 'top' }
      );
  }, [errorUserConfirmed, errorVerifyEmailSent, message, userRegisterError]);

  useEffect(() => {
    if (succesVerifyEmailSent) {
      toaster.notify(
        ({ onClose }) =>
          ToastAlert(userInfoVerifyEmail?.message, onClose, 'success'),
        { position: 'top' }
      );

      setTimeout(() => {
        dispatch({ type: USER_REGISTER_RESET });
        dispatch({ type: USER_VERIFY_EMAIL_RESET });
      }, 3000);
    }
  }, [dispatch, succesVerifyEmailSent, userInfoVerifyEmail]);

  return (
    <Container>
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
          Welcome to Little Paws Dachshund Rescue
        </Text>
        {expiredToken && <Message variant='warning'>Expired token</Message>}
        {loadingUserConfirmed && <HorizontalLoader />}
        {userRegisterLoading && <HorizontalLoader />}
        <FormContainer className='p-4'>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <div
                className='d-flex align-items-center'
                style={{ position: 'relative' }}
              >
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <Form.Group controlId='confirmpassword'>
              <Form.Label>Confirm password</Form.Label>
              <div
                className='d-flex align-items-center'
                style={{ position: 'relative' }}
              >
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                ></Form.Control>
                <i
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='fas fa-eye'
                  aria-hidden='true'
                  style={{ position: 'absolute', right: '10px' }}
                ></i>
              </div>
            </Form.Group>
            <StyledBtn
              type='submit'
              className='d-flex align-items-center border-0 font-weight-bold btn-lg mb-4'
            >
              {loadingVerifyEmailSent ? (
                <>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                    className='mr-2'
                  />
                  <Text color='#fff'>Loading...</Text>
                </>
              ) : (
                <Text color='#fff'>Register</Text>
              )}
            </StyledBtn>
          </Form>
        </FormContainer>
        <LoginContainer className='py-3 mt-3'>
          <PasswordMeter validations={validations} strength={strength} />
        </LoginContainer>
        <LoginContainer className='py-3 mt-3'>
          Already have an account? <StyledLink to='/login'>Sign In</StyledLink>
        </LoginContainer>
      </div>
    </Container>
  );
};

export default Register;
