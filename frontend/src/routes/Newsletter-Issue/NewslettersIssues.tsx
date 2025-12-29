'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useGetNewsletterIssuesQuery } from '../../redux/services/newsletterIssueApi';
import MotionLink from '../../components/common/MotionLink';

const NewsletterIssues = () => {
  const { data } = useGetNewsletterIssuesQuery();
  const [expandedYears, setExpandedYears] = useState<number[]>([2025]);

  // Group newsletters by year
  const groupedNewsletters = data?.newsletterIssues?.reduce?.(
    (acc: { year: any; newsletters: any[] }[], newsletter: { year: any }) => {
      const existing = acc.find((group) => group.year === newsletter.year);
      if (existing) {
        existing.newsletters.push(newsletter);
      } else {
        acc.push({
          year: newsletter.year,
          newsletters: [newsletter],
        });
      }
      return acc;
    },
    [] as Array<{ year: number; newsletters: typeof data.newsletterIssues }>
  );

  const toggleYear = (year: number) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-slate-50 to-white'>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='pt-12 pb-16 px-4 sm:px-6 lg:px-8'
      >
        <div className='max-w-6xl mx-auto'>
          <div className='mb-4'>
            <h1 className='text-4xl sm:text-5xl font-bold text-slate-900'>
              Little Paws Newsletters
            </h1>
          </div>
          <p className='text-lg text-slate-600'>Quarterly updates from our rescue family</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
        <div className='space-y-6'>
          {groupedNewsletters?.map(
            (yearGroup: { year: number; newsletters: any[] }, yearIdx: number) => (
              <motion.div
                key={yearIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: yearIdx * 0.1 }}
              >
                {/* Year Header - Matches Main Page Style */}
                <motion.button
                  onClick={() => toggleYear(yearGroup.year)}
                  className='w-full flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all group'
                >
                  <h2 className='text-2xl font-bold text-slate-900'>{yearGroup.year}</h2>
                  <motion.div
                    animate={{ rotate: expandedYears.includes(yearGroup.year) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className='w-6 h-6 text-slate-400 group-hover:text-teal-500' />
                  </motion.div>
                </motion.button>

                {/* Newsletters Grid */}
                <AnimatePresence>
                  {expandedYears.includes(yearGroup.year) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
                    >
                      {yearGroup.newsletters.map((newsletter, idx) => (
                        <MotionLink
                          key={idx}
                          to={`/newsletter-issues/${newsletter._id}`}
                          className='group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border border-slate-100 hover:border-teal-400'
                        >
                          {/* Newsletter Card */}
                          <div className='relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden'>
                            {/* Placeholder image background */}

                            <img
                              src={newsletter.imageUrl}
                              alt={newsletter.title}
                              className='w-full h-full object-cover'
                            />

                            {/* Overlay */}
                            <div className='absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                            {/* Quarter Badge */}
                            <div className='absolute top-3 right-3 z-10'>
                              <span className='inline-block px-3 py-1 bg-white/95 text-slate-700 font-bold text-sm rounded-full shadow-md'>
                                {newsletter.quarter}
                              </span>
                            </div>

                            {/* Content on Hover */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className='absolute inset-0 flex flex-col justify-end p-4 z-20'
                            >
                              <h3 className='text-white font-bold text-sm leading-tight'>
                                {newsletter.title}
                              </h3>
                            </motion.div>
                          </div>

                          {/* Card Info */}
                          <div className='p-3 bg-white border-t border-slate-100'>
                            <p className='text-xs text-slate-600 line-clamp-2 font-medium'>
                              {newsletter.description}
                            </p>
                          </div>
                        </MotionLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterIssues;
