import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const CreateAuctionModal = ({
  show,
  handleClose,
  text,
  setText,
  handleCreateAuction,
  loadingCreate,
}: any) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className='fixed inset-0 bg-black/40 backdrop-blur-md z-[60]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className='fixed inset-0 flex items-center justify-center z-50 px-4'
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='bg-white rounded-xl max-w-md w-full shadow-2xl border border-gray-100'>
              {/* Header */}
              <div className='px-6 py-8 border-b border-gray-100'>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <h2 className='text-2xl font-bold text-gray-900 mb-1'>Create Auction</h2>
                    <p className='text-sm text-gray-600'>Start a new fundraising auction</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                  >
                    <X className='w-5 h-5 text-gray-600' />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <form onSubmit={handleCreateAuction} className='px-6 py-6 space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-2'>
                    Auction Title
                  </label>
                  <motion.input
                    type='text'
                    placeholder='Enter auction title...'
                    value={text || ''}
                    onChange={(e: any) => setText(e.target.value)}
                    required
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder-gray-500'
                    whileFocus={{
                      scale: 1.01,
                    }}
                  />
                  <p className='text-xs text-gray-500 mt-1.5'>
                    This will be visible to the public and bidders
                  </p>
                </div>
              </form>

              {/* Footer */}
              <div className='px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100 flex gap-3'>
                <button
                  onClick={handleClose}
                  className='flex-1 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 font-medium rounded-lg transition-colors text-sm'
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateAuction}
                  disabled={loadingCreate || !text?.trim()}
                  type='submit'
                  className='flex-1 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center gap-2'
                >
                  {loadingCreate ? (
                    <>
                      <motion.div
                        className='border-white border-2 border-t-transparent rounded-full animate-spin w-4 h-4'
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className='w-4 h-4' />
                      Create Auction
                    </>
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

export default CreateAuctionModal;
