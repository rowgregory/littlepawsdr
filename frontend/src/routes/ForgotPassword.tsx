import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import toaster from 'toasted-notes';
import { sendResetEmail } from '../actions/forgotPasswordActions';
import { ToastAlert } from '../components/common/ToastAlert';
import { Text } from '../components/styles/Styles';
import { RESET_EMAIL_SEND_RESET } from '../constants/resetPasswordContants';
import {
  Container,
  CreateAccountContainer,
  FormContainer,
  StyledLink,
} from './Login';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const sendEmail = useSelector((state: any) => state.sendEmail);
  const { loading, success, error, message } = sendEmail;

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(sendResetEmail(email));
  };

  useEffect(() => {
    if (error || message || success) {
      toaster.notify(
        ({ onClose }) =>
          ToastAlert(
            error || message.message || success,
            onClose,
            error ? 'error' : 'success'
          ),
        {
          position: 'bottom',
          duration: 20000,
        }
      );
      if (success) {
        setEmail('');
        dispatch({ type: RESET_EMAIL_SEND_RESET });
      }
    }
  }, [dispatch, error, message, success]);

  return (
    <Container>
      <div
        className='mx-auto px-3 pt-4'
        style={{ maxWidth: '340px', width: '100%' }}
      >
        <Text fontSize='1.5rem' textAlign='center' marginBottom='0.65rem'>
          Forgot Password
        </Text>
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button
              disabled={loading}
              type='submit'
              className='d-flex align-items-center border-0 w-100 bg-success justify-content-center'
            >
              Send{loading && 'ing'} Email{loading && '...'}&nbsp;&nbsp;
              {loading && (
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              )}
            </Button>
          </Form>
        </FormContainer>
        <CreateAccountContainer className='py-3 mt-3'>
          Remembered your password? <StyledLink to='/login'>Sign In</StyledLink>
          .
        </CreateAccountContainer>
      </div>
    </Container>
  );
};

export default ForgotPassword;
