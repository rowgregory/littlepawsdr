import { useEffect, useState } from 'react';
import { Form, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, resetPassword } from '../actions/forgotPasswordActions';
import {
  Container,
  FormContainer,
  FormWrapper,
  GlassBtn,
  Text,
} from '../components/styles/Styles';
import { Link, useParams } from 'react-router-dom';
import JumpingInput from '../components/common/JumpingInput';
import PasswordReset from '../components/assets/password-reset.png';
import SessionExpired from '../components/assets/session-expired.png';
import PasswordValidationSection from '../components/common/PasswordValidationSection';

const ResetPassword = () => {
  const { id } = useParams();
  const tokenId = id;
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState({ password: false });
  const [errorMsg, setMessage] = useState('');
  const [show, setShow] = useState(true);

  const state = useSelector((state: any) => state);
  const loadingVerifyToken = state.verifyToken.loading;
  const successVerifyToken = state.verifyToken.result;
  const errorVerifyToken = state.verifyToken.error;

  const loadingResetPassword = state.resetPassword.loading;
  const message = state.resetPassword.message;

  const strength = state.password.strength;

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

  return (
    <Container className='align-items-center'>
      <FormWrapper className='reset-password m-auto'>
        <FormContainer>
          {loadingVerifyToken ? (
            <div className='lead text-white text-center font-weight-normal'>
              Verifying credentials...
            </div>
          ) : errorVerifyToken ? (
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <Image src={SessionExpired} style={{ maxWidth: '200pt' }} />
              <h1
                className='text-center font-weight-normal text-white mt-4'
                style={{ fontSize: '32px' }}
              >
                {errorVerifyToken}
              </h1>
              <Link to='/forgot-password' className='text-white mt-2'>
                Forgot Password
              </Link>
            </div>
          ) : message ? (
            <div className='d-flex flex-column align-items-center'>
              <Image src={PasswordReset} style={{ maxWidth: '100pt' }} />
              <h4 className='text-center text-white my-3 font-weight-normal'>
                {message}
              </h4>
              <Link className='text-white text-center my-3 my-4' to='/login'>
                Sign In
              </Link>
            </div>
          ) : (
            <>
              <Text
                color='#fff'
                fontSize='33px'
                marginBottom='16px'
                fontWeight={400}
              >
                Reset Password
              </Text>
              <FormContainer>
                <Form onSubmit={submitHandler}>
                  <div style={{ marginBottom: '-12px' }}>
                    <JumpingInput
                      name='password'
                      label='Password'
                      value={password || ''}
                      handleInputChange={(e: any) =>
                        setPassword(e.target.value)
                      }
                      type={showPassword.password ? 'text' : 'password'}
                      error={''}
                      blur={() => ({})}
                      showPassword={showPassword.password}
                      setShowPassword={setShowPassword}
                    />
                  </div>
                  <PasswordValidationSection
                    show={show}
                    setShow={setShow}
                    inputs={{ password }}
                  />
                  <GlassBtn
                    disabled={loadingResetPassword || password === ''}
                    type='submit'
                    className='mt-3'
                  >
                    {loadingResetPassword && (
                      <Spinner
                        animation='border'
                        size='sm'
                        style={{ color: '#fff' }}
                      />
                    )}
                    Updat{loadingResetPassword ? 'ing' : 'e'}
                  </GlassBtn>
                  {errorMsg && (
                    <Text
                      fontSize='15px'
                      color='#ff2a01'
                      fontWeight={500}
                      textAlign='center'
                      marginTop='16px'
                    >
                      {errorMsg}
                    </Text>
                  )}
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
