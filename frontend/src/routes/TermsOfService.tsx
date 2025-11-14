'use client';

import { motion } from 'framer-motion';
import { Shield, Heart, FileText, Users, AlertCircle, Scale, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Acceptance of Terms',
      content: `By accessing and using the Little Paws Dachshund Rescue website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
    },
    {
      icon: Users,
      title: 'Use of Service',
      content: `Our website provides information about our rescue organization, available dogs for adoption, ways to donate, and our auction platform. You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.`,
    },
    {
      icon: Heart,
      title: 'Adoption Process',
      content: `The adoption process requires completion of an application, home visit (where applicable), and payment of adoption fees. Little Paws Dachshund Rescue reserves the right to deny any adoption application for any reason. All adoption decisions are final and made in the best interest of the animals in our care.`,
    },
    {
      icon: Scale,
      title: 'Auction Participation',
      content: `By participating in our online auctions, you agree to honor all bids placed. Winning bidders are obligated to complete payment and arrange shipping or pickup of items won. Failure to complete a transaction may result in suspension from future auction participation.`,
    },
    {
      icon: Lock,
      title: 'Account Security',
      content: `You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. Please notify us immediately of any unauthorized use of your account.`,
    },
    {
      icon: AlertCircle,
      title: 'Disclaimers',
      content: `Little Paws Dachshund Rescue makes every effort to provide accurate information about the dogs in our care. However, we cannot guarantee the accuracy of all information provided by previous owners or veterinarians. All adoptions are final, and we do not offer refunds.`,
    },
    {
      icon: Shield,
      title: 'Limitation of Liability',
      content: `Little Paws Dachshund Rescue, its directors, employees, and volunteers shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, or use of, our website and services.`,
    },
    {
      icon: FileText,
      title: 'Intellectual Property',
      content: `All content on this website, including text, graphics, logos, images, and software, is the property of Little Paws Dachshund Rescue and protected by United States and international copyright laws. Unauthorized use is prohibited.`,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-via-cyan-50 to-blue-100'>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-gradient-to-r from-teal-600 to-blue-500 text-white py-12 sm:py-16 md:py-20'
      >
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='flex items-center justify-center mb-4 sm:mb-6'
          >
            <Shield className='w-12 h-12 sm:w-16 sm:h-16 mr-4' />
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center'>Terms of Service</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='text-center text-base sm:text-lg text-teal-100 max-w-2xl mx-auto'
          >
            Please read these terms carefully before using our services
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
          className='bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 border-teal-500'
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
            <Heart className='w-6 h-6 sm:w-8 sm:h-8 text-teal-500 mr-3' />
            About Little Paws Dachshund Rescue
          </h2>
          <p className='text-sm sm:text-base text-gray-700 leading-relaxed mb-4'>
            Little Paws Dachshund Rescue is an East Coast based 501(c)(3) tax-exempt nonprofit organization dedicated to the rescue and re-homing of
            our favorite short-legged breed. Our mission is to provide a second chance to dachshunds in need and match them with loving forever homes.
          </p>
          <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
            These Terms of Service govern your use of our website, adoption services, auction platform, and all related services provided by Little
            Paws Dachshund Rescue.
          </p>
        </motion.div>

        {/* Terms Sections */}
        <motion.div variants={containerVariants} initial='hidden' animate='visible' className='space-y-6 sm:space-y-8'>
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300'
              >
                <div className='flex items-start mb-4'>
                  <div className='bg-gradient-to-br from-teal-400 to-blue-400 p-3 rounded-xl shadow-md mr-4 flex-shrink-0'>
                    <Icon className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
                  </div>
                  <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mt-1'>{section.title}</h3>
                </div>
                <p className='text-sm sm:text-base text-gray-700 leading-relaxed ml-0 sm:ml-16'>{section.content}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className='bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl shadow-lg p-6 sm:p-8 mt-8 sm:mt-12'
        >
          <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center'>
            <AlertCircle className='w-6 h-6 sm:w-7 sm:h-7 text-teal-600 mr-3' />
            Important Information
          </h3>
          <ul className='space-y-3 text-sm sm:text-base text-gray-700'>
            <li className='flex items-start'>
              <span className='text-teal-600 mr-2 mt-1'>•</span>
              <span>
                <strong>Modifications:</strong> We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting to our website.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-teal-600 mr-2 mt-1'>•</span>
              <span>
                <strong>Governing Law:</strong> These terms shall be governed by and construed in accordance with the laws of the United States and
                the state in which Little Paws Dachshund Rescue operates.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-teal-600 mr-2 mt-1'>•</span>
              <span>
                <strong>Severability:</strong> If any provision of these terms is found to be unenforceable or invalid, that provision shall be
                limited or eliminated to the minimum extent necessary.
              </span>
            </li>
            <li className='flex items-start'>
              <span className='text-teal-600 mr-2 mt-1'>•</span>
              <span>
                <strong>Tax Deductibility:</strong> As a 501(c)(3) nonprofit organization, donations to Little Paws Dachshund Rescue may be
                tax-deductible to the extent allowed by law.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className='mt-8 sm:mt-12 text-center'>
          <Link to='/privacy-policy' className='text-teal-600 hover:text-teal-700 font-semibold underline text-sm sm:text-base'>
            View Privacy Policy
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
