import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer, resetAuthError } from './features/auth/authSlice';
import { dashboardReducer } from './features/dashboard/dashboardSlice';
import { useDispatch } from 'react-redux';
import { dachshundReducer } from './features/dachshund/dachshundSlice';
import { ordersReducer, resetOrderError } from './features/order/ordersSlice';
import {
  actionHistoryReducer,
  resetActionHistory,
} from './features/actionHistory/actionHistorySlice';
import { rescueGroupsApi } from './services/rescueGroupsApi';
import { api } from './services/api';
import {
  resetWelcomeWienerError,
  welcomeWienerReducer,
} from './features/welcome-wiener/welcomeWienerSlice';
import { ecardReducer, resetEcardError } from './features/ecard/ecardSlice';
import { productReducuer, resetProductError } from './features/product/productSlice';
import {
  adoptionApplicationFeeReducuer,
  resetAdoptionFee,
} from './features/adoptionApllicationFee/adoptionApplicationFeeSlice';
import { resetUserError, userReducuer } from './features/user/userSlice';
import {
  newsletterEmailReducuer,
  resetNewsletterEmailError,
} from './features/newsletter-email/newsletterEmailSlice';
import { cartReducer } from './features/cart/cartSlice';
import { campaignReducer, resetCampaignError } from './features/campaign/campaignSlice';
import { navbarReducer } from './features/navbar/navbarSlice';

import { formReducer } from './features/form/formSlice';
import { merchAndEcardsReducuer } from './features/merchAndEcardSlice';

const errorHandlerMiddleware = (store: any) => (next: any) => (action: any) => {
  const resetErrorActions: { [key: string]: () => void } = {
    userApi: resetUserError,
    authApi: resetAuthError,
    actionHistoryApi: resetActionHistory,
    adoptionApplicationFeeApi: resetAdoptionFee,
    campaignApi: resetCampaignError,
    ecardApi: resetEcardError,
    newsletterEmailApi: resetNewsletterEmailError,
    orderApi: resetOrderError,
    productApi: resetProductError,
    welcomeWienerApi: resetWelcomeWienerError,
  };

  const result = next(action);

  if (action.error) {
    console.error('An error occurred:', action?.payload);
    const sliceName = action.payload?.data?.sliceName;
    const resetErrorAction = resetErrorActions[sliceName];

    if (resetErrorAction) {
      setTimeout(() => {
        store.dispatch(resetErrorAction());
      }, 5000);
    }
  } else {
    const sliceName = action.payload?.sliceName;
    const resetErrorAction = resetErrorActions[sliceName];

    if (resetErrorAction) {
      setTimeout(() => {
        store.dispatch(resetErrorAction());
      }, 5000);
    }
  }

  return result;
};

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['auth'],
};
const cartPersistConfig = {
  key: 'cart',
  storage: storage,
  blacklist: ['cart'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  dashboard: dashboardReducer,
  dachshund: dachshundReducer,
  orders: ordersReducer,
  actionHistory: actionHistoryReducer,
  welcomeWiener: welcomeWienerReducer,
  ecard: ecardReducer,
  product: productReducuer,
  adoptionApplicationFee: adoptionApplicationFeeReducuer,
  user: userReducuer,
  newsletterEmail: newsletterEmailReducuer,
  campaign: campaignReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  navbar: navbarReducer,
  form: formReducer,
  merchAndEcards: merchAndEcardsReducuer,
  [rescueGroupsApi.reducerPath]: rescueGroupsApi.reducer,
  [api.reducerPath]: api.reducer,
});

export const toolkitStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(rescueGroupsApi.middleware)
      .concat(api.middleware)
      .concat(errorHandlerMiddleware),
});

export const persistor = persistStore(toolkitStore);

export type RootState = ReturnType<typeof toolkitStore.getState>;

export type AppDispatch = typeof toolkitStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
