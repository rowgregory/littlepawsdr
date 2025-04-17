import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toggleNavigationDrawer } from '../../redux/features/navbar/navbarSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import urlsToExclude from '../../utils/urlsToExclude';
import AwesomeIcon from '../common/AwesomeIcon';
import { barsIcon, shoppingCartIcon, userShieldIcon, usersIcon } from '../../icons';
import { bottomHeaderLinks } from '../data/navbar-data';
import TopHeaderInfoBox from './TopHeaderInfoBox';
import { formatDateTime } from '../../utils/formatDateTime';

const BottomHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const shouldExclude = urlsToExclude(pathname);
  const auth = useAppSelector((state: RootState) => state.auth);
  const { cartItemsAmount } = useAppSelector((state: RootState) => state.cart);

  const handleClick = () => {
    if (auth.user?._id) {
      dispatch(toggleNavigationDrawer({ navigationDrawer: true }));
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <div className={`top-0 px-3 z-[100] ${shouldExclude ? 'hidden' : 'sticky block'}`}>
      <div className='max-w-screen-2xl mx-auto w-full bg-white rounded-2xl -mt-10 shadow-lg z-50'>
        <div className='h-24 flex items-center justify-between px-6 sm:px-5 md:px-7 lg:px-9 xl:px-12'>
          <AwesomeIcon
            icon={barsIcon}
            className='w-6 h-6 text-teal-400 cursor-pointer'
            onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: true }))}
          />
          <div className='hidden 1190:flex items-center lg:gap-x-7'>
            {bottomHeaderLinks(pathname).map((link, i) => (
              <Link
                key={i}
                to={link.linkKey}
                className={`${
                  link.active ? 'text-teal-400' : 'text-charcoal'
                } font-QBook hover:text-teal-400 duration-300 text-sm lg:text-base`}
              >
                {link.linkText}
              </Link>
            ))}
          </div>
          <div className='flex items-center gap-x-6'>
            <section className='hidden sm:flex sm:items-center md:hidden gap-x-6'>
              <TopHeaderInfoBox
                obj={{
                  className: 'cursor-pointer',
                  onClick: () => navigate('/cart'),
                  icon: shoppingCartIcon,
                  titleKey: 'Cart ITems',
                  textKey: cartItemsAmount,
                }}
              />
              <TopHeaderInfoBox
                obj={{
                  className: 'cursor-pointer',
                  onClick: handleClick,
                  icon: auth.user?._id ? userShieldIcon : usersIcon,
                  titleKey: auth.user?._id
                    ? formatDateTime(auth.user?.lastLoginTime) === 'Invalid Date'
                      ? 'First Time Logged In'
                      : `Last login: ${formatDateTime(auth.user?.lastLoginTime)}`
                    : 'Login',
                  textKey: auth.user?._id
                    ? `${auth.user?.firstName} ${auth.user?.lastName}`
                    : 'Access Your Account',
                }}
              />
            </section>
            <Link
              className='bg-teal-400 text-white py-4 px-9 rounded-lg font-QBold uppercase hover:shadow-lg hover:bg-teal-500 duration-300'
              to='/donate'
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomHeader;
