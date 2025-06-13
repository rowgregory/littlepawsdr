import { Fragment } from 'react';

import { RootState, useAppSelector } from '../../../redux/toolkitStore';
import { setStep } from '../../../redux/features/cart/cartSlice';
import cartItemType from '../../../utils/shop-utils/cartItemType';
import { useNavigate } from 'react-router-dom';

const CheckoutProgressTracker = () => {
  const navigate = useNavigate();
  const { step, cartItems } = useAppSelector((state: RootState) => state.cart);
  const { isProduct } = cartItemType(cartItems);

  return (
    <Fragment>
      <div className='hidden md:flex justify-evenly mt-4 mb-8 gap-4'>
        <div
          onClick={() => {
            if (step.step2 || step.step3) {
              setStep({ step1: true, step2: false, step3: false });
              navigate('/cart/checkout/customer-info');
            }
          }}
          className={`${step.step1 ? 'border-teal-500' : 'border-gray-300 text-gray-300'} ${
            step.step2 || step.step3 ? 'cursor-pointer' : ''
          } border-b-4 text-xl font-Matter-Medium tracking wider px-8 w-full text-center pb-1 whitespace-nowrap`}
        >
          1. Customer Info
        </div>
        {isProduct && (
          <div
            onClick={() => {
              if (step.step3) {
                setStep({ step1: true, step2: true, step3: false });
                navigate('/cart/checkout/shipping-address');
              }
            }}
            className={`${step.step2 ? 'border-teal-500' : 'border-gray-300 text-gray-300'} ${
              step.step3 ? 'cursor-pointer' : ''
            } border-b-4 text-xl font-Matter-Medium tracking wider px-8 w-full text-center pb-1`}
          >
            2. Shipping
          </div>
        )}
        <div
          className={`${
            step.step3 ? 'border-teal-500' : 'border-gray-300 text-gray-300'
          }  border-b-4 text-xl font-Matter-Medium tracking wider px-8 w-full text-center pb-1`}
        >
          {isProduct ? '3' : '2'}. Payment
        </div>
      </div>
      <div className='flex justify-between px-2.5 w-72 mx-auto md:hidden mt-4 mb-8'>
        <div className='relative'>
          <p className='font-Matter-Medium text-sm text-gray-300 text-center absolute -top-6 -left-4 whitespace-nowrap'>
            Customer Info
          </p>
          <div
            className={`${
              step.step1 ? 'bg-teal-500' : 'bg-gray-300'
            } text-2xl font-Museo-Slab-700 w-12 h-12 rounded-full flex items-center justify-center text-white pb-1 aspect-square pt-2 relative after:content-[''] ${
              isProduct ? 'after:w-12' : 'after:w-[170px]'
            } after:absolute after:top-6 after:left-[58px] after:border-2 after:border-gray-300`}
          >
            1
          </div>
        </div>
        {isProduct && (
          <div className='relative'>
            <p className='font-Matter-Medium text-sm text-gray-300 text-center absolute -top-6 -left-1 whitespace-nowrap'>
              Shipping
            </p>
            <div
              className={`${
                step.step2 ? 'bg-teal-500' : 'bg-gray-300'
              } text-2xl font-Museo-Slab-700 w-12 h-12 rounded-full flex items-center justify-center text-white pb-1 aspect-square pt-2 relative after:content-[''] after:w-12 after:absolute after:top-6 after:left-[58px] after:border-2 after:border-gray-300`}
            >
              2
            </div>
          </div>
        )}
        <div className='relative'>
          <p className='font-Matter-Medium text-sm text-gray-300 text-center absolute -top-6 -left-2 whitespace-nowrap'>
            Payment
          </p>
          <div
            className={`${
              step.step3 ? 'bg-teal-500' : 'bg-gray-300'
            } text-2xl font-Museo-Slab-700 w-12 h-12 rounded-full flex items-center justify-center text-white pb-1 aspect-square pt-2`}
          >
            {isProduct ? '3' : '2'}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckoutProgressTracker;
