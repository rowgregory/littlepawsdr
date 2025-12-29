import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToolTipWrapperProps {
  children: React.ReactNode;
  tooltip: string;
  className?: string;
}

const ToolTip = ({ children, tooltip, className = '' }: ToolTipWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const calculatePosition = () => {
    if (!wrapperRef.current || !tooltipRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Start with position above the wrapper
    let top = wrapperRect.top - tooltipRect.height - 8;
    let left = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;

    // If tooltip goes above viewport, position it below
    if (top < 8) {
      top = wrapperRect.bottom + 8;
    }

    // If tooltip goes off left edge
    if (left < 8) {
      left = 8;
    }

    // If tooltip goes off right edge
    if (left + tooltipRect.width > viewport.width - 8) {
      left = viewport.width - tooltipRect.width - 8;
    }

    setPosition({ top, left });
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();

      const handleScroll = () => calculatePosition();
      const handleResize = () => calculatePosition();

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isVisible]);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible]);

  return (
    <>
      <div
        ref={wrapperRef}
        onClick={handleClick}
        className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className='fixed z-50 max-w-xs sm:max-w-sm'
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            <div className='bg-white border border-gray-200 rounded-xl p-4 shadow-lg'>
              {/* Calculation explanation */}
              <div className='space-y-2'>
                <p className='text-gray-700 text-xs leading-relaxed whitespace-pre-line'>
                  {tooltip}
                </p>
              </div>

              {/* Arrow pointer */}
              <div
                className='absolute w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45 -translate-x-1/2'
                style={{
                  bottom:
                    wrapperRef.current &&
                    position.top > wrapperRef.current.getBoundingClientRect().bottom
                      ? 'auto'
                      : '-6px',
                  top:
                    wrapperRef.current &&
                    position.top > wrapperRef.current.getBoundingClientRect().bottom
                      ? '-6px'
                      : 'auto',
                  left: '50%',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ToolTip;
