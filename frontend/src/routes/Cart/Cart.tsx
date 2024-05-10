import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  CartContainer,
  CartItemContainer,
  CheckoutBtn,
  CheckoutBtnColumn,
  Container,
  SecondSubTotal,
} from '../../components/styles/cart/Styles';
import { Link, useNavigate } from 'react-router-dom';
import LogoDay from '../../components/assets/logo-transparent.png';
import LeftArrow from '../../components/svg/LeftArrow';
import CartItem from './CartItem';
import addDecimals from '../../utils/addDecimals';
import SplitTextToChars from '../../utils/SplitTextToChars';
import { RootState } from '../../redux/toolkitStore';
import { Fragment } from 'react';

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const cartItems = cart.cartItems;
  const cartItemsAmount = cart.cartItemsAmount;
  const subtotal = cart.subtotal;
  const error = cart.error;
  const loading = cart.loading;

  return (
    <CartContainer>
      <Container>
        <div className='flex items-center mb-16'>
          <Link to='/'>
            <img src={LogoDay} className='h-24 object-cover' alt='Cart Logo' />
          </Link>
          <div className='w-[1px] h-14 bg-gray-400 mx-3 sm:mx-4'></div>
          <p className='font-Matter-Regular text-gray-800 text-lg md:text-xl'>
            {cartItemsAmount === 0 ? 'Empty Shopping Cart' : 'Shopping Cart'}
          </p>
        </div>
        {error ? (
          <Fragment>
            <p className='font-Matter-Medium bg-red-600 text-[#fff] px-4 py-1.5 my-2.5'>{error}</p>
            <Link to='/welcome-wieners'>Go to Welcome Wieners</Link>
            <Link to='/merch'>Go to Merch</Link>
            <Link to='/ecards'>Go to Ecards</Link>
          </Fragment>
        ) : cartItemsAmount > 0 ? (
          <CartItemContainer>
            <tbody>
              {cartItems?.map((item: any, i: number) => (
                <CartItem key={i} item={item} />
              ))}
              <tr style={{ background: '#ecf0f1' }}>
                <td style={{ width: '136px' }}>
                  <LeftArrow text='Welcome Wieners' url='/welcome-wieners' />
                  <LeftArrow text='Merch' url='/merch' />
                  <LeftArrow text='Ecards' url='/ecards' />
                </td>
                <td></td>
                <td>
                  <p className='mb-0 font-Matter-Light'>Subtotal</p>
                </td>
                <td>
                  <p className='font-Matter-Medium'>{addDecimals(subtotal)}</p>
                </td>
              </tr>
            </tbody>
          </CartItemContainer>
        ) : (
          <div className='flex flex-col w-full'>
            <SplitTextToChars
              text='Hey, thanks for being here! Checkout out our latest merchandise, ecards, and welcome wieners!'
              page='cart'
              fontSize='16px'
            />
          </div>
        )}
      </Container>
      <CheckoutBtnColumn>
        <SecondSubTotal>
          <p className='text-3xl text-[#9761aa] font-Matter-Medium mb-12'>
            Order Summary
          </p>
          <div className='flex items-baseline justify-between w-full'>
            <p className='text-sm font-matter-Light text-white'>
              Subtotal ({cartItemsAmount}&nbsp;items):&nbsp;
            </p>
            <p className='text-white font-Matter-Medium text-sm mb-0'>
              {addDecimals(subtotal)}
            </p>
          </div>
        </SecondSubTotal>
        <div className='d-flex flex-column'>
          {loading && (
            <Spinner
              className='mx-auto mb-2'
              animation='border'
              size='sm'
              style={{ color: '#fff' }}
            />
          )}

          <CheckoutBtn
            disabled={cartItems?.length <= 0}
            onClick={() => navigate({ pathname: '/cart/place-order' })}
          >
            Checkout
          </CheckoutBtn>
        </div>
      </CheckoutBtnColumn>
    </CartContainer>
  );
};

export default Cart;
