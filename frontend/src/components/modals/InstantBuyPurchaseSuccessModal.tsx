import { Link } from 'react-router-dom';
import { Sparkles, Heart, Gift, ArrowRight, Mail, CheckCircle } from 'lucide-react';
import { FC } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

const InstantBuyPurchaseSuccessModal: FC<{ instantBuySuccess: boolean }> = ({ instantBuySuccess }) => {
  return (
    <AnimatePresence>
      {instantBuySuccess && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          initial={{
            backdropFilter: 'blur(48px)',
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }}
          animate={{
            backdropFilter: 'blur(0px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          exit={{
            backdropFilter: 'blur(24px)',
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.div
            className='relative bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-8 rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full'
            initial={{
              // scale: 0.7,
              opacity: 0,
              y: 50,
            }}
            animate={{
              // scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              // scale: 0.8,
              opacity: 0,
              y: 30,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Animated background elements */}
            <div className='absolute inset-0 overflow-hidden'>
              <motion.div
                className='absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full'
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className='absolute top-8 right-6 w-6 h-6 bg-yellow-300/30 rounded-full'
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1.3 }}
              />
              <motion.div
                className='absolute bottom-6 left-8 w-4 h-4 bg-pink-300/40 rounded-full'
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: 1.7 }}
              />
              <motion.div
                className='absolute bottom-4 right-4 w-10 h-10 bg-white/10 rounded-full'
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
              />

              {/* Floating sparkles with staggered animations */}
              <motion.div
                className='absolute top-12 left-1/4'
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
              >
                <Sparkles className='w-5 h-5 text-yellow-300/60' />
              </motion.div>
              <motion.div
                className='absolute top-16 right-1/3'
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
              >
                <Sparkles className='w-4 h-4 text-white/40' />
              </motion.div>
              <motion.div
                className='absolute bottom-12 left-1/3'
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1.4 }}
              >
                <Sparkles className='w-6 h-6 text-yellow-200/50' />
              </motion.div>
            </div>

            <div className='relative z-10 flex flex-col justify-center items-center text-center'>
              {/* Success Icon with Enhanced Animation */}
              <motion.div
                className='relative mb-6'
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.8,
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                <motion.div
                  className='w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg'
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  <CheckCircle className='w-12 h-12 text-green-500' />
                </motion.div>
                {/* Enhanced pulsing ring effect */}
                <motion.div
                  className='absolute inset-0 w-24 h-24 bg-white/30 rounded-full'
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />
              </motion.div>

              {/* Celebration Header with Staggered Animation */}
              <motion.div className='mb-6' initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}>
                <motion.h1
                  className='text-4xl md:text-5xl font-black text-white mb-2'
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.8 }}
                >
                  🎉 SUCCESS! 🎉
                </motion.h1>
                <motion.p
                  className='text-xl md:text-2xl font-bold text-white/90 mb-1'
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  Thank You for Your Purchase!
                </motion.p>
                <motion.p
                  className='text-lg text-white/80'
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  You're making a difference! 💝
                </motion.p>
              </motion.div>

              {/* Impact Message with Slide-in */}
              <motion.div
                className='bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 mb-6 w-full max-w-md'
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                <div className='flex items-center justify-center mb-2'>
                  <Heart className='w-5 h-5 text-red-300 mr-2' />
                  <span className='text-white font-semibold text-sm'>You're helping rescue dachshunds!</span>
                </div>
                <p className='text-white/80 text-sm'>
                  Your purchase directly supports Little Paws Rescue's mission to save and care for dachshunds in need.
                </p>
              </motion.div>

              {/* Confirmation Details with Slide-in */}
              <motion.div
                className='bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl p-4 mb-6 w-full max-w-md'
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                <div className='flex items-center justify-center mb-2'>
                  <Mail className='w-4 h-4 text-white/80 mr-2' />
                  <span className='text-white/90 font-medium text-sm'>Confirmation Sent</span>
                </div>
                <p className='text-white/70 text-sm'>A payment confirmation has been sent to your email.</p>
              </motion.div>

              {/* Action Button with Bounce-in */}
              <motion.div
                className='flex flex-col sm:flex-row gap-3 w-full max-w-md'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 0.6, type: 'spring' }}
              >
                <Link
                  to='/settings/campaign/instant-buys'
                  className='flex-1 bg-white hover:bg-gray-50 text-green-600 font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center group hover:no-underline'
                >
                  <Gift className='w-4 h-4 mr-2 group-hover:animate-bounce' />
                  <span>View My Instant Buys</span>
                  <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                </Link>
              </motion.div>

              {/* Footer Message */}
              <motion.p
                className='text-white/60 text-xs mt-4 max-w-sm'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.8 }}
              >
                Keep an eye out for more amazing auction items and continue supporting our cause! 🐾
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstantBuyPurchaseSuccessModal;
