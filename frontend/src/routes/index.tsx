import { ComponentType, FC, lazy, useEffect } from 'react';
import { Route, useLocation, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Settings/Profile';
import OrderReceipt from './OrderReceipt';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { Container } from 'react-bootstrap';
import MyOrders from './MyOrders';
import Surrender from './Surrender';
import styled from 'styled-components';
import PageNotFound from './PageNotFound';
import PopUp from '../components/common/PopUp';
import GlobalStyles from '../GlobalStyles';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import EmailConfirmation from './EmailConfirmation';
import ReturnPolicy from './ReturnPolicy';
import CookiePolicyPopUp from '../components/CookiePolicyPopUp';
import CookiePolicy from './CookiePolicy';
import WelcomeWieners from './WelcomeWieners';
import WelcomeWienerDetails from './WelcomeWienerDetails';
import Ecards from './Ecards';
import FilteredEcards from './FilteredEcards';
import PersonalizeEcard from './PersonalizeEcard';
import { batch, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import API from '../utils/api';
import { SEARCH_BAR_LIST_REQUEST, SEARCH_BAR_LIST_SUCCESS } from '../constants/searchBarConstants';
import {
  DACHSHUNDS_SUCCESS,
  DACHSHUND_PICS_VIDS_STASTUSES_REQUEST,
  DACHSHUND_PICS_VIDS_STASTUSES_SUCCESS,
  DACHSHUND_REQUEST,
} from '../constants/dachshundConstants';
import { ADOPTION_APPLICATION_FEE_BYPASS_CODE_SUCCESS } from '../constants/adoptionConstants';
import SignOut from './SignOut';
import CartDrawer from '../components/CartDrawer';

const socket = io('/load-initial-data');

type LazyModulePromise<T = {}> = Promise<{ default: ComponentType<T> }>;

const Volunteer = lazy((): LazyModulePromise => import('./Volunteer'));
const Adopt = lazy((): LazyModulePromise => import('./Adopt'));
const Available = lazy((): LazyModulePromise => import('./Available'));
const AboutUs = lazy((): LazyModulePromise => import('./AboutUs'));
const Events = lazy((): LazyModulePromise => import('./Events'));
const Admin = lazy((): LazyModulePromise => import('./Admin'));
const Cart = lazy((): LazyModulePromise => import('./Cart'));
const Settings = lazy((): LazyModulePromise => import('./Settings'));
const Donate = lazy((): LazyModulePromise => import('./Donate'));
const Merch = lazy((): LazyModulePromise => import('./Merch'));

const Page = styled(Container) <{ url: string }>`
  width: 100%;
  min-height: ${({ url }) => (url.split('/')[1] === 'admin' ? '100%' : 'calc(100vh - 822.59px)')};
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    min-height: ${({ url }) => (url.split('/')[1] === 'admin' ? '100%' : 'calc(100vh - 773.59px)')};
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    min-height: ${({ url }) => (url.split('/')[1] === 'admin' ? '100%' : 'calc(100vh - 405px)')};
  }
`;

export const MainRoutes: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  window.scrollTo(0, 0);

  useEffect(() => {
    batch(() => {
      dispatch({ type: SEARCH_BAR_LIST_REQUEST });
      dispatch({ type: DACHSHUND_REQUEST });
      dispatch({ type: DACHSHUND_PICS_VIDS_STASTUSES_REQUEST });
    });
    socket.on('load-initial-data', async (initialData) => {
      const dachshunds = await API.getDachshundDataForSearchBar();

      const { ...searchBar } = initialData;
      batch(() => {
        dispatch({
          type: SEARCH_BAR_LIST_SUCCESS,
          payload: { searchBar, dachshund: dachshunds?.searchBarData },
        });

        dispatch({
          type: DACHSHUNDS_SUCCESS,
          payload: dachshunds?.available?.data,
        });

        dispatch({
          type: DACHSHUND_PICS_VIDS_STASTUSES_SUCCESS,
          payload: dachshunds?.allDogs,
        });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    // Listen for 'new-code' event
    socket.on('adoption-application-fee-bypass-code', (bypassCode) => {
      // Handle the new code, you can dispatch an action or perform any other updates
      dispatch({ type: ADOPTION_APPLICATION_FEE_BYPASS_CODE_SUCCESS, payload: bypassCode });
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('adoption-application-fee-bypass-code');
    };
  }, [dispatch]);

  return (
    <>
      <PopUp />
      <GlobalStyles />
      <Navbar />
      <CookiePolicyPopUp />
      <CartDrawer />
      <Page url={pathname} fluid>
        <Routes>
          <Route path='/welcome-wieners' element={<WelcomeWieners />} />
          <Route path='/welcome-wiener/:id' element={<WelcomeWienerDetails />} />
          <Route path='/cookie-policy' element={<CookiePolicy />} />
          <Route path='/return-policy' element={<ReturnPolicy />} />
          <Route path='/donate/*' element={<Donate />} />
          <Route path='/volunteer/*' element={<Volunteer />} />
          <Route path='/adopt/*' element={<Adopt />} />
          <Route path='/surrender' element={<Surrender />} />
          <Route path='/available/*' element={<Available />} />
          <Route path='/about/*' element={<AboutUs />} />
          <Route path='/events/*' element={<Events />} />
          <Route path='/admin/*' element={<Admin />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart/*' element={<Cart />} />
          <Route path='/merch/*' element={<Merch />} />
          <Route path='/ecards' element={<Ecards />} />
          <Route path='/ecards/filtered' element={<FilteredEcards />} />
          <Route path='/ecard/personalize/:id' element={<PersonalizeEcard />} />
          <Route path='/order/:id/:order?/:shippingAddress?/:email?/:items?' element={<OrderReceipt />} />
          <Route path='/reset/:id' element={<ResetPassword />} />
          <Route path='/settings/*' element={<Settings />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/email-confirmation/:to?/:em?/:na?/:id?' element={<EmailConfirmation />} />
          <Route path='/' element={<Home />} />
          <Route path='/sign-out' element={<SignOut />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
          <Route path='/404' element={<PageNotFound />} />
        </Routes>
      </Page>
      <Footer />
    </>
  );
};
