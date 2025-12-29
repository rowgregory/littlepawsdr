import { Fragment } from 'react';
import CanOfWetFood from '../../components/assets/can-of-wet-food.png';
import BagOfDryFood from '../../components/assets/bag-of-dry-food.jpeg';
import CaseOfWetFood from '../../components/assets/case-of-wet-food.png';
import useCountDown from '../../hooks/useCountDown';
import FeedAFosterImg from '../../components/assets/ecards-high.jpg';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';
import { Gift, Heart, PawPrint } from 'lucide-react';

const FeedAFoster = () => {
  const year = new Date().getFullYear();
  const { timerComponents, status, loading } = useCountDown(
    `${year}/07/01`,
    `${year}/07/31`,
    `${year + 1}/07/01`
  );

  const donationOptions = [
    {
      image: CanOfWetFood,
      title: 'Can of Wet Food',
      amount: '$3',
      description: 'Feed a foster dog for a day',
      buttonId: 'NARBGDNZ39KHG',
    },
    {
      image: BagOfDryFood,
      title: 'Bag of Dry Food',
      amount: '$12',
      description: 'Feed a foster dog for a week',
      buttonId: 'E39725T3HKKVY',
    },
    {
      image: CaseOfWetFood,
      title: 'Case of Wet Food',
      amount: '$35',
      description: 'Feed a foster dog for a month',
      buttonId: 'KYKXTQ8DTQZYW',
    },
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Fragment>
      <PageBanner imgSrc={FeedAFosterImg} title='Feed a Foster' />

      {status.active ? (
        <div className='bg-white'>
          {/* Header Section */}
          <motion.section
            className='max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className='text-center mb-12'>
              <motion.div
                className='inline-block mb-4'
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className='bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold'>
                  July is Foster Appreciation Month
                </span>
              </motion.div>

              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4'>
                Feed a Foster
              </h1>
              <p className='text-xl text-gray-600'>
                Help us support our amazing foster families this July
              </p>
            </div>

            {/* Info Cards */}
            <motion.div
              className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'
              variants={containerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
            >
              <motion.div
                className='bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 border border-teal-100'
                variants={itemVariants}
              >
                <div className='flex items-start gap-4 mb-4'>
                  <div className='p-3 bg-teal-500 rounded-lg'>
                    <Heart className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Why Foster Matters</h3>
                  </div>
                </div>
                <p className='text-gray-700 leading-relaxed'>
                  Volunteering to foster a dog is a huge, rewarding commitment. Fostering really
                  does save lives! When a family decides to take in a dachshund to foster, Little
                  Paws provides all medical care. The family is responsible for love, comfort, and
                  food.
                </p>
              </motion.div>

              <motion.div
                className='bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 border border-teal-100'
                variants={itemVariants}
              >
                <div className='flex items-start gap-4 mb-4'>
                  <div className='p-3 bg-teal-500 rounded-lg'>
                    <PawPrint className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Our Foster Program</h3>
                  </div>
                </div>
                <p className='text-gray-700 leading-relaxed'>
                  We currently have 40 dogs in foster homes with exceptional foster families
                  providing care for special needs doxies and entire litters of puppies. Our
                  Sanctuary Foster Homes care for un-adoptable dogs that need extraordinary
                  attention.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className='bg-teal-50 rounded-xl p-8 border border-teal-100 mb-12'
              variants={itemVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
            >
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>How Your Donation Helps</h3>
              <p className='text-gray-700 mb-4'>
                You can choose how much food you would like to donate. Please know that EVERY bit
                counts. We currently have 40 dogs in foster homes!
              </p>
              <p className='text-gray-700'>
                We also accept Venmo @LittlePawsDR and checks. Your generosity directly supports the
                daily care of our foster dogs.
              </p>
            </motion.div>
          </motion.section>

          {/* Donation Cards */}
          <motion.section
            className='max-w-6xl mx-auto px-4 sm:px-6 py-12'
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <h2 className='text-3xl font-bold text-gray-900 text-center mb-12'>
              Choose Your Donation
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {donationOptions.map((option, index) => (
                <motion.div
                  key={index}
                  className='bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-teal-300 transition-all duration-300'
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  {/* Image */}
                  <div className='relative overflow-hidden bg-gray-100 h-64'>
                    <img
                      src={option.image}
                      alt={option.title}
                      className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors' />
                  </div>

                  {/* Content */}
                  <div className='p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>{option.title}</h3>
                    <p className='text-sm text-gray-600 mb-4'>{option.description}</p>

                    {/* Price */}
                    <div className='mb-6 pb-6 border-b border-gray-200'>
                      <p className='text-3xl font-bold text-teal-600'>{option.amount}</p>
                    </div>

                    {/* Donate Button */}
                    <form
                      action='https://www.paypal.com/donate'
                      method='post'
                      target='_top'
                      className='w-full'
                    >
                      <input type='hidden' name='hosted_button_id' value={option.buttonId} />
                      <motion.button
                        type='submit'
                        className='w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Gift className='w-4 h-4' />
                        Donate Now
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      ) : (
        <motion.section
          className='min-h-screen bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 flex items-center justify-center py-12 px-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className='text-center'>
            <motion.h3
              className='text-white font-semibold text-lg sm:text-xl mb-8'
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {status.past
                ? '🐾 Thank you for your support! See you next July! 🐾'
                : 'Coming This July! ☀️'}
            </motion.h3>

            <motion.h2
              className='text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-12'
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Feed A Foster
            </motion.h2>

            {/* Countdown Timer */}
            {!loading && timerComponents && (
              <motion.div
                className='grid grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto'
                variants={containerVariants}
                initial='hidden'
                animate='visible'
              >
                {timerComponents.map((obj: any, i: number) => (
                  <motion.div
                    key={i}
                    className='flex flex-col items-center'
                    variants={itemVariants}
                  >
                    <div className='bg-white/20 backdrop-blur-sm rounded-lg p-4 w-full'>
                      <p className='text-3xl sm:text-4xl font-bold text-white mb-2'>{obj?.time}</p>
                      <p className='text-white/80 text-xs sm:text-sm uppercase tracking-wider'>
                        {obj?.tag}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
      )}
    </Fragment>
  );
};

export default FeedAFoster;
