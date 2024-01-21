import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckoutNowBtn,
  CheckoutWrapper,
  Container,
  ContineShoppingBtn,
  InnerWrapper,
  ItemWrapper,
} from './styles/welcome-wiener/Styles';
import { Flex, Text } from './styles/Styles';
import { Image } from 'react-bootstrap';
import { openCartDrawer } from '../actions/cartActions';
import addDecimals from '../utils/addDecimals';
import useOutsideDetect from '../utils/useOutsideDetect';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const cartRef = useRef(null) as any;

  const state = useSelector((state: any) => state);
  const cartDrawer = state.cart.cartDrawer;
  const cartItemsAmount = state.cart.cartItemsAmount;
  const cartItem = state.cart.cartItem;
  const subtotal = state.cart.subtotal;

  const animation = cartDrawer ? 'move-down' : '';

  const handleClose = () => dispatch(openCartDrawer(false));
  useOutsideDetect(cartRef, handleClose)

  return (
    <Container ref={cartRef} className={animation} h={window.innerHeight}>
      <i
        onClick={() => dispatch(openCartDrawer(false))}
        className='fas fa-times'
        style={{ position: 'absolute', top: '16px', right: '16px' }}
      ></i>
      <InnerWrapper>
        <ItemWrapper>
          <Flex flexDirection='column'>
            <Text
              p='0 0 12px 0'
              width='100%'
              borderBottom='1px solid #ccc'
              color='green'
            >
              <span className='mr-3'>
                <i
                  className='fas fa-check fa-2x'
                  style={{ color: 'green' }}
                ></i>
              </span>
              {cartItem?.quantity ?? 1} item{cartItemsAmount > 1 && 's'} added
              to your cart
            </Text>
            <Flex className='mt-3'>
              <Image
                src={cartItem?.dachshundImage ?? cartItem?.productImage}
                style={{ objectFit: 'cover' }}
                width='65px'
                height='65px'
              />
              <Flex flexDirection='column' marginLeft='16px'>
                <Text>
                  {cartItem?.productName}
                  {cartItem?.dachshundName && ` for ${cartItem?.dachshundName}`}
                </Text>
                {cartItem?.size && (
                  <Text fontSize='12px'>{cartItem?.size}</Text>
                )}
              </Flex>
            </Flex>
          </Flex>
        </ItemWrapper>
        <CheckoutWrapper>
          <Text
            className='d-flex align-item-end'
            height='48px'
            p='0 0 12px 0'
            width='100%'
            borderBottom='1px solid #ccc'
            fontSize='18px'
            fontWeight='600'
          >
            Your Cart: {cartItemsAmount} item{cartItemsAmount > 1 ? 's' : ''}
          </Text>
          <Flex justifyContent='space-between' width='100%' marginTop='12px'>
            <Text>Order Subtotal: </Text>
            <Text>{addDecimals(subtotal)} </Text>
          </Flex>
          <Flex
            justifyContent='space-between'
            width='100%'
            marginTop='8px'
            borderBottom='1px solid #ccc'
          >
            <Text fontWeight='500'>Subtotal: </Text>
            <Text fontWeight='500' p='0 0 16px'>
              {addDecimals(subtotal)}
            </Text>
          </Flex>
          <Flex width='100%' justifyContent='space-between' marginTop='16px'>
            <ContineShoppingBtn
              to={cartItem?.dachshundId ? '/welcome-wieners' : '/merch'}
              onClick={() => dispatch(openCartDrawer(false))}
            >
              EXPLORE MORE
            </ContineShoppingBtn>
            <CheckoutNowBtn
              onClick={() => dispatch(openCartDrawer(false))}
              to='/cart/place-order'
            >
              CHECKOUT NOW
            </CheckoutNowBtn>
          </Flex>
        </CheckoutWrapper>
      </InnerWrapper>
    </Container>
  );
};

export default CartDrawer;
