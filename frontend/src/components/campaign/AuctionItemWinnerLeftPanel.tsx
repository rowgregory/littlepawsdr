import { Link } from 'react-router-dom';

const AuctionItemWinnerLeftPanel = ({
  winningBid,
  customCampaignLink,
}: {
  winningBid: any;
  customCampaignLink: string;
}) => {
  return (
    <div
      className={`flex md:fixed flex-col justify-between h-full md:w-[327px] md:min-h-screen p-[12px] md:px-6 md:py-8 ${winningBid?.theme?.dark} `}
    >
      <div>
        <Link
          to={`/campaigns/${customCampaignLink}/auction`}
          className='flex items-center cursor-pointer hover:no-underline hover:text-[#fff]'
        >
          <i className='fa-solid fa-arrow-left text-gray-100 mr-2.5'></i>
          <p className='font-Matter-Regular text-gray-100 text-xs md:text-sm'>Back to auction</p>
        </Link>
        <p className='font-Matter-Medium text-white text-xl mt-1.5 md:mt-10'>
          Little Paws Dachshund Rescue
        </p>
      </div>
      <p className='text-white font-Matter-Medium'>Powered by Gregory Row</p>
    </div>
  );
};

export default AuctionItemWinnerLeftPanel;
