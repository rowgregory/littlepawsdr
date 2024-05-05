import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Logo2024 } from '../../components/assets';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { useResetPasswordMutation, useValidateForgotPasswordTokenQuery } from '../../redux/services/authApi';
import { setPasswordStrength } from '../../redux/features/auth/authSlice';

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState({ password: false });
  const [modal, setModal] = useState({ open: false, help: false });
  const navigate = useNavigate();
  const { error } = useValidateForgotPasswordTokenQuery({ token });
  const [resetPassword, { isLoading: loadingReset }] = useResetPasswordMutation();
  const auth = useSelector((state: RootState) => state.auth);

  const handleClose = () => {
    setModal({ open: false, help: false });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (auth.strength === 4) {
      await resetPassword({ token, password })
        .unwrap()
        .then(() => navigate('/auth/reset-password/success'))
        .catch((err: any) => err);
    } else {
      setMessage('Password is not strong enough');
    }
  };

  useEffect(() => {
    if (password) {
      dispatch(setPasswordStrength(password));
    }
  }, [dispatch, password]);

  useEffect(() => {
    if (error || message) {
      setModal({ open: true, help: false });
    }
  }, [error, message]);

  if (error) {
    return (
      <div className='bg-white min-h-screen flex items-center justify-center p-8'>
        <div className='max-w-md w-full'>
          <div className='flex flex-col items-center justify-center shadow-lg rounded-3xl py-5 px-3.5'>
            <i className='fa-solid fa-circle-exclamation text-red-500 fa-4x flex justify-center mb-3'></i>
            <p className='text-red-500 text-lg font-Matter-Medium text-center mb-2'>{error?.data?.message}</p>
            <p className='text-sm text-gray-400 font-Matter-Light text-center mb-3.5'>
              Please log in again to continue accessing our services
            </p>
            <Link
              to='/auth/forgot-password'
              className='text-white text-sm bg-red-500 rounded-md py-1.5 px-8 font-Matter-Regular duration-300 hover:no-underline hover:bg-red-600'
            >
              Try again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal show={modal.open} onHide={handleClose} centered>
        <div className='bg-white rounded-xl p-8 w-full'>
          <i onClick={handleClose} className='fa-solid fa-xmark fa-sm text-gray-500 flex justify-end mb-4 cursor-pointer'></i>
          {message && <p className='text-red-500 font-Matter-Medium'>{message}</p>}
          {modal.help && (
            <>
              <p className='font-Matter-Regular text-gray-700'>must contain a capital letter</p>
              <p className='font-Matter-Regular text-gray-700'>must contain a number</p>
              <p className='font-Matter-Regular text-gray-700'>must contain one symbol ~`!-@#$%^ &*()_+={ }|:;"',.?</p>
              <p className='font-Matter-Regular text-gray-700'>must be at least 9 characters</p>
            </>
          )}
        </div>
      </Modal>
      <div className='bg-white min-h-screen flex items-center justify-center p-8'>
        <div className='max-w-md w-full'>
          <img src={Logo2024} alt='Little Paws Dachshund Rescue Logo' className='w-44 mb-4 mx-auto' />
          <p className='font-Matter-Medium text-2xl text-center mb-2.5'>Reset Password</p>
          <form className='flex flex-col w-full'>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='password'>
              Password*
              <i
                onClick={() => setModal({ open: true, help: true })}
                className='fa-solid fa-circle-exclamation text-sm text-teal-300 cursor-pointer'
              ></i>
            </label>
            <div className='flex relative'>
              <input
                className='bg-white border-[1px] w-full border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none'
                name='password'
                onChange={(e: any) => setPassword(e.target.value)}
                type={`${showPassword.password ? 'text' : 'password'}`}
                alt='Reset Password'
                value={password || ''}
              />
              <i
                onClick={() => setShowPassword((prev: any) => ({ ...prev, password: !showPassword.password }))}
                className={`fa-solid ${showPassword.password ? 'fa-eye' : 'fa-eye-slash'} absolute top-4 right-2`}
              ></i>
            </div>

            <button
              disabled={loadingReset}
              onClick={handleSubmit}
              className='py-2 w-full bg-teal-300 text-white font-Matter-Regular rounded-md mt-4 flex items-center justify-center'
            >
              Submit{loadingReset && 'ting...'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
