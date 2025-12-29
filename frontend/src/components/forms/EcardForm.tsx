import { motion } from 'framer-motion';
import { AlertCircle, Upload, X } from 'lucide-react';
import { FC } from 'react';

interface EcardFormProps {
  inputs: any;
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: Record<string, string>;
  isUpdating: boolean;
  loading: boolean;
  onImageUpload?: (file: File) => void;
  image?: string;
  onRemoveImage?: () => void;
}

const EcardForm: FC<EcardFormProps> = ({
  inputs,
  handleInput,
  handleSubmit,
  errors,
  isUpdating,
  loading,
  onImageUpload,
  image,
  onRemoveImage,
}) => {
  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Name */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Ecard Name *</label>
        <input
          type='text'
          name='name'
          value={inputs?.name || ''}
          onChange={handleInput}
          placeholder='Enter ecard name'
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            errors?.name
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-200 focus:ring-gray-200'
          }`}
        />
        {errors?.name && (
          <div className='flex items-center gap-2 mt-1 text-red-600 text-sm'>
            <AlertCircle className='w-4 h-4' />
            {errors.name}
          </div>
        )}
      </div>

      {/* Category */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Category *</label>
        <input
          type='text'
          name='category'
          value={inputs?.category || ''}
          onChange={handleInput}
          placeholder='e.g., Birthday, Holiday, Congratulations'
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            errors?.category
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-200 focus:ring-gray-200'
          }`}
        />
        {errors?.category && (
          <div className='flex items-center gap-2 mt-1 text-red-600 text-sm'>
            <AlertCircle className='w-4 h-4' />
            {errors.category}
          </div>
        )}
      </div>

      {/* Price */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Price *</label>
        <input
          type='number'
          name='price'
          value={inputs?.price || ''}
          onChange={handleInput}
          placeholder='0.00'
          step='0.01'
          min='0'
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            errors?.price
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-200 focus:ring-gray-200'
          }`}
        />
        {errors?.price && (
          <div className='flex items-center gap-2 mt-1 text-red-600 text-sm'>
            <AlertCircle className='w-4 h-4' />
            {errors.price}
          </div>
        )}
      </div>

      {/* Main Image */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Main Image *</label>
        <div className='relative'>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => onImageUpload?.(e.target.files?.[0] as File)}
            className='hidden'
            id='image-upload'
          />
          <label
            htmlFor='image-upload'
            className='flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors'
          >
            <Upload className='w-5 h-5 text-gray-600' />
            <div className='text-center'>
              <p className='text-sm font-medium text-gray-900'>Click to upload image</p>
              <p className='text-xs text-gray-600'>or drag and drop</p>
            </div>
          </label>
        </div>

        {/* Image Preview */}
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='mt-4 relative group bg-gray-50 rounded-lg border border-gray-200 p-4 flex items-center justify-center min-h-48'
          >
            <img src={image} alt='Ecard preview' className='max-w-full max-h-48 object-contain' />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type='button'
              onClick={onRemoveImage}
              className='absolute top-3 right-3 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity'
            >
              <X className='w-4 h-4' />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type='submit'
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className='w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
      >
        {loading ? 'Submitting...' : isUpdating ? 'Update Ecard' : 'Create Ecard'}
      </motion.button>
    </form>
  );
};

export default EcardForm;
