import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronDown, Edit2, Trash2, Calendar, TrendingUp, Mail, Copy } from 'lucide-react';
import {
  useDeleteNewsletterIssueMutation,
  useGetNewsletterIssuesQuery,
} from '../../redux/services/newsletterIssueApi';
import { useGetNewsletterEmailsQuery } from '../../redux/services/newsletterEmailApi';
import { showToast } from '../../redux/features/toastSlice';
import { useAppDispatch, useNewsletterIssueSelector } from '../../redux/toolkitStore';
import { setInputs } from '../../redux/features/form/formSlice';
import { NewsletterIssue } from '../../types/entities/newsletter-issue';
import {
  setOpenNewsletterIssueDrawer,
  toggleExpandedYear,
} from '../../redux/features/newsletterIssueSlice';
import { useMemo } from 'react';

const AdminNewsletterIssues = () => {
  const { data: newsletterIssueResponse, isLoading, error } = useGetNewsletterIssuesQuery();
  const { data: newsletterEmailResponse } = useGetNewsletterEmailsQuery();
  const dispatch = useAppDispatch();
  const [deleteNewsletterIssue] = useDeleteNewsletterIssueMutation();
  const { expandedYears } = useNewsletterIssueSelector();

  const newsletterIssues = useMemo(
    () => newsletterIssueResponse?.newsletterIssues || [],
    [newsletterIssueResponse?.newsletterIssues]
  );

  // Calculate stats from query data
  const stats = useMemo(() => {
    const totalIssues = newsletterIssues?.length || 0;
    const thisYearIssues =
      newsletterIssues?.filter((n: { year: number }) => n.year === new Date().getFullYear())
        .length || 0;
    const yearsSet = new Set(newsletterIssues?.map((n: { year: any }) => n.year));
    const averageIssuesPerYear = totalIssues > 0 ? (totalIssues / yearsSet.size).toFixed(1) : '0';

    return {
      totalIssues,
      thisYearIssues,
      averageIssuesPerYear,
      yearsCount: yearsSet.size,
    };
  }, [newsletterIssues]);

  // Group and sort newsletters
  const sortedAndGroupedNewsletters = useMemo(() => {
    const grouped =
      newsletterIssues?.reduce((acc: any[], newsletter: { year: any }) => {
        const existing = acc?.find((group) => group.year === newsletter.year);
        if (existing) {
          existing.newsletters.push(newsletter);
        } else {
          acc.push({
            year: newsletter.year,
            newsletters: [newsletter],
          });
        }
        return acc;
      }, []) || [];

    grouped.sort((a: { year: number }, b: { year: number }) => b.year - a.year);
    grouped.forEach((group: { newsletters: any[] }) => {
      group.newsletters?.sort((a, b) => {
        const quarterOrder = { Q4: 4, Q3: 3, Q2: 2, Q1: 1 };
        return (
          (quarterOrder[b.quarter as keyof typeof quarterOrder] || 0) -
          (quarterOrder[a.quarter as keyof typeof quarterOrder] || 0)
        );
      });
    });

    return grouped;
  }, [newsletterIssues]);

  const handleDelete = async (id: string) => {
    try {
      await deleteNewsletterIssue(id).unwrap();
      dispatch(
        showToast({
          message: `Successfully deleted newsletter issue`,
          type: 'success',
        })
      );
    } catch (err) {
      dispatch(
        showToast({
          message: `Failed to delete newsletter issue`,
          type: 'error',
        })
      );

      console.error('ERROR: ', err);
    }
  };

  const newsletterIssueMetrics = [
    {
      title: 'Total Issues',
      value: stats?.totalIssues,
      icon: Calendar,
      trend: '+1 this quarter',
      trendText: 'vs last quarter',
      delay: 0,
    },
    {
      title: `${new Date().getFullYear()} Issues`,
      value: `${stats?.thisYearIssues}/4`,
      icon: Calendar,
      progress: (stats?.thisYearIssues / 4) * 100,
      progressText: `${Math.round((stats?.thisYearIssues / 4) * 100)}%`,
      delay: 0.1,
    },
    {
      title: 'Avg per Year',
      value: stats?.averageIssuesPerYear,
      icon: TrendingUp,
      subtitle: `Across ${new Set(newsletterIssues?.map((n: { year: any }) => n.year)).size} years`,
      delay: 0.2,
    },
    {
      title: 'Newsletter Subscribers',
      value: newsletterEmailResponse?.newsletterEmails?.length || 0,
      icon: Mail,
      action: true,
      delay: 0.3,
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white border-b border-gray-200'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='min-w-0'>
              <h1 className='text-lg sm:text-2xl font-bold text-gray-900'>Newsletter Issues</h1>
              <p className='text-xs sm:text-sm text-gray-600 mt-0.5'>
                Manage and track quarterly newsletters
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => dispatch(setOpenNewsletterIssueDrawer())}
              className='flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm sm:text-base rounded-lg transition-colors w-full sm:w-auto'
            >
              <Plus className='w-4 sm:w-5 h-4 sm:h-5' />
              <span>Create Newsletter Issue</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* Metrics */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          {newsletterIssueMetrics.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: card.delay }}
                className='bg-white rounded-lg border border-gray-200 p-6'
              >
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-2 bg-gray-100 rounded-lg'>
                    <Icon className='w-5 h-5 text-gray-700' />
                  </div>
                  <h3 className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
                    {card.title}
                  </h3>
                </div>

                <div className='space-y-3'>
                  <p className='text-2xl font-bold text-gray-900'>{card.value}</p>

                  {/* Trend indicator */}
                  {card.trend && (
                    <div className='flex items-center gap-1'>
                      <TrendingUp className='w-3 h-3 text-teal-600' />
                      <span className='text-xs font-medium text-teal-600'>{card.trend}</span>
                      <span className='text-xs text-gray-500'>{card.trendText}</span>
                    </div>
                  )}

                  {/* Progress bar */}
                  {card.progress !== undefined && (
                    <>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-gray-700 rounded-full h-2 transition-all duration-1000'
                          style={{ width: `${card.progress}%` }}
                        />
                      </div>
                      <div className='flex items-center gap-1'>
                        <span className='text-xs text-gray-500'>Progress: {card.progressText}</span>
                      </div>
                    </>
                  )}

                  {/* Subtitle */}
                  {card.subtitle && (
                    <div className='flex items-center gap-1'>
                      <span className='text-xs text-gray-500'>{card.subtitle}</span>
                    </div>
                  )}

                  {/* Action button */}
                  {card.action && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const emails = newsletterEmailResponse?.newsletterEmails
                            ?.map((obj: any) => obj.newsletterEmail)
                            .join(',');
                          navigator.clipboard.writeText(emails);
                          dispatch(
                            showToast({ message: 'Emails copied to clipboard!', type: 'success' })
                          );
                        }}
                        className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-all duration-200'
                      >
                        <Copy className='w-4 h-4' />
                        Copy All Emails
                      </motion.button>
                      <div className='flex items-center gap-1'>
                        <span className='text-xs text-gray-500'>Ready to export for campaigns</span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Newsletter List */}
        {isLoading ? (
          <div className='text-center py-12'>
            <p className='text-gray-600'>Loading newsletter issues...</p>
          </div>
        ) : error ? (
          <div className='text-center py-12'>
            <p className='text-red-600'>Error loading newsletter issues</p>
          </div>
        ) : sortedAndGroupedNewsletters?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-12 bg-white rounded-lg border border-gray-200'
          >
            <p className='text-gray-600 mb-4'>No newsletters yet</p>
            <button
              onClick={() => dispatch(setOpenNewsletterIssueDrawer())}
              className='text-gray-900 hover:text-gray-700 font-semibold'
            >
              Create your first newsletter issue
            </button>
          </motion.div>
        ) : (
          <div className='space-y-4'>
            {sortedAndGroupedNewsletters?.map((yearGroup: any, yearIdx: number) => (
              <motion.div
                key={yearGroup.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: yearIdx * 0.1 }}
                className='bg-white rounded-lg border border-gray-200'
              >
                {/* Year Header */}
                <motion.button
                  onClick={() => dispatch(toggleExpandedYear(yearGroup.year))}
                  className='w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors border-b border-gray-200'
                >
                  <h2 className='text-lg font-bold text-gray-900'>{yearGroup.year}</h2>
                  <motion.div
                    animate={{ rotate: expandedYears.includes(yearGroup.year) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className='w-5 h-5 text-gray-600' />
                  </motion.div>
                </motion.button>

                {/* Newsletter Issues */}
                <AnimatePresence>
                  {expandedYears.includes(yearGroup.year) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className='divide-y divide-gray-200'
                    >
                      {yearGroup.newsletters.map((newsletter: NewsletterIssue, idx: number) => (
                        <motion.div
                          key={newsletter._id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className='flex items-center justify-between p-6 hover:bg-gray-50 transition-colors'
                        >
                          {/* Content */}
                          <div className='flex-1'>
                            <div className='flex items-center gap-3 mb-2'>
                              <span className='inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded'>
                                {newsletter.quarter}
                              </span>
                              <h3 className='text-base font-bold text-gray-900'>
                                {newsletter.title}
                              </h3>
                            </div>
                            <p className='text-gray-600 text-sm line-clamp-1 mb-2'>
                              {newsletter.description}
                            </p>
                            <p className='text-gray-400 text-xs'>
                              Published: {new Date(newsletter.publishedAt).toLocaleDateString()}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className='flex items-center gap-2 ml-4'>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                dispatch(setOpenNewsletterIssueDrawer());
                                dispatch(
                                  setInputs({
                                    formName: 'newsletterIssueForm',
                                    data: { ...newsletter, isUpdating: true },
                                  })
                                );
                              }}
                              className='p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors'
                              title='Edit'
                            >
                              <Edit2 className='w-4 h-4' />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(newsletter._id)}
                              className='p-2 text-red-600 hover:bg-red-50 rounded transition-colors'
                              title='Delete'
                            >
                              <Trash2 className='w-4 h-4' />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNewsletterIssues;
