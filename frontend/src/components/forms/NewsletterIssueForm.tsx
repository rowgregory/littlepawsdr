import React from 'react';
import { useAppDispatch } from '../../redux/toolkitStore';
import { setInputs } from '../../redux/features/form/formSlice';
import { uploadMultipleFilesToFirebase } from '../../utils/uploadToFirebase';
import { Upload, X } from 'lucide-react';
import FileInput from '../common/FileInput';
import { AnimatePresence, motion } from 'framer-motion';

const NewsletterIssueForm = ({
  inputs,
  errors,
  handleInput,
  handleSubmit,
  isLoading,
  isUpdating,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const editPhotoHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];

    // Filter out any files that are videos
    const imageFiles = newFiles.filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length !== newFiles.length) {
      alert('Videos are not allowed. Please upload images only.');
      return;
    }

    dispatch(
      setInputs({
        formName: 'newsletterIssueForm',
        data: { ...inputs, photoAmount: Number(newFiles.length) },
      })
    );

    const images = await uploadMultipleFilesToFirebase(newFiles, true);

    dispatch(
      setInputs({
        formName: 'newsletterIssueForm',
        data: {
          photos: [...(inputs?.photos ?? []), ...images],
          photoAmount: 0,
        },
      })
    );
  };

  const deleteImageHandler = async (file: any) => {
    if (file?._id) {
      dispatch(
        setInputs({
          formName: 'newsletterIssueForm',
          data: {
            photoIdToDelete: file?._id,
            photos: inputs?.photos?.filter((photo: any) => photo.url !== file.url),
          },
        })
      );
    } else {
      dispatch(
        setInputs({
          formName: 'newsletterIssueForm',
          data: {
            photos: inputs?.photos?.filter((photo: any) => photo.url !== file.url),
          },
        })
      );
    }
  };

  console.log('INPUTS: ', inputs);

  return (
    <>
      {/* Drawer Header */}
      <div className='flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0'>
        <h2 className='text-xl font-bold text-gray-900'>
          {isUpdating ? 'Edit Newsletter Issue' : 'Create Newsletter Issue'}
        </h2>
        <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded transition-colors'>
          <X className='w-5 h-5 text-gray-600' />
        </button>
      </div>

      {/* Drawer Content */}
      <form
        id='newsletterIssueForm'
        onSubmit={handleSubmit}
        className='flex-1 overflow-y-auto p-6 space-y-4'
      >
        {/* Year & Quarter Row */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-900 mb-2'>Year</label>
            <select
              name='year'
              value={inputs?.year || ''}
              onChange={handleInput}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900'
            >
              <option value='2025'>2025</option>
              <option value='2026'>2026</option>
              <option value='2027'>2027</option>
              <option value='2028'>2028</option>
              <option value='2029'>2029</option>
              <option value='2030'>2030</option>
            </select>
            {errors?.year && <p className='text-red-500 text-sm mt-1'>{errors.year}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-900 mb-2'>Quarter</label>
            <select
              name='quarter'
              value={inputs?.quarter || ''}
              onChange={handleInput}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900'
            >
              <option value='Q1'>Q1</option>
              <option value='Q2'>Q2</option>
              <option value='Q3'>Q3</option>
              <option value='Q4'>Q4</option>
            </select>
            {errors?.quarter && <p className='text-red-500 text-sm mt-1'>{errors.quarter}</p>}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className='block text-sm font-medium text-gray-900 mb-2'>Title</label>
          <input
            name='title'
            type='text'
            placeholder='Newsletter title'
            value={inputs?.title || ''}
            onChange={handleInput}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900'
          />
          {errors?.title && <p className='text-red-500 text-sm mt-1'>{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className='block text-sm font-medium text-gray-900 mb-2'>Description</label>
          <textarea
            name='description'
            placeholder='Newsletter description'
            value={inputs?.description}
            onChange={handleInput}
            rows={4}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none'
          />
          {errors?.description && <p className='text-red-500 text-sm mt-1'>{errors.description}</p>}
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
                      <img src={file.url} alt={file.name} className='w-full h-full object-cover' />
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
      </form>

      {/* Drawer Footer */}
      <div className='flex flex-col gap-y-3 p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0'>
        <motion.button
          type='submit'
          form='newsletterIssueForm'
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='flex-1 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors'
        >
          {isLoading
            ? isUpdating
              ? 'Updating...'
              : 'Creating...'
            : isUpdating
            ? 'Update Newsletter Issue'
            : 'Create Newsletter Issue'}
        </motion.button>
        <button
          type='button'
          onClick={onClose}
          className='flex-1 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium transition-colors'
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default NewsletterIssueForm;
