import React, { useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { DEFER_PAYPAL_BUTTON_SUCCESS } from '../../reducers/paypalReducer';
import {
  privacyPolicyLinkKey,
  termsOfServiceLinkKey,
} from '../../utils/footerUtils';
import { inputFullName, inputPassword } from '../../utils/validateShippingForm';
import JumpingInput from '../common/JumpingInput';
import PasswordMeter from '../PasswordMeter';
import { Text } from '../styles/Styles';

const CreateAccountCheckoutForm = ({
  fields,
  handleInput,
  errors,
  formIsValid,
  setErrors,
  validations,
  strength,
  onCreate,
  loadingUserRegister,
  setRevealContactInfo,
  setRevealPayment,
  guestUserInfo,
  setSkipped,
}: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (strength === 4) {
      setErrors((errors: any) => ({ ...errors, password: '' }));
    }
  }, [setErrors, strength]);
  return (
    <Form>
      <Text
        fontFamily='Arial'
        fontSize='12px'
        className='d-flex align-items-center mt-2'
      >
        <i className='fas fa-check'></i>&nbsp;
        {guestUserInfo?.guestUser?.email}
      </Text>
      <JumpingInput
        name='fullName'
        label='Full Name'
        value={fields.fullName || ''}
        handleInputChange={handleInput}
        type='text'
        error={errors?.fullName}
        blur={() => inputFullName(fields, formIsValid, setErrors)}
      />

      <JumpingInput
        name='password'
        label='Password'
        value={fields.password || ''}
        handleInputChange={handleInput}
        type='password'
        error={errors?.password}
        minLength={9}
        blur={() => inputPassword(fields, formIsValid, setErrors)}
      />
      <PasswordMeter validations={validations} strength={strength} />

      <div className='d-flex align-items-center mt-3 mb-1'>
        <Button className='mr-3' onClick={onCreate}>
          Sign{loadingUserRegister && 'ing'} Up
          {loadingUserRegister && '...'}
          {loadingUserRegister && <Spinner animation='border' size='sm' />}
        </Button>
        <Button
          variant='secondary'
          disabled={loadingUserRegister}
          onClick={() => {
            setRevealContactInfo(false);
            setSkipped(true);
            setTimeout(() => setRevealPayment(true), 300);
            dispatch({ type: DEFER_PAYPAL_BUTTON_SUCCESS });
          }}
        >
          Skip
        </Button>
      </div>
      <Text
        fontSize='0.75rem'
        fontWeight='300'
        p='0rem 0.5rem'
        marginBottom='1rem'
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
    </Form>
  );
};

export default CreateAccountCheckoutForm;
