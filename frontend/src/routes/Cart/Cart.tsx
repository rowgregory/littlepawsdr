import React from 'react';
import { Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import Message from '../../components/Message';
import { Text } from '../../components/styles/Styles';
import { subTotal, totalItems } from '../../utils/placeOrder';
import {
  CartBtn,
  CartContainer,
  CartItemContainer,
  CheckoutBtn,
  CheckoutBtnColumn,
  Container,
  Divider,
  ProductName,
  SecondSubTotal,
} from '../../components/styles/cart/Styles';
import { Link, useHistory } from 'react-router-dom';
import LogoDay from '../../components/assets/logo-transparent.png';
import UIFx from 'uifx';
import Add from '../../components/sounds/click02.wav';
import Thump from '../../components/sounds/thump01.mp3';
import LeftArrow from '../../components/svg/LeftArrow';

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productAmountChanged = new UIFx(Add);
  const reachedProductLimit = new UIFx(Thump);

  let {
    cart: { cartItems, error, loading },
  } = useSelector((state: any) => state);

  const addOneItem = (e: any, item: any) => {
    const currentValue = +e.target.ariaValueNow;
    const productAmount = item?.sizes.filter(
      (obj: any) => obj?.size === item?.size
    )[0]?.amount;
    if (currentValue === item.countInStock || currentValue === productAmount) {
      reachedProductLimit.play();
      return;
    }

    productAmountChanged.play();
    dispatch(
      addToCart(item?.product, currentValue + 1, item.size, item?.sizes)
    );
  };

  const deleteOneItem = (e: any, item: any) => {
    const currentValue = +e.target.ariaValueNow;
    if (currentValue === 1) {
      reachedProductLimit.play();
      return;
    }

    productAmountChanged.play();
    dispatch(
      addToCart(item?.product, currentValue - 1, item?.size, item?.sizes)
    );
  };

  return (
    <CartContainer>
      <Container>
        <div
          className='d-flex align-items-center'
          style={{ marginBottom: '64px' }}
        >
          <Image src={LogoDay} height='48px' />
          <Divider />
          <Text fontSize='28px' fontWeight={400} color='#464342'>
            {cartItems?.length === 0 ? 'Empty Shopping Cart' : 'Shopping Cart'}
          </Text>
        </div>
        {error ? (
          <>
            <Message variant='danger'>{error}</Message>
            <Link to='/shop'>Go to Shop</Link>
          </>
        ) : (
          <>
            <CartItemContainer>
              <tbody>
                {cartItems?.map((item: any, i: number) => (
                  <tr key={i}>
                    <td style={{ padding: '10px 20px 10px', width: '125px' }}>
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        roundedCircle
                        width='85px'
                        height='85px'
                        style={{ objectFit: 'contain', background: '#fff' }}
                      />
                    </td>

                    <td style={{ maxWidth: '80px' }}>
                      <ProductName to={`/shop/product/${item?.product}`}>
                        {item.name}
                      </ProductName>
                      {item?.size && <Text fontSize='12px'>{item?.size}</Text>}
                    </td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <Text
                          marginRight='8px'
                          fontWeight={400}
                          color='#858382'
                          width='15px'
                        >
                          {item.qty}
                        </Text>

                        <div className='d-flex flex-column'>
                          <CartBtn
                            className='plus'
                            onClick={(e: any) => addOneItem(e, item)}
                            aria-valuenow={item.qty}
                          >
                            +
                          </CartBtn>
                          <CartBtn
                            onClick={(e: any) => deleteOneItem(e, item)}
                            aria-valuenow={item.qty}
                          >
                            -
                          </CartBtn>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Text className='pr-2' fontWeight='bold'>
                        ${item?.price.toFixed(2)}
                      </Text>
                    </td>
                    <td className='remove-cart-item'>
                      <i
                        className='fas fa-times fa-sm ml-3'
                        onClick={() =>
                          dispatch(removeFromCart(item.product, item.size))
                        }
                      ></i>
                    </td>
                  </tr>
                ))}
                <tr style={{ background: '#ecf0f1' }}>
                  <td>
                    <LeftArrow text='Shop' url='/shop' />
                  </td>
                  <td></td>
                  <td>
                    <Text className='mb-0'>Subtotal</Text>
                  </td>
                  <td>
                    <Text fontWeight='bold'>${subTotal(cartItems)}</Text>
                  </td>
                </tr>
              </tbody>
            </CartItemContainer>
          </>
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
              Subtotal ({totalItems(cartItems)}&nbsp;items):&nbsp;
            </Text>
            <Text
              color='#fff'
              fontWeight='bold'
              fontSize='14px'
              marginBottom='0'
            >
              ${subTotal(cartItems)}
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
            onClick={() => history.push({ pathname: '/login-options' })}
          >
            Checkout
          </CheckoutBtn>
        </div>
      </CheckoutBtnColumn>
    </CartContainer>
  );
};

export default Cart;
