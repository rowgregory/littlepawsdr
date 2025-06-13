import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { useTrackAuctionModalButtonClickMutation } from '../../redux/services/campaignApi';
import { closeAuctionModal, openAuctionModal, saveHasHandledAuctionModalToLocalStorage } from '../../redux/features/campaign/campaignSlice';
import Modal from '../common/Modal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimeUntil } from '../../hooks/useUntilTime';
import { Clock, Target, Gavel, X } from 'lucide-react';

const LiveAuctionModal = () => {
  const dispatch = useAppDispatch();
  const campaign = useAppSelector((state: RootState) => state.campaign);
  const { user } = useAppSelector((state: RootState) => state.user);
  const setClose = () => dispatch(closeAuctionModal());
  const [trackClick] = useTrackAuctionModalButtonClickMutation();
  const navigate = useNavigate();
  const timeUntil = useTimeUntil(campaign?.campaign?.auction?.settings?.endDate);

  // Check localStorage before determining if modal should open
  const hasHandledAuctionModal = localStorage.getItem('handledAuctionModal') === 'true';
  const shouldShowModal = campaign?.campaign?.campaignStatus === 'Active Campaign' && !hasHandledAuctionModal;

  useEffect(() => {
    if (!shouldShowModal) return;
    dispatch(openAuctionModal());
  }, [dispatch, hasHandledAuctionModal, shouldShowModal]);

  return (
    <Modal show={campaign?.isAuctionModalOpen} onClose={setClose}>
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        {/* Backdrop */}
        <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' />

        {/* Modal content */}
        <div className='relative max-w-lg w-full mx-auto'>
          <div className='bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl overflow-hidden'>
            {/* Close button */}
            <button
              onClick={() => dispatch(closeAuctionModal())}
              className='absolute top-4 right-4 z-20 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300'
            >
              <X className='w-4 h-4' />
            </button>

            {/* Header */}
            <div className='relative bg-gradient-to-r from-red-500 to-pink-600 p-6 text-center'>
              <div className='flex justify-center items-center gap-2 mb-3'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-white font-semibold text-sm uppercase tracking-wide'>Live Auction</span>
              </div>
              <h1 className='text-3xl font-bold text-white mb-2'>Join the {campaign?.campaign?.title} Auction</h1>
              <p className='text-white/90'>Help rescue dogs while bidding on amazing items</p>
            </div>

            {/* Stats */}
            <div className='bg-black/20 px-6 py-4'>
              <div className='grid grid-cols-3 gap-4 text-center text-white'>
                <div>
                  <div className='text-xl font-bold text-yellow-300 flex items-center justify-center gap-1'>
                    <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                    LIVE
                  </div>
                  <div className='text-xs opacity-80'>Status</div>
                </div>
                <div>
                  <div className='text-xl font-bold text-green-300'>${campaign?.campaign?.goal}</div>
                  <div className='text-xs opacity-80'>Goal</div>
                </div>
                <div>
                  <div className='text-xl font-bold text-blue-300'>{campaign?.campaign?.auction?.items?.length}</div>
                  <div className='text-xs opacity-80'>Items</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className='p-6'>
              <div className='text-center mb-6'>
                <Target className='w-12 h-12 text-white mx-auto mb-4' />
                <h2 className='text-xl font-bold text-white mb-3'>Don't Miss Out</h2>
                <p className='text-white/90 leading-relaxed'>
                  Join our <span className='font-bold text-yellow-300'>{campaign?.campaign?.title} auction</span> and bid on premium items while
                  supporting animal rescue efforts. Every bid helps save lives.
                </p>
              </div>

              {/* Urgency timer */}
              <div className='bg-white/10 rounded-lg p-4 mb-6 text-center'>
                <div className='flex items-center justify-center gap-2 text-yellow-300 font-bold mb-1'>
                  <Clock className='w-4 h-4' />
                  Ends in {timeUntil}
                </div>
                <p className='text-white/80 text-sm'>Limited time remaining</p>
              </div>

              {/* Action button */}
              <button
                onClick={() => {
                  trackClick(campaign?.campaign?._id);
                  dispatch(saveHasHandledAuctionModalToLocalStorage());
                  setClose();
                  navigate(
                    user?._id && user?.hasAddress
                      ? `/campaigns/${campaign?.customCampaignLink}/auction`
                      : user?._id && !user?.hasAddress
                      ? '/settings/profile'
                      : `/auth/register?customCampaignLink=${campaign?.customCampaignLink}&conversionSource=live_auction_modal`
                  );
                }}
                className='w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg'
              >
                <div className='flex items-center justify-center gap-2'>
                  <Gavel className='w-5 h-5' />
                  Start Bidding Now
                </div>
              </button>

              {/* Trust indicators */}
              <div className='mt-4 grid grid-cols-2 gap-3 text-white/80 text-sm'>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  Secure Bidding
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  No Hidden Fees
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  Instant Access
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  Help Animals
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LiveAuctionModal;
