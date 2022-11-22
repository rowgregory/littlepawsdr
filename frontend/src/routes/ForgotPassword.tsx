import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail } from '../actions/forgotPasswordActions';
import JumpingInput from '../components/common/JumpingInput';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';
import Message from '../components/Message';
import {
  Text,
  Container,
  CreateAccountContainer,
  FormContainer,
  StyledLink,
  FormWrapper,
  StyledButton,
} from '../components/styles/Styles';
import LeftArrow from '../components/svg/LeftArrow';
import { RESET_EMAIL_SEND_RESET } from '../constants/resetPasswordContants';

const useForgotPasswordForm = (cb: any) => {
  const values = {
    forgotPasswordEmail: '',
  };

  const [inputs, setInputs] = useState(values) as any;

  const handleInputChange = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    cb();
  };

  return { inputs, handleInputChange, onSubmit, setInputs };
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const {
    sendEmail: { loading, success, error, message },
  } = useSelector((state: any) => state);

  const forgotPasswordFormCallback = () => {
    dispatch(sendResetEmail(inputs.forgotPasswordEmail));
  };

  const { inputs, handleInputChange, onSubmit } = useForgotPasswordForm(
    forgotPasswordFormCallback
  );

  return (
    <Container className='align-items-center'>
      {loading && <HexagonLoader />}
      {(error || success) && (
        <Message variant={error ? 'danger' : 'success'}>
          {error || message?.message}
        </Message>
      )}
      <FormWrapper className='mx-auto px-3'>
        <Text fontSize='1.5rem' textAlign='center' marginBottom='0.65rem'>
          Forgot Password
        </Text>
        <LeftArrow text='Back to sign in' url='/login' />
        <FormContainer>
          <Form onSubmit={onSubmit}>
            <JumpingInput
              name='forgotPasswordEmail'
              label='Email*'
              value={inputs.forgotPasswordEmail || ''}
              handleInputChange={handleInputChange}
              type='email'
              error={''}
            />

            <StyledButton
              disabled={loading || inputs.forgotPasswordEmail === ''}
              type='submit'
              className='d-flex align-items-center border-0 w-100 justify-content-center'
            >
              Send{loading && 'ing'} Email{loading && '...'}&nbsp;&nbsp;
            </StyledButton>
          </Form>
        </FormContainer>
        <CreateAccountContainer className='py-3 mt-3'>
          Remembered your password?{' '}
          <StyledLink
            onClick={() => dispatch({ type: RESET_EMAIL_SEND_RESET })}
            to='/login'
          >
            Sign In
          </StyledLink>
          .
        </CreateAccountContainer>
      </FormWrapper>
    </Container>
  );
};

export default ForgotPassword;
