import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import allReducers from './reducers';

const middleware = [thunk];

let userInfoFromStorage: any = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo') || '')
  : null;

if (localStorage.getItem('cartItems') === 'undefined') {
  localStorage.removeItem('cartItems');
}

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') || '')
  : [];

const initialState: any = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage?.cartItems ?? [],
    cartItemsAmount: cartItemsFromStorage?.cartItemsAmount ?? 0,
    subtotal: cartItemsFromStorage?.subtotal ?? 0,
    shippingPrice: cartItemsFromStorage?.shippingPrice ?? 0,
    isPhysicalProduct: cartItemsFromStorage?.isPhysicalProduct,
    totalPrice: cartItemsFromStorage?.totalPrice ?? 0,
    cartDrawer: false,
  },
};

const store: any = createStore(
  allReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
