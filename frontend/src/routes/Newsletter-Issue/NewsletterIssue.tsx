'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ZoomIn, ZoomOut, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetNewsletterIssueByIdQuery } from '../../redux/services/newsletterIssueApi';

const NewsletterIssue = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { data, isLoading, error } = useGetNewsletterIssueByIdQuery(id);
  const newsletter = data?.newsletterIssue;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 1));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <p className='text-gray-600'>Loading newsletter...</p>
      </div>
    );
  }

  if (error || !newsletter) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4'>
        <p className='text-gray-600'>Newsletter not found</p>
        <button onClick={() => navigate(-1)} className='px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors'>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='sticky top-0 z-40 bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6'>
          <div className='flex items-center justify-between'>
            <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors'>
              <ChevronLeft className='w-5 h-5' />
              <span className='hidden sm:inline text-sm font-medium'>Back</span>
            </button>

            <div className='text-center flex-1'>
              <div className='flex items-center justify-center gap-2 mb-1'>
                <span className='px-2.5 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold rounded'>{newsletter.quarter}</span>
                <span className='text-xs sm:text-sm text-gray-500'>{newsletter.year}</span>
              </div>
              <h1 className='text-lg sm:text-2xl font-bold text-gray-900 line-clamp-2'>{newsletter.title}</h1>
            </div>

            <div className='w-[40px]' />
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
        {/* Description */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='mb-8'>
          <p className='text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl'>{newsletter.description}</p>
          <p className='text-xs sm:text-sm text-gray-500 mt-3'>
            Published{' '}
            {new Date(newsletter.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </motion.div>

        {/* Image Viewer */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className='space-y-4'>
          {/* Controls */}
          <div className='flex items-center justify-between bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200'>
            <div className='text-xs sm:text-sm text-gray-600 font-medium'>Zoom: {Math.round(zoom * 100)}%</div>
            <div className='flex items-center gap-2'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className='p-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors'
                title='Zoom out'
              >
                <ZoomOut className='w-4 sm:w-5 h-4 sm:h-5 text-gray-700' />
              </motion.button>

              {zoom !== 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetZoom}
                  className='px-3 py-1 text-xs sm:text-sm bg-gray-900 hover:bg-gray-800 text-white rounded transition-colors'
                >
                  Reset
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className='p-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors'
                title='Zoom in'
              >
                <ZoomIn className='w-4 sm:w-5 h-4 sm:h-5 text-gray-700' />
              </motion.button>

              <div className='w-px h-6 bg-gray-300' />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFullscreen(true)}
                className='px-3 py-1 text-xs sm:text-sm bg-gray-900 hover:bg-gray-800 text-white rounded transition-colors'
              >
                Fullscreen
              </motion.button>
            </div>
          </div>

          {/* Image Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden'
          >
            <div className='relative w-full aspect-square sm:aspect-auto max-h-[600px] flex items-center justify-center overflow-auto'>
              <motion.div animate={{ scale: zoom }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className='origin-center'>
                <img src={newsletter.imageUrl} alt={newsletter.title} className='w-full h-auto' />
              </motion.div>
            </div>
          </motion.div>

          {/* Zoom Info */}
          <p className='text-xs text-gray-500 text-center'>Use zoom controls or scroll to magnify the newsletter</p>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsFullscreen(false)}
          className='fixed inset-0 bg-black z-[100] flex items-center justify-center p-4'
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className='relative w-full h-full flex items-center justify-center'
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className='absolute top-4 right-4 z-50 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors'
            >
              <X className='w-6 h-6' />
            </button>

            {/* Fullscreen Controls */}
            <div className='absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 flex items-center gap-2 bg-gray-800/90 backdrop-blur rounded-lg p-3'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className='p-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors'
              >
                <ZoomOut className='w-5 h-5 text-white' />
              </motion.button>

              <div className='text-sm text-white font-medium min-w-[60px]'>{Math.round(zoom * 100)}%</div>

              {zoom !== 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetZoom}
                  className='px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors'
                >
                  Reset
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className='p-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors'
              >
                <ZoomIn className='w-5 h-5 text-white' />
              </motion.button>
            </div>

            {/* Fullscreen Image */}
            <motion.div
              animate={{ scale: zoom }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className='max-w-[90vw] max-h-[90vh] origin-center'
            >
              <img src={newsletter.imageUrl} alt={newsletter.title} className='w-full h-auto' />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default NewsletterIssue;
