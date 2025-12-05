import { FC } from 'react';
import { Shirt, Info, ChevronDown } from 'lucide-react';
import Skeleton from '../Loaders/Skeleton';

interface MerchNamePriceDescriptionProps {
  product: any;
  size: any;
  setSize: any;
  loading: boolean;
}

const MerchNamePriceDescription: FC<MerchNamePriceDescriptionProps> = ({ product, size, setSize, loading }) => {
  return loading ? (
    <Skeleton w='100%' h='320px' />
  ) : (
    <div className='col-span-12 lg:col-span-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl h-fit'>
      {/* Product Name */}
      <div className='mb-6'>
        <h1 className='text-4xl font-bold text-gray-900 leading-tight mb-2'>{product?.name}</h1>
        <div className='h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'></div>
      </div>

      {/* Price Display */}
      <div className='mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200'>
        <div className='flex items-baseline'>
          <span className='text-xl font-semibold text-gray-600'>$</span>
          <span className='text-5xl font-bold text-gray-900 ml-1'>{product?.price}</span>
        </div>
      </div>

      {/* Size Selector */}
      {product?.hasSizes && !product?.isOutofStock && (
        <div className='mb-6'>
          <label className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
            <Shirt className='w-4 h-4' />
            Select Size
          </label>
          <div className='relative w-32'>
            <select
              className='w-full p-3 pr-10 border-2 border-gray-200 rounded-xl bg-white text-gray-900 font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-300'
              value={size}
              onChange={(e: any) => setSize(e.target.value)}
            >
              {product?.sizes?.map((x: any, i: number) => (
                <option key={i} value={x?.size} className='py-2'>
                  {x.size}
                </option>
              ))}
            </select>
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
              <ChevronDown className='w-5 h-5 text-gray-400' />
            </div>
          </div>

          {/* Size availability indicator */}
          <div className='mt-2 flex flex-wrap gap-2'>
            {product?.sizes?.map((sizeOption: any, i: number) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  sizeOption.amount > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                }`}
              >
                {sizeOption.size}: {sizeOption.amount > 0 ? 'Available' : 'Out of Stock'}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Product Description */}
      {product?.description !== '' && (
        <div className='border-t border-gray-200 pt-6'>
          <div className='flex items-center gap-2 mb-4'>
            <Info className='w-5 h-5 text-blue-600' />
            <h3 className='text-lg font-bold text-gray-900'>About this item</h3>
          </div>

          <div className='bg-gray-50 rounded-xl p-4 border border-gray-200'>
            <ul className='space-y-3'>
              {product?.description?.split('|').map((item: any, i: number) => (
                <li key={i} className='flex items-start gap-3 text-gray-700 leading-relaxed'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                  <span className='font-medium'>{item.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Additional Product Info */}
      <div className='mt-6 pt-4 border-t border-gray-200'>
        <div className='grid grid-cols-2 gap-4 text-sm'>
          <div className='flex flex-col'>
            <span className='text-gray-500 font-medium'>Category</span>
            <span className='text-gray-900 font-semibold'>Merchandise</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-gray-500 font-medium'>Quality</span>
            <span className='text-gray-900 font-semibold'>Premium</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchNamePriceDescription;
