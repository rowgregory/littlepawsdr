import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import {
  useResetPasswordMutation,
  useValidateForgotPasswordTokenQuery,
} from '../../redux/services/authApi';
import { createFormActions } from '../../redux/features/form/formSlice';
import { Eye, EyeOff, Heart, Lock } from 'lucide-react';
import { useEffect } from 'react';
import { showToast } from '../../redux/features/toastSlice';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resetPasswordForm, passwordStrength, showPassword } = useAppSelector(
    (state: RootState) => state.form
  );
  const { handleInput, setShowPassword, setPasswordStrength } = createFormActions(
    'resetPasswordForm',
    dispatch
  );
  const [resetPassword, { isLoading: loadingReset }] = useResetPasswordMutation();
  const {
    data: tokenValidationData,
    error,
    isLoading: loadingTokenValidation,
  } = useValidateForgotPasswordTokenQuery({ token });

  useEffect(() => {
    if (resetPasswordForm?.inputs?.password) {
      setPasswordStrength(resetPasswordForm?.inputs?.password);
    } else {
      setPasswordStrength('0');
    }
  }, [resetPasswordForm, setPasswordStrength]);

  const getStrengthColor = () => {
    if (passwordStrength <= 20) return 'bg-red-400';
    if (passwordStrength <= 40) return 'bg-orange-400';
    if (passwordStrength <= 60) return 'bg-yellow-400';
    if (passwordStrength <= 80) return 'bg-blue-400';
    return 'bg-green-400';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 20) return 'Very Weak';
    if (passwordStrength <= 40) return 'Weak';
    if (passwordStrength <= 60) return 'Fair';
    if (passwordStrength <= 80) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (passwordStrength === 100) {
      try {
        await resetPassword({
          id: tokenValidationData.userId,
          password: resetPasswordForm?.inputs?.password,
        }).unwrap();

        navigate('/auth/reset-password/success');
      } catch {
        dispatch(showToast({ message: 'Failed to reset password', type: 'error' }));
      }
    }
  };

  if (loadingTokenValidation) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <p className='text-gray-500 text-lg font-Matter-Regular'>Checking token...</p>
      </div>
    );
  }

  if (error || !tokenValidationData?.tokenIsValid) {
    return (
      <div className='bg-white min-h-screen flex items-center justify-center p-8'>
        <div className='max-w-md w-full'>
          <div className='flex flex-col items-center justify-center shadow-lg rounded-3xl py-5 px-3.5'>
            <i className='fa-solid fa-circle-exclamation text-red-500 fa-4x flex justify-center mb-3'></i>
            <p className='text-red-500 text-lg font-Matter-Medium text-center mb-2'>
              {error?.data?.message || 'This reset link has expired.'}
            </p>
            <p className='text-sm text-gray-400 font-Matter-Light text-center mb-3.5'>
              Please request a new reset link to continue.
            </p>
            <Link
              to='/auth/forgot-password'
              className='text-white text-sm bg-red-500 rounded-md py-1.5 px-8 font-Matter-Regular duration-300 hover:no-underline hover:bg-red-600'
            >
              Try again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full'>
        <div className='bg-gradient-to-r from-amber-400 to-orange-400 p-8 text-center'>
          <div className='bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg'>
            <span className='text-4xl'>🐾</span>
          </div>
          <h1 className='text-2xl font-bold text-white mb-2'>Little Paws Dachshund Rescue</h1>
          <div className='flex justify-center gap-1 mt-3'>
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className='w-4 h-4 text-white fill-current animate-pulse'
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
        <div className='p-8'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>Reset Your Password</h2>
            <p className='text-gray-600 text-sm'>
              Enter your new password to regain access to your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col w-full space-y-4'>
            <div>
              <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
                <Lock className='w-4 h-4 text-amber-500' />
                Pasword *
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={resetPasswordForm?.inputs?.password || ''}
                  onChange={handleInput}
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors ${
                    resetPasswordForm?.errors?.password
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 focus:border-amber-400'
                  }`}
                  placeholder='Create a strong password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors'
                >
                  {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>
              {resetPasswordForm?.inputs?.password && (
                <div className='mt-2'>
                  <div className='flex justify-between items-center mb-1'>
                    <span className='text-xs text-gray-600'>Password Strength:</span>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength <= 40
                          ? 'text-red-500'
                          : passwordStrength <= 60
                          ? 'text-yellow-500'
                          : passwordStrength <= 80
                          ? 'text-blue-500'
                          : 'text-green-500'
                      }`}
                    >
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {resetPasswordForm?.errors?.password && (
                <p className='text-red-500 text-xs mt-1'>{resetPasswordForm?.errors?.password}</p>
              )}
            </div>
            <button
              type='submit'
              disabled={loadingReset}
              className='w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold py-4 px-6 rounded-xl hover:from-amber-500 hover:to-orange-500 focus:outline-none focus:ring-4 focus:ring-amber-300 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              {loadingReset ? (
                <div className='flex items-center justify-center gap-2'>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Resetting Password...
                </div>
              ) : (
                <div className='flex items-center justify-center gap-2'>
                  <Heart className='w-5 h-5' />
                  Reset Password
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
