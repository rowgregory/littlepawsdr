import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { TransparentPurpleLogo } from '../assets';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { toggleNavigationDrawer } from '../../redux/features/navbar/navbarSlice';

const navbarBtnStyles = `bg-gray-300 text-slate-200 h-10 w-10 rounded-full flex justify-center items-center cursor-pointer duration-300 hover:bg-gray-400 hover:no-underline`;

const CampaignHeader = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const location = useLocation();
  const customLinkId = params.customLinkId;
  const baseUrl = `/campaigns/${customLinkId}`;
  const auctionUrl = `/auction`;
  const auth = useSelector((state: RootState) => state.auth);
  const campaignState = useSelector((state: RootState) => state.campaign);
  const user = auth?.user;
  const campaign = campaignState?.campaign;
  const hoverTextColor = campaign?.themeColor?.text;

  return (
    <div className={`flex items-center justify-between py-2 w-full max-w-[1340px] mx-auto px-2.5`}>
      <Link to='/'>
        <img
          src={TransparentPurpleLogo}
          className='max-w-16 sm:max-w-20 w-full'
          alt='Little Paws Dachshund Rescue'
        />
      </Link>
      <div className='flex'>
        <Link
          to={baseUrl}
          className={`text-sm font-Matter-Medium px-3 py-1.5 hover:no-underline hover:${hoverTextColor} ${
            baseUrl === location.pathname
              ? `${campaign?.themeColor?.light} rounded-lg ${hoverTextColor}`
              : ''
          }`}
        >
          Overview
        </Link>
        {campaign?.auction?.settings?.isAuctionPublished && (
          <Link
            to={`${baseUrl}${auctionUrl}`}
            className={`text-sm font-Matter-Medium px-3 py-1.5 hover:no-underline hover:${hoverTextColor} ${
              location.pathname.includes(auctionUrl)
                ? `${campaign?.themeColor?.light} rounded-lg ${hoverTextColor}`
                : ''
            }`}
          >
            Auction
          </Link>
        )}
      </div>
      <div className='flex items-center'>
        {user?._id ? (
          <div
            className={`uppercase cursor-pointer w-8 h-8 sm:h-10 sm:w-10 rounded-full flex items-center font-Matter-Light justify-center ${campaign?.themeColor?.dark}`}
            onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: true }))}
          >
            {user?.firstNameFirstInitial}
            {user?.lastNameFirstInitial}
          </div>
        ) : (
          <Link to='/auth/login' className={navbarBtnStyles}>
            <i className='fas fa-user text-gray-800'></i>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CampaignHeader;
