import { ComponentType, FC, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayoutWithSideBar } from '../../components/layouts/DashboardLayoutWithSideBar';
import SideBar from '../../components/dashboard/sidebar/SideBar';
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
import RaffleWinnerList from './RaffleWinnerList';
import RaffleWinnerEdit from './RaffleWinnerEdit';
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
import WelcomeWienerProductCreate from './WelcomeWienerProductCreate';
import WelcomeWienerProductEdit from './WelcomeWienerProductEdit';
import WelcomeWienerDachshundList from './WelcomeWienerDachshundList';
import WelcomeWienerDachshundCreate from './WelcomeWienerDachshundCreate';
import WelcomeWienerDachshundEdit from './WelcomeWienerDachshundEdit';
import WelcomeWienerOrderList from './Orders/WelcomeWienerOrderList';
import ProductOrderList from './Orders/ProductOrderList';
import ProductCreate from './ProductCreate';

type LazyModulePromise<T = {}> = Promise<{ default: ComponentType<T> }>;
const Orders = lazy((): LazyModulePromise => import('./Orders'));

const AdminRoutes: FC = () => {
  return (
    <DashboardLayoutWithSideBar sideBar={<SideBar />}>
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
          path='product/create'
          element={
            <PrivateRoute>
              <ProductCreate />
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
          path='raffleWinnerList'
          element={
            <PrivateRoute>
              <RaffleWinnerList />
            </PrivateRoute>
          }
        />
        <Route
          path='raffleWinner/:id/edit'
          element={
            <PrivateRoute>
              <RaffleWinnerEdit />
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
          path='welcome-wiener/product/create'
          element={
            <PrivateRoute>
              <WelcomeWienerProductCreate />
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
          path='welcome-wiener/dachshund/create'
          element={
            <PrivateRoute>
              <WelcomeWienerDachshundCreate />
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
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </DashboardLayoutWithSideBar>
  );
};

export default AdminRoutes;
