import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppDispatch, useFormSelector, useProductSelector } from '../../redux/toolkitStore';
import { createFormActions, resetForm, setInputs } from '../../redux/features/form/formSlice';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '../../redux/services/productApi';
import { showToast } from '../../redux/features/toastSlice';
import { uploadMultipleFilesToFirebase } from '../../utils/uploadToFirebase';
import { setCloseProductDrawer } from '../../redux/features/productSlice';
import ProductForm from '../forms/ProductForm';

const validateForm = (inputs, setErrors) => {
  const newErrors: Record<string, string> = {};

  if (!inputs.name?.trim()) {
    newErrors.name = 'Name is required';
  } else if (inputs.name.length < 3) {
    newErrors.name = 'Name must be at least 3 characters';
  }

  if (inputs.price === '' || inputs.price === undefined) {
    newErrors.price = 'Price is required';
  } else if (inputs.price < 0) {
    newErrors.price = 'Price must be positive';
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const ProductDrawer = () => {
  const dispatch = useAppDispatch();
  const { productForm } = useFormSelector();
  const { productDrawer } = useProductSelector();
  const { handleInput, setErrors, handleToggle } = createFormActions('productForm', dispatch);
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  const inputs = productForm?.inputs || {};
  const errors = productForm?.errors || {};
  const isUpdating = inputs?.isUpdating;
  const isLoading = loadingCreate || loadingUpdate;

  const onClose = () => dispatch(setCloseProductDrawer());

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
            formName: 'productForm',
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
        formName: 'productForm',
        data: {
          images: currentImages.filter((_: any, i: number) => i !== index),
          newImages: currentNewImages.filter((_: any, i: number) => i !== index),
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

      // Only include uploaded URLs, not data URLs
      const allImageUrls = [
        ...inputs.images.filter((img: any) => typeof img === 'string' && !img.startsWith('data:')),
        ...uploadedImageUrls,
      ];

      // Calculate isOutofStock based on countInStock
      const countInStock = parseInt(inputs.countInStock) || 0;
      const isOutofStock = countInStock === 0;
      const productSizes = inputs?.hasSizes ? inputs.sizes : null;

      const payload = {
        name: inputs.name,
        description: inputs.description || '',
        category: inputs.category || '',
        price: parseFloat(inputs.price),
        shippingPrice: parseFloat(inputs.shippingPrice) || 0,
        countInStock,
        isOutofStock,
        image: allImageUrls[0] || '', // Use first uploaded URL, not data URL
        images: allImageUrls, // Only actual URLs, not base64
        hasSizes: inputs?.hasSizes || false,
        sizes: productSizes,
        isPhysicalProduct: inputs.isPhysicalProduct,
      };

      if (isUpdating) {
        await updateProduct({
          _id: inputs._id,
          ...payload,
        }).unwrap();
      } else {
        await createProduct(payload).unwrap();
      }

      dispatch(
        showToast({
          message: isUpdating ? 'Product updated!' : 'Product created!',
          type: 'success',
        })
      );
      dispatch(resetForm('productForm'));
      onClose();
    } catch (error: any) {
      dispatch(
        showToast({
          message: isUpdating ? 'Failed to update product' : 'Failed to create product',
          type: 'error',
        })
      );
    }
  };

  return (
    <AnimatePresence>
      {productDrawer && (
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
                  {isUpdating ? 'Update Product' : 'Create Product'}
                </h2>
                <p className='text-gray-600 text-sm mt-1'>
                  {isUpdating
                    ? 'Update product details and inventory'
                    : 'Create a new product for your store'}
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
              <ProductForm
                inputs={inputs}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                errors={errors}
                isUpdating={isUpdating}
                loading={isLoading}
                onImageUpload={handleImageUpload}
                images={inputs?.images || []}
                onRemoveImage={handleRemoveImage}
                handleToggle={handleToggle}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductDrawer;
