import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import {
  useAppDispatch,
  useFormSelector,
  useWelcomeWienerSelector,
} from '../../redux/toolkitStore';
import {
  createFormActions,
  Errors,
  resetForm,
  setInputs,
} from '../../redux/features/form/formSlice';
import {
  useCreateWelcomeWienerMutation,
  useCreateWelcomeWienerProductMutation,
  useUpdateWelcomeWienerMutation,
} from '../../redux/services/welcomeWienerApi';
import { showToast } from '../../redux/features/toastSlice';
import { setCloseWelcomeWienerDrawer } from '../../redux/features/welcomeWienerSlice';
import WelcomeWienerForm from '../forms/WelcomeWienerForm';
import { uploadMultipleFilesToFirebase } from '../../utils/uploadToFirebase';

const validateForm = (
  inputs: { name: string; bio: string },
  setErrors: { (errors: Errors): any; (arg0: Record<string, string>): void }
) => {
  const newErrors: Record<string, string> = {};

  if (!inputs.name?.trim()) {
    newErrors.name = 'Name is required';
  } else if (inputs.name.length < 2) {
    newErrors.name = 'Name must be at least 2 characters';
  }

  if (!inputs.bio?.trim()) {
    newErrors.bio = 'Bio is required';
  } else if (inputs.bio.length < 20) {
    newErrors.bio = 'Bio must be at least 20 characters';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const WelcomeWienerDrawer = () => {
  const dispatch = useAppDispatch();
  const { welcomeWienerForm } = useFormSelector();
  const { welcomeWienerDrawer, welcomeWienerProducts } = useWelcomeWienerSelector();
  const { handleInput, setErrors, handleToggle } = createFormActions('welcomeWienerForm', dispatch);

  const [createWelcomeWiener, { isLoading: loadingCreate }] = useCreateWelcomeWienerMutation();
  const [updateWelcomeWiener, { isLoading: loadingUpdate }] = useUpdateWelcomeWienerMutation();
  const [createWelcomeWienerProduct, { isLoading: loadingCreateProduct }] =
    useCreateWelcomeWienerProductMutation();

  const inputs = welcomeWienerForm?.inputs || {};
  const errors = welcomeWienerForm?.errors || {};
  const isUpdating = inputs?.isUpdating;
  const isLoading = loadingCreate || loadingUpdate || loadingCreateProduct;
  const onClose = () => dispatch(setCloseWelcomeWienerDrawer());

  const handleImageUpload = (files: FileList) => {
    const fileArray = Array.from(files);
    const currentImages = inputs?.images || [];
    const currentNewImages = inputs?.newImages || [];

    // Create preview URLs
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(
          setInputs({
            formName: 'welcomeWienerForm',
            data: {
              images: [...currentImages, e.target?.result as string],
              newImages: [...currentNewImages, file],
            },
          })
        );
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = inputs?.images || [];
    const currentNewImages = inputs?.newImages || [];

    dispatch(
      setInputs({
        formName: 'welcomeWienerForm',
        data: {
          images: currentImages.filter((_, i) => i !== index),
          newImages: currentNewImages.filter((_, i) => i !== index),
        },
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(inputs, setErrors)) return;

    try {
      // Upload new images to Firebase
      let uploadedImageUrls: string[] = [];

      if (inputs?.newImages && inputs.newImages.length > 0) {
        dispatch(
          showToast({
            message: 'Uploading images...',
            type: 'info',
          })
        );

        const uploadedFiles = await uploadMultipleFilesToFirebase(inputs.newImages, false);
        uploadedImageUrls = uploadedFiles.filter(
          (url): url is string => typeof url === 'string' && url !== null
        );
      }

      // Combine existing preview URLs with newly uploaded URLs
      const allImageUrls = [
        ...inputs.images.filter((img: any) => typeof img === 'string' && !img.startsWith('data:')),
        ...uploadedImageUrls,
      ];

      const payload = {
        name: inputs.name,
        bio: inputs.bio,
        age: inputs.age || '',
        displayUrl: inputs.displayUrl || '',
        isLive: inputs.isLive || false,
        images: allImageUrls,
        associatedProducts: (inputs.associatedProducts || []).map((p: any) => p._id),
      };

      if (isUpdating) {
        await updateWelcomeWiener({
          _id: inputs._id,
          ...payload,
        }).unwrap();
      } else {
        await createWelcomeWiener(payload).unwrap();
      }

      dispatch(
        showToast({
          message: isUpdating ? 'Dachshund updated!' : 'Dachshund created!',
          type: 'success',
        })
      );
      dispatch(resetForm('welcomeWienerForm'));
      onClose();
    } catch (error: any) {
      dispatch(
        showToast({
          message: isUpdating ? 'Failed to update dachshund' : 'Failed to create dachshund',
          type: 'error',
        })
      );
    }
  };

  const handleAddProduct = (product: any) => {
    const currentSelectedProducts = inputs?.associatedProducts || [];
    if (!currentSelectedProducts.find((p) => p._id === product._id)) {
      dispatch(
        setInputs({
          formName: 'welcomeWienerForm',
          data: {
            associatedProducts: [...currentSelectedProducts, product],
          },
        })
      );
    }
  };

  const handleRemoveProduct = (productId: string) => {
    const currentSelectedProducts = inputs?.associatedProducts || [];

    dispatch(
      setInputs({
        formName: 'welcomeWienerForm',
        data: {
          associatedProducts: currentSelectedProducts.filter((p) => p._id !== productId),
        },
      })
    );
  };

  const handleCreateProduct = async (product: any) => {
    const newProduct = await createWelcomeWienerProduct(product).unwrap();
    const currentSelectedProducts = inputs?.associatedProducts || [];
    dispatch(
      setInputs({
        formName: 'welcomeWienerForm',
        data: {
          associatedProducts: [...currentSelectedProducts, newProduct.savedWelcomeWiener],
        },
      })
    );
  };

  return (
    <AnimatePresence>
      {welcomeWienerDrawer && (
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
                  {isUpdating ? 'Update Welcome Wiener' : 'Create Welcome Wiener'}
                </h2>
                <p className='text-gray-600 text-sm mt-1'>
                  {isUpdating
                    ? "Update this dachshund's profile and information"
                    : 'Create a new Welcome Wiener profile for donations'}
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
              {errors?.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'
                >
                  <p className='text-red-700 text-sm'>{errors.submit}</p>
                </motion.div>
              )}

              <WelcomeWienerForm
                inputs={inputs}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                errors={errors}
                isUpdating={isUpdating}
                loading={isLoading}
                onImageUpload={handleImageUpload}
                onRemoveImage={handleRemoveImage}
                handleToggle={handleToggle}
                availableProducts={welcomeWienerProducts}
                selectedProducts={inputs.associatedProducts}
                onAddProduct={handleAddProduct}
                onRemoveProduct={handleRemoveProduct}
                onCreateProduct={handleCreateProduct}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomeWienerDrawer;
