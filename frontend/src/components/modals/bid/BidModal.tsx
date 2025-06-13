import { RootState, useAppDispatch, useAppSelector } from '../../../redux/toolkitStore';
import Modal from '../../common/Modal';
import { createFormActions, setInputs } from '../../../redux/features/form/formSlice';
import { useEffect } from 'react';
import { usePlaceBidMutation } from '../../../redux/services/campaignApi';
import { motion } from 'framer-motion';
import { X, TrendingUp, Target, DollarSign } from 'lucide-react';

const BidModal = ({ openBidModal, handleClose, campaign, auctionItem, setOpenConfirmationModal }: any) => {
  const dispatch = useAppDispatch();

  const [placeBid, { isLoading: loadingPlacingBid }] = usePlaceBidMutation();

  const { handleInput } = createFormActions('bidForm', dispatch);
  const { bidForm } = useAppSelector((state: RootState) => state.form);

  useEffect(() => {
    dispatch(
      setInputs({
        formName: 'bidForm',
        data: {
          bidAmount: auctionItem?.minimumBid,
        },
      })
    );
  }, [auctionItem?.minimumBid, dispatch]);

  const handlePlaceBid = async (e: any) => {
    e.preventDefault();

    try {
      await placeBid({
        auctionItemId: auctionItem?._id,
        auctionId: campaign?.campaign?.auction?._id,
        bidAmount: bidForm?.inputs.bidAmount,
        customCampaignLink: campaign?.customCampaignLink,
      }).unwrap();

      handleClose();
      setOpenConfirmationModal(true);
    } catch {}
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xl z-[101] transition-opacity duration-300 ${
          openBidModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: openBidModal ? 1 : 0 }}
      />

      <Modal show={openBidModal} onClose={handleClose}>
        <div className='fixed inset-0 z-[102] flex items-center justify-center'>
          <motion.div
            className='relative max-w-lg w-full mx-auto'
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{
              scale: openBidModal ? 1 : 0.8,
              opacity: openBidModal ? 1 : 0,
              y: openBidModal ? 0 : 50,
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
                    onClick={handleClose}
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
                        {auctionItem?.totalBids === 0 ? 'No bids yet' : `$${auctionItem?.currentBid?.toLocaleString()}`}
                      </p>
                    </div>

                    <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10'>
                      <div className='flex items-center space-x-2 mb-2'>
                        <Target className='w-4 h-4 text-yellow-400' />
                        <p className='text-sm font-medium text-yellow-300'>Minimum Bid</p>
                      </div>
                      <p className='text-xl font-bold text-white'>${(auctionItem?.minimumBid || auctionItem?.startingPrice)?.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Bid Input */}
                  <div className='space-y-3'>
                    <label className='block text-lg font-semibold text-white'>Enter your bid amount</label>

                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                        <span className='text-2xl font-bold text-yellow-400'>$</span>
                      </div>

                      <input
                        type='number'
                        name='bidAmount'
                        min={auctionItem?.startingPrice}
                        onChange={handleInput}
                        placeholder={(auctionItem?.minimumBid || auctionItem?.startingPrice)?.toString()}
                        className='w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-2xl font-bold text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200'
                        value={bidForm?.inputs.bidAmount || ''}
                      />
                    </div>

                    {/* Validation message */}
                    {bidForm?.inputs?.bidAmount && bidForm?.inputs?.bidAmount < (auctionItem?.minimumBid || auctionItem?.startingPrice) && (
                      <motion.p className='text-red-400 text-sm' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                        Bid must be at least ${(auctionItem?.minimumBid || auctionItem?.startingPrice)?.toLocaleString()}
                      </motion.p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className='flex flex-col sm:flex-row gap-y-4 sm:gap-x-4 pt-4'>
                    <button
                      type='button'
                      onClick={handleClose}
                      className='order-2 sm:order-1flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl py-4 font-semibold transition-all duration-200 hover:scale-105'
                    >
                      Cancel
                    </button>

                    <button
                      type='submit'
                      disabled={
                        bidForm?.inputs?.bidAmount === 0 ||
                        bidForm?.inputs?.bidAmount < (auctionItem?.minimumBid || auctionItem?.startingPrice) ||
                        loadingPlacingBid
                      }
                      className='order-1 sm:order-2 flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-2xl py-4 font-semibold transition-all duration-200 hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-2'
                    >
                      {loadingPlacingBid && <div className='animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent'></div>}
                      <span>
                        {loadingPlacingBid
                          ? 'Placing Bid...'
                          : bidForm?.inputs.bidAmount
                          ? `Place $${bidForm?.inputs.bidAmount?.toLocaleString()} Bid`
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
