import React, { ComponentType, FC, lazy, useEffect, useState } from 'react';
import {
  Switch,
  Route,
  useLocation,
  Redirect,
  useHistory,
} from 'react-router-dom';
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
import PageNotFound from '../components/common/PageNotFound';
import PopUp from '../components/common/PopUp';
import GlobalStyles from '../GlobalStyles';
import ContinueSessionModal from '../components/ContinueSessionModal';
import LoginOptions from './LoginOptions';
import ECardOrderReceipt from './ECardOrderReceipt';
import Footer from '../components/Footer';
import MyEcardOrders from './MyEcardOrders';
import Navbar from '../components/Navbar';
import EmailConfirmation from './EmailConfirmation';
import OrderPayPal from './OrderPayPal';
import ECards from './ECards';
import ECardDetails from './ECardDetails';
import EcardPlaceOrder from './EcardPlaceOrder';
import ReturnPolicy from './ReturnPolicy';
import CookiePolicyPopUp from '../components/CookiePolicyPopUp';
import CookiePolicy from './CookiePolicy';
import { useIdleTimer } from 'react-idle-timer';

type LazyModulePromise<T = {}> = Promise<{ default: ComponentType<T> }>;

const Volunteer = lazy((): LazyModulePromise => import('./Volunteer'));
const Adopt = lazy((): LazyModulePromise => import('./Adopt'));
const Available = lazy((): LazyModulePromise => import('./Available'));
const AboutUs = lazy((): LazyModulePromise => import('./AboutUs'));
const Events = lazy((): LazyModulePromise => import('./Events'));
const Admin = lazy((): LazyModulePromise => import('./Admin'));
const Shop = lazy((): LazyModulePromise => import('./Shop'));
const Cart = lazy((): LazyModulePromise => import('./Cart'));
const Settings = lazy((): LazyModulePromise => import('./Settings'));
const Donate = lazy((): LazyModulePromise => import('./Donate'));

const Page = styled(Container)<{ url: string }>`
  width: 100%;
  min-height: ${({ url }) =>
    url.split('/')[1] === 'admin' ? '100%' : 'calc(100vh - 466px)'};
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

export const Routes: FC = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnIdle = () => {
    let userInfo: any = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo') || '')
      : null;

    if (userInfo) {
      handleShow();
    }
  };

  useIdleTimer({
    timeout: 1200000, // 20min
    onIdle: handleOnIdle,
    crossTab: {
      emitOnAllTabs: true,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    switch (pathname) {
      case '/what-can-i-do/':
        return history.push('/volunteer/volunteer-application');
      case '/about-us/':
        return history.push('/about/team-members');
      case '/about-us/rainbow-bridge/':
        return history.push('/about/rainbow-bridge');
      case '/available/dachshunds/view-dog/':
        return history.push('/available');
      case '/house-training-a-dachshund/':
        return history.push('/available');
      case '/lpdr-barks-about-tom-linda-scott/':
        return history.push('/available');
      case '/happy-tails-pretzel/':
        return history.push('/available');
      case '/lpdr-barks-about-valerie-duke/':
        return history.push('/available');
      case '/november-is-adopt-a-senior-month/':
        return history.push('/available/senior');
      case '/donate/shopping-to-help/':
        return history.push('/e-cards');
    }
  }, [pathname, history]);

  return (
    <>
      <ContinueSessionModal show={show} handleClose={handleClose} />
      <PopUp />
      <GlobalStyles />
      <Navbar />
      <CookiePolicyPopUp />
      <Page url={pathname} fluid>
        <Switch>
          <Route path='/cookie-policy' component={CookiePolicy} />
          <Route path='/return-policy' component={ReturnPolicy} />
          <Route path='/e-card/order/:id' component={ECardOrderReceipt} />
          <Route path='/e-cards' component={ECards} />
          <Route path='/e-card-details' component={ECardDetails} />
          <Route path='/e-card/place-order' component={EcardPlaceOrder} />
          <Route path='/donate' component={Donate} />
          <Route path='/volunteer' component={Volunteer} />
          <Route path='/adopt' component={Adopt} />
          <Route path='/surrender' component={Surrender} />
          <Route path='/available' component={Available} />
          <Route path='/about' component={AboutUs} />
          <Route path='/events' component={Events} />
          <Route path='/admin' component={Admin} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/login' component={Login} />
          <Route path='/login-options' component={LoginOptions} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/shop' component={Shop} />
          <Route path='/cart' component={Cart} />
          <Route
            path='/order/:id/:order?/:shippingAddress?/:email?/:items?'
            component={OrderReceipt}
          />
          <Route path='/reset/:id' component={ResetPassword} />
          <Route path='/settings' component={Settings} />
          <Route exact path='/my-orders' component={MyOrders} />
          <Route path='/my-orders/e-cards' component={MyEcardOrders} />
          <Route
            path='/email-confirmation/:to?/:em?/:na?/:id?'
            component={EmailConfirmation}
          />
          <Route path='/paypal/order' component={OrderPayPal} />
          <Route exact path='/' component={Home} />
          <Route path='/404' component={PageNotFound} />
          <Redirect to='/404' />
        </Switch>
      </Page>
      <Footer />
    </>
  );
};
