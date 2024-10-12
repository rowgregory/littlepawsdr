import addDecimals from '../../../utils/addDecimals';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/toolkitStore';
import TailwindSpinner from '../../Loaders/TailwindSpinner';
import { useNavigate } from 'react-router-dom';

const CheckoutSection = () => {
  const navigate = useNavigate();
  const { cartItems, cartItemsAmount, subtotal, loading } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className='flex flex-col justify-between shadow-[-15px_-15px_40px_3px_rgba(0, 0, 0, 0.35)] w-full bg-[#2e2e2e] sm:h-screen sm:w-[275px] sm:min-w-[275px] md:w-[350px] md:min-w-[350px]'>
      <div className='w-full py-8 px-3.5 sm:py-[100px] sm:px-10'>
        <p className='text-3xl text-teal-400 font-Matter-Medium mb-12'>Order Summary</p>
        <div className='flex items-baseline justify-between w-full'>
          <p className='text-sm font-matter-Light text-white'>
            Subtotal ({cartItemsAmount}&nbsp;items):&nbsp;
          </p>
          <p className='text-white font-Matter-Medium text-sm mb-0'>{addDecimals(subtotal)}</p>
        </div>
      </div>
      <div className='flex flex-col'>
        {loading && <TailwindSpinner color='fill-white' />}
        <button
          className='bg-teal-400 text-white min-h-[100px] w-full flex items-center justify-center border-0 bottom-0'
          disabled={cartItems?.length <= 0}
          onClick={() => navigate({ pathname: '/cart/checkout/customer-info' })}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutSection;
