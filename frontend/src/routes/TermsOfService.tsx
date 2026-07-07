'use client';

import { Shield, Heart, FileText, Users, AlertCircle, Scale, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    icon: FileText,
    title: 'Acceptance of terms',
    content: `By accessing and using the Little Paws Dachshund Rescue website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
  },
  {
    icon: Users,
    title: 'Use of service',
    content: `Our website provides information about our rescue organization, available dogs for adoption, ways to donate, and our auction platform. You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.`,
  },
  {
    icon: Heart,
    title: 'Adoption process',
    content: `The adoption process requires completion of an application, home visit (where applicable), and payment of adoption fees. Little Paws Dachshund Rescue reserves the right to deny any adoption application for any reason. All adoption decisions are final and made in the best interest of the animals in our care.`,
  },
  {
    icon: Scale,
    title: 'Auction participation',
    content: `By participating in our online auctions, you agree to honor all bids placed. Winning bidders are obligated to complete payment and arrange shipping or pickup of items won. Failure to complete a transaction may result in suspension from future auction participation.`,
  },
  {
    icon: Lock,
    title: 'Account security',
    content: `You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. Please notify us immediately of any unauthorized use of your account.`,
  },
  {
    icon: AlertCircle,
    title: 'Disclaimers',
    content: `Little Paws Dachshund Rescue makes every effort to provide accurate information about the dogs in our care. However, we cannot guarantee the accuracy of all information provided by previous owners or veterinarians. All adoptions are final, and we do not offer refunds.`,
  },
  {
    icon: Shield,
    title: 'Limitation of liability',
    content: `Little Paws Dachshund Rescue, its directors, employees, and volunteers shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, or use of, our website and services.`,
  },
  {
    icon: FileText,
    title: 'Intellectual property',
    content: `All content on this website, including text, graphics, logos, images, and software, is the property of Little Paws Dachshund Rescue and protected by United States and international copyright laws. Unauthorized use is prohibited.`,
  },
];

const importantItems = [
  {
    label: 'Modifications',
    content:
      'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.',
  },
  {
    label: 'Governing law',
    content:
      'These terms shall be governed by and construed in accordance with the laws of the United States and the state in which Little Paws Dachshund Rescue operates.',
  },
  {
    label: 'Severability',
    content:
      'If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary.',
  },
  {
    label: 'Tax deductibility',
    content:
      'As a 501(c)(3) nonprofit organization, donations to Little Paws Dachshund Rescue may be tax-deductible to the extent allowed by law.',
  },
];

export default function TermsOfService() {
  return (
    <div className='min-h-screen bg-bg-light dark:bg-bg-dark'>
      {/* Hero */}
      <div className='bg-primary-light/10 dark:bg-primary-dark/10 border-b border-border-light dark:border-border-dark py-12 sm:py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6'>
          <div className='flex items-center justify-center gap-3 mb-3'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark'>
              Terms of service
            </h1>
          </div>
          <p className='text-center text-sm sm:text-base text-muted-light dark:text-muted-dark max-w-xl mx-auto'>
            Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      <div className='max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
        {/* Dates */}
        <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-4 sm:p-5 mb-6 flex flex-wrap gap-x-8 gap-y-1'>
          <p className='text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark'>
            <span className='text-text-light dark:text-text-dark'>Last updated:</span> July 7, 2026
          </p>
          <p className='text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark'>
            <span className='text-text-light dark:text-text-dark'>Effective date:</span> November
            13, 2025
          </p>
        </div>

        {/* Intro */}
        <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-5 sm:p-7 mb-6'>
          <div className='flex items-start gap-3 mb-4'>
            <Heart
              className='w-5 h-5 text-primary-light dark:text-primary-dark shrink-0 mt-0.5'
              aria-hidden='true'
            />
            <h2 className='text-lg sm:text-xl font-bold text-text-light dark:text-text-dark'>
              About Little Paws Dachshund Rescue
            </h2>
          </div>
          <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed mb-3'>
            Little Paws Dachshund Rescue is an East Coast based 501(c)(3) tax-exempt nonprofit
            organization dedicated to the rescue and re-homing of our favorite short-legged breed.
            Our mission is to provide a second chance to dachshunds in need and match them with
            loving forever homes.
          </p>
          <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed'>
            These Terms of Service govern your use of our website, adoption services, auction
            platform, and all related services provided by Little Paws Dachshund Rescue.
          </p>
        </div>

        {/* Sections */}
        <div className='flex flex-col gap-4'>
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-5 sm:p-7'
              >
                <div className='flex items-start gap-3 mb-3'>
                  <Icon
                    className='w-5 h-5 text-primary-light dark:text-primary-dark shrink-0 mt-0.5'
                    aria-hidden='true'
                  />
                  <h3 className='text-base sm:text-lg font-bold text-text-light dark:text-text-dark'>
                    {section.title}
                  </h3>
                </div>
                <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed'>
                  {section.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Important information */}
        <div className='bg-primary-light/10 dark:bg-primary-dark/10 border border-primary-light/30 dark:border-primary-dark/30 p-5 sm:p-7 mt-6'>
          <div className='flex items-start gap-3 mb-4'>
            <AlertCircle
              className='w-5 h-5 text-primary-light dark:text-primary-dark shrink-0 mt-0.5'
              aria-hidden='true'
            />
            <h2 className='text-lg sm:text-xl font-bold text-text-light dark:text-text-dark'>
              Important information
            </h2>
          </div>
          <ul className='flex flex-col gap-3'>
            {importantItems.map((item) => (
              <li key={item.label} className='flex items-start gap-2'>
                <span
                  className='text-primary-light dark:text-primary-dark mt-1 shrink-0'
                  aria-hidden='true'
                >
                  •
                </span>
                <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed'>
                  <span className='font-semibold text-text-light dark:text-text-dark'>
                    {item.label}:
                  </span>{' '}
                  {item.content}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer link */}
        <div className='mt-10 pt-6 border-t border-border-light dark:border-border-dark text-center'>
          <Link
            to='/privacy-policy'
            className='text-sm sm:text-base text-primary-light dark:text-primary-dark underline underline-offset-4 hover:text-secondary-light dark:hover:text-secondary-dark transition-colors'
          >
            View privacy policy
          </Link>
        </div>
      </div>
    </div>
  );
}
