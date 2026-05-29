import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGetDachshundsByStatusMutation } from '../../redux/services/rescueGroupsApi';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import AvailableDachshundCard from '../common/AvailableDachshundCard';
import { motion } from 'framer-motion';
import { cardVariants, containerVariants, itemVariants } from '../../lib/constants/motion';
import { ArrowRight } from 'lucide-react';

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

  // Loading
  if (isLoading) {
    return (
      <div className='px-3 sm:px-6'>
        <div className='max-w-screen-xl w-full mx-auto mt-16 sm:mt-28 mb-24 sm:mb-32'>
          <div className='flex justify-center items-center min-h-[320px]'>
            <div className='text-center' role='status' aria-live='polite'>
              <span
                className='block w-12 h-12 border-4 border-primary-light dark:border-primary-dark border-t-transparent mx-auto mb-4 motion-safe:animate-spin'
                aria-hidden='true'
              />
              <p className='font-mono text-xs uppercase tracking-wide text-muted-light dark:text-muted-dark'>
                Loading dachshunds…
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const dachshunds = dachshund?.dachshunds || [];

  // Empty
  if (dachshunds.length === 0) {
    return (
      <div className='px-3 sm:px-6'>
        <div className='max-w-screen-xl w-full mx-auto mt-16 sm:mt-28 mb-24 sm:mb-32'>
          <div className='text-center py-16'>
            <p className='font-mono text-xs uppercase tracking-wide text-muted-light dark:text-muted-dark'>
              No dachshunds available
            </p>
            <p className='text-sm text-muted-light/70 dark:text-muted-dark/70 mt-2'>
              Check back soon for new arrivals!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section aria-labelledby='meet-dachshunds-heading' className='px-3 sm:px-6'>
      <div className='max-w-screen-xl w-full mx-auto mt-16 sm:mt-28 mb-24 sm:mb-32'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className='space-y-6 sm:space-y-8'
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className='flex items-center gap-3'>
            <span
              className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
              aria-hidden='true'
            />
            <h3
              id='meet-dachshunds-heading'
              className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'
            >
              Meet The Dachshunds
            </h3>
          </motion.div>

          {/* Header */}
          <motion.div
            variants={itemVariants}
            className='flex flex-col lg:flex-row items-start lg:items-end justify-between gap-5 lg:gap-8'
          >
            <div className='flex-1'>
              <h2 className='font-quicksand text-2xl sm:text-4xl lg:text-5xl font-bold text-text-light dark:text-text-dark mb-3 leading-tight'>
                Find Your Perfect Summer Companion
              </h2>
              <p className='text-base sm:text-lg text-muted-light dark:text-muted-dark'>
                These precious pups are hoping for a forever home this summer.
              </p>
            </div>

            <Link
              to='/dachshunds'
              className='font-mono text-[11px] uppercase tracking-[0.15em] inline-flex items-center gap-2 px-6 py-3.5 text-bg-light dark:text-bg-dark bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark shrink-0'
            >
              View All
              <ArrowRight className='w-4 h-4' aria-hidden='true' />
            </Link>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={containerVariants}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 pt-4'
          >
            {dachshunds.slice(0, 4).map((obj: any, i: number) => (
              <motion.div
                key={obj?._id || obj?.id || i}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <AvailableDachshundCard obj={obj} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetTheDachshunds;
