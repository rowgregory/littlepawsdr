import { useEffect, useState } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toolkitStore, useAppDispatch, useFormSelector } from '../../redux/toolkitStore';
import { createFormActions, resetForm, setInputs } from '../../redux/features/form/formSlice';
import validateRegisterForm from '../../validations/validateRegisterForm';
import { useRegisterMutation } from '../../redux/services/authApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { hydrateUserState } from '../../redux/features/userSlice';
import { showToast } from '../../redux/features/toastSlice';
import { motion } from 'framer-motion';
import { STATES } from '../../components/data/states';
import { setOnConfettiPop } from '../../redux/features/auctionSlice';
import { hydrateAuthState } from '../../redux/features/auth/authSlice';

const securityQuestions = [
  'What was the name of your first pet?',
  'What city were you born in?',
  "What was your mother's maiden name?",
  'What was the name of your elementary school?',
  'What was your favorite childhood nickname?',
  'What is your favorite color?',
  'What was the make of your first car?',
];

const Register = () => {
  const dispatch = useAppDispatch();
  const { registerForm, passwordStrength, showPassword } = useFormSelector();
  const { handleInput, setErrors, setPasswordStrength, setShowPassword } = createFormActions(
    'registerForm',
    dispatch,
  );
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);

  const inputs = registerForm?.inputs;
  const errors = registerForm?.errors;

  const params = new URLSearchParams(location.search);
  const customAuctionLink = params.get('customAuctionLink');
  const auctionItemId = params.get('auctionItemId');
  const conversionSource = params.get('conversionSource');
  const guestEmail = params.get('email');
  const hasCustomAuction = Boolean(customAuctionLink);
  const totalSteps = hasCustomAuction ? 2 : 1;

  useEffect(() => {
    if (guestEmail) {
      toolkitStore.dispatch(
        setInputs({
          formName: 'registerForm',
          data: { email: guestEmail, confirmEmail: guestEmail },
        }),
      );
    }
  }, [guestEmail]);

  const getStrengthText = () => {
    if (passwordStrength <= 20) return 'Very Weak';
    if (passwordStrength <= 40) return 'Weak';
    if (passwordStrength <= 60) return 'Fair';
    if (passwordStrength <= 80) return 'Good';
    return 'Strong';
  };

  const handleNextStep = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStep1Valid = () => {
    const required = [
      'firstName',
      'lastName',
      'email',
      'confirmEmail',
      'securityQuestion',
      'securityAnswer',
      'password',
    ];
    return required.every(
      (field) => registerForm?.inputs?.[field] && !registerForm?.errors?.[field],
    );
  };

  useEffect(() => {
    if (registerForm?.inputs?.password) {
      setPasswordStrength(registerForm?.inputs?.password);
    } else {
      setPasswordStrength('0');
    }
  }, [registerForm, setPasswordStrength]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isValid = validateRegisterForm(registerForm?.inputs, setErrors);
    if (!isValid) return;

    try {
      const response = await register({
        firstName: registerForm?.inputs?.firstName,
        lastName: registerForm?.inputs?.lastName,
        email: registerForm?.inputs?.email?.toLowerCase(),
        confirmEmail: registerForm?.inputs?.confirmEmail?.toLowerCase(),
        securityQuestion: registerForm?.inputs?.securityQuestion,
        securityAnswer: registerForm?.inputs?.securityAnswer,
        password: registerForm?.inputs?.password,
        ...(customAuctionLink && {
          shippingAddress: {
            address: registerForm?.inputs?.address,
            city: registerForm?.inputs?.city,
            state: registerForm?.inputs?.state,
            zipPostalCode: registerForm?.inputs?.zipPostalCode,
          },
        }),
        conversionSource,
      }).unwrap();

      toolkitStore.dispatch(setOnConfettiPop());
      dispatch(hydrateUserState({ user: response?.user }));
      dispatch(hydrateAuthState({ isAuthenticated: true }));
      dispatch(showToast({ message: 'Successful registration!', type: 'success' }));

      if (response?.user?.addressRef && customAuctionLink) {
        navigate(`/auctions/${customAuctionLink}`);
      } else if (response?.user?.addressRef && customAuctionLink && auctionItemId) {
        navigate(`/auctions/${customAuctionLink}/item/${auctionItemId}`);
      } else {
        const params = new URLSearchParams({ initialLogin: 'true' });

        if (customAuctionLink) params.append('customAuctionLink', customAuctionLink);
        if (auctionItemId) params.append('auctionItemId', auctionItemId);
        console.log('NAVIGATING TO SUPPORTER PROFILE', params.toString());
        navigate(`/supporter/profile?${params.toString()}`);
      }
    } catch (err: any) {
      dispatch(showToast({ message: err?.data?.message, type: 'error' }));
      dispatch(resetForm('registerForm'));
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
          {/* Eyebrow + Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mb-8'
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
              Create an{' '}
              <span className='font-light text-muted-light dark:text-muted-dark'>account</span>
            </h1>
            <p className='text-sm text-muted-light dark:text-muted-dark mt-3 leading-relaxed'>
              Join the Little Paws community and support our mission.
            </p>
          </motion.div>

          {/* ── Progress bar (multi-step only) ── */}
          {hasCustomAuction && (
            <motion.div
              className='mb-8'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <div className='flex items-center justify-between mb-2'>
                <span className='text-[10px] font-mono tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark'>
                  Step {currentStep} of {totalSteps}
                </span>
                <span className='text-[10px] font-mono text-muted-light dark:text-muted-dark'>
                  {currentStep === 1 ? 'Account Details' : 'Shipping Address'}
                </span>
              </div>
              <div
                className='w-full h-px bg-border-light dark:bg-border-dark relative'
                role='progressbar'
                aria-valuenow={currentStep}
                aria-valuemin={1}
                aria-valuemax={totalSteps}
                aria-label={`Step ${currentStep} of ${totalSteps}`}
              >
                <motion.div
                  className='absolute top-0 left-0 h-px bg-primary-light dark:bg-primary-dark'
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className='space-y-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            noValidate
            aria-label='Create account form'
          >
            {/* ── Step 1 ── */}
            {currentStep === 1 && (
              <motion.div
                className='space-y-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* First + Last name row */}
                <div className='grid grid-cols-1 min-[420px]:grid-cols-2 gap-3'>
                  <div>
                    <label
                      htmlFor='reg-firstName'
                      className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
                    >
                      First Name
                    </label>
                    <input
                      id='reg-firstName'
                      type='text'
                      name='firstName'
                      value={inputs?.firstName || ''}
                      onChange={handleInput}
                      placeholder='Jane'
                      autoComplete='given-name'
                      required
                      aria-required='true'
                      aria-invalid={!!errors?.firstName}
                      aria-describedby={errors?.firstName ? 'firstName-error' : undefined}
                      className='w-full px-3.5 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
                    />
                    {errors?.firstName && (
                      <p
                        id='firstName-error'
                        role='alert'
                        className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                      >
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor='reg-lastName'
                      className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
                    >
                      Last Name
                    </label>
                    <input
                      id='reg-lastName'
                      type='text'
                      name='lastName'
                      value={inputs?.lastName || ''}
                      onChange={handleInput}
                      placeholder='Smith'
                      autoComplete='family-name'
                      required
                      aria-required='true'
                      aria-invalid={!!errors?.lastName}
                      aria-describedby={errors?.lastName ? 'lastName-error' : undefined}
                      className='w-full px-3.5 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
                    />
                    {errors?.lastName && (
                      <p
                        id='lastName-error'
                        role='alert'
                        className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                      >
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor='reg-email'
                    className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
                  >
                    Email Address
                  </label>
                  <input
                    id='reg-email'
                    type='email'
                    name='email'
                    value={inputs?.email || ''}
                    onChange={handleInput}
                    placeholder='jane@example.com'
                    autoComplete='email'
                    required
                    aria-required='true'
                    aria-invalid={!!errors?.email}
                    aria-describedby={errors?.email ? 'reg-email-error' : undefined}
                    className='w-full px-3.5 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
                  />
                  {errors?.email && (
                    <p
                      id='reg-email-error'
                      role='alert'
                      className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Confirm Email */}
                <div>
                  <label
                    htmlFor='reg-confirmEmail'
                    className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
                  >
                    Confirm Email
                  </label>
                  <input
                    id='reg-confirmEmail'
                    type='email'
                    name='confirmEmail'
                    value={inputs?.confirmEmail || ''}
                    onChange={handleInput}
                    placeholder='Confirm your email'
                    autoComplete='email'
                    required
                    aria-required='true'
                    aria-invalid={!!errors?.confirmEmail}
                    aria-describedby={errors?.confirmEmail ? 'confirmEmail-error' : undefined}
                    className='w-full px-3.5 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
                  />
                  {errors?.confirmEmail && (
                    <p
                      id='confirmEmail-error'
                      role='alert'
                      className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                    >
                      {errors.confirmEmail}
                    </p>
                  )}
                </div>

                {/* Security Question */}
                <div>
                  <label
                    htmlFor='reg-securityQuestion'
                    className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
                  >
                    Security Question
                  </label>
                  <select
                    id='reg-securityQuestion'
                    name='securityQuestion'
                    value={inputs?.securityQuestion || ''}
                    onChange={handleInput}
                    required
                    aria-required='true'
                    aria-invalid={!!errors?.securityQuestion}
                    aria-describedby={
                      errors?.securityQuestion ? 'securityQuestion-error' : undefined
                    }
                    className='w-full px-3.5 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
                  >
                    <option value=''>Select a security question</option>
                    {securityQuestions?.map((question: string, i: number) => (
                      <option key={i} value={question}>
                        {question}
                      </option>
                    ))}
                  </select>
                  {errors?.securityQuestion && (
                    <p
                      id='securityQuestion-error'
                      role='alert'
                      className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                    >
                      {errors.securityQuestion}
                    </p>
                  )}
                </div>

                {/* Security Answer */}
                <div>
                  <label
                    htmlFor='reg-securityAnswer'
                    className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
                  >
                    Security Answer
                  </label>
                  <input
                    id='reg-securityAnswer'
                    type='text'
                    name='securityAnswer'
                    value={inputs?.securityAnswer || ''}
                    onChange={handleInput}
                    placeholder='Your answer'
                    required
                    aria-required='true'
                    aria-invalid={!!errors?.securityAnswer}
                    aria-describedby={errors?.securityAnswer ? 'securityAnswer-error' : undefined}
                    className='w-full px-3.5 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
                  />
                  {errors?.securityAnswer && (
                    <p
                      id='securityAnswer-error'
                      role='alert'
                      className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                    >
                      {errors.securityAnswer}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor='reg-password'
                    className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
                  >
                    Password
                  </label>
                  <div className='relative'>
                    <input
                      id='reg-password'
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      value={inputs?.password || ''}
                      onChange={handleInput}
                      placeholder='Create a strong password'
                      autoComplete='new-password'
                      required
                      aria-required='true'
                      aria-invalid={!!errors?.password}
                      aria-describedby='password-strength-desc'
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
                  {inputs?.password && (
                    <div className='mt-2' id='password-strength-desc'>
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
                    </div>
                  )}

                  {errors?.password && (
                    <p
                      role='alert'
                      className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                    >
                      {errors.password}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Step 2 — Shipping Address ── */}
            {currentStep === 2 && hasCustomAuction && (
              <motion.div
                className='space-y-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className='mb-6'>
                  <h2 className='font-quicksand text-2xl font-bold text-text-light dark:text-text-dark'>
                    Shipping{' '}
                    <span className='font-light text-muted-light dark:text-muted-dark'>
                      address
                    </span>
                  </h2>
                  <p className='text-sm text-muted-light dark:text-muted-dark mt-1'>
                    Where should we send your auction wins?
                  </p>
                </div>

                {/* Street */}
                <div>
                  <label
                    htmlFor='reg-address'
                    className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
                  >
                    Street Address
                  </label>
                  <input
                    id='reg-address'
                    type='text'
                    name='address'
                    value={registerForm?.inputs?.address || ''}
                    onChange={handleInput}
                    placeholder='123 Main Street'
                    autoComplete='street-address'
                    required
                    aria-required='true'
                    aria-invalid={!!registerForm?.errors?.address}
                    aria-describedby={registerForm?.errors?.address ? 'address-error' : undefined}
                    className='w-full px-3.5 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
                  />
                  {registerForm?.errors?.address && (
                    <p
                      id='address-error'
                      role='alert'
                      className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                    >
                      {registerForm.errors.address}
                    </p>
                  )}
                </div>

                {/* City + State row */}
                <div className='grid grid-cols-1 min-[420px]:grid-cols-2 gap-3'>
                  <div>
                    <label
                      htmlFor='reg-city'
                      className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
                    >
                      City
                    </label>
                    <input
                      id='reg-city'
                      type='text'
                      name='city'
                      value={registerForm?.inputs?.city || ''}
                      onChange={handleInput}
                      placeholder='Boston'
                      autoComplete='address-level2'
                      required
                      aria-required='true'
                      aria-invalid={!!registerForm?.errors?.city}
                      aria-describedby={registerForm?.errors?.city ? 'city-error' : undefined}
                      className='w-full px-3.5 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
                    />
                    {registerForm?.errors?.city && (
                      <p
                        id='city-error'
                        role='alert'
                        className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                      >
                        {registerForm.errors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor='reg-state'
                      className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
                    >
                      State
                    </label>
                    <select
                      id='reg-state'
                      name='state'
                      value={registerForm?.inputs?.state || ''}
                      onChange={handleInput}
                      required
                      aria-required='true'
                      aria-invalid={!!registerForm?.errors?.state}
                      aria-describedby={registerForm?.errors?.state ? 'state-error' : undefined}
                      className='w-full px-3.5 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
                    >
                      <option value='' disabled>
                        Select state
                      </option>
                      {STATES?.map((state: { value: string; text: string }) => (
                        <option key={state.value} value={state.value}>
                          {state.text}
                        </option>
                      ))}
                    </select>
                    {registerForm?.errors?.state && (
                      <p
                        id='state-error'
                        role='alert'
                        className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                      >
                        {registerForm.errors.state}
                      </p>
                    )}
                  </div>
                </div>

                {/* ZIP */}
                <div>
                  <label
                    htmlFor='reg-zip'
                    className='block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2'
                  >
                    ZIP / Postal Code
                  </label>
                  <input
                    id='reg-zip'
                    type='text'
                    name='zipPostalCode'
                    value={registerForm?.inputs?.zipPostalCode || ''}
                    onChange={handleInput}
                    placeholder='02101'
                    autoComplete='postal-code'
                    required
                    aria-required='true'
                    aria-invalid={!!registerForm?.errors?.zipPostalCode}
                    aria-describedby={registerForm?.errors?.zipPostalCode ? 'zip-error' : undefined}
                    className='w-full px-3.5 py-3 text-sm border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
                  />
                  {registerForm?.errors?.zipPostalCode && (
                    <p
                      id='zip-error'
                      role='alert'
                      className='text-[11px] text-red-500 dark:text-red-400 font-mono mt-1.5'
                    >
                      {registerForm.errors.zipPostalCode}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Navigation buttons ── */}
            <motion.div
              className='flex flex-col-reverse min-[420px]:flex-row gap-3 pt-4'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {hasCustomAuction && currentStep > 1 && (
                <motion.button
                  type='button'
                  onClick={handlePrevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='flex-1 py-4 font-black text-[11px] tracking-[0.2em] uppercase font-mono border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark hover:border-primary-light dark:hover:border-primary-dark hover:text-text-light dark:hover:text-text-dark transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                >
                  Back
                </motion.button>
              )}

              {hasCustomAuction && currentStep < totalSteps ? (
                <motion.button
                  type='button'
                  onClick={handleNextStep}
                  disabled={!isStep1Valid()}
                  whileHover={isStep1Valid() ? { scale: 1.02 } : {}}
                  whileTap={isStep1Valid() ? { scale: 0.98 } : {}}
                  aria-disabled={!isStep1Valid()}
                  className={`flex-1 py-4 font-black text-[11px] tracking-[0.2em] uppercase font-mono transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark flex items-center justify-center gap-2
                    ${
                      isStep1Valid()
                        ? 'bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white cursor-pointer'
                        : 'bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark border-2 border-border-light dark:border-border-dark cursor-not-allowed'
                    }`}
                >
                  Next Step
                  <ArrowRight className='w-3.5 h-3.5' aria-hidden='true' />
                </motion.button>
              ) : (
                <motion.button
                  type='submit'
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  aria-disabled={isLoading}
                  className={`flex-1 py-4 font-black text-[11px] tracking-[0.2em] uppercase font-mono transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark
                    ${
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
                      {hasCustomAuction ? 'Creating account...' : 'Joining...'}
                    </span>
                  ) : hasCustomAuction ? (
                    'Complete Registration'
                  ) : (
                    'Join Now'
                  )}
                </motion.button>
              )}
            </motion.div>

            {passwordStrength > 0 && passwordStrength < 80 && currentStep === 1 && (
              <ul className='space-y-1' aria-live='polite'>
                {[
                  {
                    test: registerForm?.inputs?.password?.length >= 10,
                    label: '10+ characters',
                  },
                  {
                    test: /[A-Z]/.test(registerForm?.inputs?.password || ''),
                    label: 'One uppercase letter',
                  },
                  {
                    test: /[a-z]/.test(registerForm?.inputs?.password || ''),
                    label: 'One lowercase letter',
                  },
                  {
                    test: /[0-9]/.test(registerForm?.inputs?.password || ''),
                    label: 'One number',
                  },
                  {
                    test: /[!@#$%^&*(),.?":{}|<>]/.test(registerForm?.inputs?.password || ''),
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

          {/* Sign in link */}
          <motion.div
            className='mt-6 pt-6 border-t border-border-light dark:border-border-dark'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className='text-[11px] font-mono text-muted-light dark:text-muted-dark text-center'>
              Already have an account?{' '}
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
          <div className='flex items-center gap-3 mb-8'>
            <span className='block w-5 h-px bg-primary-light dark:bg-primary-dark' />
            <p className='text-[10px] font-mono tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark'>
              Since 2009
            </p>
          </div>

          <h2 className='font-quicksand text-3xl font-bold text-text-light dark:text-text-dark leading-tight mb-4'>
            Join the pack.
            <br />
            <span className='font-light text-muted-light dark:text-muted-dark'>
              Make a difference.
            </span>
          </h2>

          <p className='text-sm text-muted-light dark:text-muted-dark leading-relaxed mb-12'>
            Your account lets you track donations, bid on auction items, and stay connected with
            every dog you've helped along the way.
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
    </div>
  );
};

export default Register;
