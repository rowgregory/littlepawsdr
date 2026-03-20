import { Link } from 'react-router-dom';
import { useForgotPasswordEmailMutation } from '../../redux/services/authApi';
import { useAppDispatch, useFormSelector } from '../../redux/toolkitStore';
import { createFormActions, resetForm } from '../../redux/features/form/formSlice';
import validateForgotPasswordForm from '../../validations/validateForgotPasswordForm';
import { HelpCircle } from 'lucide-react';
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
    <div className='min-h-screen bg-bg-light dark:bg-bg-dark flex overflow-hidden'>
      {/* ── Left Side — Brand panel ── */}
      <motion.div
        className='hidden lg:flex lg:w-1/2 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark flex-col items-center justify-center p-12 relative overflow-hidden'
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

          <div className='mt-12 h-px w-full bg-border-light dark:bg-border-dark' />
          <p className='mt-4 text-[10px] font-mono text-muted-light/60 dark:text-muted-dark/60 tracking-wide'>
            littlepawsdr.org
          </p>
        </motion.div>
      </motion.div>

      {/* ── Right Side — Form ── */}
      <motion.div
        className='w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 sm:px-12'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className='w-full max-w-md'>
          {/* Eyebrow + Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mb-10'
          >
            <div className='flex items-center gap-3 mb-4'>
              <span
                className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
                aria-hidden='true'
              />
              <p className='text-[10px] font-mono tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark'>
                Little Paws Dachshund Rescue
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <h1 className='font-quicksand text-4xl font-bold text-text-light dark:text-text-dark leading-tight'>
                Forgot your{' '}
                <span className='font-light text-muted-light dark:text-muted-dark'>password</span>
              </h1>
              <button
                type='button'
                onClick={() => setShowInfo(!showInfo)}
                aria-expanded={showInfo}
                aria-controls='reset-info'
                aria-label='Why do I need to reset my password?'
                className='shrink-0 text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark p-1'
              >
                <HelpCircle className='w-4 h-4' aria-hidden='true' />
              </button>
            </div>

            {/* Info panel */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  id='reset-info'
                  role='note'
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className='mt-4 px-4 py-3 border-l-2 border-primary-light dark:border-primary-dark bg-surface-light dark:bg-surface-dark'
                >
                  <p className='text-[11px] font-mono text-muted-light dark:text-muted-dark leading-relaxed'>
                    Your password is stored encrypted — even we can't see it. Enter your email below
                    and we'll send you a link to set a new one.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className='text-sm text-muted-light dark:text-muted-dark mt-4 leading-relaxed'>
              Enter your email and we'll send you a link to reset your password.
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
            aria-label='Reset password form'
          >
            <div>
              <label
                htmlFor='forgot-email'
                className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
              >
                Email Address
              </label>
              <input
                id='forgot-email'
                type='email'
                name='email'
                value={forgotPasswordForm?.inputs?.email || ''}
                onChange={handleInput}
                placeholder='you@example.com'
                autoComplete='email'
                required
                aria-required='true'
                aria-invalid={!!forgotPasswordForm?.errors?.email}
                aria-describedby={
                  forgotPasswordForm?.errors?.email ? 'forgot-email-error' : undefined
                }
                className='w-full px-3.5 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
              />
              {forgotPasswordForm?.errors?.email && (
                <p
                  id='forgot-email-error'
                  role='alert'
                  className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                >
                  {forgotPasswordForm.errors.email}
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
                    className='block w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full'
                    aria-hidden='true'
                  />
                  Sending...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </motion.button>
          </motion.form>

          {/* Sign in link */}
          <motion.div
            className='mt-6 pt-6 border-t border-border-light dark:border-border-dark'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className='text-[11px] font-mono text-muted-light dark:text-muted-dark text-center'>
              Remember your password?{' '}
              <Link
                to='/auth/login'
                className='text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors focus:outline-none focus-visible:underline'
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
