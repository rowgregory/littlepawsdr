import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useDashboardSelector, useUserSelector } from '../../redux/toolkitStore';
import { setCloseChangelogModal } from '../../redux/features/dashboardSlice';
import { useUpdateLastSeenChangelogVersionMutation } from '../../redux/services/userApi';
import { ArrowRight } from 'lucide-react';

export const ChangelogModal = () => {
  const navigate = useNavigate();
  const { changelogModal } = useDashboardSelector();
  const { currentVersion } = useUserSelector();
  const dispatch = useAppDispatch();
  const [updateLastSeenChangelogVersion, { isLoading }] =
    useUpdateLastSeenChangelogVersionMutation();

  const handleGoToChangelog = async () => {
    try {
      await updateLastSeenChangelogVersion({ currentVersion }).unwrap();
    } finally {
      dispatch(setCloseChangelogModal());
      navigate('/admin/changelog');
    }
  };

  return (
    <AnimatePresence>
      {changelogModal && (
        <>
          {/* Overlay */}
          <motion.div
            className='fixed inset-0 bg-black/40 backdrop-blur-md z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className='fixed inset-0 flex items-center justify-center z-50 px-4'
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className='bg-white rounded-xl max-w-md w-full shadow-2xl border border-gray-100'>
              {/* Header */}
              <div className='px-6 py-8 border-b border-gray-100'>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <h2 className='text-2xl font-bold text-gray-900 mb-1'>What's New</h2>
                    <p className='text-sm text-gray-600'>Version {currentVersion}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className='px-6 py-6'>
                <p className='text-gray-600 text-sm leading-relaxed mb-6'>
                  Check out the latest features, improvements, and bug fixes in this release.
                </p>
              </div>

              {/* Footer */}
              <div className='px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100 flex gap-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoToChangelog}
                  disabled={isLoading}
                  className='flex-1 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center gap-2'
                >
                  {isLoading ? (
                    <>
                      <div className='border-white border-2 border-t-transparent rounded-full animate-spin w-4 h-4' />
                      Loading...
                    </>
                  ) : (
                    <>
                      View Changelog
                      <ArrowRight className='w-4 h-4' />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
