import { Routes, Route, useLocation } from 'react-router-dom';
import Campaigns from './Campaigns';
import Details from './Details';
import AuctionSettings from './Auction/AuctionSettings';
import AuctionItems from './Auction/AuctionItems';
import Bidders from './Auction/Bidders';
import WinningBids from './Auction/WinningBids';
import Notifications from './Auction/Notifications';
import AuctionItem from './Auction/AuctionItem';
import CampaignSharing from './Sharing/CampaignSharing';
import AuctionItemBids from './Auction/AuctionItemBids';
import ItemFulfillment from './Auction/ItemFulfillment';
import AuctionDonations from './Auction/AuctionDonations';
import Navbar from '../../../components/admin/campaigns/Navbar';
import Sidebar from '../../../components/admin/campaigns/Sidebar';
import sharingSidebarLinksData from '../../../utils/campaign-utils/sharingSidebarLinkData';
import auctionSidebarLinksData from '../../../utils/campaign-utils/auctionSidebarLinkData';
import AuctionLayout from '../../../components/layouts/AuctionLayout';
import PrivateCampaignLayout from '../../../components/layouts/PrivateCampaignLayout';
import InstantBuyers from './Auction/InstantBuyers';

const CampaignRoutes = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[3];
  const auctionItemId = pathname.split('/')[6];

  return (
    <Routes>
      <Route path='/' element={<Campaigns />} />
      <Route
        path=':id/*'
        element={
          <PrivateCampaignLayout navbar={<Navbar id={id} pathname={pathname} />}>
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
                  <AuctionLayout
                    sidebar={
                      <Sidebar sidebarLinkArr={auctionSidebarLinksData(id, auctionItemId)} />
                    }
                  >
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
                      <Route path='instant-buyers' element={<InstantBuyers />} />
                      <Route path='bidders' element={<Bidders />} />
                      <Route path='winning-bids' element={<WinningBids />} />
                      <Route path='item-fulfillment' element={<ItemFulfillment />} />
                    </Routes>
                  </AuctionLayout>
                }
              />
            </Routes>
          </PrivateCampaignLayout>
        }
      />
    </Routes>
  );
};

export default CampaignRoutes;
