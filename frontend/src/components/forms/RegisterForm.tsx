import { Form, Spinner } from 'react-bootstrap';
import JumpingInput from '../common/JumpingInput';
import { GlassBtn } from '../styles/Styles';
import PasswordValidationSection from '../common/PasswordValidationSection';

const RegisterForm = ({
  onSubmit,
  inputs,
  errors,
  handleInputChange,
  inputName,
  formIsValid,
  setErrors,
  inputEmail,
  showPassword,
  inputPassword,
  setShowPassword,
  setShow,
  show,
  inputConfirmPassword,
  loading,
  submittedForm,
}: any) => {
  return (
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
      <div style={{ marginBottom: '-12px' }}>
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
      <PasswordValidationSection
        show={show}
        setShow={setShow}
        inputs={inputs}
      />
      <div className='mt-2'>
        <JumpingInput
          autocomplete
          name='confirmPassword'
          label='Confirm Password'
          value={inputs.confirmPassword || ''}
          handleInputChange={handleInputChange}
          type={showPassword.confirmPassword ? 'text' : 'password'}
          error={errors?.confirmPassword}
          blur={() => inputConfirmPassword(inputs, formIsValid, setErrors)}
          showPassword={showPassword.confirmPassword}
          setShowPassword={setShowPassword}
        />
      </div>
      <GlassBtn disabled={loading || submittedForm} type='submit'>
        {(loading || submittedForm) && (
          <Spinner
            animation='border'
            size='sm'
            style={{ color: '#fff' }}
            className='mr-2'
          />
        )}
        Sign{(loading || submittedForm) && 'ing'} Up
        {(loading || submittedForm) && '...'}
      </GlassBtn>
    </Form>
  );
};

export default RegisterForm;
