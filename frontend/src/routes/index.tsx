import { ComponentType, FC, Fragment, lazy, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import OrderReceipt from './OrderReceipt';
import Surrender from './Surrender';
import PageNotFound from './PageNotFound';
import GlobalStyles from '../GlobalStyles';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ReturnPolicy from './ReturnPolicy';
import CookiePolicyPopUp from '../components/CookiePolicyPopUp';
import CookiePolicy from './CookiePolicy';
import WhoWeAre from './TeamMembers';
import CartDrawer from '../components/CartDrawer';
import ListAvailableDogs from './ListAvailableDogs';
import AuctionItemWinner from './AuctionItemWinner';
import { UserDropdown } from '../components/navbar/UserDropdown';
import NavigationDrawer from '../components/navbar/NavigationDrawer';
import { useSelector } from 'react-redux';
import Toast from '../components/common/Toast';
import ContactUs from './ContactUs';
import Education from './Education';

type LazyModulePromise<T = {}> = Promise<{ default: ComponentType<T> }>;

const Volunteer = lazy((): LazyModulePromise => import('./Volunteer'));
const Adopt = lazy((): LazyModulePromise => import('./Adopt'));
const AboutUs = lazy((): LazyModulePromise => import('./AboutUs'));
const Events = lazy((): LazyModulePromise => import('./Events'));
const Blog = lazy((): LazyModulePromise => import('./Blog'));
const Ecard = lazy((): LazyModulePromise => import('./Ecard'));
const WelcomeWiener = lazy((): LazyModulePromise => import('./WelcomeWiener'));
const Admin = lazy((): LazyModulePromise => import('./Admin'));
const Cart = lazy((): LazyModulePromise => import('./Cart'));
const Settings = lazy((): LazyModulePromise => import('./Settings'));
const Donate = lazy((): LazyModulePromise => import('./Donate'));
const Merch = lazy((): LazyModulePromise => import('./Merch'));
const Auth = lazy((): LazyModulePromise => import('./Auth'));
const Campaign = lazy((): LazyModulePromise => import('./Campaign'));

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <GlobalStyles />
      <CookiePolicyPopUp />
      <CartDrawer />
      <UserDropdown />
      <NavigationDrawer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/available' element={<ListAvailableDogs />} />
        <Route path='/cookie-policy' element={<CookiePolicy />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/education' element={<Education />} />
        <Route path='/return-policy' element={<ReturnPolicy />} />
        <Route path='/surrender' element={<Surrender />} />
        <Route path='/team-members' element={<WhoWeAre />} />
        <Route path='/auction-items/winner/:id' element={<AuctionItemWinner />}></Route>
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/adopt/*' element={<Adopt />} />
        <Route path='/about/*' element={<AboutUs />} />
        <Route path='/auth/*' element={<Auth />} />
        <Route path='/campaigns/*' element={<Campaign />} />
        <Route path='/cart/*' element={<Cart />} />
        <Route path='/blog/*' element={<Blog />} />
        <Route path='/ecards/*' element={<Ecard />} />
        <Route path='/donate/*' element={<Donate />} />
        <Route path='/events/*' element={<Events />} />
        <Route path='/merch/*' element={<Merch />} />
        <Route path='/volunteer/*' element={<Volunteer />} />
        <Route path='/welcome-wieners/*' element={<WelcomeWiener />} />
        <Route path='/order/:id' element={<OrderReceipt />} />
        <Route path='/settings/*' element={<Settings />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
        <Route path='/404' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Fragment>
  );
};
