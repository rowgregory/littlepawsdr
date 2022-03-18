import React, { useEffect, useState } from 'react';
import { Col, Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import Message from '../../components/Message';
import { v4 as uuidv4 } from 'uuid';
import { Text } from '../../components/styles/Styles';
import styled from 'styled-components';
import EmptyCart from '../../components/svg/EmptyCart';
import {
  HorizontalLine,
  Quantity,
  SelectInput,
  SelectInputContainer,
} from '../../components/styles/product-details/Styles';
import NoItemsDefault from '../../components/common/NoItemsDefault';

const Container = styled.div<{ emptycart?: boolean }>`
  padding-bottom: 5rem;
  margin: ${({ emptycart }) => (emptycart ? 'auto' : '')};
  padding-top: 7rem;
`;

const ProductName = styled(Link)`
  color: ${({ theme }) => theme.card.text};
  font-family: 'Roboto Condensed';
  font-size: 1rem;
`;

const CheckoutBtn = styled(Button)`
  background: ${({ theme }) => theme.colors.green06};
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  height: 50px;
  border-radius: 0;
  font-size: 1rem;
  transition: 300ms;
  :hover {
    background: ${({ theme }) => theme.colors.green06};
    color: ${({ theme }) => theme.white};
    filter: brightness(1.1);
    text-decoration: none;
  }
  :disabled {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.white};
    filter: brightness(0.8);
    text-decoration: none;
  }
`;

const CartContainer = styled.div`
  border: 0.5px solid ${({ theme }) => theme.separator};
  padding: 4rem 9rem;
  background-color: ${({ theme }) => theme.secondaryBg};
`;

const RemoveBtn = styled(Button)`
  border-radius: 0;
  background: none;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  font-family: 'Libre Franklin', sans-serif;
  transition: 300ms;
  :hover,
  :active,
  :focus {
    background-color: ${({ theme }) => theme.colors.red} !important;
    border: 1px solid ${({ theme }) => theme.colors.red} !important;
    color: #fff;
    box-shadow: none;
  }
`;

const Cart = ({ history }: any) => {
  const dispatch = useDispatch();
  const [newOrder, setNewOrder] = useState({}) as any;
  const [placedOrderInLocalStorage, setPlacedOrderInLocalStorage] =
    useState(false);

  const cart = useSelector((state: any) => state.cart);
  const { error, cartItems } = cart;

  useEffect(() => {
    if (placedOrderInLocalStorage) {
      history.push(`/cart/place-order`);
    }
  }, [dispatch, history, newOrder.id, placedOrderInLocalStorage]);

  const removeFromCartHandler = (id: string, size: string) => {
    dispatch(removeFromCart(id, size));
  };

  const checkoutHandler = () => {
    const newOrder = {
      id: uuidv4(),
      isPaid: false,
    };

    setNewOrder(newOrder);

    localStorage.setItem('newOrder', JSON.stringify(newOrder));

    setPlacedOrderInLocalStorage(true);

    history.push('/login-options?redirect=place-order');
  };

  if (cartItems.length === 0) {
    return <NoItemsDefault items='cart' Icon={EmptyCart} />;
  }

  return (
    <Container>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '3rem auto 0',
            flexWrap: 'wrap',
          }}
          className='d-flex'
        >
          <Col lg={8} md={12} className='align-items-center'>
            <CartContainer>
              <Text
                fontFamily='Roboto Condensed'
                fontSize='1.875rem'
                marginBottom='0.5rem'
              >
                Shopping Cart
              </Text>
              <HorizontalLine margin='1rem 0 4rem' />

              {cartItems?.map((item: any, i: number) => (
                <Col className='mb-5 px-0' key={i}>
                  <div className='d-flex '>
                    <div style={{ height: '200px', width: '160px' }}>
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        rounded
                        width='100%'
                        height='100%'
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    <Col className='d-flex flex-column justify-content-between'>
                      <div>
                        <ProductName
                          style={{ fontSize: '1rem' }}
                          to={`/shop/product/${item?.product}`}
                        >
                          {item.name}
                        </ProductName>
                        <Text fontSize='0.875rem'>{item.size}</Text>
                        <Text fontSize='0.875rem'>${item.price}</Text>
                      </div>
                      <div className='d-flex mt-3'>
                        <SelectInputContainer
                          style={{
                            width: '84px',
                          }}
                        >
                          <Quantity>QTY</Quantity>
                          <SelectInput
                            as='select'
                            value={item.qty}
                            onChange={(e: any) =>
                              dispatch(
                                addToCart(
                                  item?.product,
                                  Number(e.target.value),
                                  item.size
                                )
                              )
                            }
                          >
                            {[...Array(10).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </SelectInput>
                        </SelectInputContainer>
                        <RemoveBtn
                          onClick={() =>
                            removeFromCartHandler(item.product, item.size)
                          }
                        >
                          Remove
                        </RemoveBtn>
                      </div>
                    </Col>
                  </div>
                </Col>
              ))}
            </CartContainer>

            <Col className='d-flex justify-content-end align-items-center mt-2 mb-4'>
              <Text className='mb-0'>
                Subtotal (
                {cartItems?.reduce((acc: any, item: any) => acc + item?.qty, 0)}
                &nbsp;items):&nbsp;
              </Text>

              <Text marginBottom='0'>
                $
                {cartItems
                  .reduce(
                    (acc: any, item: any) => acc + item.qty * item.price,
                    0
                  )
                  .toFixed(2)}
              </Text>
            </Col>
          </Col>
          {cartItems.length > 0 && (
            <Col md={4} sm={12} className='px-0' style={{ marginTop: '10rem' }}>
              <div
                className='d-flex align-items-center flex-column py-3 mx-auto'
                style={{ maxWidth: '300px' }}
              >
                <CheckoutBtn
                  className='btn-block border-0'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Checkout
                </CheckoutBtn>

                <HorizontalLine></HorizontalLine>
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <Text bold='bold'>Subtotal</Text>
                  <Text bold='bold'>
                    $
                    {cartItems
                      .reduce(
                        (acc: any, item: any) => acc + item.qty * item.price,
                        0
                      )
                      .toFixed(2)}
                  </Text>
                </div>
              </div>
            </Col>
          )}
        </div>
      )}
    </Container>
  );
};

export default Cart;
