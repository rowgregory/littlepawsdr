import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/toolkitStore';
import { useUpdateCampaignMutation } from '../../../redux/services/campaignApi';
import { resetSuccess } from '../../../redux/features/campaign/campaignSlice';
import TailwindSpinner from '../../../components/Loaders/TailwindSpinner';

export const useCampaignSettingsForm = (data?: any) => {
  const initialValues = useMemo(
    () => ({
      isCampaignPublished: data?.isCampaignPublished || false,
      isMoneyRaisedVisible: data?.isMoneyRaisedVisible || false,
      feesRequired: data?.feesRequired || false,
    }),
    [data]
  );
  const [inputs, setInputs] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        isCampaignPublished: data?.isCampaignPublished,
        isMoneyRaisedVisible: data?.isMoneyRaisedVisible,
        feesRequired: data?.feesRequired,
      }));
    }
  }, [data]);

  const handleSwitch = (e: any) => {
    const { name, checked } = e.target;
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: checked,
    }));
  };

  return { inputs, handleSwitch };
};

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

  const { inputs, handleSwitch } = useCampaignSettingsForm(campaign?.campaign);

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
            <form className='d-flex flex-column'>
              <div className='flex justify-between items-center w-full h-6 mb-2'>
                <p className=' font-Matter-Medium'>Publish campaign</p>
                <Form.Group controlId='isCampaignPublished' className='mb-0'>
                  <Form.Check
                    className='auction'
                    type='switch'
                    checked={inputs.isCampaignPublished || false}
                    onChange={handleSwitch}
                    name='isCampaignPublished'
                  ></Form.Check>
                </Form.Group>
              </div>
              <p className='text-sm font-Matter-Light'>Make this campaign publicly viewable and live.</p>
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
          <p className='font-Matter-Light text-sm tracking-wide'>Customize the look of your page.</p>
        </div>
        <div className='col-span-full md:col-span-8 md:col-start-6'>
          <div className='flex flex-col'>
            <div className='flex justify-between items-center'>
              <p className=' font-Matter-Medium'>Accept payments even after the end date</p>
              <i className='fas fa-check' />
            </div>
            <div className='w-full h-px bg-slate-100 my-3'></div>
            <form className='d-flex flex-column'>
              <div className='flex justify-between items-center w-full h-6 mb-2'>
                <p className=' font-Matter-Medium'>Hide money raised</p>
                <Form.Group controlId='isMoneyRaisedVisible' className='mb-0'>
                  <Form.Check
                    className='auction'
                    type='switch'
                    checked={inputs.isMoneyRaisedVisible || false}
                    onChange={handleSwitch}
                    name='isMoneyRaisedVisible'
                  ></Form.Check>
                </Form.Group>
              </div>
              <p className='text-sm font-Matter-Light'>Hide the amount of money raised on your campaign from public view.</p>
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
      <div className='w-full h-px bg-slate-100 my-5'></div>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-full md:col-span-4'>
          <p className='font-Matter-Medium text-lg'>Fees</p>
          <p className='font-Matter-Light text-sm tracking-wide'>Configure the fees on your campaign.</p>
        </div>
        <div className='col-span-full md:col-span-8 md:col-start-6'>
          <div className='flex flex-col'>
            <form className='d-flex flex-column'>
              <div className='flex justify-between items-center w-full h-6 mb-2'>
                <p className=' font-Matter-Medium'>Require fees</p>
                <Form.Group controlId='feesRequired' className='mb-0'>
                  <Form.Check
                    className='auction'
                    type='switch'
                    checked={inputs.feesRequired || false}
                    onChange={handleSwitch}
                    name='feesRequired'
                  ></Form.Check>
                </Form.Group>
              </div>
              <p className='text-sm font-Matter-Light'>
                Turn this on if you'd like to require supporters to cover the transaction fees.
              </p>
              <p className='text-xs font-Matter-Light italic'>
                Note: Activating this feature will result in an additional 3.5% being applied to the customer's total.
              </p>
              <p className='text-xs font-Matter-Light mb-4 italic'></p>
              <button
                className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
                onClick={(e: any) =>
                  genericUpdateCampaign(e, 'fees', {
                    feesRequired: inputs.feesRequired,
                  })
                }
              >
                {campaign.success && campaign.type === 'fees' ? (
                  <i className='fas fa-check text-white'></i>
                ) : loading.fees ? (
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
