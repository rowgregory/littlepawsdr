import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import AuctionDonationModal from '../../components/modals/AuctionDonationModal';
import AuctionDonationConfirmationModal from '../../components/modals/AuctionDonationConfirmationModal';
import AuctionDonationCard from '../../components/campaign/AuctionDonationCard';
import CampaignOverviewHero from '../../components/campaign/CampaignOverviewHero';
import GoalAndStorySection from '../../components/campaign/GoalAndStorySection';

const Overview = () => {
  const campaignState = useSelector((state: RootState) => state.campaign);
  const auth = useSelector((state: RootState) => state.auth);
  const campaign = campaignState.campaign;
  const theme = campaign?.themeColor;
  const ifCampaignIsOver = campaign?.auction?.settings?.hasEnded;
  const [openModal, setOpenModal] = useState({
    donate: false,
    confirmation: false,
    unauthorized: false,
  });
  const [steps, setSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  }) as any;
  const [inputs, setInputs] = useState({
    donor: '',
    email: '',
    donorPublicMessage: '',
    oneTimeDonationAmount: 25,
  });

  const handleClose = () =>
    setOpenModal({ donate: false, confirmation: false, unauthorized: false });

  const openDonationModalAndReset = () => {
    setOpenModal({ donate: true, confirmation: false, unauthorized: false });
    setSteps({ step1: true, step2: false, step3: false, step4: false });
    setInputs({
      donor: '',
      email: '',
      donorPublicMessage: '',
      oneTimeDonationAmount: 25,
    });
  };

  return (
    <div className={`${openModal.donate ? 'overflow-hidden' : ''}`}>
      <AuctionDonationConfirmationModal
        openModal={openModal}
        handleClose={handleClose}
        theme={theme}
        user={auth?.user}
      />
      {openModal.donate && (
        <AuctionDonationModal
          openModal={openModal}
          handleClose={handleClose}
          steps={steps}
          inputs={inputs}
          setInputs={setInputs}
          setOpenModal={setOpenModal}
          setSteps={setSteps}
        />
      )}
      <div className='grid grid-cols-12 gap-3 lg:gap-8 max-w-[1340px] w-full mx-auto p-2.5 lg:p-6 md:p-8'>
        <div className='col-span-12 lg:col-span-8 fade-in'>
          <CampaignOverviewHero campaign={campaign} theme={theme} />
          <hr className='border-b border-gray-100 w-full my-4' />
          <GoalAndStorySection campaign={campaign} theme={theme} openModal={openModal} />
        </div>
        <div className='pb-60 sm:pb-0 col-span-12 lg:col-span-4'>
          <button
            disabled={ifCampaignIsOver}
            onClick={() => openDonationModalAndReset()}
            className={`w-full rounded-lg text-white font-Matter-Medium py-3 text-xl mb-5 ${theme?.dark}`}
          >
            {ifCampaignIsOver ? 'Campaign Ended' : 'Donate'}
          </button>
          {campaign?.auction?.donations
            ?.map((donation: any) => (
              <AuctionDonationCard key={donation?._id} donation={donation} theme={theme} />
            ))
            .reverse()}
        </div>
      </div>
    </div>
  );
};

export default Overview;
