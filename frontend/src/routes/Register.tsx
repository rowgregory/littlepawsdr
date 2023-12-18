import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import {
  AccordionWrapper,
  Container,
  FormContainer,
  FormWrapper,
  Text,
} from '../components/styles/Styles';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import {
  inputConfirmPassword,
  inputEmail,
  inputName,
  inputPassword,
  validateRegisterForm,
} from '../utils/validateRegisterForm';
import Message from '../components/Message';
import {
  privacyPolicyLinkKey,
  termsOfServiceLinkKey,
} from '../utils/footerUtils';
import { Accordion } from '../components/styles/place-order/Styles';
import { Link, useLocation } from 'react-router-dom';
import LogoDay from '../components/assets/logo-white2.png';
import useRegisterForm from '../utils/hooks/useRegisterForm';
import RegisterForm from '../components/forms/RegisterForm';

const Register = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({}) as any;
  const [show, setShow] = useState(true);
  const [submittedForm, setSubmittedForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const state = useSelector((state: any) => state);
  const loading = state.userRegister.loading;
  const success = state.userRegister.success;
  const error = state.userRegister.error;
  const message = state.userRegister.message;
  const strength = state.password.strength;

  let formIsValid = true;

  const registerFormCallback = async () => {
    setSubmittedForm(true);
    const isValid = validateRegisterForm(setErrors, inputs, formIsValid);
    if (!isValid) setSubmittedForm(false);

    if (isValid && strength === 4) {
      if (inputs.password === inputs.confirmPassword) {
        setErrorMsg('');
        dispatch(register(inputs.name, inputs.email, inputs.password));
        setSubmittedForm(false);
      } else {
        setErrorMsg('Passwords do not match');
        setSubmittedForm(false);
      }
    }
  };

  const { inputs, handleInputChange, onSubmit, setInputs } = useRegisterForm(
    registerFormCallback,
    location.state
  );

  useEffect(() => {
    if (success || error) {
      setInputs({});
      setTimeout(() => dispatch({ type: USER_REGISTER_RESET }), 5000);
    }
  }, [dispatch, error, setInputs, success]);

  return (
    <Container>
      <FormWrapper className='m-auto px-3 register'>
        <FormContainer>
          <Link to='/'>
            <Image
              src={LogoDay}
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
            {loading ? 'One moment' : 'Join us!'}
          </Text>
          <RegisterForm
            onSubmit={onSubmit}
            inputs={inputs}
            errors={errors}
            handleInputChange={handleInputChange}
            inputName={inputName}
            formIsValid={formIsValid}
            setErrors={setErrors}
            inputEmail={inputEmail}
            showPassword={showPassword}
            inputPassword={inputPassword}
            setShowPassword={setShowPassword}
            setShow={setShow}
            show={show}
            inputConfirmPassword={inputConfirmPassword}
            loading={loading}
            submittedForm={submittedForm}
          />
          <Text
            color='#fff'
            fontSize='0.75rem'
            fontWeight='300'
            marginTop='1.5rem'
            p='0rem 0.5rem'
          >
            By clicking Sign Up, you agree to our{' '}
            <span
              style={{
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.75rem',
                textDecoration: 'underline',
              }}
              onClick={() => window.open(termsOfServiceLinkKey, '_blank')}
            >
              Terms of Service
            </span>{' '}
            and that you have read our{' '}
            <span
              style={{
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.75rem',
                textDecoration: 'underline',
              }}
              onClick={() => window.open(privacyPolicyLinkKey, '_blank')}
            >
              Privacy Policy
            </span>
          </Text>
        </FormContainer>
        <Text
          className='py-3 text-center text-white font-weight-light'
          fontSize='14px'
        >
          Already have an account?
          <Link
            to='/login'
            className='d-flex justify-content-center text-white mt-2 font-weight-bolder lead'
            onClick={() => dispatch({ type: USER_REGISTER_RESET })}
          >
            Sign In
          </Link>
        </Text>
      </FormWrapper>
      <AccordionWrapper>
        <Accordion toggle={success} maxheight='65px' className='w-100'>
          <Message variant='success'>{message?.message}</Message>
        </Accordion>
      </AccordionWrapper>
      <AccordionWrapper>
        <Accordion
          toggle={error || errorMsg}
          maxheight='65px'
          className='w-100'
        >
          <Message variant='danger'>{error || errorMsg}</Message>
        </Accordion>
      </AccordionWrapper>
    </Container>
  );
};

export default Register;
