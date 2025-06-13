import { RootState, useAppDispatch, useAppSelector } from '../../../../redux/toolkitStore';
import { useUpdateAuctionMutation } from '../../../../redux/services/campaignApi';
import { resetSuccess } from '../../../../redux/features/campaign/campaignSlice';
import AuctionSettingsForm from '../../../../components/forms/campaign/details/AuctionSettingsForm';
import { createFormActions, setInputs } from '../../../../redux/features/form/formSlice';
import { formatDateForEstTimezone } from '../../../../utils/dateFunctions';
import { useEffect } from 'react';

const Schedule = () => {
  const dispatch = useAppDispatch();
  const campaign = useAppSelector((state: RootState) => state.campaign);
  const auction = campaign?.campaign?.auction;
  const [updateAuction, { isLoading }] = useUpdateAuctionMutation();
  const { campaignAuctionForm } = useAppSelector((state: RootState) => state.form);
  const { handleInput } = createFormActions('campaignAuctionForm', dispatch);

  useEffect(() => {
    // Only initialize if campaign data exists and no dates are set
    if (campaign?.campaign?.auction?.settings && !campaignAuctionForm?.inputs?.startDate && !campaignAuctionForm?.inputs?.endDate) {
      dispatch(
        setInputs({
          formName: 'campaignAuctionForm',
          data: {
            startDate: campaign.campaign.auction.settings.startDate,
            endDate: campaign.campaign.auction.settings.endDate,
          },
        })
      );
    }
  }, [campaign.campaign.auction.settings, campaignAuctionForm?.inputs?.endDate, campaignAuctionForm?.inputs?.startDate, dispatch]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateAuction({
        id: auction?._id,
        data: {
          startDate: formatDateForEstTimezone(campaignAuctionForm?.inputs?.startDate, 13, 0),
          endDate: formatDateForEstTimezone(campaignAuctionForm?.inputs?.endDate, 21, 0),
        },
      }).unwrap();

      setTimeout(() => {
        dispatch(resetSuccess());
      }, 3000);
    } catch {}
  };

  return (
    <div className='bg-white border rounded-xl'>
      <AuctionSettingsForm
        handleInput={handleInput}
        inputs={campaignAuctionForm?.inputs}
        handleSubmit={handleSubmit}
        campaign={campaign}
        loading={isLoading}
      />
    </div>
  );
};

export default Schedule;
