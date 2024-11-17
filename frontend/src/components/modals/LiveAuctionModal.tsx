import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import {
  useFetchLiveCampaignQuery,
  useTrackAuctionModalButtonClickMutation,
} from '../../redux/services/campaignApi';
import { Link } from 'react-router-dom';
import {
  closeAuctionModal,
  saveHasHandledAuctionModalToLocalStorage,
} from '../../redux/features/campaign/campaignSlice';
import Modal from '../common/Modal';

const LiveAuctionModal = () => {
  const dispatch = useAppDispatch();
  const campaign = useSelector((state: RootState) => state.campaign);
  const isAuctionModalOpen = campaign.isAuctionModalOpen;
  const setClose = () => dispatch(closeAuctionModal());
  const [trackClick] = useTrackAuctionModalButtonClickMutation();
  useFetchLiveCampaignQuery();

  return (
    <Modal show={isAuctionModalOpen} onClose={setClose}>
      <div className='bg-white py-4 rounded-xl relative flex flex-col items-center justify-center'>
        <div className='flex items-center p-6'>
          <i className={`fa-solid fa-gavel text-xl ${campaign?.campaign?.themeColor?.text}`}></i>
          <p className='font-Matter-Medium text-4xl mx-2 text-center w-fit'>
            {campaign?.campaign?.title}
          </p>
          <i
            className={`fa-solid fa-gavel text-xl rotate-[270deg] ${campaign?.campaign?.themeColor?.text}`}
          ></i>
        </div>
        <p className='font-Matter-Medium mb-5 text-center'>
          🐾 Don’t miss out—place your bid now to help adorable dachshunds find their forever homes!
        </p>
        <Link
          onClick={() => {
            trackClick(campaign?.campaign?._id);
            dispatch(saveHasHandledAuctionModalToLocalStorage());
            setClose();
          }}
          to={`/campaigns/${campaign?.campaign?.customCampaignLink}/auction`}
          className={`${campaign?.campaign?.themeColor?.dark} shine-button transition transform relative overflow-hidden w-fit text-white mx-auto font-Matter-Medium px-6 py-[14px] h-full rounded-3xl hover:no-underline duration-200 hover:shadow-lg hover:${campaign?.campaign?.themeColor?.darker}`}
        >
          🐶 Bid Now for a Paw-sitive Change!
        </Link>
      </div>
    </Modal>
  );
};

export default LiveAuctionModal;
