import React, { ComponentType, FC, lazy, useEffect, useState } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Settings/Profile';
import Order from './Order';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { Container, Image } from 'react-bootstrap';
import MyOrders from './MyOrders';
import Surrender from './Surrender';
import styled from 'styled-components';
import PageNotFound from '../components/common/PageNotFound';
import PopUp from '../components/common/PopUp';
import GlobalStyles from '../GlobalStyles';
import Header from '../components/Header';
import ContinueSessionModal from '../components/ContinueSessionModal';
import LoginOptions from './LoginOptions';
import GuestOrder from './GuestOrder';
import { useHandleIdleUser } from '../utils/useHandleIdleUser';
import { useRefreshToken } from '../utils/useRefreshToken';
import ECardOrderReceipt from './ECardOrderReceipt';
import Footer from '../components/Footer';
import { Text } from '../components/styles/Styles';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css'; // optional styles
import Checkmark from '../components/svg/Checkmark';

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
  min-height: calc(100vh - 182.57px);
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const GenericAlert = styled.div`
  background: rgba(0, 0, 0, 0.85);
  padding: 1.5rem 3rem;
  border-radius: 12px;
`;

export const ToastAlert = (
  msg: string,
  onClose: () => void,
  type: string,
  img?: any
) => (
  <GenericAlert className='d-flex align-items-center'>
    <i
      onClick={onClose}
      className='fas fa-times'
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        cursor: 'pointer',
      }}
    ></i>
    <Text color='#fff' marginRight='0.5rem'>
      {type === 'success' ? (
        <>
          {img ? (
            <Image
              src={img}
              alt='alert'
              width='50px'
              height='50px'
              style={{
                objectFit: 'cover',
                borderRadius: '25px',
                marginRight: '0.5rem',
              }}
            />
          ) : (
            <i
              className='fa fa-check'
              aria-hidden='true'
              style={{ color: 'green', marginRight: '0.5rem' }}
            ></i>
          )}
        </>
      ) : (
        type === 'error' && (
          <i
            className='fa-solid fa-triangle-exclamation'
            style={{ color: 'red' }}
          ></i>
        )
      )}{' '}
      {msg}
    </Text>
    {img && <Checkmark />}
  </GenericAlert>
);

export const Routes: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [continuedSession, setContinuedSession] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  useRefreshToken(continuedSession, userInfo);

  useHandleIdleUser(
    continuedSession,
    setContinuedSession,
    userInfo,
    handleShow
  );

  useEffect(() => {
    userInfo?.online &&
      toast.notify(
        ({ onClose }) =>
          ToastAlert(
            `${userInfo?.name} signed in.`,
            onClose,
            'success',
            userInfo?.avatar
          ),
        {
          position: 'bottom-left',
        }
      );
  }, [userInfo]);

  return (
    <>
      <ContinueSessionModal
        show={show}
        handleClose={handleClose}
        dispatch={dispatch}
        user={userInfo}
        setContinuedSession={setContinuedSession}
      />
      <PopUp />
      {!['/login', '/register', '/register?redirect=/'].includes(pathname) && (
        <Header />
      )}
      <GlobalStyles />
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
          <Route path='/register/:to?/:em?/:na?/:id?' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/shop' component={Shop} />
          <Route path='/cart' component={Cart} />
          <Route path='/order/:id' component={Order} />
          <Route path='/guest-order/:id' component={GuestOrder} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/reset/:id' component={ResetPassword} />
          <Route path='/settings' component={Settings} />
          <Route path='/my-orders' component={MyOrders} />
          <Route exact path='/' component={Home} />
          <Route path='/404' component={PageNotFound} />
          <Redirect to='/404' />
        </Switch>
      </Page>
      {pathname !== '/login' && <Footer />}
    </>
  );
};
