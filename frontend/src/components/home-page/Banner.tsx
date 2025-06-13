import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useVideo from '../../hooks/useVideo';
import { LandingVideo } from '../assets/videos';

const Banner = () => {
  const { videoRef } = useVideo();

  return (
    <div className='w-full relative -mt-14'>
      <motion.video
        ref={videoRef}
        className='w-full h-[600px] sm:h-[850px] block object-cover z-0'
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <source src={LandingVideo} type='video/mp4' />
        Your browser does not support the video tag.
      </motion.video>

      <motion.div
        className='px-3 pt-14 absolute z-0 top-0 left-0 flex-col w-full h-[600px] sm:h-[850px] flex justify-center bg-[#1c1c1c]/30'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className='max-w-screen-2xl w-full mx-auto px-3 xl:px-0 flex flex-col gap-5'>
          <motion.h1
            className='hidden sm:block mb-5 text-white font-QLight'
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            Your compassion can turn their world around. By supporting us, <br />
            you help abandoned animals find the love and care they deserve.
          </motion.h1>

          <motion.p
            className='w-fit text-white text-3xl sm:text-4xl lg:text-6xl tracking-wider font-QBold leading-10'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.9,
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
          >
            Help Abandoned Animals <br /> Find a Loving Home
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}>
            <Link
              to='/adopt'
              className='inline-block bg-teal-400 text-white py-4 px-9 rounded-lg font-QBold hover:shadow-lg hover:bg-teal-500 duration-300'
            >
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }} className='block'>
                Get Started
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
