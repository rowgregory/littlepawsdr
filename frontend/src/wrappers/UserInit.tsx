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
      } else if (attempts >= maxAttempts) {
        setAuthState('unauthenticated');
        dispatch(hydrateAuthState({ isAuthenticated: false }));
        dispatch(hydrateUserState({ user: null }));
      } else {
        // Try again in 100ms
        setTimeout(checkAuth, 100);
      }
    };

    checkAuth();
  }, [dispatch]);

  // Only fetch if authenticated
  const { data } = useFetchUserProfileQuery(undefined, {
    skip: authState !== 'authenticated',
  });

  useEffect(() => {
    if (data) {
      dispatch(hydrateUserState({ user: data?.user }));
      dispatch(hydrateAuthState({ isAuthenticated: data?.isAuthenticated }));
    }
  }, [dispatch, data]);

  // Show loading while checking
  if (authState === 'checking') {
    return null;
  }

  return <>{children}</>;
};

export default UserInit;
