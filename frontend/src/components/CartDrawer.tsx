import { useRef } from 'react';
import addDecimals from '../utils/addDecimals';
import useOutsideDetect from '../hooks/useOutsideDetect';
import { toggleCartDrawer } from '../redux/features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/toolkitStore';

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const cartRef = useRef(null) as any;
  const cart = useAppSelector((state: any) => state.cart);
  const cartDrawer = cart?.cartDrawer;
  const cartItemsAmount = cart?.cartItemsAmount;
  const cartItem = cart?.cartItem;
  const subtotal = cart?.subtotal;

  const handleClose = () => dispatch(toggleCartDrawer(false));
  useOutsideDetect(cartRef, cartDrawer ? handleClose : () => {});

  return (
    <>
      {/* Overlay */}
      <div
        className={`${
          cartDrawer ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } fixed inset-0 bg-white z-[199] transition-opacity duration-300 ease-in-out`}
        onClick={handleClose}
      />

      {/* Cart Drawer */}
      <div
        ref={cartRef}
        className={`${
          cartDrawer ? 'translate-y-0 shadow-2xl' : '-translate-y-full'
        } fixed top-0 left-0 right-0 bg-white z-[200] transition-transform duration-500 ease-out`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className='absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200'
          aria-label='Close cart drawer'
        >
          <i className='fas fa-times text-gray-600 text-lg'></i>
        </button>

        <div className='max-w-6xl mx-auto px-6 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
            {/* Left Side - Item Added */}
            <div className='lg:col-span-7'>
              {/* Success Message */}
              <div className='flex items-center mb-6 pb-4 border-b border-gray-200'>
                <div className='flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3'>
                  <i className='fas fa-check text-green-600 text-sm'></i>
                </div>
                <div>
                  <h3 className='text-green-700 font-semibold text-lg'>Item Added Successfully!</h3>
                  <p className='text-green-600 text-sm mt-1'>
                    {cartItem?.quantity ?? 1} item{(cartItem?.quantity ?? 1) > 1 ? 's' : ''} added to your cart
                  </p>
                </div>
              </div>

              {/* Added Item Details */}
              <div className='bg-gray-50 rounded-lg p-4'>
                <div className='flex items-start space-x-4'>
                  <div className='flex-shrink-0'>
                    <img
                      src={cartItem?.dachshundImage ?? cartItem?.productImage}
                      className='w-20 h-20 object-cover rounded-lg border border-gray-200'
                      alt={cartItem?.productName || 'Product'}
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-semibold text-gray-900 text-base mb-1'>
                      {cartItem?.productName}
                      {cartItem?.dachshundName && <span className='text-gray-600 font-normal'> for {cartItem.dachshundName}</span>}
                    </h4>
                    {cartItem?.size && <p className='text-sm text-gray-600 mb-2'>Size: {cartItem.size}</p>}
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-gray-600'>Qty: {cartItem?.quantity ?? 1}</span>
                      <span className='font-semibold text-gray-900'>{addDecimals(cartItem?.price ?? 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Cart Summary */}
            <div className='lg:col-span-5'>
              <div className='bg-white border border-gray-200 rounded-lg p-6 sticky top-4'>
                <div className='flex items-center justify-between mb-4 pb-3 border-b border-gray-100'>
                  <h3 className='text-lg font-semibold text-gray-900'>Your Cart</h3>
                  <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm font-medium'>
                    {cartItemsAmount} item{cartItemsAmount !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Subtotal Details */}
                <div className='space-y-2 mb-6'>
                  <div className='flex justify-between text-sm text-gray-600'>
                    <span>Order Subtotal:</span>
                    <span>{addDecimals(subtotal)}</span>
                  </div>
                  <div className='flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-100'>
                    <span>Subtotal:</span>
                    <span>{addDecimals(subtotal)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='space-y-3'>
                  <Link
                    onClick={handleClose}
                    to='/cart'
                    className='w-full bg-white border-2 border-black text-black py-3 px-4 text-sm font-semibold text-center block rounded-lg hover:bg-black hover:text-white transition-colors duration-300'
                  >
                    VIEW CART
                  </Link>
                  <Link
                    onClick={handleClose}
                    to='/cart/checkout/customer-info'
                    className='w-full bg-black border-2 border-black text-white py-3 px-4 text-sm font-semibold text-center block rounded-lg hover:bg-white hover:text-black transition-colors duration-300'
                  >
                    CHECKOUT NOW
                  </Link>
                </div>

                {/* Continue Shopping */}
                <button
                  onClick={handleClose}
                  className='w-full mt-3 text-gray-600 text-sm hover:text-gray-900 transition-colors duration-200 underline'
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
