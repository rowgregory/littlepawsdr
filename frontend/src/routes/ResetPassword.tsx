import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, resetPassword } from '../actions/forgotPasswordActions';
import {
  Container,
  CreateAccountContainer,
  FormContainer,
  FormWrapper,
  StyledButton,
  StyledLink,
  Text,
} from '../components/styles/Styles';
import PasswordMeter, {
  PasswordRequirements,
} from '../components/PasswordMeter';
import Message from '../components/Message';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';
import { Link } from 'react-router-dom';
import JumpingInput from '../components/common/JumpingInput';

const ResetPassword = ({ match }: any) => {
  const tokenId = match.params.id;
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
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
      <FormWrapper>
        <FormContainer>
          {errorMsg ? (
            <Message variant='danger'>{errorMsg}</Message>
          ) : message ? (
            <>
              <Message variant='success'>{message}</Message>
              <CreateAccountContainer className='py-3 mt-4'>
                <StyledLink to='/login'>Sign In</StyledLink>
              </CreateAccountContainer>
            </>
          ) : (
            <>
              <Text
                color='#22c2b7'
                fontSize='33px'
                marginBottom='16px'
                fontWeight={400}
              >
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
                  <PasswordMeter
                    validations={validations}
                    strength={strength}
                  />
                  <Text
                    onClick={() => setShow(!show)}
                    fontWeight={400}
                    className='d-flex align-items-center justify-content-between mb-2'
                  >
                    {show ? 'Hide ' : 'Show '}password requirements
                    {
                      <i
                        className={`fas fa-chevron-${show ? 'up' : 'down'}`}
                      ></i>
                    }
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
            </>
          )}
        </FormContainer>
      </FormWrapper>
    </Container>
  );
};

export default ResetPassword;
