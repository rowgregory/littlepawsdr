import { motion } from 'framer-motion';
import { AlertCircle, Upload, X, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';

interface ProductFormProps {
  inputs: any;
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: Record<string, string>;
  isUpdating: boolean;
  loading: boolean;
  onImageUpload?: (files: FileList) => void;
  images?: string[];
  onRemoveImage?: (index: number) => void;
  handleToggle?: any;
}

const ProductForm: FC<ProductFormProps> = ({
  inputs,
  handleInput,
  handleSubmit,
  errors,
  isUpdating,
  loading,
  onImageUpload,
  images = [],
  onRemoveImage,
  handleToggle,
}) => {
  const [newSize, setNewSize] = useState({ size: '', amount: '' });

  const handleAddSize = () => {
    if (!newSize.size || !newSize.amount) {
      alert('Please fill in size and amount');
      return;
    }

    const currentSizes = inputs?.sizes || [];
    const updatedSizes = [
      ...currentSizes,
      { size: newSize.size, amount: parseInt(newSize.amount) },
    ];

    handleInput({
      target: {
        name: 'sizes',
        value: updatedSizes,
      },
    } as any);

    setNewSize({ size: '', amount: '' });
  };

  const handleRemoveSize = (index: number) => {
    const currentSizes = inputs?.sizes || [];
    const updatedSizes = currentSizes.filter((_: any, i: number) => i !== index);

    handleInput({
      target: {
        name: 'sizes',
        value: updatedSizes,
      },
    } as any);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Name */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Product Name *</label>
        <input
          type='text'
          name='name'
          value={inputs?.name || ''}
          onChange={handleInput}
          placeholder='Enter product name'
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

      {/* Description */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Description</label>
        <textarea
          name='description'
          value={inputs?.description || ''}
          onChange={handleInput}
          placeholder='Product description'
          rows={4}
          className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none'
        />
      </div>

      {/* Category */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Category</label>
        <input
          type='text'
          name='category'
          value={inputs?.category || ''}
          onChange={handleInput}
          placeholder='e.g., Toys, Treats, Apparel'
          className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'
        />
      </div>

      {/* Two Column Row */}
      <div className='grid grid-cols-2 gap-4'>
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
      </div>

      {/* Two Column Row */}
      <div className='grid grid-cols-2 gap-4'>
        {/* Count in Stock */}
        <div>
          <label className='block text-sm font-semibold text-gray-900 mb-2'>Count in Stock</label>
          <input
            type='number'
            name='countInStock'
            value={inputs?.countInStock || ''}
            onChange={handleInput}
            placeholder='0'
            min='0'
            className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'
          />
        </div>
        {/* Out of Stock Status */}
        <div>
          <label className='block text-sm font-semibold text-gray-900 mb-2'>Stock Status</label>
          <div className='flex items-center h-10 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50'>
            <span
              className={`text-sm font-semibold ${
                Number(inputs?.countInStock) === 0 ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {Number(inputs?.countInStock) === 0 ? 'Out of Stock' : 'In Stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Product Type */}
      <div>
        <label className='flex items-center gap-3 cursor-pointer'>
          <input
            type='checkbox'
            name='isPhysicalProduct'
            checked={inputs?.isPhysicalProduct !== false}
            onChange={handleToggle}
            className='w-4 h-4 rounded border-gray-300'
          />
          <span className='text-sm font-medium text-gray-900'>
            Physical Product (requires shipping)
          </span>
        </label>
      </div>

      {/* Shipping Price - Only show if physical product */}
      {inputs?.isPhysicalProduct !== false && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <label className='block text-sm font-semibold text-gray-900 mb-2'>Shipping Price</label>
            <input
              type='number'
              name='shippingPrice'
              value={inputs?.shippingPrice || ''}
              onChange={handleInput}
              placeholder='0.00'
              step='0.01'
              min='0'
              className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'
            />
          </div>
        </motion.div>
      )}

      {/* Gallery Images */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Gallery Images</label>
        <div className='relative'>
          <input
            type='file'
            multiple
            accept='image/*'
            onChange={(e) => onImageUpload?.(e.target.files as FileList)}
            className='hidden'
            id='image-upload'
          />
          <label
            htmlFor='image-upload'
            className='flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors'
          >
            <Upload className='w-5 h-5 text-gray-600' />
            <div className='text-center'>
              <p className='text-sm font-medium text-gray-900'>Click to upload images</p>
              <p className='text-xs text-gray-600'>or drag and drop</p>
            </div>
          </label>
        </div>

        {/* Image Preview */}
        {images && images.length > 0 && (
          <div className='mt-4'>
            <p className='text-xs font-semibold text-gray-600 mb-3'>
              Uploaded Images ({images.length})
            </p>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
              {images.map((image, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='relative group'
                >
                  <img
                    src={image}
                    alt={`Gallery ${idx}`}
                    className='w-full h-24 object-cover rounded-lg border border-gray-200'
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type='button'
                    onClick={() => onRemoveImage?.(idx)}
                    className='absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    <X className='w-4 h-4' />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Has Sizes */}
      <div>
        <label className='flex items-center gap-3 cursor-pointer'>
          <input
            type='checkbox'
            name='hasSizes'
            checked={inputs?.hasSizes || false}
            onChange={handleToggle}
            className='w-4 h-4 rounded border-gray-300'
          />
          <span className='text-sm font-medium text-gray-900'>This product has sizes</span>
        </label>
      </div>

      {/* Sizes */}
      {inputs?.hasSizes && (
        <div className='border-t border-gray-200 pt-6'>
          <label className='block text-sm font-semibold text-gray-900 mb-4'>Product Sizes</label>

          {/* Add New Size */}
          <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4 space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-xs font-semibold text-gray-900 mb-1'>Size</label>
                <input
                  type='text'
                  value={newSize.size}
                  onChange={(e) => setNewSize({ ...newSize, size: e.target.value })}
                  placeholder='e.g., XS, S, M, L'
                  className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm'
                />
              </div>
              <div>
                <label className='block text-xs font-semibold text-gray-900 mb-1'>Amount</label>
                <input
                  type='number'
                  value={newSize.amount}
                  onChange={(e) => setNewSize({ ...newSize, amount: e.target.value })}
                  placeholder='0'
                  min='0'
                  className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm'
                />
              </div>
            </div>
            <motion.button
              type='button'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddSize}
              className='w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-900 text-white font-semibold text-sm rounded-lg hover:bg-gray-800 transition-colors'
            >
              <Plus className='w-4 h-4' />
              Add Size
            </motion.button>
          </div>

          {/* Size List */}
          {inputs?.sizes && inputs.sizes.length > 0 && (
            <div className='space-y-2'>
              <p className='text-xs font-semibold text-gray-600 mb-3'>
                Sizes ({inputs.sizes.length})
              </p>
              {inputs.sizes.map((sizeObj: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className='p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between'
                >
                  <div>
                    <p className='text-sm font-semibold text-gray-900'>{sizeObj.size}</p>
                    <p className='text-xs text-gray-600'>Amount: {sizeObj.amount}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type='button'
                    onClick={() => handleRemoveSize(idx)}
                    className='p-1 text-red-600 hover:bg-red-50 rounded transition-colors'
                  >
                    <Trash2 className='w-4 h-4' />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <motion.button
        type='submit'
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className='w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
      >
        {loading ? 'Submitting...' : isUpdating ? 'Update Product' : 'Create Product'}
      </motion.button>
    </form>
  );
};

export default ProductForm;
