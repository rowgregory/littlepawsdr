import { Fragment, useEffect, useState } from 'react';
import { privacyPolicyLinkKey, termsOfServiceLinkKey } from '../../utils/footerUtils';
import { Link, useLocation } from 'react-router-dom';
import useRegisterForm from '../../hooks/form-hooks/useRegisterForm';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { setPasswordStrength } from '../../redux/features/auth/authSlice';
import { Logo2024 } from '../../components/assets';
import { useRegisterMutation } from '../../redux/services/authApi';
import { useSelector } from 'react-redux';
import RegisterModal from '../../components/modals/RegisterModal';

const Register = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [modal, setModal] = useState({ open: false, help: false, text: '' });
  const openModal = (text: string) => setModal({ open: true, help: false, text });
  const [register, { isLoading, reset }] = useRegisterMutation();
  const auth = useSelector((state: RootState) => state.auth);

  const registerCb = async () => {
    await register({
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
      strength: auth.strength,
      cameFromAuction: state?.cameFromAuction,
      customCampaignLink: state?.customCampaignLink,
    })
      .unwrap()
      .then((data: any) => {
        openModal(data.message);
      })
      .catch(
        (err: any) =>
          err.data.message === 'Password is not strong enough' &&
          setModal({ open: true, help: true, text: err.data.message })
      );
  };

  const { inputs, handleInputChange, onSubmit } = useRegisterForm(registerCb, state, setModal);

  useEffect(() => {
    if (inputs.password) {
      dispatch(setPasswordStrength(inputs.password));
    }
  }, [dispatch, inputs.password]);

  const handleClose = () => {
    setModal({ open: false, help: false, text: '' });
    reset();
  };

  return (
    <Fragment>
      <RegisterModal modal={modal} handleClose={handleClose} auth={auth} />
      <div className='bg-white min-h-screen flex items-center justify-center p-8'>
        <div className='max-w-md w-full'>
          <Link to='/'>
            <img src={Logo2024} alt='Little Paws Dachshund Rescue' className='w-44 mb-4 mx-auto' />
          </Link>
          <p className='font-Matter-Medium text-2xl text-center mb-2.5'>Register</p>
          <p className='text-gray-400 text-sm font-Matter-Regular text-center mb-4'>
            Sign up or sign in to an existing account to start bidding
          </p>
          <form className='flex flex-col w-full'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex flex-col'>
                <label className='font-Matter-Medium text-sm mb-1' htmlFor='firstName'>
                  First name*
                </label>
                <input
                  className='auth-input bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
                  name='firstName'
                  onChange={handleInputChange}
                  type='text'
                  alt='First Name'
                  value={inputs.firstName || ''}
                />
              </div>
              <div className='flex flex-col'>
                <label className='font-Matter-Medium text-sm mb-1' htmlFor='lastName'>
                  Last name*
                </label>
                <input
                  className='auth-input bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
                  name='lastName'
                  onChange={handleInputChange}
                  type='text'
                  alt='Last Name'
                  value={inputs.lastName || ''}
                />
              </div>
            </div>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
              Email*
            </label>
            <input
              className='auth-input bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
              name='email'
              onChange={handleInputChange}
              type='email'
              alt='Email'
              value={inputs.email || ''}
            />
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='password'>
              Password*{' '}
              <i
                onClick={() => setModal({ open: true, help: true, text: '' })}
                className='fa-solid fa-circle-exclamation text-sm text-teal-300 cursor-pointer'
              ></i>
            </label>
            <div className='flex relative'>
              <input
                className='auth-input bg-white border-[1px] w-full border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none'
                name='password'
                onChange={handleInputChange}
                type={showPassword.password ? 'text' : 'password'}
                alt='Password'
                value={inputs.password || ''}
              />
              <i
                onClick={() =>
                  setShowPassword((prev: any) => ({
                    ...prev,
                    password: !showPassword.password,
                  }))
                }
                className={`fa-solid ${
                  showPassword.password ? 'fa-eye' : 'fa-eye-slash'
                } absolute top-4 right-2`}
              ></i>
            </div>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='confirmPassword'>
              Confirm Password*
            </label>
            <div className='flex relative'>
              <input
                className='auth-input bg-white border-[1px] w-full border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none'
                name='confirmPassword'
                onChange={handleInputChange}
                type={showPassword.confirmPassword ? 'text' : 'password'}
                alt='Confirm Password'
                value={inputs.confirmPassword || ''}
              />
              <i
                onClick={() =>
                  setShowPassword((prev: any) => ({
                    ...prev,
                    confirmPassword: !showPassword.confirmPassword,
                  }))
                }
                className={`fa-solid ${
                  showPassword.confirmPassword ? 'fa-eye' : 'fa-eye-slash'
                } absolute top-4 right-2`}
              ></i>
            </div>
            <button
              disabled={isLoading}
              onClick={onSubmit}
              className='py-2 w-full bg-teal-300 text-white font-Matter-Regular rounded-md mt-4 flex items-center justify-center'
            >
              Sign{isLoading && 'ing'} up{isLoading && '...'}
            </button>
          </form>
          <p className='text-xs text-gray-500 text-center mt-2'>
            By creating an account, you agree to the{' '}
            <Link
              className='text-gray-900 font-Matter-Medium hover:text-teal-300'
              to={termsOfServiceLinkKey}
            >
              Terns of Service
            </Link>{' '}
            and{' '}
            <Link
              className='text-gray-900 font-Matter-Medium hover:text-teal-300'
              to={privacyPolicyLinkKey}
            >
              Privacy Policy
            </Link>
          </p>
          <p className='text-sm text-gray-700 text-center mt-3'>
            Already have an account?{' '}
            <Link className='text-teal-500' to='/auth/login'>
              Log In.
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
