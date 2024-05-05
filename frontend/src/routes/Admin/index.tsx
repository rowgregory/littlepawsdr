import { ComponentType, FC, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayoutWithSideBar } from '../../components/layouts/DashboardLayoutWithSideBar';
import Dashboard from './Dashboard';
import PrivateRoute from '../../components/common/PrivateRoute';
import Archive from './Archive';
import Sidebar from '../../components/dashboard/dashboard2024/Sidebar';
import OneTimeDonations from './OneTimeDonations';

type LazyModulePromise<T = {}> = Promise<{ default: ComponentType<T> }>;

const Campaigns = lazy((): LazyModulePromise => import('./Campaigns'));
const Contacts = lazy((): LazyModulePromise => import('./Contacts'));
const VirtualStore = lazy((): LazyModulePromise => import('./VirtualStore'));
const Misc = lazy((): LazyModulePromise => import('./Miscellaneous'));
const Orders = lazy((): LazyModulePromise => import('./CustomerOrders'));
const AdoptionApplication = lazy((): LazyModulePromise => import('./AdoptionApplication'));

const AdminRoutes: FC = () => {
  return (
    <DashboardLayoutWithSideBar sideBar={<Sidebar />}>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='archive'
          element={
            <PrivateRoute>
              <Archive />
            </PrivateRoute>
          }
        />

        <Route
          path='campaigns/*'
          element={
            <PrivateRoute>
              <Campaigns />
            </PrivateRoute>
          }
        />
        <Route
          path='contacts/*'
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />
        <Route
          path='one-time-donations'
          element={
            <PrivateRoute>
              <OneTimeDonations />
            </PrivateRoute>
          }
        />
        <Route
          path='virtual-store/*'
          element={
            <PrivateRoute>
              <VirtualStore />
            </PrivateRoute>
          }
        />
        <Route
          path='misc/*'
          element={
            <PrivateRoute>
              <Misc />
            </PrivateRoute>
          }
        />
        <Route
          path='customer-orders/*'
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path='adoption-application/*'
          element={
            <PrivateRoute>
              <AdoptionApplication />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </DashboardLayoutWithSideBar>
  );
};

export default AdminRoutes;
