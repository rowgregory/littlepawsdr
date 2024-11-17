import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/toolkitStore';
import TailwindSpinner from '../../Loaders/TailwindSpinner';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import navbarLinksData from '../../../utils/campaign-utils/navbarLinkData';

const NavLinkSection = ({ id, pathname }: { id: string; pathname: string }) => (
  <div className='p-1 bg-white border border-gray-100 rounded-lg w-full grid grid-cols-12 font-Matter-Regular'>
    {navbarLinksData(id).map((obj: any, i: number) => (
      <Link
        className={`col-span-3 md:col-span-2 text-center py-2.5 rounded-md hover:no-underline hover:text-teal-500 ${
          obj.linkKey === pathname || pathname.includes(obj.key)
            ? 'bg-teal-50 text-teal-500'
            : 'bg-white text-gray-800'
        }`}
        to={obj.linkKey}
        key={i}
      >
        {obj.title ?? ' '}
      </Link>
    ))}
  </div>
);

const AuctionLink = ({ campaign }: { campaign: any }) => (
  <div className='col-span-12 md:col-span-6 flex justify-end h-fit'>
    <div
      className={`flex items-center justify-center w-full md:w-fit mb-2.5 md:mb-0 ${campaign?.campaign?.themeColor?.light} px-2 py-1.5 rounded-3xl`}
    >
      <Link
        to={`/campaigns/${campaign?.campaign?.customCampaignLink}`}
        className={`text-sm ${campaign?.campaign?.themeColor?.text} mx-3 duration-100 hover:no-underline hover:text-teal-700`}
      >
        https://www.littlepawsdr.org/campaigns/{campaign?.campaign?.customCampaignLink}
      </Link>
      <Link
        to={`/campaigns/${campaign?.campaign?.customCampaignLink}`}
        className='hidden md:flex items-center bg-[#fff] px-3 py-1.5 rounded-tr-3xl rounded-br-3xl duration-100 hover:bg-gray-50 hover:no-underline'
      >
        <i className={`fa-regular fa-sm fa-eye ${campaign?.campaign?.themeColor?.text} mr-1`}></i>
        <p className={`font-Matter-Regular ${campaign?.campaign?.themeColor?.text} text-sm`}>
          View
        </p>
      </Link>
    </div>
  </div>
);

const StatusAndTitleSection = ({
  isLoading,
  campaign,
  status,
}: {
  isLoading: boolean;
  campaign: any;
  status: string;
}) => (
  <div className='col-span-12 md:col-span-6'>
    {isLoading ? (
      <div className='flex items-center h-full'>
        <TailwindSpinner
          color={`fill-${campaign?.campaign?.themeColor?.darker?.substring(3)}`}
          wAndH='w-8 h-8'
        />
      </div>
    ) : (
      <Fragment>
        <div
          className={`${
            status === 'Pre-Campaign'
              ? 'text-blue-700 bg-blue-100'
              : status === 'Active Campaign'
              ? 'text-green-700 bg-green-100'
              : 'text-gray-600 bg-gray-100'
          } text-sm rounded-2xl px-2 py-0.5 w-fit font-Matter-Regular`}
        >
          {status}
        </div>
        <div className='text-2xl font-Matter-Medium h-8 mb-[8px] md:mb-0'>
          {campaign?.campaign?.title}
        </div>
      </Fragment>
    )}
  </div>
);

const Navbar = ({ id, pathname, isLoading }: { id: string; pathname: string; isLoading?: any }) => {
  const campaign = useSelector((state: RootState) => state.campaign);
  const status = campaign?.campaign?.campaignStatus;

  return (
    <div className='flex flex-col mb-3'>
      <div className='grid grid-cols-12 gap-3 md:mb-3'>
        <StatusAndTitleSection isLoading={isLoading} campaign={campaign} status={status} />
        <AuctionLink campaign={campaign} />
      </div>
      <NavLinkSection id={id} pathname={pathname} />
    </div>
  );
};

export default Navbar;
