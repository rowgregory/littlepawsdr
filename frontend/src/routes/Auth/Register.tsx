import { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { createFormActions } from '../../redux/features/form/formSlice';
import validateRegisterForm from '../../validations/validateRegisterForm';
import { useRegisterMutation } from '../../redux/services/authApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/forms/RegisterForm';
import { openToast } from '../../redux/features/toastSlice';
import { hydrateUserState } from '../../redux/features/user/userSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const { registerForm, passwordStrength, showPassword } = useAppSelector((state: RootState) => state.form);
  const { handleInput, setErrors, setPasswordStrength, setShowPassword } = createFormActions('registerForm', dispatch);
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const customCampaignLink = params.get('customCampaignLink');
  const auctionItemId = params.get('auctionItemId');
  const conversionSource = params.get('conversionSource');

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
        email: registerForm?.inputs?.email,
        confirmEmail: registerForm?.inputs?.confirmEmail,
        securityQuestion: registerForm?.inputs?.securityQuestion,
        securityAnswer: registerForm?.inputs?.securityAnswer,
        password: registerForm?.inputs?.password,
        ...(customCampaignLink && {
          shippingAddress: {
            address: registerForm?.inputs?.address,
            city: registerForm?.inputs?.city,
            state: registerForm?.inputs?.state,
            zipPostalCode: registerForm?.inputs?.zipPostalCode,
          },
        }),
        conversionSource,
      }).unwrap();
      dispatch(hydrateUserState({ user: response?.user }));

      if (response?.user?.addressRef && customCampaignLink) {
        navigate(`/campaigns/${customCampaignLink}/auction`);
      } else if (response?.user?.addressRef && customCampaignLink && auctionItemId) {
        navigate(`/campaigns/${customCampaignLink}/auction/item/${auctionItemId}`);
      } else {
        const params = new URLSearchParams({ initialLogin: 'true' });

        if (customCampaignLink) params.append('customCampaignLink', customCampaignLink);
        if (auctionItemId) params.append('auctionItemId', auctionItemId);

        navigate(`/settings/profile?${params.toString()}`);
      }
    } catch (err: any) {
      dispatch(openToast({ message: err?.data?.message, type: 'error', position: 'bc' }));
    }
  };

  return (
    <div className='min-h-dvh bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full'>
        <Link to='/'>
          <div className='bg-gradient-to-r from-amber-400 to-orange-400 p-8 text-center'>
            <div className='bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg'>
              <span className='text-4xl'>🐾</span>
            </div>
            <h1 className='text-2xl font-bold text-white mb-2'>Little Paws Dachshund Rescue</h1>
            <div className='flex justify-center gap-1 mt-3'>
              {[...Array(5)].map((_, i) => (
                <Heart key={i} className='w-4 h-4 text-white fill-current animate-pulse' style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        </Link>
        <div className='p-8'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>Join Our Pack</h2>
            <p className='text-gray-600 text-sm'>Create your account to start helping dachshunds in need</p>
          </div>
          <RegisterForm
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            passwordStrength={passwordStrength}
            registerForm={registerForm}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
          <div className='mt-6 text-center'>
            <p className='text-xs text-gray-500 mb-3'>
              By creating an account, you agree to our{' '}
              <Link to='#' className='text-amber-600 hover:text-amber-700 font-medium'>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to='/privacy-policy' className='text-amber-600 hover:text-amber-700 font-medium'>
                Privacy Policy
              </Link>
            </p>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link to='/auth/login' className='text-amber-600 hover:text-amber-700 font-medium'>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
