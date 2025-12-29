import { Link } from 'react-router-dom';
import { useForgotPasswordEmailMutation } from '../../redux/services/authApi';
import { useAppDispatch, useFormSelector } from '../../redux/toolkitStore';
import { createFormActions, resetForm } from '../../redux/features/form/formSlice';
import validateForgotPasswordForm from '../../validations/validateForgotPasswordForm';
import { ArrowRight, Heart, HelpCircle, PawPrint } from 'lucide-react';
import { showToast } from '../../redux/features/toastSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { forgotPasswordForm } = useFormSelector();
  const { handleInput, setErrors } = createFormActions('forgotPasswordForm', dispatch);
  const [forgotPassword, { isLoading }] = useForgotPasswordEmailMutation();
  const [showInfo, setShowInfo] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateForgotPasswordForm(forgotPasswordForm?.inputs, setErrors)) return;

    try {
      await forgotPassword({ email: forgotPasswordForm?.inputs?.email.toLowerCase() }).unwrap();
      dispatch(showToast({ message: 'Forgot password email sent!', type: 'success' }));
      dispatch(resetForm('forgotPasswordForm'));
    } catch {
      dispatch(showToast({ message: 'Failed to send forgot password email', type: 'error' }));
    }
  };

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
          <Link to='/' className='text-4xl lg:text-5xl font-bold text-white mb-4 text-center'>
            Little Paws Dachshund Rescue
          </Link>

          <p className='text-white/90 text-lg mb-8 max-w-sm text-center'>
            Help us rescue and care for dachshunds in need. Every contribution makes a difference.
          </p>

          {/* Animated hearts */}
          <div className='flex justify-center gap-2 mb-8'>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              >
                <Heart className='w-5 h-5 text-white fill-current' />
              </motion.div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className='space-y-3 text-white/80 text-sm'>
            <div className='flex items-center gap-2 justify-center'>
              <PawPrint className='w-4 h-4' />
              <span>Secure & Private</span>
            </div>
            <div className='flex items-center gap-2 justify-center'>
              <PawPrint className='w-4 h-4' />
              <span>15+ Years Experience</span>
            </div>
            <div className='flex items-center gap-2 justify-center'>
              <PawPrint className='w-4 h-4' />
              <span>Non-Profit Organization</span>
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
            <div className='bg-gradient-to-br from-teal-400 to-sky-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg'>
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
            <div className='flex items-center justify-center gap-2 mb-2'>
              <h2 className='text-3xl font-bold text-gray-900'>Forgot Password Reset</h2>
              <motion.button
                type='button'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInfo(!showInfo)}
                className='p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700'
                title='Why reset your password?'
              >
                <HelpCircle className='w-5 h-5' />
              </motion.button>
            </div>

            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className='bg-teal-50 border border-teal-200 rounded-lg p-3 mt-3 text-left'
                >
                  <p className='text-teal-900 text-sm leading-relaxed'>
                    Your password is locked in a super secret box. Even we can't open it! So you
                    need to create a brand new password. It's like getting a new key to your house -
                    extra safe!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className='text-gray-600 mt-3'>
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className='space-y-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
              <motion.input
                type='email'
                name='email'
                value={forgotPasswordForm?.inputs?.email || ''}
                onChange={handleInput}
                placeholder='you@example.com'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all'
                whileFocus={{ scale: 1.02 }}
              />
              {forgotPasswordForm?.errors?.email && (
                <p className='text-red-500 text-sm mt-1'>{forgotPasswordForm.errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type='submit'
              disabled={isLoading}
              className='w-full bg-gradient-to-r from-teal-400 to-sky-400 hover:from-teal-500 hover:to-sky-500 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className='w-5 h-5 border-2 border-white border-t-transparent rounded-full'
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className='w-4 h-4' />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.div
            className='mt-6 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className='text-gray-600 text-sm'>
              Remember your password?{' '}
              <Link
                to='/auth/login'
                className='text-teal-600 hover:text-teal-700 font-semibold transition-colors'
              >
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
