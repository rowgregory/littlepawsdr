import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, resetPassword } from '../actions/forgotPasswordActions';
import {
  Container,
  CreateAccountContainer,
  FormContainer,
  StyledButton,
  StyledLink,
  Text,
} from '../components/styles/Styles';
import PasswordMeter, {
  PasswordRequirements,
} from '../components/PasswordMeter';
import { CSSTransition } from 'react-transition-group';
import Message from '../components/Message';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';
import { Link } from 'react-router-dom';
import JumpingInput from '../components/common/JumpingInput';

const ResetPassword = ({ match }: any) => {
  const tokenId = match.params.id;
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [activeMenu, setActiveMenu] = useState('reset-password') as any;
  const [showPassword, setShowPassword] = useState({ password: false });
  const [errorMsg, setMessage] = useState('');
  const [show, setShow] = useState(true);

  let {
    verifyToken: {
      loading: loadingVerifyToken,
      result: successVerifyToken,
      error: errorVerifyToken,
    },
    resetPassword: { loading: loadingResetPassword, message },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(verifyToken(tokenId));
  }, [dispatch, tokenId]);

  useEffect(() => {
    if (message === 'Password Updated!') {
      setActiveMenu('password-updated');
    }
  }, [message]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (strength === 4 && successVerifyToken?.email) {
      dispatch(resetPassword(successVerifyToken?.email, password));
    } else {
      setMessage('Password does not meet requirements');
    }
  };

  const validations = [
    password.length >= 9 ? 1 : 0,
    password.search(/[A-Z]/) > -1 ? 1 : 0,
    password.search(/[0-9]/) > -1 ? 1 : 0,
    password.search(/[~`!-@#$%^ &*()_+={}|:;"',.?]/) > -1 ? 1 : 0,
  ];

  const strength = validations.reduce((acc, cur) => acc + cur, 0);

  return errorVerifyToken ? (
    <div className='m-3' style={{ marginTop: '75px' }}>
      <Message variant='danger'>{errorVerifyToken}</Message>
      <Link to='/forgot-password'>Forgot Password</Link>
    </div>
  ) : (
    <Container className='align-items-center'>
      {(loadingVerifyToken || loadingResetPassword) && <HexagonLoader />}
      {(message || errorMsg) && (
        <Message variant={errorMsg ? 'danger' : 'success'}>
          {message || errorMsg}
        </Message>
      )}
      <div
        className='mx-auto px-3 pt-4'
        style={{
          maxWidth: '340px',
          width: '100%',
          overflow: 'hidden !important',
        }}
      >
        <CSSTransition
          in={activeMenu === 'reset-password'}
          unmountOnExit
          timeout={500}
          classNames='slide-up'
        >
          <div style={{ width: '340px' }}>
            <Text fontSize='1.5rem' textAlign='center' marginBottom='0.65rem'>
              Reset Password
            </Text>
            <FormContainer>
              <Form onSubmit={submitHandler}>
                <JumpingInput
                  name='password'
                  label='Password'
                  value={password || ''}
                  handleInputChange={(e: any) => setPassword(e.target.value)}
                  type={showPassword.password ? 'text' : 'password'}
                  error={''}
                  blur={() => ({})}
                  showPassword={showPassword.password}
                  setShowPassword={setShowPassword}
                />
                <PasswordMeter validations={validations} strength={strength} />
                <Text
                  onClick={() => setShow(!show)}
                  fontWeight={400}
                  className='d-flex align-items-center justify-content-between mb-2'
                >
                  {show ? 'Hide ' : 'Show '}password requirements
                  {<i className={`fas fa-chevron-${show ? 'up' : 'down'}`}></i>}
                </Text>
                <PasswordRequirements validations={validations} open={show} />
                <StyledButton
                  disabled={loadingResetPassword || password === ''}
                  type='submit'
                  className='d-flex align-items-center border-0 w-100 justify-content-center mt-3'
                >
                  Updat{loadingResetPassword ? 'ing' : 'e'}&nbsp;&nbsp;
                </StyledButton>
              </Form>
            </FormContainer>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === 'password-updated'}
          unmountOnExit
          timeout={500}
          classNames='menu-secondary'
        >
          <div style={{ width: '340px' }}>
            <CreateAccountContainer className='py-3 mt-3'>
              <StyledLink to='/login'>Sign In</StyledLink>
            </CreateAccountContainer>
          </div>
        </CSSTransition>
      </div>
    </Container>
  );
};

export default ResetPassword;
