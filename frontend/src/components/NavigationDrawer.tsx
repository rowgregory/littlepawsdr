import { Fragment, useCallback, useRef } from 'react';
import LinkContent from './navigation-drawer/LinkContent';
import useOutsideDetect from '../hooks/useOutsideDetect';
import { RootState, useAppDispatch } from '../redux/toolkitStore';
import { useSelector } from 'react-redux';
import AuthUserDisplay from './navigation-drawer/AuthUserDisplay';
import BlackPageOverlay from './common/BlackPageOverlay';
import { toggleNavigationDrawer } from '../redux/features/navbar/navbarSlice';

const NavigationDrawer = () => {
  const dispatch = useAppDispatch();
  const overlayRef = useRef(null) as any;
  const navbar = useSelector((state: RootState) => state.navbar);
  const open = navbar.toggle.navigationDrawer;

  const handleClose = useCallback(() => {
    if (navbar.toggle.navigationDrawer) {
      dispatch(toggleNavigationDrawer({ navigationDrawer: false }));
    }
  }, [dispatch, navbar.toggle.navigationDrawer]);

  useOutsideDetect(overlayRef, handleClose);

  return (
    <Fragment>
      <BlackPageOverlay open={open} />
      <div
        ref={overlayRef}
        className={`${
          open
            ? 'left-0 w-screen sm:left-2 sm:w-[380px]'
            : `left-[-135vw] w-screen sm:w-[380px] sm:left-[-380px]`
        } py-6 overflow-y-scroll h-screen sm:h-[calc(100vh-16px)] sm:rounded-3xl fixed z-[110] top-0 sm:top-2 bottom:0 sm:bottom-2 bg-[#171b20] transition-all duration-300 no-scrollbar`}
      >
        <div className='px-8 mb-7 relative flex items-center justify-end gap-2'>
          <i onClick={handleClose} className='fas fa-times fa-xs text-white cursor-pointer'></i>
        </div>
        <AuthUserDisplay closeMenu={handleClose} />
        <LinkContent closeMenu={handleClose} />
      </div>
    </Fragment>
  );
};

export default NavigationDrawer;
