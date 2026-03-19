import { type FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AtSign, ShoppingCart, Shield, User, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppDispatch, useCartSelector, useUserSelector } from '../../redux/toolkitStore';
import urlsToExclude from '../../utils/urlsToExclude';
import useForm from '../../hooks/useForm';
import { useCreateNewsletterEmailMutation } from '../../redux/services/newsletterEmailApi';
import { validateEmailRegex } from '../../utils/regex';
import { showToast } from '../../redux/features/toastSlice';
import Logo from '../common/Logo';
import { formatDateWithTimezone } from '../../utils/dateFunctions';

// ─── Info box ─────────────────────────────────────────────────────────────────
export const InfoBox = ({ icon: Icon, titleKey, textKey, onClick, className = '' }: any) => (
  <div
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    className={`flex items-center gap-2 group ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    <Icon
      className='w-3.5 h-3.5 text-primary-light dark:text-primary-dark shrink-0'
      aria-hidden='true'
    />
    <div>
      <p className='text-[8px] uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark whitespace-nowrap'>
        {titleKey}
      </p>
      <p className='text-[9px] uppercase tracking-wide text-text-dark whitespace-nowrap group-hover:text-primary-light transition-colors'>
        {textKey}
      </p>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const TopHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useUserSelector();
  const { cartItemsAmount } = useCartSelector();
  const { pathname } = useLocation();
  const shouldExclude = urlsToExclude(pathname);
  const { inputs, handleInput, setInputs } = useForm(['email']);
  const [createNewsletterEmail, { isLoading }] = useCreateNewsletterEmailMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmailRegex.test(inputs.email)) {
      dispatch(showToast({ message: 'Invalid email', type: 'warning' }));
      return;
    }
    try {
      await createNewsletterEmail({ email: inputs.email }).unwrap();
      dispatch(showToast({ message: 'Subscribed to newsletter!', type: 'success' }));
      setInputs({});
    } catch {
      dispatch(showToast({ message: 'Error, please try again', type: 'warning' }));
    }
  };

  if (shouldExclude) return null;

  return (
    <div className='w-full bg-topbar-light dark:bg-topbar-dark border-b border-white/5'>
      <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-6'>
        {/* ── Logo ── */}
        <Link
          to='/'
          aria-label='Little Paws Dachshund Rescue — home'
          className='shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light'
        >
          <Logo className='w-24' />
        </Link>

        {/* ── Right side ── */}
        <div className='flex items-center gap-6 1230:gap-8'>
          {/* Newsletter */}
          <form
            onSubmit={handleSubmit}
            className='hidden 1230:flex items-center gap-2'
            aria-label='Subscribe to newsletter'
          >
            <input
              name='email'
              type='email'
              autoComplete='email'
              value={inputs.email || ''}
              onChange={handleInput}
              placeholder='Subscribe, Support, Rescue'
              aria-label='Email address for newsletter'
              className='w-64 px-3.5 py-1.5 border border-white/10 bg-white/5 text-text-dark placeholder:text-muted-dark/40 font-lato text-xs outline-none focus:border-primary-light transition-colors'
            />
            <button
              type='submit'
              disabled={isLoading}
              aria-label={isLoading ? 'Subscribing...' : 'Subscribe'}
              className='w-8 h-8 flex items-center justify-center bg-primary-light dark:bg-primary-dark hover:bg-secondary-light disabled:opacity-50 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light'
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 className='w-3 h-3' aria-hidden='true' />
                </motion.div>
              ) : (
                <Send className='w-3 h-3' aria-hidden='true' />
              )}
            </button>
          </form>

          {/* Info boxes */}
          <nav
            aria-label='Account and cart'
            className='hidden md:flex items-center gap-6 1230:gap-8'
          >
            <InfoBox icon={AtSign} titleKey='Email' textKey='lpdr@littlepawsdr.org' />
            <InfoBox
              icon={ShoppingCart}
              titleKey='Cart'
              textKey={cartItemsAmount}
              onClick={() => navigate('/cart')}
            />
            {user?._id ? (
              <InfoBox
                icon={Shield}
                titleKey={
                  formatDateWithTimezone(user?.lastLoginTime) === 'Invalid Date'
                    ? 'First login'
                    : `Last login: ${formatDateWithTimezone(user?.lastLoginTime)}`
                }
                textKey={`${user.firstName} ${user.lastName}`}
                onClick={() => navigate('/supporter/overview')}
              />
            ) : (
              <InfoBox
                icon={User}
                titleKey='Login'
                textKey='My Account'
                onClick={() => navigate('/auth/login')}
              />
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
