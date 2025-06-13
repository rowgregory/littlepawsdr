import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { useUpdatePasswordMutation } from '../../redux/services/authApi';
import { AlertTriangle, CheckCircle, Eye, EyeOff, Key, Lock, Shield } from 'lucide-react';
import { clearInputs, createFormActions } from '../../redux/features/form/formSlice';
import validateSecurityForm from '../../validations/validateSecurityForm';
import { openToast } from '../../redux/features/toastSlice';

const Security = () => {
  const dispatch = useAppDispatch();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const { securityForm, passwordStrength } = useAppSelector((state: RootState) => state.form);
  const { user } = useAppSelector((state: RootState) => state.user);
  const { handleInput, setErrors, setPasswordStrength } = createFormActions('securityForm', dispatch);

  useEffect(() => {
    if (securityForm?.inputs?.newPassword) {
      setPasswordStrength(securityForm?.inputs?.newPassword);
    } else {
      setPasswordStrength('');
    }
  }, [securityForm, setPasswordStrength]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isValid = validateSecurityForm(securityForm?.inputs, setErrors);
    if (!isValid) return;

    try {
      await updatePassword({ ...securityForm?.inputs, id: user?._id }).unwrap();

      dispatch(
        openToast({
          message: 'Password updated successfully!',
          success: true,
          open: true,
        })
      );
      dispatch(clearInputs({ formName: 'securityForm' }));
    } catch {
      dispatch(
        openToast({
          message: 'Password update failed.',
          type: 'error',
          position: 'bc',
        })
      );
    }
  };

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

  return (
    <div className='bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Security Header */}
        <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
          <div className='relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-12'>
            <div className='relative z-10'>
              <div className='flex items-center space-x-6'>
                <div className='w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20'>
                  <Shield className='w-8 h-8 text-white' />
                </div>
                <div>
                  <h1 className='text-3xl font-bold text-white tracking-tight'>Security Settings</h1>
                  <p className='text-slate-300 mt-2'>Manage your account security and authentication preferences</p>
                </div>
              </div>
            </div>
            <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-32 -translate-y-32'></div>
          </div>
        </div>
        <div className='bg-white rounded-2xl shadow-sm border border-gray-200'>
          <div className='px-8 py-6 border-b border-gray-200'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                <Lock className='w-4 h-4 text-blue-600' />
              </div>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>Change Password</h2>
                <p className='text-gray-600 text-sm'>Update your password to keep your account secure</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='p-8'>
            <div className='space-y-6'>
              {/* Current Password */}
              <div className='space-y-2'>
                <label htmlFor='currentPassword' className='block text-sm font-semibold text-gray-700'>
                  Current Password <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <input
                    name='currentPassword'
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={securityForm?.inputs?.currentPassword || ''}
                    onChange={handleInput}
                    className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                    placeholder='Enter your current password'
                  />
                  <button
                    type='button'
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                  >
                    {showCurrentPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                  </button>
                </div>
              </div>

              {/* New Password Section */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label htmlFor='newPassword' className='block text-sm font-semibold text-gray-700'>
                    New Password <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      name='newPassword'
                      type={showNewPassword ? 'text' : 'password'}
                      value={securityForm?.inputs?.newPassword || ''}
                      onChange={handleInput}
                      className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                      placeholder='Enter new password'
                    />
                    <button
                      type='button'
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                    >
                      {showNewPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {securityForm?.inputs?.newPassword && (
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
                </div>

                <div className='space-y-2'>
                  <label htmlFor='confirmNewPassword' className='block text-sm font-semibold text-gray-700'>
                    Confirm New Password <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      name='confirmNewPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={securityForm?.inputs?.confirmNewPassword || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 transition-all duration-200 ${
                        securityForm?.inputs?.confirmNewPassword && securityForm?.inputs?.newPassword !== securityForm?.inputs?.confirmNewPassword
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder='Confirm your new password'
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                    >
                      {showConfirmPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                    </button>
                  </div>

                  {/* Password Match Indicator */}
                  {securityForm?.inputs?.confirmNewPassword && (
                    <div className='flex items-center space-x-2 mt-2'>
                      {securityForm?.inputs?.newPassword === securityForm?.inputs?.confirmNewPassword ? (
                        <>
                          <CheckCircle className='w-4 h-4 text-green-500' />
                          <span className='text-sm text-green-600'>Passwords match</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className='w-4 h-4 text-red-500' />
                          <span className='text-sm text-red-600'>Passwords do not match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Password Requirements */}
              <div className='bg-gray-50 rounded-xl p-6'>
                <h3 className='text-sm font-semibold text-gray-900 mb-3'>Password Requirements:</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600'>
                  <div className='flex items-center space-x-2'>
                    <div className={`w-2 h-2 rounded-full ${securityForm?.inputs?.newPassword?.length >= 10 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>At least 10 characters</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(securityForm?.inputs?.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>One uppercase letter</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div
                      className={`w-2 h-2 rounded-full ${/[a-z]/.test(securityForm?.inputs?.newPassword || '') ? 'bg-green-500' : 'bg-gray-300'}`}
                    ></div>
                    <span>One lowercase letter</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className={`w-2 h-2 rounded-full ${/\d/.test(securityForm?.inputs?.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>One number</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        /[!@#$%^&*(),.?":{}|<>]/.test(securityForm?.inputs?.newPassword) ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    ></div>
                    <span>One special character</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-100'>
                <button
                  type='button'
                  className='w-full sm:w-auto px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 rounded-xl hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={
                    isLoading ||
                    !securityForm?.inputs?.currentPassword ||
                    !securityForm?.inputs?.newPassword ||
                    securityForm?.inputs?.newPassword !== securityForm?.inputs?.confirmNewPassword
                  }
                  className='w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]'
                >
                  {isLoading ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin'></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Key className='w-4 h-4' />
                      <span>Update Password</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Security;
