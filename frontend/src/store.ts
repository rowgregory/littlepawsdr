import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import allReducers from './reducers';

const middleware = [thunk];

const dachshundsFromStorage = localStorage.getItem('dachshunds')
  ? JSON.parse(localStorage.getItem('dachshunds') || '')
  : [];

let userInfoFromStorage: any = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo') || '')
  : null;

if (localStorage.getItem('cartItems') === 'undefined') {
  localStorage.removeItem('cartItems');
}

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') || '')
  : [];

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod') || '')
  : {};

const guestUserInfoFromStorage = localStorage.getItem('guestUserInfo')
  ? JSON.parse(localStorage.getItem('guestUserInfo') || '')
  : {};

const ecardsFromStorage = sessionStorage.getItem('ecards')
  ? JSON.parse(sessionStorage.getItem('ecards') || '')
  : {};

const initialState: any = {
  dachshunds: { dachshunds: dachshundsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  guestUserRegister: { guestUserInfo: guestUserInfoFromStorage },
  eCardList: { ecardsFromStorage },
};

const store: any = createStore(
  allReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
