import { useAppDispatch, useAuctionSelector, useFormSelector } from '../../redux/toolkitStore';
import Modal from '../common/Modal';
import { createFormActions } from '../../redux/features/form/formSlice';
import { motion } from 'framer-motion';
import { X, TrendingUp, Target, DollarSign, AlertCircle } from 'lucide-react';
import { usePlaceBidMutation } from '../../redux/services/auctionApi';
import {
  setCloseBidModal,
  setConfirmedBidAmount,
  setOffConfettiPop,
  setOnConfettiPop,
  setOpenConfirmBidModal,
} from '../../redux/features/auctionSlice';
import { useCallback, useEffect, useState } from 'react';

const BidModal = () => {
  const dispatch = useAppDispatch();
  const { auction, auctionItem, bidModal } = useAuctionSelector();
  const { handleInput } = createFormActions('bidForm', dispatch);
  const { bidForm } = useFormSelector();
  const [placeBid, { isLoading: loadingPlacingBid }] = usePlaceBidMutation();
  const inputs = bidForm?.inputs;

  const [error, setError] = useState<string | null>(null);

  const onClose = useCallback(() => {
    setError(null);
    dispatch(setCloseBidModal());
  }, [dispatch]);

  // Close on Escape
  useEffect(() => {
    if (!bidModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [bidModal, onClose]);

  const bidAmount = Number(inputs?.bidAmount ?? 0);
  const minBid = Number(auctionItem?.minimumBid ?? auctionItem?.startingPrice ?? 0);
  const belowMin = bidAmount > 0 && bidAmount < minBid;
  const canSubmit = bidAmount >= minBid && !loadingPlacingBid;

  const handlePlaceBid = async (e: any) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await placeBid({
        auctionItemId: auctionItem?._id,
        auctionId: auction?._id,
        bidAmount: bidAmount,
        customAuctionLink: auction?.customAuctionLink,
      }).unwrap();

      dispatch(setOnConfettiPop());
      dispatch(setCloseBidModal());
      dispatch(setConfirmedBidAmount(response.confirmedBidAmount));
      dispatch(setOpenConfirmBidModal());

      setTimeout(() => {
        dispatch(setOffConfettiPop());
      }, 3000);
    } catch (err: any) {
      // Surface the server's actual reason (e.g. 409 "Someone placed a higher bid")
      setError(err?.data?.message || 'Failed to place bid. Please try again.');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xl z-[101] transition-opacity duration-300 ${
          bidModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden='true'
      />

      <Modal show={bidModal} onClose={onClose}>
        <div className='fixed inset-0 z-[102] flex items-center justify-center p-3 sm:p-4'>
          <motion.div
            role='dialog'
            aria-modal='true'
            aria-labelledby='bid-modal-title'
            className='relative max-w-lg w-full mx-auto'
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: bidModal ? 1 : 0.95, opacity: bidModal ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className='bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 relative overflow-hidden'>
              <div
                className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl'
                aria-hidden='true'
              />

              <div className='relative z-10'>
                {/* Header */}
                <div className='flex items-center justify-between mb-5 sm:mb-6'>
                  <div className='flex items-center gap-2.5 min-w-0'>
                    <div className='w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0'>
                      <TrendingUp className='w-5 h-5 text-white' aria-hidden='true' />
                    </div>
                    <h2
                      id='bid-modal-title'
                      className='text-xl sm:text-2xl font-bold text-white truncate'
                    >
                      Place Your Bid
                    </h2>
                  </div>
                  <button
                    type='button'
                    onClick={onClose}
                    aria-label='Close'
                    className='w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                  >
                    <X className='w-5 h-5 text-white' aria-hidden='true' />
                  </button>
                </div>

                <form onSubmit={handlePlaceBid} className='space-y-5' noValidate>
                  {/* Bid info */}
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10'>
                      <div className='flex items-center gap-1.5 mb-1.5'>
                        <DollarSign className='w-4 h-4 text-green-300' aria-hidden='true' />
                        <p className='text-xs font-medium text-green-200'>Current Bid</p>
                      </div>
                      <p className='text-lg font-bold text-white tabular-nums'>
                        {auctionItem?.totalBids === 0
                          ? 'No bids yet'
                          : `$${auctionItem?.currentBid?.toLocaleString()}`}
                      </p>
                    </div>

                    <div className='bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10'>
                      <div className='flex items-center gap-1.5 mb-1.5'>
                        <Target className='w-4 h-4 text-yellow-300' aria-hidden='true' />
                        <p className='text-xs font-medium text-yellow-200'>Minimum Bid</p>
                      </div>
                      <p className='text-lg font-bold text-white tabular-nums'>
                        ${minBid.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Bid input */}
                  <div className='space-y-2'>
                    <label
                      htmlFor='bid-amount'
                      className='block text-base font-semibold text-white'
                    >
                      Enter your bid amount
                    </label>

                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                        <span className='text-xl font-bold text-yellow-400' aria-hidden='true'>
                          $
                        </span>
                      </div>

                      <input
                        id='bid-amount'
                        type='number'
                        name='bidAmount'
                        inputMode='decimal'
                        min={minBid}
                        step='1'
                        onChange={handleInput}
                        placeholder={minBid.toString()}
                        value={inputs?.bidAmount || ''}
                        aria-invalid={belowMin}
                        aria-describedby={belowMin ? 'bid-error' : undefined}
                        autoFocus
                        className='w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-3.5 pl-11 pr-4 text-xl font-bold text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors'
                      />
                    </div>

                    {/* Inline minimum-bid validation */}
                    {belowMin && (
                      <p id='bid-error' role='alert' className='text-red-300 text-sm'>
                        Bid must be at least ${minBid.toLocaleString()}.
                      </p>
                    )}
                  </div>

                  {/* Inline server error (e.g. outbid 409) */}
                  {error && (
                    <div
                      role='alert'
                      className='flex items-start gap-2 border border-red-400/40 bg-red-500/10 text-red-200 px-3.5 py-2.5 rounded-xl text-sm'
                    >
                      <AlertCircle className='w-4 h-4 mt-0.5 shrink-0' aria-hidden='true' />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className='flex flex-col sm:flex-row gap-3 pt-1'>
                    <button
                      type='button'
                      onClick={onClose}
                      className='order-2 sm:order-1 flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl py-3.5 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    >
                      Cancel
                    </button>

                    <button
                      type='submit'
                      disabled={!canSubmit}
                      className='order-1 sm:order-2 flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl py-3.5 font-semibold transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    >
                      {loadingPlacingBid && (
                        <span
                          className='rounded-full h-5 w-5 border-2 border-white border-t-transparent motion-safe:animate-spin'
                          aria-hidden='true'
                        />
                      )}
                      <span>
                        {loadingPlacingBid
                          ? 'Placing Bid…'
                          : bidAmount > 0
                            ? `Place $${bidAmount.toLocaleString()} Bid`
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
