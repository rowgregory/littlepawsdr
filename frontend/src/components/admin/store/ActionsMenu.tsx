import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';
import { setOpenWelcomeWienerDrawer } from '../../../redux/features/welcomeWienerSlice';
import { setOpenProductDrawer } from '../../../redux/features/productSlice';
import { setOpenEcardDrawer } from '../../../redux/features/ecardSlice';

export function ActionsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const menuItems = [
    {
      label: 'Welcome Wiener',
      action: () => {
        dispatch(setOpenWelcomeWienerDrawer());
        setIsOpen(false);
      },
    },
    {
      label: 'Product',
      action: () => {
        dispatch(setOpenProductDrawer());
        setIsOpen(false);
      },
    },
    {
      label: 'E-card',
      action: () => {
        dispatch(setOpenEcardDrawer());
        setIsOpen(false);
      },
    },
  ];

  return (
    <div className='relative'>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className='inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm'
      >
        <Plus size={16} />
        Actions
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className='fixed inset-0 z-40'
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden'
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={item.action}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  className='w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium border-b border-gray-100 last:border-b-0'
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
