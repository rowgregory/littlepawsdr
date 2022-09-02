import React, { ComponentType, FC, lazy, useState } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Settings/Profile';
import Order from './Order';
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
import GuestOrder from './GuestOrder';
import { useHandleIdleUser } from '../utils/useHandleIdleUser';
import ECardOrderReceipt from './ECardOrderReceipt';
import Footer from '../components/Footer';
import 'toasted-notes/src/styles.css'; // optional styles
import MyECards from './ECardOrders';
import Navbar from '../components/Navbar';
import EmailConfirmation from './EmailConfirmation';

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
  height: auto;
  min-height: ${({ url }) =>
    url.split('/')[1] === 'admin' ? '100vh' : 'calc(100vh - 466px)'};
  display: flex;
  flex-direction: column;
  padding: ${({ url }) => (url === '/' ? 0 : '56px 0 0')};
  background: ${({ theme }) => theme.secondaryBg};
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
      <Page url={pathname} fluid>
        <Switch>
          <Route path='/ecard-order/:id' component={ECardOrderReceipt} />
          <Route path='/donate' component={Donate} />
          <Route path='/volunteer' component={Volunteer} />
          <Route path='/adopt' component={Adopt} />
          <Route path='/surrender' component={Surrender} />
          <Route path='/available' component={Available} />
          <Route path='/about' component={AboutUs} />
          <Route path='/events' component={Events} />
          <Route path='/admin' component={Admin} />
          <Route path='/login' component={Login} />
          <Route path='/login-options' component={LoginOptions} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/shop' component={Shop} />
          <Route path='/cart' component={Cart} />
          <Route path='/order/:id' component={Order} />
          <Route path='/guest-order/:id' component={GuestOrder} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/reset/:id' component={ResetPassword} />
          <Route path='/settings' component={Settings} />
          <Route exact path='/my-orders' component={MyOrders} />
          <Route path='/my-orders/e-cards' component={MyECards} />
          <Route
            path='/email-confirmation/:to?/:em?/:na?/:id?'
            component={EmailConfirmation}
          />
          <Route exact path='/' component={Home} />
          <Route path='/404' component={PageNotFound} />
          <Redirect to='/404' />
        </Switch>
      </Page>
      {!['/login', '/admin', '/register'].includes(pathname) && <Footer />}
    </>
  );
};
