import React, { useEffect, useState } from 'react';
import { Form, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  register,
  updatedUserToConfirmed,
  sendRegisterConfirmationEmail,
} from '../actions/userActions';
import Message from '../components/Message';
import { Text } from '../components/styles/Styles';
import { StyledBtn, StyledLink } from './Login';
import HorizontalLoader from '../components/HorizontalLoader';
import PasswordMeter from '../components/PasswordMeter';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import DayLogo from '../components/assets/transparent-logo.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const WelcomeText = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const validations = (password: string) => [
  password.length >= 5 ? 1 : 0,
  password.search(/[A-Z]/) > -1 ? 1 : 0,
  password.search(/[0-9]/) > -1 ? 1 : 0,
  password.search(/[$&+,:;=?@#]/) > -1 ? 1 : 0,
];

const Register = ({ location, history, match }: any) => {
  const userToken = match.params.to;
  const userEmail = match.params.em;
  const userName = match.params.na;
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null || '');

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
      setMessage('Passwords to not match');
    } else {
      if (strength === 4) {
        dispatch(register(name, email, password));
      }
    }
  };

  const strength = validations(password).reduce((acc, cur) => acc + cur, 0);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      <div className='d-flex justify-content-between align-items-center'>
        <Link to='/'>
          <Image
            src={DayLogo}
            alt='Little Paws Dachshund Rescue'
            width='100px'
            style={{
              cursor: 'pointer',
            }}
          />
        </Link>

        <Text>
          Already have an account?{' '}
          <StyledLink to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Sign in
          </StyledLink>
        </Text>
      </div>

      <div
        className='mx-auto mt-5 p-4'
        style={{ maxWidth: '340px', width: '100%' }}
      >
        <WelcomeText>Welcome to Little Paws Dachshund Rescue</WelcomeText>
        {succesVerifyEmailSent && (
          <Message variant='success'>{userInfoVerifyEmail.message}</Message>
        )}
        {expiredToken && <Message variant='warning'>Expired token</Message>}
        {errorVerifyEmailSent && (
          <Message variant='danger'>{errorVerifyEmailSent}</Message>
        )}
        {errorUserConfirmed && (
          <Message variant='danger'>{errorUserConfirmed}</Message>
        )}
        {message && <Message variant='danger'>{message}</Message>}
        {userRegisterError && (
          <Message variant='danger'>{userRegisterError}</Message>
        )}
        {loadingUserConfirmed && <HorizontalLoader />}
        {userRegisterLoading && <HorizontalLoader />}
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
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmpassword'>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></Form.Control>
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

        <PasswordMeter validations={validations} strength={strength} />
      </div>
    </div>
  );
};

export default Register;
