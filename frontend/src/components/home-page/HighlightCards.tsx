import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { hightlightCardData } from '../data/home-page-data';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, easing: [0.22, 1, 0.36, 1] } },
};

const HighlightCards = () => {
  return (
    <div className='px-4 sm:px-6 md:px-12 -mt-12 mb-16 md:mb-32 relative z-20'>
      <motion.div
        className='max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border-light dark:bg-border-dark border border-border-light dark:border-border-dark'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* ── Data cards ── */}
        {hightlightCardData.map((obj, i) => {
          const IconComponent = obj.icon;

          return (
            <motion.div
              key={i}
              variants={cardVariants}
              className='group flex flex-col justify-between gap-5 p-6 xl:p-8 bg-bg-light dark:bg-bg-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors'
            >
              <div className='w-10 h-10 flex items-center justify-center bg-primary-light/10 dark:bg-primary-dark/10'>
                <IconComponent
                  className='w-5 h-5 text-primary-light dark:text-primary-dark'
                  aria-hidden='true'
                />
              </div>

              <div>
                <h2 className='font-changa text-xl uppercase leading-none text-text-light dark:text-text-dark mb-3'>
                  {obj.titleKey}
                </h2>
                <p className='font-lato text-sm text-muted-light dark:text-muted-dark leading-relaxed'>
                  {obj.textKey}
                </p>
              </div>

              <Link
                to={obj.linkKey}
                className='group/link inline-flex items-center gap-2 font-changa text-f10 uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                {obj.btnText}
                <ArrowRight
                  className='w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform'
                  aria-hidden='true'
                />
              </Link>
            </motion.div>
          );
        })}

        {/* ── Adoption CTA card ── */}
        <motion.div
          variants={cardVariants}
          className='group relative overflow-hidden flex flex-col justify-between gap-5 p-6 xl:p-8 bg-primary-light dark:bg-[#1e1b4b]'
        >
          {/* Subtle shimmer */}
          <motion.div
            className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none'
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            aria-hidden='true'
          />

          <div className='w-10 h-10 flex items-center justify-center bg-white/10'>
            <Heart className='w-5 h-5 text-white' aria-hidden='true' />
          </div>

          <div>
            <h2 className='font-changa text-xl uppercase leading-none text-white mb-3'>
              Adoption Special
            </h2>
            <p className='font-lato text-sm text-white/80 leading-relaxed'>
              Help us find homes for our most adorable companions. These wonderful pups are hoping
              to spend the season with their forever families.
            </p>
          </div>

          <a
            href='/dachshunds'
            className='group/link inline-flex items-center gap-2 font-changa text-f10 uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
          >
            Find Your Match
            <ArrowRight
              className='w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform'
              aria-hidden='true'
            />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HighlightCards;
