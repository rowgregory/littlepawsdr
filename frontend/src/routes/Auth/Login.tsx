import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/services/authApi';
import { useAppDispatch, useFormSelector } from '../../redux/toolkitStore';
import { createFormActions } from '../../redux/features/form/formSlice';
import { AlertCircle, Eye, EyeOff, Info } from 'lucide-react';
import validateLoginForm from '../../validations/validateLoginForm';
import { hydrateUserState } from '../../redux/features/userSlice';
import { hydrateAuthState } from '../../redux/features/auth/authSlice';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Login = () => {
  const dispatch = useAppDispatch();
  const { loginForm, showPassword } = useFormSelector();
  const { handleInput, setErrors, setShowPassword } = createFormActions('loginForm', dispatch);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  // Inline status message (replaces toasts)
  const [status, setStatus] = useState<{ type: 'error' | 'info'; message: string } | null>(null);

  const inputs = loginForm?.inputs;
  const errors = loginForm?.errors;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus(null);

    if (!validateLoginForm(inputs, setErrors)) return;

    try {
      const response = await login({
        email: inputs?.email.toLowerCase(),
        password: inputs?.password,
      }).unwrap();

      dispatch(hydrateUserState(response));
      dispatch(hydrateAuthState(response));

      if (response?.user?.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/supporter/overview');
      }
    } catch (err: any) {
      if (err?.data?.isGuest) {
        setStatus({
          type: 'info',
          message: 'Please set up your password to access your account.',
        });
        navigate(`/auth/register?email=${encodeURIComponent(inputs.email)}`);
      } else {
        setStatus({
          type: 'error',
          message:
            err?.data?.message || 'Unable to sign in. Please check your details and try again.',
        });
      }
    }
  };

  return (
    <div className='min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center px-4 py-10 sm:px-6 relative overflow-hidden'>
      <motion.div
        className='relative z-10 w-full max-w-md'
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Eyebrow + heading */}
        <div className='mb-8'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 sm:gap-3 mb-4 focus:outline-none focus-visible:underline'
          >
            <span
              className='block w-6 sm:w-8 h-px bg-primary-light dark:bg-primary-dark'
              aria-hidden='true'
            />
            <span className='text-[10px] font-mono tracking-[0.18em] uppercase text-primary-light dark:text-primary-dark'>
              Little Paws Dachshund Rescue
            </span>
          </Link>
          <h1 className='font-quicksand text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark leading-tight'>
            Welcome <span className='font-light text-muted-light dark:text-muted-dark'>back</span>
          </h1>
          <p className='text-sm text-muted-light dark:text-muted-dark mt-3 leading-relaxed'>
            Sign in to your account to continue supporting the rescue.
          </p>
        </div>

        {/* Inline status banner (replaces toasts) */}
        {status && (
          <div
            role={status.type === 'error' ? 'alert' : 'status'}
            aria-live={status.type === 'error' ? 'assertive' : 'polite'}
            className={`mb-5 flex items-start gap-2.5 border-2 px-3.5 py-3 text-sm ${
              status.type === 'error'
                ? 'border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300'
                : 'border-primary-light/40 dark:border-primary-dark/40 bg-primary-light/10 dark:bg-primary-dark/10 text-text-light dark:text-text-dark'
            }`}
          >
            {status.type === 'error' ? (
              <AlertCircle className='w-4 h-4 mt-0.5 shrink-0' aria-hidden='true' />
            ) : (
              <Info className='w-4 h-4 mt-0.5 shrink-0' aria-hidden='true' />
            )}
            <span className='leading-snug'>{status.message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4' noValidate aria-label='Sign in form'>
          {/* Email */}
          <div>
            <label
              htmlFor='login-email'
              className='block text-[10px] font-mono tracking-[0.18em] uppercase text-muted-light dark:text-muted-dark mb-2'
            >
              Email Address
            </label>
            <input
              id='login-email'
              type='email'
              name='email'
              value={inputs?.email || ''}
              onChange={handleInput}
              placeholder='you@example.com'
              autoComplete='email'
              required
              aria-required='true'
              aria-invalid={!!errors?.email}
              aria-describedby={errors?.email ? 'email-error' : undefined}
              className='w-full px-3.5 py-3 text-base sm:text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
            />
            {errors?.email && (
              <p
                id='email-error'
                role='alert'
                className='text-xs text-red-600 dark:text-red-400 font-mono mt-1.5'
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className='flex items-center justify-between gap-2 mb-2'>
              <label
                htmlFor='login-password'
                className='block text-[10px] font-mono tracking-[0.18em] uppercase text-muted-light dark:text-muted-dark'
              >
                Password
              </label>
              <Link
                to='/auth/forgot-password'
                className='text-[10px] font-mono tracking-[0.12em] uppercase text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors focus:outline-none focus-visible:underline'
              >
                Forgot?
              </Link>
            </div>
            <div className='relative'>
              <input
                id='login-password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={inputs?.password || ''}
                onChange={handleInput}
                autoComplete='current-password'
                required
                aria-required='true'
                aria-invalid={!!errors?.password}
                aria-describedby={errors?.password ? 'password-error' : undefined}
                className='w-full pl-3.5 pr-11 py-3 text-base sm:text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark p-1.5'
              >
                {showPassword ? (
                  <EyeOff className='w-4 h-4' aria-hidden='true' />
                ) : (
                  <Eye className='w-4 h-4' aria-hidden='true' />
                )}
              </button>
            </div>
            {errors?.password && (
              <p
                id='password-error'
                role='alert'
                className='text-xs text-red-600 dark:text-red-400 font-mono mt-1.5'
              >
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type='submit'
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.01 } : {}}
            whileTap={!isLoading ? { scale: 0.99 } : {}}
            aria-disabled={isLoading}
            className={`w-full py-3.5 sm:py-4 font-black text-[11px] tracking-[0.18em] uppercase font-mono transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-light/50 dark:focus-visible:ring-primary-dark/50 ${
              isLoading
                ? 'bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark border-2 border-border-light dark:border-border-dark cursor-not-allowed'
                : 'bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white cursor-pointer'
            }`}
          >
            {isLoading ? (
              <span className='flex items-center justify-center gap-2' aria-live='polite'>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className='block w-3.5 h-3.5 border-2 border-current/30 border-t-current'
                  aria-hidden='true'
                />
                Signing in…
              </span>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        {/* Register link */}
        <div className='mt-6 pt-6 border-t border-border-light dark:border-border-dark'>
          <p className='text-[11px] font-mono text-muted-light dark:text-muted-dark text-center'>
            Don&rsquo;t have an account?{' '}
            <Link
              to='/auth/register'
              className='text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors focus:outline-none focus-visible:underline'
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Footer accent */}
        <p className='mt-8 text-center text-[10px] font-mono text-muted-light/60 dark:text-muted-dark/60 tracking-wide'>
          littlepawsdr.org · Since 2009
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
