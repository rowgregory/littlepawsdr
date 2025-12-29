import { Routes, Route, Navigate } from 'react-router-dom';
import SupporterOverview from './SupporterOverview';
import SupporterLayout from './layout';
import SupporterDonations from './SupporterDonations';
import SupporterProfile from './SupporterProfile';
import SecurityPage from './Security';
import SupporterAuctions from './SupporterAuctions';
import SupporterAdoptionApplications from './SupporterAdoptionApplications';
import SupporterOrders from './SupporterOrders';
import SupporterBugs from './SupporterBugs';
import BugDrawer from '../../components/drawers/BugDrawer';
import RequireAuth from '../../lib/utils/auth/RequireAuth';

const SupporterRoutes = () => {
  return (
    <RequireAuth>
      <BugDrawer />
      <SupporterLayout>
        <Routes>
          {/* Main Dashboard */}
          <Route path='overview' element={<SupporterOverview />} />

          {/* Activity Section */}
          <Route path='donations' element={<SupporterDonations />} />
          <Route path='adoption-applications' element={<SupporterAdoptionApplications />} />
          <Route path='orders' element={<SupporterOrders />} />

          {/* Auction Section */}
          <Route path='auctions' element={<SupporterAuctions />} />

          {/* Account Section */}
          <Route path='profile' element={<SupporterProfile />} />
          <Route path='security' element={<SecurityPage />} />

          {/* Support Section */}
          <Route path='report-bug' element={<SupporterBugs />} />

          {/* 404 */}
          <Route path='*' element={<Navigate to='/supporter' replace />} />
        </Routes>
      </SupporterLayout>
    </RequireAuth>
  );
};

export default SupporterRoutes;
