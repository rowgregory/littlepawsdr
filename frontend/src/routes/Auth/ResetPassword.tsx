import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useFormSelector } from '../../redux/toolkitStore';
import {
  useResetPasswordMutation,
  useValidateForgotPasswordTokenQuery,
} from '../../redux/services/authApi';
import { createFormActions } from '../../redux/features/form/formSlice';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { showToast } from '../../redux/features/toastSlice';
import { AnimatePresence, motion } from 'framer-motion';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [countdown, setCountdown] = useState(7);
  const { resetPasswordForm, passwordStrength, showPassword } = useFormSelector();
  const { handleInput, setShowPassword, setPasswordStrength } = createFormActions(
    'resetPasswordForm',
    dispatch,
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

        setResetSuccess(true);

        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              navigate('/auth/login');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } catch {
        dispatch(showToast({ message: 'Failed to reset password', type: 'error' }));
      }
    }
  };

  if (loadingTokenValidation) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark'>
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className='block w-6 h-6 border-2 border-border-light dark:border-border-dark border-t-primary-light dark:border-t-primary-dark rounded-full'
          aria-label='Validating reset link'
          role='status'
        />
      </div>
    );
  }

  if (error || !tokenValidationData?.tokenIsValid) {
    return (
      <div className='min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center px-6 py-12'>
        <motion.div
          className='max-w-md w-full'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className='flex items-center gap-3 mb-6'>
            <span className='block w-8 h-px bg-red-500 dark:bg-red-400' aria-hidden='true' />
            <p className='text-[10px] font-mono tracking-[0.2em] uppercase text-red-500 dark:text-red-400'>
              Link Expired
            </p>
          </div>

          <h1 className='font-quicksand text-3xl font-bold text-text-light dark:text-text-dark mb-3'>
            This link has{' '}
            <span className='font-light text-muted-light dark:text-muted-dark'>expired</span>
          </h1>
          <p className='text-sm text-muted-light dark:text-muted-dark leading-relaxed mb-8'>
            {error?.data?.message ||
              'This reset link has expired or already been used. Please request a new one.'}
          </p>

          <Link
            to='/auth/forgot-password'
            className='inline-block w-full py-4 text-center font-black text-[11px] tracking-[0.2em] uppercase font-mono bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
          >
            Request New Link
          </Link>

          <div className='mt-6 pt-6 border-t border-border-light dark:border-border-dark'>
            <p className='text-[11px] font-mono text-muted-light dark:text-muted-dark text-center'>
              Remember your password?{' '}
              <Link
                to='/auth/login'
                className='text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors focus:outline-none focus-visible:underline'
              >
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

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

            <AnimatePresence mode='wait'>
              {resetSuccess ? (
                <motion.div
                  key='success-heading'
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className='font-quicksand text-4xl font-bold text-text-light dark:text-text-dark leading-tight'>
                    All{' '}
                    <span className='font-light text-muted-light dark:text-muted-dark'>done</span>
                  </h1>
                  <p className='text-sm text-muted-light dark:text-muted-dark mt-3 leading-relaxed'>
                    Your password has been updated.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key='form-heading'
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className='font-quicksand text-4xl font-bold text-text-light dark:text-text-dark leading-tight'>
                    New{' '}
                    <span className='font-light text-muted-light dark:text-muted-dark'>
                      password
                    </span>
                  </h1>
                  <p className='text-sm text-muted-light dark:text-muted-dark mt-3 leading-relaxed'>
                    Create a new password for your account.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Form */}
          <AnimatePresence mode='wait'>
            {resetSuccess ? (
              <motion.div
                key='success'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className='space-y-6'
                role='status'
                aria-live='polite'
              >
                <div className='h-px bg-border-light dark:bg-border-dark' aria-hidden='true' />

                <div>
                  <p className='text-[10px] font-mono tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark mb-3'>
                    Password updated
                  </p>
                  <p className='text-sm text-muted-light dark:text-muted-dark leading-relaxed'>
                    Your password has been reset successfully. You'll be redirected to the sign in
                    page in a moment.
                  </p>
                </div>

                {/* Countdown */}
                <div className='flex items-center gap-4'>
                  <span className='font-quicksand font-black text-4xl text-primary-light dark:text-primary-dark tabular-nums'>
                    {countdown}
                  </span>
                  <span className='text-[11px] font-mono text-muted-light dark:text-muted-dark leading-snug'>
                    Redirecting to
                    <br />
                    sign in...
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  className='w-full h-px bg-border-light dark:bg-border-dark relative'
                  aria-hidden='true'
                >
                  <motion.div
                    className='absolute top-0 left-0 h-px bg-primary-light dark:bg-primary-dark'
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 7, ease: 'linear' }}
                  />
                </div>

                <Link
                  to='/auth/login'
                  className='inline-block text-[10px] font-mono tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors focus:outline-none focus-visible:underline'
                >
                  Sign in now →
                </Link>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className='space-y-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                noValidate
                aria-label='Reset password form'
              >
                {/* New password */}
                <div>
                  <label
                    htmlFor='reset-password'
                    className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
                  >
                    New Password
                  </label>
                  <div className='relative'>
                    <input
                      id='reset-password'
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      value={resetPasswordForm?.inputs?.password || ''}
                      onChange={handleInput}
                      placeholder='Create a strong password'
                      autoComplete='new-password'
                      required
                      aria-required='true'
                      aria-invalid={!!resetPasswordForm?.errors?.password}
                      aria-describedby='reset-strength-desc'
                      className='w-full pl-3.5 pr-11 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
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

                  {/* Strength meter */}
                  {resetPasswordForm?.inputs?.password && (
                    <motion.div
                      id='reset-strength-desc'
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className='mt-2'
                    >
                      <div className='flex items-center justify-between mb-1.5'>
                        <span className='text-[10px] font-mono text-muted-light dark:text-muted-dark'>
                          Strength
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            passwordStrength <= 40
                              ? 'text-red-500 dark:text-red-400'
                              : passwordStrength <= 60
                                ? 'text-yellow-500 dark:text-yellow-400'
                                : passwordStrength <= 80
                                  ? 'text-primary-light dark:text-primary-dark'
                                  : 'text-green-500 dark:text-green-400'
                          }`}
                        >
                          {getStrengthText()}
                        </span>
                      </div>
                      <div
                        className='w-full h-px bg-border-light dark:bg-border-dark relative'
                        aria-hidden='true'
                      >
                        <motion.div
                          className={`absolute top-0 left-0 h-px transition-colors duration-300 ${
                            passwordStrength <= 40
                              ? 'bg-red-500'
                              : passwordStrength <= 60
                                ? 'bg-yellow-500'
                                : passwordStrength <= 80
                                  ? 'bg-primary-light dark:bg-primary-dark'
                                  : 'bg-green-500'
                          }`}
                          animate={{ width: `${passwordStrength}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {resetPasswordForm?.errors?.password && (
                    <p
                      role='alert'
                      className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                    >
                      {resetPasswordForm.errors.password}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type='submit'
                  disabled={loadingReset || passwordStrength < 80}
                  whileHover={!loadingReset && passwordStrength >= 80 ? { scale: 1.02 } : {}}
                  whileTap={!loadingReset && passwordStrength >= 80 ? { scale: 0.98 } : {}}
                  aria-disabled={loadingReset || passwordStrength < 80}
                  className={`
                w-full py-4 font-black text-[11px] tracking-[0.2em] uppercase font-mono transition-colors duration-200
                focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark
                ${
                  loadingReset || passwordStrength < 80
                    ? 'bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark border-2 border-border-light dark:border-border-dark cursor-not-allowed'
                    : 'bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white cursor-pointer'
                }
              `}
                >
                  {loadingReset ? (
                    <span className='flex items-center justify-center gap-2' aria-live='polite'>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className='block w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full'
                        aria-hidden='true'
                      />
                      Resetting password...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </motion.button>

                {passwordStrength > 0 && passwordStrength < 80 && (
                  <ul className='space-y-1' aria-live='polite'>
                    {[
                      {
                        test: resetPasswordForm?.inputs?.password?.length >= 10,
                        label: '10+ characters',
                      },
                      {
                        test: /[A-Z]/.test(resetPasswordForm?.inputs?.password || ''),
                        label: 'One uppercase letter',
                      },
                      {
                        test: /[a-z]/.test(resetPasswordForm?.inputs?.password || ''),
                        label: 'One lowercase letter',
                      },
                      {
                        test: /[0-9]/.test(resetPasswordForm?.inputs?.password || ''),
                        label: 'One number',
                      },
                      {
                        test: /[!@#$%^&*(),.?":{}|<>]/.test(
                          resetPasswordForm?.inputs?.password || '',
                        ),
                        label: 'One special character',
                      },
                    ]
                      .filter((req) => !req.test)
                      .map((req) => (
                        <li
                          key={req.label}
                          className='text-[10px] font-mono text-muted-light dark:text-muted-dark flex items-center gap-2'
                        >
                          <span
                            className='w-1 h-1 shrink-0 bg-muted-light dark:bg-muted-dark'
                            aria-hidden='true'
                          />
                          {req.label}
                        </li>
                      ))}
                  </ul>
                )}
              </motion.form>
            )}
          </AnimatePresence>

          {/* Back to login */}
          <motion.div
            className='mt-6 pt-6 border-t border-border-light dark:border-border-dark'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className='text-[11px] font-mono text-muted-light dark:text-muted-dark text-center'>
              <Link
                to='/auth/login'
                className='inline-flex items-center justify-center gap-1.5 text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors focus:outline-none focus-visible:underline'
              >
                <ArrowLeft className='w-3 h-3' aria-hidden='true' />
                Back to login
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
