import { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';
import RainbowBurgerMenu from '../../RainbowBurgerMenu';
import { useAppDispatch } from '../../../redux/toolkitStore';
import { toggleNavigationDrawer } from '../../../redux/features/navbar/navbarSlice';

const AuctionHeader: FC<{ user: any; auctionItemId?: string; customCampaignLink: string }> = ({ user, auctionItemId, customCampaignLink }) => {
  const dispatch = useAppDispatch();
  const params = new URLSearchParams({ customCampaignLink, conversionSource: 'auction_header' });
  if (auctionItemId) params.append('auctionItemId', auctionItemId);
  const registerLinkWithParams = `/auth/register?${params.toString()}`;

  return (
    <motion.header
      className='relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8 shadow-2xl overflow-hidden'
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      <FloatingParticles />

      <div className='relative flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 md:gap-y-0'>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <div className='flex items-center space-x-4 group'>
            <RainbowBurgerMenu onClick={() => dispatch(toggleNavigationDrawer({ navigationDrawer: true }))} />
            <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <motion.h2
                className='text-xl font-bold bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent'
                style={{
                  backgroundImage: 'linear-gradient(90deg, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ef4444)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  opacity: { delay: 0.5 },
                  backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
                }}
              >
                Little Paws Dachshund Rescue
              </motion.h2>
              <motion.p className='text-white/70 text-sm' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                Premium Auction Experience
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        <motion.nav
          className='flex items-center space-x-3'
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to='/campaigns'
              className='px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all relative overflow-hidden group'
            >
              <motion.div
                className='absolute inset-0 bg-white/5 rounded-full'
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.3 },
                }}
              />
              <span className='relative z-10'>Campaigns</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          >
            <Link
              to={user?._id ? `/settings/profile` : registerLinkWithParams}
              className='px-5 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-full font-medium shadow-lg relative overflow-hidden group'
            >
              <motion.span
                className='relative z-10'
                animate={{
                  scale: user?._id ? 1 : [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: user?._id ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              >
                {user?._id ? 'Profile' : 'Join Now'}
              </motion.span>
            </Link>
          </motion.div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default AuctionHeader;
