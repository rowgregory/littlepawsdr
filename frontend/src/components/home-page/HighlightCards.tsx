import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Paw2 } from '../assets';
import AwesomeIcon from '../common/AwesomeIcon';
import { hightlightCardData } from '../data/home-page-data';

const HighlightCards = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const prideCardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className='px-3 -mt-16 mb-44'>
      <motion.div
        className={`w-full max-w-screen-xl mx-auto grid grid-cols-12`}
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
      >
        {hightlightCardData.map((obj, i) => (
          <motion.div
            key={i}
            className={`${
              i === 0
                ? 'rounded-2xl sm:rounded-tl-2xl sm:rounded-bl-2xl sm:rounded-br-none sm:rounded-tr-none mb-5 lg:mb-0'
                : i === 1
                ? 'rounded-2xl sm:rounded-bl-none sm:rounded-tl-none sm:rounded-tr-2xl sm:rounded-br-2xl mb-5 lg:mb-0 lg:rounded-tr-none lg:rounded-br-none'
                : 'rounded-2xl mb-5 lg:mb-0 sm:rounded-tl-2xl rounded-bl-2xl sm:rounded-tr-none sm:rounded-br-none lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-2xl lg:rounded-br-2xl'
            } col-span-12 md:col-span-6 lg:col-span-3 shadow-lg gap-3 flex flex-col justify-between items-start p-6 xl:p-8 bg-white z-20 relative overflow-hidden`}
            variants={cardVariants}
            whileHover={{
              y: -8,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Pride gradient border effect */}
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400  to-purple-600 opacity-0 rounded-2xl'
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
              <AwesomeIcon icon={obj.icon} className='text-teal-400 w-8 h-8 relative z-10' />
            </motion.div>

            <motion.h1 className='font-QBold text-2xl text-charcoal relative z-10' whileHover={{ color: '#14b8a6' }} transition={{ duration: 0.2 }}>
              {obj.titleKey}
            </motion.h1>

            <p className='font-QBook text-[#a4a4a4] relative z-10'>{obj.textKey}</p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Link to={obj.linkKey} className='font-QBold text-teal-400 hover:text-teal-500 duration-300 relative z-10'>
                {obj.btnText} →
              </Link>
            </motion.div>
          </motion.div>
        ))}

        {/* Pride-themed "Explore More" card */}
        <motion.div
          className='rounded-2xl mb-5 lg:mb-0 md:rounded-tr-2xl md:rounded-tl-none md:rounded-bl-none md:rounded-br-2xl lg:rounded-2xl 
          col-span-12 md:col-span-6 lg:col-span-3 shadow-lg gap-2.5 flex flex-col justify-between 
          items-start p-6 xl:p-8 z-20 lg:ml-3 relative overflow-hidden'
          style={{
            background: 'linear-gradient(135deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)',
          }}
          variants={prideCardVariants}
          whileHover={{
            y: -8,
            scale: 1.02,
            boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated rainbow shimmer effect */}
          <motion.div
            className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'linear',
            }}
          />

          <motion.h1
            className='font-QBold text-2xl text-white relative z-10'
            animate={{
              textShadow: ['0 0 10px rgba(255,255,255,0.5)', '0 0 20px rgba(255,255,255,0.8)', '0 0 10px rgba(255,255,255,0.5)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Explore with Pride
          </motion.h1>

          <p className='font-QBook text-white relative z-10'>
            Explore the dogs available for adoption at Little Paws. Every animal deserves love and acceptance, just like every person. Find a friend
            to bring home with pride! 🐾
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Link to='/dachshunds' className='font-QBold text-white hover:text-yellow-200 duration-300 relative z-10'>
              See Dachshunds with Love ✨
            </Link>
          </motion.div>

          <motion.img
            src={Paw2}
            alt='Little Paws Dachshund Rescue'
            className='absolute z-0 top-4 right-4 w-24 opacity-20'
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Floating pride hearts */}
          <motion.div
            className='absolute top-16 right-12 text-pink-200 text-lg'
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
          >
            💖
          </motion.div>

          <motion.div
            className='absolute bottom-20 right-8 text-yellow-200 text-sm'
            animate={{
              y: [0, -8, 0],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 1,
            }}
          >
            🌈
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HighlightCards;
