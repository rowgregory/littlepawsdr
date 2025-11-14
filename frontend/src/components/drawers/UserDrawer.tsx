import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Calendar, Shield, Lock, AlertCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import TailwindSpinner from '../Loaders/TailwindSpinner';
import Switch from '../common/Switch';
import { useAppDispatch, useFormSelector, useUserSelector } from '../../redux/toolkitStore';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import { setCloseUserDrawer } from '../../redux/features/user/userSlice';
import { useUpdateUserRoleMutation } from '../../redux/services/userApi';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    x: '0%',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 40,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const UserDrawer = () => {
  const { openUserDrawer } = useUserSelector();
  const dispatch = useAppDispatch();
  const { userForm } = useFormSelector();
  const inputs = userForm?.inputs;
  const { id: userId } = useParams<{ id: string }>();

  const [updateUserRole, { isLoading: loadingUpdate }] = useUpdateUserRoleMutation();

  const onClose = () => {
    dispatch(setCloseUserDrawer());
  };

  const handleToggle = async (e: any) => {
    e.preventDefault();

    await updateUserRole({
      id: userId,
      isAdmin: e.target.checked,
    });
  };

  return (
    <AnimatePresence>
      {openUserDrawer && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            onClick={onClose}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial='closed'
            animate='open'
            exit='closed'
            className='fixed right-0 top-0 h-full w-full max-w-2xl bg-white z-[100] flex flex-col shadow-2xl'
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            }}
          >
            {/* Header - Fixed at top */}
            <div className='flex-shrink-0 bg-white border-b-2 border-gray-200 p-4 sm:p-6 shadow-sm'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-Matter-Medium shadow-lg'>
                    {inputs?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h2 className='text-xl sm:text-2xl font-Matter-Medium text-gray-900'>User Details</h2>
                    <p className='text-sm text-gray-500 font-Matter-Regular'>View and manage user information</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
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
              <motion.div variants={contentVariants} initial='hidden' animate='visible' className='p-4 sm:p-6 space-y-6'>
                {/* User Details Section */}
                <motion.div variants={itemVariants} className='bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden'>
                  <div className='bg-gradient-to-r from-blue-500 to-indigo-600 p-6'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-lg font-Matter-Medium text-white flex items-center gap-2'>
                        <User className='w-5 h-5' />
                        User Information
                      </h3>
                      {inputs?.isAdmin ? (
                        <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-Matter-Medium bg-white/20 text-white border border-white/30 backdrop-blur-sm'>
                          <Shield className='w-3.5 h-3.5' />
                          Admin
                        </span>
                      ) : (
                        <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-Matter-Medium bg-white/20 text-white border border-white/30 backdrop-blur-sm'>
                          <User className='w-3.5 h-3.5' />
                          User
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='p-6 space-y-4'>
                    {/* Email */}
                    <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                      <div className='flex items-center gap-2 min-w-[120px]'>
                        <div className='p-2 bg-indigo-50 rounded-lg'>
                          <Mail className='w-4 h-4 text-indigo-600' />
                        </div>
                        <span className='font-Matter-Medium text-sm text-gray-700'>Email</span>
                      </div>
                      <div className='flex-1 relative'>
                        <div className='bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 font-Matter-Regular text-gray-900 break-all opacity-60'>
                          {inputs.email}
                        </div>
                        <div className='absolute top-1/2 right-3 -translate-y-1/2'>
                          <Lock className='w-4 h-4 text-gray-400' />
                        </div>
                      </div>
                    </div>

                    {/* Contact Since */}
                    <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                      <div className='flex items-center gap-2 min-w-[120px]'>
                        <div className='p-2 bg-purple-50 rounded-lg'>
                          <Calendar className='w-4 h-4 text-purple-600' />
                        </div>
                        <span className='font-Matter-Medium text-sm text-gray-700'>Member Since</span>
                      </div>
                      <div className='flex-1 relative'>
                        <div className='bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 font-Matter-Regular text-gray-900 opacity-60'>
                          {formatDateWithTimezone(inputs?.createdAt)}
                        </div>
                        <div className='absolute top-1/2 right-3 -translate-y-1/2'>
                          <Lock className='w-4 h-4 text-gray-400' />
                        </div>
                      </div>
                    </div>

                    {/* Info Notice */}
                    <div className='mt-4 p-3 bg-amber-50 border-2 border-amber-200 rounded-xl flex items-start gap-2'>
                      <AlertCircle className='w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0' />
                      <p className='text-xs font-Matter-Regular text-amber-800'>
                        Email and registration date cannot be modified for security reasons.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Admin Privileges Section */}
                <motion.div variants={itemVariants} className='bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden'>
                  <div className='bg-gradient-to-r from-emerald-500 to-teal-600 p-6'>
                    <h3 className='text-lg font-Matter-Medium text-white flex items-center gap-2'>
                      <Shield className='w-5 h-5' />
                      Admin Privileges
                    </h3>
                    <p className='text-sm text-emerald-50 mt-1 font-Matter-Regular'>Control dashboard access and permissions</p>
                  </div>

                  <div className='p-6'>
                    <div className='flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200'>
                      <div className='flex-1'>
                        <p className='font-Matter-Medium text-gray-900 mb-1'>Dashboard Access</p>
                        <p className='font-Matter-Regular text-sm text-gray-600'>Allow this user to access the admin dashboard</p>
                      </div>
                      <div className='ml-4'>
                        {loadingUpdate ? <TailwindSpinner /> : <Switch checked={inputs?.isAdmin || false} onChange={handleToggle} name='isAdmin' />}
                      </div>
                    </div>

                    {/* Info Box */}
                    <div className='mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl'>
                      <p className='text-xs font-Matter-Regular text-blue-800'>
                        <strong>Note:</strong> Admin users have full access to manage users, view analytics, and configure system settings.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserDrawer;
