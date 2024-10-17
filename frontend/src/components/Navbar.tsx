import { useLocation } from 'react-router-dom';
import LPDRLogo from '../components/assets/logo-white2.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/toolkitStore';
import { toggleNavigationDrawer, toggleUserDropdown } from '../redux/features/navbar/navbarSlice';
import { NoImgDog, TransparentPurpleLogo } from './assets';
import { navbarBtnStyles, useSetShowNavbarBackground } from './navbar/navbarHelpers';
import { urlsToExclude } from '../utils/navbar-helpers';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector((state: any) => state.auth);
  const cart = useSelector((state: any) => state.cart);
  const navbar = useSelector((state: any) => state.navbar);
  useSetShowNavbarBackground();

  return (
    <nav
      className={`${
        navbar.toggle.bgColor || pathname !== '/'
          ? `bg-clip-padding backdrop-filter backdrop-blur-sm border-transparent bg-white border-b-gray-300 `
          : 'bg-none border-b-white/50'
      } ${
        urlsToExclude(pathname) ? 'block' : 'hidden'
      } border-b-[0.5px] fixed z-40 w-full duration-200 h-[65px] top-0 flex items-center justify-between px-3.5`}
    >
      <div className='d-flex justify-content-center align-items-center'>
        <div
          onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: true }))}
          className={navbarBtnStyles}
        >
          <i className='fas fa-bars text-gray-800'></i>
        </div>
        <Link to='/' className='cursor-pointer'>
          <img
            src={navbar.toggle.bgColor || pathname !== '/' ? TransparentPurpleLogo : LPDRLogo}
            className='h-16 pb-1'
            alt='Little Paws Dachshund Rescue'
          />
        </Link>
      </div>
      <div className='flex items-center'>
        <Link to='/donate' className={navbarBtnStyles}>
          <i className='fas fa-dollar text-gray-800'></i>
        </Link>
        <Link to='/cart' className={`${navbarBtnStyles} mx-1.5 relative`}>
          <span className='text-white text-xs absolute -top-1 left-6 flex items-center text-center justify-center z-10 cursor-pointer bg-red-500 font-Matter-Medium w-5 h-5 rounded-full'>
            {cart?.cartItemsAmount}
          </span>
          <i className='fas fa-shopping-cart text-gray-800'></i>
        </Link>
        <div className='flex items-center'>
          {user?.isAdmin ? (
            <img
              className='w-10 h-10 rounded-full cursor-pointer object-cover duration-200'
              onClick={() => dispatch(toggleUserDropdown({ userDropdown: true }))}
              src={user?.avatar || NoImgDog}
              alt={`Hey ${user?.name}! We appreciate you! Love from LPDR`}
            />
          ) : user?._id ? (
            <div
              style={{ background: user?.initialsBgColor }}
              className={`uppercase cursor-pointer h-10 w-10 rounded-full flex items-center justify-center`}
              onClick={() => dispatch(toggleUserDropdown({ userDropdown: true }))}
            >
              {user?.firstNameFirstInitial}
              {user?.lastNameFirstInitial}
            </div>
          ) : (
            <Link to='/auth/login' className={navbarBtnStyles}>
              <i className='fas fa-user text-gray-800'></i>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
