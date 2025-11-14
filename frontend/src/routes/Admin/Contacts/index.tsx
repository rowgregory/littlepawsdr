import { Route, Routes, useLocation } from 'react-router-dom';
import UserList from './UserList';
import { ReactNode } from 'react';
import NewsletterEmailList from './NewsletterEmailList';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import UserDrawer from '../../../components/drawers/UserDrawer';

interface NavLink {
  title: string;
  linkKey: string;
}

const ContactsLayout = ({ navbar, children }: { navbar: ReactNode; children: ReactNode }) => (
  <div className='bg-gray-50 min-h-screen pt-6 px-[10px] sm:px-[16px] md:px-8 pb-3'>
    <div className='w-full mx-auto'>
      <header>{navbar}</header>
      <main>{children}</main>
    </div>
  </div>
);

const BASE_URL = '/admin/contacts';

const navbarLinksData = [
  {
    title: 'Users',
    linkKey: `${BASE_URL}/users`,
  },
  {
    title: 'Newsletter Emails',
    linkKey: `${BASE_URL}/newsletter-emails`,
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <motion.div initial='hidden' animate='visible' variants={containerVariants} className='mb-6'>
      <div className='bg-white border-2 border-gray-100 rounded-xl shadow-sm p-2 overflow-x-auto'>
        <div className='flex gap-2 min-w-max md:min-w-0 md:grid md:grid-cols-12'>
          {navbarLinksData.map((obj: NavLink, i: number) => {
            const isActive = obj.linkKey === pathname;

            return (
              <motion.div key={i} variants={itemVariants} className='flex-1 min-w-fit md:col-span-4 lg:col-span-3 xl:col-span-2'>
                <Link to={obj.linkKey} className='block hover:no-underline group relative'>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      px-4 sm:px-6 py-3 rounded-lg text-center text-sm font-Matter-Medium
                      transition-all duration-200 whitespace-nowrap relative overflow-hidden
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                      }
                    `}
                  >
                    {/* Animated background for active tab */}
                    {isActive && (
                      <motion.div
                        layoutId='activeTab'
                        className='absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg'
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover effect indicator */}
                    {!isActive && (
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg opacity-0 group-hover:opacity-10'
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    <span className='relative z-10'>{obj.title}</span>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const ContactRoutes = () => {
  return (
    <>
      <UserDrawer />
      <ContactsLayout navbar={<Navbar />}>
        <Routes>
          <Route path='/users' element={<UserList />} />
          <Route path='/newsletter-emails' element={<NewsletterEmailList />} />
        </Routes>
      </ContactsLayout>
    </>
  );
};

export default ContactRoutes;
