import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Shield, AlertCircle } from 'lucide-react';
import TailwindSpinner from '../Loaders/TailwindSpinner';
import Switch from '../common/Switch';
import { useAppDispatch, useFormSelector, useUserSelector } from '../../redux/toolkitStore';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import { setCloseUserDrawer } from '../../redux/features/userSlice';
import { useUpdateUserRoleMutation } from '../../redux/services/userApi';
import { itemVariants } from '../../lib/constants/motion';
import { showToast } from '../../redux/features/toastSlice';

const UserDrawer = () => {
  const { openUserDrawer } = useUserSelector();
  const dispatch = useAppDispatch();
  const { userForm } = useFormSelector();
  const inputs = userForm?.inputs;

  const [updateUserRole, { isLoading: loadingUpdate }] = useUpdateUserRoleMutation();

  const onClose = () => {
    dispatch(setCloseUserDrawer());
  };

  const handleToggle = async (e: any) => {
    e.preventDefault();

    try {
      await updateUserRole({
        id: inputs?._id,
        isAdmin: e.target.checked,
      });

      dispatch(showToast({ message: 'User updated successfully', type: 'success' }));
      dispatch(setCloseUserDrawer());
    } catch {
      dispatch(showToast({ message: 'Failed to update user', type: 'error' }));
    }
  };

  return (
    <AnimatePresence>
      {openUserDrawer && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed inset-0 bg-black/50 z-[100]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Drawer */}
          <motion.div
            className='fixed right-0 top-0 h-screen w-full max-w-2xl bg-white z-[101] overflow-y-auto'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header - Fixed at top */}
            <div className='flex-shrink-0 bg-white border-b border-gray-200 p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-2xl font-bold text-gray-900'>User Details</h2>
                  <p className='text-sm text-gray-600 mt-1'>View and manage user information</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
                >
                  <X className='w-6 h-6 text-gray-600' />
                </motion.button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className='flex-1 overflow-y-auto'>
              <div className='p-6 space-y-6'>
                {/* User Information Section */}
                <motion.div
                  variants={itemVariants}
                  className='bg-white rounded-lg border border-gray-200'
                >
                  <div className='bg-gray-50 border-b border-gray-200 p-6'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-sm font-semibold text-gray-900 flex items-center gap-2'>
                        <User className='w-4 h-4' />
                        User Information
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          inputs?.isAdmin
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {inputs?.isAdmin ? (
                          <>
                            <Shield className='w-3 h-3' />
                            Admin
                          </>
                        ) : (
                          <>
                            <User className='w-3 h-3' />
                            User
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className='p-6 space-y-4'>
                    {/* Email */}
                    <div>
                      <label className='block text-xs font-semibold text-gray-600 mb-2'>
                        Email
                      </label>
                      <div className='px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900'>
                        {inputs.email}
                      </div>
                    </div>

                    {/* Member Since */}
                    <div>
                      <label className='block text-xs font-semibold text-gray-600 mb-2'>
                        Member Since
                      </label>
                      <div className='px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900'>
                        {formatDateWithTimezone(inputs?.createdAt)}
                      </div>
                    </div>

                    {/* Info Notice */}
                    <div className='mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2'>
                      <AlertCircle className='w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0' />
                      <p className='text-xs text-amber-800'>
                        Email and registration date cannot be modified for security reasons.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Admin Privileges Section */}
                <motion.div
                  variants={itemVariants}
                  className='bg-white rounded-lg border border-gray-200'
                >
                  <div className='bg-gray-50 border-b border-gray-200 p-6'>
                    <h3 className='text-sm font-semibold text-gray-900 flex items-center gap-2'>
                      <Shield className='w-4 h-4' />
                      Admin Privileges
                    </h3>
                    <p className='text-xs text-gray-600 mt-1'>
                      Control dashboard access and permissions
                    </p>
                  </div>

                  <div className='p-6'>
                    <div className='flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                      <div className='flex-1'>
                        <p className='font-semibold text-sm text-gray-900 mb-1'>Dashboard Access</p>
                        <p className='text-xs text-gray-600'>
                          Allow this user to access the admin dashboard
                        </p>
                      </div>
                      <div className='ml-4'>
                        {loadingUpdate ? (
                          <TailwindSpinner />
                        ) : (
                          <Switch
                            checked={inputs?.isAdmin || false}
                            onChange={handleToggle}
                            name='isAdmin'
                          />
                        )}
                      </div>
                    </div>

                    {/* Info Box */}
                    <div className='mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                      <p className='text-xs text-blue-800'>
                        <strong>Note:</strong> Admin users have full access to manage users, view
                        analytics, and configure system settings.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserDrawer;
