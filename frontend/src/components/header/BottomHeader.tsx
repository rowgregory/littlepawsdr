import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toggleNavigationDrawer } from '../../redux/features/navbar/navbarSlice';
import {
  useAppDispatch,
  useAuctionSelector,
  useCartSelector,
  useNavbarSelector,
  useUserSelector,
} from '../../redux/toolkitStore';
import urlsToExclude from '../../utils/urlsToExclude';
import { bottomHeaderLinks } from '../data/navbar-data';
import TopHeaderInfoBox from './TopHeaderInfoBox';
import { formatDateTime } from '../../utils/formatDateTime';
import { motion } from 'framer-motion';
import RainbowBurgerMenu from './RainbowBurgerMenu';
import MotionLink from '../common/MotionLink';
import { Shield, ShoppingCart, User } from 'lucide-react';

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
      navigate(`/supporter/profile`);
    } else {
      navigate(
        `/auth/register?customAuctionLink=${auction?.customAuctionLink}&conversionSource=header_banner`
      );
    }
  };

  const isActiveAuction = auction?.isLive;
  const isUpcomingAuction = auction?.status === 'DRAFT';

  const isActiveOrUpcoming = isActiveAuction || isUpcomingAuction;

  return (
    <div className={`top-0 px-3 z-[100] ${shouldExclude ? 'hidden' : 'sticky block'}`}>
      <div
        className={`${
          isActiveOrUpcoming ? 'rounded-tl-2xl rounded-tr-2xl' : 'rounded-2xl'
        } max-w-screen-2xl mx-auto w-full bg-white -mt-10 shadow-lg z-50`}
      >
        <div className='h-20 flex items-center justify-between px-6 sm:px-5'>
          <RainbowBurgerMenu
            onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: true }))}
            isOpen={toggle.navigationDrawer}
          />
          <div className='absolute left-1/2 -translate-x-1/2 flex items-center gap-x-5'>
            {bottomHeaderLinks(pathname).map((link, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                whileHover={{ y: -2 }}
                className='relative group'
              >
                <Link
                  to={link.linkKey}
                  className={`${
                    link.active ? 'text-teal-400' : 'text-charcoal'
                  } font-QBook hover:text-teal-400 duration-300 text-base relative z-10 py-2 rounded-lg transition-all hover:bg-teal-50 group-hover:scale-105 whitespace-nowrap ${
                    link.className
                  }`}
                >
                  {link.linkText}

                  {/* Active indicator */}
                  {link.active && (
                    <motion.div
                      layoutId='activeTab'
                      className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full'
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Hover underline */}
                  <motion.div
                    className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-teal-300 to-cyan-300 rounded-full'
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>

                {/* Hover glow effect */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-cyan-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm'
                  initial={false}
                />

                {/* Sparkle on hover */}
                <motion.div
                  className='absolute -top-1 -right-1 text-teal-400 text-xs pointer-events-none'
                  initial={{ scale: 0, rotate: 0 }}
                  whileHover={{
                    scale: [0, 1.2, 1],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 0.6 }}
                >
                  ✨
                </motion.div>
              </motion.div>
            ))}
          </div>
          <div className='flex items-center gap-x-6'>
            <section className='hidden sm:flex sm:items-center md:hidden gap-x-6'>
              <TopHeaderInfoBox
                obj={{
                  className: 'cursor-pointer',
                  onClick: () => navigate('/cart'),
                  icon: ShoppingCart,
                  titleKey: 'Cart ITems',
                  textKey: cartItemsAmount,
                }}
              />
              <TopHeaderInfoBox
                obj={{
                  className: 'cursor-pointer',
                  onClick: handleClick,
                  icon: user?._id ? Shield : User,
                  titleKey: user?._id
                    ? formatDateTime(user?.lastLoginTime) === 'Invalid Date'
                      ? 'First Time Logged In'
                      : `Last login: ${formatDateTime(user?.lastLoginTime)}`
                    : 'Login',
                  textKey: user?._id
                    ? `${user?.firstName} ${user?.lastName}`
                    : 'Access Your Account',
                }}
              />
            </section>

            <MotionLink
              to='/donate'
              className='relative flex flex-col justify-between cursor-pointer text-white group hover:text-white'
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className='rounded-full shadow-lg px-9 py-3 w-fit h-fit text-lg font-bold relative overflow-hidden border-2 border-blue-200/40 backdrop-blur-sm'
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #e0f2fe, #bae6fd, #7dd3fc, #38bdf8, #0ea5e9, #0284c7, #e0f2fe)',
                  backgroundSize: '300% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  backgroundPosition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
                whileHover={{
                  boxShadow: [
                    '0 0 20px rgba(226, 232, 240, 0.6), inset 0 0 10px rgba(191, 219, 254, 0.3)',
                    '0 0 40px rgba(56, 189, 248, 0.8), inset 0 0 15px rgba(191, 219, 254, 0.5)',
                    '0 0 20px rgba(226, 232, 240, 0.6), inset 0 0 10px rgba(191, 219, 254, 0.3)',
                  ],
                }}
              >
                {/* Icy crystalline effect */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/20 to-transparent'
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Shimmering frost effect */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent'
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: 'linear',
                  }}
                />

                {/* Snowflake pattern overlay */}
                <motion.div
                  className='absolute inset-0 bg-white/5'
                  animate={{
                    opacity: [0.05, 0.15, 0.05],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <motion.span
                  className='relative z-10 flex items-center gap-2'
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(2, 132, 199, 0.8)',
                      '0 0 20px rgba(56, 189, 248, 0.9)',
                      '0 0 10px rgba(2, 132, 199, 0.8)',
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  ❄️ Donate
                </motion.span>
              </motion.div>

              {/* Falling snowflakes */}
            </MotionLink>
          </div>
        </div>
      </div>

      {/* ACTIVE Banner */}
      {isActiveAuction && (
        <div
          onClick={handleAuctionClick}
          className='max-w-screen-2xl mx-auto w-full cursor-pointer'
        >
          <div className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x h-7 flex items-center justify-center px-3 sm:px-6 rounded-b-2xl'>
            <div className='flex items-center justify-center w-full'>
              {/* Mobile Layout */}
              <div className='flex sm:hidden items-center gap-2'>
                <div className='w-2.5 h-2.5 bg-white rounded-full animate-pulse'></div>
                <span className='text-white font-bold text-sm'>🔥 {auction?.title} LIVE!</span>
              </div>

              {/* Desktop Layout */}
              <div className='hidden sm:flex items-center gap-3'>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 bg-white rounded-full animate-pulse'></div>
                  <span className='text-white font-bold text-lg'>🔥 {auction?.title} is LIVE!</span>
                </div>
                <div className='text-white/90 text-sm font-medium'>
                  {!user?._id
                    ? 'Join now to bid →'
                    : user?._id && !user?.hasAddress
                    ? 'Click to enter address →'
                    : 'Click to join the auction →'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isUpcomingAuction && (
        <div
          onClick={handleAuctionClick}
          className='max-w-screen-2xl mx-auto w-full cursor-pointer'
        >
          <div className='bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 animate-gradient-x h-7 flex items-center justify-center px-3 sm:px-6 rounded-b-2xl'>
            <div className='flex items-center justify-center w-full'>
              {/* Mobile Layout */}
              <div className='flex sm:hidden items-center gap-2'>
                <div className='w-2.5 h-2.5 bg-white rounded-full animate-bounce'></div>
                <span className='text-white font-bold text-sm'>⏰ Coming Soon!</span>
              </div>

              {/* Desktop Layout */}
              <div className='hidden sm:flex items-center gap-3'>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 bg-white rounded-full animate-bounce'></div>
                  <span className='text-white font-bold text-lg'>
                    ⏰ {auction?.title} Coming Soon!
                  </span>
                </div>
                <div className='text-white/90 text-sm font-medium'>
                  {!user?._id
                    ? 'Sign up to participate →'
                    : user?._id && !user?.hasAddress
                    ? 'Complete address to participate →'
                    : 'Get Ready! →'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomHeader;
