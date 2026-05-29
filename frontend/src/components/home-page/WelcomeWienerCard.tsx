import { Link } from 'react-router-dom';

const WelcomeWienerCard = ({ obj }: { obj: any }) => {
  const bio = (obj?.bio ?? '').trim();
  const snippet = bio ? `${bio.slice(0, 120)}…` : '';

  return (
    <div className='flex flex-col bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark'>
      <div className='relative'>
        <img
          src={obj.images[0]}
          alt={obj.name || ''}
          className='w-full object-cover h-60 border-b border-border-light dark:border-border-dark'
        />
        {/* Overlapping CTA, centered on the image's bottom edge */}
        <Link
          to={`/donate/welcome-wieners/${obj._id}`}
          className='absolute left-1/2 -bottom-5 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.15em] py-3 px-7 bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors whitespace-nowrap shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
        >
          Donate Now
        </Link>
      </div>

      <div className='flex flex-col p-6 pt-10'>
        <h3 className='font-quicksand text-xl font-bold text-text-light dark:text-text-dark mb-3 truncate'>
          {obj.name}
        </h3>
        <p className='text-sm text-muted-light dark:text-muted-dark leading-relaxed line-clamp-3'>
          {snippet}
        </p>

        <div className='w-full h-px bg-border-light dark:bg-border-dark my-6' />

        <p className='font-mono text-[11px] uppercase tracking-wide text-muted-light dark:text-muted-dark'>
          Together for <span className='text-primary-light dark:text-primary-dark'>Change</span>
        </p>
      </div>
    </div>
  );
};
export default WelcomeWienerCard;
