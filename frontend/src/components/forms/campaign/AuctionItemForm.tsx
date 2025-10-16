import { ArrowLeft, DollarSign, FileText, Gavel, Package, Truck, Upload, X } from 'lucide-react';
import TailwindSpinner from '../../Loaders/TailwindSpinner';
import Switch from '../../common/Switch';
import FileInput from '../../common/FileInput';
import { FC, useState } from 'react';
import { uploadMultipleFilesToFirebase } from '../../../utils/uploadToFirebase';
import { useDeleteAuctionItemPhotoMutation } from '../../../redux/services/campaignApi';
import { useAppDispatch } from '../../../redux/toolkitStore';
import { motion, AnimatePresence } from 'framer-motion';

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
  loading: boolean;
  handleInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setInputs: any;
  handleSubmit: (e: React.FormEvent) => void;
  onClose: any;
  isUpdating?: boolean;
}

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const AuctionItemForm: FC<IAuctionItemForm> = ({ inputs, loading, handleInput, handleToggle, setInputs, handleSubmit, onClose, isUpdating }) => {
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
        formName: isUpdating ? 'auctionItemUpdateForm' : 'auctionItemCreateForm',
        data: { ...inputs, photoAmount: Number(newFiles.length) },
      })
    );

    const images = await uploadMultipleFilesToFirebase(newFiles, true);

    dispatch(
      setInputs({
        formName: isUpdating ? 'auctionItemUpdateForm' : 'auctionItemCreateForm',
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
          formName: isUpdating ? 'auctionItemUpdateForm' : 'auctionItemCreateForm',
          data: { photoIdToDelete: file?._id, photos: inputs?.photos?.filter((photo: any) => photo.url !== file.url) },
        })
      );
      deleteAuctionItemPhoto({ photoId: file._id, auctionItemId: inputs?._id });
    } else {
      dispatch(
        setInputs({
          formName: isUpdating ? 'auctionItemUpdateForm' : 'auctionItemCreateForm',
          data: {
            photos: inputs?.photos?.filter((photo: any) => photo.url !== file.url),
          },
        })
      );
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 relative flex flex-col'>
      <div className='relative w-full max-w-5xl mx-auto px-4 sm:px-8 pt-8 flex flex-col h-screen'>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='mb-8 flex-shrink-0'>
          <button
            onClick={onClose}
            className='group flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200 text-sm font-medium'
          >
            <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
            Back to items
          </button>

          <div>
            <h1 className='text-3xl font-semibold text-gray-900'>{isUpdating ? 'Update' : 'Create'} Auction Item</h1>
            <p className='text-gray-600 mt-2'>Fill in the details below to list your item</p>
          </div>
        </motion.div>

        {/* Scrollable Content */}
        <motion.div variants={containerVariants} initial='hidden' animate='visible' className='space-y-6 overflow-y-auto flex-1 pb-4'>
          {/* Item Details Section */}
          <motion.div variants={itemVariants} className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center gap-2 mb-6'>
              <FileText className='w-5 h-5 text-gray-700' />
              <h2 className='text-lg font-semibold text-gray-900'>Item Details</h2>
            </div>

            <div className='space-y-6'>
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
                  className='w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400 transition-all'
                  placeholder='Enter item name'
                  autoComplete='off'
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-2'>
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  rows={6}
                  value={inputs?.description || ''}
                  onChange={handleInput}
                  placeholder='Provide a detailed description of your item'
                  className='w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400 resize-none transition-all'
                />
              </div>

              {/* Photos */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Photos</label>
                <p className='text-sm text-gray-500 mb-4'>Add up to 10 photos of your item</p>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100'
                >
                  <FileInput
                    id='multiple-images'
                    label={
                      <div className='flex flex-col items-center'>
                        <div className='w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-3'>
                          {isLoading ? (
                            <div className='w-8 h-8 animate-spin rounded-full border-2 border-gray-700 border-t-0' />
                          ) : (
                            <Upload className='w-6 h-6 text-gray-600' />
                          )}
                        </div>
                        <span className='text-sm font-medium text-gray-700'>Click to upload photos</span>
                        <span className='text-xs text-gray-500 mt-1'>PNG, JPG up to 10MB</span>
                      </div>
                    }
                    onChange={editPhotoHandler}
                    multiple
                  />
                </motion.div>

                {/* Photo Preview Grid */}
                <AnimatePresence>
                  {inputs?.photos && inputs?.photos.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4'
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
                            <img src={file.url} alt={file.name} className='w-full h-full object-cover' />
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type='button'
                            onClick={() => deleteImageHandler(file)}
                            className='absolute -top-2 -right-2 w-7 h-7 bg-white border border-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm'
                          >
                            <X className='w-4 h-4' />
                          </motion.button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div variants={itemVariants} className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center gap-2 mb-6'>
              <DollarSign className='w-5 h-5 text-gray-700' />
              <h2 className='text-lg font-semibold text-gray-900'>Pricing & Format</h2>
            </div>

            <div className='space-y-6'>
              {/* Format Selection */}
              <div className='space-y-3'>
                {/* Auction Option */}
                <motion.label
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  htmlFor='auction'
                  className={`relative cursor-pointer transition-all duration-200 block ${
                    inputs?.sellingFormat === 'auction'
                      ? 'bg-teal-50 border-2 border-teal-500'
                      : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                  } rounded-lg p-4`}
                >
                  <div className='flex items-start gap-3'>
                    <input
                      type='radio'
                      name='sellingFormat'
                      value='auction'
                      id='auction'
                      onChange={handleInput}
                      checked={inputs?.sellingFormat === 'auction'}
                      className='mt-1 w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500'
                    />
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <Gavel className='w-4 h-4 text-gray-600' />
                        <span className='font-medium text-gray-900'>Auction</span>
                      </div>
                      <div className='text-sm text-gray-600 mt-1'>Allow buyers to bid on your item</div>
                    </div>
                  </div>
                </motion.label>

                {/* Fixed Price Option */}
                <motion.label
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  htmlFor='fixed'
                  className={`relative cursor-pointer transition-all duration-200 block ${
                    inputs?.sellingFormat === 'fixed'
                      ? 'bg-teal-50 border-2 border-teal-500'
                      : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                  } rounded-lg p-4`}
                >
                  <div className='flex items-start gap-3'>
                    <input
                      type='radio'
                      name='sellingFormat'
                      value='fixed'
                      id='fixed'
                      onChange={handleInput}
                      checked={inputs?.sellingFormat === 'fixed'}
                      className='mt-1 w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500'
                    />
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <Package className='w-4 h-4 text-gray-600' />
                        <span className='font-medium text-gray-900'>Fixed Price</span>
                      </div>
                      <div className='text-sm text-gray-600 mt-1'>Set a buy now price</div>
                    </div>
                  </div>
                </motion.label>
              </div>

              {/* Conditional Fields */}
              <AnimatePresence mode='wait'>
                {inputs?.sellingFormat && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className='bg-gray-50 rounded-lg p-4 space-y-4'
                  >
                    {inputs?.sellingFormat === 'auction' ? (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                        <label htmlFor='startingPrice' className='block text-sm font-medium text-gray-700 mb-2'>
                          Starting Price
                        </label>
                        <div className='relative'>
                          <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>$</span>
                          <input
                            type='number'
                            id='startingPrice'
                            name='startingPrice'
                            min='1'
                            value={inputs?.startingPrice || ''}
                            onChange={handleInput}
                            className='w-full pl-8 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900'
                            placeholder='0.00'
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className='space-y-4'>
                        <div>
                          <label htmlFor='buyNowPrice' className='block text-sm font-medium text-gray-700 mb-2'>
                            Buy Now Price
                          </label>
                          <div className='relative'>
                            <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>$</span>
                            <input
                              type='number'
                              id='buyNowPrice'
                              name='buyNowPrice'
                              min='1'
                              value={inputs?.buyNowPrice || ''}
                              onChange={handleInput}
                              className='w-full pl-8 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900'
                              placeholder='0.00'
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor='totalQuantity' className='block text-sm font-medium text-gray-700 mb-2'>
                            Quantity Available
                          </label>
                          <input
                            type='number'
                            id='totalQuantity'
                            name='totalQuantity'
                            min='1'
                            value={inputs?.totalQuantity || ''}
                            onChange={handleInput}
                            className='w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900'
                            placeholder='1'
                          />
                        </div>

                        <div className='flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200'>
                          <div>
                            <div className='text-sm font-medium text-gray-900'>Digital Product</div>
                            <div className='text-xs text-gray-600'>No physical shipping required</div>
                          </div>
                          <Switch name='isDigital' checked={inputs?.isDigital || false} onChange={handleToggle} />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Shipping Section */}
          <motion.div variants={itemVariants} className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center gap-2 mb-6'>
              <Truck className='w-5 h-5 text-gray-700' />
              <h2 className='text-lg font-semibold text-gray-900'>Shipping</h2>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                <div>
                  <div className='text-sm font-medium text-gray-900'>Requires Shipping</div>
                  <div className='text-xs text-gray-600'>Physical item needs to be shipped</div>
                </div>
                <Switch name='requiresShipping' checked={inputs?.requiresShipping || false} onChange={handleToggle} />
              </div>

              <AnimatePresence>
                {inputs?.requiresShipping && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label htmlFor='shippingCosts' className='block text-sm font-medium text-gray-700 mb-2'>
                      Shipping Cost
                    </label>
                    <div className='relative'>
                      <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>$</span>
                      <input
                        type='number'
                        id='shippingCosts'
                        name='shippingCosts'
                        min='0'
                        value={inputs?.shippingCosts || ''}
                        onChange={handleInput}
                        className='w-full pl-8 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900'
                        placeholder='0.00'
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer - Within Drawer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex-shrink-0 bg-white border-t border-gray-200 -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 mt-6'
        >
          <div className='flex justify-end gap-3'>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='button'
              onClick={onClose}
              className='px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors'
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='submit'
              disabled={loading}
              onClick={handleSubmit}
              className='px-6 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors min-w-[120px] flex items-center justify-center gap-2'
            >
              {loading ? <TailwindSpinner color='fill-white' /> : <>{inputs?._id ? 'Update' : 'Create'} Item</>}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuctionItemForm;
