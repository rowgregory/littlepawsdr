import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import OneTimeDonations from './OneTimeDonations';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { LazyModulePromise } from '../../types/common-types';
import RequireAdmin from '../../components/auth/RequireAdmin';
import { useFetchDashboardDataQuery } from '../../redux/services/dashboardApi';
import Orders from './Orders';
import Changelog from './Changelog';
import { ChangelogModal } from '../../components/modals/ChangelogModal';

const Campaigns = lazy((): LazyModulePromise => import('./Campaigns'));
const Contacts = lazy((): LazyModulePromise => import('./Contacts'));
const Store = lazy((): LazyModulePromise => import('./Store'));
const AdoptionApplication = lazy((): LazyModulePromise => import('./AdoptionApplication'));

const AdminRoutes = () => {
  const { data } = useFetchDashboardDataQuery();

  return (
    <RequireAdmin>
      <ChangelogModal />
      <DashboardLayout>
        <Routes>
          <Route path='/' element={<Dashboard data={data} />} />
          <Route path='campaigns/*' element={<Campaigns />} />
          <Route path='contacts/*' element={<Contacts />} />
          <Route path='one-time-donations' element={<OneTimeDonations />} />
          <Route path='store/*' element={<Store />} />
          <Route path='orders' element={<Orders />} />
          <Route path='adoption-application/*' element={<AdoptionApplication />} />
          <Route path='changelog' element={<Changelog />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Routes>
      </DashboardLayout>
    </RequireAdmin>
  );
};

export default AdminRoutes;
