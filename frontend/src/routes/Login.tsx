import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import {
  Container,
  CreateAccountContainer,
  FormContainer,
  FormWrapper,
  StyledButton,
  StyledLink,
  Text,
} from '../components/styles/Styles';
import validateLoginForm, {
  inputEmail,
  inputPassword,
} from '../utils/validateLoginForm';
import Message from '../components/Message';
import { USER_LOGIN_RESET } from '../constants/userConstants';
import JumpingInput from '../components/common/JumpingInput';
import { validateEmailRegex } from '../utils/regex';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';
import loginEffect from '../components/sounds/login.mp3';
import failedLoginAttempt from '../components/sounds/thump02.wav';
import Logo from '../components/assets/logo.png';
import UIfx from 'uifx';
import { Link } from 'react-router-dom';
import { Accordion } from '../components/styles/place-order/Styles';

const useLoginForm = (cb: any, setErrors: any) => {
  const values = {
    email: '',
    password: '',
  };

  const [inputs, setInputs] = useState(values) as any;

  const handleInputChange = (e: any) => {
    if (validateEmailRegex.test(inputs?.email)) {
      setErrors((errors: any) => ({ ...errors, email: '' }));
    }

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

const Login = ({ history }: any) => {
  const [capsLockOn, setCapsLocksOn] = useState(false);
  const [showPassword, setShowPassword] = useState({ password: false });
  const [errors, setErrors] = useState({}) as any;
  const dispatch = useDispatch();

  const {
    userLogin: { loading, error, userInfo },
  } = useSelector((state: any) => state);

  let formIsValid = true;

  const loginFormCallback = () => {
    const failedLoginAttemptFx = new UIfx(failedLoginAttempt);
    const isValid = validateLoginForm(setErrors, inputs, formIsValid);
    if (!isValid) failedLoginAttemptFx.play();
    if (isValid) {
      dispatch(login(inputs.email.toLowerCase(), inputs.password));
    }
  };

  const { inputs, handleInputChange, onSubmit } = useLoginForm(
    loginFormCallback,
    setErrors
  );

  useEffect(() => {
    const loginFx = new UIfx(loginEffect);
    const failedLoginAttemptFx = new UIfx(failedLoginAttempt);
    if (userInfo?.isAdmin) {
      history.push('/admin');
      loginFx.play();
    } else if (userInfo) {
      history.push('/');
    } else if (error) {
      failedLoginAttemptFx.play();
    }

    let listener = (e: any) => {
      const result = e.getModifierState && e.getModifierState('CapsLock');
      setCapsLocksOn(result);
    };

    document.addEventListener('keyup', listener);

    return () => document.removeEventListener('keyup', listener);
  }, [dispatch, error, history, userInfo]);

  return (
    <Container>
      {loading && <HexagonLoader />}
      <FormWrapper>
        <FormContainer>
          <Link to='/'>
            <Image
              src={Logo}
              alt='Little Paws Dachshund Rescue'
              style={{
                width: '150px',
                marginLeft: '-16px',
                marginBottom: '32px',
              }}
            />
          </Link>
          <Text
            color='#22c2b7'
            fontSize='33px'
            marginBottom='16px'
            fontWeight={400}
          >
            Sign In
          </Text>
          {capsLockOn && <Message variant='warning'>(Caps Lock is on)</Message>}
          <Form onSubmit={onSubmit}>
            <JumpingInput
              name='email'
              label='Email*'
              value={inputs.email || ''}
              handleInputChange={handleInputChange}
              type='email'
              error={errors?.email}
              blur={() => inputEmail(inputs, formIsValid, setErrors)}
            />
            <JumpingInput
              name='password'
              label='Password*'
              value={inputs.password || ''}
              handleInputChange={handleInputChange}
              type={showPassword.password ? 'text' : 'password'}
              error={errors?.password}
              blur={() => inputPassword(inputs, formIsValid, setErrors)}
              showPassword={showPassword.password}
              setShowPassword={setShowPassword}
            />
            <div className='mt-3'>
              <StyledLink
                to='/forgot-password'
                onClick={() => {
                  dispatch({ type: USER_LOGIN_RESET });
                }}
              >
                Reset password
              </StyledLink>
            </div>
            <StyledButton
              disabled={loading}
              type='submit'
              className='d-flex align-items-center border-0 w-100 justify-content-center mt-3'
            >
              <Text color='#fff'>
                Sign{loading && 'ing'} In{loading && '...'}&nbsp;&nbsp;
              </Text>
            </StyledButton>
          </Form>
          <CreateAccountContainer className='pt-3 pb-2 mt-3'>
            New to Little Paws Dachshund Rescue?
          </CreateAccountContainer>
          <StyledLink
            className='d-flex justify-content-center'
            to='/register'
            onClick={() => dispatch({ type: USER_LOGIN_RESET })}
          >
            Join now
          </StyledLink>
        </FormContainer>
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
        <Accordion toggle={error} maxheight='65px' className='w-100'>
          <Message variant='danger'>{error}</Message>
        </Accordion>
      </div>
    </Container>
  );
};

export default Login;
