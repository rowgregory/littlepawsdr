
import { TransparentPurpleLogo } from '../../components/assets';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import { useGetCampaignsQuery } from '../../redux/services/campaignApi';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';

const Campaigns = () => {
  const campaign = useSelector((state: RootState) => state.campaign);
  const campaigns = campaign?.campaigns;

  const { isLoading } = useGetCampaignsQuery({}, { refetchOnMountOrArgChange: true });

  if (isLoading) return <GreenRotatingTransparentCircle />

  return (
    <div className='min-h-screen mx-auto flex py-28 px-3 md:px-0'>
      <div className='flex items-center mx-auto flex-col'>
        <Link to='/' className='cursor-pointer'>
          <img src={TransparentPurpleLogo} alt='LPDR Campaign' className='max-w-44 mb-4' />
        </Link>
        <p className='text-3xl text-gray-500 mb-5 text-center'>Little Paws Dachshund Rescue</p>
        <div className='max-w-[400px] w-full'>
          <p className='text-black font-Matter-Medium text-lg mb-2 ml-px mt-6'>Active Campaigns</p>
          {campaigns?.active?.length === 0 ? (
            <div className='font-Matter-Light'>There are no active campaigns</div>
          ) : (
            campaigns?.active?.map((campaign: any, i: number) => (
              <Link
                to={`/campaigns/${campaign?.customCampaignLink}`}
                key={i}
                className='hover:no-underline'
              >
                <div className='flex items-center border border-gray-200 h-auto rounded p-3 pl-4 mb-2 hover:bg-gray-100'>
                  <div className="grow">
                    <h1 className='text-md font-Matter-Medium text-gray-600'>{campaign?.title}</h1>
                    <p className='text-gray-600 text-sm mt-1'>{campaign?.message}</p></div></div>
              </Link>
            ))
          )}
          <p className='text-black font-Matter-Medium text-lg mb-2 ml-px mt-6'>Past Campaigns</p>
          {campaigns?.past?.length === 0 ? (
            <div className='font-Matter-Light'>There are no past campaigns</div>
          ) : (
            campaigns?.past?.map((campaign: any, i: number) => (
              <Link
                to={`/campaigns/${campaign?.customCampaignLink}`}
                key={i}
                className='flex flex-col border border-gray-200 h-auto rounded p-3 pl-4 mb-2 hover:bg-gray-100 hover:no-underline'
              >
                <p className='font-Matter-Medium text-gray-600 rounded-xl'>{campaign?.title}</p>
                <p className='text-gray-400 text-xs mt-1'>{campaign?.message}</p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
