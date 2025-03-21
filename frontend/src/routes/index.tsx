import { ComponentType, FC, Fragment, lazy, useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import Toast from '../components/common/Toast';
import LiveAuctionModal from '../components/modals/LiveAuctionModal';
import Toast2 from '../components/common/Toast2';
import Header from '../components/header/Header';
import useScrollToTop from '../hooks/useScrollToTop';
import { useAppDispatch } from '../redux/toolkitStore';
import { setCartFromStorage } from '../redux/features/cart/cartSlice';

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

const selectError = (state: any) => {
  const error: any = {};
  Object.keys(state).forEach((sliceName: any) => {
    error[sliceName] = state[sliceName].error;
  });
  return error;
};
const selectSuccess = (state: any) => {
  const success: any = {};
  Object.keys(state).forEach((sliceName: any) => {
    success[sliceName] = state[sliceName].message;
  });
  return success;
};

export const MainRoutes: FC = () => {
  const error = useSelector(selectError);
  const success = useSelector(selectSuccess);
  const dispatch = useAppDispatch();

  useScrollToTop();

  useEffect(() => {
    const cartData = localStorage.getItem('cartData');
    if (cartData) {
      dispatch(setCartFromStorage(JSON.parse(cartData)));
    }
  }, [dispatch]);

  const errorMessages: any = {};
  Object.keys(error).forEach((sliceName: any) => {
    errorMessages[sliceName] = error[sliceName] ? error[sliceName].message : null;
  });
  const successMessages: any = {};
  Object.keys(success).forEach((sliceName: any) => {
    successMessages[sliceName] = success[sliceName] ? success[sliceName] : null;
  });

  return (
    <Fragment>
      {Object.keys(errorMessages).map(
        (sliceName, i) =>
          errorMessages[sliceName] && (
            <Toast key={i} message={{ sliceName, text: errorMessages[sliceName] }} />
          )
      )}
      {Object.keys(successMessages).map(
        (sliceName, i) =>
          successMessages[sliceName] && (
            <Toast
              key={i}
              message={{ sliceName, text: successMessages[sliceName] }}
              success={true}
            />
          )
      )}
      <Toast2 />
      <CookiePolicyPopUp />
      <CartDrawer />
      <NavigationDrawer />
      <Header />
      <LiveAuctionModal />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dachshunds/*' element={<Dachshunds />} />
        <Route path='/adopt/*' element={<Adopt />} />
        <Route path='/campaigns/*' element={<Campaign />} />
        <Route path='/store/*' element={<Store />} />
        <Route path='/donate/*' element={<Donate />} />
        <Route path='/volunteer/*' element={<Volunteer />} />
        <Route path='/cookie-policy' element={<CookiePolicy />} />
        <Route path='/return-policy' element={<ReturnPolicy />} />
        <Route path='/auction-items/winner/:id' element={<AuctionItemWinner />}></Route>
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/auth/*' element={<Auth />} />
        <Route path='/cart/*' element={<Cart />} />
        <Route path='/order/:id' element={<OrderReceipt />} />
        <Route path='/settings/*' element={<Settings />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
        <Route path='/404' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Fragment>
  );
};
