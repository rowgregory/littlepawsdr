import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const DeleteModal = ({ type, id, deleteDocument, loading, hook }: any) => {
  const getAction = async () =>
    await deleteDocument({ id })
      .unwrap()
      .then(() => hook.closeModal());

  return (
    <AnimatePresence>
      {hook.show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/40 backdrop-blur-md z-[60] flex items-center justify-center p-4'
          onClick={() => hook.closeModal()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className='bg-white rounded-lg max-w-sm w-full shadow-2xl border border-gray-100'
          >
            <div className='p-6 space-y-6 flex flex-col items-center text-center'>
              {/* Icon */}
              <div className='w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center'>
                <AlertCircle className='w-6 h-6 text-red-600' />
              </div>

              {/* Text */}
              <div className='space-y-2'>
                <h2 className='text-lg font-bold text-gray-900'>Delete {type}?</h2>
                <p className='text-sm text-gray-600'>
                  This will permanently delete {type.toLowerCase()}. This action cannot be undone.
                </p>
              </div>

              {/* Buttons */}
              <div className='flex items-center gap-3 w-full pt-4'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={hook.closeModal}
                  className='flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors'
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={getAction}
                  disabled={loading}
                  className='flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2'
                >
                  {loading ? (
                    <>
                      <motion.div
                        className='w-4 h-4 border-2 border-white border-t-transparent rounded-full'
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;
