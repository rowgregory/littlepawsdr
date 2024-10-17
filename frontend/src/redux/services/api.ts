import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../toolkitStore';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.user?.token;
    if (token) {
      (headers as Headers).set('Authorization', `Bearer ${token}`);
      (headers as Headers).set('Content-Type', 'application/json');
    }
    return headers;
  },
});

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    'Auth',
    'Dashboard',
    'Order',
    'Welcome-Wiener',
    'Welcome-Wiener-Product',
    'Product',
    'User',
    'Newsletter-Email',
    'Cart',
    'Campaign',
    'Auction-Item',
    'Auction',
    'Item-Fulfillment',
    'Adoption-Application-Fee',
    'Dachshund',
    'Merch-And-Ecards'
  ],
  endpoints: () => ({}),
}) as any;
