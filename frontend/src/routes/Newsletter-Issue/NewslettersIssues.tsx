import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useGetNewsletterIssuesQuery } from '../../redux/services/newsletterIssueApi';

const NewsletterIssues = () => {
  const { data } = useGetNewsletterIssuesQuery();
  const [expandedYears, setExpandedYears] = useState<number[]>([new Date().getFullYear()]);

  const groupedNewsletters = data?.newsletterIssues?.reduce?.(
    (acc: { year: number; newsletters: any[] }[], newsletter: { year: number }) => {
      const existing = acc.find((g) => g.year === newsletter.year);
      if (existing) {
        existing.newsletters.push(newsletter);
      } else {
        acc.push({ year: newsletter.year, newsletters: [newsletter] });
      }
      return acc;
    },
    [] as { year: number; newsletters: any[] }[],
  );

  const toggleYear = (year: number) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
  };

  return (
    <div className='min-h-screen bg-bg-light dark:bg-bg-dark'>
      {/* ── Hero ── */}
      <section
        className='px-4 sm:px-6 md:px-12 pt-12 sm:pt-16 pb-10 border-b border-border-light dark:border-border-dark'
        aria-label='Newsletter issues hero'
      >
        <div className='max-w-screen-xl mx-auto'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-5 h-px bg-primary-light dark:bg-primary-dark' aria-hidden='true' />
            <span className='font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark'>
              Little Paws
            </span>
          </div>
          <h1 className='font-changa text-4xl sm:text-5xl uppercase leading-none text-text-light dark:text-text-dark mb-3'>
            Newsletters
          </h1>
          <p className='font-lato text-base sm:text-lg text-muted-light dark:text-muted-dark leading-relaxed max-w-lg'>
            Quarterly updates from our rescue family.
          </p>
        </div>
      </section>

      {/* ── Issues by year ── */}
      <main className='px-4 sm:px-6 md:px-12 py-10 sm:py-14'>
        <div className='max-w-screen-xl mx-auto space-y-4'>
          {groupedNewsletters?.map(
            (yearGroup: { year: number; newsletters: any[] }, yearIdx: number) => (
              <div key={yearGroup.year}>
                {/* Year accordion button */}
                <button
                  type='button'
                  onClick={() => toggleYear(yearGroup.year)}
                  aria-expanded={expandedYears.includes(yearGroup.year)}
                  aria-controls={`year-${yearGroup.year}`}
                  className='w-full flex items-center justify-between px-5 py-4 border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark group'
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className='w-3 h-px bg-primary-light dark:bg-primary-dark'
                      aria-hidden='true'
                    />
                    <h2 className='font-changa text-xl uppercase tracking-wide text-text-light dark:text-text-dark'>
                      {yearGroup.year}
                    </h2>
                    <span className='font-changa text-f10 uppercase tracking-widest text-muted-light dark:text-muted-dark'>
                      {yearGroup.newsletters.length} issue
                      {yearGroup.newsletters.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedYears.includes(yearGroup.year) ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown
                      className='w-4 h-4 text-muted-light dark:text-muted-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors'
                      aria-hidden='true'
                    />
                  </motion.div>
                </button>

                {/* Issues grid */}
                <AnimatePresence>
                  {expandedYears.includes(yearGroup.year) && (
                    <motion.div
                      id={`year-${yearGroup.year}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className='overflow-hidden'
                    >
                      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border-light dark:bg-border-dark border border-border-light dark:border-border-dark mt-px'>
                        {yearGroup.newsletters.map((newsletter: any, idx: number) => (
                          <li key={idx}>
                            <Link
                              to={`/newsletter-issues/${newsletter._id}`}
                              className='group flex flex-col bg-bg-light dark:bg-bg-dark hover:border-primary-light dark:hover:border-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark h-full'
                              aria-label={`${newsletter.title} — ${newsletter.quarter} ${yearGroup.year}`}
                            >
                              {/* Image */}
                              <div className='relative aspect-[4/3] overflow-hidden bg-surface-light dark:bg-surface-dark'>
                                {newsletter.photos?.[0]?.url && (
                                  <img
                                    src={newsletter.photos[0].url}
                                    alt={newsletter.title}
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                  />
                                )}

                                {/* Quarter badge */}
                                <div className='absolute top-3 left-3'>
                                  <span className='font-changa text-[9px] uppercase tracking-widest px-2 py-1 bg-bg-light dark:bg-bg-dark text-primary-light dark:text-primary-dark'>
                                    {newsletter.quarter}
                                  </span>
                                </div>

                                {/* Hover overlay */}
                                <div
                                  className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300'
                                  aria-hidden='true'
                                />
                              </div>

                              {/* Card info */}
                              <div className='flex-1 p-4 border-t border-border-light dark:border-border-dark'>
                                <p className='font-changa text-xs uppercase tracking-wide text-text-light dark:text-text-dark leading-snug line-clamp-1 mb-1'>
                                  {newsletter.title}
                                </p>
                                {newsletter.description && (
                                  <p className='font-lato text-[10px] text-muted-light dark:text-muted-dark leading-relaxed line-clamp-2'>
                                    {newsletter.description}
                                  </p>
                                )}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ),
          )}
        </div>
      </main>
    </div>
  );
};

export default NewsletterIssues;
