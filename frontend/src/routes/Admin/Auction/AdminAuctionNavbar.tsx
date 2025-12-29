import { useState } from 'react';
import { useAuctionSelector } from '../../../redux/toolkitStore';
import { Link, useLocation } from 'react-router-dom';
import navbarLinksData from '../../../utils/auction-utils/navbarLinkData';
import { Eye, Copy, CheckCircle, ArrowLeft, DollarSign, Users, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminAuctionNavbar = () => {
  const { auction } = useAuctionSelector();
  const { pathname } = useLocation();
  const status = auction?.status;

  const [copied, setCopied] = useState(false);
  const auctionUrl = `https://www.littlepawsdr.org/auctions/${auction?.customAuctionLink}`;
  const navLinks = navbarLinksData(auction?._id);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(auctionUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className='mb-6 space-y-4'
    >
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className='overflow-hidden'
      >
        <div className='bg-white border border-gray-200 rounded-lg p-3 sm:p-4 space-y-3'>
          {/* Top Row - Back & Title & Status */}
          <div className='flex items-center gap-2'>
            <Link
              to='/admin/auctions'
              className='p-1.5 hover:bg-gray-100 rounded transition-colors flex-shrink-0'
              title='Back'
            >
              <ArrowLeft className='w-4 h-4 text-gray-600' />
            </Link>

            <div className='min-w-0 flex-1'>
              <h1 className='text-sm sm:text-base font-bold text-gray-900 line-clamp-1'>
                {auction?.title}
              </h1>
            </div>

            {/* Status Badge */}
            <div className='flex items-center gap-1 flex-shrink-0'>
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  status === 'ACTIVE'
                    ? 'bg-green-500'
                    : status === 'DRAFT'
                    ? 'bg-yellow-500'
                    : 'bg-gray-400'
                }`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className='text-xs font-medium text-gray-700 whitespace-nowrap'>
                {status === 'ACTIVE' ? 'Live' : status === 'DRAFT' ? 'Draft' : 'Ended'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className='flex gap-1 overflow-x-auto pb-1'>
            {navLinks.map((obj: any, i: number) => {
              const isActive = obj.linkKey === pathname || pathname.includes(obj.key);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    className={`px-2.5 sm:px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-all flex-shrink-0 ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    to={obj.linkKey}
                  >
                    {obj.title}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Row - Stats & Actions */}
          <div className='flex items-center justify-between gap-2 pt-2 border-t border-gray-100'>
            {/* Stats */}
            <div className='flex gap-2 min-w-0 overflow-x-auto'>
              <div className='flex items-center gap-1 px-2 py-1 bg-gray-50 rounded text-xs flex-shrink-0'>
                <DollarSign className='w-3 h-3 text-gray-700' />
                <span className='text-gray-700 font-medium'>
                  ${auction?.totalAuctionRevenue?.toFixed(0) || '0'}
                </span>
              </div>
              <div className='flex items-center gap-1 px-2 py-1 bg-gray-50 rounded text-xs flex-shrink-0'>
                <Users className='w-3 h-3 text-gray-700' />
                <span className='text-gray-700 font-medium'>{auction?.supporters || 0}</span>
              </div>
              <div className='flex items-center gap-1 px-2 py-1 bg-gray-50 rounded text-xs flex-shrink-0'>
                <Package className='w-3 h-3 text-gray-700' />
                <span className='text-gray-700 font-medium'>{auction?.items?.length || 0}</span>
              </div>
            </div>

            {/* Actions */}
            <div className='flex gap-1 flex-shrink-0'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={copyUrl}
                className={`p-1.5 rounded transition-all ${
                  copied
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={copied ? 'Copied' : 'Copy link'}
              >
                {copied ? <CheckCircle className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
              </motion.button>

              <Link
                to={`/auctions/${auction?.customAuctionLink}`}
                className='p-1.5 bg-gray-900 hover:bg-gray-800 text-white rounded transition-colors'
                title='View auction'
              >
                <Eye className='w-4 h-4' />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminAuctionNavbar;
