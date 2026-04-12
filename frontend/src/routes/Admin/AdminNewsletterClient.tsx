import { FileText, ExternalLink, Plus, Trash2, Loader2, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useDeleteNewsletterIssueMutation,
  useGetNewsletterIssuesQuery,
} from '../../redux/services/newsletterIssueApi';
import { useState } from 'react';
import AdminCreateNewsletterIssueModal from '../../components/modals/AdminCreateNewsletterIssueModal';
import { setOpenCreateAdminNewsletterIssueModal } from '../../redux/features/uiSlice';
import { toolkitStore } from '../../redux/toolkitStore';
import { useGetNewsletterEmailsQuery } from '../../redux/services/newsletterEmailApi';

export function AdminNewsletterIssuesClient() {
  const { data, refetch } = useGetNewsletterIssuesQuery();
  const { data: subscriberData } = useGetNewsletterEmailsQuery();
  const issues = data?.newsletterIssues;
  const subscribers = subscriberData?.newsletterEmails;

  const [deleteNewsletterIssue] = useDeleteNewsletterIssueMutation();
  const [deletingId, setDeletingId] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleDelete = async (id) => {
    setDeletingId(id);
    await deleteNewsletterIssue(id);
    setDeletingId(null);
  };

  const handleCopyEmails = async () => {
    const emails = subscribers?.map((n) => n.newsletterEmail).join(', ');
    await navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Create Modal */}
      <AdminCreateNewsletterIssueModal refetch={refetch} />
      <div className='max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 py-8 w-full'>
        {/* Header row */}
        <div className='flex items-center justify-between mb-6'>
          <p className='text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark'>
            {issues?.length} issue{issues?.length !== 1 ? 's' : ''}
          </p>
          <div className='flex items-center gap-3'>
            <button
              onClick={handleCopyEmails}
              disabled={!subscribers?.length}
              aria-label={copied ? 'Emails copied to clipboard' : 'Copy all subscriber emails'}
              className='inline-flex items-center gap-2 px-3 py-2 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark disabled:opacity-30 disabled:cursor-not-allowed'
            >
              {copied ? (
                <Check size={11} aria-hidden='true' />
              ) : (
                <Copy size={11} aria-hidden='true' />
              )}
              {copied ? 'Copied' : `Copy ${subscribers?.length ?? 0} Emails`}
            </button>
            <button
              onClick={() => toolkitStore.dispatch(setOpenCreateAdminNewsletterIssueModal())}
              aria-label='Create new newsletter issue'
              className='inline-flex items-center gap-2 px-3 py-2 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
            >
              <Plus size={11} aria-hidden='true' />
              New Issue
            </button>
          </div>
        </div>

        {/* Table */}
        <div
          className='border border-border-light dark:border-border-dark overflow-hidden'
          role='region'
          aria-label='Newsletter issues'
        >
          {/* Column headers */}
          <div
            className='hidden sm:grid sm:grid-cols-[1fr_120px] px-5 py-3 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark'
            aria-hidden='true'
          >
            <span className='text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark'>
              Issue
            </span>
            <span className='text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark'>
              PDF
            </span>
          </div>

          <ul aria-label='Newsletter issue list'>
            <AnimatePresence mode='popLayout'>
              {issues?.length === 0 ? (
                <motion.li
                  key='empty'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='px-5 py-12 text-center'
                >
                  <p className='text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark'>
                    No issues published yet
                  </p>
                </motion.li>
              ) : (
                issues?.map((issue, i) => {
                  const label = `${new Date(issue?.year, issue?.month - 1).toLocaleString('default', { month: 'long' })} ${issue?.year} Newsletter`;
                  return (
                    <motion.li
                      key={issue?._id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className={`grid grid-cols-1 sm:grid-cols-[1fr_120px_40px] items-center px-5 py-4 border-b border-border-light dark:border-border-dark last:border-b-0 gap-1 sm:gap-0 ${
                        i % 2 === 0 ? 'bg-transparent' : 'bg-surface-light dark:bg-surface-dark'
                      }`}
                    >
                      <p className='text-xs font-mono text-text-light dark:text-text-dark font-medium truncate'>
                        {label}
                      </p>

                      <a
                        href={issue?.pdfUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={`Open ${label} PDF in new tab`}
                        className='inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                      >
                        <FileText size={11} aria-hidden='true' />
                        Open PDF
                        <ExternalLink size={10} aria-hidden='true' />
                      </a>
                      <button
                        onClick={() => handleDelete(issue?._id)}
                        disabled={deletingId === issue?._id}
                        aria-label={`Delete ${label}`}
                        className='justify-self-end text-muted-light dark:text-muted-dark hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark disabled:opacity-50'
                      >
                        {deletingId === issue?._id ? (
                          <Loader2 size={13} className='animate-spin' aria-hidden='true' />
                        ) : (
                          <Trash2 size={13} aria-hidden='true' />
                        )}
                      </button>
                    </motion.li>
                  );
                })
              )}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </>
  );
}
