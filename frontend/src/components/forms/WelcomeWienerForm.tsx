import { motion } from 'framer-motion';
import { AlertCircle, Plus, Trash2, Upload, X } from 'lucide-react';
import { FC, useState } from 'react';

interface WelcomeWienerFormProps {
  inputs: any;
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: Record<string, string>;
  isUpdating: boolean;
  loading: boolean;
  onImageUpload?: (files: FileList) => void;
  onRemoveImage?: (index: number) => void;
  handleToggle?: any;
  availableProducts?: any[];
  selectedProducts?: any[];
  onAddProduct?: (product: any) => void;
  onRemoveProduct?: (productId: string) => void;
  onCreateProduct?: (product: any) => void;
}

const WelcomeWienerForm: FC<WelcomeWienerFormProps> = ({
  inputs,
  handleInput,
  handleSubmit,
  errors,
  isUpdating,
  loading,
  onImageUpload,
  onRemoveImage,
  handleToggle,
  availableProducts = [],
  selectedProducts = [],
  onAddProduct,
  onRemoveProduct,
  onCreateProduct,
}) => {
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
  });

  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill in name and price');
      return;
    }

    onCreateProduct?.({
      ...newProduct,
      price: parseFloat(newProduct.price),
    });

    setNewProduct({ name: '', price: '', description: '' });
    setShowCreateProduct(false);
  };
  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Name */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Dachshund Name *</label>
        <input
          type='text'
          name='name'
          value={inputs?.name || ''}
          onChange={handleInput}
          placeholder={`Enter the dachshund's name`}
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

      {/* Bio */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Bio *</label>
        <textarea
          name='bio'
          value={inputs?.bio || ''}
          onChange={handleInput}
          placeholder='Tell the story of this dachshund'
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
            errors?.bio
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-200 focus:ring-gray-200'
          }`}
        />
        {errors?.bio && (
          <div className='flex items-center gap-2 mt-1 text-red-600 text-sm'>
            <AlertCircle className='w-4 h-4' />
            {errors.bio}
          </div>
        )}
      </div>

      {/* Age */}
      <div>
        <label className='block text-sm font-semibold text-gray-900 mb-2'>Age</label>
        <input
          type='text'
          name='age'
          value={inputs?.age || ''}
          onChange={handleInput}
          placeholder='e.g., 3 years old, 5 months'
          className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'
        />
      </div>

      {/* Images Upload */}
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
            </div>
          </label>
        </div>

        {/* Image Preview */}
        {inputs?.images && inputs.images.length > 0 && (
          <div className='mt-4'>
            <p className='text-xs font-semibold text-gray-600 mb-3'>
              Uploaded Images ({inputs.images.length})
            </p>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
              {inputs.images.map((image, idx) => (
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

      {/* Associated Products */}
      <div className='border-t border-gray-200 pt-6'>
        <div className='flex items-center justify-between mb-4'>
          <label className='block text-sm font-semibold text-gray-900'>
            Associated Donation Products
          </label>
          <motion.button
            type='button'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateProduct(!showCreateProduct)}
            className='flex items-center gap-2 px-3 py-1 text-sm bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors'
          >
            <Plus className='w-4 h-4' />
            New Product
          </motion.button>
        </div>

        {/* Create New Product Section */}
        {showCreateProduct && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4'
          >
            <h4 className='font-semibold text-gray-900'>Create New Product</h4>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-xs font-semibold text-gray-900 mb-1'>
                  Product Name *
                </label>
                <input
                  type='text'
                  name='name'
                  value={newProduct.name}
                  onChange={handleNewProductChange}
                  placeholder='e.g., Toy Donation'
                  className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-900 mb-1'>Price *</label>
                <input
                  type='number'
                  name='price'
                  value={newProduct.price}
                  onChange={handleNewProductChange}
                  placeholder='19.99'
                  step='0.01'
                  min='0'
                  className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-900 mb-1'>Description</label>
              <textarea
                name='description'
                value={newProduct.description}
                onChange={handleNewProductChange}
                placeholder='Brief description of the product'
                rows={2}
                className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm resize-none'
              />
            </div>

            <div className='flex gap-2'>
              <motion.button
                type='button'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreateProduct}
                className='flex-1 px-3 py-2 bg-gray-900 text-white font-semibold text-sm rounded-lg hover:bg-gray-800 transition-colors'
              >
                Create Product
              </motion.button>
              <motion.button
                type='button'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCreateProduct(false)}
                className='flex-1 px-3 py-2 bg-gray-100 text-gray-900 font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors'
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Available Products List */}
        {availableProducts.length > 0 && (
          <div className='mb-6'>
            <p className='text-xs font-semibold text-gray-600 mb-3'>
              Select from existing products:
            </p>
            <div className='space-y-2 max-h-48 overflow-y-auto'>
              {availableProducts.map((product) => (
                <motion.div
                  key={product._id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onAddProduct?.(product)}
                  className='p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <p className='text-sm font-semibold text-gray-900'>{product.name}</p>
                      <p className='text-xs text-gray-600 mt-1'>{product.description}</p>
                      <p className='text-sm font-bold text-gray-900 mt-2'>${product.price}</p>
                    </div>
                    <Plus className='w-4 h-4 text-gray-600 ml-2 flex-shrink-0 mt-1' />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Products */}
        {selectedProducts && selectedProducts.length > 0 && (
          <div>
            <p className='text-xs font-semibold text-gray-600 mb-3'>
              Associated Products ({selectedProducts.length})
            </p>
            <div className='space-y-2'>
              {selectedProducts.map((product, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className='p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start justify-between'
                >
                  <div className='flex-1'>
                    <p className='text-sm font-semibold text-gray-900'>{product.name}</p>
                    <p className='text-xs text-gray-600 mt-1'>${product.price}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type='button'
                    onClick={() => onRemoveProduct?.(product._id)}
                    className='p-1 text-red-600 hover:bg-red-50 rounded transition-colors'
                  >
                    <Trash2 className='w-4 h-4' />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {(!selectedProducts || selectedProducts.length === 0) &&
          !showCreateProduct &&
          availableProducts.length === 0 && (
            <p className='text-sm text-gray-600 text-center py-4'>
              No products yet. Create one to get started!
            </p>
          )}
      </div>

      {/* Is Live */}
      <div>
        <label className='flex items-center gap-3 cursor-pointer'>
          <input
            type='checkbox'
            name='isLive'
            checked={inputs?.isLive || false}
            onChange={handleToggle}
            className='w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-200'
          />
          <span className='text-sm font-medium text-gray-900'>
            Make this dachshund live and available for donations
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <motion.button
        type='submit'
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className='w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
      >
        {loading ? 'Submitting...' : isUpdating ? 'Update Dachshund' : 'Create Dachshund'}
      </motion.button>
    </form>
  );
};

export default WelcomeWienerForm;
