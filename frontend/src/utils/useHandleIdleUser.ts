import { useEffect, useRef } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

export const useHandleIdleUser = (
  continuedSession: boolean,
  setContinuedSession: Function,
  userInfo: any,
  handleShow: Function
) => {
  const dispatch = useDispatch();
  let logoutId: any = useRef();

  useEffect(() => {
    if (continuedSession) {
      logoutId.current = setTimeout(() => {
        dispatch(logout(userInfo));
      }, 60000);
    } else {
      setContinuedSession(false);
      clearTimeout(logoutId.current);
    }
  }, [continuedSession, dispatch, logoutId, setContinuedSession, userInfo]);

  const handleOnIdle = () => {
    const user: any = sessionStorage.getItem('userInfo')
      ? JSON.parse(sessionStorage.getItem('userInfo') || '')
      : null;

    if (user) {
      handleShow();
      setContinuedSession(true);
    }
  };

  useIdleTimer({
    timeout: 1200000, // 20min
    onIdle: handleOnIdle,
    debounce: 500,
    crossTab: {
      emitOnAllTabs: true,
    },
  });
};
