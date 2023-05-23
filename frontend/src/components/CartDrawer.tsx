import { memo, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckoutNowBtn,
  CheckoutWrapper,
  Container,
  ContineShoppingBtn,
  InnerWrapper,
  ItemWrapper,
} from './styles/welcome-wiener/Styles';
import useHandleOutsideClick from '../utils/hooks/useOutsideHandleClick';
import { Flex, Text } from './styles/Styles';
import { Image } from 'react-bootstrap';
import { openCartDrawer } from '../actions/cartActions';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const cartRef = useRef(null) as any;

  const cartDrawer = useSelector((state: any) => state.cart.cartDrawer);
  const cartItemsAmount = useSelector(
    (state: any) => state.cart.cartItemsAmount
  );
  const cartItem = useSelector((state: any) => state.cart.cartItem);
  const subtotal = useSelector((state: any) => state.cart.subtotal);

  const memoizedCartDrawer = useMemo(() => cartDrawer, [cartDrawer]);

  const animation = memoizedCartDrawer ? 'move-down' : '';

  useHandleOutsideClick(() => {
    dispatch(openCartDrawer(false));
  }, cartRef);

  useEffect(() => {
    return () => {
      cartRef.current = null;
    };
  }, []);

  return (
    <Container ref={cartRef} className={animation}>
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
              1 item added to your cart
            </Text>
            <Flex className='mt-3'>
              <Image
                src={cartItem?.productImage}
                style={{ objectFit: 'cover' }}
                width='65px'
                height='65px'
              />
              <Flex flexDirection='column' marginLeft='16px'>
                <Text>
                  {cartItem?.productName} for {cartItem?.dachshundName}
                </Text>
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
            <Text>{subtotal} </Text>
          </Flex>
          <Flex
            justifyContent='space-between'
            width='100%'
            marginTop='8px'
            borderBottom='1px solid #ccc'
          >
            <Text fontWeight='500'>Subtotal: </Text>
            <Text fontWeight='500' p='0 0 16px'>
              {subtotal}{' '}
            </Text>
          </Flex>
          <Flex width='100%' justifyContent='space-between' marginTop='16px'>
            <ContineShoppingBtn to='/welcome-wieners'>
              EXPLORE MORE
            </ContineShoppingBtn>
            <CheckoutNowBtn to='/cart/place-order'>CHECKOUT NOW</CheckoutNowBtn>
          </Flex>
        </CheckoutWrapper>
      </InnerWrapper>
    </Container>
  );
};

export default memo(CartDrawer);
