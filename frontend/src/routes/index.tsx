import { ComponentType, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import OrderReceipt from './OrderReceipt';
import PageNotFound from './PageNotFound';
import Footer from '../components/Footer';
import ReturnPolicy from './ReturnPolicy';
import CookiePolicyPopUp from '../components/CookiePolicyPopUp';
import CookiePolicy from './CookiePolicy';
import CartDrawer from '../components/CartDrawer';
import AuctionItemWinner from './AuctionItemWinner';
import NavigationDrawer from '../components/NavigationDrawer';
import LiveAuctionModal from '../components/modals/LiveAuctionModal';
import Header from '../components/header/Header';
import useScrollToTop from '../hooks/useScrollToTop';
import Toast from '../components/common/Toast';
import UserInit from '../wrappers/UserInit';
import { useFetchLiveCampaignQuery } from '../redux/services/campaignApi';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';

type LazyModulePromise<T = {}> = Promise<{ default: ComponentType<T> }>;

const Volunteer = lazy((): LazyModulePromise => import('./Volunteer'));
const Adopt = lazy((): LazyModulePromise => import('./Adopt'));
const Admin = lazy((): LazyModulePromise => import('./Admin'));
const Cart = lazy((): LazyModulePromise => import('./Cart'));
const Settings = lazy((): LazyModulePromise => import('./Settings'));
const Donate = lazy((): LazyModulePromise => import('./Donate'));
const Store = lazy((): LazyModulePromise => import('./Store'));
const Auth = lazy((): LazyModulePromise => import('./Auth'));
const Campaign = lazy((): LazyModulePromise => import('./Campaign'));
const Dachshunds = lazy((): LazyModulePromise => import('./Dachshunds'));

export const MainRoutes = () => {
  useScrollToTop();
  useFetchLiveCampaignQuery();

  return (
    <>
      <CookiePolicyPopUp />
      <CartDrawer />
      <NavigationDrawer />
      <Header />
      <LiveAuctionModal />
      <Toast />
      <UserInit>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/terms-of-service' element={<TermsOfService />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/dachshunds/*' element={<Dachshunds />} />
          <Route path='/adopt/*' element={<Adopt />} />
          <Route path='/campaigns/*' element={<Campaign />} />
          <Route path='/store/*' element={<Store />} />
          <Route path='/donate/*' element={<Donate />} />
          <Route path='/volunteer/*' element={<Volunteer />} />
          <Route path='/cookie-policy' element={<CookiePolicy />} />
          <Route path='/return-policy' element={<ReturnPolicy />} />
          <Route path='/auction/winner/:id' element={<AuctionItemWinner />}></Route>
          <Route path='/admin/*' element={<Admin />} />
          <Route path='/auth/*' element={<Auth />} />
          <Route path='/cart/*' element={<Cart />} />
          <Route path='/order/:id' element={<OrderReceipt />} />
          <Route path='/settings/*' element={<Settings />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
          <Route path='/404' element={<PageNotFound />} />
        </Routes>
      </UserInit>
      <Footer />
    </>
  );
};
