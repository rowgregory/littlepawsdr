import { Link } from 'react-router-dom';

const PublicCampaignLink = ({ campaign }: { campaign: any }) => {
  return (
    <Link
      to={`/campaigns/${campaign?.customCampaignLink}`}
      className='flex flex-col border border-gray-200 h-auto rounded p-3 mb-2 hover:bg-gray-100 hover:no-underline'
    >
      <p className='font-Matter-Medium text-gray-600 rounded-xl'>{campaign?.title}</p>
      <p className='text-gray-400 text-xs mt-1'>{campaign?.message}</p>
    </Link>
  );
};

export default PublicCampaignLink;
