import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuctionItemWinnerSuccessPaymentModal from '../components/modals/AuctionItemWinnerSuccessPaymentModal';
import AuctionItemWinnerContainer from '../components/auction/AuctionItemWinnerContainer';
import DachshundLoader from '../components/Loaders/DachshundLoader';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Trophy, Crown, Sparkles } from 'lucide-react';
import {
  useGetWinningBidderQuery,
  useRecordWinningBidPaymentMutation,
} from '../redux/services/auctionApi';

const AuctionItemWinner = () => {
  const [orderLoader, setOrderLoader] = useState(false);
  const params = useParams();
  const { data: queryData } = useGetWinningBidderQuery(params?.id);
  const winningBid = queryData?.winningAuctionItemBidderWithCustomAuctionLink;
  const [payforAuctionItem, { data }] = useRecordWinningBidPaymentMutation();

  return (
    <>
      {orderLoader && <DachshundLoader />}
      <AuctionItemWinnerSuccessPaymentModal open={data?.paymentSuccess} />
      <div className='min-h-dvh bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
        {/* Header */}
        <motion.div
          className='relative z-10 px-4 py-6'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className='max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center space-x-4'>
              {/* Animated logo with winner celebration */}
              <motion.div
                className='relative'
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                  delay: 0.2,
                }}
              >
                <motion.div
                  className='w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center relative overflow-hidden'
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(251, 146, 60, 0.5)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Heart className='w-6 h-6 text-white' />
                  </motion.div>

                  {/* Winner sparkle effect */}
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-transparent'
                    animate={{
                      opacity: [0, 0.7, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>

                {/* Floating crown for winner */}
                <motion.div
                  className='absolute -top-2 -right-2'
                  initial={{ opacity: 0, scale: 0, rotate: 45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  <Crown className='w-5 h-5 text-yellow-400' />
                </motion.div>
              </motion.div>

              {/* Animated text content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.h1
                  className='text-xl font-bold text-white flex items-center gap-2'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Little Paws Dachshund Rescue
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, type: 'spring' }}
                  >
                    <Trophy className='w-5 h-5 text-yellow-400' />
                  </motion.div>
                </motion.h1>

                <motion.p
                  className='text-sm text-white/70 flex items-center gap-1'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Sparkles className='w-3 h-3 text-yellow-400' />
                  Congratulations on your winning bids!
                </motion.p>
              </motion.div>
            </div>

            {/* Animated back button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to={`/auctions/${winningBid?.customAuctionLink}`} className='group'>
                <motion.div
                  className='flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white transition-all duration-300 w-fit mt-4 md:mt-0'
                  whileHover={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    scale: 1.05,
                    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={{ x: [0, -2, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className='group-hover:animate-none'
                  >
                    <ArrowLeft className='w-4 h-4' />
                  </motion.div>
                  <span className='text-sm font-medium'>Back to auction</span>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Celebration particles background */}
          <motion.div
            className='absolute inset-0 pointer-events-none overflow-hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute w-1 h-1 bg-yellow-400 rounded-full'
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [-10, -30, -10],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        <div className='relative z-10 max-w-6xl mx-auto px-4 pb-8'>
          <AuctionItemWinnerContainer
            winningBid={winningBid}
            setOrderLoader={setOrderLoader}
            payForAuctionItem={payforAuctionItem}
          />
        </div>
      </div>
    </>
  );
};

export default AuctionItemWinner;
