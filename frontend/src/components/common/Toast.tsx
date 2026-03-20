// src/components/ui/Toast.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useAppDispatch, useToastSelector } from '../../redux/toolkitStore';
import { hideToast } from '../../redux/features/toastSlice';

const Toast: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isVisible, type, message, description, duration } = useToastSelector();

  useEffect(() => {
    if (isVisible) {
      // Auto-hide toast
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, type, dispatch, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className='w-5 h-5 text-primary-light dark:text-primary-dark' />;
      case 'error':
        return <AlertCircle className='w-5 h-5 text-red-400' />;
      case 'warning':
        return <AlertTriangle className='w-5 h-5 text-yellow-400' />;
      case 'info':
        return <Info className='w-5 h-5 text-primary-light dark:text-primary-dark' />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-surface-light dark:bg-surface-dark border-primary-light/20 dark:border-primary-dark/20';
      case 'error':
        return 'bg-surface-light dark:bg-surface-dark border-red-500/20';
      case 'warning':
        return 'bg-surface-light dark:bg-surface-dark border-yellow-500/20';
      case 'info':
        return 'bg-surface-light dark:bg-surface-dark border-primary-light/20 dark:border-primary-dark/20';
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      key='toast'
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-4 right-4 left-4 lg:left-auto z-[200] backdrop-blur-md border shadow-lg p-4 lg:max-w-sm ${getBackgroundColor()}`}
    >
      <div className='flex items-center gap-3'>
        {getIcon()}
        <div className='flex-1'>
          <h3 className='text-sm font-mono font-bold tracking-wide text-text-light dark:text-text-dark'>
            {message}
          </h3>
          {description && (
            <p className='text-[11px] font-mono text-muted-light dark:text-muted-dark mt-1'>
              {description}
            </p>
          )}
        </div>
        <button
          onClick={() => dispatch(hideToast())}
          className='text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus:outline-none'
        >
          <X className='w-4 h-4' />
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;
