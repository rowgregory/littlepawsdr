import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/services/authApi';
import { useAppDispatch, useFormSelector } from '../../redux/toolkitStore';
import { createFormActions } from '../../redux/features/form/formSlice';
import { ArrowRight, Eye, EyeOff, Heart, PawPrint } from 'lucide-react';
import validateLoginForm from '../../validations/validateLoginForm';
import { hydrateUserState } from '../../redux/features/userSlice';
import { showToast } from '../../redux/features/toastSlice';
import { hydrateAuthState } from '../../redux/features/auth/authSlice';
import { motion } from 'framer-motion';

const Login = () => {
  const dispatch = useAppDispatch();
  const { loginForm, showPassword } = useFormSelector();
  const { handleInput, setErrors, setShowPassword } = createFormActions('loginForm', dispatch);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const inputs = loginForm?.inputs;
  const errors = loginForm?.errors;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateLoginForm(inputs, setErrors)) return;

    try {
      const response = await login({
        email: inputs?.email.toLowerCase(),
        password: inputs?.password,
      }).unwrap();

      dispatch(hydrateUserState(response));
      dispatch(hydrateAuthState(response));
      dispatch(showToast({ message: 'Login success!', type: 'success' }));
      if (response?.user?.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/supporter/overview');
      }
    } catch (err: any) {
      dispatch(showToast({ message: err?.data?.message, type: 'error' }));
    }
  };

  return (
    <div className='min-h-screen bg-white flex overflow-hidden'>
      {/* Left Side */}
      <motion.div
        className='w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className='w-full max-w-md'>
          {/* Heading */}
          <motion.div
            className='text-center mb-8'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className='flex items-center justify-center gap-2 mb-2'>
              <h2 className='text-3xl font-bold text-gray-900'>Sign In</h2>
            </div>

            <p className='text-gray-600 mt-3'>Welcome back! Sign in to your account to continue.</p>
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
                value={inputs?.email || ''}
                onChange={handleInput}
                placeholder='you@example.com'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all'
                whileFocus={{ scale: 1.02 }}
              />
              {errors?.email && <p className='text-red-500 text-sm mt-1'>{errors?.email}</p>}
            </div>

            <div>
              <div className='flex items-center justify-between mb-2'>
                <label className='block text-sm font-medium text-gray-700'>Password</label>
                <Link
                  to='/auth/forgot-password'
                  className='text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors'
                >
                  Forgot?
                </Link>
              </div>
              <div className='relative'>
                <motion.input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={inputs?.password || ''}
                  onChange={handleInput}
                  className='w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all'
                  whileFocus={{ scale: 1.02 }}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1'
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>
              {errors?.password && <p className='text-red-500 text-sm mt-1'>{errors?.password}</p>}
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className='w-4 h-4' />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Sign Up Link */}
          <motion.div
            className='mt-6 pt-6 border-t border-gray-200 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className='text-gray-600 text-sm'>
              Don't have an account?{' '}
              <Link
                to='/auth/register'
                className='text-teal-600 hover:text-teal-700 font-semibold transition-colors'
              >
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side */}
      <motion.div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-400 via-teal-400 to-sky-500 flex-col items-center justify-center p-12 relative overflow-hidden'>
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
    </div>
  );
};

export default Login;
