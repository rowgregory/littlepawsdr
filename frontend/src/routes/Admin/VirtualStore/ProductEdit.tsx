import { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductSizes from '../../../components/admin/products/ProductSizes';
import { uploadMultipleFilesToFirebase } from '../../../utils/uploadToFirebase';
import { Form } from 'react-bootstrap';
import { categories } from '../../../utils/shopCategories';
import {
  useProductEditForm,
  validateProductCreate,
} from '../../../utils/hooks/useProductEditForm';
import {
  useCreateProductMutation,
  useDeleteProductPhotoMutation,
  useUpdateProductMutation,
} from '../../../redux/services/productApi';
import TailwindSpinner from '../../../components/Loaders/TailwindSpinner';
import { Link } from 'react-router-dom';

const ProductEdit = () => {
  const params = useParams();
  const { state } = useLocation() as any;
  const productId = params.id;
  const navigate = useNavigate();
  const inputFileRef = useRef(null) as any;
  const [photoAmount, setPhotoAmount] = useState(0) as any;
  const [errors, setErrors] = useState({}) as any;
  const product = state?.product;
  const isEditMode = state?.isEditMode;

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deletePhoto] = useDeleteProductPhotoMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = validateProductCreate(inputs, setErrors);
    if (isValid) {
      if (isEditMode) {
        await updateProduct({
          id: productId,
          data: {
            name: inputs.name,
            price: inputs.price,
            shippingPrice: inputs.shippingPrice,
            brand: inputs.brand,
            category: inputs.category,
            description: inputs.description,
            countInStock: inputs.countInStock,
            image: inputs.images[0],
            images: inputs.images,
            sizes: inputs.sizes,
            hasSizes: inputs.hasSizes,
          },
        })
          .unwrap()
          .then(() => navigate('/admin/virtual-store/products'))
          .catch((err: any) => err);
      } else {
        await createProduct({
          name: inputs.name,
          price: inputs.price,
          shippingPrice: inputs.shippingPrice,
          brand: inputs.brand,
          category: inputs.category,
          description: inputs.description,
          countInStock: inputs.countInStock,
          image: inputs.images[0],
          images: inputs.images,
          sizes: inputs.sizes,
          hasSizes: inputs.hasSizes,
        })
          .unwrap()
          .then(() => navigate('/admin/virtual-store/products'))
          .catch((err: any) => err);
      }
    }
  };

  const { inputs, handleInput, handleSwitch, setInputs } = useProductEditForm(
    setErrors,
    product
  );

  const editPhotoHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setPhotoAmount(Number(newFiles.length));
    const images = await uploadMultipleFilesToFirebase(newFiles, false);
    setInputs((prev: any) => ({
      ...prev,
      images: prev.images ? [...prev.images, ...images] : [...images],
    }));
    setErrors((errors: any) => ({ ...errors, images: '' }));
    setPhotoAmount(0);
  };

  const handlePhotoDelete = async (i: number) => {
    deletePhoto({ productId, photoId: i });
  };

  return (
    <div className='flex flex-col gap-y-8'>
      <Link
        to={`/admin/virtual-store/products`}
        className='w-fit border border-slate-100 bg-[#fff] rounded-md  px-3.5 py-1.5 flex items-center hover:no-underline hover:bg-[#f4f4f5] duration-300'
      >
        <i className='fas fa-chevron-left fa-xs mr-2'></i>
        <p className='font-Matter-Regular text-sm mt-0.5'>Back to products</p>
      </Link>
      <form className='bg-white border-[1px] border-gray-200 rounded-xl py-4 px-2.5 md:p-8'>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='font-Matter-Medium text-lg'>Details</p>
            <p className='font-Matter-Light text-sm tracking-wide mb-4'>
              Add details about the product
            </p>
          </div>
          <div className='col-span-12 md:col-span-8 md:col-start-6'>
            <div className='flex flex-col'>
              <label htmlFor='name' className='font-Matter-Medium text-sm mb-1'>
                Name
              </label>
              <input
                className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
                id='name'
                name='name'
                type='text'
                value={inputs.name || ''}
                onChange={handleInput}
                aria-label='Enter name'
              />
              {errors?.name && <p className='text-xs text-red-500'>{errors?.name}</p>}
            </div>
            <div className='flex flex-col mt-3.5'>
              <label htmlFor='brand' className='font-Matter-Medium text-sm mb-1'>
                Brand
              </label>
              <input
                className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
                id='brand'
                name='brand'
                type='text'
                value={inputs.brand || ''}
                onChange={handleInput}
                aria-label='Enter brand'
              />
            </div>
            <div className='flex flex-col mt-3.5'>
              <label htmlFor='description' className='font-Matter-Medium text-sm mb-1'>
                Description
              </label>
              <textarea
                className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
                id='description'
                name='description'
                rows={5}
                value={inputs.description || ''}
                onChange={handleInput}
                aria-label='Enter description'
              ></textarea>
            </div>
            <div className='flex flex-col mt-3.5'>
              <label htmlFor='category' className='font-Matter-Medium text-sm mb-1'>
                Category
              </label>
              <select
                className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
                id='category'
                name='category'
                value={inputs.category || ''}
                onChange={handleInput}
                aria-label='Select category'
              >
                {categories().map((category, i: number) => (
                  <option className='text-zinc-300' key={i}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='px-4 border-b-[1px] border-gray-100 w-full my-5'></div>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='font-Matter-Medium text-lg'>Product images</p>
            <p className='font-Matter-Light text-sm tracking-wide mb-4'>
              Add detailed images of your product
            </p>
          </div>
          <div className='col-span-12 md:col-span-8 md:col-start-6'>
            <div className='border border-slate-100 border-dashed rounded-lg '>
              <label
                htmlFor='images'
                onClick={() => inputFileRef?.current && inputFileRef?.current?.click()}
                className='cursor-pointer flex flex-col items-center justify-center py-4 mb-0'
              >
                <div className='h-12 w-12 rounded-full bg-slate-100 flex justify-center items-center mb-2'>
                  <i className='fa-solid fa-cloud-arrow-up fa-xl'></i>
                </div>
                <div className='text-[#3366ff] font-Matter-Regular underline text-base'>
                  Click to add photos
                </div>
              </label>
              <input
                name='images'
                className='auction-item hidden'
                multiple
                type='file'
                id='multiple-images'
                ref={inputFileRef}
                onChange={editPhotoHandler}
              ></input>
              {inputs?.images?.length > 0 && (
                <div className='flex flex-col pb-4 pl-4'>
                  <p className='font-Matter-Medium mb-2'>Current images</p>
                  <div className='flex flex-wrap gap-1.5'>
                    {inputs?.images &&
                      Array.from(inputs?.images)?.map((img: any, i: number) => (
                        <img
                          onClick={() => handlePhotoDelete(i)}
                          key={i}
                          src={img}
                          alt='LPDR'
                          className='w-24 h-24 object-cover aspect-square cursor-pointer bg-gray-300'
                        />
                      ))}
                    {photoAmount > 0 &&
                      Array.from({ length: photoAmount })?.map((_: any, i: number) => {
                        return (
                          <div
                            key={i}
                            className='w-24 h-24 rounded-md border border-dashed border-gray-100 flex items-center justify-center bg-[#0b0b0b] relative'
                          >
                            <TailwindSpinner color='fill-teal-400' />
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
            {errors?.images && (
              <p className='text-xs text-red-500 mb-4'>{errors?.images}</p>
            )}
          </div>
        </div>
        <div className='px-4 border-b-[1px] border-gray-100 w-full my-5'></div>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='font-Matter-Medium text-lg'>Pricing</p>
          </div>
          <div className='col-span-12 md:col-span-8 md:col-start-6'>
            <div className='flex flex-col'>
              <label htmlFor='price' className='font-Matter-Medium text-sm mb-1'>
                Price
              </label>
              <input
                className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
                id='price'
                name='price'
                type='number'
                value={inputs.price || ''}
                onChange={handleInput}
                aria-label='Enter price'
              />
              {errors?.price && <p className='text-xs text-red-500'>{errors?.price}</p>}
            </div>
            <div className='flex flex-col mt-3.5'>
              <label htmlFor='shippingPrice' className='font-Matter-Medium text-sm mb-1'>
                Shipping Price
              </label>
              <input
                className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
                id='shippingPrice'
                name='shippingPrice'
                type='number'
                value={inputs.shippingPrice || ''}
                onChange={handleInput}
                aria-label='Enter shipping price'
              />
            </div>
          </div>
        </div>
        <div className='px-4 border-b-[1px] border-gray-100 w-full my-5'></div>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='font-Matter-Medium text-lg'>Sizing and count</p>
          </div>
          <div className='col-span-12 md:col-span-8 md:col-start-6'>
            {!inputs.hasSizes && (
              <div className='flex flex-col'>
                <label htmlFor='countInStock' className='font-Matter-Medium text-sm mb-1'>
                  Count in stock
                </label>
                <input
                  className='bg-white border-[1px] border-gray-200 rounded-md mb-1 py-2.5 px-3.5 font-Matter-Regular focus:outline-none'
                  id='countInStock'
                  name='countInStock'
                  type='number'
                  disabled={inputs.hasSizes}
                  value={inputs.countInStock ?? 0}
                  onChange={handleInput}
                  aria-label='Enter count in stock'
                />
              </div>
            )}
            <Form.Group
              controlId='hasSizes'
              className='flex items-center justify-between h-fit w-full'
            >
              <label className='font-Matter-Regular text-sm mb-0'>
                Does this product have sizes?
              </label>
              <Form.Check
                name='hasSizes'
                type='switch'
                checked={inputs.hasSizes || false}
                onChange={(e: any) => {
                  handleSwitch(e);
                  if (product?.product?.hasSizes) {
                    setInputs((prev: any) => ({ ...prev, sizes: [] }));
                  }
                }}
              ></Form.Check>
            </Form.Group>
            <ProductSizes
              doesProductHaveSizes={inputs.hasSizes}
              sizes={inputs.sizes}
              setInputs={setInputs}
            />
            <button
              className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-24 h-10 rounded-lg font-Matter-Regular cursor-pointer'
              onClick={handleSubmit}
            >
              {loadingCreate || loadingUpdate ? (
                <TailwindSpinner color='fill-teal-400' />
              ) : isEditMode ? (
                'Save'
              ) : (
                'Create'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
