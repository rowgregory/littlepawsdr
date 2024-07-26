import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import formatCurrency from '../../utils/formatCurrency';
import styled, { keyframes } from 'styled-components';
import AuctionDonationModal from '../../components/modals/AuctionDonationModal';
import AuctionDonationConfirmationModal from '../../components/modals/AuctionDonationConfirmationModal';

const progressBar = (width: number, prevWidth: number) => keyframes`
0% { width: ${prevWidth}%; }
100% { width: ${width}% }
`;

const Bar = styled.div<{ width: number; prevWidth: number }>`
  height: 100%;
  width: ${({ width }) => `${width}%`};
  position: relative;
  animation: ${({ width, prevWidth }) => progressBar(width, prevWidth)} 300ms ease-out;
  -webkit-transition: width 300ms ease-out;
  -moz-transition: width 300ms ease-out;
  -o-transition: width 300ms ease-out;
  transition: width 300ms ease-out;
  &:after {
    -webkit-transition: width 300ms ease-out;
    -moz-transition: width 300ms ease-out;
    -o-transition: width 300ms ease-out;
    transition: width 300ms ease-out;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Overview = () => {
  const state = useSelector((state: RootState) => state);
  const campaign = state.campaign.campaign;
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

  const progressPercentage =
    campaign?.totalCampaignRevenue && campaign?.goal
      ? (campaign.totalCampaignRevenue / campaign.goal) * 100
      : 0;

  const prevWidthRef = useRef<number>(0);

  useEffect(() => {
    prevWidthRef.current = progressPercentage;
  }, [progressPercentage]);

  useEffect(() => {
    if (openModal.donate) {
      window.scrollTo(0, window.innerHeight);
    }
  }, [openModal.donate]);

  return (
    <div className={`${openModal.donate ? 'overflow-hidden' : ''}`}>
      <AuctionDonationConfirmationModal
        openModal={openModal}
        handleClose={handleClose}
        theme={theme}
        user={state.auth?.user}
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
      <div className='grid grid-cols-12 gap-8 max-w-[1340px] w-full mx-auto p-6 md:p-8'>
        <div className='col-span-12 lg:col-span-8 animate-fadeIn'>
          <p className='font-Matter-Medium text-4xl mb-1.5'>{campaign?.title}</p>
          <p className='font-Matter-Light text-[15px] mb-4'>{campaign?.subtitle}</p>
          <div className='max-w-[840px] w-full max-h-[320px] h-full'>
            <img
              src={campaign?.coverPhoto}
              className={`w-full h-80 bg-gray-100 ${campaign?.imgPreference}`}
              alt='Campaign cover'
            />
          </div>
          <div className='flex items-center justify-between mt-3'>
            <p className='font-Matter-Light text-xs'>Organized by Little Paws Dachshund Rescue</p>
            <p
              className={`font-Matter-Light text-xs flex items-center ${theme?.light} rounded-lg p-2`}
            >
              <span>
                <i
                  className={`mr-1.5 flex items-center justify-center fa-solid fa-check ${theme?.darker} h-4 w-4 text-white rounded-full text-xs`}
                ></i>
              </span>
              Verified
            </p>
          </div>
          <hr className='border-b border-gray-100 w-full my-4' />
          <div className='flex justify-between items-baseline'>
            <p className='font-Matter-Medium text-4xl'>
              {!campaign?.isMoneyRaisedVisible && `$${Math.round(campaign?.totalCampaignRevenue)}`}{' '}
              <span className='font-Matter-Regular'>
                {campaign?.supporters} supporter{campaign?.supporters !== 1 && 's'}
              </span>
            </p>
            <p className='font-Matter-Regular'>
              {progressPercentage > 100 ? '100' : Math.round(progressPercentage)}% of
              {!campaign?.isMoneyRaisedVisible && `${campaign?.goal}`} goal
            </p>
          </div>
          <div className='relative h-6 bg-gray-200 rounded-2xl overflow-hidden'>
            <Bar
              width={Number(progressPercentage)}
              prevWidth={Number(prevWidthRef.current)}
              className={`${theme?.gradient}`}
            />
          </div>
          <p className='text-2xl font-Matter-Medium mt-4 mb-2.5'>Story</p>
          <p className='font-Matter-Light text-sm'>{campaign?.story}</p>
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
              <div
                className='border-[0.5px] border-gray-200 p-3.5 rounded-sm flex flex-col mb-4 animate-fadeIn'
                key={donation?._id}
              >
                <div className='grid grid-cols-9 gap-1 mb-2 items-center'>
                  <p
                    className={`col-span-2 md:col-span-12 lg:col-span-2 ${theme?.light} ${
                      theme?.text
                    } ${
                      donation?.oneTimeDonationAmount > 1000 ? 'text-xs' : 'text-sm'
                    } h-12 w-12 rounded-full flex items-center justify-center font-Matter-Medium`}
                  >
                    {formatCurrency(donation?.oneTimeDonationAmount)}
                  </p>
                  <p className='col-span-7 md:col-span-12 lg:col-span-7 font-Matter-Light'>
                    <span className='font-Matter-Medium'>{donation?.donor}</span> made a{' '}
                    <span className='font-Matter-Medium'>${donation?.oneTimeDonationAmount}</span>{' '}
                    donation
                  </p>
                </div>
                <p className='font-Matter-Regular mt-2'>{donation?.donorPublicMessage}</p>
              </div>
            ))
            .reverse()}
        </div>
      </div>
    </div>
  );
};

export default Overview;
