import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FC } from 'react';

interface AuctionItemWinnerSuccessPaymentModalProps {
  open: boolean;
}

const AuctionItemWinnerSuccessPaymentModal: FC<AuctionItemWinnerSuccessPaymentModalProps> = ({
  open,
}) => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'][i % 5],
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    x: Math.random() * 400 - 200,
    y: Math.random() * 300 - 150,
    rotation: Math.random() * 360,
  }));

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='relative overflow-hidden' onClick={(e) => e.stopPropagation()}>
            {/* Confetti */}
            {confettiPieces.map((piece) => (
              <motion.div
                key={piece.id}
                className='absolute w-3 h-3 rounded-sm'
                style={{ backgroundColor: piece.color }}
                initial={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: piece.x,
                  y: piece.y + 400,
                  rotate: piece.rotation + 720,
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                }}
                transition={{
                  delay: piece.delay,
                  duration: piece.duration,
                  ease: 'easeOut',
                }}
              />
            ))}

            <motion.div
              className='bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 p-8 rounded-3xl max-w-md mx-auto shadow-2xl border-4 border-yellow-300'
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                duration: 0.8,
              }}
            >
              <div className='text-center relative'>
                {/* Celebration burst background */}
                <motion.div
                  className='absolute inset-0 bg-yellow-200/30 rounded-full'
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 1, delay: 0.3 }}
                />

                {/* Trophy/Star Icon */}
                <motion.div
                  className='w-20 h-20 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6 relative border-4 border-yellow-100 shadow-lg'
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.5,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  <motion.svg
                    className='w-10 h-10 text-yellow-600'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                  </motion.svg>

                  {/* Sparkles around the star */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className='absolute w-1 h-1 bg-yellow-400 rounded-full'
                      style={{
                        top: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 40}px`,
                        left: `${20 + Math.cos((i * 60 * Math.PI) / 180) * 40}px`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2 + 1,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Success Message */}
                <motion.h2
                  className='text-3xl font-bold mb-3 text-white drop-shadow-lg'
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  CONGRATULATIONS!
                </motion.h2>

                <motion.p
                  className='text-lg font-semibold text-yellow-100 mb-2'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  Payment Successful!
                </motion.p>

                {/* Confirmation Text */}
                <motion.p
                  className='text-yellow-50 text-center leading-relaxed mb-8 text-sm'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  A confirmation has been sent to your email.
                  <br />
                  Your winning items are secured!
                </motion.p>

                {/* Action Button */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='relative'
                >
                  <Link
                    to='/supporter/auctions'
                    className='block w-full bg-white text-orange-600 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:no-underline hover:text-orange-700 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  >
                    View My Winning Bids
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuctionItemWinnerSuccessPaymentModal;
