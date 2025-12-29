'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  ChevronDown,
  Edit2,
  Trash2,
  X,
  Calendar,
  TrendingUp,
  Mail,
  Copy,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  useCreateNewsletterIssueMutation,
  useDeleteNewsletterIssueMutation,
  useGetNewsletterIssuesQuery,
  useUpdateNewsletterIssueMutation,
} from '../../redux/services/newsletterIssueApi';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';
import { useGetNewsletterEmailsQuery } from '../../redux/services/newsletterEmailApi';
import { showToast } from '../../redux/features/toastSlice';
import { useAppDispatch } from '../../redux/toolkitStore';

interface NewsletterIssue {
  _id: string;
  year: number;
  quarter: string;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;
  createdAt: string;
}

interface GroupedNewsletters {
  year: number;
  newsletters: NewsletterIssue[];
}

interface NewsletterIssueAcc {
  year: any;
  newsletters: any[];
}

const AdminNewsletterIssues = () => {
  const { data: newsletterEmailData } = useGetNewsletterEmailsQuery();
  const [expandedYears, setExpandedYears] = useState<number[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState<NewsletterIssue | null>(null);
  const [formData, setFormData] = useState<{
    year: number;
    quarter: string;
    title: string;
    description: string;
    imageUrl: string | File;
  }>({
    year: new Date().getFullYear(),
    quarter: 'Q1',
    title: '',
    description: '',
    imageUrl: '',
  });
  const dispatch = useAppDispatch();

  // RTK Query hooks
  const { data, isLoading, error } = useGetNewsletterIssuesQuery();
  const [createNewsletterIssue] = useCreateNewsletterIssueMutation();
  const [updateNewsletterIssue] = useUpdateNewsletterIssueMutation();
  const [deleteNewsletterIssue] = useDeleteNewsletterIssueMutation();

  const newsletterIssues = data?.newsletterIssues || [];

  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (formData.imageUrl instanceof File) {
      const url = URL.createObjectURL(formData.imageUrl);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof formData.imageUrl === 'string') {
      setImagePreview(formData.imageUrl);
    } else {
      setImagePreview('');
    }
  }, [formData.imageUrl]);

  // Calculate stats
  const totalIssues = newsletterIssues?.length;
  const thisYearIssues = newsletterIssues?.filter(
    (n: { year: number }) => n.year === new Date().getFullYear()
  ).length;
  const averageIssuesPerYear =
    totalIssues > 0
      ? (totalIssues / new Set(newsletterIssues?.map((n: { year: any }) => n.year)).size).toFixed(1)
      : '0';

  // Group newsletters by year
  const groupedNewsletters = newsletterIssues?.reduce(
    (acc: NewsletterIssueAcc[], newsletter: { year: any }) => {
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
    },
    [] as GroupedNewsletters[]
  );

  // Sort by year and quarter
  groupedNewsletters?.sort?.((a: { year: number }, b: { year: number }) => b.year - a.year);
  groupedNewsletters?.forEach?.((group: { newsletters: any[] }) => {
    group.newsletters?.sort?.((a, b) => {
      const quarterOrder = { Q4: 4, Q3: 3, Q2: 2, Q1: 1 };
      return (
        (quarterOrder[b.quarter as keyof typeof quarterOrder] || 0) -
        (quarterOrder[a.quarter as keyof typeof quarterOrder] || 0)
      );
    });
  });

  const toggleYear = (year: number) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const handleCreateOrUpdate = async () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      let imageUrl = formData.imageUrl;

      // Upload image if it's a File object (new upload)
      if (formData.imageUrl instanceof File) {
        const uploadedUrl = await uploadFileToFirebase(formData.imageUrl, false);
        if (!uploadedUrl || typeof uploadedUrl !== 'string') {
          alert('Failed to upload image');
          return;
        }
        imageUrl = uploadedUrl;
      } else if (typeof formData.imageUrl === 'string' && formData.imageUrl) {
        imageUrl = formData.imageUrl;
      } else {
        alert('Please provide an image');
        return;
      }

      const dataToSubmit = {
        year: formData.year,
        quarter: formData.quarter,
        title: formData.title,
        description: formData.description,
        imageUrl,
      };

      if (editingNewsletter) {
        await updateNewsletterIssue({
          id: editingNewsletter._id,
          ...dataToSubmit,
        }).unwrap();
      } else {
        await createNewsletterIssue(dataToSubmit).unwrap();
      }

      closeModal();
    } catch (error: any) {
      alert(error?.data?.message || 'Error saving newsletter');
    }
  };

  const handleDelete = async (id: string) => {
    await deleteNewsletterIssue(id).unwrap();
  };

  const openEditModal = (newsletter: NewsletterIssue) => {
    setEditingNewsletter(newsletter);
    setFormData({
      year: newsletter.year,
      quarter: newsletter.quarter,
      title: newsletter.title,
      description: newsletter.description,
      imageUrl: newsletter.imageUrl,
    });
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setEditingNewsletter(null);
    setFormData({
      year: new Date().getFullYear(),
      quarter: 'Q1',
      title: '',
      description: '',
      imageUrl: '',
    });
  };

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
              onClick={() => setIsCreateModalOpen(true)}
              className='flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm sm:text-base rounded-lg transition-colors w-full sm:w-auto'
            >
              <Plus className='w-4 sm:w-5 h-4 sm:h-5' />
              <span>Create Newsletter</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          {/* Total Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white rounded-lg border border-gray-200 p-6'
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2 bg-gray-100 rounded-lg'>
                <Calendar className='w-5 h-5 text-gray-700' />
              </div>
              <h3 className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
                Total Issues
              </h3>
            </div>
            <div className='space-y-3'>
              <p className='text-2xl font-bold text-gray-900'>{totalIssues}</p>
              <div className='flex items-center gap-1'>
                <TrendingUp className='w-3 h-3 text-teal-600' />
                <span className='text-xs font-medium text-teal-600'>+1 this quarter</span>
                <span className='text-xs text-gray-500'>vs last quarter</span>
              </div>
            </div>
          </motion.div>

          {/* This Year */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='bg-white rounded-lg border border-gray-200 p-6'
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2 bg-gray-100 rounded-lg'>
                <Calendar className='w-5 h-5 text-gray-700' />
              </div>
              <h3 className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
                {new Date().getFullYear()} Issues
              </h3>
            </div>
            <div className='space-y-3'>
              <p className='text-2xl font-bold text-gray-900'>{thisYearIssues}/4</p>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-gray-700 rounded-full h-2 transition-all duration-1000'
                  style={{ width: `${(thisYearIssues / 4) * 100}%` }}
                />
              </div>
              <div className='flex items-center gap-1'>
                <span className='text-xs text-gray-500'>
                  Progress: {Math.round((thisYearIssues / 4) * 100)}%
                </span>
              </div>
            </div>
          </motion.div>

          {/* Average per Year */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='bg-white rounded-lg border border-gray-200 p-6'
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2 bg-gray-100 rounded-lg'>
                <TrendingUp className='w-5 h-5 text-gray-700' />
              </div>
              <h3 className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
                Avg per Year
              </h3>
            </div>
            <div className='space-y-3'>
              <p className='text-2xl font-bold text-gray-900'>{averageIssuesPerYear}</p>
              <div className='flex items-center gap-1'>
                <span className='text-xs text-gray-500'>
                  Across {new Set(newsletterIssues?.map((n: { year: any }) => n.year)).size} years
                </span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter Emails */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='bg-white rounded-lg border border-gray-200 p-6'
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2 bg-gray-100 rounded-lg'>
                <Mail className='w-5 h-5 text-gray-700' />
              </div>
              <h3 className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
                Newsletter Subscribers
              </h3>
            </div>
            <div className='space-y-4'>
              <p className='text-2xl font-bold text-gray-900'>
                {newsletterEmailData?.newsletterEmails?.length || 0}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const emails = newsletterEmailData?.newsletterEmails
                    ?.map((obj: any) => obj.newsletterEmail)
                    .join(',');
                  navigator.clipboard.writeText(emails);
                  dispatch(showToast({ message: 'Emails copied to clipboard!', type: 'success' }));
                }}
                className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-all duration-200'
              >
                <Copy className='w-4 h-4' />
                Copy All Emails
              </motion.button>
              <div className='flex items-center gap-1'>
                <span className='text-xs text-gray-500'>Ready to export for campaigns</span>
              </div>
            </div>
          </motion.div>
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
        ) : groupedNewsletters.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-12 bg-white rounded-lg border border-gray-200'
          >
            <p className='text-gray-600 mb-4'>No newsletters yet</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className='text-gray-900 hover:text-gray-700 font-semibold'
            >
              Create your first newsletter
            </button>
          </motion.div>
        ) : (
          <div className='space-y-4'>
            {groupedNewsletters.map((yearGroup: any, yearIdx: number) => (
              <motion.div
                key={yearGroup.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: yearIdx * 0.1 }}
                className='bg-white rounded-lg border border-gray-200'
              >
                {/* Year Header */}
                <motion.button
                  onClick={() => toggleYear(yearGroup.year)}
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
                              onClick={() => openEditModal(newsletter)}
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

      {/* Create/Edit Drawer */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className='fixed inset-0 bg-black/50 z-50'
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className='fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl flex flex-col'
            >
              {/* Drawer Header */}
              <div className='flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0'>
                <h2 className='text-xl font-bold text-gray-900'>
                  {editingNewsletter ? 'Edit Newsletter' : 'Create Newsletter'}
                </h2>
                <button
                  onClick={closeModal}
                  className='p-2 hover:bg-gray-100 rounded transition-colors'
                >
                  <X className='w-5 h-5 text-gray-600' />
                </button>
              </div>

              {/* Drawer Content */}
              <div className='flex-1 overflow-y-auto p-6 space-y-4'>
                {/* Year & Quarter Row */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>Year</label>
                    <input
                      type='number'
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>Quarter</label>
                    <select
                      value={formData.quarter}
                      onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900'
                    >
                      <option value='Q1'>Q1</option>
                      <option value='Q2'>Q2</option>
                      <option value='Q3'>Q3</option>
                      <option value='Q4'>Q4</option>
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-2'>Title</label>
                  <input
                    type='text'
                    placeholder='Newsletter title'
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900'
                  />
                </div>

                {/* Description */}
                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-2'>
                    Description
                  </label>
                  <textarea
                    placeholder='Newsletter description'
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none'
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-2'>
                    Newsletter Image
                  </label>
                  <div className='space-y-3'>
                    {imagePreview && (
                      <div className='relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-300'>
                        <img
                          src={imagePreview}
                          alt='Preview'
                          className='w-full h-full object-cover'
                        />
                        <button
                          type='button'
                          onClick={() => setFormData({ ...formData, imageUrl: '' })}
                          className='absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors'
                        >
                          <X className='w-4 h-4' />
                        </button>
                      </div>
                    )}
                    <label className='flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors'>
                      <input
                        type='file'
                        accept='image/*'
                        className='hidden'
                        id='newsletter-image'
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormData({ ...formData, imageUrl: file as any });
                          }
                        }}
                      />
                      <div className='text-center'>
                        <p className='text-sm font-medium text-gray-900'>Click to upload</p>
                        <p className='text-xs text-gray-500'>PNG, JPG, HEIC</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className='flex flex-col gap-y-3 p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateOrUpdate}
                  className='flex-1 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors'
                >
                  {editingNewsletter ? 'Update Newsletter Issue' : 'Create Newsletter Issue'}
                </motion.button>
                <button
                  onClick={closeModal}
                  className='flex-1 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium transition-colors'
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminNewsletterIssues;
