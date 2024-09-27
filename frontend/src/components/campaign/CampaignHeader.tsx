import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { NoImgDog, TransparentPurpleLogo } from '../assets';
import { navbarBtnStyles } from '../navbar/navbarHelpers';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { pastelColorRandomizer } from '../../utils/pastelColorRandomizer';
import { toggleUserDropdown } from '../../redux/features/navbar/navbarSlice';

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
  const color = pastelColorRandomizer();

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
        {user?.isAdmin ? (
          <img
            src={user?.avatar || NoImgDog}
            className='w-8 h-8 sm:h-10 sm:w-10 rounded-full cursor-pointer object-cover duration-200'
            onClick={() => dispatch(toggleUserDropdown({ userDropdown: true }))}
            alt={user?.name}
          />
        ) : user?._id ? (
          <div
            style={{ background: color }}
            className={`uppercase cursor-pointer w-8 h-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center`}
            onClick={() => dispatch(toggleUserDropdown({ userDropdown: true }))}
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
