import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './features/auth/authSlice';
import { dashboardReducer } from './features/dashboard/dashboardSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { dachshundReducer } from './features/dachshund/dachshundSlice';
import { ordersReducer } from './features/order/ordersSlice';
import { actionHistoryReducer } from './features/actionHistory/actionHistorySlice';
import { rescueGroupsApi } from './services/rescueGroupsApi';
import { api } from './services/api';
import { welcomeWienerReducer } from './features/welcome-wiener/welcomeWienerSlice';
import { ecardReducer } from './features/ecard/ecardSlice';
import { productReducuer } from './features/product/productSlice';
import { adoptionApplicationFeeReducuer } from './features/adoptionApllicationFee/adoptionApplicationFeeSlice';
import { userReducuer } from './features/user/userSlice';
import { newsletterEmailReducuer } from './features/newsletter-email/newsletterEmailSlice';
import { cartReducer } from './features/cart/cartSlice';
import { campaignReducer } from './features/campaign/campaignSlice';
import { navbarReducer } from './features/navbar/navbarSlice';
import { merchAndEcardsReducuer } from './features/merchAndEcardSlice';
import { toastReducer } from './features/toastSlice';
import { formReducer } from './features/form/formSlice';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['isAuthenticated'],
};
const cartPersistConfig = {
  key: 'cart',
  storage: storage,
  whitelist: ['cartItems', 'cartItemsAmount', 'subtotal', 'shippingPrice', 'fields', 'isProduct', 'totalPrice', 'isPhysicalProduct'],
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
  merchAndEcards: merchAndEcardsReducuer,
  toast: toastReducer,
  form: formReducer,
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
      .concat(api.middleware),
});

export const persistor = persistStore(toolkitStore);

export type RootState = ReturnType<typeof toolkitStore.getState>;

export type AppDispatch = typeof toolkitStore.dispatch;

export type AppSelector = typeof toolkitStore.getState;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFormSelector = () => useAppSelector((state: RootState) => state.form);
export const useUserSelector = () => useAppSelector((state: RootState) => state.user);
export const useDashboardSelector = () => useAppSelector((state: RootState) => state.dashboard);
