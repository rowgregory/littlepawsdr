import React, { useEffect, useState } from 'react';
import { Form, Spinner, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  register,
  sendRegisterConfirmationEmail,
} from '../actions/userActions';
import { Text } from '../components/styles/Styles';
import { Container, FormContainer, StyledLink } from './Login';
import HorizontalLoader from '../components/HorizontalLoader';
import PasswordMeter from '../components/PasswordMeter';
import {
  USER_REGISTER_RESET,
  USER_VERIFY_EMAIL_RESET,
} from '../constants/userConstants';
import styled from 'styled-components';
import toaster from 'toasted-notes';
import { ToastAlert } from '../components/common/ToastAlert';
import { validateEmailRegex } from '../utils/regex';

const LoginContainer = styled(Col)`
  color: ${({ theme }) => theme.text};
  text-align: center;\
  border: 1px solid ${({ theme }) => theme.input.border};
`;

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userRegister = useSelector((state: any) => state.userRegister);
  let {
    loading: userRegisterLoading,
    success: userRegisterSuccess,
    error: userRegisterError,
    userInfo: userRegisterInfo,
  } = userRegister;
  // userRegisterLoading = true;
  const userVerifyEmail = useSelector((state: any) => state.userVerifyEmail);
  let {
    userInfo: userInfoVerifyEmail,
    error: errorVerifyEmailSent,
    success: succesVerifyEmailSent,
    loading: loadingVerifyEmailSent,
  } = userVerifyEmail;
  // loadingVerifyEmailSent = true;

  useEffect(() => {
    if (userRegisterSuccess) {
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
  }, [dispatch, userRegisterSuccess]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    const isLegitEmail = validateEmailRegex.test(email);

    if (!isLegitEmail) {
      toaster.notify(
        ({ onClose }) =>
          ToastAlert('Email is incorrect format.', onClose, 'error'),
        { position: 'bottom' }
      );
    }
    if (password !== confirmPassword) {
      toaster.notify(
        ({ onClose }) => ToastAlert('Password do not match.', onClose, 'error'),
        { position: 'bottom' }
      );
    } else {
      if (strength === 4) {
        dispatch(register(name, email, password));
      } else {
        toaster.notify(
          ({ onClose }) =>
            ToastAlert(
              'You have not met the password requirements.',
              onClose,
              'error'
            ),
          { position: 'bottom' }
        );
      }
    }
  };

  const validations = [
    password.length >= 5 ? 1 : 0,
    password.search(/[A-Z]/) > -1 ? 1 : 0,
    password.search(/[0-9]/) > -1 ? 1 : 0,
    password.search(/[!$&+,:;=?@#]/) > -1 ? 1 : 0,
  ];

  const strength = validations.reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    (userRegisterError || errorVerifyEmailSent) &&
      toaster.notify(
        ({ onClose }) =>
          ToastAlert(
            userRegisterError || errorVerifyEmailSent,
            onClose,
            'error'
          ),
        { position: 'bottom' }
      );
  }, [errorVerifyEmailSent, userRegisterError]);

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
      <div
        className='mx-auto px-3  pt-4'
        style={{ maxWidth: '340px', width: '100%' }}
      >
        <Text fontSize='1.5rem' textAlign='center' marginBottom='0.65rem'>
          Welcome to Little Paws
        </Text>
        <div
          style={{
            position: 'absolute',
            top: '200px',
            zIndex: 100,
            width: '308px',
          }}
        >
          {userRegisterLoading && <HorizontalLoader />}
        </div>
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Email Address'
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
                  placeholder='Password'
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
              <Form.Label>Confirm Password</Form.Label>
              <div
                className='d-flex align-items-center'
                style={{ position: 'relative' }}
              >
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm Password'
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
            <Button
              type='submit'
              className='d-flex align-items-center border-0 bg-success w-100'
            >
              {loadingVerifyEmailSent ? (
                <div className='mx-auto d-flex align-items-center'>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                    className='mr-2'
                  />
                  <Text color='#fff'>Creating Account...</Text>
                </div>
              ) : (
                <Text className='mx-auto' color='#fff'>
                  Register
                </Text>
              )}
            </Button>
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
