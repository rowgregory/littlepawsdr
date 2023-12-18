import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import {
  AccordionWrapper,
  Container,
  FormContainer,
  FormWrapper,
  Text,
} from '../components/styles/Styles';
import Message from '../components/Message';
import { USER_LOGIN_RESET } from '../constants/userConstants';
import loginEffect from '../components/sounds/login.mp3';
import failedLoginAttempt from '../components/sounds/thump02.wav';
import Logo from '../components/assets/logo-white2.png';
import UIfx from 'uifx';
import { Link, useNavigate } from 'react-router-dom';
import { Accordion } from '../components/styles/place-order/Styles';
import CryptoJS from 'crypto-js';
import useLoginForm from '../utils/hooks/useLoginForm';
import LoginForm from '../components/forms/LoginForm';
import validateLoginForm from '../utils/validateLoginForm';

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [capsLockOn, setCapsLocksOn] = useState(false);
  const [showPassword, setShowPassword] = useState({ password: false });
  const [errors, setErrors] = useState({}) as any;
  const [rememberMe, setRememberMe] = useState(false);

  const secret: string = `${process.env.REACT_APP_REMEMBER_ME}`;

  const state = useSelector((state: any) => state);
  const loading = state.userLogin.loading;
  const error = state.userLogin.error;
  const userInfo = state.userLogin.userInfo;

  let formIsValid = true;

  const loginFormCallback = () => {
    const failedLoginAttemptFx = new UIfx(failedLoginAttempt);
    const isValid = validateLoginForm(setErrors, inputs, formIsValid);
    if (!isValid) failedLoginAttemptFx.play();

    dispatch(login(inputs.email.toLowerCase(), inputs.password));

    if (rememberMe) {
      localStorage.setItem(
        'rememberMe',
        JSON.stringify({
          email: inputs.email,
          password: CryptoJS.AES.encrypt(
            JSON.stringify(inputs.password),
            secret
          ).toString(),
          rememberMe: true,
        })
      );
    } else {
      localStorage.removeItem('rememberMe');
    }
  };

  const { inputs, handleInputChange, onSubmit, setInputs } = useLoginForm(
    loginFormCallback,
    setErrors
  );

  useEffect(() => {
    const loginFx = new UIfx(loginEffect);
    const failedLoginAttemptFx = new UIfx(failedLoginAttempt);
    if (userInfo?.isAdmin) {
      history('/admin');
      loginFx.play();
    } else if (userInfo) {
      history('/');
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

  useEffect(() => {
    const parsedLoginData = localStorage.getItem('rememberMe')
      ? JSON.parse(localStorage.getItem('rememberMe') || '')
      : {};

    const rememberMeWasSwitchedOn =
      Object.keys(parsedLoginData)?.length > 0 &&
      Object.getPrototypeOf(parsedLoginData) === Object.prototype;

    if (rememberMeWasSwitchedOn) {
      const bytes = CryptoJS.AES.decrypt(parsedLoginData.password, secret);

      const decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      if (decryptedPassword) {
        setInputs((inputs: any) => ({
          ...inputs,
          email: parsedLoginData.email,
          password: decryptedPassword,
        }));

        setRememberMe(true);
      }
    }
  }, [secret, setInputs]);

  return (
    <Container>
      <FormWrapper className='login m-auto'>
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
            color='#fff'
            fontSize='33px'
            marginBottom='16px'
            fontWeight={400}
          >
            Sign In
          </Text>
          {capsLockOn && <Message variant='warning'>(Caps Lock is on)</Message>}
          <LoginForm
            inputs={inputs}
            handleInputChange={handleInputChange}
            onSubmit={onSubmit}
            formIsValid={formIsValid}
            setErrors={setErrors}
            errors={errors}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            loading={loading}
          />
          <Text
            className='pb-3 pt-5 text-center text-white font-weight-light'
            fontSize='14px'
          >
            New to Little Paws Dachshund Rescue?
            <Link
              to='/register'
              className='d-flex justify-content-center text-white mt-2 font-weight-bolder lead'
              onClick={() => dispatch({ type: USER_LOGIN_RESET })}
            >
              Join now
            </Link>
          </Text>
        </FormContainer>
      </FormWrapper>
      <AccordionWrapper>
        <Accordion toggle={error} maxheight='65px' className='w-100'>
          <Message variant='danger'>{error}</Message>
        </Accordion>
      </AccordionWrapper>
    </Container>
  );
};

export default Login;
