import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RequireAdmin from '../../lib/utils/auth/RequireAdmin';
import Dashboard from './Dashboard';
import AdminLayout from './layout';
import { LazyModulePromise } from '../../types/common-types';
import Orders from './Orders';
import Changelog from './Changelog';
import { ChangelogModal } from '../../components/modals/ChangelogModal';
import AdminMobileNavigationDrawer from '../../components/drawers/AdminMobileNavigationDrawer';
import AuctionItemDrawer from '../../components/drawers/AuctionItemDrawer';
import Users from './Users';
import UserDrawer from '../../components/drawers/UserDrawer';
import Store from './Store';
import AdminBugs from './Bugs';
import BugDrawer from '../../components/drawers/BugDrawer';
import WelcomeWienerDrawer from '../../components/drawers/WelcomeWienerDrawer';
import ProductDrawer from '../../components/drawers/ProductDrawer';
import EcardDrawer from '../../components/drawers/EcardDrawer';
import Donations from './Donations';
import OrderDrawer from '../../components/drawers/OrderDrawer';
import AuctionItemBidsDrawer from '../../components/drawers/AuctionItemBidsDrawer';
import AdminNewsletterIssues from './AdminNewsletterIssues';

const Auctions = lazy((): LazyModulePromise => import('./Auction'));
const AdoptionApplication = lazy((): LazyModulePromise => import('./AdoptionApplication'));

const AdminRoutes = () => {
  return (
    <RequireAdmin>
      {/* Drawers */}
      <AdminMobileNavigationDrawer />
      <AuctionItemBidsDrawer />
      <AuctionItemDrawer />
      <BugDrawer />
      <ChangelogModal />
      <EcardDrawer />
      <OrderDrawer />
      <ProductDrawer />
      <UserDrawer />
      <WelcomeWienerDrawer />

      <AdminLayout>
        <Routes>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='users' element={<Users />} />
          <Route path='store' element={<Store />} />
          <Route path='donations' element={<Donations />} />
          <Route path='orders' element={<Orders />} />
          <Route path='bugs' element={<AdminBugs />} />
          <Route path='changelog' element={<Changelog />} />
          <Route path='auctions/*' element={<Auctions />} />
          <Route path='adoption-application/*' element={<AdoptionApplication />} />
          <Route path='newsletters' element={<AdminNewsletterIssues />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Routes>
      </AdminLayout>
    </RequireAdmin>
  );
};

export default AdminRoutes;
