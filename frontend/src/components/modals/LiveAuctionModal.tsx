import { useAppDispatch, useAuctionSelector, useUserSelector } from '../../redux/toolkitStore';
import {
  closeAuctionModal,
  saveHasHandledAuctionModalToLocalStorage,
  setOpenLiveAuctionModal,
} from '../../redux/features/auctionSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimeUntil } from '../../hooks/useUntilTime';
import { Clock, Target, Gavel, X } from 'lucide-react';
import { useTrackAuctionModalButtonClickMutation } from '../../redux/services/auctionApi';
import { AnimatePresence, motion } from 'framer-motion';
import { containerVariants, contentVariants, itemVariants } from '../../lib/constants/motion';

const LiveAuctionModal = () => {
  const dispatch = useAppDispatch();
  const { user } = useUserSelector();
  const { auction, isLiveAuction } = useAuctionSelector();
  const setClose = () => dispatch(closeAuctionModal());
  const [trackClick] = useTrackAuctionModalButtonClickMutation();
  const navigate = useNavigate();
  const timeUntil = useTimeUntil(auction?.endDate);

  // Check localStorage before determining if modal should open
  const hasHandledAuctionModal = localStorage.getItem('handledAuctionModal') === 'true';
  const shouldShowModal = auction?.status === 'ACTIVE' && !hasHandledAuctionModal;

  useEffect(() => {
    if (!shouldShowModal) return;
    dispatch(setOpenLiveAuctionModal());
  }, [dispatch, hasHandledAuctionModal, shouldShowModal]);

  return (
    <AnimatePresence>
      {isLiveAuction && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm'
            onClick={setClose}
          />

          {/* Modal */}
          <div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
            <motion.div
              className='relative max-w-lg w-full mx-auto'
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <div className='bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl overflow-hidden'>
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={setClose}
                  className='absolute top-4 right-4 z-20 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300'
                >
                  <X className='w-4 h-4' />
                </motion.button>

                {/* Header */}
                <motion.div
                  className='relative bg-gradient-to-r from-red-500 to-pink-600 p-6 text-center'
                  variants={contentVariants}
                  initial='hidden'
                  animate='visible'
                >
                  <div className='flex justify-center items-center gap-2 mb-3'>
                    <motion.div
                      className='w-2 h-2 bg-green-400 rounded-full'
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className='text-white font-semibold text-sm uppercase tracking-wide'>
                      Live Auction
                    </span>
                  </div>
                  <h1 className='text-3xl font-bold text-white mb-2'>
                    Join the {auction?.title} Auction
                  </h1>
                  <p className='text-white/90'>Help rescue dogs while bidding on amazing items</p>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className='bg-black/20 px-6 py-4'
                  variants={contentVariants}
                  initial='hidden'
                  animate='visible'
                >
                  <div className='grid grid-cols-3 gap-4 text-center text-white'>
                    {[
                      { label: 'Status', value: 'LIVE', color: 'text-yellow-300', icon: true },
                      { label: 'Goal', value: `$${auction?.goal}`, color: 'text-green-300' },
                      { label: 'Items', value: auction?.items?.length, color: 'text-blue-300' },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={itemVariants}
                        initial='hidden'
                        animate='visible'
                      >
                        <div
                          className={`text-xl font-bold ${stat.color} flex items-center justify-center gap-1`}
                        >
                          {stat.icon && (
                            <motion.div
                              className='w-2 h-2 bg-green-400 rounded-full'
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}
                          {stat.value}
                        </div>
                        <div className='text-xs opacity-80'>{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  className='p-6'
                  variants={contentVariants}
                  initial='hidden'
                  animate='visible'
                >
                  <motion.div
                    className='text-center mb-6'
                    custom={0}
                    variants={itemVariants}
                    initial='hidden'
                    animate='visible'
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Target className='w-12 h-12 text-white mx-auto mb-4' />
                    </motion.div>
                    <h2 className='text-xl font-bold text-white mb-3'>Don't Miss Out</h2>
                    <p className='text-white/90 leading-relaxed'>
                      Join our{' '}
                      <span className='font-bold text-yellow-300'>{auction?.title} auction</span>{' '}
                      and bid on premium items while supporting animal rescue efforts. Every bid
                      helps save lives.
                    </p>
                  </motion.div>

                  {/* Urgency timer */}
                  <motion.div
                    className='bg-white/10 rounded-lg p-4 mb-6 text-center'
                    custom={1}
                    variants={itemVariants}
                    initial='hidden'
                    animate='visible'
                  >
                    <div className='flex items-center justify-center gap-2 text-yellow-300 font-bold mb-1'>
                      <Clock className='w-4 h-4' />
                      Ends in {timeUntil}
                    </div>
                    <p className='text-white/80 text-sm'>Limited time remaining</p>
                  </motion.div>

                  {/* Action button */}
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 30px rgba(0,0,0,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      trackClick(auction?._id);
                      dispatch(saveHasHandledAuctionModalToLocalStorage());
                      setClose();
                      navigate(
                        user?._id && user?.hasAddress
                          ? `/auctions/${auction?.customAuctionLink}`
                          : user?._id && !user?.hasAddress
                          ? '/supporter/profile'
                          : `/auth/register?customAuctionLink=${auction?.customAuctionLink}&conversionSource=live_auction_modal`
                      );
                    }}
                    className='w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg'
                    custom={2}
                    variants={itemVariants}
                    initial='hidden'
                    animate='visible'
                  >
                    <div className='flex items-center justify-center gap-2'>
                      <Gavel className='w-5 h-5' />
                      Start Bidding Now
                    </div>
                  </motion.button>

                  {/* Trust indicators */}
                  <motion.div
                    className='mt-4 grid grid-cols-2 gap-3 text-white/80 text-sm'
                    custom={3}
                    variants={itemVariants}
                    initial='hidden'
                    animate='visible'
                  >
                    {['Secure Bidding', 'No Hidden Fees', 'Instant Access', 'Help Animals'].map(
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
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LiveAuctionModal;
