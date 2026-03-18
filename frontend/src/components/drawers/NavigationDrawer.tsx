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
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
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
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[101]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            className='fixed left-0 top-0 h-screen w-full sm:w-96 bg-bg-light dark:bg-bg-dark border-r border-border-light dark:border-border-dark z-[102] overflow-y-auto'
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            exit={{ x: -500 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* ── Header ── */}
            <div className='sticky top-0 bg-bg-light dark:bg-bg-dark border-b border-border-light dark:border-border-dark px-5 py-4 flex items-center justify-between z-10'>
              <div className='flex items-center gap-2'>
                <div
                  className='w-4 h-px bg-primary-light dark:bg-primary-dark'
                  aria-hidden='true'
                />
                <span className='font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark'>
                  Little Paws
                </span>
              </div>
              <button
                onClick={handleClose}
                aria-label='Close menu'
                className='p-1.5 text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
              >
                <X className='w-4 h-4' aria-hidden='true' />
              </button>
            </div>

            <div className='flex-1 overflow-y-auto pb-20'>
              {/* ── Auction banner ── */}
              {auction?.status && (isAuctionActive || isAuctionDraft) && (
                <div className='px-4 pt-4'>
                  <Link
                    to={`/auctions/${auction?.customAuctionLink}`}
                    onClick={handleClose}
                    className={`relative overflow-hidden flex items-start gap-3 p-4 border ${
                      isAuctionActive
                        ? 'border-cyan-600/30 dark:border-violet-400/30 bg-cyan-600/10 dark:bg-violet-400/10'
                        : 'border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark'
                    } transition-colors`}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Gavel
                        className='w-4 h-4 text-primary-light dark:text-primary-dark shrink-0 mt-0.5'
                        aria-hidden='true'
                      />
                    </motion.div>
                    <div className='flex-1 min-w-0'>
                      <p className='font-changa text-xs uppercase tracking-wide text-text-light dark:text-text-dark leading-snug'>
                        {isAuctionActive
                          ? `${auction?.title} — Live Now`
                          : `${auction?.title} — Coming Soon`}
                      </p>
                      <p className='font-lato text-f10 text-muted-light dark:text-muted-dark mt-0.5'>
                        {isAuctionActive ? 'Bid now on amazing items' : 'Get ready to bid'}
                      </p>
                    </div>
                    {isAuctionActive && (
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className='text-primary-light dark:text-primary-dark text-sm shrink-0'
                        aria-hidden='true'
                      >
                        →
                      </motion.span>
                    )}
                  </Link>
                </div>
              )}

              {/* ── User / auth ── */}
              <div className='px-4 py-4 space-y-1'>
                {user?._id ? (
                  <>
                    {user.isAdmin && (
                      <Link
                        to='/admin/dashboard'
                        onClick={handleClose}
                        className='flex items-center gap-3 px-4 py-3 text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors'
                      >
                        <LayoutDashboard className='w-4 h-4 shrink-0' aria-hidden='true' />
                        <span className='font-changa text-xs uppercase tracking-[0.15em]'>
                          Dashboard
                        </span>
                      </Link>
                    )}
                    <Link
                      to='/supporter/profile'
                      onClick={handleClose}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                        isLinkActive('/profile')
                          ? 'text-primary-light dark:text-primary-dark bg-surface-light dark:bg-surface-dark'
                          : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark'
                      }`}
                    >
                      <User className='w-4 h-4 shrink-0' aria-hidden='true' />
                      <span className='font-changa text-xs uppercase tracking-[0.15em]'>
                        Profile
                      </span>
                    </Link>
                    <Link
                      to='/cart'
                      onClick={handleClose}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                        isLinkActive('/cart')
                          ? 'text-primary-light dark:text-primary-dark bg-surface-light dark:bg-surface-dark'
                          : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark'
                      }`}
                    >
                      <ShoppingCart className='w-4 h-4 shrink-0' aria-hidden='true' />
                      <span className='font-changa text-xs uppercase tracking-[0.15em]'>Cart</span>
                    </Link>
                  </>
                ) : (
                  <div className='px-4 py-4 border-l-2 border-primary-light dark:border-primary-dark pl-4'>
                    <Link
                      to='/auth/login'
                      onClick={handleClose}
                      className='font-changa text-xs uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors'
                    >
                      Sign In
                    </Link>
                    <p className='font-lato text-xs text-muted-light dark:text-muted-dark mt-1.5 leading-relaxed'>
                      Sign in to view your profile, orders, and more.
                    </p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className='mx-4 border-t border-border-light dark:border-border-dark' />

              {/* ── Newsletter ── */}
              <div className='px-4 py-5'>
                <p className='font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark mb-1'>
                  Stay Updated
                </p>
                <p className='font-lato text-xs text-muted-light dark:text-muted-dark mb-4 leading-relaxed'>
                  Subscribe to our newsletter for rescues, events, and adoption opportunities!
                </p>
                <form onSubmit={handleSubmit} className='space-y-2'>
                  <input
                    name='email'
                    type='email'
                    placeholder='your@email.com'
                    value={inputs?.email || ''}
                    onChange={handleInput}
                    className='w-full px-3.5 py-2.5 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark font-lato text-sm focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark transition-colors'
                  />
                  <button
                    type='submit'
                    disabled={isLoading}
                    className='w-full py-2.5 px-4 bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-changa text-f10 uppercase tracking-[0.25em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                  >
                    {isLoading ? (
                      <span className='flex items-center justify-center gap-2'>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className='w-3.5 h-3.5 border-2 border-white/30 border-t-white'
                          aria-hidden='true'
                        />
                        Subscribing...
                      </span>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>
                <Link
                  onClick={handleClose}
                  to='/newsletter-issues'
                  className='inline-flex items-center gap-2 mt-4 font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors'
                >
                  View Newsletters
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className='w-3.5 h-3.5' aria-hidden='true' />
                  </motion.div>
                </Link>
              </div>

              {/* Divider */}
              <div className='mx-4 border-t border-border-light dark:border-border-dark' />

              {/* ── Nav links ── */}
              <nav className='px-4 py-4 space-y-0.5' aria-label='Mobile navigation'>
                {navigationLinks(auction).map((navLink, idx) => (
                  <div key={idx}>
                    {navLink.link ? (
                      <Link
                        to={navLink.link}
                        onClick={handleClose}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          isLinkActive(navLink.link)
                            ? 'text-primary-light dark:text-primary-dark bg-surface-light dark:bg-surface-dark border-l-2 border-primary-light dark:border-primary-dark'
                            : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark'
                        }`}
                      >
                        <span className='shrink-0'>{navLink.icon}</span>
                        <span className='font-changa text-xs uppercase tracking-[0.15em]'>
                          {navLink.title}
                        </span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => toggleSection(navLink.title)}
                        className='w-full flex items-center gap-3 px-4 py-3 text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors focus-visible:outline-none'
                      >
                        <span className='shrink-0'>{navLink.icon}</span>
                        <span className='font-changa text-xs uppercase tracking-[0.15em] flex-1 text-left'>
                          {navLink.title}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedSections.includes(navLink.title) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className='w-3.5 h-3.5' aria-hidden='true' />
                        </motion.div>
                      </button>
                    )}

                    {/* Submenu */}
                    <AnimatePresence>
                      {navLink.links && expandedSections.includes(navLink.title) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className='pl-10 space-y-0.5'
                        >
                          {navLink.links.map((subLink, subIdx) => (
                            <motion.div
                              key={subIdx}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: subIdx * 0.04 }}
                            >
                              <Link
                                to={subLink.linkKey}
                                onClick={handleClose}
                                className={`block px-4 py-2 font-lato text-xs transition-colors ${
                                  isLinkActive(subLink.linkKey)
                                    ? 'text-primary-light dark:text-primary-dark font-semibold'
                                    : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark'
                                }`}
                              >
                                {subLink.linkText}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavigationDrawer;
