import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './features/auth/authSlice';
import { dashboardReducer } from './features/dashboardSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { dachshundReducer } from './features/dachshund/dachshundSlice';
import { ordersReducer } from './features/ordersSlice';
import { actionHistoryReducer } from './features/actionHistory/actionHistorySlice';
import { rescueGroupsApi } from './services/rescueGroupsApi';
import { api } from './services/api';
import { welcomeWienerReducer } from './features/welcomeWienerSlice';
import { ecardReducer } from './features/ecardSlice';
import { productReducuer } from './features/productSlice';
import { adoptionApplicationFeeReducuer } from './features/adoptionApllicationFee/adoptionApplicationFeeSlice';
import { userReducuer } from './features/userSlice';
import { newsletterEmailReducuer } from './features/newsletter-email/newsletterEmailSlice';
import { cartReducer } from './features/cart/cartSlice';
import { navbarReducer } from './features/navbar/navbarSlice';
import { merchAndEcardsReducuer } from './features/merchAndEcardSlice';
import { formReducer } from './features/form/formSlice';
import { newsletterIssueReducer } from './features/newsletterIssueSlice';
import { auctionReducer } from './features/auctionSlice';
import { tableReducer } from './features/tableSlice';
import { toastReducer } from './features/toastSlice';
import { bugReducer } from './features/bugSlice';

const userPersistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['user'],
  nested: {
    user: {
      whitelist: [
        'firstName',
        'lastName',
        'firstNameFirstInitial',
        'lastNameFirstInitial',
        'email',
        'jobTitle',
        'workSchedule',
        'isPublic',
        'isAdmin',
        'hasAddress',
        'addressRef',
        'yourHome',
        'dachshundPreferences',
        'lastLoginTime',
        'anonymousBidding',
        'conversionSource',
        'lastSeenChangelogVersion',
      ],
    },
  },
};
const cartPersistConfig = {
  key: 'cart',
  storage: storage,
  whitelist: [
    'cartItems',
    'cartItemsAmount',
    'subtotal',
    'shippingPrice',
    'fields',
    'isProduct',
    'totalPrice',
    'isPhysicalProduct',
  ],
};
const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['isAuthenticated'],
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
  user: persistReducer(userPersistConfig, userReducuer),
  newsletterEmail: newsletterEmailReducuer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  navbar: navbarReducer,
  merchAndEcards: merchAndEcardsReducuer,
  toast: toastReducer,
  form: formReducer,
  newsletterIssue: newsletterIssueReducer,
  auction: auctionReducer,
  table: tableReducer,
  bug: bugReducer,
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
export const useAuctionSelector = () => useAppSelector((state: RootState) => state.auction);
export const useTableSelector = () => useAppSelector((state: RootState) => state.table);
export const useToastSelector = () => useAppSelector((state: RootState) => state.toast);
export const useNavbarSelector = () => useAppSelector((state: RootState) => state.navbar);
export const useCartSelector = () => useAppSelector((state: RootState) => state.cart);
export const useWelcomeWienerSelector = () =>
  useAppSelector((state: RootState) => state.welcomeWiener);
export const useAuthSelector = () => useAppSelector((state: RootState) => state.auth);
export const useBugSelector = () => useAppSelector((state: RootState) => state.bug);
export const useEcardSelector = () => useAppSelector((state: RootState) => state.ecard);
export const useProductSelector = () => useAppSelector((state: RootState) => state.product);
export const useOrderSelector = () => useAppSelector((state: RootState) => state.orders);
