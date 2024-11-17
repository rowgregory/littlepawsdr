import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useForgotPasswordForm from '../../hooks/form-hooks/useForgotPasswordForm';
import { useForgotPasswordEmailMutation } from '../../redux/services/authApi';
import ForgotPasswordModal from '../../components/modals/ForgotPasswordModal';
import Logo from '../../components/common/Logo';

const ForgotPassword = () => {
  const [modal, setModal] = useState(false);
  const [forgotPasswordEmail, { isLoading, error, reset, data, isError }] =
    useForgotPasswordEmailMutation();

  const handleClose = () => {
    setModal(false);
    reset();
  };

  useEffect(() => {
    if (isError || data?.message) {
      setModal(true);
    }
  }, [isError, data?.message]);

  const forgotPasswordCb = () => {
    forgotPasswordEmail({ email: inputs.forgotPasswordEmail });
  };

  const { inputs, handleInputChange, onSubmit } = useForgotPasswordForm(forgotPasswordCb);

  return (
    <>
      <ForgotPasswordModal modal={modal} handleClose={handleClose} error={error} data={data} />
      <div className='bg-white min-h-screen flex items-center justify-center p-8'>
        <div className='max-w-md w-full'>
          <Logo className='w-44' />
          <p className='font-Matter-Medium text-2xl text-center mb-2.5'>Forgot Password</p>
          <form className='flex flex-col w-full'>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
              Email*
            </label>
            <input
              className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
              name='forgotPasswordEmail'
              onChange={handleInputChange}
              type='email'
              alt='Forgot Password'
              value={inputs.forgotPasswordEmail || ''}
            />
            <button
              disabled={isLoading}
              onClick={onSubmit}
              className='py-2 w-full bg-teal-300 text-white font-Matter-Regular rounded-md mt-4 flex items-center justify-center'
            >
              Send{isLoading && 'ing'} email{isLoading && '...'}
            </button>
          </form>
          <p className='text-sm text-gray-700 text-center mt-3 font-Matter-Regular'>
            Remembered your password?{' '}
            <Link className='text-teal-500' to='/auth/login'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
