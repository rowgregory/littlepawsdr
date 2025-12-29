import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGetDachshundsByStatusMutation } from '../../redux/services/rescueGroupsApi';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import AvailableDachshundCard from '../common/AvailableDachshundCard';
import { motion } from 'framer-motion';
import { Snowflake, Heart } from 'lucide-react';
import { cardVariants, containerVariants, itemVariants } from '../../lib/constants/motion';

const MeetTheDachshunds = () => {
  const dachshund = useAppSelector((state: RootState) => state.dachshund);
  const [getDachshunds, { isLoading }] = useGetDachshundsByStatusMutation();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      getDachshunds({ status: 'Available' });
      hasFetched.current = true;
    }
  }, [getDachshunds]);

  // Show loading state
  if (isLoading) {
    return (
      <div className='px-3 sm:px-6'>
        <div className='max-w-screen-xl w-full mx-auto mt-20 sm:mt-32 mb-32 sm:mb-40'>
          <div className='flex justify-center items-center min-h-[400px]'>
            <div className='text-center'>
              <motion.div
                className='w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4'
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <p className='text-gray-600 font-QBook'>Loading adorable dachshunds...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get dachshunds array - it's directly in the state
  const dachshunds = dachshund?.dachshunds || [];

  // Show empty state if no dachshunds
  if (dachshunds.length === 0) {
    return (
      <div className='px-3 sm:px-6'>
        <div className='max-w-screen-xl w-full mx-auto mt-20 sm:mt-32 mb-32 sm:mb-40'>
          <div className='text-center py-20'>
            <Snowflake className='w-16 h-16 text-gray-300 mx-auto mb-4' />
            <p className='text-gray-600 font-QBook text-lg'>
              No dachshunds available at the moment.
            </p>
            <p className='text-gray-500 font-QBook text-sm mt-2'>
              Check back soon for new arrivals!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='px-3 sm:px-6 relative overflow-hidden'>
      {/* Decorative Winter elements */}
      <motion.div
        className='absolute top-10 left-10 text-cyan-200/20'
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Snowflake className='w-32 h-32' />
      </motion.div>

      <motion.div
        className='absolute bottom-20 right-10 text-blue-200/20'
        animate={{
          rotate: [0, -360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Snowflake className='w-28 h-28' />
      </motion.div>

      <div className='max-w-screen-xl w-full mx-auto mt-20 sm:mt-32 mb-32 sm:mb-40 relative z-10'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className='space-y-8'
        >
          {/* Subtitle with winter accent */}
          <motion.div variants={itemVariants} className='relative inline-block'>
            <div className='flex items-center gap-3'>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Snowflake className='w-6 h-6 text-cyan-500' />
              </motion.div>
              <h3 className='text-xl sm:text-2xl font-QBold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>
                Meet The Dachshunds
              </h3>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.5,
                }}
              >
                <Snowflake className='w-6 h-6 text-blue-600' />
              </motion.div>
            </div>
            <motion.div
              className='absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500'
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ originX: 0 }}
            />
          </motion.div>

          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8'
          >
            <div className='flex-1'>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl text-gray-800 font-QBold mb-3 leading-tight'>
                Find Your Perfect Winter Companion
              </h2>
              <p className='text-base sm:text-lg text-gray-600 font-QBook flex items-center gap-2'>
                <Heart className='w-5 h-5 text-cyan-500' />
                These precious pups are hoping for a forever home this winter season
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to='/dachshunds'
                className='relative group inline-flex items-center gap-2 px-8 py-4 font-QBold text-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300'
                style={{
                  backgroundImage: 'linear-gradient(135deg, #06b6d4, #0ea5e9, #0284c7, #1e40af)',
                  backgroundSize: '300% 300%',
                }}
              >
                <motion.div
                  className='absolute inset-0'
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #06b6d4, #0ea5e9, #0284c7, #1e40af)',
                    backgroundSize: '300% 300%',
                  }}
                />
                <span className='relative z-10'>View All</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className='relative z-10'
                >
                  <Snowflake className='w-5 h-5' />
                </motion.div>

                {/* Frost sparkle effect */}
                <motion.div
                  className='absolute inset-0 bg-white'
                  animate={{
                    opacity: [0, 0.2, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8'
          >
            {dachshunds?.slice(0, 4).map((obj: any, i: number) => (
              <motion.div
                key={obj?.id || i}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className='relative'
              >
                <AvailableDachshundCard obj={obj} />

                {/* Icy snowflake corner badge */}
                <motion.div
                  className='absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg z-10'
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Snowflake className='w-6 h-6 text-white' />
                </motion.div>

                {/* Falling snow on card */}
                <motion.div
                  className='absolute top-0 left-4 w-1.5 h-1.5 bg-white rounded-full shadow-lg'
                  animate={{
                    y: [0, 100],
                    opacity: [0, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className='flex justify-center mt-12'
          >
            <div className='flex items-center gap-4'>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Snowflake className='w-8 h-8 text-cyan-400' />
              </motion.div>
              <div className='h-px w-32 bg-gradient-to-r from-transparent via-cyan-300 to-transparent' />
              <Heart className='w-6 h-6 text-cyan-500 fill-cyan-500' />
              <div className='h-px w-32 bg-gradient-to-r from-transparent via-blue-300 to-transparent' />
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Snowflake className='w-8 h-8 text-blue-500' />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MeetTheDachshunds;
