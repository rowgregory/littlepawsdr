import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
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
import { USER_REGISTER_RESET } from '../constants/userConstants';
import {
  inputConfirmPassword,
  inputEmail,
  inputName,
  inputPassword,
  validateRegisterForm,
} from '../utils/validateRegisterForm';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';
import Message from '../components/Message';
import JumpingInput from '../components/common/JumpingInput';
import {
  privacyPolicyLinkKey,
  termsOfServiceLinkKey,
} from '../utils/footerUtils';
import { Accordion } from '../components/styles/place-order/Styles';
// import ReCAPTCHA from 'react-google-recaptcha';
// import axios from 'axios';

const useRegisterForm = (cb: any, state: any) => {
  const values = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [inputs, setInputs] = useState(values) as any;

  useEffect(() => {
    if (state) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: state?.userInfo?.name,
        email: state?.userInfo?.email,
      }));
    }
  }, [state]);

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

const Register = ({ location }: any) => {
  const dispatch = useDispatch();
  const { state } = location;
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({}) as any;
  const [show, setShow] = useState(true);
  const [submittedForm, setSubmittedForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  // const [recap, setRecap] = useState(false);

  const {
    userRegister: { loading, success, error, message },
  } = useSelector((state: any) => state);

  let formIsValid = true;

  const registerFormCallback = async () => {
    setSubmittedForm(true);
    const isValid = validateRegisterForm(setErrors, inputs, formIsValid);
    if (!isValid) setSubmittedForm(false);

    if (isValid && strength === 4) {
      if (inputs.password === inputs.confirmPassword) {
        setErrorMsg('');
        dispatch(register(inputs.name, inputs.email, inputs.password));
        // setRecap(true);
        setSubmittedForm(false);
      } else {
        setErrorMsg('Passwords do not match');
        setSubmittedForm(false);
      }
    } else {
      setErrorMsg('Password is not strong enough');
      setSubmittedForm(false);
    }
  };

  const { inputs, handleInputChange, onSubmit, setInputs } = useRegisterForm(
    registerFormCallback,
    state
  );

  useEffect(() => {
    if (success || error) {
      setInputs({});
      setTimeout(() => dispatch({ type: USER_REGISTER_RESET }), 5000);
    }
  }, [dispatch, error, setInputs, success]);

  const validations = [
    inputs?.password?.length >= 9 ? 1 : 0,
    inputs?.password?.search(/[A-Z]/) > -1 ? 1 : 0,
    inputs?.password?.search(/[0-9]/) > -1 ? 1 : 0,
    inputs?.password?.search(/[~`!-@#$%^ &*()_+={}|:;"',.?]/) > -1 ? 1 : 0,
  ];

  const strength = validations.reduce((acc, cur) => acc + cur, 0);

  // const handleRecaptcha = async (captchaToken: any) => {
  //   setSubmittedForm(true);
  //   const res = (await axios.post('/api/recaptcha', {
  //     captchaToken,
  //   })) as any;

  //   if (res?.data?.success && res?.data?.message === 'verified') {
  //     dispatch(register(inputs.name, inputs.email, inputs.password));
  //     setRecap(false);
  //     setSubmittedForm(false);
  //   }
  // };

  return (
    <Container>
      {(loading || submittedForm) && <HexagonLoader />}
      {/* {recap ? (
        <div className='d-flex align-items-center justify-content-center'>
          <ReCAPTCHA
            sitekey={`${process.env.REACT_APP_RECAPTCHA_KEY}`}
            onChange={handleRecaptcha}
          />
        </div>
      ) : ( */}
      <FormWrapper className='mx-auto px-3'>
        <Text fontSize='1.5rem' textAlign='center' marginBottom='0.65rem'>
          {loading ? 'One moment' : 'Welcome to Little Paws'}
        </Text>
        <FormContainer>
          <Form onSubmit={onSubmit}>
            <JumpingInput
              autocomplete
              name='name'
              label='Full Name'
              value={inputs.name || ''}
              handleInputChange={handleInputChange}
              type='text'
              error={errors?.name}
              blur={() => inputName(inputs, formIsValid, setErrors)}
            />
            <JumpingInput
              autocomplete
              name='email'
              label='Email'
              value={inputs.email || ''}
              handleInputChange={handleInputChange}
              type='email'
              error={errors?.email}
              blur={() => inputEmail(inputs, formIsValid, setErrors)}
            />
            <div style={{ marginBottom: '-16px' }}>
              <JumpingInput
                autocomplete
                name='password'
                label='Password'
                value={inputs.password || ''}
                handleInputChange={handleInputChange}
                type={showPassword.password ? 'text' : 'password'}
                error={errors?.password}
                blur={() => inputPassword(inputs, formIsValid, setErrors)}
                showPassword={showPassword.password}
                setShowPassword={setShowPassword}
              />
            </div>
            <PasswordMeter validations={validations} strength={strength} />
            <Text
              cursor='pointer'
              fontSize='12px'
              onClick={() => setShow(!show)}
              className='d-flex align-items-center justify-content-between'
            >
              {show ? 'Hide ' : 'Show '}password requirements
              <i className={`fas fa-chevron-${show ? 'up' : 'down'} fa-sm`}></i>
            </Text>
            <PasswordRequirements validations={validations} open={show} />
            <div className='mt-2'>
              <JumpingInput
                autocomplete
                name='confirmPassword'
                label='Confirm Password'
                value={inputs.confirmPassword || ''}
                handleInputChange={handleInputChange}
                type={showPassword.confirmPassword ? 'text' : 'password'}
                error={errors?.confirmPassword}
                blur={() =>
                  inputConfirmPassword(inputs, formIsValid, setErrors)
                }
                showPassword={showPassword.confirmPassword}
                setShowPassword={setShowPassword}
              />
            </div>
            <StyledButton
              disabled={loading}
              type='submit'
              className='d-flex align-items-center border-0 w-100 justify-content-center mt-3'
            >
              <Text color='#fff'>
                Sign{loading && 'ing'} Up{loading && '...'}&nbsp;&nbsp;
              </Text>
            </StyledButton>
          </Form>
          <Text
            fontSize='0.75rem'
            fontWeight='300'
            marginTop='1.5rem'
            p='0rem 0.5rem'
          >
            By clicking Sign Up, you agree to our{' '}
            <span
              style={{ color: '#82c2e4', cursor: 'pointer' }}
              onClick={() => window.open(termsOfServiceLinkKey, '_blank')}
            >
              Terms of Service
            </span>{' '}
            and that you have read our{' '}
            <span
              style={{ color: '#82c2e4', cursor: 'pointer' }}
              onClick={() => window.open(privacyPolicyLinkKey, '_blank')}
            >
              Privacy Policy
            </span>
          </Text>
        </FormContainer>
        <CreateAccountContainer className='py-3 mt-3'>
          Already have an account? <StyledLink to='/login'>Sign In</StyledLink>
        </CreateAccountContainer>
      </FormWrapper>
      {/* )} */}
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
        <Accordion toggle={success} maxheight='65px' className='w-100'>
          <Message variant='success'>{message?.message}</Message>
        </Accordion>
      </div>
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
        <Accordion
          toggle={error || errorMsg}
          maxheight='65px'
          className='w-100'
        >
          <Message variant='danger'>{error || errorMsg}</Message>
        </Accordion>
      </div>
    </Container>
  );
};

export default Register;
