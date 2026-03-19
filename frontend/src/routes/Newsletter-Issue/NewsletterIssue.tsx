import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, X, RotateCcw } from 'lucide-react';
import { useGetNewsletterIssueByIdQuery } from '../../redux/services/newsletterIssueApi';

const NewsletterIssue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetNewsletterIssueByIdQuery(id);

  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const newsletter = data?.newsletterIssue;
  const photos = newsletter?.photos ?? [];
  const currentPhoto = photos[currentPhotoIndex];

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 1));
  const resetZoom = () => setZoom(1);
  const next = () => {
    setCurrentPhotoIndex((i) => (i + 1) % photos.length);
    resetZoom();
  };
  const prev = () => {
    setCurrentPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
    resetZoom();
  };
  const select = (i: number) => {
    setCurrentPhotoIndex(i);
    resetZoom();
  };

  // ── Loading ──
  if (isLoading) {
    return (
      <div className='min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-6 h-6 border-2 border-border-light dark:border-border-dark border-t-primary-light dark:border-t-primary-dark rounded-full animate-spin mx-auto mb-3' />
          <p className='font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark'>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error || !newsletter) {
    return (
      <div className='min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center gap-4'>
        <p className='font-lato text-sm text-muted-light dark:text-muted-dark'>
          Newsletter not found.
        </p>
        <button
          type='button'
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 px-5 py-2.5 font-changa text-f10 uppercase tracking-[0.2em] text-white bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
        >
          <ChevronLeft className='w-3.5 h-3.5' aria-hidden='true' />
          Go Back
        </button>
      </div>
    );
  }

  // ── Shared control button ──
  const ControlBtn = ({
    onClick,
    disabled,
    label,
    children,
    dark = false,
  }: {
    onClick: () => void;
    disabled?: boolean;
    label: string;
    children: React.ReactNode;
    dark?: boolean;
  }) => (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 ${
        dark
          ? 'text-white hover:bg-white/10 focus-visible:ring-white'
          : 'border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark hover:border-primary-light dark:hover:border-primary-dark focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className='min-h-screen bg-bg-light dark:bg-bg-dark'>
      {/* ── Sticky header ── */}
      <header className='sticky top-0 z-40 bg-bg-light dark:bg-bg-dark border-b border-border-light dark:border-border-dark'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4'>
          <button
            type='button'
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
          >
            <ChevronLeft className='w-3.5 h-3.5' aria-hidden='true' />
            Back
          </button>

          <div className='flex-1 text-center min-w-0'>
            <div className='flex items-center justify-center gap-2 mb-0.5'>
              <span className='font-changa text-f10 uppercase tracking-widest px-2 py-0.5 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark'>
                {newsletter.quarter}
              </span>
              <span className='font-lato text-xs text-muted-light dark:text-muted-dark'>
                {newsletter.year}
              </span>
            </div>
            <h1 className='font-changa text-sm sm:text-base uppercase tracking-wide leading-none text-text-light dark:text-text-dark truncate'>
              {newsletter.title}
            </h1>
          </div>

          <div className='w-14 shrink-0' aria-hidden='true' />
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
        {/* ── Meta ── */}
        <div className='mb-8'>
          {newsletter.description && (
            <p className='font-lato text-sm text-muted-light dark:text-muted-dark leading-relaxed max-w-3xl mb-2'>
              {newsletter.description}
            </p>
          )}
          {newsletter.publishedAt && (
            <p className='font-lato text-xs text-muted-light dark:text-muted-dark/60'>
              Published{' '}
              {new Date(newsletter.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>

        {/* ── Image viewer ── */}
        {photos.length > 0 && (
          <div className='space-y-3 mb-12'>
            {/* Controls bar */}
            <div className='flex items-center justify-between px-4 py-2.5 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark'>
              <div className='flex items-center gap-3'>
                <span className='font-changa text-f10 uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark'>
                  {Math.round(zoom * 100)}%
                </span>
                {photos.length > 1 && (
                  <span className='font-lato text-[10px] text-muted-light dark:text-muted-dark'>
                    {currentPhotoIndex + 1} / {photos.length}
                  </span>
                )}
              </div>

              <div className='flex items-center gap-1'>
                {photos.length > 1 && (
                  <ControlBtn onClick={prev} label='Previous page'>
                    <ChevronLeft className='w-3.5 h-3.5' aria-hidden='true' />
                  </ControlBtn>
                )}

                <ControlBtn onClick={zoomOut} disabled={zoom <= 1} label='Zoom out'>
                  <ZoomOut className='w-3.5 h-3.5' aria-hidden='true' />
                </ControlBtn>

                {zoom !== 1 && (
                  <ControlBtn onClick={resetZoom} label='Reset zoom'>
                    <RotateCcw className='w-3.5 h-3.5' aria-hidden='true' />
                  </ControlBtn>
                )}

                <ControlBtn onClick={zoomIn} disabled={zoom >= 3} label='Zoom in'>
                  <ZoomIn className='w-3.5 h-3.5' aria-hidden='true' />
                </ControlBtn>

                <div
                  className='w-px h-5 bg-border-light dark:bg-border-dark mx-1'
                  aria-hidden='true'
                />

                {photos.length > 1 && (
                  <ControlBtn onClick={next} label='Next page'>
                    <ChevronRight className='w-3.5 h-3.5' aria-hidden='true' />
                  </ControlBtn>
                )}

                <ControlBtn onClick={() => setIsFullscreen(true)} label='View fullscreen'>
                  <Maximize2 className='w-3.5 h-3.5' aria-hidden='true' />
                </ControlBtn>
              </div>
            </div>

            {/* Main image */}
            <div
              className='relative bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark overflow-hidden'
              style={{ height: 560 }}
            >
              <div className='w-full h-full flex items-center justify-center overflow-auto'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentPhotoIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: zoom }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='origin-center'
                  >
                    <img
                      src={currentPhoto?.url}
                      alt={`${newsletter.title} — page ${currentPhotoIndex + 1}`}
                      className='max-w-full max-h-[560px] object-contain'
                      style={{ maxHeight: 560 }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <p className='font-lato text-[10px] text-muted-light dark:text-muted-dark/50 text-center'>
              Use zoom controls to magnify
            </p>
          </div>
        )}

        {/* ── Thumbnail strip ── */}
        {photos.length > 1 && (
          <div className='border-t border-border-light dark:border-border-dark pt-8'>
            <div className='flex items-center gap-2 mb-5'>
              <div className='w-3 h-px bg-primary-light dark:bg-primary-dark' aria-hidden='true' />
              <h2 className='font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark'>
                All Pages
              </h2>
            </div>
            <div className='flex flex-wrap gap-2' role='list' aria-label='Newsletter pages'>
              {photos.map((photo: any, i: number) => (
                <button
                  key={i}
                  type='button'
                  onClick={() => select(i)}
                  aria-label={`Go to page ${i + 1}`}
                  aria-pressed={currentPhotoIndex === i}
                  className={`shrink-0 overflow-hidden border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark ${
                    currentPhotoIndex === i
                      ? 'border-primary-light dark:border-primary-dark'
                      : 'border-border-light dark:border-border-dark hover:border-primary-light/50 dark:hover:border-primary-dark/50'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt=''
                    aria-hidden='true'
                    className='w-28 h-36 object-cover'
                  />
                  <div
                    className={`px-2 py-1 text-center font-changa text-[9px] uppercase tracking-widest ${
                      currentPhotoIndex === i
                        ? 'bg-primary-light dark:bg-primary-dark text-white'
                        : 'bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark'
                    }`}
                  >
                    {i + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── Fullscreen modal ── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black z-[100] flex items-center justify-center'
            role='dialog'
            aria-modal='true'
            aria-label='Fullscreen newsletter view'
          >
            {/* Close */}
            <button
              type='button'
              onClick={() => setIsFullscreen(false)}
              aria-label='Exit fullscreen'
              className='absolute top-4 right-4 z-50 w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
            >
              <X className='w-5 h-5' aria-hidden='true' />
            </button>

            {/* Image */}
            <div className='w-full h-full flex items-center justify-center overflow-auto p-8'>
              <AnimatePresence mode='wait'>
                <motion.img
                  key={currentPhotoIndex}
                  src={currentPhoto?.url}
                  alt={`${newsletter.title} — page ${currentPhotoIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: zoom }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='max-w-[90vw] max-h-[85vh] object-contain origin-center'
                />
              </AnimatePresence>
            </div>

            {/* Bottom controls */}
            <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/70 border border-white/10 px-4 py-2.5'>
              {photos.length > 1 && (
                <ControlBtn onClick={prev} label='Previous page' dark>
                  <ChevronLeft className='w-4 h-4' aria-hidden='true' />
                </ControlBtn>
              )}

              <ControlBtn onClick={zoomOut} disabled={zoom <= 1} label='Zoom out' dark>
                <ZoomOut className='w-4 h-4' aria-hidden='true' />
              </ControlBtn>

              <span className='font-changa text-f10 uppercase tracking-widest text-white/70 min-w-[40px] text-center'>
                {Math.round(zoom * 100)}%
              </span>

              {zoom !== 1 && (
                <ControlBtn onClick={resetZoom} label='Reset zoom' dark>
                  <RotateCcw className='w-4 h-4' aria-hidden='true' />
                </ControlBtn>
              )}

              <ControlBtn onClick={zoomIn} disabled={zoom >= 3} label='Zoom in' dark>
                <ZoomIn className='w-4 h-4' aria-hidden='true' />
              </ControlBtn>

              {photos.length > 1 && (
                <>
                  <div className='w-px h-5 bg-white/20 mx-1' aria-hidden='true' />
                  <span className='font-lato text-[10px] text-white/50'>
                    {currentPhotoIndex + 1} / {photos.length}
                  </span>
                  <ControlBtn onClick={next} label='Next page' dark>
                    <ChevronRight className='w-4 h-4' aria-hidden='true' />
                  </ControlBtn>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsletterIssue;
