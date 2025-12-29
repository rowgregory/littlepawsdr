import { ArrowLeft, DollarSign, FileText, Truck, Upload, X } from 'lucide-react';
import TailwindSpinner from '../../Loaders/TailwindSpinner';
import Switch from '../../common/Switch';
import FileInput from '../../common/FileInput';
import { FC, useState } from 'react';
import { uploadMultipleFilesToFirebase } from '../../../utils/uploadToFirebase';
import { useAppDispatch } from '../../../redux/toolkitStore';
import { motion, AnimatePresence } from 'framer-motion';
import { containerVariants, itemVariants } from '../../../lib/constants/motion';
import { useDeleteAuctionItemPhotoMutation } from '../../../redux/services/auctionApi';
import { setInputs } from '../../../redux/features/form/formSlice';
import { useFormInitialize } from '../../../hooks/useFormInitialize';

interface IAuctionItemForm {
  inputs: {
    _id: string;
    name?: string;
    description?: string;
    photos?: any[];
    photoAmount?: number;
    sellingFormat?: 'auction' | 'fixed';
    startingPrice?: number;
    buyNowPrice?: number;
    totalQuantity?: number;
    isDigital?: boolean;
    requiresShipping?: boolean;
    shippingCosts?: number;
    photoIdToDelete?: string;
  };
  errors: any;
  loading: boolean;
  handleInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onClose: any;
  isUpdating?: boolean;
}

const AuctionItemForm: FC<IAuctionItemForm> = ({
  inputs,
  errors,
  loading,
  handleInput,
  handleToggle,
  handleSubmit,
  onClose,
  isUpdating,
}) => {
  const [deleteAuctionItemPhoto] = useDeleteAuctionItemPhotoMutation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const editPhotoHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];

    // Filter out any files that are videos
    const imageFiles = newFiles.filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length !== newFiles.length) {
      alert('Videos are not allowed. Please upload images only.');
      return;
    }

    setIsLoading(true);

    dispatch(
      setInputs({
        formName: 'auctionItemForm',
        data: { ...inputs, photoAmount: Number(newFiles.length) },
      })
    );

    const images = await uploadMultipleFilesToFirebase(newFiles, true);

    dispatch(
      setInputs({
        formName: 'auctionItemForm',
        data: {
          photos: [...(inputs?.photos ?? []), ...images],
          photoAmount: 0,
        },
      })
    );

    setIsLoading(false);
  };

  const deleteImageHandler = async (file: any) => {
    if (file?._id) {
      dispatch(
        setInputs({
          formName: 'auctionItemForm',
          data: {
            photoIdToDelete: file?._id,
            photos: inputs?.photos?.filter((photo: any) => photo.url !== file.url),
          },
        })
      );
      await deleteAuctionItemPhoto({ photoId: file._id, auctionItemId: inputs?._id }).unwrap();
    } else {
      dispatch(
        setInputs({
          formName: 'auctionItemForm',
          data: {
            photos: inputs?.photos?.filter((photo: any) => photo.url !== file.url),
          },
        })
      );
    }
  };

  useFormInitialize({ formName: 'auctionItemForm', data: inputs });

  return (
    <div className='min-h-screen bg-gray-50 relative flex flex-col'>
      <div className='relative w-full max-w-6xl mx-auto px-4 sm:px-8 pt-8 flex flex-col h-screen'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-6 flex-shrink-0'
        >
          <button
            onClick={onClose}
            className='group flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200 text-sm font-medium'
          >
            <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
            Back to items
          </button>

          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              {isUpdating ? 'Update' : 'Create'} Item
            </h1>
          </div>
        </motion.div>

        {/* Content Grid - No Scrolling */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden'
        >
          {/* Left Column - Details & Photos */}
          <motion.div
            variants={itemVariants}
            className='bg-white rounded-lg border border-gray-200 p-6 overflow-y-auto'
          >
            <div className='space-y-6'>
              {/* Item Details Header */}
              <div className='flex items-center gap-2 pb-4 border-b border-gray-200'>
                <FileText className='w-5 h-5 text-gray-700' />
                <h2 className='text-base font-semibold text-gray-900'>Item Details</h2>
              </div>

              {/* Name */}
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
                  Item Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={inputs?.name || ''}
                  onChange={handleInput}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all'
                  placeholder='Enter item name'
                  autoComplete='off'
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  rows={4}
                  value={inputs?.description || ''}
                  onChange={handleInput}
                  placeholder='Provide a detailed description'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400 resize-none transition-all'
                />
              </div>

              {/* Photos */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Photos</label>
                <p className='text-xs text-gray-500 mb-3'>Up to 10 photos</p>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100'
                >
                  <FileInput
                    id='multiple-images'
                    label={
                      <div className='flex flex-col items-center'>
                        <Upload className='w-5 h-5 text-gray-600 mb-2' />
                        <span className='text-xs font-medium text-gray-700'>Upload photos</span>
                      </div>
                    }
                    onChange={editPhotoHandler}
                    multiple
                  />
                </motion.div>

                {/* Photo Preview */}
                <AnimatePresence>
                  {inputs?.photos && inputs?.photos.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className='grid grid-cols-3 gap-3 mt-3'
                    >
                      {inputs?.photos.map((file, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ delay: i * 0.05 }}
                          className='relative group'
                        >
                          <div className='aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200'>
                            <img
                              src={file.url}
                              alt={file.name}
                              className='w-full h-full object-cover'
                            />
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type='button'
                            onClick={() => deleteImageHandler(file)}
                            className='absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm'
                          >
                            <X className='w-3 h-3' />
                          </motion.button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Pricing & Shipping */}
          <motion.div variants={itemVariants} className='space-y-6 overflow-y-auto'>
            {/* Pricing Section */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
              <div className='flex items-center gap-2 pb-4 border-b border-gray-200 mb-4'>
                <DollarSign className='w-5 h-5 text-gray-700' />
                <h2 className='text-base font-semibold text-gray-900'>Pricing & Format</h2>
              </div>

              <div className='space-y-4'>
                {/* Format Selection */}
                <div className='space-y-2'>
                  <motion.label
                    htmlFor='auction'
                    className={`cursor-pointer block p-3 rounded-lg border-2 transition-all ${
                      inputs?.sellingFormat === 'auction'
                        ? 'bg-gray-50 border-gray-900'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <input
                        type='radio'
                        name='sellingFormat'
                        value='auction'
                        id='auction'
                        onChange={handleInput}
                        checked={inputs?.sellingFormat === 'auction'}
                        className='w-4 h-4'
                      />
                      <div>
                        <div className='text-sm font-medium text-gray-900'>Auction</div>
                        <div className='text-xs text-gray-500'>Allow bidding</div>
                      </div>
                    </div>
                  </motion.label>

                  <motion.label
                    htmlFor='fixed'
                    className={`cursor-pointer block p-3 rounded-lg border-2 transition-all ${
                      inputs?.sellingFormat === 'fixed'
                        ? 'bg-gray-50 border-gray-900'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <input
                        type='radio'
                        name='sellingFormat'
                        value='fixed'
                        id='fixed'
                        onChange={handleInput}
                        checked={inputs?.sellingFormat === 'fixed'}
                        className='w-4 h-4'
                      />
                      <div>
                        <div className='text-sm font-medium text-gray-900'>Fixed Price</div>
                        <div className='text-xs text-gray-500'>Set buy now price</div>
                      </div>
                    </div>
                  </motion.label>
                </div>

                {/* Conditional Price Fields */}
                <AnimatePresence mode='wait'>
                  {inputs?.sellingFormat === 'auction' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Starting Price
                      </label>
                      <div className='relative'>
                        <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm'>
                          $
                        </span>
                        <input
                          type='number'
                          name='startingPrice'
                          min='1'
                          value={inputs?.startingPrice || ''}
                          onChange={handleInput}
                          className='w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                          placeholder='0.00'
                        />
                      </div>
                    </motion.div>
                  )}

                  {inputs?.sellingFormat === 'fixed' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='space-y-3'
                    >
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Buy Now Price
                        </label>
                        <div className='relative'>
                          <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm'>
                            $
                          </span>
                          <input
                            type='number'
                            name='buyNowPrice'
                            min='1'
                            value={inputs?.buyNowPrice || ''}
                            onChange={handleInput}
                            className='w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                            placeholder='0.00'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Quantity
                        </label>
                        <input
                          type='number'
                          name='totalQuantity'
                          min='1'
                          value={inputs?.totalQuantity || ''}
                          onChange={handleInput}
                          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                          placeholder='1'
                        />
                      </div>

                      <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200'>
                        <div className='text-sm font-medium text-gray-900'>Digital Product</div>
                        <Switch
                          name='isDigital'
                          checked={inputs?.isDigital || false}
                          onChange={handleToggle}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Shipping Section */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
              <div className='flex items-center gap-2 pb-4 border-b border-gray-200 mb-4'>
                <Truck className='w-5 h-5 text-gray-700' />
                <h2 className='text-base font-semibold text-gray-900'>Shipping</h2>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200'>
                  <div className='text-sm font-medium text-gray-900'>Requires Shipping</div>
                  <Switch
                    name='requiresShipping'
                    checked={inputs?.requiresShipping || false}
                    onChange={handleToggle}
                  />
                </div>

                <AnimatePresence>
                  {inputs?.requiresShipping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Shipping Cost
                      </label>
                      <div className='relative'>
                        <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm'>
                          $
                        </span>
                        <input
                          type='number'
                          name='shippingCosts'
                          min='0'
                          value={inputs?.shippingCosts || ''}
                          onChange={handleInput}
                          className='w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                          placeholder='0.00'
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex-shrink-0 bg-white border-t border-gray-200 -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 mt-6 flex justify-end gap-3'
        >
          <button
            type='button'
            onClick={onClose}
            className='px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm'
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={loading || isLoading}
            onClick={handleSubmit}
            className='px-6 py-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2 min-w-[120px]'
          >
            {loading || isLoading ? (
              <TailwindSpinner color='fill-white' wAndH='w-4 h-4' />
            ) : (
              <>{inputs?._id ? 'Update' : 'Create'} Item</>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AuctionItemForm;
