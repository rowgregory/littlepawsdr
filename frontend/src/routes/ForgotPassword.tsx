import React, { useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail } from '../actions/forgotPasswordActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { PageHeader } from '../components/styles/Styles';
import { StyledBtn, StyledLink } from './Login';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const sendEmail = useSelector((state: any) => state.sendEmail);
  const { loading, success, error, message } = sendEmail;

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(sendResetEmail(email));
  };

  return (
    <FormContainer>
      <PageHeader className='my-3'>Forgot Password</PageHeader>
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>{message.message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <StyledBtn type='submit' variant='primary' className='mb-3'>
          Send Email{' '}
          {loading && (
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />
          )}
        </StyledBtn>
      </Form>
      <StyledLink to='/login'>Sign In</StyledLink>
    </FormContainer>
  );
};

export default ForgotPassword;
