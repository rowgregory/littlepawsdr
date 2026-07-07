import { Link, useLocation } from 'react-router-dom';
import urlsToExclude from '../../utils/urlsToExclude';
import useForm from '../../hooks/useForm';
import { useCreateNewsletterEmailMutation } from '../../redux/services/newsletterEmailApi';
import { useState } from 'react';
import { validateEmailRegex } from '../../utils/regex';
import TailwindSpinner from '../Loaders/TailwindSpinner';
import { Send } from 'lucide-react';
import { WhiteLogo } from '../assets';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
    aria-hidden='true'
    focusable='false'
  >
    <path d='M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.026 4.388 11.02 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796v8.437C19.612 23.092 24 18.099 24 12.073z' />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
    aria-hidden='true'
    focusable='false'
  >
    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 1.17.053 1.805.249 2.227.413.56.218.96.479 1.382.9.42.422.681.82.9 1.382.164.422.36 1.057.413 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.17-.249 1.805-.413 2.227-.218.56-.48.96-.9 1.382-.422.42-.823.681-1.382.9-.422.164-1.057.36-2.227.413-1.265.058-1.645.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.053-1.805-.249-2.227-.413a3.81 3.81 0 01-1.382-.9 3.81 3.81 0 01-.9-1.382c-.164-.422-.36-1.057-.413-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.053-1.17.249-1.805.413-2.227.218-.56.48-.96.9-1.382.422-.42.822-.681 1.382-.9.422-.164 1.057-.36 2.227-.413 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.014 7.052.072 5.775.132 4.904.333 4.14.63a5.8 5.8 0 00-2.126 1.384A5.8 5.8 0 00.63 4.14C.333 4.904.131 5.775.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.06 1.277.261 2.148.558 2.913a5.8 5.8 0 001.384 2.126 5.8 5.8 0 002.126 1.384c.765.297 1.636.499 2.913.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.06 2.148-.261 2.913-.558a5.8 5.8 0 002.126-1.384 5.8 5.8 0 001.384-2.126c.297-.765.499-1.636.558-2.913.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.06-1.277-.261-2.148-.558-2.913a5.8 5.8 0 00-1.384-2.126A5.8 5.8 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
  </svg>
);

const footerNav = [
  {
    title: 'Adopt',
    links: [
      { label: 'Available Dachshunds', to: '/dachshunds' },
      { label: 'How to Adopt', to: '/dachshunds#how-to-adopt' },
      { label: 'Adoption Application', to: '/adopt' },
      { label: 'Surrender a Dachshund', to: '/dachshunds/surrender' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Donate', to: '/donate' },
      { label: 'Welcome Wieners', to: '/donate/welcome-wieners' },
      { label: 'Auctions', to: '/auctions' },
      { label: 'Shop', to: '/shop' },
    ],
  },
  {
    title: 'Contact',
    links: [
      {
        label: 'Privacy Policy',
        href: '/privacy-policy',
      },
      {
        label: 'Terms of Service',
        href: '/terms',
      },
      { label: 'California Consumer Privacy Act', href: 'https://oag.ca.gov/privacy/ccpa' },
      { label: 'Return Policy', to: '/return-policy' },
    ],
  },
  {
    title: 'Address',
    links: [],
    address: 'PO Box 108\nBrookfield, CT 06804',
  },
];

const socials = [
  { label: 'Facebook', href: 'https://facebook.com/littlepawsdr', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://instagram.com/littlepawsdr', Icon: InstagramIcon },
];

export const Footer = () => {
  const { pathname } = useLocation();

  const [createNewsletterEmail, { isLoading }] = useCreateNewsletterEmailMutation();
  const { inputs, handleInput } = useForm(['email']);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'invalid'>('idle');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus('idle');
    if (!validateEmailRegex.test(inputs.email || '')) {
      setStatus('invalid');
      return;
    }
    try {
      await createNewsletterEmail({ email: inputs.email }).unwrap();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (urlsToExclude(pathname)) return null;

  return (
    <footer className='w-full bg-topbar-light dark:bg-topbar-dark text-white'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 py-14 sm:py-16'>
        {/* Top: brand + newsletter */}
        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-10 border-b border-white/10'>
          <div className='max-w-md'>
            <div className='flex items-center gap-3 mb-4'>
              <span
                className='block w-8 h-px bg-primary-light dark:bg-primary-dark'
                aria-hidden='true'
              />
              <span className='font-mono text-[11px] uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark'>
                Little Paws Dachshund Rescue
              </span>
            </div>
            <h2 className='font-quicksand text-2xl sm:text-3xl font-bold leading-tight'>
              Every long dog deserves a home.
            </h2>
            <p className='text-sm text-white/60 mt-3 leading-relaxed'>
              An East Coast based 501(c)(3) nonprofit dedicated to rescuing and re-homing dachshunds
              and dachshund mixes.
            </p>
          </div>

          {/* Newsletter */}
          <div className='w-full lg:max-w-sm'>
            <h3 className='font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-3'>
              Subscribe, Support, Rescue
            </h3>
            {status === 'success' ? (
              <p className='text-sm text-white/90' role='status'>
                Thank you for subscribing! You&rsquo;re now part of the Little Paws family.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <div className='flex items-stretch gap-2'>
                  <label htmlFor='footer-email' className='sr-only'>
                    Email address
                  </label>
                  <input
                    id='footer-email'
                    name='email'
                    type='email'
                    value={inputs.email || ''}
                    onChange={handleInput}
                    placeholder='Enter your email'
                    aria-invalid={status === 'invalid'}
                    aria-describedby={
                      status === 'invalid' || status === 'error' ? 'footer-news-error' : undefined
                    }
                    className='flex-1 min-w-0 p-3 text-base sm:text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
                  />
                  <button
                    type='submit'
                    disabled={isLoading}
                    aria-label='Subscribe'
                    className='w-12 shrink-0 bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark disabled:opacity-60 text-bg-light dark:text-bg-dark flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                  >
                    {isLoading ? (
                      <TailwindSpinner color='fill-current' />
                    ) : (
                      <Send className='w-4 h-4' aria-hidden='true' />
                    )}
                  </button>
                </div>
                {(status === 'invalid' || status === 'error') && (
                  <p
                    id='footer-news-error'
                    role='alert'
                    className='font-mono text-[11px] text-red-400'
                  >
                    {status === 'invalid'
                      ? 'Please enter a valid email.'
                      : 'Something went wrong — try again.'}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Nav columns */}
        <nav className='grid grid-cols-2 sm:grid-cols-4 gap-8 py-10' aria-label='Footer'>
          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className='font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-4'>
                {col.title}
              </h3>
              <ul className='flex flex-col gap-2.5'>
                {col.address ? (
                  <address className='not-italic flex flex-col gap-1 text-sm text-white/80'>
                    {col.address.split('\n').map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                ) : (
                  col.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a
                          href={link.href}
                          className='text-sm text-white/80 hover:text-primary-light dark:hover:text-primary-dark transition-colors focus:outline-none focus-visible:underline'
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.to!}
                          className='text-sm text-white/80 hover:text-primary-light dark:hover:text-primary-dark transition-colors focus:outline-none focus-visible:underline'
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </nav>

        {/* Socials */}
        <div className='flex items-center gap-3 pt-2'>
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Little Paws on ${label}`}
              className='group flex items-center justify-center w-11 h-11 bg-white/10 hover:bg-primary-light dark:hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
            >
              <Icon className='w-5 h-5 text-white' aria-hidden='true' />
            </a>
          ))}
        </div>
      </div>

      {/* Credits bar */}
      <div className='bg-navbar-light dark:bg-navbar-dark'>
        <div className='max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <div className='flex items-center gap-4'>
            <img src={WhiteLogo} alt='Little Paws Dachshund Rescue' className='w-16' />
            <button
              type='button'
              onClick={() => window.open('https://sqysh.io', '_blank', 'noopener,noreferrer')}
              aria-label='Developed by Sqysh — opens sqysh.io in a new tab'
              className='flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
            >
              <span className='font-mono text-[11px] uppercase tracking-wide text-white/70'>
                Developed by Sqysh
              </span>
            </button>
          </div>
          <p className='font-mono text-[11px] text-white/50 text-center sm:text-right'>
            &copy; {new Date().getFullYear()} Little Paws Dachshund Rescue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
