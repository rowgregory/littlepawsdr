import { ComponentType, FC, lazy, useEffect } from 'react';
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
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import EmailConfirmation from './EmailConfirmation';
import ReturnPolicy from './ReturnPolicy';
import CookiePolicyPopUp from '../components/CookiePolicyPopUp';
import CookiePolicy from './CookiePolicy';
import WelcomeWieners from './WelcomeWieners';
import WelcomeWienerDetails from './WelcomeWienerDetails';
import ECardOrderReceipt from './ECardOrderReceipt';
import Ecards from './Ecards';
import FilteredEcards from './FilteredEcards';
import PersonalizeEcard from './PersonalizeEcard';
import { batch, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import API from '../utils/api';
import {
  SEARCH_BAR_LIST_REQUEST,
  SEARCH_BAR_LIST_SUCCESS,
} from '../constants/searchBarConstants';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productContstants';
import {
  ECARD_LIST_REQUEST,
  ECARD_LIST_SUCCESS,
} from '../constants/eCardConstants';
import {
  WELCOME_WIENER_DACHSHUND_LIST_REQUEST,
  WELCOME_WIENER_DACHSHUND_LIST_SUCCESS,
} from '../constants/welcomeWienerDachshundConstants';
import {
  USER_WHO_WE_ARE_LIST_REQUEST,
  USER_WHO_WE_ARE_LIST_SUCCESS,
} from '../constants/userConstants';
import {
  DACHSHUNDS_SUCCESS,
  DACHSHUND_PICS_VIDS_STASTUSES_REQUEST,
  DACHSHUND_PICS_VIDS_STASTUSES_SUCCESS,
  DACHSHUND_REQUEST,
} from '../constants/dachshundConstants';

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

const Page = styled(Container)<{ url: string }>`
  width: 100%;
  min-height: ${({ url }) =>
    url.split('/')[1] === 'admin' ? '100%' : 'calc(100vh - 822.59px)'};
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    min-height: ${({ url }) =>
      url.split('/')[1] === 'admin' ? '100%' : 'calc(100vh - 773.59px)'};
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    min-height: ${({ url }) =>
      url.split('/')[1] === 'admin' ? '100%' : 'calc(100vh - 426.44px)'};
  }
`;

export const Routes: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  window.scrollTo(0, 0);

  useEffect(() => {
    batch(() => {
      dispatch({ type: SEARCH_BAR_LIST_REQUEST });
      dispatch({ type: DACHSHUND_REQUEST });
      dispatch({ type: PRODUCT_LIST_REQUEST });
      dispatch({ type: ECARD_LIST_REQUEST });
      dispatch({ type: WELCOME_WIENER_DACHSHUND_LIST_REQUEST });
      dispatch({ type: USER_WHO_WE_ARE_LIST_REQUEST });
      dispatch({ type: DACHSHUND_PICS_VIDS_STASTUSES_REQUEST });
    });
    socket.on('load-initial-data', async (initialData) => {
      const dachshunds = await API.getDachshundDataForSearchBar();

      const { boardMembers, ...searchBar } = initialData;
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
          type: PRODUCT_LIST_SUCCESS,
          payload: initialData?.products,
        });

        dispatch({
          type: ECARD_LIST_SUCCESS,
          payload: initialData?.ecards,
        });

        dispatch({
          type: WELCOME_WIENER_DACHSHUND_LIST_SUCCESS,
          payload: initialData?.welcomeWieners,
        });

        dispatch({
          type: USER_WHO_WE_ARE_LIST_SUCCESS,
          payload: initialData?.boardMembers,
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
        return history.push('/adopt/senior');
      case '/donate/shopping-to-help/':
        return history.push('/ecards');
      case '/donate/sponsor-a-sanctuary-dog/':
        return history.push('/ecards');
      case '/welcome-to-little-paws-dachshund-rescue/':
        return history.push('/');
    }
  }, [pathname, history]);

  return (
    <>
      <PopUp />
      <GlobalStyles />
      <Navbar />
      <CookiePolicyPopUp />
      <Page url={pathname} fluid>
        <Switch>
          <Route path='/welcome-wieners' component={WelcomeWieners} />
          <Route
            exact
            path='/welcome-wiener/:id'
            component={WelcomeWienerDetails}
          />
          <Route path='/cookie-policy' component={CookiePolicy} />
          <Route path='/return-policy' component={ReturnPolicy} />
          <Route path='/e-card/order/:id' component={ECardOrderReceipt} />
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
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/cart' component={Cart} />
          <Route path='/merch' component={Merch} />
          <Route exact path='/ecards' component={Ecards} />
          <Route path='/ecards/filtered' component={FilteredEcards} />
          <Route path='/ecard/personalize/:id' component={PersonalizeEcard} />
          <Route
            path='/order/:id/:order?/:shippingAddress?/:email?/:items?'
            component={OrderReceipt}
          />
          <Route path='/reset/:id' component={ResetPassword} />
          <Route path='/settings' component={Settings} />
          <Route exact path='/my-orders' component={MyOrders} />
          <Route
            path='/email-confirmation/:to?/:em?/:na?/:id?'
            component={EmailConfirmation}
          />
          <Route exact path='/' component={Home} />
          <Route path='/404' component={PageNotFound} />
          <Redirect to='/404' />
        </Switch>
      </Page>
      <Footer />
    </>
  );
};
