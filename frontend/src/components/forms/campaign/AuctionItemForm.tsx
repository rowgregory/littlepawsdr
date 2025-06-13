import { ArrowLeft, DollarSign, FileText, Gavel, Package, Sparkles, Truck, Upload, X, Zap } from 'lucide-react';
import TailwindSpinner from '../../Loaders/TailwindSpinner';
import Switch from '../../common/Switch';
import FileInput from '../../common/FileInput';
import { FC, useEffect, useState } from 'react';
import { uploadMultipleFilesToFirebase } from '../../../utils/uploadToFirebase';
import { useDeleteAuctionItemPhotoMutation } from '../../../redux/services/campaignApi';
import { useAppDispatch } from '../../../redux/toolkitStore';

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
}

const AuctionItemForm: FC<IAuctionItemForm> = ({ inputs, loading, handleInput, handleToggle, setInputs, handleSubmit, onClose }) => {
  const [deleteAuctionItemPhoto] = useDeleteAuctionItemPhotoMutation();
  const [activeSection, setActiveSection] = useState('details');
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  const editPhotoHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];

    // Filter out any files that are videos
    const imageFiles = newFiles.filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length !== newFiles.length) {
      alert('Videos are not allowed. Please upload images only.');
      return;
    }

    dispatch(setInputs({ formName: 'auctionItemCreateForm', data: { ...inputs, photoAmount: Number(newFiles.length) } }));

    const images = await uploadMultipleFilesToFirebase(newFiles, true);

    dispatch(
      setInputs({
        formName: 'auctionItemCreateForm',
        data: {
          photos: [...images],
          photoAmount: 0,
        },
      })
    );
  };

  const deleteImageHandler = async (file: any) => {
    if (file?._id) {
      dispatch(setInputs({ formName: 'auctionItemCreateForm', data: { ...inputs, photoIdToDelete: file?._id } }));
      deleteAuctionItemPhoto({ photoId: file._id, auctionItemId: inputs?._id });
    } else {
      dispatch(
        setInputs({
          formName: 'auctionItemCreateForm',
          data: {
            photos: inputs?.photos?.filter((photo: any) => photo.url !== file.url),
          },
        })
      );
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-600/20 blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-600/10 blur-3xl animate-pulse delay-500'></div>
      </div>

      {/* Glass Container */}
      <div className='relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 py-6'>
        {/* Header */}
        <div className='mb-8 sm:mb-12'>
          <button
            onClick={onClose}
            className='group flex items-center gap-3 text-gray-300 hover:text-white mb-6 transition-all duration-300 text-sm sm:text-base hover:scale-105'
          >
            <div className='p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300'>
              <ArrowLeft className='w-4 h-4' />
            </div>
            Back to items
          </button>

          <div className='flex items-center gap-4 mb-4'>
            <div className='p-3 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/25'>
              <Gavel className='w-8 h-8 text-white' />
            </div>
            <div>
              <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent'>
                Create Auction Item
              </h1>
              <p className='text-gray-400 mt-1'>Build something amazing for your auction</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className='flex items-center gap-2 mt-6'>
            <div
              className={`h-2 w-16 rounded-full transition-all duration-500 ${
                activeSection === 'details' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/20'
              }`}
            ></div>
            <div
              className={`h-2 w-16 rounded-full transition-all duration-500 ${
                activeSection === 'pricing' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/20'
              }`}
            ></div>
            <div
              className={`h-2 w-16 rounded-full transition-all duration-500 ${
                activeSection === 'shipping' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/20'
              }`}
            ></div>
          </div>
        </div>
        <div className='overflow-y-auto p-5'>
          <div className='space-y-8 h-[calc(100dvh-300px)] '>
            {/* Item Details Section */}
            <div
              className='group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.01]'
              onMouseEnter={() => setActiveSection('details')}
            >
              <div className='absolute -top-2 -right-2 p-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'>
                <FileText className='w-5 h-5 text-white' />
              </div>

              <div className='flex items-center gap-3 mb-6'>
                <Sparkles className='w-6 h-6 text-yellow-400' />
                <h2 className='text-xl sm:text-2xl font-bold text-white'>Item Details</h2>
              </div>

              <div className='grid grid-cols-1 gap-8'>
                {/* Name */}
                <div className='space-y-3'>
                  <label htmlFor='name' className='text-sm font-semibold text-gray-200 flex items-center gap-2'>
                    <div className='w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500'></div>
                    Item Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={inputs?.name || ''}
                    onChange={handleInput}
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-white/15'
                    placeholder='Enter item name...'
                    autoComplete='off'
                  />
                </div>

                {/* Description */}
                <div className='space-y-3 lg:row-span-2'>
                  <label htmlFor='description' className='text-sm font-semibold text-gray-200 flex items-center gap-2'>
                    <div className='w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500'></div>
                    Description
                  </label>
                  <textarea
                    id='description'
                    name='description'
                    rows={8}
                    value={inputs?.description || ''}
                    onChange={handleInput}
                    placeholder='Describe your amazing item...'
                    className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm resize-none transition-all duration-300 hover:bg-white/15'
                  />
                </div>

                {/* Photos */}
                <div className='space-y-4'>
                  <label className='text-sm font-semibold text-gray-200 flex items-center gap-2'>
                    <div className='w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-red-500'></div>
                    Photos
                  </label>
                  <p className='text-sm text-gray-400'>Showcase your item with stunning images</p>

                  <div className='relative group'>
                    <div className='border-2 border-dashed border-white/30 rounded-2xl p-8 sm:p-12 text-center hover:border-blue-400 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 group-hover:from-blue-500/10 group-hover:to-purple-500/10'>
                      <FileInput
                        id='multiple-images'
                        label={
                          <div className='flex flex-col items-center cursor-pointer'>
                            <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300'>
                              <Upload className='w-8 h-8 text-white' />
                            </div>
                            <span className='text-blue-400 font-semibold text-lg group-hover:text-blue-300 transition-colors'>
                              Click to add photos
                            </span>
                          </div>
                        }
                        onChange={editPhotoHandler}
                        multiple
                      />
                    </div>
                  </div>

                  {/* Photo Preview Grid */}
                  {inputs?.photos && inputs?.photos.length > 0 && (
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6'>
                      {inputs?.photos.map((file, i) => (
                        <div key={i} className='relative group'>
                          <div className='aspect-square bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300'>
                            <img src={file.url} alt={file.name} className='w-full h-full object-cover' />
                          </div>
                          <button
                            type='button'
                            onClick={() => deleteImageHandler(file)}
                            disabled={loading && file._id === inputs?.photoIdToDelete}
                            className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg shadow-red-500/25'
                          >
                            {loading && file._id === inputs?.photoIdToDelete ? <TailwindSpinner color='fill-white' /> : <X className='w-4 h-4' />}
                          </button>
                          <div className='mt-3 p-2 bg-white/10 rounded-lg backdrop-blur-sm'>
                            <p className='text-xs text-gray-300 truncate font-medium'>{file.name}</p>
                            <p className='text-xs text-gray-400'>{file.size}KB</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div
              className='group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.01]'
              onMouseEnter={() => setActiveSection('pricing')}
            >
              <div className='absolute -top-2 -right-2 p-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg'>
                <DollarSign className='w-5 h-5 text-white' />
              </div>

              <div className='flex items-center gap-3 mb-8'>
                <Zap className='w-6 h-6 text-yellow-400' />
                <h2 className='text-xl sm:text-2xl font-bold text-white'>Selling Format</h2>
              </div>

              <div className='space-y-6'>
                {/* Format Selection */}
                <div className='grid grid-cols-1 gap-4'>
                  {/* Auction Option */}
                  <label
                    htmlFor='auction'
                    className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                      inputs?.sellingFormat === 'auction'
                        ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-2 border-blue-400 shadow-lg shadow-blue-500/25'
                        : 'bg-white/10 border-2 border-white/20 hover:border-white/40'
                    } rounded-2xl p-6 backdrop-blur-sm`}
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    <div className='relative flex items-start gap-4'>
                      <div className='mt-1'>
                        <input
                          type='radio'
                          name='sellingFormat'
                          value='auction'
                          id='auction'
                          onChange={handleInput}
                          checked={inputs?.sellingFormat === 'auction'}
                          className='w-5 h-5 text-blue-600 border-2 border-white/40 bg-transparent focus:ring-blue-500'
                        />
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2'>
                          <Gavel className='w-5 h-5 text-blue-400' />
                          <div className='font-bold text-white text-lg'>Auction Style</div>
                        </div>
                        <div className='text-sm text-gray-300'>Create excitement with competitive bidding</div>
                      </div>
                    </div>
                  </label>

                  {/* Fixed Price Option */}
                  <label
                    htmlFor='fixed'
                    className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                      inputs?.sellingFormat === 'fixed'
                        ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-2 border-green-400 shadow-lg shadow-green-500/25'
                        : 'bg-white/10 border-2 border-white/20 hover:border-white/40'
                    } rounded-2xl p-6 backdrop-blur-sm`}
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    <div className='relative flex items-start gap-4'>
                      <div className='mt-1'>
                        <input
                          type='radio'
                          name='sellingFormat'
                          value='fixed'
                          id='fixed'
                          onChange={handleInput}
                          checked={inputs?.sellingFormat === 'fixed'}
                          className='w-5 h-5 text-green-600 border-2 border-white/40 bg-transparent focus:ring-green-500'
                        />
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2'>
                          <Package className='w-5 h-5 text-green-400' />
                          <div className='font-bold text-white text-lg'>Fixed Price</div>
                        </div>
                        <div className='text-sm text-gray-300'>Instant purchase at set price</div>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Conditional Fields */}
                <div className='bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10'>
                  {inputs?.sellingFormat === 'auction' ? (
                    <div className='space-y-4'>
                      <label htmlFor='startingPrice' className='text-sm font-semibold text-gray-200 flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500'></div>
                        Starting Price
                      </label>
                      <div className='relative'>
                        <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold text-lg'>$</span>
                        <input
                          type='number'
                          id='startingPrice'
                          name='startingPrice'
                          min='1'
                          value={inputs?.startingPrice || ''}
                          onChange={handleInput}
                          className='w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg font-semibold placeholder-gray-400 backdrop-blur-sm transition-all duration-300'
                          placeholder='0.00'
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='space-y-6'>
                      <div>
                        <label htmlFor='buyNowPrice' className='text-sm font-semibold text-gray-200 flex items-center gap-2 mb-4'>
                          <div className='w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500'></div>
                          Buy Now Price
                        </label>
                        <div className='relative'>
                          <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold text-lg'>$</span>
                          <input
                            type='number'
                            id='buyNowPrice'
                            name='buyNowPrice'
                            min='1'
                            value={inputs?.buyNowPrice || ''}
                            onChange={handleInput}
                            className='w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white text-lg font-semibold placeholder-gray-400 backdrop-blur-sm transition-all duration-300'
                            placeholder='0.00'
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor='totalQuantity' className='text-sm font-semibold text-gray-200 flex items-center gap-2 mb-4'>
                          <div className='w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500'></div>
                          Total Quantity
                        </label>
                        <input
                          type='number'
                          id='totalQuantity'
                          name='totalQuantity'
                          min='1'
                          value={inputs?.totalQuantity || ''}
                          onChange={handleInput}
                          className='w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-lg font-semibold placeholder-gray-400 backdrop-blur-sm transition-all duration-300'
                        />
                      </div>

                      <div className='flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm'>
                        <div>
                          <div className='font-bold text-white flex items-center gap-2'>
                            <div className='w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500'></div>
                            Digital Product
                          </div>
                          <div className='text-sm text-gray-400 mt-1'>No physical shipping required</div>
                        </div>
                        <Switch name='isDigital' checked={inputs?.isDigital || false} onChange={handleToggle} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Section */}
            <div
              className='group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.01]'
              onMouseEnter={() => setActiveSection('shipping')}
            >
              <div className='absolute -top-2 -right-2 p-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg'>
                <Truck className='w-5 h-5 text-white' />
              </div>

              <div className='flex items-center gap-3 mb-8'>
                <Truck className='w-6 h-6 text-blue-400' />
                <h2 className='text-xl sm:text-2xl font-bold text-white'>Shipping & Fulfillment</h2>
              </div>

              <div className='space-y-6'>
                <div className='flex items-center justify-between p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm'>
                  <div>
                    <div className='font-bold text-white flex items-center gap-2 text-lg'>
                      <div className='w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500'></div>
                      Requires Shipping
                    </div>
                    <div className='text-sm text-gray-400 mt-1'>Physical item needs to be mailed</div>
                  </div>
                  <Switch name='requiresShipping' checked={inputs?.requiresShipping || false} onChange={handleToggle} />
                </div>

                {inputs?.requiresShipping && (
                  <div className='bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 space-y-4'>
                    <label htmlFor='shippingCosts' className='text-sm font-semibold text-gray-200 flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500'></div>
                      Shipping Costs
                    </label>
                    <div className='relative'>
                      <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold text-lg'>$</span>
                      <input
                        type='number'
                        id='shippingCosts'
                        name='shippingCosts'
                        min='0'
                        value={inputs?.shippingCosts ?? ''}
                        onChange={handleInput}
                        className='w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white text-lg font-semibold placeholder-gray-400 backdrop-blur-sm transition-all duration-300'
                        placeholder='0.00'
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-center pt-8'>
              <button
                type='submit'
                disabled={loading}
                onClick={handleSubmit}
                className='group relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 min-w-[200px] flex items-center justify-center gap-3 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 transform'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='relative flex items-center gap-3'>
                  {loading ? (
                    <TailwindSpinner color='fill-white' />
                  ) : (
                    <>
                      <Sparkles className='w-5 h-5' />
                      {inputs?._id ? 'Update' : 'Create'} Auction Item
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionItemForm;
