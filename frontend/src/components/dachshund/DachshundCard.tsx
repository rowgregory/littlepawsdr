import { Link } from 'react-router-dom';
import { NoImgDog } from '../assets';
import { Calendar } from 'lucide-react';

const DachshundCard = ({ dachshund }: any) => {
  const name = dachshund?.attributes?.name?.split('(')[0]?.trim() || 'Dachshund';

  return (
    <Link
      to={`/dachshunds/${dachshund.id}`}
      aria-label={`View ${name}`}
      className='group flex flex-col border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
    >
      <div className='overflow-hidden'>
        <img
          className='w-full aspect-square object-cover transition-transform duration-300 scale-110 group-hover:scale-105 motion-reduce:group-hover:scale-100'
          src={dachshund?.attributes?.photos?.[0] ?? NoImgDog}
          alt={name}
          loading='lazy'
        />
      </div>

      <div className='flex items-center gap-2 p-4 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark'>
        <Calendar
          className='w-3.5 h-3.5 text-primary-light dark:text-primary-dark shrink-0'
          aria-hidden='true'
        />
        <p className='font-mono text-xs uppercase tracking-[0.15em] text-text-light dark:text-text-dark truncate'>
          {name}
        </p>
      </div>
    </Link>
  );
};

export default DachshundCard;
