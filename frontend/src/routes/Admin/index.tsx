import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import OneTimeDonations from './OneTimeDonations';
import AdminNavigationPanel from '../../components/admin/admin-navigation/AdminNavigation';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { LazyModulePromise } from '../../types/common-types';

const Campaigns = lazy((): LazyModulePromise => import('./Campaigns'));
const Contacts = lazy((): LazyModulePromise => import('./Contacts'));
const Store = lazy((): LazyModulePromise => import('./Store'));
const Orders = lazy((): LazyModulePromise => import('./CustomerOrders'));
const AdoptionApplication = lazy((): LazyModulePromise => import('./AdoptionApplication'));

const AdminRoutes = () => (
  <DashboardLayout sidebar={<AdminNavigationPanel />}>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='campaigns/*' element={<Campaigns />} />
      <Route path='contacts/*' element={<Contacts />} />
      <Route path='one-time-donations' element={<OneTimeDonations />} />
      <Route path='store/*' element={<Store />} />
      <Route path='customer-orders/*' element={<Orders />} />
      <Route path='adoption-application/*' element={<AdoptionApplication />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  </DashboardLayout>
);

export default AdminRoutes;
