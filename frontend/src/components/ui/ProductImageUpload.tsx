import { useRef, useState } from 'react';
import { useDeleteProductPhotoMutation } from '../../redux/services/productApi';
import { uploadMultipleFilesToFirebase } from '../../utils/uploadToFirebase';
import TailwindSpinner from '../Loaders/TailwindSpinner';

interface ProductImageUploadProps {
  images: string[];
  onImagesChange: (updater: (prev: any) => any) => void;
  onErrorsChange: (updater: (prev: any) => any) => void;
  productId?: string;
  error?: string;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({ images = [], onImagesChange, onErrorsChange, productId, error }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [photoAmount, setPhotoAmount] = useState(0);
  const [deletePhoto] = useDeleteProductPhotoMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter((file) => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      onErrorsChange((prev: any) => ({
        ...prev,
        images: 'Please upload only JPEG, PNG, or WebP images',
      }));
      return;
    }

    // Validate file sizes (max 5MB each)
    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      onErrorsChange((prev: any) => ({
        ...prev,
        images: 'Each image must be smaller than 5MB',
      }));
      return;
    }

    setPhotoAmount(files.length);

    try {
      const uploadedImages = await uploadMultipleFilesToFirebase(files);
      onImagesChange((prev: any) => ({
        ...prev,
        images: prev.images ? [...prev.images, ...uploadedImages] : uploadedImages,
      }));
      onErrorsChange((prev: any) => ({ ...prev, images: '' }));
    } catch (err) {
      onErrorsChange((prev: any) => ({
        ...prev,
        images: 'Failed to upload images. Please try again.',
      }));
    } finally {
      setPhotoAmount(0);
      // Reset input
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
    }
  };

  const handlePhotoDelete = async (index: number) => {
    if (!productId) return;
    try {
      await deletePhoto({ productId, photoId: index });
      onImagesChange((prev: any) => ({
        ...prev,
        images: prev.images.filter((_: any, i: number) => i !== index),
      }));
    } catch (err) {
      console.error('Failed to delete image:', err);
    }
  };

  const handleUploadClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <div className='space-y-4'>
      {/* Upload Area */}
      <div className='border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors duration-200'>
        <div onClick={handleUploadClick} className='cursor-pointer flex flex-col items-center justify-center py-8 px-4'>
          <div className='w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4'>
            <i className='fas fa-cloud-upload-alt text-2xl text-blue-500'></i>
          </div>
          <p className='text-lg font-medium text-gray-900 mb-2'>Upload Product Images</p>
          <div className='flex items-center space-x-4 text-xs text-gray-400'>
            <span>• JPEG, PNG, WebP</span>
            <span>• Max 5MB each</span>
            <span>• Up to 10 images</span>
          </div>
        </div>

        <input
          ref={inputFileRef}
          type='file'
          multiple
          accept='image/jpeg,image/jpg,image/png,image/webp'
          onChange={handleImageUpload}
          className='hidden'
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className='flex items-center space-x-2 text-red-600 text-sm'>
          <i className='fas fa-exclamation-circle'></i>
          <span>{error}</span>
        </div>
      )}

      {/* Image Gallery */}
      {(images.length > 0 || photoAmount > 0) && (
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-gray-900'>Uploaded Images ({images.length})</h4>

          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {/* Existing Images */}
            {images.map((img: string, index: number) => (
              <div key={index} className='relative group'>
                <div className='aspect-square overflow-hidden rounded-lg border border-gray-200'>
                  <img src={img} alt={`Product ${index + 1}`} className='w-full h-full object-cover' />
                </div>

                {/* Delete Button */}
                <button
                  type='button'
                  onClick={() => handlePhotoDelete(index)}
                  className='absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hover:bg-red-600'
                  title='Delete image'
                >
                  <i className='fas fa-times text-xs'></i>
                </button>

                {/* Image Number */}
                <div className='absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded'>{index + 1}</div>
              </div>
            ))}

            {/* Loading Placeholders */}
            {Array.from({ length: photoAmount }).map((_, index) => (
              <div
                key={`loading-${index}`}
                className='aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50'
              >
                <div className='text-center'>
                  <TailwindSpinner color='fill-blue-500' />
                  <p className='text-xs text-gray-500 mt-2'>Uploading...</p>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Tips */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <div className='flex items-start space-x-2'>
              <i className='fas fa-lightbulb text-blue-500 mt-0.5'></i>
              <div className='text-sm text-blue-700'>
                <p className='font-medium mb-1'>Image Tips:</p>
                <ul className='space-y-1 text-xs'>
                  <li>• Use high-quality images with good lighting</li>
                  <li>• Show your product from multiple angles</li>
                  <li>• First image will be used as the main product image</li>
                  <li>• Click on any image to delete it</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageUpload;
