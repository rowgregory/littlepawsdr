import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

interface ForceLogoutError {
  message: string;
  forceLogout: boolean;
  redirectTo?: string;
  sliceName: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include', // 👈 this is critical for sending cookies!
  prepareHeaders: (headers) => {
    // You can still set content type if needed
    (headers as Headers).set('Content-Type', 'application/json');
    return headers;
  },
});

// Enhanced base query with force logout handling
const baseQueryWithForceLogout = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  // Handle force logout response from backend
  if (result.error?.status === 401) {
    const errorData = result.error.data as ForceLogoutError;
    if (errorData?.forceLogout) {
      // Clean up old tokens
      localStorage.clear();
      sessionStorage.clear();

      // Redirect to login
      window.location.href = '/auth/login';
    }
  }

  return result;
};

export const baseQueryWithRetry = retry(baseQueryWithForceLogout, { maxRetries: 0 });

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
    'Adoption-Application-Fee',
    'Dachshund',
    'Merch-And-Ecards',
  ],
  endpoints: () => ({}),
}) as any;
