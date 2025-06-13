import ProductSizes from '../admin/products/ProductSizes';
import TailwindSpinner from '../Loaders/TailwindSpinner';
import { merchAndEcardsCategoriesData } from '../store/FilterDrawer';
import FormSection from '../ui/FormSection';
import ProductImageUpload from '../ui/ProductImageUpload';
import FormField from '../ui/ReusableFormField';

interface ProductEditFormProps {
  inputs: any;
  errors: any;
  isEditMode: boolean;
  isLoading: boolean;
  productId?: string;
  onInputChange: (e: any) => void;
  onSwitchChange: (e: any) => void;
  onInputsChange: (inputs: any) => void;
  onSubmit: (data: any) => void;
  onErrorsChange: (errors: any) => void;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({
  inputs,
  errors,
  isEditMode,
  isLoading,
  productId,
  onInputChange,
  onSwitchChange,
  onInputsChange,
  onSubmit,
  onErrorsChange,
}) => {
  return (
    <form onSubmit={onSubmit} className='space-y-8'>
      {/* Product Details Section */}
      <FormSection title='Product Details' description='Add basic information about your product'>
        <div className='space-y-6'>
          <FormField
            label='Product Name'
            id='name'
            name='name'
            type='text'
            value={inputs.name || ''}
            onChange={onInputChange}
            error={errors?.name}
            placeholder='Enter product name'
            required
          />

          <FormField
            label='Brand'
            id='brand'
            name='brand'
            type='text'
            value={inputs.brand || ''}
            onChange={onInputChange}
            placeholder='Enter brand name'
          />

          <FormField
            label='Description'
            id='description'
            name='description'
            type='textarea'
            value={inputs.description || ''}
            onChange={onInputChange}
            placeholder='Describe your product...'
            rows={4}
          />

          <FormField
            label='Category'
            id='category'
            name='category'
            type='select'
            value={inputs.category || ''}
            onChange={onInputChange}
            options={merchAndEcardsCategoriesData
              .filter((category) => category !== 'Clear Filter' && category !== 'Ecards')
              .map((category) => ({ value: category, label: category }))}
            placeholder='Select a category'
            required
          />
        </div>
      </FormSection>

      {/* Product Images Section */}
      <FormSection title='Product Images' description='Upload high-quality images to showcase your product'>
        <ProductImageUpload
          images={inputs.images}
          onImagesChange={onInputsChange}
          onErrorsChange={onErrorsChange}
          productId={productId}
          error={errors?.images}
        />
      </FormSection>

      {/* Pricing Section */}
      <FormSection title='Pricing' description='Set your product pricing and shipping costs'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormField
            label='Price'
            id='price'
            name='price'
            type='number'
            value={inputs.price || ''}
            onChange={onInputChange}
            error={errors?.price}
            placeholder='0.00'
            min='0'
            step='0.01'
            required
            prefix='$'
          />

          <FormField
            label='Shipping Price'
            id='shippingPrice'
            name='shippingPrice'
            type='number'
            value={inputs.shippingPrice || ''}
            onChange={onInputChange}
            placeholder='0.00'
            min='0'
            step='0.01'
            prefix='$'
          />
        </div>
      </FormSection>

      {/* Inventory & Sizing Section */}
      <FormSection title='Inventory & Sizing' description='Manage stock levels and product sizing options'>
        <div className='space-y-6'>
          {/* Stock Count - Only show if no sizes */}
          {!inputs.hasSizes && (
            <FormField
              label='Stock Count'
              id='countInStock'
              name='countInStock'
              type='number'
              value={inputs.countInStock ?? 0}
              onChange={onInputChange}
              placeholder='0'
              min='0'
              help='Number of items available in stock'
            />
          )}

          {/* Has Sizes Toggle */}
          <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
            <div>
              <label htmlFor='hasSizes' className='text-sm font-medium text-gray-900'>
                Does this product have sizes?
              </label>
              <p className='text-sm text-gray-500 mt-1'>Enable if your product comes in different sizes (S, M, L, etc.)</p>
            </div>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='hasSizes'
                name='hasSizes'
                checked={inputs.hasSizes || false}
                onChange={onSwitchChange}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
            </div>
          </div>

          {/* Product Sizes Component */}
          {inputs.hasSizes && (
            <div className='mt-4'>
              <ProductSizes doesProductHaveSizes={inputs.hasSizes} sizes={inputs.sizes} setInputs={onInputsChange} />
            </div>
          )}
        </div>
      </FormSection>

      {/* Submit Button */}
      <div className='flex justify-end pt-6 border-t border-gray-200'>
        <button
          type='submit'
          disabled={isLoading}
          className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
        >
          {isLoading ? (
            <>
              <TailwindSpinner color='fill-white' />
              <span className='ml-2'>{isEditMode ? 'Updating...' : 'Creating...'}</span>
            </>
          ) : (
            <>
              <i className={`fas ${isEditMode ? 'fa-save' : 'fa-plus'} mr-2`}></i>
              {isEditMode ? 'Update Product' : 'Create Product'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductEditForm;
