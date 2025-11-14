import { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux/toolkitStore';
import { hydrateUserState } from '../redux/features/user/userSlice';
import { useFetchUserProfileQuery } from '../redux/services/userApi';
import { hydrateAuthState } from '../redux/features/auth/authSlice';

const UserInit = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [authState, setAuthState] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');

  useEffect(() => {
    // Multiple attempts to read cookie (sometimes takes a moment)
    let attempts = 0;
    const maxAttempts = 3;

    const checkAuth = () => {
      attempts++;

      // Check if authToken exists in cookies
      const hasAuthToken = document.cookie.split(';').some((cookie) => cookie.trim().startsWith('authToken='));

      if (hasAuthToken) {
        setAuthState('authenticated');

        // Try to restore user from localStorage while API call is in flight
        const cachedUser = localStorage.getItem('user');
        const cachedAuthState = localStorage.getItem('isAuthenticated');

        if (cachedUser && cachedAuthState === 'true') {
          try {
            const parsedUser = JSON.parse(cachedUser);
            // Hydrate immediately with cached data for instant UI
            dispatch(hydrateUserState({ user: parsedUser }));
            dispatch(hydrateAuthState({ isAuthenticated: true }));
          } catch (error) {
            console.error('Failed to parse cached user:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('isAuthenticated');
          }
        }
      } else if (attempts >= maxAttempts) {
        setAuthState('unauthenticated');
        dispatch(hydrateAuthState({ isAuthenticated: false }));
        dispatch(hydrateUserState({ user: null }));
        // Clear cached data if no auth token
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      } else {
        // Try again in 100ms
        setTimeout(checkAuth, 100);
      }
    };

    checkAuth();
  }, [dispatch]);

  // Only fetch if authenticated (this will refresh the data from server)
  const { data } = useFetchUserProfileQuery(undefined, {
    skip: authState !== 'authenticated',
  });

  useEffect(() => {
    if (data) {
      // Update with fresh data from server
      dispatch(hydrateUserState({ user: data?.user }));
      dispatch(hydrateAuthState({ isAuthenticated: data?.isAuthenticated }));

      // Update localStorage cache with fresh data
      if (data?.user && data?.isAuthenticated) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isAuthenticated', String(data.isAuthenticated));
      } else {
        // If server says not authenticated, clear everything
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    }
  }, [dispatch, data]);

  // Show loading while checking
  if (authState === 'checking') {
    return null;
  }

  return <>{children}</>;
};

export default UserInit;
