import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import allReducers from './reducers';

const middleware = [thunk];

const dachshundsFromStorage = localStorage.getItem('dachshunds')
  ? JSON.parse(localStorage.getItem('dachshunds') || '')
  : [];

let userInfoFromStorage: any = sessionStorage.getItem('userInfo')
  ? JSON.parse(sessionStorage.getItem('userInfo') || '')
  : null;

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') || '')
  : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress') || '')
  : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod') || '')
  : {};

const guestUserInfoFromStorage = localStorage.getItem('guestUserInfo')
  ? JSON.parse(localStorage.getItem('guestUserInfo') || '')
  : {};

const initialState: any = {
  dachshunds: { dachshunds: dachshundsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  guestUserRegister: { guestUserInfo: guestUserInfoFromStorage },
};

const store: any = createStore(
  allReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
