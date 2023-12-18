import { Form, Spinner } from 'react-bootstrap';
import JumpingInput from '../common/JumpingInput';
import { inputEmail, inputPassword } from '../../utils/validateLoginForm';
import { GlassBtn } from '../styles/Styles';
import { useDispatch } from 'react-redux';
import { USER_LOGIN_RESET } from '../../constants/userConstants';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  inputs: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formIsValid: boolean;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  errors: any;
  showPassword: any;
  setShowPassword: React.Dispatch<React.SetStateAction<any>>;
  rememberMe: boolean;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

const LoginForm: FC<LoginFormProps> = ({
  inputs,
  handleInputChange,
  onSubmit,
  formIsValid,
  setErrors,
  errors,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  loading,
}: any) => {
  const dispatch = useDispatch();
  return (
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
      <Form.Group className='d-flex align-items-center' controlId='rememberMe'>
        <Form.Check
          type='switch'
          checked={rememberMe || false}
          onChange={(e: any) => setRememberMe(e.target.checked)}
        ></Form.Check>
        <Form.Label className='mb-0 text-white' style={{ fontSize: '14px' }}>
          Remember Me
        </Form.Label>
      </Form.Group>
      <div className='mb-2'>
        <Link
          className='text-white text-center'
          to='/forgot-password'
          onClick={() => {
            dispatch({ type: USER_LOGIN_RESET });
          }}
        >
          Forgot password
        </Link>
      </div>
      <GlassBtn disabled={loading} type='submit'>
        {loading && (
          <Spinner
            animation='border'
            size='sm'
            style={{ color: '#fff' }}
            className='mr-2'
          />
        )}
        Sign{loading && 'ing'} In{loading && '...'}&nbsp;&nbsp;
      </GlassBtn>
    </Form>
  );
};

export default LoginForm;
