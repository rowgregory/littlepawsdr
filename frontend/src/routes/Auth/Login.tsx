import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLoginForm from '../../utils/hooks/useLoginForm';
import { useLoginMutation } from '../../redux/services/authApi';
import { Logo2024 } from '../../components/assets';
import { User } from '../../redux/features/user/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const loginFormCallback = async () => {
    await login({ email: inputs.email.toLowerCase(), password: inputs.password })
      .unwrap()
      .then((payload: User) => {
        if (payload?.isAdmin) {
          navigate('/admin');
        } else if (payload?.token) {
          navigate('/');
        }
      })
      .catch((err: any) => console.error('LOGIN _FORM_CB_ERR: ', err));
  };

  const { inputs, handleInputChange, onSubmit } = useLoginForm(loginFormCallback);

  return (
    <div className='bg-white min-h-screen flex items-center justify-center p-8'>
      <div className='max-w-md w-full'>
        <Link to='/'>
          <img src={Logo2024} alt='Little Paws Dachshund Rescue' className='w-44 mb-4 mx-auto' />
        </Link>
        <p className='font-Matter-Medium text-2xl text-center mb-2.5'>Sign In</p>
        <form className='flex flex-col w-full'>
          <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
            Email*
          </label>
          <input
            className='auth-input bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none'
            name='email'
            onChange={handleInputChange}
            type='email'
            alt='Email'
            value={inputs.email || ''}
          />
          <label className='font-Matter-Medium text-sm mb-1' htmlFor='password'>
            Password*
          </label>
          <div className='flex relative'>
            <input
              className='auth-input bg-white border-[1px] w-full border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none'
              name='password'
              onChange={handleInputChange}
              type={showPassword ? 'text' : 'password'}
              alt='Password'
              value={inputs.password}
            />
            <i
              onClick={() => setShowPassword(!showPassword)}
              className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'
                } absolute top-4 right-2`}
            ></i>
          </div>

          <Link className='text-sm text-teal-400' to='/auth/forgot-password'>
            Forgot password
          </Link>
          <button
            disabled={isLoading}
            onClick={onSubmit}
            className='py-2 w-full bg-teal-300 text-white font-Matter-Regular rounded-md mt-4 flex items-center justify-center'
          >
            Sign{isLoading && 'ing'} in{isLoading && '...'}
          </button>
        </form>
        <p className='text-sm text-gray-700 text-center mt-3'>
          New to Little Paws Dachshund Rescue?{' '}
          <Link className='text-teal-500' to='/auth/register'>
            Sign up.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
