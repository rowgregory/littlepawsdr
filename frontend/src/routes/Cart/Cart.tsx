import { Image, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Message from '../../components/Message';
import { Flex, Text } from '../../components/styles/Styles';
import {
  CartContainer,
  CartItemContainer,
  CheckoutBtn,
  CheckoutBtnColumn,
  Container,
  Divider,
  SecondSubTotal,
} from '../../components/styles/cart/Styles';
import { Link, useNavigate } from 'react-router-dom';
import LogoDay from '../../components/assets/logo-transparent.png';
import LeftArrow from '../../components/svg/LeftArrow';
import CartItem from './CartItem';
import addDecimals from '../../utils/addDecimals';
import SplitTextToChars from '../../utils/SplitTextToChars';

const Cart = () => {
  const history = useNavigate();
  const state = useSelector((state: any) => state);
  const cartItems = state.cart.cartItems;
  const cartItemsAmount = state.cart.cartItemsAmount;
  const subtotal = state.cart.subtotal;
  const error = state.cart.error;
  const loading = state.cart.loading;

  return (
    <CartContainer>
      <Container>
        <div
          className='d-flex align-items-center'
          style={{ marginBottom: '64px' }}
        >
          <Link to='/'>
            <Image src={LogoDay} height='48px' alt=' Cart Logo' />
          </Link>
          <Divider />
          <Text fontSize='28px' fontWeight={400} color='#464342'>
            {cartItemsAmount === 0 ? 'Empty Shopping Cart' : 'Shopping Cart'}
          </Text>
        </div>
        {error ? (
          <>
            <Message variant='danger'>{error}</Message>
            <Link to='/welcome-wieners'>Go to Welcome Wieners</Link>
            <Link to='/merch'>Go to Merch</Link>
            <Link to='/ecards'>Go to Ecards</Link>
          </>
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
                  <Text className='mb-0'>Subtotal</Text>
                </td>
                <td>
                  <Text fontWeight='bold'>{addDecimals(subtotal)}</Text>
                </td>
              </tr>
            </tbody>
          </CartItemContainer>
        ) : (
          <Flex flexDirection='column' width='100%'>
            <SplitTextToChars
              text='Hey, thanks for being here! Checkout out our latest merchandise, ecards, and welcome wieners!'
              page='cart'
              fontSize='16px'
            />
          </Flex>
        )}
      </Container>
      <CheckoutBtnColumn>
        <SecondSubTotal>
          <Text
            fontSize='28px'
            fontWeight={400}
            color='#9761aa'
            marginBottom='48px'
          >
            Order Summary
          </Text>
          <div className='d-flex align-items-baseline justify-content-between w-100'>
            <Text fontSize='14px' color='#fff'>
              Subtotal ({cartItemsAmount}&nbsp;items):&nbsp;
            </Text>
            <Text
              color='#fff'
              fontWeight='bold'
              fontSize='14px'
              marginBottom='0'
            >
              {addDecimals(subtotal)}
            </Text>
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
            onClick={() => history({ pathname: '/cart/place-order' })}
          >
            Checkout
          </CheckoutBtn>
        </div>
      </CheckoutBtnColumn>
    </CartContainer>
  );
};

export default Cart;
