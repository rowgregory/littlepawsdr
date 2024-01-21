import { ComponentType, FC, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayoutWithSideBar } from '../../components/layouts/DashboardLayoutWithSideBar';
import Dashboard from './Dashboard';
import ECardEdit from './ECardEdit';
import ECardList from './ECardList';
import EventEdit from './EventEdit';
import EventList from './EventList';
import NewsletterEmailList from './NewsletterEmailList';
import ProductEdit from './ProductEdit';
import ProductList from './ProductList';
import UserEdit from './UserEdit';
import UserList from './UserList';
import BlogList from './BlogList';
import BlogEdit from './BlogEdit';
import EducationTipList from './EducationTipList';
import EducationTipEdit from './EducationTipEdit';
import PrivateRoute from '../../components/common/PrivateRoute';
import ManuallyAddedUserList from './ManuallyAddedUserList';
import ManuallyAddedUserEdit from './ManuallyAddedUserEdit';
import EcardOrderList from './Orders/EcardOrderList';
import OrderEdit from './OrderEdit';
import WelcomeWienerProductList from './WelcomeWienerProductList';
import WelcomeWienerProductEdit from './WelcomeWienerProductEdit';
import WelcomeWienerDachshundList from './WelcomeWienerDachshundList';
import WelcomeWienerDachshundEdit from './WelcomeWienerDachshundEdit';
import WelcomeWienerOrderList from './Orders/WelcomeWienerOrderList';
import ProductOrderList from './Orders/ProductOrderList';
import AdoptionFeeList from './AdoptionFeeList';
import Archive from './Archive';
import ActionHistoryList from './ActionHistoryList';
import Sidebar from '../../components/dashboard/dashboard2024/Sidebar';
import Selling from './Selling';

type LazyModulePromise<T = {}> = Promise<{ default: ComponentType<T> }>;
const Orders = lazy((): LazyModulePromise => import('./Orders'));

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
          path='userList'
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />
        <Route
          path='user/:id/edit'
          element={
            <PrivateRoute>
              <UserEdit />
            </PrivateRoute>
          }
        />
        <Route
          path='eventList'
          element={
            <PrivateRoute>
              <EventList />
            </PrivateRoute>
          }
        />
        <Route
          path='event/:id/edit'
          element={
            <PrivateRoute>
              <EventEdit />
            </PrivateRoute>
          }
        />
        <Route
          path='product/list'
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path='product/:id/edit'
          element={
            <PrivateRoute>
              <ProductEdit />
            </PrivateRoute>
          }
        />
        <Route
          path='orders/*'
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path='order/:id'
          element={
            <PrivateRoute>
              <OrderEdit />
            </PrivateRoute>
          }
        />
        <Route
          path='eCardOrderList'
          element={
            <PrivateRoute>
              <EcardOrderList />
            </PrivateRoute>
          }
        />

        <Route
          path='newsletterEmailList'
          element={
            <PrivateRoute>
              <NewsletterEmailList />
            </PrivateRoute>
          }
        />
        <Route
          path='eCardList'
          element={
            <PrivateRoute>
              <ECardList />
            </PrivateRoute>
          }
        />
        <Route
          path='eCard/:id/edit'
          element={
            <PrivateRoute>
              <ECardEdit />
            </PrivateRoute>
          }
        />
        <Route
          path='blogs'
          element={
            <PrivateRoute>
              <BlogList />
            </PrivateRoute>
          }
        />
        <Route
          path='blog/:id/edit'
          element={
            <PrivateRoute>
              <BlogEdit />
            </PrivateRoute>
          }
        />
        <Route
          path='education-tips'
          element={
            <PrivateRoute>
              <EducationTipList />
            </PrivateRoute>
          }
        />
        <Route
          path='education-tip/:id/edit'
          element={
            <PrivateRoute>
              <EducationTipEdit />
            </PrivateRoute>
          }
        />
        <Route
          path='manuallyAddedUser/:id/edit'
          element={
            <PrivateRoute>
              <ManuallyAddedUserEdit />
            </PrivateRoute>
          }
        />
        <Route
          path='manuallyAddedUserList'
          element={
            <PrivateRoute>
              <ManuallyAddedUserList />
            </PrivateRoute>
          }
        />
        <Route
          path='welcome-wiener/product/list'
          element={
            <PrivateRoute>
              <WelcomeWienerProductList />
            </PrivateRoute>
          }
        />
        <Route
          path='welcome-wiener/product/:id/edit'
          element={
            <PrivateRoute>
              <WelcomeWienerProductEdit />
            </PrivateRoute>
          }
        />
        <Route
          path='welcome-wiener/dachshund/list'
          element={
            <PrivateRoute>
              <WelcomeWienerDachshundList />
            </PrivateRoute>
          }
        />
        <Route
          path='welcome-wiener/dachshund/:id/edit'
          element={
            <PrivateRoute>
              <WelcomeWienerDachshundEdit />
            </PrivateRoute>
          }
        />
        <Route
          path='welcome-wiener/order/list'
          element={
            <PrivateRoute>
              <WelcomeWienerOrderList />
            </PrivateRoute>
          }
        />
        <Route
          path='product/order/list'
          element={
            <PrivateRoute>
              <ProductOrderList />
            </PrivateRoute>
          }
        />
        <Route
          path='adoption-application-fee/list'
          element={
            <PrivateRoute>
              <AdoptionFeeList />
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
          path='action-history'
          element={
            <PrivateRoute>
              <ActionHistoryList />
            </PrivateRoute>
          }
        />
        <Route
          path='selling'
          element={
            <PrivateRoute>
              <Selling />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </DashboardLayoutWithSideBar>
  );
};

export default AdminRoutes;
