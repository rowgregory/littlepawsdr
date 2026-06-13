import { ComponentType, lazy, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './Home';
import OrderReceipt from './OrderReceipt';
import PageNotFound from './PageNotFound';
import { Footer } from '../components/footer/Footer';
import ReturnPolicy from './ReturnPolicy';
import CookiePolicyPopUp from '../components/CookiePolicyPopUp';
import CookiePolicy from './CookiePolicy';
import CartDrawer from '../components/drawers/CartDrawer';
import AuctionItemWinner from './AuctionItemWinner';
import NavigationDrawer from '../components/drawers/NavigationDrawer';
import LiveAuctionModal from '../components/modals/LiveAuctionModal';
import Header from '../components/header/Header';
import useScrollToTop from '../hooks/useScrollToTop';
import Toast from '../components/common/Toast';
import UserInit from '../wrappers/UserInit';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import { io } from 'socket.io-client';
import { toolkitStore } from '../redux/toolkitStore';
import {
  lockAuction,
  setOpenAuctionCompleteModal,
  setOpenLiveAuctionModal,
  updateAuctionInState,
} from '../redux/features/auctionSlice';
import { setAdoptionApplicationBypassCode } from '../redux/features/dashboardSlice';
import { showToast } from '../redux/features/toastSlice';
import AuctionCompleteModal from '../components/modals/AuctionCompleteModal';
import SqyshSplash from './Sqysh';

type LazyModulePromise<T = {}> = Promise<{ default: ComponentType<T> }>;

const Volunteer = lazy((): LazyModulePromise => import('./Volunteer'));
const Adopt = lazy((): LazyModulePromise => import('./Adopt'));
const Admin = lazy((): LazyModulePromise => import('./Admin'));
const Cart = lazy((): LazyModulePromise => import('./Cart'));
const Donate = lazy((): LazyModulePromise => import('./Donate'));
const Store = lazy((): LazyModulePromise => import('./Store'));
const Auth = lazy((): LazyModulePromise => import('./Auth'));
const Auction = lazy((): LazyModulePromise => import('./Auction'));
const Dachshunds = lazy((): LazyModulePromise => import('./Dachshunds'));
const NewsletterIssue = lazy((): LazyModulePromise => import('./Newsletter-Issue'));
const Supporter = lazy((): LazyModulePromise => import('./Supporter'));

const socket = io(process.env.REACT_APP_API_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

export const MainRoutes = () => {
  useScrollToTop();
  const location = useLocation();

  useEffect(() => {
    // Live auction updates
    socket.on('auction:active', (data) => {
      toolkitStore.dispatch(updateAuctionInState(data));
      toolkitStore.dispatch(setOpenLiveAuctionModal());
    });

    // 🔒 Fired the instant the auction ends — locks bidding before
    // the full populated payload arrives via 'auction:ended'.
    socket.on('auction:locked', (data) => {
      toolkitStore.dispatch(lockAuction(data));
    });

    socket.on('auction:ended', (data) => {
      toolkitStore.dispatch(updateAuctionInState(data));
      toolkitStore.dispatch(setOpenAuctionCompleteModal());
    });

    socket.on('auction:updated', (data) => {
      toolkitStore.dispatch(updateAuctionInState(data));
    });

    // Adoption application bypass code
    socket.on('auction-winners:notified', (data) => {
      toolkitStore.dispatch(showToast({ message: 'Auction winners notified!', type: 'success' }));
    });

    // Adoption application bypass code
    socket.on('adoption-application-fee:bypass-code', (data) => {
      toolkitStore.dispatch(setAdoptionApplicationBypassCode({ data }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const hide = !(
    /^\/dachshunds\/\d+\/?$/.test(location.pathname) || /^\/sqysh\/?$/.test(location.pathname)
  );

  return (
    <>
      <CookiePolicyPopUp />
      <CartDrawer />
      <NavigationDrawer />
      {hide && <Header />}
      <LiveAuctionModal />
      <Toast />
      <AuctionCompleteModal />
      <UserInit>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sqysh' element={<SqyshSplash />} />
          <Route path='/terms-of-service' element={<TermsOfService />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/supporter/*' element={<Supporter />} />
          <Route path='/newsletter-issues/*' element={<NewsletterIssue />} />
          <Route path='/dachshunds/*' element={<Dachshunds />} />
          <Route path='/adopt/*' element={<Adopt />} />
          <Route path='/auctions/*' element={<Auction />} />
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
          <Route path='*' element={<Navigate to='/404' replace />} />
          <Route path='/404' element={<PageNotFound />} />
        </Routes>
      </UserInit>
      {hide && <Footer />}
    </>
  );
};
