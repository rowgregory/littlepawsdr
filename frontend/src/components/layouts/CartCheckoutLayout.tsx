import { ReactNode, useEffect } from 'react';
import CheckoutProgressTracker from '../shop/checkout/CheckoutProgressTracker';
import ItemsContainer from '../shop/checkout/ItemsContainer';
import { DarkMosaic, WhiteLogo } from '../assets';
import { setShowModal } from '../../redux/features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/toolkitStore';
import LeavePlaceOrderModal from '../modals/LeavePlaceOrderModal';

const CartCheckoutLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state: any) => state.cart);

  useEffect(() => {
    if (cartItems?.length === 0) navigate('/cart');
  }, [navigate, cartItems]);

  return (
    <div className='x-auto w-full bg-slate-100 min-h-screen'>
      <LeavePlaceOrderModal />
      <div
        style={{ backgroundImage: `url(${DarkMosaic})` }}
        className='
          h-28 sm:h-48 md:h-60 bg-repeat top-[65px] border-b-[7px] border-[#9863a8] bg-teal-500 flex flex-col'
      >
        <img
          onClick={() => dispatch(setShowModal(true))}
          src={WhiteLogo}
          alt='LPDR'
          className='w-20 px-2.5'
        />
        <h1 className='max-w-screen-xl my-auto w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff]'>
          Checkout
        </h1>
      </div>
      <div className='grid grid-cols-12 gap-6 w-full pt-3 px-[16px] md:px-6 max-w-screen-lg mx-auto pb-24 h-fit bg-white'>
        <div className='col-span-12 lg:col-span-8'>
          <CheckoutProgressTracker />
          {children}
        </div>
        <div className='col-span-12 lg:col-span-4'>
          <ItemsContainer />
        </div>
      </div>
    </div>
  );
};

export default CartCheckoutLayout;
