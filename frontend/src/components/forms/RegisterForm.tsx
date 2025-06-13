import { Eye, EyeOff, Heart, HelpCircle, Lock, Shield, User, MapPin, Home, ArrowRight, ArrowLeft } from 'lucide-react';
import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthInput } from '../ui/AuthInput';
import { AuthSelect } from '../ui/AuthSelect';

const securityQuestions = [
  'What was the name of your first pet?',
  'What city were you born in?',
  "What was your mother's maiden name?",
  'What was the name of your elementary school?',
  'What was your favorite childhood nickname?',
  'What is your favorite color?',
  'What was the make of your first car?',
];

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

interface RegisterFormProps {
  handleSubmit: any;
  registerForm: any;
  handleInput: any;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  passwordStrength: number;
  isLoading: boolean;
}

const RegisterForm: FC<RegisterFormProps> = ({
  handleSubmit,
  registerForm,
  handleInput,
  showPassword,
  setShowPassword,
  passwordStrength,
  isLoading,
}) => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const customCampaignLink = searchParams.get('customCampaignLink');
  const hasCustomCampaign = Boolean(customCampaignLink);
  const totalSteps = hasCustomCampaign ? 2 : 1;

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
    const required = ['firstName', 'lastName', 'email', 'confirmEmail', 'securityQuestion', 'securityAnswer', 'password'];
    return required.every((field) => registerForm?.inputs?.[field] && !registerForm?.errors?.[field]);
  };

  return (
    <div className='space-y-6'>
      {/* Progress Bar (only show if multi-step) */}
      {hasCustomCampaign && (
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm font-medium text-gray-600'>
              Step {currentStep} of {totalSteps}
            </span>
            <span className='text-sm text-gray-500'>{currentStep === 1 ? 'Account Details' : 'Shipping Address'}</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div
              className='bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full transition-all duration-500'
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Step 1: Account Information */}
        {currentStep === 1 && (
          <div className='space-y-4'>
            <div className='text-center mb-6'>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Create Your Account</h3>
              <p className='text-gray-600'>Join the Little Paws family today</p>
            </div>

            <AuthInput
              label='First Name *'
              icon={<User className='w-4 h-4 text-amber-500' />}
              name='firstName'
              value={registerForm?.inputs?.firstName || ''}
              onChange={handleInput}
              error={registerForm?.errors?.firstName}
              placeholder='Enter first name'
            />
            <AuthInput
              label='Last Name *'
              icon={<User className='w-4 h-4 text-amber-500' />}
              name='lastName'
              value={registerForm?.inputs?.lastName || ''}
              onChange={handleInput}
              error={registerForm?.errors?.lastName}
              placeholder='Enter last name'
            />
            <AuthInput
              label='Email address *'
              icon={<User className='w-4 h-4 text-amber-500' />}
              name='email'
              value={registerForm?.inputs?.email || ''}
              onChange={handleInput}
              error={registerForm?.errors?.email}
              placeholder='Enter email'
            />
            <AuthInput
              label='Confirm email address *'
              icon={<User className='w-4 h-4 text-amber-500' />}
              name='confirmEmail'
              value={registerForm?.inputs?.confirmEmail || ''}
              onChange={handleInput}
              error={registerForm?.errors?.confirmEmail}
              placeholder='Enter email again'
            />
            <AuthSelect
              label='Security Question *'
              icon={<HelpCircle className='w-4 h-4 text-amber-500' />}
              name='securityQuestion'
              value={registerForm?.inputs?.securityQuestion || ''}
              onChange={handleInput}
              error={registerForm?.errors?.securityQuestion}
              options={securityQuestions}
            />
            <AuthInput
              label='Security Answer *'
              icon={<Shield className='w-4 h-4 text-amber-500' />}
              name='securityAnswer'
              value={registerForm?.inputs?.securityAnswer || ''}
              onChange={handleInput}
              error={registerForm?.errors?.securityAnswer}
              placeholder='Enter your answer'
            />
            <div>
              <label className='flex items-center gap-2 text-sm font-medium text-gray-700 mb-2'>
                <Lock className='w-4 h-4 text-amber-500' />
                Password *
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={registerForm?.inputs?.password || ''}
                  onChange={handleInput}
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors ${
                    registerForm?.errors?.password ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-amber-400'
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
              {registerForm?.inputs?.password && (
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
              {registerForm?.errors?.password && <p className='text-red-500 text-xs mt-1'>{registerForm?.errors?.password}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Address Information (only if customCampaignLink exists) */}
        {currentStep === 2 && hasCustomCampaign && (
          <div className='space-y-4'>
            <div className='text-center mb-6'>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Shipping Address</h3>
              <p className='text-gray-600'>Where should we send your auction wins?</p>
            </div>
            <AuthInput
              label='Street Address *'
              icon={<Home className='w-4 h-4 text-amber-500' />}
              name='address'
              value={registerForm?.inputs?.address || ''}
              onChange={handleInput}
              error={registerForm?.errors?.['address']}
              placeholder='Enter street address'
            />

            <AuthInput
              label='City *'
              icon={<MapPin className='w-4 h-4 text-amber-500' />}
              name='city'
              value={registerForm?.inputs?.city || ''}
              onChange={handleInput}
              error={registerForm?.errors?.['city']}
              placeholder='Enter city'
            />
            <AuthSelect
              label='State *'
              icon={<MapPin className='w-4 h-4 text-amber-500' />}
              name='state'
              value={registerForm?.inputs?.state || ''}
              onChange={handleInput}
              error={registerForm?.errors?.['state']}
              options={states}
            />

            <AuthInput
              label='ZIP/Postal Code *'
              icon={<MapPin className='w-4 h-4 text-amber-500' />}
              name='zipPostalCode'
              value={registerForm?.inputs?.zipPostalCode || ''}
              onChange={handleInput}
              error={registerForm?.errors?.['zipPostalCode']}
              placeholder='Enter ZIP code'
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className='flex gap-4 pt-4'>
          {hasCustomCampaign && currentStep > 1 && (
            <button
              type='button'
              onClick={handlePrevStep}
              className='flex-1 bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 transform hover:scale-105 transition-all duration-200'
            >
              <div className='flex items-center justify-center gap-2'>
                <ArrowLeft className='w-5 h-5' />
                Back
              </div>
            </button>
          )}

          {hasCustomCampaign && currentStep < totalSteps ? (
            <button
              type='button'
              onClick={handleNextStep}
              disabled={!isStep1Valid()}
              className='flex-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold py-4 px-6 rounded-xl hover:from-amber-500 hover:to-orange-500 focus:outline-none focus:ring-4 focus:ring-amber-300 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              <div className='flex items-center justify-center gap-2'>
                Next Step
                <ArrowRight className='w-5 h-5' />
              </div>
            </button>
          ) : (
            <button
              type='submit'
              disabled={isLoading}
              className='flex-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold py-4 px-6 rounded-xl hover:from-amber-500 hover:to-orange-500 focus:outline-none focus:ring-4 focus:ring-amber-300 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              {isLoading ? (
                <div className='flex items-center justify-center gap-2'>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Creating Account...
                </div>
              ) : (
                <div className='flex items-center justify-center gap-2'>
                  <Heart className='w-5 h-5' />
                  {hasCustomCampaign ? 'Complete Registration' : 'Join Little Paws Family'}
                </div>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
