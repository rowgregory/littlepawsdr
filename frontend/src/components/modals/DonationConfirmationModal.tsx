import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';

const DonationConfirmationModal = ({ openModal, handleClose, user }: any) => {
  const navigate = useNavigate();

  const handleNext = () => {
    if (user?._id) {
      navigate('/supporter/donations');
    } else {
      navigate('/auth/register?conversionSource=donation_confirmation_modal');
    }
  };

  return (
    <AnimatePresence>
      {openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[100]'
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className='bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden'
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className='absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10'
            >
              <X className='w-5 h-5' />
            </motion.button>

            {/* Content */}
            <div className='p-8 flex flex-col items-center text-center'>
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 20 }}
                className='flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-teal-100 to-teal-50 mb-6 shadow-lg'
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className='w-10 h-10 text-teal-600 fill-teal-600' />
                </motion.div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='space-y-4 mb-8'
              >
                <h2 className='text-2xl font-bold text-gray-900'>
                  {!user?._id ? 'Create Your Account' : 'Thank You!'}
                </h2>
                <p className='text-gray-600 leading-relaxed'>
                  {!user?._id
                    ? 'Your generous support means everything. To access your donation history and track your contributions, please create a registered account with us.'
                    : 'Your generous support means everything to Little Paws Dachshund Rescue. Thank you for helping us care for our furry friends.'}
                </p>
              </motion.div>

              {/* Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className='w-full py-3 px-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow'
              >
                {!user?._id ? 'Sign Up' : 'View My Donations'}
              </motion.button>

              {/* Secondary Action */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className='w-full mt-3 py-3 px-6 text-gray-700 font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationConfirmationModal;
