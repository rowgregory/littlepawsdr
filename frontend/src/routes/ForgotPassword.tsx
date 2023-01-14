import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail } from '../actions/forgotPasswordActions';
import JumpingInput from '../components/common/JumpingInput';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';
import Message from '../components/Message';
import { Accordion } from '../components/styles/place-order/Styles';
import {
  Text,
  Container,
  CreateAccountContainer,
  FormContainer,
  StyledLink,
  FormWrapper,
  StyledButton,
} from '../components/styles/Styles';
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

  useEffect(() => {
    if (error || success) {
      setTimeout(() => dispatch({ type: RESET_EMAIL_SEND_RESET }), 5000);
    }
  }, [dispatch, error, success]);

  return (
    <Container className='align-items-center'>
      {loading && <HexagonLoader />}
      <FormWrapper className='mx-auto px-3'>
        <FormContainer>
          <Text color='#22c2b7' fontSize='33px' fontWeight={400}>
            Reset Password
          </Text>
          <Text marginBottom='16px' marginTop='16px'>
            Enter the email address you registered with.
          </Text>
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
            className='d-flex justify-content-center'
            onClick={() => dispatch({ type: RESET_EMAIL_SEND_RESET })}
            to='/login'
          >
            Sign In
          </StyledLink>
        </CreateAccountContainer>
      </FormWrapper>
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '500px',
          marginInline: 'auto',
        }}
      >
        <Accordion toggle={error || success} maxheight='65px' className='w-100'>
          <Message variant={error ? 'danger' : 'success'}>
            {error || message?.message}
          </Message>
        </Accordion>
      </div>
    </Container>
  );
};

export default ForgotPassword;
