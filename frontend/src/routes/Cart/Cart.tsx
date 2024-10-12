import { useSelector } from 'react-redux';
import addDecimals from '../../utils/addDecimals';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import EmptyCart from '../../components/shop/cart/EmptyCart';
import CheckoutSection from '../../components/shop/cart/CheckoutSection';
import CartItem from '../../components/shop/cart/CartItem';
import CartHeader from '../../components/shop/cart/CartHeader';
import { useEffect } from 'react';
import { setShowModal } from '../../redux/features/cart/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cartItems, cartItemsAmount, subtotal } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(setShowModal(false));
  }, [dispatch]);

  if (cartItemsAmount <= 0) return <EmptyCart />;

  return (
    <div className='bg-slate-50 flex flex-col h-screen justify-between md:flex-row'>
      <div className='m-0 flex flex-col w-full pt-3 px-2.5 pb-[18px] sm:min-h-screen sm:pt-12 sm:px-7 sm:pb-0 md:px-[45px] lg:px-16'>
        <CartHeader />
        {cartItems?.map((item: any, i) => (
          <CartItem key={i} item={item} />
        ))}
        <div className='flex justify-end gap-4 mt-10'>
          <p className='mb-0 font-Matter-Light'>Subtotal:</p>
          <p className='font-Matter-Medium'>{addDecimals(subtotal)}</p>
        </div>
      </div>
      <CheckoutSection />
    </div>
  );
};

export default Cart;
