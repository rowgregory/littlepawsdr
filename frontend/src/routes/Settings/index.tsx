import { ReactNode } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Profile from './Profile';
import Security from './Security';
import { Link } from 'react-router-dom';
import UserAuctionSettings from './UserAuctionSettings';
import Bids from './Bids';
import { useFetchPersonalDataQuery } from '../../redux/services/userApi';
import AuctionDonations from './AuctionDonations';
import InstantBuys from './InstantBuys';
import WinningBids from './WinningBids';
import AdoptionApplicationFees from './AdoptionApplicationFees';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import Purchases from './Purchases';
import Donations from './Donations';

const navbarLinkData = [
  {
    textKey: 'Profile',
    linkKey: '/settings/profile',
    urlKey: 'profile',
  },
  {
    textKey: 'Account security',
    linkKey: '/settings/security',
    urlKey: 'security',
  },
  {
    textKey: 'Campaign',
    linkKey: '/settings/campaign/settings',
    urlKey: 'campaign',
  },
  {
    textKey: 'Digital goods & merch',
    linkKey: '/settings/digital-goods-and-merch/adoption-application-fees',
    urlKey: 'merch',
  },
];

const campaignLinks = [
  {
    textKey: 'Settings',
    linkKey: '/settings/campaign/settings',
    urlKey: 'settings',
  },
  {
    textKey: 'Bids',
    linkKey: '/settings/campaign/bids',
    urlKey: 'bids',
  },
  {
    textKey: 'Winning Bids',
    linkKey: '/settings/campaign/winning-bids',
    urlKey: 'winning-bids',
  },
  {
    textKey: ' Donations',
    linkKey: '/settings/campaign/donations',
    urlKey: 'donations',
  },
  {
    textKey: ' Instant Buys',
    linkKey: '/settings/campaign/instant-buys',
    urlKey: 'instant-buys',
  },
];

const digitalGoodsAndMerchLinks = [
  {
    textKey: 'Adoption Application Fees',
    linkKey: '/settings/digital-goods-and-merch/adoption-application-fees',
    urlKey: 'adoption-application-fees',
  },
  {
    textKey: 'Purchases',
    linkKey: '/settings/digital-goods-and-merch/purchases',
    urlKey: 'purchases',
  },
  {
    textKey: 'Donations',
    linkKey: '/settings/digital-goods-and-merch/donations',
    urlKey: 'donations',
  },
];

const Navbar = () => {
  const key = useParams()['*'];
  return (
    <div className='mb-8 p-1 bg-white border border-gray-100 rounded-lg w-full flex font-Matter-Regular overflow-x-scroll sm:overflow-x-hidden'>
      {navbarLinkData.map((obj: any, i: number) => (
        <Link
          className={`py-2.5 px-4 rounded-md hover:no-underline hover:text-teal-500 whitespace-nowrap ${obj.linkKey === key || key?.includes(obj.urlKey) ? 'bg-teal-50 text-teal-500' : 'bg-white text-gray-800'
            }`}
          to={obj.linkKey}
          key={i}
        >
          {obj.textKey}
        </Link>
      ))}
    </div>
  );
};

const Sidebar = ({ links }: { links: { textKey: string; linkKey: string; urlKey: string }[] }) => {
  const key = useParams()['*'];
  return (

    <div className='flex sm:flex-col mb-8 p-1 bg-[#fff] border border-gray-100 rounded-lg w-full font-Matter-Regular overflow-x-scroll sm:overflow-hidden'>
      {links.map((obj: any, i: number) => (
        <Link
          className={`py-2.5 px-4 rounded-md hover:no-underline hover:text-teal-500 whitespace-nowrap ${obj.urlKey === key ? 'bg-teal-50 text-teal-400' : 'bg-[#fff] text-gray-800'
            }`}
          to={obj.linkKey}
          key={i}
        >
          {obj.textKey}
        </Link>
      ))}
    </div>
  );
};

const SettingsLayoutWithNavbar = ({ children, navbar }: { children: ReactNode; navbar: ReactNode }) => {
  const { error, isLoading } = useFetchPersonalDataQuery();
  return (
    <div className='bg-gray-50 min-h-screen pt-24 md:pt-28 px-2.5 md:px-8 pb-3'>
      <div className='w-full mx-auto max-w-screen-xl'>
        <nav>{navbar}</nav>
        {isLoading && <GreenRotatingTransparentCircle />}
        {!error && <main>{children}</main>}
      </div>
    </div>
  );
};

const InnerLayoutWithSideBar = ({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) => {
  return (
    <div className='mx-auto w-full grid grid-cols-12 gap-4 '>
      <aside className='col-span-12 md:col-span-3'>{sidebar}</aside>
      <main className='col-span-12 md:col-span-9'>{children}</main>
    </div>
  );
};

const SettingsRoutes = () => {
  return (
    <SettingsLayoutWithNavbar navbar={<Navbar />}>
      <Routes>
        <Route path='profile' element={<Profile />} />
        <Route path='security' element={<Security />} />
        <Route
          path='campaign/*'
          element={
            <InnerLayoutWithSideBar sidebar={<Sidebar links={campaignLinks} />}>
              <Routes>
                <Route path='settings' element={<UserAuctionSettings />} />
                <Route path='bids' element={<Bids />} />
                <Route path='winning-bids' element={<WinningBids />} />
                <Route path='donations' element={<AuctionDonations />} />
                <Route path='instant-buys' element={<InstantBuys />} />
              </Routes>
            </InnerLayoutWithSideBar>
          }
        />
        <Route
          path='digital-goods-and-merch/*'
          element={
            <InnerLayoutWithSideBar sidebar={<Sidebar links={digitalGoodsAndMerchLinks} />}>
              <Routes>
                <Route path='adoption-application-fees' element={<AdoptionApplicationFees />} />
                <Route path='purchases' element={<Purchases />} />
                <Route path='donations' element={<Donations />} />

              </Routes>
            </InnerLayoutWithSideBar>
          }
        />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </SettingsLayoutWithNavbar>
  );
};

export default SettingsRoutes;
