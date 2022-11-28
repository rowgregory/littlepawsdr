import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import {
  privacyPolicyLinkKey,
  termsOfServiceLinkKey,
} from '../../utils/footerUtils';
import { inputFullName, inputPassword } from '../../utils/validateShippingForm';
import JumpingInput from '../common/JumpingInput';
import PasswordMeter, { PasswordRequirements } from '../PasswordMeter';
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
}: any) => {
  useEffect(() => {
    if (strength === 4) {
      setErrors((errors: any) => ({ ...errors, password: '' }));
    }
  }, [setErrors, strength]);
  const [showPassword, setShowPassword] = useState({ password: false });
  const [show, setShow] = useState(false);
  return (
    <Form>
      <Text className='d-flex align-items-center mb-3'>
        <i className='fas fa-check'></i>&nbsp;
        <Text fontSize='12px'>{guestUserInfo?.email}</Text>
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
        type={showPassword.password ? 'text' : 'password'}
        error={errors?.password}
        minLength={9}
        blur={() => inputPassword(fields, formIsValid, setErrors)}
        showPassword={showPassword.password}
        setShowPassword={setShowPassword}
      />
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
      <div className='d-flex align-items-center mt-3 mb-1'>
        <Button className='mr-3' onClick={onCreate}>
          Sign{loadingUserRegister && 'ing'} Up
          {loadingUserRegister && '...'}
          {loadingUserRegister && (
            <Spinner animation='border' size='sm' style={{ color: '#fff' }} />
          )}
        </Button>
        <Button
          variant='secondary'
          disabled={loadingUserRegister}
          onClick={() => {
            setRevealContactInfo(false);
            setTimeout(() => setRevealPayment(true), 300);
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
