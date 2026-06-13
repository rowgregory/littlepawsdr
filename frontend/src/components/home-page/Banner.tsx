import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import useVideo from '../../hooks/useVideo';
import { LandingVideo } from '../assets/videos';

const Banner = () => {
  const { videoRef } = useVideo();

  return (
    <div className='w-full relative overflow-hidden'>
      {/* ── Video ── */}
      <motion.video
        ref={videoRef}
        className='w-full h-svh min-h-[520px] max-h-[680px] sm:h-[720px] sm:max-h-none lg:h-[820px] block object-cover'
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        aria-hidden='true'
      >
        <source src={LandingVideo} type='video/mp4' />
      </motion.video>

      {/* ── Overlay — slightly heavier at the bottom on mobile so stacked CTAs hold contrast ── */}
      <div
        className='absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/70 sm:to-black/60'
        aria-hidden='true'
      />

      {/* ── Content ── */}
      <div className='absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-12'>
        <div className='max-w-screen-2xl mx-auto w-full'>
          {/* Eyebrow — tighter tracking below sm so it fits 320px on one line */}
          <motion.div
            className='flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5 min-w-0'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          >
            <div
              className='w-6 sm:w-8 h-px shrink-0 bg-primary-light dark:bg-primary-dark'
              aria-hidden='true'
            />
            <span className='font-changa text-f10 uppercase tracking-[0.18em] xs:tracking-[0.22em] sm:tracking-[0.35em] text-primary-light dark:text-primary-dark whitespace-nowrap'>
              Little Paws Dachshund Rescue
            </span>
          </motion.div>

          {/* Heading — fluid clamp below sm: scales smoothly from 320 → 640 instead of one fixed jump */}
          <motion.h1
            className='font-changa text-[clamp(2rem,11.5vw,3rem)] sm:text-5xl lg:text-7xl uppercase leading-[0.95] sm:leading-none text-white mb-4 sm:mb-5 max-w-2xl'
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          >
            Help Abandoned
            <br />
            <span className='text-primary-light dark:text-primary-dark'>Animals</span> Find
            <br />a Loving Home
          </motion.h1>

          {/* Subheading — now present on mobile (smaller, clamped) instead of hidden */}
          <motion.p
            className='font-lato text-[13px] leading-relaxed text-white/80 max-w-[34ch] sm:max-w-xl mb-7 sm:mb-8 sm:text-base'
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
          >
            Your compassion can turn their world around. By supporting us, you help abandoned
            animals find the love and care they deserve.
          </motion.p>

          {/* CTAs — full-width stacked on mobile (thumb-friendly), inline from sm up */}
          <motion.div
            className='flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 max-w-sm sm:max-w-none'
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
          >
            <Link
              to='/adopt'
              className='group relative overflow-hidden flex items-center justify-center sm:justify-start gap-2 px-7 py-3.5 font-changa text-sm uppercase tracking-widest text-white bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
            >
              <span
                className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.4s_ease_infinite] pointer-events-none'
                aria-hidden='true'
              />
              Get Started
              <ArrowRight
                className='w-4 h-4 group-hover:translate-x-0.5 transition-transform'
                aria-hidden='true'
              />
            </Link>

            <Link
              to='/donate'
              className='flex items-center justify-center sm:justify-start gap-2 px-7 py-3.5 font-changa text-sm uppercase tracking-widest text-white border border-white/30 hover:border-white/60 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
            >
              Donate
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className='absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-linear-to-t from-bg-light dark:from-bg-dark to-transparent'
        aria-hidden='true'
      />
    </div>
  );
};

export default Banner;
