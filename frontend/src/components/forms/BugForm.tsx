import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { FC } from 'react';
import { useUserSelector } from '../../redux/toolkitStore';

interface BugFormProps {
  inputs: any;
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: Record<string, string>;
  isUpdating: boolean;
  loading: boolean;
}

const BugForm: FC<BugFormProps> = ({
  inputs,
  handleInput,
  handleSubmit,
  errors,
  isUpdating,
  loading,
}) => {
  const { user } = useUserSelector();
  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Title */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Bug Title *</label>
        <input
          type='text'
          name='title'
          value={inputs?.title || ''}
          onChange={handleInput}
          placeholder='Brief description of the bug'
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            errors?.title
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-200 focus:ring-gray-200'
          }`}
        />
        {errors?.title && (
          <div className='flex items-center gap-2 mt-1 text-red-600 text-sm'>
            <AlertCircle className='w-4 h-4' />
            {errors.title}
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Description *</label>
        <textarea
          name='description'
          value={inputs?.description || ''}
          onChange={handleInput}
          placeholder='Detailed explanation of the issue'
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
            errors?.description
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-200 focus:ring-gray-200'
          }`}
        />
        {errors?.description && (
          <div className='flex items-center gap-2 mt-1 text-red-600 text-sm'>
            <AlertCircle className='w-4 h-4' />
            {errors.description}
          </div>
        )}
      </div>

      {/* Three Column Row */}
      <div className='grid grid-cols-3 gap-4'>
        {/* Severity */}
        <div>
          <label className='block text-sm font-semibold text-gray-900 mb-2'>Severity</label>
          <select
            name='severity'
            value={inputs?.severity || 'medium'}
            onChange={handleInput}
            className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'
          >
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
            <option value='critical'>Critical</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className='block text-sm font-semibold text-gray-900 mb-2'>Category</label>
          <select
            name='category'
            value={inputs?.category || 'other'}
            onChange={handleInput}
            className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'
          >
            <option value='ui'>UI</option>
            <option value='functionality'>Functionality</option>
            <option value='performance'>Performance</option>
            <option value='payment'>Payment</option>
            <option value='other'>Other</option>
          </select>
        </div>

        {/* Status - Only show when updating */}
        {isUpdating && (
          <div>
            <label className='block text-sm font-semibold text-gray-900 mb-2'>Status</label>
            <select
              name='status'
              value={inputs?.status || 'open'}
              onChange={handleInput}
              className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'
            >
              <option value='open'>Open</option>
              {user?.isAdmin && <option value='in-progress'>In Progress</option>}
              <option value='resolved'>Resolved</option>
              <option value='closed'>Closed</option>
            </select>
          </div>
        )}
      </div>

      {/* URL */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>
          Page URL (where the bug occurred)
        </label>
        <input
          type='text'
          name='url'
          value={inputs?.url || ''}
          onChange={handleInput}
          placeholder='https://example.com/page'
          className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'
        />
      </div>

      {/* Steps to Reproduce */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Steps to Reproduce</label>
        <textarea
          name='steps'
          value={inputs?.steps || ''}
          onChange={handleInput}
          placeholder='1. Click on...
2. Then...
3. Expected...'
          rows={3}
          className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none'
        />
      </div>

      {/* Expected Behavior */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Expected Behavior</label>
        <textarea
          name='expectedBehavior'
          value={inputs?.expectedBehavior || ''}
          onChange={handleInput}
          placeholder='What should happen...'
          rows={2}
          className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none'
        />
      </div>

      {/* Actual Behavior */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Actual Behavior</label>
        <textarea
          name='actualBehavior'
          value={inputs?.actualBehavior || ''}
          onChange={handleInput}
          placeholder='What actually happens...'
          rows={2}
          className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none'
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type='submit'
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className='w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
      >
        {loading ? 'Updating...' : isUpdating ? 'Update Bug Report' : 'Submit Bug Report'}
      </motion.button>
    </form>
  );
};

export default BugForm;
