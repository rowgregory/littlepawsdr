import { useState } from 'react';
import SupporterSidebar from './sidebar';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

const SupporterLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
        />
      )}

      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className='hidden lg:block w-64 flex-shrink-0'>
        <SupporterSidebar />
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className='fixed lg:hidden inset-y-0 left-0 z-50 w-64'
      >
        <SupporterSidebar onClose={() => setSidebarOpen(false)} />
      </motion.div>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto flex flex-col'>
        {/* Mobile Header */}
        <div className='lg:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-4'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='p-2 hover:bg-gray-100 rounded-lg'
          >
            <Menu className='w-6 h-6 text-gray-900' />
          </motion.button>
          <h1 className='text-lg font-bold text-gray-900'>My Profile</h1>
          <div className='w-10' />
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8'>
          <div className='max-w-7xl mx-auto'>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default SupporterLayout;
