import { Routes, Route, useLocation } from 'react-router-dom';
import Campaigns from './Campaigns';
import Details from './Details';
import Schedule from './Auction/Schedule';
import AuctionItems from './Auction/AuctionItems';
import Bidders from './Auction/Bidders';
import WinningBids from './Auction/WinningBids';
import Notifications from './Auction/Notifications';
import AuctionItemBids from './Auction/AuctionItemBids';
import Navbar from '../../../components/admin/campaigns/Navbar';
import AuctionLayout from '../../../components/layouts/AuctionLayout';
import AdminCampaignLayout from '../../../components/layouts/AdminCampaignLayout';
import InstantBuyers from './Auction/InstantBuyers';
import AuctionItemCreateDrawer from '../../../components/drawers/AuctionItemCreateDrawer';
import AuctionItemUpdateDrawer from '../../../components/drawers/AuctionItemUpdateDrawer';

const CampaignRoutes = () => {
  const { pathname } = useLocation();
  const id = pathname?.split('/')[3];

  return (
    <>
      <AuctionItemCreateDrawer />
      <AuctionItemUpdateDrawer />
      <Routes>
        <Route path='/' element={<Campaigns />} />
        <Route
          path=':id/*'
          element={
            <AdminCampaignLayout navbar={<Navbar id={id} pathname={pathname} />}>
              <Routes>
                <Route path='details' element={<Details />} />

                <Route
                  path='auction/*'
                  element={
                    <AuctionLayout>
                      <Routes>
                        <Route index element={<Schedule />} />
                        <Route path='notifications' element={<Notifications />} />
                        <Route
                          path='items/*'
                          element={
                            <Routes>
                              <Route index element={<AuctionItems />} />
                              <Route path=':auctionItemId/:bids' element={<AuctionItemBids />} />
                            </Routes>
                          }
                        />
                        <Route path='instant-buyers' element={<InstantBuyers />} />
                        <Route path='bidders' element={<Bidders />} />
                        <Route path='winning-bids' element={<WinningBids />} />
                      </Routes>
                    </AuctionLayout>
                  }
                />
              </Routes>
            </AdminCampaignLayout>
          }
        />
      </Routes>
    </>
  );
};

export default CampaignRoutes;
