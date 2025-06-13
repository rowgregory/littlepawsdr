import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, Sparkles } from 'lucide-react';
import { Fragment, useCallback, useRef } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { setCloseFilterDrawer, setFilterCategory } from '../../redux/features/merchAndEcardSlice';
import BlackPageOverlay from '../common/BlackPageOverlay';
import useOutsideDetect from '../../hooks/useOutsideDetect';

export const merchAndEcardsCategoriesData = ['Art Notecards', 'Calendars', 'Ecards', 'Magnets', 'Tumblers', 'Other'];

const FilterDrawer = () => {
  const dispatch = useAppDispatch();
  const overlayRef = useRef(null);
  const { toggleFilterDrawer, category } = useAppSelector((state: RootState) => state.merchAndEcards);

  const handleClose = useCallback(() => {
    if (toggleFilterDrawer) {
      dispatch(setCloseFilterDrawer());
    }
  }, [dispatch, toggleFilterDrawer]);

  useOutsideDetect(overlayRef, handleClose);

  const handleFilter = (category: string) => {
    if (category === 'Clear Filter') {
      dispatch(setFilterCategory(''));
    } else {
      dispatch(setFilterCategory(category));
    }
    handleClose();
  };

  // Animation variants
  const drawerVariants = {
    hidden: {
      x: '-100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200,
        mass: 0.8,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
      },
    },
    exit: { y: -20, opacity: 0 },
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
      },
    },
    exit: { x: -30, opacity: 0 },
  };

  const closeButtonVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 400,
        delay: 0.3,
      },
    },
    exit: { scale: 0, rotate: 180 },
  };

  return (
    <Fragment>
      <BlackPageOverlay open={toggleFilterDrawer} />

      <AnimatePresence mode='wait'>
        {toggleFilterDrawer && (
          <motion.div
            ref={overlayRef}
            variants={drawerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='fixed z-[102] top-0 left-0 bottom-0 w-screen sm:top-2 sm:bottom-2 sm:left-2 sm:w-[420px] sm:h-[calc(100vh-16px)] bg-white sm:rounded-3xl shadow-2xl overflow-hidden'
          >
            {/* Gradient Background */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-60' />

            {/* Close Button */}
            <motion.button
              variants={closeButtonVariants}
              onClick={handleClose}
              className='absolute top-6 right-6 z-50 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors group'
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className='w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors' />
            </motion.button>

            {/* Content */}
            <div className='relative z-10 p-8 h-full overflow-y-auto no-scrollbar'>
              {/* Header */}
              <motion.div variants={headerVariants} className='mb-8'>
                <div className='flex items-center space-x-3 mb-2'>
                  <motion.div
                    className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center'
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Filter className='w-6 h-6 text-white' />
                  </motion.div>
                  <div>
                    <h2 className='text-2xl font-bold text-gray-900'>Filter Products</h2>
                    <p className='text-gray-600 text-sm'>Choose your category</p>
                  </div>
                </div>

                <motion.div
                  className='w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full'
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </motion.div>

              {/* Categories */}
              <motion.div className='space-y-3'>
                {merchAndEcardsCategoriesData.map((type, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    onClick={() => handleFilter(type)}
                    className={`
                      relative group cursor-pointer p-4 rounded-2xl transition-all duration-300
                      ${
                        type === category
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'bg-white/70 hover:bg-white hover:shadow-md text-gray-700 hover:text-gray-900'
                      }
                    `}
                    whileHover={{
                      scale: 1.02,
                      x: 8,
                      transition: { type: 'spring', damping: 20, stiffness: 400 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background glow effect */}
                    {type === category && (
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-xl'
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 0.3 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}

                    <div className='relative flex items-center justify-between'>
                      <span className='font-medium text-base'>{type}</span>

                      {type === category && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                        >
                          <Sparkles className='w-5 h-5' />
                        </motion.div>
                      )}

                      {type !== category && (
                        <motion.div
                          className='w-2 h-2 bg-gray-400 rounded-full group-hover:bg-blue-500 transition-colors'
                          whileHover={{ scale: 1.5 }}
                        />
                      )}
                    </div>

                    {/* Hover indicator */}
                    <motion.div
                      className='absolute left-0 top-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full transform -translate-y-1/2'
                      initial={{ height: 0 }}
                      whileHover={{ height: '60%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Clear Filter Button */}
              {category && (
                <motion.button
                  onClick={() => handleFilter('Clear Filter')}
                  className='w-full mt-8 p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear All Filters
                </motion.button>
              )}
            </div>

            {/* Decorative elements */}
            <motion.div
              className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-full'
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full'
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default FilterDrawer;
