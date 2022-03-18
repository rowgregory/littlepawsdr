import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { generateTokenForNewSession } from '../actions/userActions';

export const useRefreshToken = (continued: boolean, user: any) => {
  const dispatch = useDispatch();
  let refreshTokenId: any = useRef();
  let timeUntilRefresh: any = useRef();

  useEffect(() => {
    if (user) {
      const exp = Math.round(JSON.parse(atob(user?.token.split('.')[1]))?.exp);
      const iat = Math.round(JSON.parse(atob(user?.token.split('.')[1]))?.iat);
      timeUntilRefresh.current = (+(exp - iat) * 1000) / 2;
      refreshTokenId.current = setInterval(() => {
        dispatch(generateTokenForNewSession());
      }, timeUntilRefresh.current);
    }
    return () => {
      clearInterval(refreshTokenId.current);
    };
  }, [continued, dispatch, timeUntilRefresh, user]);
};
