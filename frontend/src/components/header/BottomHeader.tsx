import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Shield, User, Heart, Gavel } from 'lucide-react';
import {
  useAppDispatch,
  useAuctionSelector,
  useCartSelector,
  useNavbarSelector,
  useUserSelector,
} from '../../redux/toolkitStore';
import urlsToExclude from '../../utils/urlsToExclude';
import { toggleNavigationDrawer } from '../../redux/features/navbar/navbarSlice';
import RainbowBurgerMenu from './RainbowBurgerMenu';
import { bottomHeaderLinks } from '../data/navbar-data';
import { InfoBox } from './TopHeader';
import { formatDateTime } from '../../utils/formatDateTime';

const BottomHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const shouldExclude = urlsToExclude(pathname);
  const { user } = useUserSelector();
  const { toggle } = useNavbarSelector();
  const { cartItemsAmount } = useCartSelector();
  const { auction } = useAuctionSelector();

  const handleClick = () => {
    if (user?._id) {
      dispatch(toggleNavigationDrawer({ navigationDrawer: true }));
    } else {
      navigate('/auth/login');
    }
  };

  const handleAuctionClick = () => {
    if (user?._id && user?.hasAddress) {
      navigate(`/auctions/${auction?.customAuctionLink}`);
    } else if (user?._id && !user.hasAddress) {
      navigate('/supporter/profile');
    } else {
      navigate(
        `/auth/register?customAuctionLink=${auction?.customAuctionLink}&conversionSource=header_banner`,
      );
    }
  };

  const isActiveAuction = auction?.status === 'ACTIVE';
  const isUpcomingAuction = auction?.status === 'DRAFT';

  if (shouldExclude) return null;

  return (
    <div className='sticky top-0 z-[100]'>
      {/* ── Main nav bar ── */}
      <div className='bg-navbar-light dark:bg-navbar-dark border-b border-white/5 shadow-sm'>
        <div className='max-w-screen-2xl mx-auto w-full'>
          <div className='h-16 flex items-center justify-between px-4 sm:px-6'>
            {/* Burger */}
            <RainbowBurgerMenu
              onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: true }))}
              isOpen={toggle.navigationDrawer}
            />

            {/* ── Center nav links ── */}
            <nav
              aria-label='Main navigation'
              className='absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6 lg:gap-8'
            >
              {bottomHeaderLinks(pathname).map((link, i) => (
                <Link
                  key={i}
                  to={link.linkKey}
                  className={`relative group py-1 font-changa text-f10 uppercase tracking-[0.2em] transition-colors focus-visible:outline-none whitespace-nowrap ${
                    link.active
                      ? 'text-primary-light dark:text-primary-dark'
                      : 'text-text-dark hover:text-primary-light dark:hover:text-primary-dark'
                  } ${link.className ?? ''}`}
                >
                  {link.linkText}

                  {/* Active underline */}
                  {link.active && (
                    <motion.div
                      layoutId='activeTab'
                      className='absolute -bottom-0.5 left-0 right-0 h-px bg-primary-light dark:bg-primary-dark'
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Hover underline */}
                  <span
                    className='absolute -bottom-0.5 left-0 h-px w-0 bg-primary-light dark:bg-primary-dark group-hover:w-full transition-all duration-300'
                    aria-hidden='true'
                  />
                </Link>
              ))}
            </nav>

            {/* ── Right: info + donate ── */}
            <div className='flex items-center gap-4 sm:gap-6'>
              {/* Cart + account — sm only */}
              <div className='hidden sm:flex md:hidden items-center gap-5'>
                <InfoBox
                  icon={ShoppingCart}
                  titleKey='Cart'
                  textKey={cartItemsAmount}
                  onClick={() => navigate('/cart')}
                />
                <InfoBox
                  icon={user?._id ? Shield : User}
                  titleKey={
                    user?._id
                      ? formatDateTime(user?.lastLoginTime) === 'Invalid Date'
                        ? 'First login'
                        : `Last login: ${formatDateTime(user?.lastLoginTime)}`
                      : 'Login'
                  }
                  textKey={user?._id ? `${user.firstName} ${user.lastName}` : 'My Account'}
                  onClick={handleClick}
                />
              </div>

              {/* Donate button */}
              <Link
                to='/donate'
                className='group relative overflow-hidden flex items-center gap-2 px-5 py-2 font-changa text-f10 uppercase tracking-[0.2em] text-white bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                <span
                  className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent group-hover:animate-[shimmer_1.4s_ease_infinite] pointer-events-none'
                  aria-hidden='true'
                />
                <Heart className='w-3.5 h-3.5' aria-hidden='true' />
                Donate
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Active auction banner ── */}
      {isActiveAuction && (
        <button
          type='button'
          onClick={handleAuctionClick}
          className='w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white'
          aria-label={`${auction?.title} is live — click to join`}
        >
          <div className='bg-cyan-600 dark:bg-violet-600 h-8 flex items-center justify-center px-4 sm:px-6'>
            <div className='max-w-screen-2xl mx-auto w-full flex items-center justify-center gap-3'>
              <div className='flex items-center gap-2'>
                <motion.div
                  className='w-2 h-2 bg-white rounded-full'
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  aria-hidden='true'
                />
                <Gavel className='w-3.5 h-3.5 text-white' aria-hidden='true' />
                <span className='font-changa text-f10 sm:text-xs uppercase tracking-[0.2em] text-white'>
                  {auction?.title} — Live Now
                </span>
              </div>
              <span className='hidden sm:block font-lato text-[10px] text-white/80'>
                {!user?._id
                  ? 'Sign up to bid →'
                  : !user?.hasAddress
                    ? 'Add address to participate →'
                    : 'Click to join →'}
              </span>
            </div>
          </div>
        </button>
      )}

      {/* ── Upcoming auction banner ── */}
      {isUpcomingAuction && (
        <button
          type='button'
          onClick={handleAuctionClick}
          className='w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white'
          aria-label={`${auction?.title} coming soon — click to learn more`}
        >
          <div className='bg-cyan-700 dark:bg-violet-800 h-8 flex items-center justify-center px-4 sm:px-6'>
            <div className='max-w-screen-2xl mx-auto w-full flex items-center justify-center gap-3'>
              <div className='flex items-center gap-2'>
                <motion.div
                  className='w-2 h-2 bg-white rounded-full'
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  aria-hidden='true'
                />
                <Gavel className='w-3.5 h-3.5 text-white/80' aria-hidden='true' />
                <span className='font-changa text-f10 sm:text-xs uppercase tracking-[0.2em] text-white'>
                  {auction?.title} — Coming Soon
                </span>
              </div>
              <span className='hidden sm:block font-lato text-[10px] text-white/70'>
                {!user?._id
                  ? 'Sign up to participate →'
                  : !user?.hasAddress
                    ? 'Complete address to participate →'
                    : 'Get ready →'}
              </span>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default BottomHeader;
