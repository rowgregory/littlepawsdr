import { useEffect, useState } from 'react';
import { ArrowRight, Eye, EyeOff, Heart, PawPrint } from 'lucide-react';
import { useAppDispatch, useFormSelector } from '../../redux/toolkitStore';
import { createFormActions, resetForm } from '../../redux/features/form/formSlice';
import validateRegisterForm from '../../validations/validateRegisterForm';
import { useRegisterMutation } from '../../redux/services/authApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { hydrateUserState } from '../../redux/features/userSlice';
import { showToast } from '../../redux/features/toastSlice';
import { motion } from 'framer-motion';
import { STATES } from '../../components/data/states';

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
    dispatch
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
  const hasCustomAuction = Boolean(customAuctionLink);
  const totalSteps = hasCustomAuction ? 2 : 1;

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
      (field) => registerForm?.inputs?.[field] && !registerForm?.errors?.[field]
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

      dispatch(hydrateUserState(response?.user));
      dispatch(showToast({ message: 'Successful registration!', type: 'success' }));

      if (response?.user?.addressRef && customAuctionLink) {
        navigate(`/auctions/${customAuctionLink}`);
      } else if (response?.user?.addressRef && customAuctionLink && auctionItemId) {
        navigate(`/auctions/${customAuctionLink}/item/${auctionItemId}`);
      } else {
        const params = new URLSearchParams({ initialLogin: 'true' });

        if (customAuctionLink) params.append('customAuctionLink', customAuctionLink);
        if (auctionItemId) params.append('auctionItemId', auctionItemId);

        navigate(`/supporter/profile?${params.toString()}`);
      }
    } catch (err: any) {
      dispatch(showToast({ message: err?.data?.message, type: 'error' }));
      dispatch(resetForm('registerForm'));
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
              <h2 className='text-3xl font-bold text-gray-900'>Sign Up</h2>
            </div>

            <p className='text-gray-600 mt-3'>Create your account to get started.</p>
          </motion.div>

          {/* Progress Bar (only show if multi-step) */}
          {hasCustomAuction && (
            <div className='mb-6 sm:mb-8'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-xs sm:text-sm font-medium text-gray-600'>
                  Step {currentStep} of {totalSteps}
                </span>
                <span className='text-xs sm:text-sm text-gray-500'>
                  {currentStep === 1 ? 'Account Details' : 'Shipping Address'}
                </span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-1.5 sm:h-2'>
                <div
                  className='bg-gradient-to-r from-teal-400 to-cyan-400 h-1.5 sm:h-2 rounded-full transition-all duration-500'
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className='space-y-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Form - Step 1 */}
            {currentStep === 1 && (
              <motion.div
                className='space-y-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* First Name */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>First Name</label>
                  <motion.input
                    type='text'
                    name='firstName'
                    value={inputs?.firstName || ''}
                    onChange={handleInput}
                    placeholder='Sqysh'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all'
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors?.firstName && (
                    <p className='text-red-500 text-sm mt-1'>{errors?.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Last Name</label>
                  <motion.input
                    type='text'
                    name='lastName'
                    value={inputs?.lastName || ''}
                    onChange={handleInput}
                    placeholder='io'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all'
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors?.lastName && (
                    <p className='text-red-500 text-sm mt-1'>{errors?.lastName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email Address
                  </label>
                  <motion.input
                    type='email'
                    name='email'
                    value={inputs?.email || ''}
                    onChange={handleInput}
                    placeholder='sqysh@sqysh.io'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all'
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors?.email && <p className='text-red-500 text-sm mt-1'>{errors?.email}</p>}
                </div>

                {/* Confirm Email */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Confirm Email
                  </label>
                  <motion.input
                    type='email'
                    name='confirmEmail'
                    value={inputs?.confirmEmail || ''}
                    onChange={handleInput}
                    placeholder='Confirm your email'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all'
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors?.confirmEmail && (
                    <p className='text-red-500 text-sm mt-1'>{errors?.confirmEmail}</p>
                  )}
                </div>

                {/* Security Question */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Security Question
                  </label>
                  <motion.select
                    name='securityQuestion'
                    value={inputs?.securityQuestion || ''}
                    onChange={handleInput}
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all bg-white'
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value=''>Select a security question</option>
                    {securityQuestions?.map((question, i) => (
                      <option key={i} value={question}>
                        {question}
                      </option>
                    ))}
                  </motion.select>
                  {errors?.securityQuestion && (
                    <p className='text-red-500 text-sm mt-1'>{errors?.securityQuestion}</p>
                  )}
                </div>

                {/* Security Answer */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Security Answer
                  </label>
                  <motion.input
                    type='text'
                    name='securityAnswer'
                    value={inputs?.securityAnswer || ''}
                    onChange={handleInput}
                    placeholder='Your answer'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all'
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors?.securityAnswer && (
                    <p className='text-red-500 text-sm mt-1'>{errors?.securityAnswer}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                  <div className='relative'>
                    <motion.input
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      value={inputs?.password || ''}
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
                  {inputs?.password && (
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
                      <div className='w-full bg-gray-200 rounded-full h-1.5 sm:h-2'>
                        <div
                          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {errors?.password && (
                    <p className='text-red-500 text-sm mt-1'>{errors?.password}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Form - Step 2 */}
            {currentStep === 2 && hasCustomAuction && (
              <motion.div
                className='space-y-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Heading */}
                <motion.div
                  className='text-center mb-6'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>Shipping Address</h3>
                  <p className='text-gray-600'>Where should we send your auction wins?</p>
                </motion.div>

                {/* Street Address */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Street Address *
                  </label>
                  <motion.input
                    type='text'
                    name='address'
                    value={registerForm?.inputs?.address || ''}
                    onChange={handleInput}
                    placeholder='123 Main Street'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all'
                    whileFocus={{ scale: 1.02 }}
                  />
                  {registerForm?.errors?.address && (
                    <p className='text-red-500 text-sm mt-1'>{registerForm.errors.address}</p>
                  )}
                </motion.div>

                {/* City */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className='block text-sm font-medium text-gray-700 mb-2'>City *</label>
                  <motion.input
                    type='text'
                    name='city'
                    value={registerForm?.inputs?.city || ''}
                    onChange={handleInput}
                    placeholder='San Francisco'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all'
                    whileFocus={{ scale: 1.02 }}
                  />
                  {registerForm?.errors?.city && (
                    <p className='text-red-500 text-sm mt-1'>{registerForm.errors.city}</p>
                  )}
                </motion.div>

                {/* State */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label className='block text-sm font-medium text-gray-700 mb-2'>State *</label>
                  <motion.select
                    name='state'
                    value={registerForm?.inputs?.state || ''}
                    onChange={handleInput}
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all bg-white'
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value=''>Select a State</option>
                    {STATES?.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.text}
                      </option>
                    ))}
                  </motion.select>
                  {registerForm?.errors?.state && (
                    <p className='text-red-500 text-sm mt-1'>{registerForm.errors.state}</p>
                  )}
                </motion.div>

                {/* ZIP Code */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    ZIP/Postal Code *
                  </label>
                  <motion.input
                    type='text'
                    name='zipPostalCode'
                    value={registerForm?.inputs?.zipPostalCode || ''}
                    onChange={handleInput}
                    placeholder='94105'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all'
                    whileFocus={{ scale: 1.02 }}
                  />
                  {registerForm?.errors?.zipPostalCode && (
                    <p className='text-red-500 text-sm mt-1'>{registerForm.errors.zipPostalCode}</p>
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <motion.div
              className='flex flex-col-reverse sm:flex-row gap-3 pt-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {hasCustomAuction && currentStep > 1 && (
                <motion.button
                  type='button'
                  onClick={handlePrevStep}
                  className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-200'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
              )}

              {hasCustomAuction && currentStep < totalSteps ? (
                <motion.button
                  type='button'
                  onClick={handleNextStep}
                  disabled={!isStep1Valid()}
                  className='flex-1 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                  whileHover={!isStep1Valid() ? {} : { scale: 1.02 }}
                  whileTap={!isStep1Valid() ? {} : { scale: 0.98 }}
                >
                  <span>Next Step</span>
                  <ArrowRight className='w-4 h-4' />
                </motion.button>
              ) : (
                <motion.button
                  type='submit'
                  disabled={isLoading}
                  className='flex-1 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                  whileHover={isLoading ? {} : { scale: 1.02 }}
                  whileTap={isLoading ? {} : { scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className='w-4 h-4 border-2 border-white border-t-transparent rounded-full'
                      />
                      <span>{hasCustomAuction ? 'Creating Account...' : 'Joining...'}</span>
                    </>
                  ) : (
                    <span>{hasCustomAuction ? 'Complete Registration' : 'Join Now'}</span>
                  )}
                </motion.button>
              )}
            </motion.div>
          </motion.form>

          {/* Sign In Link */}
          <motion.div
            className='mt-6 pt-6 border-t border-gray-200 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className='text-gray-600 text-sm'>
              Have have an account?{' '}
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

export default Register;
