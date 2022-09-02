import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, resetPassword } from '../actions/forgotPasswordActions';
import {
  Container,
  CreateAccountContainer,
  FormContainer,
  StyledLink,
} from './Login';
import { Text } from '../components/styles/Styles';
import toaster from 'toasted-notes';
import { ToastAlert } from '../components/common/ToastAlert';
import PasswordMeter from '../components/PasswordMeter';
import { CSSTransition } from 'react-transition-group';

const ResetPassword = ({ match }: any) => {
  const tokenId = match.params.id;
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [activeMenu, setActiveMenu] = useState('reset-password') as any;
  const [menuHeight, setMenuHeight] = useState() as any;

  const verifyTokenDetails = useSelector((state: any) => state.verifyToken);
  const { loading, result, error } = verifyTokenDetails;

  const resetPasswordDetails = useSelector((state: any) => state.resetPassword);
  const { loading: loadingResetPassword, message } = resetPasswordDetails;

  useEffect(() => {
    dispatch(verifyToken(tokenId));
  }, [dispatch, tokenId]);

  useEffect(() => {
    (error || message || result?.message) &&
      toaster.notify(
        ({ onClose }) =>
          ToastAlert(
            error || message || result?.message,
            onClose,
            message || result?.message ? 'success' : 'error'
          ),
        { position: 'bottom' }
      );
    if (message === 'Password Updated!') {
      setActiveMenu('password-updated');
    }
  }, [error, message, result]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (strength === 4 && result?.email) {
      dispatch(resetPassword(result?.email, password));
    }
  };

  const validations = [
    password.length >= 5 ? 1 : 0,
    password.search(/[A-Z]/) > -1 ? 1 : 0,
    password.search(/[0-9]/) > -1 ? 1 : 0,
    password.search(/[!$&+,:;=?@#]/) > -1 ? 1 : 0,
  ];

  console.log(error);
  console.log(result);

  const strength = validations.reduce((acc, cur) => acc + cur, 0);

  // const calcHeight = (el: any) => setMenuHeight(el.offsetHeight);

  return loading ? (
    <Text>Validating credentials...</Text>
  ) : (
    <Container>
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
                <Form.Group controlId='email'>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='New Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <PasswordMeter validations={validations} strength={strength} />
                <Button
                  disabled={loadingResetPassword || error}
                  type='submit'
                  className='d-flex align-items-center border-0 w-100 bg-success justify-content-center mt-4'
                >
                  Updat{loadingResetPassword ? 'ing' : 'e'}&nbsp;&nbsp;
                  {loadingResetPassword && (
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
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === 'password-updated'}
          unmountOnExit
          timeout={500}
          classNames='menu-secondary'
        >
          <div style={{ width: '340px' }}>
            <Text fontSize='1.5rem' textAlign='center' marginBottom='0.65rem'>
              Password Updated
            </Text>
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
