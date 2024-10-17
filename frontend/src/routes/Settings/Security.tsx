import { Fragment, useEffect, useState } from 'react';
import TailwindSpinner from '../../components/Loaders/TailwindSpinner';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import {
  useResetPasswordMutation,
  useValidateCurrentPasswordMutation,
} from '../../redux/services/authApi';
import {
  resetAuthSuccess,
  resetPasswordStrength,
  setPasswordStrength,
} from '../../redux/features/auth/authSlice';
import { resetUserSuccess } from '../../redux/features/user/userSlice';
import AccountSecurityModal from '../../components/modals/AccountSecurityModal';

const values = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};
const useSecurityForm = () => {
  const [inputs, setInputs] = useState(values);

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  return { inputs, handleInput, setInputs };
};

const Settings = () => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState({ toggle: false, text: '', help: false });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  }) as any;

  const openModal = (text: string, help: boolean) => setModal({ toggle: true, text, help });
  const closeModal = () => setModal({ toggle: false, text: '', help: false });

  const state = useSelector((state: RootState) => state);
  const auth = state.auth;

  const [verifyCurrentPassword, { isLoading: loadingVerify }] =
    useValidateCurrentPasswordMutation();
  const [resetPassword, { isLoading: loadingReset }] = useResetPasswordMutation();

  const handleVerifyPassword = async (e: any) => {
    e.preventDefault();
    await verifyCurrentPassword({ id: auth?.user?._id, currentPassword: inputs.currentPassword })
      .unwrap()
      .then((data: any) => {
        if (!data.passwordsMatch) {
          openModal('Incorrect password', false);
        }
      })
      .catch((err: any) => {
        openModal(err, false);
      });
  };

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    if (auth?.strength !== 4) {
      return openModal('Password is not strong enough', false);
    }
    if (inputs.newPassword !== inputs.confirmNewPassword) {
      return openModal('Passwords do not match', false);
    }

    await resetPassword({ id: auth?.user?._id, password: inputs?.newPassword })
      .unwrap()
      .then(() => {
        openModal('reset-success', false);
        dispatch(resetUserSuccess());
        dispatch(resetAuthSuccess());
        setInputs({ ...values });
      })
      .catch((err: any) => openModal(err, false));
  };

  const { inputs, handleInput, setInputs } = useSecurityForm();

  useEffect(() => {
    if (inputs.newPassword) {
      dispatch(setPasswordStrength(inputs.newPassword));
    }
    if (inputs.newPassword === '') {
      dispatch(resetPasswordStrength());
    }
  }, [dispatch, inputs.newPassword]);

  useEffect(() => {
    return () => {
      dispatch(resetUserSuccess());
      dispatch(resetAuthSuccess());
    };
  }, [dispatch]);

  return (
    <Fragment>
      <AccountSecurityModal modal={modal} closeModal={closeModal} auth={auth} />
      <div className='bg-[#fff] w-full mx-auto border-[1px] border-gray-200  rounded-xl p-3 md:p-8'>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='text-lg font-Matter-Medium text-slate-900 '>Credentials</p>
            <p className='font-Matter-Light text-sm tracking-wid text-slate-900 '>
              Confirm your current password
            </p>
          </div>
          <div className='col-span-12 md:col-span-8 md:col-start-6'>
            <form className='flex flex-col gap-3'>
              <div className='flex flex-col w-full'>
                <label className='font-Matter-Medium text-sm mb-0' htmlFor='currentPassword'>
                  Current password
                </label>
                <input
                  className='user-input bg-[#fff] border-[1px] border-gray-200 rounded-md  py-2.5 px-4 font-Matter-Regular focus:outline-none'
                  name='currentPassword'
                  onChange={handleInput}
                  type='password'
                  alt='Current password'
                  value={inputs.currentPassword || ''}
                />
              </div>
              <button
                className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-24 h-10 rounded-lg font-Matter-Regular disabled:bg-g-slate disabled:cursor-not-allowed'
                onClick={handleVerifyPassword}
                disabled={auth.passwordsMatch || inputs.currentPassword === ''}
              >
                {auth?.passwordsMatch ? (
                  <i className='fas fa-check text-white'></i>
                ) : loadingVerify ? (
                  <TailwindSpinner color='fill-white' />
                ) : (
                  'Confirm'
                )}
              </button>
            </form>
          </div>
        </div>
        {auth.passwordsMatch && (
          <Fragment>
            <div className='border-b border-[1px] border-gray-50 w-full my-10'></div>
            <div className='grid grid-cols-12 gap-3'>
              <div className='col-span-12 md:col-span-4'>
                <p className='text-lg font-Matter-Medium text-slate-900 dark:text-white'></p>
                <p className='font-Matter-Light text-sm tracking-wid text-slate-900 dark:text-slate-400'>
                  Reset your password
                </p>
              </div>
              <div className='col-span-12 md:col-span-8 md:col-start-6'>
                <form className='flex flex-col gap-3'>
                  <label className='font-Matter-Medium text-sm mb-0' htmlFor='newPassword'>
                    New password
                    <i
                      onClick={() => setModal({ toggle: true, text: '', help: true })}
                      className='fa-solid fa-circle-exclamation text-sm text-teal-300 cursor-pointer'
                    ></i>
                  </label>

                  <div className='flex relative'>
                    <input
                      className='bg-white border-[1px] w-full border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none'
                      name='newPassword'
                      onChange={handleInput}
                      type={showPassword.newPassword ? 'text' : 'password'}
                      alt='Confirm Password'
                      value={inputs.newPassword}
                    />
                    <i
                      onClick={() =>
                        setShowPassword((prev: any) => ({
                          ...prev,
                          newPassword: !showPassword.newPassword,
                        }))
                      }
                      className={`fa-solid ${
                        showPassword.newPassword ? 'fa-eye' : 'fa-eye-slash'
                      } absolute top-4 right-2 cursor-pointer`}
                    ></i>
                  </div>
                  <label className='font-Matter-Medium text-sm mb-0' htmlFor='confirmNewPassword'>
                    Confirm new password
                  </label>
                  <div className='flex relative'>
                    <input
                      className='bg-white border-[1px] w-full border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none'
                      name='confirmNewPassword'
                      onChange={handleInput}
                      type={showPassword.confirmNewPassword ? 'text' : 'password'}
                      alt='Confirm new Password'
                      value={inputs.confirmNewPassword}
                    />
                    <i
                      onClick={() =>
                        setShowPassword((prev: any) => ({
                          ...prev,
                          confirmNewPassword: !showPassword.confirmNewPassword,
                        }))
                      }
                      className={`fa-solid ${
                        showPassword.confirmNewPassword ? 'fa-eye' : 'fa-eye-slash'
                      } absolute top-4 right-2 cursor-pointer`}
                    ></i>
                  </div>
                  <button
                    className='flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-24 h-10 rounded-lg font-Matter-Regular cursor-pointer'
                    onClick={handleResetPassword}
                  >
                    {auth?.success ? (
                      <i className='fas fa-check text-white'></i>
                    ) : loadingReset ? (
                      <TailwindSpinner color='fill-white' />
                    ) : (
                      'Reset'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Settings;
