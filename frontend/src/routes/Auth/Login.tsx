import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/services/authApi';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { createFormActions } from '../../redux/features/form/formSlice';
import { Heart } from 'lucide-react';
import validateLoginForm from '../../validations/validateLoginForm';
import LoginForm from '../../components/forms/LoginForm';
import { openToast } from '../../redux/features/toastSlice';
import { hydrateUserState } from '../../redux/features/user/userSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const { loginForm, showPassword } = useAppSelector((state: RootState) => state.form);
  const { handleInput, setErrors, setShowPassword } = createFormActions('loginForm', dispatch);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isValid = validateLoginForm(loginForm?.inputs, setErrors);
    if (!isValid) return;

    try {
      const response = await login({ email: loginForm?.inputs?.email.toLowerCase(), password: loginForm?.inputs?.password }).unwrap();

      dispatch(hydrateUserState({ user: response?.user }));
      if (response?.user?.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/settings/profile');
      }
    } catch (err: any) {
      dispatch(openToast({ message: err?.data?.message, type: 'error', position: 'bc' }));
    }
  };

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4'>
        <div className='bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full'>
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
              <h2 className='text-2xl font-bold text-gray-800 mb-2'>Welcome Back</h2>
              <p className='text-gray-600 text-sm'>Log in to continue helping dachshunds in need</p>
            </div>
            <LoginForm
              handleSubmit={handleSubmit}
              handleInput={handleInput}
              loginForm={loginForm}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isLoading={isLoading}
            />
            <div className='mt-6 text-center'>
              <p className='text-sm text-gray-600'>
                New to Little Paws?{' '}
                <Link to='/auth/register?conversionSource=organic_signup' className='text-amber-600 hover:text-amber-700 font-medium'>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
