import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Skeleton from '../../components/Loaders/Skeleton';
import { useCheckAdoptionSessionMutation } from '../../redux/services/adoptionApplicationFeeApi';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useUserSelector } from '../../redux/toolkitStore';
import CountdownTimer from '../../components/common/CountdownTImer';

const AdoptionApplication = () => {
  const navigate = useNavigate();
  const { user } = useUserSelector();
  const { id } = useParams();
  const [countdownEnded, setCountdownEnded] = useState(false);

  const [checkAdoptionSession, { isLoading, data, error }] = useCheckAdoptionSessionMutation();

  useEffect(() => {
    if (id) {
      checkAdoptionSession({ id });
    }
  }, [checkAdoptionSession, id]);

  useEffect(() => {
    if (countdownEnded) {
      navigate('/adopt');
    }
  }, [countdownEnded, navigate]);

  if (isLoading) {
    return (
      <div className='relative'>
        <Skeleton w='100%' h='575px' />
      </div>
    );
  }

  if (error || !data?.isActive) {
    return (
      <div className='h-[calc(100vh-773px)] w-full bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4'>
        <div className='max-w-md w-full space-y-8'>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-center space-y-4'
          >
            <h1 className='text-4xl font-bold text-gray-900'>Session Expired</h1>
            <p className='text-lg text-gray-600'>Your 7-day access period has ended.</p>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='p-4 bg-red-50 border border-red-200 rounded-lg'
              >
                <p className='text-red-700 text-sm'>{error}</p>
              </motion.div>
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='space-y-3'
          >
            <Link
              to='/adopt'
              className='w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2'
            >
              <span>Start New Application</span>
              <ChevronRight className='w-4 h-4' />
            </Link>
            <Link
              to='/'
              className='block w-full px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold rounded-lg transition-colors text-center'
            >
              Back to Home
            </Link>
            <Link
              to={user?._id ? '/supporter/overview' : '/auth/register'}
              className='block w-full px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold rounded-lg transition-colors text-center'
            >
              My Profile
            </Link>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2'
          >
            <p className='text-sm font-medium text-gray-900'>Need help?</p>
            <p className='text-xs text-gray-600'>
              Contact us at{' '}
              <a
                href='mailto:applications@littlepawsdr.org'
                className='text-teal-600 hover:text-teal-700'
              >
                lpdr@littlepawsdr.org
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full px-3 pt-16 pb-32 fade-in'>
      <h1 className='font-QBold text-charcoal text-xl sm:text-2xl mb-3 text-center'>
        Little Paws Dachshund Rescue {new Date().getFullYear()} Adoption Application
      </h1>
      {data?.expiresAt && (
        <CountdownTimer
          expiresAt={data.expiresAt}
          setCountdownEnded={setCountdownEnded}
          styles='relative text-charcoal font-QBold text-center'
        />
      )}
      <div className='max-w-screen-md mx-auto border border-gray-200 rounded-xl mt-6'>
        <iframe
          className='h-[600px] overflow-y-scroll w-full'
          title='Adoption Application'
          src='https://toolkit.rescuegroups.org/of/f?c=WHMQCBRV'
        />
      </div>
    </div>
  );
};

export default AdoptionApplication;
