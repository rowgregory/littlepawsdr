import { Link } from 'react-router-dom';
import { useWelcomeWienerSelector } from '../../redux/toolkitStore';
import WelcomeWienerCard from './WelcomeWienerCard';

const SafeAndEasyDonations = () => {
  const { welcomeWieners } = useWelcomeWienerSelector();
  const featured = (welcomeWieners ?? []).slice(0, 3);

  return (
    <div className='px-3 bg-bg-light dark:bg-bg-dark'>
      <div className='max-w-screen-xl w-full mx-auto py-24 sm:py-32'>
        <div className='flex items-center gap-3 mb-5'>
          <span
            className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
            aria-hidden='true'
          />
          <h2 className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
            Support with Safe &amp; Simple Donations
          </h2>
        </div>

        <div className='flex flex-col md:flex-row items-start md:items-end justify-between gap-5 mb-12'>
          <h3 className='font-quicksand text-3xl lg:text-4xl xl:text-5xl text-text-light dark:text-text-dark font-bold leading-tight'>
            Make a Difference for Just One Animal
          </h3>
          <Link
            to='/donate/welcome-wieners'
            className='font-mono text-xs uppercase tracking-[0.15em] py-3.5 px-7 bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
          >
            View All
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {featured.map((obj: any, i: number) => (
              <WelcomeWienerCard key={obj?._id || i} obj={obj} />
            ))}
          </div>
        ) : (
          <p
            className='font-mono text-xs uppercase tracking-wide text-muted-light dark:text-muted-dark text-center py-12'
            role='status'
          >
            No welcome wieners available right now
          </p>
        )}
      </div>
    </div>
  );
};

export default SafeAndEasyDonations;
