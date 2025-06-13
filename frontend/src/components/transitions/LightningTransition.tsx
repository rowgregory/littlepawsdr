import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Lightning Transition Component
const LightningTransition = ({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className='fixed inset-0 z-[9999] pointer-events-none'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onComplete}
        >
          {/* Lightning Flash Background */}
          <motion.div
            className='absolute inset-0 bg-white'
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0.3, 0.9, 0],
            }}
            transition={{
              duration: 0.6,
              times: [0, 0.1, 0.3, 0.5, 1],
              ease: 'easeInOut',
            }}
          />

          {/* Main Lightning Bolt */}
          <svg className='absolute inset-0 w-full h-full' viewBox='0 0 1920 1080' fill='none' preserveAspectRatio='none'>
            <motion.path
              d='M-100 200 L400 400 L200 450 L800 600 L600 650 L1200 800 L1000 850 L1600 950 L1400 1000 L2020 1200'
              stroke='url(#lightningGradient)'
              strokeWidth='12'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0],
                strokeWidth: [12, 20, 8, 4],
              }}
              transition={{
                duration: 0.8,
                times: [0, 0.3, 0.7, 1],
                ease: 'easeInOut',
              }}
            />

            {/* Secondary Lightning Branches */}
            <motion.path
              d='M300 380 L250 320 L180 280'
              stroke='url(#lightningGradient)'
              strokeWidth='6'
              fill='none'
              strokeLinecap='round'
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: 'easeInOut',
              }}
            />

            <motion.path
              d='M700 580 L750 520 L820 480'
              stroke='url(#lightningGradient)'
              strokeWidth='6'
              fill='none'
              strokeLinecap='round'
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: 'easeInOut',
              }}
            />

            <motion.path
              d='M1100 780 L1150 720 L1220 680'
              stroke='url(#lightningGradient)'
              strokeWidth='6'
              fill='none'
              strokeLinecap='round'
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: 'easeInOut',
              }}
            />

            {/* Lightning Gradient Definition */}
            <defs>
              <linearGradient id='lightningGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#60A5FA' stopOpacity='0.8' />
                <stop offset='30%' stopColor='#3B82F6' stopOpacity='1' />
                <stop offset='50%' stopColor='#FFFFFF' stopOpacity='1' />
                <stop offset='70%' stopColor='#FBBF24' stopOpacity='1' />
                <stop offset='100%' stopColor='#F59E0B' stopOpacity='0.8' />
              </linearGradient>
            </defs>
          </svg>

          {/* Electrical Sparks */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-2 h-2 bg-blue-400 rounded-full'
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + Math.sin(i) * 20}%`,
              }}
              initial={{
                scale: 0,
                opacity: 0,
                rotate: 0,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
              }}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.05,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Energy Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className='absolute border-4 border-blue-400 rounded-full'
              style={{
                left: '50%',
                top: '50%',
                width: '100px',
                height: '100px',
                marginLeft: '-50px',
                marginTop: '-50px',
              }}
              initial={{
                scale: 0,
                opacity: 0.8,
                rotate: 0,
              }}
              animate={{
                scale: [0, 3, 6],
                opacity: [0.8, 0.4, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: 1,
                delay: 0.2 + i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Thunder Sound Effect Visualization */}
          <motion.div
            className='absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent'
            initial={{
              scaleX: 0,
              opacity: 0,
            }}
            animate={{
              scaleX: [0, 1.5, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Alternative: Hook for easy reuse across components
const useLightningTransition = () => {
  const [isActive, setIsActive] = useState(false);

  const triggerLightning = (callback?: () => void) => {
    setIsActive(true);

    // Auto-complete after animation duration
    setTimeout(() => {
      setIsActive(false);
      callback?.();
    }, 1000);
  };

  const LightningComponent = () => <LightningTransition isActive={isActive} onComplete={() => setIsActive(false)} />;

  return {
    triggerLightning,
    LightningComponent,
    isActive,
  };
};

export { LightningTransition, useLightningTransition };
