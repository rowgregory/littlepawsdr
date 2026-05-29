import { useGetWelcomeWienersQuery } from '../../redux/services/welcomeWienerApi';
import WelcomeWienerCard from '../../components/welcome-wiener/WelcomeWienerCard';
import { motion } from 'framer-motion';

const WelcomeWieners = () => {
  const { data, isLoading } = useGetWelcomeWienersQuery();
  const welcomeWieners = data?.welcomeWieners ?? [];
  const liveWieners = welcomeWieners.filter((wiener: any) => wiener?.isLive);

  return (
    <div className='min-h-screen bg-bg-light dark:bg-bg-dark'>
      <div className='max-w-6xl mx-auto px-3 sm:px-6 py-16 sm:py-20'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex flex-col items-center text-center mb-12 sm:mb-16'
        >
          <div className='flex items-center gap-3 mb-4'>
            <span
              className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
              aria-hidden='true'
            />
            <p className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
              Furry Lives Matter
            </p>
            <span
              className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
              aria-hidden='true'
            />
          </div>

          <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold text-text-light dark:text-text-dark mb-5 leading-tight'>
            Meet Our Welcome Wieners
          </h1>

          <p className='text-muted-light dark:text-muted-dark text-base sm:text-lg max-w-2xl mx-auto leading-relaxed'>
            Donations directly support a specific dog&rsquo;s needs &mdash; food, bedding,
            medication, and toys &mdash; so every contribution makes a meaningful impact on their
            life.
          </p>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
            aria-busy='true'
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className='animate-pulse border border-border-light dark:border-border-dark'
              >
                <div className='w-full aspect-square bg-surface-light dark:bg-surface-dark' />
                <div className='p-5 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark'>
                  <div className='h-5 w-2/3 bg-bg-light dark:bg-bg-dark mb-3' />
                  <div className='h-3 w-full bg-bg-light dark:bg-bg-dark mb-2' />
                  <div className='h-3 w-5/6 bg-bg-light dark:bg-bg-dark' />
                </div>
              </div>
            ))}
          </div>
        ) : liveWieners.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {liveWieners.map((wiener: any) => (
              <WelcomeWienerCard key={wiener._id} wiener={wiener} />
            ))}
          </div>
        ) : (
          <p
            className='font-mono text-xs uppercase tracking-wide text-center text-muted-light dark:text-muted-dark py-20'
            role='status'
          >
            No Welcome Wieners currently available
          </p>
        )}
      </div>
    </div>
  );
};

export default WelcomeWieners;
