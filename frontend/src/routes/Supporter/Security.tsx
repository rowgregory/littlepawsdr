import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useAppDispatch, useFormSelector, useUserSelector } from '../../redux/toolkitStore';
import { useUpdatePasswordMutation } from '../../redux/services/authApi';
import { createFormActions, resetForm } from '../../redux/features/form/formSlice';
import { showToast } from '../../redux/features/toastSlice';

const SecurityPage = () => {
  const dispatch = useAppDispatch();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const { user } = useUserSelector();
  const { securityForm, passwordStrength } = useFormSelector();
  const { handleInput, setPasswordStrength } = createFormActions('securityForm', dispatch);

  const inputs = securityForm?.inputs;

  useEffect(() => {
    if (inputs?.newPassword) {
      setPasswordStrength(inputs?.newPassword);
    } else {
      setPasswordStrength('');
    }
  }, [inputs?.newPassword, setPasswordStrength]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputs?.currentPassword) {
      dispatch(showToast({ message: 'Current password can not be empty', type: 'error' }));
      return;
    }

    if (inputs?.currentPassword?.length < 8) {
      dispatch(showToast({ message: 'Current password is not long enough', type: 'error' }));
      return;
    }

    if (inputs?.newPassword !== inputs?.confirmPassword) {
      dispatch(showToast({ message: 'Passwords do not match', type: 'error' }));
      return;
    }

    try {
      await updatePassword({
        id: user?._id,
        currentPassword: inputs?.currentPassword,
        newPassword: inputs?.newPassword,
      }).unwrap();

      dispatch(showToast({ message: 'Password updated successfully!', type: 'success' }));
      dispatch(resetForm('securityForm'));
    } catch (error: any) {
      dispatch(
        showToast({ message: error?.data?.message || 'Password update failed', type: 'error' })
      );
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 20) return 'bg-red-500';
    if (passwordStrength <= 40) return 'bg-orange-500';
    if (passwordStrength <= 60) return 'bg-yellow-500';
    if (passwordStrength <= 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 20) return 'Very Weak';
    if (passwordStrength <= 40) return 'Weak';
    if (passwordStrength <= 60) return 'Fair';
    if (passwordStrength <= 80) return 'Good';
    return 'Strong';
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className='text-3xl font-bold text-gray-900'>Security</h1>
        <p className='text-gray-600 mt-1'>Manage your account security and password</p>
      </motion.div>

      {/* Change Password Card */}
      <div className='grid grid-cols-12 gap-6'>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className='col-span-12 lg:col-span-5 bg-white border border-gray-200 rounded-lg p-6'
        >
          <h3 className='text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wide flex items-center gap-2'>
            <Lock className='w-4 h-4' />
            Change Password
          </h3>

          <div className='space-y-4'>
            {/* Current Password */}
            <div>
              <label className='block text-xs text-gray-600 mb-1'>Current Password</label>
              <div className='relative'>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  name='currentPassword'
                  value={inputs?.currentPassword || ''}
                  onChange={handleInput}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                  placeholder='Enter your current password'
                />
                <motion.button
                  type='button'
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                >
                  {showCurrentPassword ? (
                    <EyeOff className='w-4 h-4' />
                  ) : (
                    <Eye className='w-4 h-4' />
                  )}
                </motion.button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className='block text-xs text-gray-600 mb-1'>New Password</label>
              <div className='relative'>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name='newPassword'
                  value={inputs?.newPassword || ''}
                  onChange={handleInput}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                  placeholder='Enter a new password'
                />
                <motion.button
                  type='button'
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                >
                  {showNewPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                </motion.button>
              </div>

              {/* Password Strength */}
              {inputs?.newPassword && (
                <div className='mt-3'>
                  <div className='flex items-center justify-between mb-2'>
                    <p className='text-xs text-gray-600'>Password Strength</p>
                    <p
                      className={`text-xs font-semibold ${
                        passwordStrength <= 20
                          ? 'text-red-600'
                          : passwordStrength <= 40
                          ? 'text-orange-600'
                          : passwordStrength <= 60
                          ? 'text-yellow-600'
                          : passwordStrength <= 80
                          ? 'text-blue-600'
                          : 'text-green-600'
                      }`}
                    >
                      {getStrengthText()}
                    </p>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength}%` }}
                      className={`h-2 rounded-full ${getStrengthColor()}`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className='block text-xs text-gray-600 mb-1'>Confirm Password</label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={inputs?.confirmPassword || ''}
                  onChange={handleInput}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                  placeholder='Re-enter your new password'
                />
                <motion.button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                >
                  {showConfirmPassword ? (
                    <EyeOff className='w-4 h-4' />
                  ) : (
                    <Eye className='w-4 h-4' />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type='submit'
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50'
            >
              {isLoading ? (
                <>
                  <div className='w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin' />
                  Updating...
                </>
              ) : (
                <>
                  <Lock className='w-4 h-4' />
                  Update Password
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Password Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='col-span-12 lg:col-span-4 h-fit bg-white border border-gray-200 rounded-lg p-6'
        >
          <h3 className='text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide'>
            Password Tips
          </h3>
          <ul className='space-y-2 text-sm text-gray-700'>
            <li className='flex items-start gap-2'>
              <span className='text-gray-400 mt-1'>•</span>
              <span>Use at least 8 characters for a basic password</span>
            </li>
            <li className='flex items-start gap-2'>
              <span className='text-gray-400 mt-1'>•</span>
              <span>Mix uppercase and lowercase letters</span>
            </li>
            <li className='flex items-start gap-2'>
              <span className='text-gray-400 mt-1'>•</span>
              <span>Include numbers and special characters</span>
            </li>
            <li className='flex items-start gap-2'>
              <span className='text-gray-400 mt-1'>•</span>
              <span>Avoid using personal information or common words</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SecurityPage;
