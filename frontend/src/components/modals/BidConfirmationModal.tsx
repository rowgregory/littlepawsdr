import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useAppDispatch, useAuctionSelector } from '../../redux/toolkitStore';
import { setCloseConfirmBidModal } from '../../redux/features/auctionSlice';

const BidConfirmationModal = () => {
  const dispatch = useAppDispatch();
  const { confirmedBidAmount, confirmBidModal } = useAuctionSelector();

  const onClose = () => dispatch(setCloseConfirmBidModal());

  return (
    <AnimatePresence>
      {confirmBidModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <motion.div
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className='relative max-w-md w-full mx-auto p-4'
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{
              scale: confirmBidModal ? 1 : 0.8,
              opacity: confirmBidModal ? 1 : 0,
              y: confirmBidModal ? 0 : 50,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/20 relative overflow-hidden'>
              {/* Subtle success gradient */}
              <div className='absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-3xl' />

              <div className='relative z-10 text-center space-y-6'>
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className='flex justify-center'
                >
                  <div className='w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg'>
                    <CheckCircle2 className='w-8 h-8 text-white' />
                  </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className='text-2xl font-bold text-white mb-2'>Bid Confirmed!</h2>
                  <p className='text-white/70 text-sm leading-relaxed'>
                    Your bid has been successfully placed. You can track your bids in your profile
                    dashboard.
                  </p>
                </motion.div>

                {/* Bid Amount */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className='bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10'
                >
                  <p className='text-green-300 text-sm font-medium mb-1'>Your Bid</p>
                  <p className='text-3xl font-bold text-white'>${confirmedBidAmount ?? '0'}</p>
                </motion.div>

                {/* Action Button */}
                <motion.button
                  onClick={onClose}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-2xl py-4 transition-all duration-200 flex items-center justify-center space-x-2 group'
                >
                  <span>Back to Auction</span>
                  <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                </motion.button>

                {/* Status Indicators */}
                <motion.div
                  className='flex justify-center space-x-6 text-xs text-white/60'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className='flex items-center space-x-1'>
                    <div className='w-2 h-2 bg-green-400 rounded-full' />
                    <span>Confirmed</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <div className='w-2 h-2 bg-blue-400 rounded-full' />
                    <span>In Competition</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BidConfirmationModal;
