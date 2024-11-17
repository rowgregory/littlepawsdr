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
    <div className='min-h-screen mx-auto py-6 lg:py-28 px-3'>
      <div className='flex flex-col items-center mx-auto'>
        <Link to='/' className='cursor-pointer mb-4'>
          <img src={TransparentPurpleLogo} alt='LPDR Campaign' className='max-w-48' />
        </Link>
        <div className='max-w-md w-full mx-auto'>
          <p className='text-charcoal font-QBold text-lg mb-2 mt-6'>Upcoming Campaigns</p>
          {campaigns?.upcoming?.length === 0 ? (
            <div className='font-QBook text-charcoal'>There are no upcoming campaigns</div>
          ) : (
            campaigns?.upcoming?.map((campaign: any, i: number) => (
              <PublicCampaignLink key={i} campaign={campaign} />
            ))
          )}
          <p className='text-charcoal font-QBold text-lg mb-2 mt-6'>Active Campaigns</p>
          {campaigns?.active?.length === 0 ? (
            <div className='font-QBook text-charcoal'>There are no active campaigns</div>
          ) : (
            campaigns?.active?.map((campaign: any, i: number) => (
              <PublicCampaignLink key={i} campaign={campaign} />
            ))
          )}
          <p className='text-charcoal font-QBold text-lg mb-2 mt-6'>Past Campaigns</p>
          {campaigns?.past?.length === 0 ? (
            <div className='font-QBook text-charcoal'>There are no past campaigns</div>
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
