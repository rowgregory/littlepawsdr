import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppDispatch, useEcardSelector, useFormSelector } from '../../redux/toolkitStore';
import { createFormActions, resetForm, setInputs } from '../../redux/features/form/formSlice';
import { useCreateEcardMutation, useUpdateEcardMutation } from '../../redux/services/ecardApi';
import { setCloseEcardDrawer } from '../../redux/features/ecardSlice';
import { showToast } from '../../redux/features/toastSlice';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';
import EcardForm from '../forms/EcardForm';

const validateForm = (inputs, setErrors) => {
  const newErrors: Record<string, string> = {};

  if (!inputs.name?.trim()) {
    newErrors.name = 'Name is required';
  } else if (inputs.name.length < 3) {
    newErrors.name = 'Name must be at least 3 characters';
  }

  if (!inputs.category?.trim()) {
    newErrors.category = 'Category is required';
  }

  if (inputs.price === '' || inputs.price === undefined) {
    newErrors.price = 'Price is required';
  } else if (inputs.price < 0) {
    newErrors.price = 'Price must be positive';
  }

  if (!inputs.isUpdating && !inputs.image) {
    newErrors.image = 'Image is required';
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const EcardDrawer = () => {
  const dispatch = useAppDispatch();
  const { ecardForm } = useFormSelector();
  const { ecardDrawer } = useEcardSelector();
  const { handleInput, setErrors } = createFormActions('ecardForm', dispatch);
  const [createEcard, { isLoading: loadingCreate }] = useCreateEcardMutation();
  const [updateEcard, { isLoading: loadingUpdate }] = useUpdateEcardMutation();

  const inputs = ecardForm?.inputs || {};
  const errors = ecardForm?.errors || {};
  const isUpdating = inputs?.isUpdating;
  const onClose = () => dispatch(setCloseEcardDrawer());
  const isLoading = loadingCreate || loadingUpdate;

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(
        setInputs({
          formName: 'ecardForm',
          data: {
            image: e.target?.result as string,
            newImage: file,
          },
        })
      );
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    dispatch(
      setInputs({
        formName: 'ecardForm',
        data: {
          image: '',
          newImage: null,
        },
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(inputs, setErrors)) return;

    try {
      // Upload image to Firebase if new image
      let uploadedImageUrl = inputs.image;

      if (inputs.newImage) {
        dispatch(
          showToast({
            message: 'Uploading image...',
            type: 'info',
          })
        );

        uploadedImageUrl = await uploadFileToFirebase(inputs.newImage);

        if (!uploadedImageUrl) {
          throw new Error('Failed to upload image');
        }
      }

      const payload = {
        name: inputs.name,
        category: inputs.category,
        price: parseFloat(inputs.price),
        image: uploadedImageUrl,
        thumb: uploadedImageUrl,
      };

      if (isUpdating) {
        await updateEcard({
          _id: inputs._id,
          ...payload,
        }).unwrap();
      } else {
        await createEcard(payload).unwrap();
      }

      dispatch(
        showToast({
          message: isUpdating ? 'Ecard updated!' : 'Ecard created!',
          type: 'success',
        })
      );
      dispatch(resetForm('ecardForm'));
      onClose();
    } catch (error: any) {
      dispatch(
        showToast({
          message: isUpdating ? 'Failed to update ecard' : 'Failed to create ecard',
          type: 'error',
        })
      );
    }
  };

  return (
    <AnimatePresence>
      {ecardDrawer && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed inset-0 bg-black/50 z-[100]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Drawer */}
          <motion.div
            className='fixed right-0 top-0 h-screen w-full max-w-2xl bg-white z-[101] overflow-y-auto'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className='sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900'>
                  {isUpdating ? 'Update Ecard' : 'Create Ecard'}
                </h2>
                <p className='text-gray-600 text-sm mt-1'>
                  {isUpdating ? 'Update ecard details' : 'Create a new ecard for your store'}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <X className='w-6 h-6 text-gray-900' />
              </motion.button>
            </div>

            {/* Content */}
            <div className='p-6'>
              <EcardForm
                inputs={inputs}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                errors={errors}
                isUpdating={isUpdating}
                loading={isLoading}
                onImageUpload={handleImageUpload}
                image={inputs.image}
                onRemoveImage={handleRemoveImage}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EcardDrawer;
