import { useEffect, useMemo, useState } from 'react';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../../../redux/toolkitStore';
import { useUpdateCampaignMutation } from '../../../../redux/services/campaignApi';
import { resetSuccess } from '../../../../redux/features/campaign/campaignSlice';
import TailwindSpinner from '../../../../components/Loaders/TailwindSpinner';

export const useCampaignSharingForm = (data?: any) => {
  const initialValues = useMemo(
    () => ({
      customCampaignLink: data?.customCampaignLink || '',
    }),
    [data]
  );
  const [inputs, setInputs] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        customCampaignLink: data?.customCampaignLink,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: value,
    }));
  };

  return { inputs, handleInput, setInputs };
};

const sectionLoadingStates = {
  general: false,
  copy: false
};

const CampaignSharing = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const campaign = useSelector((state: RootState) => state.campaign);
  const [loading, setLoading] = useState(sectionLoadingStates);

  const [updateCampaign] = useUpdateCampaignMutation();

  const { inputs, handleInput } = useCampaignSharingForm(campaign?.campaign);

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
  const BASE_URL = 'https://www.littlepawsdr.org'
  const copyLink = () => {
    setLoading((prev: any) => ({ ...prev, copy: true }));
    navigator.clipboard.writeText(`${BASE_URL}/campaigns/${inputs.customCampaignLink}`).then(async () => {
      setTimeout(() => setLoading((prev: any) => ({ ...prev, copy: false })), 3000)
    });
  };


  return (
    <div className='bg-white border-[1px] border-gray-200 rounded-xl w-full p-8 grid grid-cols-12'>
      <div className='col-span-full md:col-span-4'>
        <p className='font-Matter-Medium text-lg'>General</p>
        <p className='font-Matter-Light text-sm tracking-wide'>Choose a custom sharing link to personalize your campaign.</p>
      </div>
      <div className='col-span-full md:col-span-8 md:col-start-6'>
        <div className='flex flex-col'>
          <form className='d-flex flex-column'>
            <div className='flex flex-col w-full mb-2'>
              <label className='font-Matter-Medium mb-0'>Custom campaign link*</label>
              <div className='mb-3 flex items-center h-full'>
                <div className='rounded-tl-lg rounded-bl-lg px-2 py-2 border-[1px] border-gray-100 bg-gray-100 font-Matter-Regular'>
                  {BASE_URL}
                </div>
                <div className='border-[1px] border-gray-100 flex items-center h-[42px] p-2'>
                  <input
                    value={inputs.customCampaignLink || ''}
                    type='text'
                    name='customCampaignLink'
                    className='w-full focus:outline-none rounded-tr-lg rounded-br-lg font-Matter-Regular'
                    onChange={handleInput}
                  />
                  <i onClick={() => copyLink()} className={`${loading.copy ? `fas fa-check ${campaign.campaign.themeColor.text}` : 'fas fa-copy'} cursor-pointer`}></i>
                </div>
              </div>
            </div>
            <button
              className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
              onClick={(e: any) =>
                genericUpdateCampaign(e, 'general', {
                  customCampaignLink: inputs.customCampaignLink,
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
      <div className='w-full h-px bg-slate-100 my-5 col-span-12'></div>
      <div className='col-span-full md:col-span-4'>
        <p className='font-Matter-Medium text-lg'>Scan-to-donate</p>
        <p className='font-Matter-Light text-sm tracking-wide'>Scan this QR code to be linked directly to your campaign page.</p>
      </div>
      <div className='col-span-full md:col-span-8 md:col-start-6'>
        <div className='h-auto max-w-36 w-full'>
          <QRCode size={256} value={`${BASE_URL}/campaigns/${inputs.customCampaignLink}`} viewBox={`0 0 256 256`} className='h-auto max-w-full w-full' />
        </div>
      </div>
    </div>
  );
};

export default CampaignSharing;
