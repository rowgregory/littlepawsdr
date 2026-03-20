import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/services/authApi';
import { useAppDispatch, useFormSelector } from '../../redux/toolkitStore';
import { createFormActions } from '../../redux/features/form/formSlice';
import { Eye, EyeOff } from 'lucide-react';
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
      if (err?.data?.isGuest) {
        navigate(`/auth/register?email=${encodeURIComponent(inputs.email)}`);
        dispatch(
          showToast({
            message: 'Please set up your password to access your account.',
            type: 'info',
          }),
        );
      } else {
        dispatch(showToast({ message: err?.data?.message, type: 'error' }));
      }
    }
  };

  return (
    <div className='min-h-screen bg-bg-light dark:bg-bg-dark flex overflow-hidden'>
      {/* ── Left Side — Form ── */}
      <motion.div
        className='w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 sm:px-12'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className='w-full max-w-md'>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mb-10'
          >
            <Link to='/' className='flex items-center gap-3 mb-4'>
              <span
                className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
                aria-hidden='true'
              />
              <p className='text-[10px] font-mono tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark'>
                Little Paws Dachshund Rescue
              </p>
            </Link>
            <h1 className='font-quicksand text-4xl font-bold text-text-light dark:text-text-dark leading-tight'>
              Welcome <span className='font-light text-muted-light dark:text-muted-dark'>back</span>
            </h1>
            <p className='text-sm text-muted-light dark:text-muted-dark mt-3 leading-relaxed'>
              Sign in to your account to continue supporting the rescue.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className='space-y-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            noValidate
            aria-label='Sign in form'
          >
            {/* Email */}
            <div>
              <label
                htmlFor='login-email'
                className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
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
                className='w-full px-3.5 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
              />
              {errors?.email && (
                <p
                  id='email-error'
                  role='alert'
                  className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className='flex items-center justify-between mb-2'>
                <label
                  htmlFor='login-password'
                  className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark'
                >
                  Password
                </label>
                <Link
                  to='/auth/forgot-password'
                  className='text-[10px] font-mono tracking-[0.15em] uppercase text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors focus:outline-none focus-visible:underline'
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
                  className='w-full pl-3.5 pr-11 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark p-1'
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
                  className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type='submit'
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              aria-disabled={isLoading}
              className={`
                w-full py-4 font-black text-[11px] tracking-[0.2em] uppercase font-mono transition-colors duration-200
                focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark
                ${
                  isLoading
                    ? 'bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark border-2 border-border-light dark:border-border-dark cursor-not-allowed'
                    : 'bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white cursor-pointer'
                }
              `}
            >
              {isLoading ? (
                <span className='flex items-center justify-center gap-2' aria-live='polite'>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className='block w-3.5 h-3.5 border-2 border-current/30 border-t-current'
                    aria-hidden='true'
                  />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </motion.form>

          {/* Register link */}
          <motion.div
            className='mt-6 pt-6 border-t border-border-light dark:border-border-dark'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className='text-[11px] font-mono text-muted-light dark:text-muted-dark text-center'>
              Don't have an account?{' '}
              <Link
                to='/auth/register'
                className='text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors focus:outline-none focus-visible:underline'
              >
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right Side — Brand panel ── */}
      <motion.div
        className='hidden lg:flex lg:w-1/2 bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark flex-col items-center justify-center p-12 relative overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        aria-hidden='true'
      >
        {/* Decorative grid */}
        <div
          className='absolute inset-0 opacity-[0.03] dark:opacity-[0.06]'
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Accent line top */}
        <div className='absolute top-0 left-12 right-12 h-px bg-primary-light dark:bg-primary-dark opacity-30' />

        <motion.div
          className='relative z-10 flex flex-col items-start w-full max-w-sm'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Eyebrow */}
          <div className='flex items-center gap-3 mb-8'>
            <span className='block w-5 h-px bg-primary-light dark:bg-primary-dark' />
            <p className='text-[10px] font-mono tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark'>
              Since 2009
            </p>
          </div>

          <h2 className='font-quicksand text-3xl font-bold text-text-light dark:text-text-dark leading-tight mb-4'>
            Every long dog
            <br />
            <span className='font-light text-muted-light dark:text-muted-dark'>
              deserves a home.
            </span>
          </h2>

          <p className='text-sm text-muted-light dark:text-muted-dark leading-relaxed mb-12'>
            Volunteer-run and 100% dedicated to rescuing dachshunds and dachshund mixes across the
            East Coast.
          </p>

          {/* Stats */}
          <dl className='space-y-6 w-full'>
            {[
              { stat: '2,400+', label: 'Dogs rescued' },
              { stat: '100%', label: 'Volunteer operated' },
              { stat: '50+', label: 'Active foster homes' },
            ].map(({ stat, label }, i) => (
              <motion.div
                key={stat}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className='flex items-baseline gap-4'
              >
                <dt className='font-quicksand font-black text-2xl text-primary-light dark:text-primary-dark tabular-nums shrink-0 w-20'>
                  {stat}
                </dt>
                <dd className='text-[11px] font-mono text-muted-light dark:text-muted-dark'>
                  {label}
                </dd>
              </motion.div>
            ))}
          </dl>

          {/* Bottom accent */}
          <div className='mt-12 h-px w-full bg-border-light dark:bg-border-dark' />
          <p className='mt-4 text-[10px] font-mono text-muted-light/60 dark:text-muted-dark/60 tracking-wide'>
            littlepawsdr.org
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
