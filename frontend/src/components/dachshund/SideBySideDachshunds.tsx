import { Calendar, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

const SideBySideDachshunds = ({ dachshunds }: { dachshunds: any }) => {
  const featured = (dachshunds ?? [])?.slice(0, 2);

  if (featured.length === 0) return null;

  return (
    <div className='flex flex-col md:flex-row gap-4 mb-24 sm:mb-32 max-w-screen-xl w-full mx-auto'>
      {featured.map((obj: any, i: number) => {
        const name = obj?.attributes?.name ?? 'This pup';
        const description = (obj?.attributes?.descriptionText ?? '').replace(/&nbsp;/g, ' ').trim();
        const snippet = description ? `${description.slice(0, 60)}…` : '';

        return (
          <Link
            to={`/dachshunds/${obj?._id || obj?.id}`}
            key={obj?._id || obj?.id || i}
            aria-label={`View ${name}`}
            className='group relative h-[280px] md:h-[460px] w-full md:flex-1 bg-cover bg-no-repeat overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
            style={{
              backgroundImage: `url(${obj?.attributes?.photos?.[1] || obj?.attributes?.photos?.[0]})`,
              backgroundPositionY: '50%',
            }}
          >
            {/* Scrim for text legibility */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent' />

            <div className='absolute inset-0 flex flex-col justify-end items-end text-right text-white p-5 sm:p-6'>
              <div className='flex items-center gap-4 mb-2 font-mono text-[11px] uppercase tracking-wide'>
                <span className='flex items-center gap-1.5'>
                  <Calendar
                    className='w-3.5 h-3.5 text-primary-light dark:text-primary-dark'
                    aria-hidden='true'
                  />
                  {obj?.attributes?.ageString}
                </span>
                <span className='flex items-center gap-1.5'>
                  <Scale
                    className='w-3.5 h-3.5 text-primary-light dark:text-primary-dark'
                    aria-hidden='true'
                  />
                  {obj?.attributes?.sex}
                </span>
              </div>

              <h3 className='font-quicksand text-xl font-bold truncate max-w-full'>{name}</h3>

              <p className='text-sm text-white/80 mt-2 mb-2 line-clamp-2'>{snippet}</p>

              <p className='font-mono text-[11px] uppercase tracking-[0.15em] text-white group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors'>
                Read More →
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBySideDachshunds;
