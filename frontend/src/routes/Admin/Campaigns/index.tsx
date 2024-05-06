import { FC, Fragment, ReactNode, cloneElement, useEffect } from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Campaigns from './Campaigns';
import Details from './Details';
import Settings from './Settings';
import AuctionSettings from './Auction/AuctionSettings';
import AuctionItems from './Auction/AuctionItems';
import Bidders from './Auction/Bidders';
import WinningBids from './Auction/WinningBids';
import Notifications from './Auction/Notifications';
import AuctionItem from './Auction/AuctionItem';
import CampaignSharing from './Sharing/CampaignSharing';
import { RootState } from '../../../redux/toolkitStore';
import AuctionItemBids from './Auction/AuctionItemBids';
import { Link } from 'react-router-dom';
import { useGetCampaignQuery } from '../../../redux/services/campaignApi';
import { io } from 'socket.io-client';
import ItemFulfillment from './Auction/ItemFulfillment';
import TailwindSpinner from '../../../components/Loaders/TailwindSpinner';
import AuctionDonations from './Auction/AuctionDonations';

const navbarLinksData = (id: string) => [
  {
    title: 'Details',
    key: 'details',
    linkKey: `/admin/campaigns/${id}/details`,
  },
  {
    title: 'Sharing',
    key: 'sharing',
    linkKey: `/admin/campaigns/${id}/sharing`,
  },
  {
    title: 'Auction',
    key: 'auction',
    linkKey: `/admin/campaigns/${id}/auction`,
  },
  {
    title: 'Settings',
    key: 'settings',
    linkKey: `/admin/campaigns/${id}/settings`,
  },
];

const auctionSidebarLinksData = (id: any, auctionItemId: string) => [
  {
    title: 'Auction settings',
    key: '',
    linkKey: `/admin/campaigns/${id}/auction`,
  },
  {
    title: 'Notifications',
    key: 'notifications',
    linkKey: `/admin/campaigns/${id}/auction/notifications`,
  },
  {
    title: 'Donations',
    key: 'donations',
    linkKey: `/admin/campaigns/${id}/auction/donations`,
  },
  {
    title: 'Items',
    key: 'items',
    key2: `items/${auctionItemId}/bids`,
    linkKey: `/admin/campaigns/${id}/auction/items`,
  },
  {
    title: 'Bidders',
    key: 'bidders',
    linkKey: `/admin/campaigns/${id}/auction/bidders`,
  },
  {
    title: 'Winning bids',
    key: 'winning-bids',
    linkKey: `/admin/campaigns/${id}/auction/winning-bids`,
  },
  {
    title: 'Item fulfillment',
    key: 'item-fulfillment',
    linkKey: `/admin/campaigns/${id}/auction/item-fulfillment`,
  },
];

const sharingSidebarLinksData = (id: any) => [
  {
    title: 'General',
    key: '',
    linkKey: `/admin/campaigns/${id}/sharing`,
  },
];

const Navbar = ({ id, pathname, isLoading }: { id: string; pathname: string; isLoading?: any }) => {
  const campaign = useSelector((state: RootState) => state.campaign);
  const status = campaign?.campaign?.campaignStatus;

  return (
    <div className='d-flex flex-column mb-3'>
      <div className='grid grid-cols-12 gap-3 md:mb-3'>
        <div className='col-span-12 md:col-span-6'>
          {isLoading ? (
            <div className='flex items-center h-full'>
              <TailwindSpinner color={`fill-${campaign?.campaign?.themeColor?.darker?.substring(3)}`} wAndH='w-8 h-8' />
            </div>
          ) : (
            <Fragment>
              <div
                className={`${status === 'Active' ? 'text-green-700 bg-green-100' : 'text-red-600 bg-red-100'
                  } text-sm rounded-2xl px-2 py-0.5 w-fit font-Matter-Regular`}
              >
                {status}
              </div>
              <div className='text-2xl font-Matter-Medium h-8 mb-[8px] md:mb-0'>{campaign?.campaign?.title}</div>
            </Fragment>
          )}
        </div>
        <div className='col-span-12 md:col-span-6 flex justify-end h-fit'>
          <div className={`flex items-center justify-center w-full md:w-fit mb-2.5 md:mb-0 ${campaign.campaign.themeColor.light} px-2 py-1.5 rounded-3xl`}>
            <Link
              to={`/campaigns/${campaign?.campaign?.customCampaignLink}`}
              className={`text-sm ${campaign.campaign.themeColor.text} mx-3 duration-100 hover:no-underline hover:text-teal-700`}
            >
              https://www.littlepawsdr.org/campaigns/{campaign?.campaign?.customCampaignLink}
            </Link>
            <Link
              to={`/campaigns/${campaign?.campaign?.customCampaignLink}`}
              className='hidden md:flex items-center bg-[#fff] px-3 py-1.5 rounded-tr-3xl rounded-br-3xl duration-100 hover:bg-gray-50 hover:no-underline'
            >
              <i className={`fa-regular fa-sm fa-eye ${campaign.campaign.themeColor.text} mr-1`}></i>
              <p className={`font-Matter-Regular ${campaign.campaign.themeColor.text} text-sm`}>View</p>
            </Link>
          </div>
        </div>
      </div>
      <div className='p-1 bg-white border border-gray-100 rounded-lg w-full grid grid-cols-12 font-Matter-Regular'>
        {navbarLinksData(id).map((obj: any, i: number) => (
          <Link
            className={`col-span-3 md:col-span-2 text-center py-2.5 rounded-md hover:no-underline hover:text-teal-500 ${obj.linkKey === pathname || pathname.includes(obj.key)
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
    </div>
  );
};

const Sidebar = ({ sidebarLinkArr }: any) => {
  const key = useParams()['*'];
  return (
    <div className='flex flex-col mb-3'>
      <div className='p-1 bg-white border border-gray-100 rounded-lg w-full flex font-Matter-Regular lg:flex-col overflow-x-scroll lg:overflow-hidden'>
        {sidebarLinkArr.map((obj: any, i: number) => (
          <Link
            className={`py-2.5 px-4 rounded-md hover:no-underline hover:text-teal-500 whitespace-nowrap ${obj.key === key || obj.key2 === key ? 'bg-teal-50 text-teal-400' : 'bg-white text-gray-800'
              }`}
            to={obj.linkKey}
            key={i}
          >
            {obj.title}
          </Link>
        ))}
      </div>
    </div>
  );
};


// const socket = io('http://localhost:5000');
const socket = io('https://www.littlepawsdr.org');

const CampaignLayout = ({ navbar, children }: any) => {
  const { id } = useParams();
  const { refetch, isLoading } = useGetCampaignQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    socket.on('auction-updated', () => {
      refetch()
    });

    return () => {
      socket.off('auction-updated');
    };
  }, [refetch]);

  return (
    <div className='bg-gray-50 min-h-screen pt-12 md:pt-20 px-2 sm:px-[16px] md:px-8 pb-3'>
      <div className='max-w-screen-lg w-full mx-auto'>
        <header>{cloneElement(navbar, { isLoading })}</header>
        <main>{children}</main>
      </div>
    </div>
  );
};

const AuctionLayout = ({ sidebar, children }: { sidebar: any; children: ReactNode }) => {
  return (
    <div className='mx-auto w-full grid grid-cols-12 gap-4 '>
      <aside className='col-span-12 md:col-span-3 h-fit'>{sidebar}</aside>
      <main className='col-span-12 pb-12 md:col-span-9'>{children}</main>
    </div>
  );
};

const CampaignRoutes: FC = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[3];
  const auctionItemId = pathname.split('/')[6];

  return (
    <Routes>
      <Route path='/' element={<Campaigns />} />
      <Route
        path=':id/*'
        element={
          <CampaignLayout navbar={<Navbar id={id} pathname={pathname} />}>
            <Routes>
              <Route path='details' element={<Details />} />
              <Route
                path='sharing/*'
                element={
                  <AuctionLayout sidebar={<Sidebar sidebarLinkArr={sharingSidebarLinksData(id)} />}>
                    <Routes>
                      <Route index element={<CampaignSharing />} />
                    </Routes>
                  </AuctionLayout>
                }
              />
              <Route
                path='auction/*'
                element={
                  <AuctionLayout sidebar={<Sidebar sidebarLinkArr={auctionSidebarLinksData(id, auctionItemId)} />}>
                    <Routes>
                      <Route index element={<AuctionSettings />} />
                      <Route path='notifications' element={<Notifications />} />
                      <Route path='donations' element={<AuctionDonations />} />
                      <Route
                        path='items/*'
                        element={
                          <Routes>
                            <Route index element={<AuctionItems />} />
                            <Route path='new' element={<AuctionItem />} />
                            <Route path=':auctionItemId/edit' element={<AuctionItem />} />
                            <Route path=':auctionItemId/:bids' element={<AuctionItemBids />} />
                          </Routes>
                        }
                      />
                      <Route path='bidders' element={<Bidders />} />
                      <Route path='winning-bids' element={<WinningBids />} />
                      <Route path='item-fulfillment' element={<ItemFulfillment />} />
                    </Routes>
                  </AuctionLayout>
                }
              />
              <Route path='settings' element={<Settings />} />
            </Routes>
          </CampaignLayout>
        }
      />
    </Routes>
  );
};

export default CampaignRoutes;
