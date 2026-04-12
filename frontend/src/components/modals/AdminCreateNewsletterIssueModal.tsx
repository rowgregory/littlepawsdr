import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toolkitStore, useUiSelector } from '../../redux/toolkitStore';
import { setCloseCreateAdminNewsletterIssueModal } from '../../redux/features/uiSlice';
import { useCreateNewsletterIssueMutation } from '../../redux/services/newsletterIssueApi';

export default function AdminCreateNewsletterIssueModal({ refetch }) {
  const [createNewsletterIssue] = useCreateNewsletterIssueMutation();
  const { adminCreateNewsletterIssueModal } = useUiSelector();

  const [pdfUrl, setPdfUrl] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    toolkitStore.dispatch(setCloseCreateAdminNewsletterIssueModal());
    setPdfUrl('');
    setMonth('');
    setYear('');
    setError(null);
  };

  const handleSubmit = async () => {
    if (!pdfUrl.trim() || !month || !year) {
      setError('PDF URL, month, and year are required.');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await createNewsletterIssue({
      pdfUrl: pdfUrl.trim(),
      month: parseInt(month),
      year: parseInt(year),
    });

    setLoading(false);

    if (result.error) {
      setError(result.error?.data?.message ?? 'Something went wrong.');
      return;
    }

    refetch();
    handleClose();
  };

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentYear = new Date().getFullYear();
  const YEARS = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <AnimatePresence>
      {adminCreateNewsletterIssueModal && (
        <>
          {/* Backdrop */}
          <motion.div
            key='backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm'
            onClick={handleClose}
            aria-hidden='true'
          />

          {/* Modal */}
          <motion.div
            key='modal'
            role='dialog'
            aria-modal='true'
            aria-labelledby='create-issue-title'
            initial={{ opacity: 0, x: '-50%', y: 'calc(-50% + 16px)' }}
            animate={{ opacity: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, x: '-50%', y: 'calc(-50% + 16px)' }}
            transition={{ duration: 0.25 }}
            className='fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] xs:w-[calc(100vw-3rem)] sm:w-full sm:max-w-lg bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark shadow-2xl'
          >
            {/* Header */}
            <div className='flex items-center justify-between px-5 py-4 border-b border-border-light dark:border-border-dark'>
              <div className='flex items-center gap-3'>
                <span
                  className='block w-5 h-px bg-primary-light dark:bg-primary-dark shrink-0'
                  aria-hidden='true'
                />
                <h2
                  id='create-issue-title'
                  className='text-[10px] font-mono tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark'
                >
                  New Newsletter Issue
                </h2>
              </div>
              <button
                onClick={handleClose}
                aria-label='Close modal'
                className='text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                <X size={15} aria-hidden='true' />
              </button>
            </div>

            {/* Body */}
            <div className='px-5 py-6 space-y-4'>
              {/* Month + Year */}
              <div className='grid grid-cols-2 gap-3'>
                <div className='space-y-1.5'>
                  <label
                    htmlFor='issue-month'
                    className='text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark'
                  >
                    Month <span aria-hidden='true'>*</span>
                  </label>
                  <select
                    id='issue-month'
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className='w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-xs font-mono text-text-light dark:text-text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark transition-colors'
                  >
                    <option value=''>Select...</option>
                    {MONTHS.map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='space-y-1.5'>
                  <label
                    htmlFor='issue-year'
                    className='text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark'
                  >
                    Year <span aria-hidden='true'>*</span>
                  </label>
                  <select
                    id='issue-year'
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className='w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-xs font-mono text-text-light dark:text-text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark transition-colors'
                  >
                    <option value=''>Select...</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PDF URL */}
              <div className='space-y-1.5'>
                <label
                  htmlFor='issue-pdf-url'
                  className='text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark'
                >
                  PDF URL <span aria-hidden='true'>*</span>
                </label>
                <input
                  id='issue-pdf-url'
                  type='url'
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  placeholder='https://...'
                  className='w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-xs font-mono text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark transition-colors'
                />
              </div>

              {/* Error */}
              {error && (
                <p
                  role='alert'
                  className='text-[10px] font-mono tracking-widest text-red-500 dark:text-red-400'
                >
                  {error}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className='flex items-center justify-end gap-3 px-5 py-4 border-t border-border-light dark:border-border-dark'>
              <button
                onClick={handleClose}
                className='px-4 py-2 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark border border-border-light dark:border-border-dark hover:text-text-light dark:hover:text-text-dark hover:border-text-light dark:hover:border-text-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                aria-disabled={loading}
                className='inline-flex items-center gap-2 px-4 py-2 bg-primary-light dark:bg-primary-dark text-[10px] font-mono tracking-[0.2em] uppercase text-white dark:text-bg-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading && <Loader2 size={11} className='animate-spin' aria-hidden='true' />}
                {loading ? 'Creating...' : 'Create Issue'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
