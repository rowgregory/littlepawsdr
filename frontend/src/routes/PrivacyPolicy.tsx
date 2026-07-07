'use client';

import {
  Shield,
  Heart,
  Lock,
  Eye,
  Database,
  Share2,
  Cookie,
  UserCheck,
  AlertTriangle,
  Globe,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    icon: Database,
    title: 'Information we collect',
    content: `We collect information you provide directly to us, including:

• Personal identification information (name, email address, phone number, mailing address)
• Payment and billing information for donations and auction purchases
• Adoption application details including household information and pet history
• Account credentials and security questions
• Communications you send to us

We also automatically collect certain information about your device and how you interact with our website, including IP address, browser type, pages visited, and time spent on our site.`,
  },
  {
    icon: Eye,
    title: 'How we use your information',
    content: `We use the information we collect to:

• Process adoption applications and match dogs with suitable homes
• Facilitate auction participation and process payments
• Send you important updates about your adoption, donations, or auction activity
• Respond to your inquiries and provide customer support
• Improve our website and services
• Send newsletters and updates about our rescue (with your consent)
• Comply with legal obligations and protect our rights
• Analyze website usage to enhance user experience`,
  },
  {
    icon: Share2,
    title: 'Information sharing and disclosure',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:

• With service providers who assist us in operating our website and conducting our rescue operations (payment processors, email services, etc.)
• With veterinarians and other professionals involved in the adoption process
• When required by law or to protect our rights and safety
• With your consent or at your direction

All third-party service providers are required to maintain the confidentiality and security of your information.`,
  },
  {
    icon: Cookie,
    title: 'Cookies and tracking technologies',
    content: `We use cookies and similar tracking technologies to improve your experience on our website. Cookies are small data files stored on your device that help us:

• Remember your preferences and settings
• Understand how you use our website
• Keep you signed in to your account
• Analyze site traffic and performance

You can control cookies through your browser settings, though disabling cookies may affect some website functionality.`,
  },
  {
    icon: Lock,
    title: 'Data security',
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

• Encryption of sensitive data in transit and at rest
• Regular security assessments and updates
• Limited access to personal information by employees and volunteers
• Secure payment processing through trusted third-party providers

However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    icon: UserCheck,
    title: 'Your rights and choices',
    content: `You have the right to:

• Access and review the personal information we hold about you
• Request correction of inaccurate or incomplete information
• Request deletion of your personal information (subject to legal obligations)
• Opt-out of marketing communications at any time
• Disable cookies through your browser settings
• Request a copy of your data in a portable format

To exercise these rights, please contact us using the information provided below.`,
  },
  {
    icon: Heart,
    title: "Children's privacy",
    content: `Our services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.

The adoption process requires applicants to be at least 21 years of age.`,
  },
  {
    icon: Globe,
    title: 'Third-party links',
    content: `Our website may contain links to third-party websites, including social media platforms and payment processors. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    icon: AlertTriangle,
    title: 'Data retention',
    content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. Adoption records and donation information may be retained indefinitely for historical and legal compliance purposes.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className='min-h-screen bg-bg-light dark:bg-bg-dark'>
      {/* Hero */}
      <div className='bg-primary-light/10 dark:bg-primary-dark/10 border-b border-border-light dark:border-border-dark py-12 sm:py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6'>
          <div className='flex items-center justify-center gap-3 mb-3'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark'>
              Privacy policy
            </h1>
          </div>
          <p className='text-center text-sm sm:text-base text-muted-light dark:text-muted-dark max-w-xl mx-auto'>
            Your privacy is important to us. Learn how we protect and use your information.
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
            <Shield
              className='w-5 h-5 text-primary-light dark:text-primary-dark shrink-0 mt-0.5'
              aria-hidden='true'
            />
            <h2 className='text-lg sm:text-xl font-bold text-text-light dark:text-text-dark'>
              Our commitment to your privacy
            </h2>
          </div>
          <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed mb-3'>
            Little Paws Dachshund Rescue is an East Coast based 501(c)(3) tax-exempt nonprofit
            organization dedicated to the rescue and re-homing of dachshunds. We are committed to
            protecting your privacy and ensuring the security of your personal information.
          </p>
          <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed'>
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website, apply for adoption, participate in our auctions,
            or otherwise interact with our services.
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
                <div className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed whitespace-pre-line'>
                  {section.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* CCPA / compliance */}
        <div className='bg-primary-light/10 dark:bg-primary-dark/10 border border-primary-light/30 dark:border-primary-dark/30 p-5 sm:p-7 mt-6'>
          <div className='flex items-start gap-3 mb-4'>
            <Globe
              className='w-5 h-5 text-primary-light dark:text-primary-dark shrink-0 mt-0.5'
              aria-hidden='true'
            />
            <h2 className='text-lg sm:text-xl font-bold text-text-light dark:text-text-dark'>
              Privacy rights and compliance
            </h2>
          </div>
          <div className='flex flex-col gap-3 text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed'>
            <p>
              <span className='font-semibold text-text-light dark:text-text-dark'>
                California residents:
              </span>{' '}
              Under the California Consumer Privacy Act (CCPA), California residents have specific
              rights regarding their personal information, including the right to know what personal
              information we collect, use, and disclose.
            </p>
            <p>
              <span className='font-semibold text-text-light dark:text-text-dark'>
                International users:
              </span>{' '}
              If you are accessing our website from outside the United States, your information may
              be transferred to, stored, and processed in the United States where our servers are
              located.
            </p>
            <p>
              <span className='font-semibold text-text-light dark:text-text-dark'>
                Do Not Track:
              </span>{' '}
              Our website does not respond to Do Not Track signals. You can manage cookies through
              your browser settings.
            </p>
          </div>
        </div>

        {/* Changes notice */}
        <div className='border-l-4 border-secondary-light dark:border-secondary-dark bg-surface-light dark:bg-surface-dark p-5 sm:p-7 mt-4'>
          <div className='flex items-start gap-3 mb-3'>
            <AlertTriangle
              className='w-5 h-5 text-secondary-light dark:text-secondary-dark shrink-0 mt-0.5'
              aria-hidden='true'
            />
            <h2 className='text-lg sm:text-xl font-bold text-text-light dark:text-text-dark'>
              Changes to this privacy policy
            </h2>
          </div>
          <p className='text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed'>
            We may update this Privacy Policy from time to time to reflect changes in our practices
            or for legal or regulatory reasons. We will notify you of material changes by posting
            the updated policy on this page and updating the "Last updated" date.
          </p>
        </div>

        {/* Footer link */}
        <div className='mt-10 pt-6 border-t border-border-light dark:border-border-dark text-center'>
          <Link
            to='/terms'
            className='text-sm sm:text-base text-primary-light dark:text-primary-dark underline underline-offset-4 hover:text-secondary-light dark:hover:text-secondary-dark transition-colors'
          >
            View terms of service
          </Link>
        </div>
      </div>
    </div>
  );
}
