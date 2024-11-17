import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/toolkitStore';
import { useUpdateCampaignMutation } from '../../../redux/services/campaignApi';
import { resetSuccess } from '../../../redux/features/campaign/campaignSlice';
import TailwindSpinner from '../../../components/Loaders/TailwindSpinner';
import useForm from '../../../hooks/useForm';
import Switch from '../../../components/common/Switch';

const sectionLoadingStates = {
  general: false,
  design: false,
  fees: false,
};

const Settings = () => {
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

  const { inputs, handleToggle } = useForm(
    ['isCampaignPublished', 'isMoneyRaisedVisible'],
    campaign?.campaign
  );

  return (
    <div className='bg-white border-[1px] border-slate-200 rounded-xl w-full p-8'>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-full md:col-span-4'>
          <p className='font-Matter-Medium text-lg'>General</p>
          <p className='font-Matter-Light text-sm tracking-wide'>
            Publish your campaign and manage your general campaign settings.
          </p>
        </div>
        <div className='col-span-full md:col-span-8 md:col-start-6'>
          <div className='flex flex-col'>
            <form className='flex flex-col'>
              <div className='flex justify-between items-center w-full h-6 mb-2'>
                <p className=' font-Matter-Medium'>Publish campaign</p>
                <Switch
                  name='isCampaignPublished'
                  checked={inputs.isCampaignPublished || false}
                  onChange={handleToggle}
                ></Switch>
              </div>
              <p className='text-sm font-Matter-Light'>
                Make this campaign publicly viewable and live.
              </p>
              <p className='text-xs font-Matter-Light mb-4 italic'>
                Note: You can un-publish a campaign once you've started raising money.
              </p>
              <button
                className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
                onClick={(e: any) =>
                  genericUpdateCampaign(e, 'general', {
                    isCampaignPublished: inputs.isCampaignPublished,
                    campaignStatus: inputs.isCampaignPublished ? 'Active' : 'Inactive',
                  })
                }
              >
                {campaign.success && campaign.type === 'general' ? (
                  <i className='fas fa-check text-white'></i>
                ) : loading.general ? (
                  <TailwindSpinner color='fill-white' />
                ) : (
                  'Save'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className='w-full h-px bg-slate-100 my-5'></div>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-full md:col-span-4'>
          <p className='font-Matter-Medium text-lg'>Design</p>
          <p className='font-Matter-Light text-sm tracking-wide'>
            Customize the look of your page.
          </p>
        </div>
        <div className='col-span-full md:col-span-8 md:col-start-6'>
          <div className='flex flex-col'>
            <div className='flex justify-between items-center'>
              <p className=' font-Matter-Medium'>Accept payments even after the end date</p>
              <i className='fas fa-check' />
            </div>
            <div className='w-full h-px bg-slate-100 my-3'></div>
            <form className='flex flex-col'>
              <div className='flex justify-between items-center w-full h-6 mb-2'>
                <p className=' font-Matter-Medium'>Hide money raised</p>
                <Switch
                  name='isMoneyRaisedVisible'
                  checked={inputs.isMoneyRaisedVisible || false}
                  onChange={handleToggle}
                ></Switch>
              </div>
              <p className='text-sm font-Matter-Light'>
                Hide the amount of money raised on your campaign from public view.
              </p>
              <p className='text-xs font-Matter-Light mb-4 italic'></p>
              <button
                className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
                onClick={(e: any) =>
                  genericUpdateCampaign(e, 'design', {
                    isMoneyRaisedVisible: inputs.isMoneyRaisedVisible,
                  })
                }
              >
                {campaign.success && campaign.type === 'design' ? (
                  <i className='fas fa-check text-white'></i>
                ) : loading.design ? (
                  <TailwindSpinner color='fill-white' />
                ) : (
                  'Save'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
