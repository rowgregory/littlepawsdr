import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useAppDispatch, useAuctionSelector } from '../../redux/toolkitStore';
import { setCloseAuctionCompleteModal } from '../../redux/features/auctionSlice';

export function AuctionCompleteModal() {
  const { auctionCompleteModal, auction } = useAuctionSelector();
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(setCloseAuctionCompleteModal());

  return (
    <AnimatePresence>
      {auctionCompleteModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm'
            onClick={onClose}
          />

          {/* Modal */}
          <div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
            <motion.div
              className='relative w-full max-w-md bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl overflow-hidden'
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className='absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300'
              >
                <X className='w-4 h-4' />
              </motion.button>

              {/* Header */}
              <motion.div
                className='relative bg-gradient-to-r from-green-500 to-teal-600 p-6 text-center'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className='flex justify-center items-center gap-2 mb-3'>
                  <motion.div
                    className='w-2 h-2 bg-white rounded-full'
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className='text-white font-semibold text-sm uppercase tracking-wide'>
                    Auction Ended
                  </span>
                </div>
                <h1 className='text-3xl font-bold text-white mb-2'>Auction Complete</h1>
                <p className='text-white/90'>Thank you for participating</p>
              </motion.div>

              {/* Stats */}
              <motion.div
                className='bg-black/20 px-6 py-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <div className='text-center text-white'>
                  {auction?.title && (
                    <div>
                      <p className='text-xs opacity-80 mb-1 uppercase tracking-wide'>Auction</p>
                      <p className='text-lg font-bold'>{auction.title}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                className='p-6 space-y-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Checkmark Icon */}
                <motion.div
                  className='flex justify-center'
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle className='w-16 h-16 text-white' />
                </motion.div>

                {/* Message */}
                <motion.p
                  className='text-center text-white/90 text-sm leading-relaxed'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  All participants have been notified. Thank you for supporting our rescue mission.
                </motion.p>

                {/* Payment Info */}
                <motion.div
                  className='bg-white/10 rounded-lg p-4 text-center'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className='text-white/80 text-xs'>
                    Winners will receive payment instructions via email
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className='space-y-3 sm:flex sm:gap-3 sm:space-y-0'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className='w-full sm:flex-1 px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors'
                  >
                    Close
                  </motion.button>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  className='grid grid-cols-2 gap-2 text-white/80 text-xs'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {['Secure Payment', 'Instant Notification', 'No Hidden Fees', 'Help Animals'].map(
                    (indicator, index) => (
                      <motion.div
                        key={index}
                        className='flex items-center gap-2'
                        whileHover={{ x: 5 }}
                      >
                        <div className='w-2 h-2 bg-green-400 rounded-full' />
                        {indicator}
                      </motion.div>
                    )
                  )}
                </motion.div>
              </motion.div>

              {/* Top accent line */}
              <motion.div
                className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400'
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ originX: 0 }}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AuctionCompleteModal;
