import { FC } from 'react';
import { ShoppingCart, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import Skeleton from '../Loaders/Skeleton';

interface AddToCartSectionProps {
  product: any;
  qty: number;
  setQty: (qty: number) => void;
  addToCartHandler: (product: any) => void;
  loading: boolean;
  size: string;
}

const AddToCartSection: FC<AddToCartSectionProps> = ({ product, qty, setQty, addToCartHandler, loading, size }) => {
  const stock = product?.hasSizes ? product?.sizes.find((itemSize: any) => itemSize.size === size)?.amount : product?.countInStock;

  const outOfStock = product?.isOutofStock;
  const quantityOptions = stock < 0 ? [0] : [...Array(stock).keys()].map((num) => num + 1);

  return loading ? (
    <Skeleton w='100%' h='320px' />
  ) : (
    <div className='w-full col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-fit transition-all duration-300 hover:shadow-xl'>
      {/* Price Section */}
      <div className='mb-6'>
        <div className='flex items-baseline mb-2'>
          <span className='text-lg font-semibold text-gray-600'>$</span>
          <span className='text-5xl font-bold text-gray-900 ml-1'>{product?.price}</span>
        </div>
        <div className='h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'></div>
      </div>

      {/* Stock Status */}
      <div className='mb-4'>
        <div
          className={`flex items-center gap-2 p-3 rounded-xl ${
            outOfStock ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
          }`}
        >
          {outOfStock ? <XCircle className='w-5 h-5 text-red-500' /> : <CheckCircle className='w-5 h-5 text-green-500' />}
          <span className={`font-semibold ${outOfStock ? 'text-red-700' : 'text-green-700'}`}>{outOfStock ? 'Out of Stock' : 'In Stock'}</span>
        </div>
      </div>

      {!outOfStock && (
        <>
          {/* Shipping Info */}
          <div className='mb-6 p-3 bg-blue-50 rounded-xl border border-blue-200'>
            <div className='flex items-center gap-2 mb-1'>
              <Truck className='w-4 h-4 text-blue-600' />
              <span className='text-sm font-medium text-blue-700'>Fast Shipping</span>
            </div>
            <p className='text-sm text-blue-600 ml-6'>Usually ships within 4-5 business days</p>
          </div>

          {/* Quantity Selector */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-3'>Quantity</label>
            <div className='relative'>
              <select
                value={qty}
                onChange={(e: any) => setQty(Number(e.target.value))}
                className='w-full p-3 pr-10 border-2 border-gray-200 rounded-xl bg-white text-gray-900 font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-300'
              >
                {quantityOptions?.map((option: any, i: number) => (
                  <option key={i} value={option} className='py-2'>
                    {option}
                  </option>
                ))}
              </select>
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                <Package className='w-5 h-5 text-gray-400' />
              </div>
            </div>
            {stock <= 5 && stock > 0 && <p className='text-xs text-orange-600 mt-2 font-medium'>Only {stock} left in stock!</p>}
          </div>
        </>
      )}

      {/* Add to Cart Button */}
      <button
        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
          outOfStock
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 hover:shadow-xl hover:scale-105 active:scale-95'
        }`}
        disabled={outOfStock}
        onClick={() => addToCartHandler(product)}
      >
        <ShoppingCart className='w-5 h-5' />
        {outOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default AddToCartSection;
