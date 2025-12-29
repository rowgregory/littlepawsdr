import { motion, AnimatePresence } from 'framer-motion';
import { X, Gavel, AlertTriangle, Clock, DollarSign, Shield } from 'lucide-react';
import { useAppDispatch, useAuctionSelector } from '../../redux/toolkitStore';
import {
  setCloseQuickBidModal,
  setConfirmedBidAmount,
  setOffConfettiPop,
  setOnConfettiPop,
  setOpenConfirmBidModal,
} from '../../redux/features/auctionSlice';
import { usePlaceBidMutation } from '../../redux/services/auctionApi';
import { showToast } from '../../redux/features/toastSlice';
import { useTimeUntil } from '../../hooks/useUntilTime';

const QuickBidModal = () => {
  const { auction, quickBidModal, auctionItem } = useAuctionSelector();
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(setCloseQuickBidModal());
  const [placeBid, { isLoading }] = usePlaceBidMutation();
  const timeLeft = useTimeUntil(auction?.endDate);

  const handlePlaceBid = async (e: any) => {
    e.preventDefault();

    try {
      const { confirmedBidAmount } = await placeBid({
        auctionItemId: auctionItem?._id,
        auctionId: auction?._id,
        bidAmount: auctionItem.currentBid + 10,
        customAuctionLink: auction?.customAuctionLink,
      }).unwrap();

      dispatch(setConfirmedBidAmount(confirmedBidAmount));
      dispatch(setOpenConfirmBidModal());
      dispatch(setCloseQuickBidModal());
      dispatch(setOnConfettiPop());

      setTimeout(() => {
        dispatch(setOffConfettiPop());
      }, 3000);
    } catch {
      dispatch(showToast({ message: 'Failed to place bid', type: 'error' }));
    }
  };

  return (
    <AnimatePresence>
      {quickBidModal && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          initial={{
            backdropFilter: 'blur(0px)',
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }}
          animate={{
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
          exit={{
            backdropFilter: 'blur(0px)',
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className='relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full'
            initial={{
              scale: 0.8,
              opacity: 0,
              y: 50,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
              y: 30,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white relative'>
              <button
                onClick={onClose}
                className='absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors'
              >
                <X className='w-4 h-4' />
              </button>

              <div className='flex items-center space-x-3 mb-2'>
                <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center'>
                  <Gavel className='w-6 h-6' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold'>Confirm Your Bid</h2>
                  <p className='text-white/80 text-sm'>Review before placing bid</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className='p-6'>
              {/* Item Preview */}
              <div className='flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl'>
                <div className='w-16 h-16 rounded-lg overflow-hidden bg-gray-200'>
                  <img
                    src={auctionItem.photos[0].url}
                    alt={auctionItem?.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='font-bold text-gray-800 text-lg'>{auctionItem?.name}</h3>
                  <div className='flex items-center space-x-4 text-sm text-gray-600 mt-1'>
                    <div className='flex items-center space-x-1'>
                      <Clock className='w-3 h-3' />
                      <span>{timeLeft}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <DollarSign className='w-3 h-3' />
                      <span>Current: ${auctionItem?.currentBid.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bid Details */}
              <div className='space-y-4 mb-6'>
                <div className='bg-blue-50 border border-blue-200 rounded-xl p-4'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-gray-600 font-medium'>Your Bid Amount:</span>
                    <span className='text-2xl font-black text-blue-600'>
                      ${(auctionItem.currentBid + 10).toLocaleString()}
                    </span>
                  </div>
                  <p className='text-sm text-gray-500'>This will become the new highest bid</p>
                </div>

                {/* Important Notice */}
                <div className='bg-red-50 border border-red-200 rounded-xl p-4'>
                  <div className='flex flex-col sm:flex-row sm:items-start space-x-3'>
                    <AlertTriangle className='w-5 h-5 text-red-500 mt-0.5 flex-shrink-0 flex self-center mb-3 sm:block sm:mb-0' />
                    <div>
                      <h4 className='font-semibold text-red-800 mb-1 text-center sm:text-left'>
                        Important Notice
                      </h4>
                      <ul className='text-sm text-red-700 space-y-1'>
                        <li>• All bids are final and cannot be retracted</li>
                        <li>• You're committed to purchase if you win</li>
                        <li>• Payment will be required upon winning</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className='flex items-center justify-center space-x-2 text-sm text-gray-500'>
                  <Shield className='w-4 h-4' />
                  <span>Secure bidding protected by encryption</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-y-3 sm:gap-x-3'>
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className='order-2 sm:order-1 flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors disabled:cursor-not-allowed'
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceBid}
                  disabled={isLoading}
                  className='order-1 sm:order-2 flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2'
                >
                  {isLoading ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                      <span>Placing ${auctionItem.currentBid + 10} Bid...</span>
                    </>
                  ) : (
                    <>
                      <Gavel className='w-4 h-4' />
                      <span>Confirm ${auctionItem.currentBid + 10} Bid</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickBidModal;
