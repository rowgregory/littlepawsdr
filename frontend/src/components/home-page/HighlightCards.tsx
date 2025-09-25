import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AwesomeIcon from '../common/AwesomeIcon';
import { hightlightCardData } from '../data/home-page-data';
import { Ghost, Moon, Skull, Zap } from 'lucide-react';

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

  const spookyCardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
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

        <motion.div
          className='rounded-2xl mb-5 lg:mb-0 md:rounded-tr-2xl md:rounded-tl-none md:rounded-bl-none md:rounded-br-2xl lg:rounded-2xl 
      col-span-12 md:col-span-6 lg:col-span-3 shadow-lg gap-2.5 flex flex-col justify-between 
      items-start p-6 xl:p-8 z-20 lg:ml-3 relative overflow-hidden bg-gradient-to-br from-green-700 to-purple-700'
          variants={spookyCardVariants}
          whileHover={{
            y: -8,
            scale: 1.02,
            boxShadow: '0 25px 50px -12px rgba(220, 38, 38, 0.4)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Eerie fog effect */}
          <motion.div
            className='absolute inset-0 bg-gradient-to-t from-gray-900/30 via-purple-900/20 to-transparent'
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Lightning flash effect */}
          <motion.div
            className='absolute inset-0 bg-white'
            animate={{
              opacity: [0, 0, 0, 0.8, 0, 0, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 8,
              times: [0, 0.1, 0.2, 0.25, 0.3, 0.4, 1],
            }}
          />

          <motion.h1
            className='font-bold text-2xl text-orange-300 relative z-10'
            animate={{
              textShadow: ['0 0 5px rgba(251, 146, 60, 0.5)', '0 0 15px rgba(251, 146, 60, 0.8)', '0 0 5px rgba(251, 146, 60, 0.5)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Spooky Adoption Special
          </motion.h1>

          <p className='font-medium text-gray-200 relative z-10'>
            This Halloween season, help us find homes for our most mysterious companions. These enchanting pups are looking for their forever
            covens... er, families!
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }} className='relative z-10'>
            <a href='/dachshunds' className='font-bold text-orange-300 hover:text-orange-200 duration-300 relative z-10 flex items-center gap-2'>
              Find Your Familiar
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Zap className='w-4 h-4' />
              </motion.div>
            </a>
          </motion.div>

          {/* Floating ghost */}
          <motion.div
            className='absolute top-4 right-4 text-white/30'
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Ghost className='w-12 h-12' />
          </motion.div>

          {/* Floating skull */}
          <motion.div
            className='absolute bottom-20 right-8 text-red-300/40'
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -8, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 1,
            }}
          >
            <Skull className='w-8 h-8' />
          </motion.div>

          {/* Floating moon */}
          <motion.div
            className='absolute top-16 right-12 text-yellow-200/50'
            animate={{
              y: [0, -12, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 0.5,
            }}
          >
            <Moon className='w-6 h-6' />
          </motion.div>

          {/* Creepy crawly dots */}
          <motion.div
            className='absolute bottom-10 left-6 w-2 h-2 bg-purple-400 rounded-full'
            animate={{
              x: [0, 20, 0, -10, 0],
              y: [0, -5, -10, 0, 0],
              opacity: [0.6, 0.9, 0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className='absolute top-24 left-8 w-1 h-1 bg-orange-400 rounded-full'
            animate={{
              x: [0, -15, 10, 0],
              y: [0, 8, -5, 0],
              opacity: [0.4, 0.8, 0.4, 0.6],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 2,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HighlightCards;
