import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, User } from 'lucide-react';
import MotionLink from '../components/common/MotionLink';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      {/* Header */}
      <motion.header
        className='bg-gray-50 border-b border-gray-200'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
          <Link to='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
            <span className='text-2xl'>🐾</span>
            <span className='font-bold text-lg text-gray-900 hidden sm:inline'>
              Little Paws Dachshund Rescue
            </span>
          </Link>

          <MotionLink
            to='/auth/login'
            className='p-2 hover:bg-gray-200 rounded-lg transition-colors'
          >
            <User className='w-6 h-6 text-gray-700' />
          </MotionLink>
        </div>
      </motion.header>

      {/* 404 Content */}
      <motion.main
        className='flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className='text-center max-w-md'>
          {/* 404 Illustration */}
          <motion.div
            className='mb-8'
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className='text-7xl font-bold text-gray-900 mb-2'>404</p>
            <p className='text-gray-500 text-lg'>Oops! This page went to the dog park.</p>
          </motion.div>

          {/* Message */}
          <motion.div
            className='mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className='text-3xl font-bold text-gray-900 mb-3'>Page Not Found</h1>
            <p className='text-gray-600 mb-2'>
              We couldn't find the page you're looking for. It might have been moved or deleted.
            </p>
            <p className='text-gray-500 text-sm'>
              Don't worry, our rescue pups are still waiting for you!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className='flex flex-col sm:flex-row gap-3 justify-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => navigate(-1)}
              className='flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className='w-4 h-4' />
              Go Back
            </motion.button>

            <Link
              to='/'
              className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-colors'
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Home className='w-4 h-4' />
              </motion.div>
              Home
            </Link>
          </motion.div>

          {/* Fun facts */}
          <motion.div
            className='mt-12 pt-8 border-t border-gray-200'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className='text-sm text-gray-500 mb-4'>Did you know?</p>
            <p className='text-gray-600 text-sm leading-relaxed'>
              Dachshunds were originally bred to hunt badgers. Their long bodies let them follow
              badgers into their burrows. Now they just like burrowing into blankets!
            </p>
          </motion.div>
        </div>
      </motion.main>

      {/* Footer CTA */}
      <motion.div
        className='bg-teal-50 border-t border-teal-100 py-6 px-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className='max-w-7xl mx-auto text-center'>
          <p className='text-gray-700 mb-3'>Looking to donate?</p>
          <Link
            to='/donate'
            className='inline-block px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors'
          >
            Donate
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
