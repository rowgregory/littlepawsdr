import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../redux/toolkitStore';
import { useUpdateAuctionMutation } from '../../../../redux/services/campaignApi';
import { resetSuccess } from '../../../../redux/features/campaign/campaignSlice';
import AuctionSettingsForm from '../../../../components/forms/campaign/details/AuctionSettingsForm';
import useAuctionSettingsForm from '../../../../utils/hooks/useAuctionSettingsForm';

const AuctionSettings = () => {
  const dispatch = useAppDispatch();
  const campaign = useSelector((state: RootState) => state.campaign);
  const sectionLoadingStates = { settings: false };
  const [loading, setLoading] = useState(sectionLoadingStates);
  const auction = campaign?.campaign?.auction;

  const [updateAuction] = useUpdateAuctionMutation();

  const genericUpdateAuction = async (e: any, section: string, data: any) => {
    e.preventDefault();
    setLoading({ ...sectionLoadingStates, [section]: true });

    await updateAuction({
      id: auction?._id,
      type: section,
      data,
    })
      .unwrap()
      .then(() =>
        setTimeout(() => {
          dispatch(resetSuccess());
          setLoading({ ...sectionLoadingStates });
        }, 3000)
      )
      .catch(() => setLoading({ ...sectionLoadingStates }));
  };

  const { inputs, handleSwitch, handleInput } = useAuctionSettingsForm(campaign?.campaign?.auction);

  return (
    <div className='bg-white border rounded-xl'>
      <AuctionSettingsForm
        handleInput={handleInput}
        inputs={inputs}
        genericUpdateAuction={genericUpdateAuction}
        campaign={campaign}
        loading={loading}
        handleSwitch={handleSwitch}
      />
    </div>
  );
};

export default AuctionSettings;
