import { useState } from 'react';
import { uploadFileToFirebase } from '../../../utils/uploadToFirebase';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/toolkitStore';
import { useParams } from 'react-router-dom';
import { useUpdateCampaignMutation } from '../../../redux/services/campaignApi';
import { resetSuccess } from '../../../redux/features/campaign/campaignSlice';
import useCampaignDetailsForm from '../../../utils/hooks/useCampaignDetailsForm';
import MainDetailsForm from '../../../components/forms/campaign/details/MainDetailsForm';
import CoverPhotoForm from '../../../components/forms/campaign/details/CoverPhotoForm';
import StoryForm from '../../../components/forms/campaign/details/StoryForm';
import sectionLoadingStates from '../../../components/data/campaign/section-loading-states';

const Details = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const campaign = useSelector((state: RootState) => state.campaign);
  const [loading, setLoading] = useState(sectionLoadingStates);
  const [updateCampaign] = useUpdateCampaignMutation();

  const genericUpdateCampaign = async (e: any, section: string, data: any) => {
    e.preventDefault();
    setLoading({ ...sectionLoadingStates, [section]: true });

    await updateCampaign({
      id,
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

  const editPhotoHandler = async (e: any) => {
    setLoading((prev: any) => ({ ...prev, imageUpload: true }));
    const imgData: any = await uploadFileToFirebase(e.target.files[0], true);
    setInputs((prev: any) => ({
      ...prev,
      coverPhoto: imgData?.url,
      coverPhotoName: imgData?.name,
    }));
    setLoading((prev: any) => ({ ...prev, imageUpload: false }));
    e.target.value = '';
  };

  const { inputs, handleInput, handleSwitch, setInputs } = useCampaignDetailsForm(
    campaign?.campaign
  );

  return (
    <div className='bg-white border-[1px] border-gray-200 rounded-xl py-4 px-2.5 md:p-8'>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-12 md:col-span-4'>
          <p className='text-lg font-Matter-Medium'>Main details</p>
          <p className='font-Matter-Light text-sm tracking-wide'>
            Choose a title and theme color for your campaign.
          </p>
        </div>
        <div className='col-span-12 md:col-span-8 md:col-start-6'>
          <MainDetailsForm
            handleInput={handleInput}
            inputs={inputs}
            campaign={campaign}
            genericUpdateCampaign={genericUpdateCampaign}
            setInputs={setInputs}
            loading={loading}
          />
        </div>
      </div>
      <div className='px-4 border-b-[1px] border-gray-100 w-full my-5'></div>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-12 md:col-span-4'>
          <p className='text-lg font-Matter-Medium'>Cover Photo</p>
          <p className='font-Matter-Light text-sm'>Add a cover photo to your campaign.</p>
        </div>
        <div className='col-span-12 md:col-span-8 md:col-start-6'>
          <CoverPhotoForm
            inputs={inputs}
            loading={loading}
            campaign={campaign}
            editPhotoHandler={editPhotoHandler}
            genericUpdateCampaign={genericUpdateCampaign}
            handleSwitch={handleSwitch}
          />
        </div>
      </div>
      <div className='px-4 border-b-[0.5px] border-gray-100 w-full my-5'></div>
      <div className='w-100'>
        <StoryForm
          genericUpdateCampaign={genericUpdateCampaign}
          inputs={inputs}
          campaign={campaign}
          loading={loading}
          handleInput={handleInput}
        />
      </div>
    </div>
  );
};

export default Details;
