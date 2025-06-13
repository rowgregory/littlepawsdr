import { RootState, useAppDispatch, useAppSelector } from '../../../redux/toolkitStore';
import { useParams } from 'react-router-dom';
import { useUpdateCampaignMutation } from '../../../redux/services/campaignApi';
import { resetSuccess } from '../../../redux/features/campaign/campaignSlice';
import { createFormActions, setInputs } from '../../../redux/features/form/formSlice';
import { CheckCircle, Copy, Link2, Save, Sparkles, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const Details = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const campaign = useAppSelector((state: RootState) => state.campaign);
  const [updateCampaign, { isLoading }] = useUpdateCampaignMutation();
  const [loading, setLoading] = useState(false);
  const { campaignAuctionForm } = useAppSelector((state: RootState) => state.form);
  const { handleInput } = createFormActions('campaignAuctionForm', dispatch);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateCampaign({
        id,
        title: campaignAuctionForm?.inputs?.title,
        goal: campaignAuctionForm?.inputs?.goal,
        customCampaignLink: campaignAuctionForm?.inputs?.customCampaignLink,
      }).unwrap();

      setTimeout(() => {
        dispatch(resetSuccess());
      }, 3000);
    } catch {}
  };

  useEffect(() => {
    // Only initialize form when:
    // 1. Campaign data is loaded
    // 2. Form is currently empty
    if (campaign?.campaign?.title && !campaignAuctionForm?.inputs?.title) {
      dispatch(
        setInputs({
          formName: 'campaignAuctionForm',
          data: {
            title: campaign.campaign.title,
            goal: campaign.campaign.goal,
            customCampaignLink: campaign.campaign.customCampaignLink,
          },
        })
      );
    }
  }, [campaign?.campaign?.customCampaignLink, campaign?.campaign?.goal, campaign?.campaign?.title, campaignAuctionForm?.inputs?.title, dispatch]);

  const BASE_URL = 'https://www.littlepawsdr.org';
  const copyLink = () => {
    setLoading(true);
    navigator.clipboard.writeText(`${BASE_URL}/campaigns/${campaignAuctionForm?.inputs?.customCampaignLink}`).then(async () => {
      setTimeout(() => setLoading(false), 3000);
    });
  };

  const formatGoal = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white border-[1px] border-gray-200 rounded-xl py-4 px-2.5 md:p-8'>
      {/* Success Banner */}
      {campaign?.success && (
        <div className='mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3'>
          <CheckCircle className='w-5 h-5 text-green-600' />
          <span className='text-green-800 font-Matter-Medium'>Campaign details saved successfully!</span>
        </div>
      )}

      <div className='grid grid-cols-12 gap-3'>
        {/* Main Details Section */}
        <div className='col-span-12 md:col-span-4'>
          <p className='text-lg font-Matter-Medium'>Main details</p>
          <p className='font-Matter-Light text-sm tracking-wide'>Choose a title and fundraising goal for your campaign.</p>
        </div>

        <div className='col-span-12 md:col-span-8 md:col-start-6'>
          <div className='flex flex-col gap-4'>
            {/* Campaign Title */}
            <div className='flex flex-col'>
              <label className='font-Matter-Medium text-sm mb-1 flex items-center gap-2' htmlFor='title'>
                <Sparkles className='w-4 h-4 text-blue-600' />
                Campaign Title
              </label>
              <p className='text-gray-600 text-xs mb-2'>Create a compelling title that captures your mission</p>

              <input
                className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200'
                name='title'
                onChange={handleInput}
                type='text'
                placeholder='e.g., Help Save Max - Emergency Surgery Fund'
                value={campaignAuctionForm?.inputs.title || ''}
              />
              {campaignAuctionForm?.errors?.title && (
                <p className='text-red-600 text-xs mt-1 flex items-center gap-1'>
                  <span className='w-1 h-1 bg-red-600 rounded-full'></span>
                  {campaignAuctionForm?.errors?.title}
                </p>
              )}
            </div>

            {/* Fundraising Goal */}
            <div className='flex flex-col'>
              <label className='font-Matter-Medium text-sm mb-1 flex items-center gap-2' htmlFor='goal'>
                <TrendingUp className='w-4 h-4 text-green-600' />
                Fundraising Goal
              </label>
              <p className='text-gray-600 text-xs mb-2'>Set an inspiring but achievable target amount</p>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-Matter-Medium'>$</span>
                <input
                  className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 pl-8 pr-4 font-Matter-Regular focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-200 w-full'
                  name='goal'
                  onChange={handleInput}
                  type='number'
                  placeholder='5000'
                  value={campaignAuctionForm?.inputs.goal || ''}
                />
              </div>
              {campaignAuctionForm?.inputs?.goal && (
                <div className='bg-green-50 border border-green-200 rounded-md p-2 mt-2'>
                  <p className='text-green-800 font-Matter-Medium text-sm'>Goal: {formatGoal(campaignAuctionForm?.inputs?.goal)}</p>
                </div>
              )}
              {campaignAuctionForm?.errors?.goal && (
                <p className='text-red-600 text-xs mt-1 flex items-center gap-1'>
                  <span className='w-1 h-1 bg-red-600 rounded-full'></span>
                  {campaignAuctionForm?.errors?.goal}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Custom Link Section */}
        <div className='col-span-full md:col-span-4 mt-6'>
          <p className='font-Matter-Medium text-lg'>Custom Campaign URL</p>
          <p className='font-Matter-Light text-sm tracking-wide'>Create a memorable link that's easy to share and remember.</p>
        </div>

        <div className='col-span-full md:col-span-8 md:col-start-6 mt-6'>
          <div className='flex flex-col'>
            <label className='font-Matter-Medium text-sm mb-1 flex items-center gap-2'>
              <Link2 className='w-4 h-4 text-purple-600' />
              Custom campaign link*
            </label>
            <div className='mb-3 flex items-center h-full border-[1px] border-gray-200 rounded-md overflow-hidden focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all duration-200'>
              <div className='px-3 py-2 bg-gray-50 font-Matter-Regular text-gray-600 border-r border-gray-200'>{BASE_URL}/campaigns/</div>
              <input
                value={campaignAuctionForm?.inputs?.customCampaignLink || ''}
                type='text'
                name='customCampaignLink'
                placeholder='save-max-2024'
                className='flex-1 p-2 focus:outline-none font-Matter-Regular'
                onChange={handleInput}
              />
              <button
                type='button'
                onClick={copyLink}
                disabled={!campaignAuctionForm?.inputs?.customCampaignLink}
                className={`px-3 py-2 transition-all duration-200 ${
                  loading
                    ? 'bg-green-500 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
                }`}
              >
                {loading ? <CheckCircle className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
              </button>
            </div>

            {campaignAuctionForm?.inputs?.customCampaignLink && (
              <div className='bg-purple-50 border border-purple-200 rounded-md p-3 mb-3'>
                <p className='text-purple-800 font-Matter-Medium text-sm break-all'>
                  {`${BASE_URL}/campaigns/${campaignAuctionForm?.inputs?.customCampaignLink}`}
                </p>
              </div>
            )}

            {campaignAuctionForm?.errors?.customCampaignLink && (
              <p className='text-red-600 text-xs flex items-center gap-1'>
                <span className='w-1 h-1 bg-red-600 rounded-full'></span>
                {campaignAuctionForm?.errors?.customCampaignLink}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className='col-span-full mt-6'>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-Matter-Medium py-3 px-8 rounded-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {isLoading ? (
              <>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                Saving...
              </>
            ) : (
              <>
                <Save className='w-4 h-4' />
                Save Campaign Details
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Details;
