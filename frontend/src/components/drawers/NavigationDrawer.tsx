import { motion, AnimatePresence } from 'framer-motion';
import {
  useAppDispatch,
  useAuctionSelector,
  useFormSelector,
  useNavbarSelector,
  useUserSelector,
} from '../../redux/toolkitStore';
import { toggleNavigationDrawer } from '../../redux/features/navbar/navbarSlice';
import { useCreateNewsletterEmailMutation } from '../../redux/services/newsletterEmailApi';
import { validateEmailRegex } from '../../utils/regex';
import { showToast } from '../../redux/features/toastSlice';
import {
  X,
  ChevronDown,
  LayoutDashboard,
  User,
  ShoppingCart,
  Gavel,
  ArrowRight,
} from 'lucide-react';
import { containerVariants, iconVariants, itemVariants } from '../../lib/constants/motion';
import { Link, useLocation } from 'react-router-dom';
import { navigationLinks } from '../../lib/constants/navigation';
import { useState } from 'react';
import { createFormActions, resetForm } from '../../redux/features/form/formSlice';

const NavigationDrawer = () => {
  const dispatch = useAppDispatch();
  const navbar = useNavbarSelector();
  const open = navbar.toggle.navigationDrawer;
  const { auction } = useAuctionSelector();
  const { user } = useUserSelector();
  const [createNewsletterEmail, { isLoading }] = useCreateNewsletterEmailMutation();
  const handleClose = () => dispatch(toggleNavigationDrawer({ navigationDrawer: false }));
  const isAuctionDraft = auction?.status === 'DRAFT';
  const isAuctionActive = auction?.status === 'ACTIVE';
  const { pathname } = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const { newsletterForm } = useFormSelector();
  const { handleInput } = createFormActions('newsletterForm', dispatch);
  const inputs = newsletterForm?.inputs;

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (validateEmailRegex.test(inputs.email)) {
        await createNewsletterEmail({ email: inputs.email }).unwrap();
        dispatch(showToast({ message: 'Email submitted for newsletter', type: 'success' }));
        dispatch(resetForm('newsletterForm'));
      } else {
        dispatch(showToast({ message: 'Error, please try again', type: 'error' }));
      }
    } catch (error) {
      dispatch(showToast({ message: 'Invalid email', type: 'error' }));
    }
  };

  const isLinkActive = (link: string) => pathname === link;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed inset-0 bg-black/20 backdrop-blur-sm z-[101]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            className='fixed left-0 top-0 h-screen w-full sm:w-96 bg-white z-[102] overflow-y-auto'
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            exit={{ x: -500 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <motion.div
              className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 className='text-lg font-semibold text-gray-900'>Menu</h2>
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <X className='w-5 h-5 text-gray-600' />
              </motion.button>
            </motion.div>

            <div className='flex-1 overflow-y-auto pb-56'>
              {/* Auction Status Banner */}
              {auction?.status && (isAuctionActive || isAuctionDraft) && (
                <Link
                  to={`/auctions/${auction?.customAuctionLink}`}
                  onClick={handleClose}
                  className={`mx-3 mt-4 p-4 rounded-xl flex items-start gap-3 relative overflow-hidden shadow-lg ${
                    isAuctionActive
                      ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                      : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                  }`}
                >
                  {/* Animated background glow */}
                  <motion.div
                    className={`absolute inset-0 opacity-20 ${
                      isAuctionActive ? 'bg-teal-400' : 'bg-amber-400'
                    }`}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />

                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className='relative'
                  >
                    <Gavel className='w-5 h-5 text-white flex-shrink-0' />
                  </motion.div>

                  <div className='relative flex-1'>
                    <p className='text-sm font-bold text-white'>
                      {isAuctionActive
                        ? `${auction?.title} Live Now!`
                        : `${auction?.title} Coming Soon`}
                    </p>
                    <p className='text-xs mt-1 text-white/90 font-medium'>
                      {isAuctionActive ? 'Bid now on amazing items' : 'Get ready to bid'}
                    </p>
                  </div>

                  {isAuctionActive && (
                    <motion.div
                      animate={{
                        x: [0, 4, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      className='relative'
                    >
                      <span className='text-white font-bold'>→</span>
                    </motion.div>
                  )}
                </Link>
              )}

              {/* User/Auth Section */}
              <motion.div
                className='px-4 py-4 space-y-2'
                initial='hidden'
                animate='visible'
                variants={containerVariants}
              >
                {user?._id ? (
                  <>
                    {user.isAdmin && (
                      <motion.div variants={itemVariants}>
                        <Link
                          to='/admin/dashboard'
                          onClick={handleClose}
                          className='flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors group'
                        >
                          <motion.div
                            variants={iconVariants}
                            initial='rest'
                            whileHover='hover'
                            className='text-teal-600'
                          >
                            <LayoutDashboard className='w-4 h-4' />
                          </motion.div>
                          <span className='text-sm font-medium'>Dashboard</span>
                          <motion.div
                            className='ml-auto'
                            initial={{ opacity: 0, x: -8 }}
                            whileHover={{ opacity: 1, x: 0 }}
                          >
                            <span className='text-xs text-teal-600'>→</span>
                          </motion.div>
                        </Link>
                      </motion.div>
                    )}

                    <motion.div variants={itemVariants}>
                      <Link
                        to='/supporter/profile'
                        onClick={handleClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                          isLinkActive('/profile')
                            ? 'bg-teal-50 text-teal-700'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        <motion.div variants={iconVariants} initial='rest' whileHover='hover'>
                          <User className='w-4 h-4' />
                        </motion.div>
                        <span className='text-sm font-medium'>Profile</span>
                      </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Link
                        to='/cart'
                        onClick={handleClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                          isLinkActive('/cart')
                            ? 'bg-teal-50 text-teal-700'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        <motion.div variants={iconVariants} initial='rest' whileHover='hover'>
                          <ShoppingCart className='w-4 h-4' />
                        </motion.div>
                        <span className='text-sm font-medium'>Cart</span>
                      </Link>
                    </motion.div>
                  </>
                ) : (
                  <motion.div variants={itemVariants} className='px-4 py-3'>
                    <Link
                      to='/auth/login'
                      onClick={handleClose}
                      className='text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors'
                    >
                      Sign In
                    </Link>
                    <p className='text-xs text-gray-600 mt-2'>
                      Sign in to view your profile, orders, and more.
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Newsletter Section */}
              <motion.div
                className='px-4 py-6'
                initial='hidden'
                animate='visible'
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <p className='text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2'>
                    Stay Updated
                  </p>
                  <p className='text-sm text-gray-700 mb-4'>
                    Subscribe to our newsletter for rescues, events, and adoption opportunities!
                  </p>
                  <form onSubmit={handleSubmit} className='space-y-2'>
                    <motion.input
                      name='email'
                      type='email'
                      placeholder='sqysh@sqysh.io'
                      value={inputs?.email || ''}
                      onChange={handleInput}
                      className='w-full px-4 py-2.5 rounded-lg bg-gray-100 border border-gray-200 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm text-gray-900 placeholder:text-gray-500 transition-colors'
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                      whileFocus={{ scale: 1.02 }}
                    />
                    <motion.button
                      type='submit'
                      disabled={isLoading}
                      className='w-full py-2.5 px-4 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-400 disabled:cursor-not-allowed text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2'
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      whileHover={!isLoading ? { scale: 1.02 } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className='w-4 h-4 border-2 border-white border-t-transparent rounded-full'
                          />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        'Subscribe'
                      )}
                    </motion.button>
                  </form>

                  {/* View Newsletter Link */}
                  <motion.div className='mt-4' variants={itemVariants} transition={{ delay: 0.15 }}>
                    <Link
                      onClick={handleClose}
                      to='/newsletter-issues'
                      className='inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors group'
                    >
                      View Newsletters
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className='w-4 h-4' />
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Divider */}
              <div className='mx-4 border-t border-gray-200' />

              {/* Navigation Links */}
              <motion.div
                className='px-4 py-4 space-y-1'
                initial='hidden'
                animate='visible'
                variants={containerVariants}
              >
                {navigationLinks(auction).map((navLink, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    {navLink.link ? (
                      <Link
                        to={navLink.link}
                        onClick={handleClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                          isLinkActive(navLink.link)
                            ? 'bg-teal-50 text-teal-700'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        <motion.div
                          variants={iconVariants}
                          initial='rest'
                          whileHover='hover'
                          className={isLinkActive(navLink.link) ? 'text-teal-600' : ''}
                        >
                          {navLink.icon}
                        </motion.div>
                        <span className='text-sm font-medium'>{navLink.title}</span>
                      </Link>
                    ) : (
                      <motion.button
                        onClick={() => toggleSection(navLink.title)}
                        className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors group'
                      >
                        <motion.div variants={iconVariants} initial='rest' whileHover='hover'>
                          {navLink.icon}
                        </motion.div>
                        <span className='text-sm font-medium flex-1 text-left'>
                          {navLink.title}
                        </span>
                        <motion.div
                          animate={{
                            rotate: expandedSections.includes(navLink.title) ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className='w-4 h-4 text-gray-400' />
                        </motion.div>
                      </motion.button>
                    )}

                    {/* Submenu */}
                    <AnimatePresence>
                      {navLink.links && expandedSections.includes(navLink.title) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className='pl-8 space-y-1 mt-1'
                        >
                          {navLink.links.map((subLink, subIdx) => (
                            <motion.div
                              key={subIdx}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: subIdx * 0.05 }}
                            >
                              <Link
                                to={subLink.linkKey}
                                onClick={handleClose}
                                className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                                  isLinkActive(subLink.linkKey)
                                    ? 'text-teal-700 bg-teal-50 font-medium'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                              >
                                {subLink.linkText}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavigationDrawer;
