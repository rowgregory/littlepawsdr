import { TransparentPurpleLogo } from '../../components/assets';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import { useGetCampaignsQuery } from '../../redux/services/campaignApi';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import PublicCampaignLink from '../../components/campaign/PublicCampaignLink';

const Campaigns = () => {
  const campaign = useSelector((state: RootState) => state.campaign);
  const campaigns = campaign?.campaigns;

  const { isLoading } = useGetCampaignsQuery({}, { refetchOnMountOrArgChange: true });

  if (isLoading) return <GreenRotatingTransparentCircle />;

  return (
    <div className='min-h-screen mx-auto flex py-6 lg:py-28 px-2.5 md:px-0'>
      <div className='flex items-center mx-auto flex-col'>
        <Link to='/' className='cursor-pointer'>
          <img src={TransparentPurpleLogo} alt='LPDR Campaign' className='max-w-44 mb-4' />
        </Link>
        <p className='text-3xl text-gray-500 mb-3 text-center'>Little Paws Dachshund Rescue</p>
        <div className='max-w-[400px] w-full'>
          <p className='text-black font-Matter-Medium text-lg mb-2 mt-6'>Active Campaigns</p>
          {campaigns?.active?.length === 0 ? (
            <div className='font-Matter-Light'>There are no active campaigns</div>
          ) : (
            campaigns?.active?.map((campaign: any, i: number) => (
              <PublicCampaignLink key={i} campaign={campaign} />
            ))
          )}
          <p className='text-black font-Matter-Medium text-lg mb-2 mt-6'>Past Campaigns</p>
          {campaigns?.past?.length === 0 ? (
            <div className='font-Matter-Light'>There are no past campaigns</div>
          ) : (
            campaigns?.past?.map((campaign: any, i: number) => (
              <PublicCampaignLink key={i} campaign={campaign} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
