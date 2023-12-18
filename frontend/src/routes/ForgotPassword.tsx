import { useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail } from '../actions/forgotPasswordActions';
import JumpingInput from '../components/common/JumpingInput';
import Message from '../components/Message';
import { Accordion } from '../components/styles/place-order/Styles';
import {
  Text,
  Container,
  FormContainer,
  FormWrapper,
  AccordionWrapper,
  GlassBtn,
} from '../components/styles/Styles';
import { RESET_EMAIL_SEND_RESET } from '../constants/resetPasswordContants';
import useForgotPasswordForm from '../utils/hooks/useForgotPasswordForm';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const loading = state.sendEmail.loading;
  const success = state.sendEmail.success;
  const error = state.sendEmail.error;
  const message = state.sendEmail.message;

  const forgotPasswordFormCallback = () => {
    dispatch(sendResetEmail(inputs.forgotPasswordEmail));
  };

  const { inputs, handleInputChange, onSubmit, setInputs } =
    useForgotPasswordForm(forgotPasswordFormCallback);

  useEffect(() => {
    if (error || success) {
      setTimeout(() => dispatch({ type: RESET_EMAIL_SEND_RESET }), 5000);
      setInputs({});
    }
  }, [dispatch, error, success, setInputs]);

  return (
    <Container>
      <FormWrapper className='forgot-password m-auto'>
        <FormContainer>
          <Text color='#fff' fontSize='33px' fontWeight={400}>
            Forgot Password
          </Text>
          <Text marginBottom='16px' marginTop='16px' color='#fff'>
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

            <GlassBtn
              disabled={loading || inputs.forgotPasswordEmail === ''}
              type='submit'
            >
              {loading && (
                <Spinner
                  animation='border'
                  size='sm'
                  style={{ color: '#fff' }}
                  className='mr-2'
                />
              )}
              Send{loading && 'ing'} Email{loading && '...'}&nbsp;&nbsp;
            </GlassBtn>
          </Form>
        </FormContainer>
        <Text
          className='py-3 text-center text-white font-weight-light'
          fontSize='14px'
        >
          Remembered your password?
          <Link
            to='/login'
            className='d-flex justify-content-center text-white mt-2 font-weight-bolder lead'
            onClick={() => dispatch({ type: RESET_EMAIL_SEND_RESET })}
          >
            Sign In
          </Link>
        </Text>
      </FormWrapper>
      <AccordionWrapper>
        <Accordion toggle={error || success} maxheight='65px' className='w-100'>
          <Message variant={error ? 'danger' : 'success'}>
            {error || message?.message}
          </Message>
        </Accordion>
      </AccordionWrapper>
    </Container>
  );
};

export default ForgotPassword;
