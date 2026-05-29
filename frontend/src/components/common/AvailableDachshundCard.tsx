import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const AvailableDachshundCard = ({ obj }: { obj: any }) => {
  const name = obj?.attributes?.name ?? 'This pup';
  const description = (obj?.attributes?.descriptionText ?? '').replace(/&nbsp;/g, ' ').trim();
  const snippet = description ? `${description.slice(0, 60)}…` : '';

  return (
    <Link
      to={`/dachshunds/${obj?._id || obj?.id}`}
      aria-label={`View ${name}`}
      className='group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
    >
      <div className='overflow-hidden bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark'>
        <img
          src={obj?.attributes?.photos?.[0]}
          alt={name}
          loading='lazy'
          className='w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100'
        />
      </div>

      <div className='flex items-center gap-2 mt-3'>
        <Calendar
          className='w-3.5 h-3.5 text-primary-light dark:text-primary-dark shrink-0'
          aria-hidden='true'
        />
        <p className='font-mono text-xs uppercase tracking-wide text-muted-light dark:text-muted-dark truncate'>
          {obj?.attributes?.ageString}
        </p>
      </div>

      <h2 className='font-quicksand font-bold text-lg text-text-light dark:text-text-dark truncate mt-2'>
        {name}
      </h2>

      <p className='text-sm text-muted-light dark:text-muted-dark mt-2 mb-3 line-clamp-2 leading-relaxed'>
        {snippet}
      </p>

      <p className='font-mono text-[11px] uppercase tracking-[0.15em] text-primary-light dark:text-primary-dark group-hover:text-secondary-light dark:group-hover:text-secondary-dark transition-colors'>
        Read More →
      </p>
    </Link>
  );
};
export default AvailableDachshundCard;
