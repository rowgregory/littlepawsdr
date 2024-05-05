import { FC, Fragment, ReactNode, useEffect } from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import Campaigns from './Campaigns';
import Overview from './Overview';
import Auction from './Auction';
import AuctionItem from './AuctionItem';
import { NoImgDog, TransparentPurpleLogo } from '../../components/assets';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BuyAuctionItemNow from './BuyAuctionItemNow';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { useGetCampaignByCustomLinkIdQuery } from '../../redux/services/campaignApi';
import { toggleUserDropdown } from '../../redux/features/navbar/navbarSlice';
import { pastelColorRandomizer } from '../../utils/pastelColorRandomizer';
import { navbarBtnStyles } from '../../components/navbar/navbarHelpers';
import { io } from 'socket.io-client';

interface CampaignLayoutProps {
  navbar: ReactNode;
  children: ReactNode;
}


// const socket = io('http://localhost:5000');
const socket = io('https://www.littlepawsdr.org:5000');

const CampaignLayout: FC<CampaignLayoutProps> = ({ navbar, children }) => {
  const params = useParams();
  const { pathname } = useLocation();
  const isBuying = pathname?.split('/')[6] === 'buy';
  const { refetch } = useGetCampaignByCustomLinkIdQuery(params.customLinkId);


  useEffect(() => {
    socket.on('auction-updated', () => {
      refetch()
    });

    return () => {
      socket.off('auction-updated');
    };
  }, [refetch]);

  return (
    <Fragment>
      {!isBuying && <header className='border-b border-gray-100'>{navbar}</header>}
      <main>{children}</main>
    </Fragment>
  );
};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const location = useLocation();
  const customLinkId = params.customLinkId;
  const baseUrl = `/campaigns/${customLinkId}`;
  const auctionUrl = `/auction`;
  const state = useSelector((state: RootState) => state);
  const user = state?.auth?.user;
  const campaign = state.campaign?.campaign;
  const hoverTextColor = campaign.themeColor.text;
  const color = pastelColorRandomizer();

  return (
    <div className={`flex items-center justify-between py-2 w-full max-w-[1340px] mx-auto px-3.5`}>
      <Link to='/'>
        <img src={TransparentPurpleLogo} className='max-w-20 w-full' alt='Little Paws Dachshund Rescue' />
      </Link>
      <div className='flex gap-2'>
        <Link
          to={baseUrl}
          className={`text-sm font-Matter-Medium px-3 py-1.5 hover:no-underline hover:${hoverTextColor} ${baseUrl === location.pathname ? `${campaign?.themeColor.light} rounded-lg ${hoverTextColor}` : ''
            }`}
        >
          Overview
        </Link>
        {campaign?.auction?.settings?.isAuctionPublished && (
          <Link
            to={`${baseUrl}${auctionUrl}`}
            className={`text-sm font-Matter-Medium px-3 py-1.5 hover:no-underline hover:${hoverTextColor} ${location.pathname.includes(auctionUrl) ? `${campaign?.themeColor.light} rounded-lg ${hoverTextColor}` : ''
              }`}
          >
            Auction
          </Link>
        )}
      </div>
      <div className='flex items-center'>
        {user?.isAdmin && (
          <Link
            className='font-Matter-Regular text-sm mr-2 absolute right-10'
            to={`/admin/campaigns/${state.campaign.campaign._id}/details`}
          >
            Dashbaord
          </Link>
        )}
        {user?.isAdmin ? (
          <img
            src={user?.avatar || NoImgDog}
            className='w-10 h-10 rounded-full cursor-pointer object-cover duration-200'
            onClick={() => dispatch(toggleUserDropdown({ userDropdown: true }))}
            alt={user?.name}
          />
        ) : user?._id ? (
          <div
            style={{ background: color }}
            className={`uppercase cursor-pointer h-10 w-10 rounded-full flex items-center justify-center`}
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

const CampaignRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Campaigns />} />
      <Route
        path=':customLinkId/*'
        element={
          <CampaignLayout navbar={<Navbar />}>
            <Routes>
              <Route index element={<Overview />} />
              <Route
                path='auction/*'
                element={
                  <Routes>
                    <Route index element={<Auction />} />
                    <Route path='item/:auctionItemId/:bid?' element={<AuctionItem />} />
                    <Route path='item/:auctionItemId/buy/:paid?' element={<BuyAuctionItemNow />} />
                  </Routes>
                }
              />
            </Routes>
          </CampaignLayout>
        }
      />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default CampaignRoutes;
