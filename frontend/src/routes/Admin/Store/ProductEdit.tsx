import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCreateProductMutation, useUpdateProductMutation } from '../../../redux/services/productApi';
import { useProductEditForm, validateProductCreate } from '../../../hooks/form-hooks/useProductEditForm';
import ProductEditForm from '../../../components/forms/ProductEditForm';

const ProductEdit = () => {
  const { id: productId } = useParams();
  const { state } = useLocation() as any;
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}) as any;

  const product = state?.product;
  const isEditMode = state?.isEditMode;

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const { inputs, handleInput, handleSwitch, setInputs } = useProductEditForm(setErrors, product);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isValid = validateProductCreate(inputs, setErrors);
    if (!isValid) return;

    const payload = {
      name: inputs.name,
      price: inputs.price,
      shippingPrice: inputs.shippingPrice,
      category: inputs.category,
      description: inputs.description,
      countInStock: inputs.countInStock,
      image: inputs.images?.[0],
      images: inputs.images,
      sizes: inputs.sizes,
      hasSizes: inputs.hasSizes,
    };

    try {
      if (isEditMode) {
        await updateProduct({ id: productId, data: payload }).unwrap();
      } else {
        await createProduct(payload).unwrap();
      }
      navigate('/admin/store/products');
    } catch {}
  };

  const isLoading = loadingCreate || loadingUpdate;

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <Link
            to='/admin/store/products'
            className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
          >
            <i className='fas fa-chevron-left fa-sm mr-2'></i>
            Back to products
          </Link>

          <div className='mt-4'>
            <h1 className='text-3xl font-bold text-gray-900'>{isEditMode ? 'Edit Product' : 'Create New Product'}</h1>
            <p className='mt-2 text-gray-600'>{isEditMode ? 'Update your product information and settings' : 'Add a new product to your store'}</p>
          </div>
        </div>

        {/* Form */}
        <ProductEditForm
          inputs={inputs}
          errors={errors}
          isEditMode={isEditMode}
          isLoading={isLoading}
          productId={productId}
          onInputChange={handleInput}
          onSwitchChange={handleSwitch}
          onInputsChange={setInputs}
          onSubmit={handleSubmit}
          onErrorsChange={setErrors}
        />
      </div>
    </div>
  );
};

export default ProductEdit;
