import { Eye, EyeOff, Heart, Lock, User } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Errors, Inputs } from '../../types/form-types';
import { AuthInput } from '../ui/AuthInput';

interface ILoginForm {
  handleSubmit: (e: any) => void;
  handleInput: (inputs: any) => void;
  loginForm: { inputs: Inputs; errors: Errors };
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  isLoading: boolean;
}

const LoginForm: FC<ILoginForm> = ({ handleSubmit, handleInput, loginForm, showPassword, setShowPassword, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full space-y-4'>
      <AuthInput
        label='Email address *'
        icon={<User className='w-4 h-4 text-teal-500' />}
        name='email'
        value={loginForm?.inputs?.email || ''}
        onChange={handleInput}
        error={loginForm?.errors?.email}
        placeholder='Enter email'
      />
      <div>
        <div className='flex justify-between items-center mb-1'>
          <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
            <Lock className='w-4 h-4 text-teal-500' />
            Password *
          </label>
          <Link
            to='/auth/forgot-password'
            type='button'
            className='text-xs text-teal-600 hover:text-teal-700 font-medium hover:underline transition-colors'
          >
            Forgot password?
          </Link>
        </div>
        <div className='flex flex-col relative'>
          <input
            name='password'
            onChange={handleInput}
            type={showPassword ? 'text' : 'password'}
            alt='Password'
            value={loginForm?.inputs.password || ''}
            className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-300 transition-colors ${
              loginForm?.errors?.password ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-teal-400'
            }`}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors'
          >
            {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
          </button>
          {loginForm?.errors?.password && <p className='text-red-500 text-xs mt-1'>{loginForm?.errors?.password}</p>}
        </div>
      </div>
      <button
        type='submit'
        disabled={isLoading}
        className='mt-2 w-full bg-gradient-to-r from-teal-400 to-blue-400 text-white font-bold py-4 px-6 rounded-xl hover:from-teal-500 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-teal-300 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
      >
        {isLoading ? (
          <div className='flex items-center justify-center gap-2'>
            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            Logging In...
          </div>
        ) : (
          <div className='flex items-center justify-center gap-2'>
            <Heart className='w-5 h-5' />
            Log In to Little Paws Family
          </div>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
