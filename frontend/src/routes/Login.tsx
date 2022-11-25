import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
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
import LogoDay from '../components/assets/logo-background-transparent-purple4.png';
import UIfx from 'uifx';
import LeftArrow from '../components/svg/LeftArrow';
import { Link } from 'react-router-dom';
import { LogoCheckout } from '../components/styles/place-order/Styles';

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

const Login = ({ location, history }: any) => {
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
  }, [error, history, userInfo]);

  return (
    <Container>
      <Link to='/'>
        <LogoCheckout src={LogoDay} />
      </Link>
      {loading && <HexagonLoader />}
      <FormWrapper className='mx-auto px-3'>
        <Text fontSize='1.5rem' textAlign='center' marginBottom='0.65rem'>
          Sign in to Little Paws
        </Text>
        <LeftArrow text='To Home' url='/' />
        <FormContainer>
          {error && <Message variant='danger'>{error}</Message>}
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
                Forgot Password?
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
        </FormContainer>
        <CreateAccountContainer className='py-3 mt-3'>
          New to Little Paws?{' '}
          <StyledLink
            to='/register'
            onClick={() => dispatch({ type: USER_LOGIN_RESET })}
          >
            Create an account
          </StyledLink>
          .
        </CreateAccountContainer>
      </FormWrapper>
    </Container>
  );
};

export default Login;
