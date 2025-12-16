import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useDashboardSelector, useUserSelector } from '../../redux/toolkitStore';
import { setCloseChangelogModal } from '../../redux/features/dashboard/dashboardSlice';
import { useUpdateLastSeenChangelogVersionMutation } from '../../redux/services/userApi';

export const ChangelogModal = () => {
  const navigate = useNavigate();
  const { changelogModal } = useDashboardSelector();
  const { user } = useUserSelector();
  const dispatch = useAppDispatch();
  const [updateLastSeenChangelogVersion] = useUpdateLastSeenChangelogVersionMutation();

  const handleGoToChangelog = async () => {
    try {
      await updateLastSeenChangelogVersion({ lastSeenChangelogVersion: user?.currentVersion }).unwrap();
    } finally {
      dispatch(setCloseChangelogModal());
      navigate('/admin/changelog');
    }
  };

  return (
    <AnimatePresence>
      {changelogModal && (
        <>
          {/* Blurred background */}
          <motion.div
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-[50]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className='fixed inset-0 flex items-center justify-center z-50 px-4'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className='bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-xl border border-gray-200 dark:border-gray-700'>
              <h2 className='text-xl font-bold mb-2 text-gray-900 dark:text-white'>Changelog v{user?.currentVersion}</h2>

              <button
                onClick={handleGoToChangelog}
                className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors'
              >
                View Changelog
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
