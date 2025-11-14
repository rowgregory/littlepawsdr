'use client';

import { motion } from 'framer-motion';
import { Shield, Heart, Lock, Eye, Database, Share2, Cookie, UserCheck, AlertTriangle, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
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
      title: 'How We Use Your Information',
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
      title: 'Information Sharing and Disclosure',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
      
      • With service providers who assist us in operating our website and conducting our rescue operations (payment processors, email services, etc.)
      • With veterinarians and other professionals involved in the adoption process
      • When required by law or to protect our rights and safety
      • With your consent or at your direction
      
      All third-party service providers are required to maintain the confidentiality and security of your information.`,
    },
    {
      icon: Cookie,
      title: 'Cookies and Tracking Technologies',
      content: `We use cookies and similar tracking technologies to improve your experience on our website. Cookies are small data files stored on your device that help us:
      
      • Remember your preferences and settings
      • Understand how you use our website
      • Keep you signed in to your account
      • Analyze site traffic and performance
      
      You can control cookies through your browser settings, though disabling cookies may affect some website functionality.`,
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
      
      • Encryption of sensitive data in transit and at rest
      • Regular security assessments and updates
      • Limited access to personal information by employees and volunteers
      • Secure payment processing through trusted third-party providers
      
      However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      icon: UserCheck,
      title: 'Your Rights and Choices',
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
      title: `Children's Privacy`,
      content: `Our services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
      
      The adoption process requires applicants to be at least 21 years of age.`,
    },
    {
      icon: Globe,
      title: 'Third-Party Links',
      content: `Our website may contain links to third-party websites, including social media platforms and payment processors. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
    },
    {
      icon: AlertTriangle,
      title: 'Data Retention',
      content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. Adoption records and donation information may be retained indefinitely for historical and legal compliance purposes.`,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50'>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-gradient-to-r from-teal-600 to-blue-600 text-white py-12 sm:py-16 md:py-20'
      >
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='flex items-center justify-center mb-4 sm:mb-6'
          >
            <Lock className='w-12 h-12 sm:w-16 sm:h-16 mr-4' />
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center'>Privacy Policy</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='text-center text-base sm:text-lg text-blue-100 max-w-2xl mx-auto'
          >
            Your privacy is important to us. Learn how we protect and use your information.
          </motion.p>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16'>
        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 border-blue-500'
        >
          <p className='text-sm sm:text-base text-gray-600'>
            <strong>Last Updated:</strong> November 13, 2025
          </p>
          <p className='text-sm sm:text-base text-gray-600 mt-2'>
            <strong>Effective Date:</strong> November 13, 2025
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8'
        >
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center'>
            <Shield className='w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mr-3' />
            Our Commitment to Your Privacy
          </h2>
          <p className='text-sm sm:text-base text-gray-700 leading-relaxed mb-4'>
            Little Paws Dachshund Rescue is an East Coast based 501(c)(3) tax-exempt nonprofit organization dedicated to the rescue and re-homing of
            dachshunds. We are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
          <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, apply for adoption,
            participate in our auctions, or otherwise interact with our services. Please read this privacy policy carefully.
          </p>
        </motion.div>

        {/* Privacy Sections */}
        <motion.div variants={containerVariants} initial='hidden' animate='visible' className='space-y-6 sm:space-y-8'>
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300'
              >
                <div className='flex items-start mb-4'>
                  <div className='bg-gradient-to-br from-teal-500 to-blue-500 p-3 rounded-xl shadow-md mr-4 flex-shrink-0'>
                    <Icon className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
                  </div>
                  <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mt-1'>{section.title}</h3>
                </div>
                <div className='text-sm sm:text-base text-gray-700 leading-relaxed ml-0 sm:ml-16 whitespace-pre-line'>{section.content}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* GDPR & CCPA Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className='bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl shadow-lg p-6 sm:p-8 mt-8 sm:mt-12'
        >
          <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center'>
            <Globe className='w-6 h-6 sm:w-7 sm:h-7 text-blue-600 mr-3' />
            Privacy Rights & Compliance
          </h3>
          <div className='space-y-3 text-sm sm:text-base text-gray-700'>
            <p>
              <strong>California Residents:</strong> Under the California Consumer Privacy Act (CCPA), California residents have specific rights
              regarding their personal information. You have the right to know what personal information we collect, use, and disclose.
            </p>
            <p>
              <strong>International Users:</strong> If you are accessing our website from outside the United States, please be aware that your
              information may be transferred to, stored, and processed in the United States where our servers are located.
            </p>
            <p>
              <strong>Do Not Track:</strong> Our website does not respond to Do Not Track signals. However, you can manage cookies through your
              browser settings.
            </p>
          </div>
        </motion.div>

        {/* Changes to Privacy Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className='bg-teaal-50 border-l-4 border-teaal-500 rounded-2xl shadow-lg p-6 sm:p-8 mt-6 sm:mt-8'
        >
          <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-3 flex items-center'>
            <AlertTriangle className='w-6 h-6 text-teaal-600 mr-3' />
            Changes to This Privacy Policy
          </h3>
          <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory
            reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            We encourage you to review this Privacy Policy periodically.
          </p>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className='mt-8 sm:mt-12 text-center'>
          <Link to='/terms-of-service' className='text-blue-600 hover:text-blue-700 font-semibold underline text-sm sm:text-base'>
            View Terms of Service
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
