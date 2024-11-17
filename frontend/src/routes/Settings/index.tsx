import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Profile';
import Security from './Security';
import UserAuctionSettings from './UserAuctionSettings';
import Bids from './Bids';
import AuctionDonations from './AuctionDonations';
import InstantBuys from './InstantBuys';
import WinningBids from './WinningBids';
import AdoptionApplicationFees from './AdoptionApplicationFees';
import Purchases from './Purchases';
import Donations from './Donations';
import { campaignLinks, digitalGoodsAndMerchLinks } from '../../components/data/settings-data';
import SettingsNavbar from '../../components/settings/SettingsNavbar';
import SettingsSidebar from '../../components/settings/SettingsSidebar';
import SettingsLayoutWithNavbar from '../../components/settings/SettingsLayoutWithNavbar';
import SettingsInnerLayoutWithSideBar from '../../components/settings/SettingsInnerLayoutWithSidebar';

const SettingsRoutes = () => {
  return (
    <SettingsLayoutWithNavbar navbar={<SettingsNavbar />}>
      <Routes>
        <Route path='profile' element={<Profile />} />
        <Route path='security' element={<Security />} />
        <Route
          path='campaign/*'
          element={
            <SettingsInnerLayoutWithSideBar sidebar={<SettingsSidebar links={campaignLinks} />}>
              <Routes>
                <Route path='settings' element={<UserAuctionSettings />} />
                <Route path='bids' element={<Bids />} />
                <Route path='winning-bids' element={<WinningBids />} />
                <Route path='donations' element={<AuctionDonations />} />
                <Route path='instant-buys' element={<InstantBuys />} />
              </Routes>
            </SettingsInnerLayoutWithSideBar>
          }
        />
        <Route
          path='digital-goods-and-merch/*'
          element={
            <SettingsInnerLayoutWithSideBar
              sidebar={<SettingsSidebar links={digitalGoodsAndMerchLinks} />}
            >
              <Routes>
                <Route path='adoption-application-fees' element={<AdoptionApplicationFees />} />
                <Route path='purchases' element={<Purchases />} />
                <Route path='donations' element={<Donations />} />
              </Routes>
            </SettingsInnerLayoutWithSideBar>
          }
        />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </SettingsLayoutWithNavbar>
  );
};

export default SettingsRoutes;
