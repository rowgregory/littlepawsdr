import { useAppDispatch, useAuctionSelector, useUserSelector } from '../../redux/toolkitStore';
import {
  closeAuctionModal,
  saveHasHandledAuctionModalToLocalStorage,
  setOpenLiveAuctionModal,
} from '../../redux/features/auctionSlice';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimeUntil } from '../../hooks/useUntilTime';
import { Clock, Target, Gavel, X, Check } from 'lucide-react';
import { useTrackAuctionModalButtonClickMutation } from '../../redux/services/auctionApi';
import { AnimatePresence, motion } from 'framer-motion';

const LiveAuctionModal = () => {
  const dispatch = useAppDispatch();
  const { user } = useUserSelector();
  const { auction, isLiveAuction } = useAuctionSelector();
  const setClose = useCallback(() => dispatch(closeAuctionModal()), [dispatch]);
  const [trackClick] = useTrackAuctionModalButtonClickMutation();
  const navigate = useNavigate();
  const timeUntil = useTimeUntil(auction?.endDate);

  const hasHandledAuctionModal = false;
  // const hasHandledAuctionModal = localStorage.getItem('handledAuctionModal') === 'true';
  const shouldShowModal = auction?.status === 'ACTIVE' && !hasHandledAuctionModal;

  useEffect(() => {
    if (!shouldShowModal) return;
    dispatch(setOpenLiveAuctionModal());
  }, [dispatch, shouldShowModal]);

  // Close on Escape
  useEffect(() => {
    if (!isLiveAuction) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLiveAuction, setClose]);

  const handleStart = () => {
    trackClick(auction?._id);
    dispatch(saveHasHandledAuctionModalToLocalStorage());
    setClose();
    navigate(
      user?._id && user?.hasAddress
        ? `/auctions/${auction?.customAuctionLink}`
        : user?._id && !user?.hasAddress
          ? '/supporter/profile'
          : `/auth/register?customAuctionLink=${auction?.customAuctionLink}&conversionSource=live_auction_modal`,
    );
  };

  const stats = [
    { label: 'Status', value: 'Live', isLive: true },
    { label: 'Goal', value: `$${(auction?.goal ?? 0).toLocaleString()}` },
    { label: 'Items', value: auction?.items?.length ?? 0 },
  ];

  const trustIndicators = ['Secure Bidding', 'No Hidden Fees', 'Instant Access', 'Help Animals'];

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
            className='fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm'
            onClick={setClose}
            aria-hidden='true'
          />

          {/* Modal */}
          <div className='fixed inset-0 z-[121] flex items-center justify-center p-3 sm:p-4'>
            <motion.div
              role='dialog'
              aria-modal='true'
              aria-labelledby='live-auction-title'
              className='relative max-w-md w-full mx-auto max-h-[90dvh] overflow-y-auto'
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
            >
              <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden'>
                {/* Close */}
                <button
                  type='button'
                  onClick={setClose}
                  aria-label='Close'
                  className='absolute top-3 right-3 z-20 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                >
                  <X className='w-4 h-4' aria-hidden='true' />
                </button>

                {/* Header */}
                <div className='relative bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-pink-600/40 border-b border-white/10 p-5 sm:p-6 text-center'>
                  <div className='inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/10 border border-white/20'>
                    <span className='relative flex w-2 h-2' aria-hidden='true'>
                      <span className='motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75' />
                      <span className='relative inline-flex rounded-full h-2 w-2 bg-green-400' />
                    </span>
                    <span className='text-white font-semibold text-xs uppercase tracking-wide'>
                      Live Auction
                    </span>
                  </div>
                  <h1
                    id='live-auction-title'
                    className='text-2xl sm:text-3xl font-bold text-white mb-1.5'
                  >
                    Join the {auction?.title} Auction
                  </h1>
                  <p className='text-white/80 text-sm'>
                    Help rescue dogs while bidding on amazing items
                  </p>
                </div>

                {/* Stats */}
                <div className='bg-black/20 px-5 sm:px-6 py-4 border-b border-white/10'>
                  <div className='grid grid-cols-3 gap-3 text-center text-white'>
                    {stats.map((stat) => (
                      <div key={stat.label}>
                        <div className='text-lg sm:text-xl font-bold flex items-center justify-center gap-1 tabular-nums'>
                          {stat.isLive && (
                            <span
                              className='w-2 h-2 bg-green-400 rounded-full'
                              aria-hidden='true'
                            />
                          )}
                          {stat.value}
                        </div>
                        <div className='text-xs text-white/60 mt-0.5'>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className='p-5 sm:p-6'>
                  <div className='text-center mb-5'>
                    <div className='w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                      <Target className='w-6 h-6 text-white' aria-hidden='true' />
                    </div>
                    <h2 className='text-lg font-bold text-white mb-2'>Don&rsquo;t Miss Out</h2>
                    <p className='text-white/80 text-sm leading-relaxed'>
                      Bid on premium items in the{' '}
                      <span className='font-semibold text-yellow-300'>{auction?.title}</span>{' '}
                      auction while supporting animal rescue. Every bid helps save lives.
                    </p>
                  </div>

                  {/* Timer */}
                  <div className='bg-white/5 border border-white/10 rounded-xl p-3.5 mb-5 text-center'>
                    <div className='flex items-center justify-center gap-2 text-yellow-300 font-bold text-sm mb-0.5'>
                      <Clock className='w-4 h-4' aria-hidden='true' />
                      Ends in {timeUntil}
                    </div>
                    <p className='text-white/60 text-xs'>Limited time remaining</p>
                  </div>

                  {/* CTA */}
                  <button
                    type='button'
                    onClick={handleStart}
                    className='w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                  >
                    <Gavel className='w-5 h-5' aria-hidden='true' />
                    Start Bidding Now
                  </button>

                  {/* Trust indicators */}
                  <ul className='mt-4 grid grid-cols-2 gap-2.5 text-white/70 text-sm'>
                    {trustIndicators.map((indicator) => (
                      <li key={indicator} className='flex items-center gap-2'>
                        <Check className='w-3.5 h-3.5 text-green-400 shrink-0' aria-hidden='true' />
                        {indicator}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LiveAuctionModal;
