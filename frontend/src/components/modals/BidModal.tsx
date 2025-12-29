import { useAppDispatch, useAuctionSelector, useFormSelector } from '../../redux/toolkitStore';
import Modal from '../common/Modal';
import { createFormActions } from '../../redux/features/form/formSlice';
import { motion } from 'framer-motion';
import { X, TrendingUp, Target, DollarSign } from 'lucide-react';
import { usePlaceBidMutation } from '../../redux/services/auctionApi';
import {
  setCloseBidModal,
  setConfirmedBidAmount,
  setOffConfettiPop,
  setOnConfettiPop,
  setOpenConfirmBidModal,
} from '../../redux/features/auctionSlice';
import { showToast } from '../../redux/features/toastSlice';

const BidModal = () => {
  const dispatch = useAppDispatch();
  const { auction, auctionItem, bidModal } = useAuctionSelector();
  const { handleInput } = createFormActions('bidForm', dispatch);
  const { bidForm } = useFormSelector();
  const [placeBid, { isLoading: loadingPlacingBid }] = usePlaceBidMutation();
  const inputs = bidForm?.inputs;

  const onClose = () => dispatch(setCloseBidModal());

  const handlePlaceBid = async (e: any) => {
    e.preventDefault();

    try {
      const response = await placeBid({
        auctionItemId: auctionItem?._id,
        auctionId: auction?._id,
        bidAmount: inputs.bidAmount,
        customAuctionLink: auction?.customAuctionLink,
      }).unwrap();

      dispatch(setOnConfettiPop());
      dispatch(setCloseBidModal());
      dispatch(setConfirmedBidAmount(response.confirmedBidAmount));
      dispatch(setOpenConfirmBidModal());

      setTimeout(() => {
        dispatch(setOffConfettiPop());
      }, 3000);
    } catch {
      dispatch(showToast({ message: 'Failed to place bid', type: 'error' }));
    }
  };

  const bidAmount = inputs?.bidAmount ?? 0;
  const minBid = auctionItem?.minimumBid ?? auctionItem?.startingPrice ?? 0;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xl z-[101] transition-opacity duration-300 ${
          bidModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: bidModal ? 1 : 0 }}
      />

      <Modal show={bidModal} onClose={onClose}>
        <div className='fixed inset-0 z-[102] flex items-center justify-center'>
          <motion.div
            className='relative max-w-lg w-full mx-auto'
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{
              scale: bidModal ? 1 : 0.8,
              opacity: bidModal ? 1 : 0,
              y: bidModal ? 0 : 50,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/20 relative overflow-hidden'>
              {/* Subtle background gradient */}
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl'></div>

              <div className='relative z-10'>
                {/* Header */}
                <div className='flex items-center justify-between mb-8'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
                      <TrendingUp className='w-5 h-5 text-white' />
                    </div>
                    <h2 className='text-2xl font-bold text-white'>Place Your Bid</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className='w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:rotate-90'
                  >
                    <X className='w-5 h-5 text-white' />
                  </button>
                </div>

                <form onSubmit={handlePlaceBid} className='space-y-6'>
                  {/* Bid Information */}
                  <div className='grid sm:grid-cols-2 gap-4'>
                    <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10'>
                      <div className='flex items-center space-x-2 mb-2'>
                        <DollarSign className='w-4 h-4 text-green-400' />
                        <p className='text-sm font-medium text-green-300'>Current Bid</p>
                      </div>
                      <p className='text-xl font-bold text-white'>
                        {auctionItem?.totalBids === 0
                          ? 'No bids yet'
                          : `$${auctionItem?.currentBid?.toLocaleString()}`}
                      </p>
                    </div>

                    <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10'>
                      <div className='flex items-center space-x-2 mb-2'>
                        <Target className='w-4 h-4 text-yellow-400' />
                        <p className='text-sm font-medium text-yellow-300'>Minimum Bid</p>
                      </div>
                      <p className='text-xl font-bold text-white'>
                        ${(auctionItem?.minimumBid || auctionItem?.startingPrice)?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Bid Input */}
                  <div className='space-y-3'>
                    <label className='block text-lg font-semibold text-white'>
                      Enter your bid amount
                    </label>

                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                        <span className='text-2xl font-bold text-yellow-400'>$</span>
                      </div>

                      <input
                        type='number'
                        name='bidAmount'
                        min={auctionItem?.startingPrice}
                        onChange={handleInput}
                        placeholder={(
                          auctionItem?.minimumBid || auctionItem?.startingPrice
                        )?.toString()}
                        className='w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-2xl font-bold text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200'
                        value={inputs?.bidAmount || ''}
                      />
                    </div>

                    {/* Validation message */}
                    {(inputs?.bidAmount ?? 0) <
                      (auctionItem?.minimumBid ?? auctionItem?.startingPrice ?? 0) && (
                      <motion.p
                        className='text-red-400 text-sm'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        Bid must be at least $
                        {(
                          auctionItem?.minimumBid ??
                          auctionItem?.startingPrice ??
                          0
                        ).toLocaleString()}
                      </motion.p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className='flex flex-col sm:flex-row gap-y-4 sm:gap-x-4 pt-4'>
                    <button
                      type='button'
                      onClick={onClose}
                      className='order-2 sm:order-1flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl py-4 font-semibold transition-all duration-200 hover:scale-105'
                    >
                      Cancel
                    </button>

                    <button
                      type='submit'
                      disabled={bidAmount === 0 || bidAmount < minBid || loadingPlacingBid}
                      className='order-1 sm:order-2 flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-2xl py-4 font-semibold transition-all duration-200 hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-2'
                    >
                      {loadingPlacingBid && (
                        <div className='animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent'></div>
                      )}
                      <span>
                        {loadingPlacingBid
                          ? 'Placing Bid...'
                          : inputs?.bidAmount
                          ? `Place $${inputs?.bidAmount?.toLocaleString()} Bid`
                          : 'Place Bid'}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </Modal>
    </>
  );
};

export default BidModal;
