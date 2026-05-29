import { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';
import { useAppDispatch } from '../../redux/toolkitStore';
import RainbowBurgerMenu from '../header/RainbowBurgerMenu';
import { toggleNavigationDrawer } from '../../redux/features/navbar/navbarSlice';

const AuctionHeader: FC<{ user: any; auctionItemId?: string; customAuctionLink: string }> = ({
  user,
  auctionItemId,
  customAuctionLink,
}) => {
  const dispatch = useAppDispatch();
  const params = new URLSearchParams({ customAuctionLink, conversionSource: 'auction_header' });
  if (auctionItemId) params.append('auctionItemId', auctionItemId);
  const registerLinkWithParams = `/auth/register?${params.toString()}`;

  return (
    <motion.header
      className='relative z-10 w-full bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg overflow-hidden'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <FloatingParticles />

      <div className='relative flex items-center justify-between gap-2 px-3 py-2.5 sm:px-5 sm:py-3'>
        {/* Left — menu + title */}
        <div className='flex items-center gap-2 sm:gap-3 min-w-0'>
          <RainbowBurgerMenu
            onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: true }))}
          />
          <div className='min-w-0'>
            <motion.h2
              className='text-sm sm:text-lg font-bold leading-tight truncate'
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ef4444)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{
                opacity: { delay: 0.3 },
                backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
              }}
            >
              Little Paws Dachshund Rescue
            </motion.h2>
            <p className='hidden sm:block text-white/70 text-xs leading-tight'>
              Premium Auction Experience
            </p>
          </div>
        </div>

        {/* Right — nav */}
        <nav
          aria-label='Auction navigation'
          className='flex items-center gap-1.5 sm:gap-2 shrink-0'
        >
          <Link
            to='/auctions'
            className='px-2.5 py-1.5 sm:px-4 sm:py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
          >
            Auctions
          </Link>

          <Link
            to={user?._id ? '/supporter/profile' : registerLinkWithParams}
            className='px-3 py-1.5 sm:px-5 sm:py-2 text-sm bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-full font-medium shadow-md transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap'
          >
            {user?._id ? 'Profile' : 'Join Now'}
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default AuctionHeader;
