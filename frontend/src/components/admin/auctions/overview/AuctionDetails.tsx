import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { formatGoal } from '../../../../lib/utils/auction/details';

const AuctionDetails = ({ isActiveAuction, handleInput, inputs, errors }: any) => {
  return (
    <div className='bg-white border border-gray-200 rounded-lg p-6 space-y-6'>
      <div className='flex items-center gap-3 pb-4 border-b border-gray-200'>
        <div className='p-2 bg-gray-100 rounded-lg'>
          <Sparkles className='w-5 h-5 text-gray-700' />
        </div>
        <div>
          <h3 className='font-bold text-gray-900'>Auction Details</h3>
          <p className='text-xs text-gray-600 mt-1'>Title and fundraising goal</p>
        </div>
      </div>

      {/* Auction Title */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-900'>Auction Title</label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          disabled={isActiveAuction}
          className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          name='title'
          onChange={handleInput}
          type='text'
          placeholder='Help Save Max - Emergency Surgery Fund'
          value={inputs.title || ''}
        />
        <p className='text-xs text-gray-500'>Create a compelling title for your mission</p>
        {errors?.title && (
          <p className='text-red-600 text-xs flex items-center gap-1'>
            <span className='w-1 h-1 bg-red-600 rounded-full' />
            {errors?.title}
          </p>
        )}
      </div>

      {/* Fundraising Goal */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-900'>Fundraising Goal</label>
        <div className='relative'>
          <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium'>
            $
          </span>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            disabled={isActiveAuction}
            className='w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            name='goal'
            onChange={handleInput}
            type='number'
            placeholder='5000'
            value={inputs.goal || ''}
          />
        </div>
        <p className='text-xs text-gray-500'>Set an inspiring but achievable target</p>
        {inputs?.goal && (
          <div className='bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2'>
            <p className='text-gray-900 font-medium text-sm'>Goal: {formatGoal(inputs?.goal)}</p>
          </div>
        )}
        {errors?.goal && (
          <p className='text-red-600 text-xs flex items-center gap-1'>
            <span className='w-1 h-1 bg-red-600 rounded-full' />
            {errors?.goal}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuctionDetails;
