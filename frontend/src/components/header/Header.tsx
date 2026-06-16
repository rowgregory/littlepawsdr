import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAuctionSelector,
  useCartSelector,
  useNavbarSelector,
  useUserSelector,
} from '../../redux/toolkitStore';
import urlsToExclude from '../../utils/urlsToExclude';
import useForm from '../../hooks/useForm';
import { useCreateNewsletterEmailMutation } from '../../redux/services/newsletterEmailApi';
import { validateEmailRegex } from '../../utils/regex';
import { showToast } from '../../redux/features/toastSlice';
import RainbowBurgerMenu from './RainbowBurgerMenu';
import { toggleNavigationDrawer } from '../../redux/features/navbar/navbarSlice';
import Logo from '../common/Logo';
import { bottomHeaderLinks } from '../data/navbar-data';
import { motion } from 'framer-motion';
import { Gavel, Heart, Loader2, Send, Shield, ShoppingCart, User } from 'lucide-react';
import { formatDateTime } from '../../utils/formatDateTime';

// ─── Info box (labeled, wide screens) ─────────────────────────────────────────
export const InfoBox = ({ icon: Icon, titleKey, textKey, onClick, className = '' }: any) => (
  <div
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    className={`flex items-center gap-2 group ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    <Icon
      className='w-3.5 h-3.5 text-primary-light dark:text-primary-dark shrink-0'
      aria-hidden='true'
    />
    <div>
      <p className='text-[8px] uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark whitespace-nowrap'>
        {titleKey}
      </p>
      <p className='text-[9px] uppercase tracking-wide text-text-dark whitespace-nowrap group-hover:text-primary-light transition-colors'>
        {textKey}
      </p>
    </div>
  </div>
);

// ─── Icon action (compact, all screens) — 40px touch target ──────────────────
const IconAction = ({ icon: Icon, label, onClick, href, badge, className = '' }: any) => {
  const inner = (
    <>
      <Icon
        className='w-[18px] h-[18px] text-primary-light dark:text-primary-dark'
        aria-hidden='true'
      />
      {badge != null && badge > 0 && (
        <span
          aria-hidden='true'
          className='absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 flex items-center justify-center bg-primary-light dark:bg-primary-dark text-white text-[9px] font-bold leading-none'
        >
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </>
  );
  const cls = `relative w-10 h-10 flex items-center justify-center text-text-dark hover:bg-white/5 active:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light ${className}`;

  return href ? (
    <a href={href} aria-label={label} className={cls}>
      {inner}
    </a>
  ) : (
    <button type='button' onClick={onClick} aria-label={label} className={cls}>
      {inner}
    </button>
  );
};

// ─── Combined header ──────────────────────────────────────────────────────────
const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const shouldExclude = urlsToExclude(pathname);
  const { user } = useUserSelector();
  const { toggle } = useNavbarSelector();
  const { cartItemsAmount } = useCartSelector();
  const { auction } = useAuctionSelector();
  const { inputs, handleInput, setInputs } = useForm(['email']);
  const [createNewsletterEmail, { isLoading }] = useCreateNewsletterEmailMutation();

  const handleNewsletterSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateEmailRegex.test(inputs.email)) {
      dispatch(showToast({ message: 'Invalid email', type: 'warning' }));
      return;
    }
    try {
      await createNewsletterEmail({ email: inputs.email }).unwrap();
      dispatch(showToast({ message: 'Subscribed to newsletter!', type: 'success' }));
      setInputs({});
    } catch {
      dispatch(showToast({ message: 'Error, please try again', type: 'warning' }));
    }
  };

  const handleAccountClick = () => {
    if (user?._id) {
      navigate('/supporter/overview');
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
    <header className='sticky top-0 z-[100]'>
      {/* ── The bar ── */}
      <div className='bg-navbar-light dark:bg-navbar-dark border-b border-white/5 shadow-sm'>
        <div className='max-w-screen-2xl mx-auto w-full'>
          <div className='h-14 sm:h-16 grid grid-cols-[auto_1fr_auto] items-center px-3 sm:px-6 gap-2 sm:gap-4'>
            {/* ── Left: burger + logo ── */}
            <div className='flex items-center gap-2 sm:gap-4'>
              <RainbowBurgerMenu
                onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: true }))}
                isOpen={toggle.navigationDrawer}
              />
              <Logo className='w-20 sm:w-24' />
            </div>

            {/* ── Center nav (md+) — real grid column, can't overlap ── */}
            <nav
              aria-label='Main navigation'
              className='hidden md:flex items-center justify-center gap-5 lg:gap-8'
            >
              {bottomHeaderLinks(pathname).map((link, i) => (
                <Link
                  key={i}
                  to={link.linkKey}
                  className={`relative group py-1 font-changa text-f10 uppercase tracking-[0.2em] transition-colors focus-visible:outline-none whitespace-nowrap ${
                    link.active
                      ? 'text-primary-light dark:text-primary-dark'
                      : 'text-text-dark hover:text-primary-light dark:hover:text-primary-dark'
                  }`}
                >
                  {link.linkText}
                  {link.active && (
                    <motion.div
                      layoutId='activeTab'
                      className='absolute -bottom-0.5 left-0 right-0 h-px bg-primary-light dark:bg-primary-dark'
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span
                    className='absolute -bottom-0.5 left-0 h-px w-0 bg-primary-light dark:bg-primary-dark group-hover:w-full transition-all duration-300'
                    aria-hidden='true'
                  />
                </Link>
              ))}
            </nav>

            {/* spacer keeps the 3-col grid honest below md, where nav is hidden */}
            <div className='md:hidden' aria-hidden='true' />

            {/* ── Right: newsletter / actions / donate ── */}
            <div className='flex items-center justify-end gap-1 sm:gap-2 1230:gap-3'>
              {/* Newsletter — widest only */}
              <form
                onSubmit={handleNewsletterSubmit}
                className='hidden 1230:flex items-center gap-2 mr-1'
                aria-label='Subscribe to newsletter'
              >
                <input
                  name='email'
                  type='email'
                  autoComplete='email'
                  value={inputs.email || ''}
                  onChange={handleInput}
                  placeholder='Subscribe, Support, Rescue'
                  aria-label='Email address for newsletter'
                  className='w-48 lg:w-56 px-3.5 py-1.5 border border-white/10 bg-white/5 text-text-dark placeholder:text-muted-dark/40 font-lato text-xs outline-none focus:border-primary-light transition-colors'
                />
                <button
                  type='submit'
                  disabled={isLoading}
                  aria-label={isLoading ? 'Subscribing...' : 'Subscribe'}
                  className='w-8 h-8 shrink-0 flex items-center justify-center bg-primary-light dark:bg-primary-dark hover:bg-secondary-light disabled:opacity-50 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light'
                >
                  {isLoading ? (
                    <Loader2 className='w-3 h-3 animate-spin' aria-hidden='true' />
                  ) : (
                    <Send className='w-3 h-3' aria-hidden='true' />
                  )}
                </button>
              </form>

              <IconAction
                icon={ShoppingCart}
                label={`Cart, ${cartItemsAmount || 0} items`}
                badge={cartItemsAmount}
                onClick={() => navigate('/cart')}
              />

              {/* Account: icon sm→1230, labeled InfoBox 1230+ */}
              <IconAction
                icon={user?._id ? Shield : User}
                label={user?._id ? `Account, ${user.firstName} ${user.lastName}` : 'Log in'}
                onClick={handleAccountClick}
                className='hidden sm:flex 1230:hidden'
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
                onClick={handleAccountClick}
                className='hidden 1230:flex'
              />

              {/* Donate — icon-only on smallest, labeled from sm */}
              <Link
                to='/donate'
                aria-label='Donate'
                className='group relative overflow-hidden flex items-center justify-center gap-2 w-10 h-10 sm:w-auto sm:h-auto sm:px-5 sm:py-2 ml-0.5 sm:ml-1 font-changa text-f10 uppercase tracking-[0.2em] text-white bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                <span
                  className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent group-hover:animate-[shimmer_1.4s_ease_infinite] pointer-events-none'
                  aria-hidden='true'
                />
                <Heart className='w-3.5 h-3.5 shrink-0' aria-hidden='true' />
                <span className='hidden sm:inline'>Donate</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Auction banners ── */}
      {(isActiveAuction || isUpcomingAuction) && (
        <button
          type='button'
          onClick={handleAuctionClick}
          className='w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white'
          aria-label={
            isActiveAuction
              ? `${auction?.title} is live — click to join`
              : `${auction?.title} coming soon — click to learn more`
          }
        >
          <div
            className={`h-8 flex items-center px-3 sm:px-6 ${isActiveAuction ? 'bg-cyan-600 dark:bg-violet-600' : 'bg-cyan-700 dark:bg-violet-800'}`}
          >
            <div className='max-w-screen-2xl mx-auto w-full min-w-0 flex items-center justify-center gap-3'>
              <div className='flex items-center gap-2 min-w-0'>
                <motion.div
                  className='w-2 h-2 shrink-0 bg-white rounded-full'
                  animate={isActiveAuction ? { opacity: [1, 0.3, 1] } : { y: [0, -3, 0] }}
                  transition={{ duration: isActiveAuction ? 1.5 : 1, repeat: Infinity }}
                  aria-hidden='true'
                />
                <Gavel
                  className={`w-3.5 h-3.5 shrink-0 ${isActiveAuction ? 'text-white' : 'text-white/80'}`}
                  aria-hidden='true'
                />
                <span className='font-changa text-f10 sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white truncate'>
                  {auction?.title} — {isActiveAuction ? 'Live Now' : 'Coming Soon'}
                </span>
              </div>
              <span className='hidden sm:block shrink-0 font-lato text-[10px] text-white/80'>
                {!user?._id
                  ? `Sign up to ${isActiveAuction ? 'bid' : 'participate'} →`
                  : !user?.hasAddress
                    ? `${isActiveAuction ? 'Add' : 'Complete'} address to participate →`
                    : isActiveAuction
                      ? 'Click to join →'
                      : 'Get ready →'}
              </span>
            </div>
          </div>
        </button>
      )}
    </header>
  );
};

export default Header;
