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
import GoBackBtn from '../../utils/GoBackBtn';

const Container = styled.div<{ emptycart?: boolean }>`
  padding-bottom: 5rem;
  margin: ${({ emptycart }) => (emptycart ? 'auto' : '')};
`;

const ProductName = styled(Link)`
  color: ${({ theme }) => theme.card.text};
  font-family: 'Duru Sans';
  font-size: 1rem;
`;

const CheckoutBtn = styled(Button)`
  background: ${({ theme }) => theme.colors.green04};
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  height: 50px;
  border-radius: 0;
  font-size: 1rem;
  transition: 300ms;
  width: 100%;
  :hover {
    background: ${({ theme }) => theme.colors.green04};
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
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    width: 300px;
  }
`;

const CartContainer = styled.div`
  border: 0.5px solid ${({ theme }) => theme.separator};
  padding: 2rem 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 2rem 6rem;
  }
`;

const RemoveBtn = styled(Button)`
  border-radius: 0;
  background: ${({ theme }) => theme.input.bg};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  font-family: 'Libre Franklin', sans-serif;
  transition: 300ms;
  height: 60px;
  :hover,
  :active,
  :focus {
    background-color: ${({ theme }) => theme.colors.red} !important;
    border: 1px solid ${({ theme }) => theme.colors.red} !important;
    color: #fff;
    box-shadow: none;
  }
`;

const ImgContainer = styled.div`
  width: 100px;
  height: 100px;
  object-fit: cover;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    width: 150px;
    height: 150px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    width: 200px;
    height: 200px;
  }
`;

const CheckoutBtnColumn = styled(Col)`
  margin: 0 auto;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: flex;
    align-items: center;
  }
`;

const SecondSubTotal = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: block;
    width: 100%;
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
            margin: '0 auto',
            flexWrap: 'wrap',
          }}
          className='d-flex'
        >
          <Col lg={8} md={12} className='align-items-center'>
            <GoBackBtn to='/shop' />
            <CartContainer>
              <Text
                fontFamily='Duru Sans'
                fontSize='1.875rem'
                marginBottom='0.5rem'
              >
                Shopping Cart
              </Text>
              <HorizontalLine margin='1rem 0 4rem' />

              {cartItems?.map((item: any, i: number) => (
                <div className='mb-5 px-0' key={i}>
                  <div className='d-flex '>
                    <ImgContainer>
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        rounded
                        width='100%'
                        height='100%'
                        style={{ objectFit: 'cover' }}
                      />
                    </ImgContainer>

                    <Col className='d-flex flex-column justify-content-between'>
                      <div>
                        <ProductName
                          style={{ fontSize: '1rem' }}
                          to={`/shop/product/${item?.product}`}
                        >
                          {item.name} ({item.qty})
                        </ProductName>
                        <Text fontSize='0.875rem'>{item?.size}</Text>
                        <Text fontSize='0.875rem'>${item?.price}</Text>
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
                                  item.size,
                                  item?.sizes
                                )
                              )
                            }
                          >
                            {[
                              ...Array(
                                item?.sizes?.length > 0
                                  ? item?.sizes?.filter(
                                      (x: any) => x?.size === item?.size
                                    )[0]?.amount
                                  : item.countInStock
                              ).keys(),
                            ].map((x: any, i: number) => (
                              <option key={x + 1} value={x + 1}>
                                {i + 1}
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
                </div>
              ))}
            </CartContainer>

            <Col className='d-flex justify-content-end align-items-center px-0 mt-2 mb-4'>
              <Text className='mb-0'>
                Subtotal (
                {cartItems?.reduce(
                  (acc: any, item: any) => acc + +item?.qty,
                  0
                )}
                &nbsp;items):&nbsp;
              </Text>

              <Text marginBottom='0'>
                $
                {cartItems
                  .reduce(
                    (acc: any, item: any) => acc + item?.qty * item?.price,
                    0
                  )
                  .toFixed(2)}
              </Text>
            </Col>
          </Col>
          {cartItems.length > 0 && (
            <CheckoutBtnColumn md={4} sm={12} className='px-0'>
              <div className='d-flex align-items-center flex-column py-3 mx-auto'>
                <CheckoutBtn
                  className='border-0'
                  disabled={cartItems?.length === 0}
                  onClick={checkoutHandler}
                >
                  Checkout
                </CheckoutBtn>

                <SecondSubTotal>
                  <HorizontalLine></HorizontalLine>
                  <div className='d-flex align-items-center justify-content-between w-100'>
                    <Text fontWeight='bold'>Subtotal</Text>
                    <Text fontWeight='bold'>
                      $
                      {cartItems
                        .reduce(
                          (acc: any, item: any) =>
                            acc + item?.qty * item?.price,
                          0
                        )
                        .toFixed(2)}
                    </Text>
                  </div>
                </SecondSubTotal>
              </div>
            </CheckoutBtnColumn>
          )}
        </div>
      )}
    </Container>
  );
};

export default Cart;
