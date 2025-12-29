import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import {
  useResetPasswordMutation,
  useValidateForgotPasswordTokenQuery,
} from '../../redux/services/authApi';
import { createFormActions } from '../../redux/features/form/formSlice';
import { ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react';
import { useEffect } from 'react';
import { showToast } from '../../redux/features/toastSlice';
import { motion } from 'framer-motion';

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

        dispatch(showToast({ message: 'Successfully reset password', type: 'success' }));
        navigate('/auth/login');
      } catch {
        dispatch(showToast({ message: 'Failed to reset password', type: 'error' }));
      }
    }
  };

  if (loadingTokenValidation) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className='w-12 h-12 border-4 border-gray-200 border-t-teal-400 rounded-full'
        />
      </div>
    );
  }

  if (error || !tokenValidationData?.tokenIsValid) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center p-4'>
        <motion.div
          className='max-w-md w-full bg-white rounded-xl border border-gray-200 p-6 sm:p-8'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className='text-red-500 text-5xl mb-4 text-center'
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ⚠️
          </motion.div>
          <h2 className='text-xl font-bold text-gray-900 text-center mb-2'>Link Expired</h2>
          <p className='text-gray-600 text-center mb-6'>
            {error?.data?.message || 'This reset link has expired. Please request a new one.'}
          </p>
          <Link
            to='/auth/forgot-password'
            className='w-full inline-block text-center bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors'
          >
            Request New Link
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white flex overflow-hidden'>
      {/* Left Side - Branding */}
      <motion.div
        className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-400 via-teal-400 to-sky-500 flex-col items-center justify-center p-12 relative overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated background elements */}
        <motion.div
          className='absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl'
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className='absolute bottom-40 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl'
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        />

        {/* Content */}
        <motion.div
          className='relative z-10 flex items-center justify-center flex-col'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className='w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl'
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className='text-5xl'>🐾</span>
          </motion.div>

          <h1 className='text-4xl lg:text-5xl font-bold text-white mb-4'>
            Little Paws Dachshund Rescue
          </h1>

          <p className='text-white/90 text-lg mb-8 max-w-sm text-center'>
            Secure your account and get back to supporting rescue efforts.
          </p>

          <div className='space-y-3 text-white/80 text-sm'>
            <div className='flex items-center gap-2 justify-center'>
              <Lock className='w-4 h-4' />
              <span>Extra Secure</span>
            </div>
            <div className='flex items-center gap-2 justify-center'>
              <Lock className='w-4 h-4' />
              <span>Password Protected</span>
            </div>
            <div className='flex items-center gap-2 justify-center'>
              <Lock className='w-4 h-4' />
              <span>Your Data is Safe</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        className='w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className='w-full max-w-md'>
          {/* Logo for mobile */}
          <Link to='/' className='lg:hidden flex justify-center mb-8'>
            <div className='bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg'>
              <span className='text-3xl'>🐾</span>
            </div>
          </Link>

          {/* Heading */}
          <motion.div
            className='text-center mb-8'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>Reset Password</h2>
            <p className='text-gray-600'>Create a new password for your account</p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className='space-y-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Password Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>New Password</label>
              <div className='relative'>
                <motion.input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={resetPasswordForm?.inputs?.password || ''}
                  onChange={handleInput}
                  placeholder='Create a strong password'
                  className='w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all'
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </motion.button>
              </div>
              {resetPasswordForm?.errors?.password && (
                <p className='text-red-500 text-sm mt-1'>{resetPasswordForm.errors.password}</p>
              )}
            </div>

            {/* Password Strength */}
            {resetPasswordForm?.inputs?.password && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='space-y-2'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>Password Strength:</span>
                  <span
                    className={`text-sm font-semibold ${
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
                <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
                  <motion.div
                    className={`h-full rounded-full transition-all ${getStrengthColor()}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${passwordStrength}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type='submit'
              disabled={loadingReset || passwordStrength < 80}
              className='w-full bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              whileHover={!loadingReset && passwordStrength >= 80 ? { scale: 1.02 } : {}}
              whileTap={!loadingReset && passwordStrength >= 80 ? { scale: 0.98 } : {}}
            >
              {loadingReset ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className='w-5 h-5 border-2 border-white border-t-transparent rounded-full'
                  />
                  Resetting Password...
                </>
              ) : (
                <>
                  <Lock className='w-4 h-4' />
                  Reset Password
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Back Link */}
          <motion.div
            className='mt-6 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              to='/auth/login'
              className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              Back to Login
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
