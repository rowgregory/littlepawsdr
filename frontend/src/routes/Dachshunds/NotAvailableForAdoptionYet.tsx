import DachshundCard from '../../components/dachshund/DachshundCard';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotAvaiableForAdoptionYet } from '../../components/assets';
import { useGetDachshundsByStatusMutation } from '../../redux/services/rescueGroupsApi';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../../lib/constants/motion';
import { ArrowRight } from 'lucide-react';

const NotAvailableForAdoptionYet = () => {
  const dachshund = useAppSelector((state: RootState) => state.dachshund);
  const [getDachshunds] = useGetDachshundsByStatusMutation();

  useEffect(() => {
    getDachshunds({ status: 'Hold' });
  }, [getDachshunds]);

  const dogs = dachshund?.dachshunds ?? [];

  return (
    <>
      <section aria-labelledby='hold-heading' className='px-3 sm:px-6 bg-bg-light dark:bg-bg-dark'>
        <div className='max-w-screen-lg w-full mx-auto pt-16 sm:pt-24 pb-24 sm:pb-32'>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className='space-y-8 sm:space-y-10'
          >
            {/* Eyebrow + headline */}
            <motion.div variants={itemVariants}>
              <div className='flex items-center gap-3 mb-4'>
                <span
                  className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
                  aria-hidden='true'
                />
                <h2
                  id='hold-heading'
                  className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'
                >
                  In Foster Care
                </h2>
              </div>
              <h1 className='text-2xl sm:text-4xl lg:text-5xl font-bold text-text-light dark:text-text-dark leading-tight'>
                Dogs in foster homes being evaluated for future adoption.
              </h1>
              <p className='text-base sm:text-lg text-muted-light dark:text-muted-dark mt-3 leading-relaxed'>
                Alongside our Available for Adoption page, we share the dogs currently in foster
                care so you can follow along as they get ready for their forever homes.
              </p>
            </motion.div>

            {/* Intro with image */}
            <motion.div
              variants={itemVariants}
              className='grid grid-cols-1 md:grid-cols-2 gap-0 border border-border-light dark:border-border-dark'
            >
              <div className='flex flex-col justify-center gap-4 p-8 sm:p-10 bg-surface-light dark:bg-surface-dark'>
                <p className='font-mono text-[11px] uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
                  The Process
                </p>
                <p className='text-lg sm:text-xl font-bold text-text-light dark:text-text-dark leading-snug'>
                  These dogs are at different stages of the evaluation process — all safe, happy,
                  and well cared for in their foster homes.
                </p>
                <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed'>
                  We&rsquo;re sharing some basic information about each one. We hope they&rsquo;ll
                  be up for adoption soon, and we&rsquo;ll add more details as they become
                  available.
                </p>
              </div>
              <img
                src={NotAvaiableForAdoptionYet}
                alt='A dachshund held up in a foster home'
                className='w-full h-full object-cover min-h-[280px]'
              />
            </motion.div>

            {/* Closing note */}
            <motion.p
              variants={itemVariants}
              className='text-xl sm:text-2xl font-bold text-text-light dark:text-text-dark text-center'
            >
              Keep an eye on our Available Dogs page for updates — we&rsquo;ll gladly accept your
              application once your desired dog is ready.
            </motion.p>

            {/* Support a Foster CTA */}
            <motion.div variants={itemVariants}>
              <Link
                to='/donate'
                className='group flex items-center justify-between gap-4 p-6 sm:p-8 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                <div>
                  <p className='font-mono text-[11px] uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark mb-1'>
                    Get Involved
                  </p>
                  <p className='text-xl sm:text-2xl font-bold text-text-light dark:text-text-dark'>
                    Support a Foster
                  </p>
                </div>
                <ArrowRight
                  className='w-6 h-6 shrink-0 text-primary-light dark:text-primary-dark group-hover:translate-x-1 transition-transform motion-reduce:transform-none'
                  aria-hidden='true'
                />
              </Link>
            </motion.div>

            {/* Dogs grid */}
            <motion.div variants={itemVariants}>
              {dogs.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                  {dogs.map((d: any, i: number) => (
                    <DachshundCard key={d?.id || i} dachshund={d} />
                  ))}
                </div>
              ) : (
                <p
                  className='font-mono text-xs uppercase tracking-wide text-center text-muted-light dark:text-muted-dark py-16'
                  role='status'
                >
                  No dogs in foster care to show right now
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NotAvailableForAdoptionYet;
