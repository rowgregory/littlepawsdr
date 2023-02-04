import React, { ComponentType, FC, lazy, useEffect, useState } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import { useHandleIdleUser } from '../utils/useHandleIdleUser';
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
import useCountDown from '../utils/hooks/useCountDown';
import Donate from './Donate/index';

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

const Page = styled(Container)<{ url: string }>`
  width: 100%;
  min-height: ${({ url }) =>
    url.split('/')[1] === 'admin' ? '100%' : 'calc(100vh - 475.5px)'};
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

export const Routes: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [continuedSession, setContinuedSession] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useRefreshToken(continuedSession, userInfo);

  useHandleIdleUser(continuedSession, setContinuedSession, handleShow);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { timer } = useCountDown('2023/02/05');

  return (
    <>
      <ContinueSessionModal
        show={show}
        handleClose={handleClose}
        dispatch={dispatch}
        setContinuedSession={setContinuedSession}
      />
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
          <Route path='/donate' render={() => <Donate timer={timer} />} />
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
