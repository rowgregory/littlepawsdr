import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addDecimals from '../utils/addDecimals';
import useOutsideDetect from '../utils/useOutsideDetect';
import { toggleCartDrawer } from '../redux/features/cart/cartSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.aside<{ h: number }>`
  max-width: 100%;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background: #fff;
  position: fixed;
  z-index: 5001;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: 300ms;
  padding: 16px;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.2);
  transform: ${({ h }) => `translateY(${-h}px)`};
  height: 0;
  &.move-down {
    min-height: 100vh;
    transform: translateY(0px);
    transition: 300ms;
    transition-easing: linear;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 48px;

    justify-content: flex-start;
    align-items: center;
    transform: ${({ h }) => `translateY(-400px)`};
    &.move-down {
      min-height: 400px;
      max-height: 500px;
      transform: translateY(0px);
      transition: 300ms;
      transition-easing: linear;
    }
  }
`;

const CartDrawer = () => {
  const dispatch = useDispatch();
  const cartRef = useRef(null) as any;
  const cart = useSelector((state: any) => state.cart);
  const cartDrawer = cart?.cartDrawer;
  const cartItemsAmount = cart?.cartItemsAmount;
  const cartItem = cart?.cartItem;
  const subtotal = cart?.subtotal;

  const animation = cartDrawer ? 'move-down' : '';

  const handleClose = () => dispatch(toggleCartDrawer(false));
  useOutsideDetect(cartRef, cartDrawer ? handleClose : () => { });

  return (
    <Container ref={cartRef} className={animation} h={window.innerHeight}>
      <i onClick={() => dispatch(toggleCartDrawer(false))} className='fas fa-times absolute top-3 right-3'></i>
      <div className='grid grid-cols-12 gap-12 h-full w-full md:max-w-5xl'>
        <div className='col-span-12 md:col-span-7'>
          <div className='w-full flex flex-col gap-3.5'>
            <div className='flex items-baseline border-b border-gray-200 pb-2'>
              <i className='fas fa-check fa-2x text-green-600 mr-2'></i>
              <p className='w-full  text-green-600 font-Matter-Regular'>
                {cartItem?.quantity ?? 1} item{cartItemsAmount > 1 && 's'} added to your cart
              </p>
            </div>
            <div className='flex'>
              <img
                src={cartItem?.dachshundImage ?? cartItem?.productImage}
                className='object-cover w-16 h-16'
                alt='Little Paws Dachshund Rescue'
              />
              <div className='flex flex-col ml-3'>
                <p className='font-Matter-Regular text-sm'>
                  {cartItem?.productName}
                  {cartItem?.dachshundName && ` for ${cartItem?.dachshundName}`}
                </p>
                {cartItem?.size && <p className='text-sm font-Matter-Regular'>{cartItem?.size}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-12 md:col-span-5'>
          <p className='flex item-end h-12 pb-2.5 text-lg font-Matter-Medium'>
            Your Cart: {cartItemsAmount} item{cartItemsAmount > 1 ? 's' : ''}
          </p>
          <div className='flex justify-between w-full mt-2.5'>
            <p className='font-Matter-Light text-sm'>Order Subtotal: </p>
            <p className='font-Matter-Light text-sm'>{addDecimals(subtotal)} </p>
          </div>
          <div className='flex justify-between w-full mt-2'>
            <p className='font-Matter-Medium text-sm'>Subtotal: </p>
            <p className='font-Matter-Medium text-sm'>
              {addDecimals(subtotal)}
            </p>
          </div>
          <div className='w-full flex justify-between mt-3'>
            <Link
              className='font-matter-Medium border-2 border-black py-3 px-4 text-xs text-black w-full mr-3 flex justify-center items-center h-11 duration-300 hover:no-underline hover:text-white hover:bg-black'
              to='/cart'
              onClick={() => dispatch(toggleCartDrawer(false))}
            >
              CART
            </Link>
            <Link
              className='font-matter-Medium border-2 border-black bg-black py-3 px-4 text-xs text-[#fff] w-full flex justify-center items-center h-11 duration-300 hover:no-underline hover:text-[#000] hover:bg-white whitespace-nowrap'
              onClick={() => dispatch(toggleCartDrawer(false))}
              to='/cart/place-order'
            >
              CHECKOUT NOW
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartDrawer;
