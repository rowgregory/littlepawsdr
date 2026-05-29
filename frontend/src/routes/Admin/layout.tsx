import { FC, ReactNode, useState } from 'react';
import AdminSidebar from './sidebar';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex h-dvh bg-bg-light dark:bg-bg-dark'>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
        />
      )}

      {/* Desktop sidebar */}
      <div className='hidden lg:block w-56 flex-shrink-0'>
        <AdminSidebar />
      </div>

      {/* Mobile sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className='fixed lg:hidden inset-y-0 left-0 z-50 w-56'
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </motion.div>

      {/* Main content */}
      <main className='flex-1 overflow-y-auto flex flex-col'>
        {/* Mobile header */}
        <div className='lg:hidden flex items-center justify-between bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-4 py-3'>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label='Toggle navigation menu'
            aria-expanded={sidebarOpen}
            className='p-2 text-text-light dark:text-text-dark hover:bg-bg-light dark:hover:bg-bg-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
          >
            <Menu className='w-5 h-5' aria-hidden='true' />
          </button>
          <h1 className='font-mono text-xs uppercase tracking-[0.15em] text-text-light dark:text-text-dark'>
            Admin
          </h1>
          <div className='w-9' />
        </div>

        {children}
      </main>
    </div>
  );
};
export default AdminLayout;
