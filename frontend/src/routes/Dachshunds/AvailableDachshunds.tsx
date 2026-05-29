import { useEffect, useRef } from 'react';
import { useGetDachshundsByStatusMutation } from '../../redux/services/rescueGroupsApi';
import AvailableDachshundCard from '../../components/common/AvailableDachshundCard';
import HowToAdoptDachshunds from '../../components/dachshund/HowToAdoptDachshunds';
import SideBySideDachshunds from '../../components/dachshund/SideBySideDachshunds';
import AboutLittlePaws from '../../components/dachshund/AboutLittlePaws';

const DachshundCardSkeleton = () => (
  <div className='animate-pulse'>
    {/* image */}
    <div className='w-full aspect-square bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark' />
    {/* age line */}
    <div className='flex items-center gap-2 mt-3'>
      <div className='w-3.5 h-3.5 bg-surface-light dark:bg-surface-dark shrink-0' />
      <div className='h-3 w-20 bg-surface-light dark:bg-surface-dark' />
    </div>
    {/* name */}
    <div className='h-5 w-3/4 bg-surface-light dark:bg-surface-dark mt-2' />
    {/* description (two lines) */}
    <div className='h-3 w-full bg-surface-light dark:bg-surface-dark mt-3' />
    <div className='h-3 w-5/6 bg-surface-light dark:bg-surface-dark mt-2' />
    {/* read more */}
    <div className='h-3 w-24 bg-surface-light dark:bg-surface-dark mt-3' />
  </div>
);

const AvailableDachshundsSkeleton = () => (
  <div className='py-20 sm:py-28 bg-bg-light dark:bg-bg-dark'>
    {/* Header — real text, not skeleton (it's static, no need to placeholder it) */}
    <section className='max-w-screen-xl w-full mx-auto flex flex-col items-center px-3'>
      <div className='flex items-center gap-3 mb-4'>
        <span className='block w-8 h-px bg-primary-light dark:bg-primary-dark' aria-hidden='true' />
        <h2 className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
          Meet The Dachshunds
        </h2>
      </div>
      <h1 className='text-3xl sm:text-5xl font-bold text-text-light dark:text-text-dark mb-4 text-center'>
        Available For Adoption
      </h1>
      <p className='max-w-screen-sm w-full text-center text-muted-light dark:text-muted-dark leading-relaxed'>
        Waiting for a loving family to give them the care and attention they deserve, one paw at a
        time, through Little Paws Dachshund Rescue.
      </p>
    </section>

    {/* Card grid skeleton */}
    <div className='px-3 sm:px-4'>
      <section
        className='pt-10 sm:pt-12 mb-20 sm:mb-24 max-w-screen-xl w-full mx-auto'
        aria-busy='true'
        aria-label='Loading available dachshunds'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
          {Array.from({ length: 8 }).map((_, i) => (
            <DachshundCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  </div>
);

const AvailableDachshunds = () => {
  const hasFetched = useRef(false);
  const [getDachshunds, { data, isLoading }] = useGetDachshundsByStatusMutation();

  useEffect(() => {
    if (!hasFetched.current) {
      getDachshunds({ status: 'Available' });
      hasFetched.current = true;
    }
  }, [getDachshunds]);

  const dachshunds = data?.data ?? data ?? [];

  if (isLoading) return <AvailableDachshundsSkeleton />;

  return (
    <div className='py-20 sm:py-28 bg-bg-light dark:bg-bg-dark'>
      <section className='max-w-screen-xl w-full mx-auto flex flex-col items-center px-3'>
        <div className='flex items-center gap-3 mb-4'>
          <span
            className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
            aria-hidden='true'
          />
          <h2 className='font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
            Meet The Dachshunds
          </h2>
        </div>

        <h1 className='font-quicksand text-3xl sm:text-5xl font-bold text-text-light dark:text-text-dark mb-4 text-center'>
          Available For Adoption
        </h1>

        <p className='max-w-screen-sm w-full text-center text-muted-light dark:text-muted-dark leading-relaxed'>
          Waiting for a loving family to give them the care and attention they deserve, one paw at a
          time, through Little Paws Dachshund Rescue.
        </p>
      </section>

      <div className='px-3 sm:px-4'>
        <section className='pt-10 sm:pt-12 mb-20 sm:mb-24 max-w-screen-xl w-full mx-auto'>
          {dachshunds.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
              {dachshunds.map((obj: any, i: number) => (
                <AvailableDachshundCard key={obj?._id || obj?.id || i} obj={obj} />
              ))}
            </div>
          ) : (
            <p
              className='font-mono text-xs uppercase tracking-wide text-center text-muted-light dark:text-muted-dark py-16'
              role='status'
            >
              No dachshunds available right now
            </p>
          )}
        </section>
      </div>

      <section className='px-3 sm:px-4'>
        <SideBySideDachshunds dachshunds={dachshunds} />
      </section>

      <section className='px-3 sm:px-4'>
        <AboutLittlePaws />
      </section>

      <section className='bg-surface-light dark:bg-surface-dark'>
        <HowToAdoptDachshunds />
      </section>
    </div>
  );
};

export default AvailableDachshunds;
