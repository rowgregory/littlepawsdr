import { FC, ReactNode } from 'react';
import AdminNavigation from '../admin/navigation/AdminNavigation';
import { MenuSquare } from 'lucide-react';
import AdminMobileNavigationDrawer from '../AdminMobileNavigationDrawer';
import { closeAdminMobileNavigation, openAdminMobileNavigation } from '../../redux/features/dashboard/dashboardSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { motion } from 'framer-motion';

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { sidebar } = useAppSelector((state: RootState) => state.dashboard);
  return (
    <div className='min-h-dvh flex'>
      <AdminMobileNavigationDrawer isOpen={sidebar} onClose={() => dispatch(closeAdminMobileNavigation())} currentPath='/admin/campaigns' />
      <aside
        className={`hidden md:block md:fixed md:top-0 md:left-0 md:overflow-visible w-16 md:min-h-dvh md:transition-all md:duration-300 md:z-40`}
      >
        <AdminNavigation />
      </aside>
      <motion.button
        onClick={() => dispatch(openAdminMobileNavigation())}
        className='block md:hidden fixed top-4 right-4 z-50 p-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'
        whileHover={{
          scale: 1.1,
          boxShadow: '0 10px 25px -5px rgba(20, 184, 166, 0.4)',
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
        >
          <MenuSquare className='w-6 h-6' />
        </motion.div>

        {/* Pulsing ring effect */}
        <motion.div
          className='absolute inset-0 rounded-xl bg-teal-400'
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Shine effect */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl'
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'linear',
          }}
        />
      </motion.button>
      <main className={`w-screen md:ml-16 md:w-[calc(100vw-62px)] overflow-x-hidden transition-all duration-300 bg-white`}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
