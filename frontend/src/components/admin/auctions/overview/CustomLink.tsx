import { motion } from 'framer-motion';
import { CheckCircle, Copy, Link2 } from 'lucide-react';
import { useState } from 'react';

const BASE_URL = 'https://www.littlepawsdr.org';

const CustomLink = ({ inputs, isActiveAuction, handleInput, errors }: any) => {
  const [loading, setLoading] = useState(false);
  const copyLink = () => {
    setLoading(true);
    navigator.clipboard
      .writeText(`${BASE_URL}/auctions/${inputs?.customAuctionLink}`)
      .then(async () => {
        setTimeout(() => setLoading(false), 3000);
      });
  };
  return (
    <div className='bg-white border border-gray-200 rounded-lg p-6 space-y-6'>
      <div className='flex items-center gap-3 pb-4 border-b border-gray-200'>
        <div className='p-2 bg-gray-100 rounded-lg'>
          <Link2 className='w-5 h-5 text-gray-700' />
        </div>
        <div>
          <h3 className='font-bold text-gray-900'>Auction URL</h3>
          <p className='text-xs text-gray-600 mt-1'>Memorable link for sharing</p>
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-900 mb-2'>Custom Link</label>
        <div className='flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-gray-900 transition-all'>
          <div className='px-4 py-2.5 bg-gray-50 text-gray-600 font-medium text-sm border-r border-gray-300 whitespace-nowrap'>
            {BASE_URL}/auctions/
          </div>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            disabled={isActiveAuction}
            value={inputs?.customAuctionLink || ''}
            type='text'
            name='customAuctionLink'
            placeholder='save-max-2024'
            className='flex-1 px-4 py-2.5 focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed'
            onChange={handleInput}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='button'
            onClick={copyLink}
            disabled={!inputs?.customAuctionLink || loading}
            className={`px-4 py-2.5 font-medium transition-colors ${
              loading
                ? 'bg-green-600 text-white'
                : 'bg-gray-900 hover:bg-gray-800 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
            }`}
          >
            {loading ? <CheckCircle className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
          </motion.button>
        </div>

        <p className='text-xs text-gray-500 mt-2'>Easy to remember and share</p>

        {inputs?.customAuctionLink && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-gray-50 border border-gray-200 rounded-lg p-3 mt-3'
          >
            <p className='text-gray-900 font-medium text-sm break-all'>
              {`${BASE_URL}/auctions/${inputs?.customAuctionLink}`}
            </p>
          </motion.div>
        )}

        {errors?.customAuctionLink && (
          <p className='text-red-600 text-xs mt-2 flex items-center gap-1'>
            <span className='w-1 h-1 bg-red-600 rounded-full' />
            {errors?.customAuctionLink}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomLink;
