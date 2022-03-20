import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Image, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { PayPalButton } from 'react-paypal-button-v2';
import Loader from '../../components/Loader';
import {
  createOrder,
  sendOrderConfirmationEmail,
} from '../../actions/orderActions';
import { STATES } from '../../utils/states';
import { createGuestOrder } from '../../actions/guestOrderActions';
import { CART_CLEAR_ITEMS } from '../../constants/cartConstants';
import { GUEST_USER_REGISTER_RESET } from '../../constants/guestUserConstants';
import { Text } from '../../components/styles/Styles';
import {
  Container,
  LeftRail,
  LeftRailSectionTitle,
  RightRail,
  SubContainer,
  LeftRailContainer,
  EnterAPaswordBtn,
} from '../../components/styles/place-order/Styles';
import { HorizontalLine } from '../../components/styles/product-details/Styles';
import PayPalButtonImg from '../../components/assets/payPalButtons.png';
import PayPalButtonImgNight from '../../components/assets/payPalButtonsNight.png';
import { useTheme } from 'styled-components';
import PasswordMeter from '../../components/PasswordMeter';
import { register } from '../../actions/userActions';

const PlaceOrder = ({ history }: any) => {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const [sdkReady, setSdkReady] = useState(false);
  const [readyToCreateOrder, setReadyToCreateOrder] = useState(false);
  const [readyToCreateGuestOrder, setReadyToCreateGuestOrder] = useState(false);
  const [orderLoader, setOrderLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const cart = useSelector((state: any) => state.cart);
  const { cartItems, paymentMethod } = cart;

  const orderCreate = useSelector((state: any) => state.orderCreate);
  const {
    order,
    success: successOrderCreate,
    error: errorOrderCreate,
  } = orderCreate;

  const guestOrderCreate = useSelector((state: any) => state.guestOrderCreate);
  const {
    success: successGuestOrderCreate,
    error: errorGuestOrderCreate,
    guestOrder,
  } = guestOrderCreate;

  const guestUserRegister = useSelector(
    (state: any) => state.guestUserRegister
  );
  const { guestUserInfo } = guestUserRegister;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const safs = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress') || '')
    : {};

  const [shippingName, setShippingName] = useState(safs?.name ?? '');
  const [formShippingAddress, setFormShippingAddress] = useState(
    safs?.address ?? ''
  );
  const [shippingCity, setShippingCity] = useState(safs?.city ?? '');
  const [shippingState, setShippingState] = useState(safs?.state ?? '');
  const [shippingZipPostalCode, setShippingZipPostalCode] = useState(
    safs?.zipPostalCode ?? ''
  );
  const [country] = useState('US');

  const newOrderFromStorage = localStorage.getItem('newOrder')
    ? JSON.parse(localStorage.getItem('newOrder') || '')
    : {};

  const noOrder = Object.keys(newOrderFromStorage).length === 0;

  useEffect(() => {
    if (noOrder) return history.push('/');
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };
    if (successOrderCreate || successGuestOrderCreate) {
      window.scrollTo(0, 0);
      setReadyToCreateOrder(false);
      setReadyToCreateGuestOrder(false);
      setOrderLoader(false);

      dispatch({ type: CART_CLEAR_ITEMS });

      if (successOrderCreate) {
        dispatch(sendOrderConfirmationEmail(order, userInfo?.email));
        history.push(`/order/${order?._id}`);
      }

      if (successGuestOrderCreate) {
        dispatch(sendOrderConfirmationEmail(guestOrder));
        history.push(`/guest-order/${guestOrder?._id}`);
      }

      localStorage.removeItem('newOrder');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('guestUserInfo');

      dispatch({ type: GUEST_USER_REGISTER_RESET });
    } else if (!newOrderFromStorage.isPaid && !sdkReady) {
      addPayPalScript();
    }

    return () => setSdkReady(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, order, successOrderCreate, successGuestOrderCreate]);

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc: any, item: any) => acc + item.price * item.qty,
      0
    )
  );

  const getStateTax = () => {
    let result: any;
    if (shippingState === '') return 4.0;
    // eslint-disable-next-line array-callback-return
    STATES.some((obj) => {
      if (obj.value === shippingState) {
        result = obj.taxRate;
        return true;
      }
    });

    return result;
  };

  const shippingPrice = (3.5).toFixed(2);

  const taxPrice = (
    (getStateTax()?.toFixed(2) / 100) *
    Number(itemsPrice)
  ).toFixed(2);

  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  useEffect(() => {
    if (readyToCreateOrder) {
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify({
          name: shippingName,
          address: formShippingAddress,
          city: shippingCity,
          state: shippingState,
          zipPostalCode: shippingZipPostalCode,
          country,
        })
      );
      dispatch(
        createOrder({
          orderItems: cartItems,
          shippingAddress: {
            name: shippingName,
            address: formShippingAddress,
            city: shippingCity,
            state: shippingState,
            zipPostalCode: shippingZipPostalCode,
            country,
          },
          paymentMethod: 'PayPal',
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        })
      );
    }
  }, [
    cartItems,
    country,
    dispatch,
    formShippingAddress,
    itemsPrice,
    paymentMethod,
    readyToCreateOrder,
    shippingCity,
    shippingName,
    shippingPrice,
    shippingState,
    shippingZipPostalCode,
    taxPrice,
    totalPrice,
  ]);

  const validations = [
    password.length >= 5 ? 1 : 0,
    password.search(/[A-Z]/) > -1 ? 1 : 0,
    password.search(/[0-9]/) > -1 ? 1 : 0,
    password.search(/[$&+,:;=?@#]/) > -1 ? 1 : 0,
  ];

  const strength = validations.reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    if (readyToCreateGuestOrder) {
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify({
          name: shippingName,
          address: formShippingAddress,
          city: shippingCity,
          state: shippingState,
          zipPostalCode: shippingZipPostalCode,
          country,
        })
      );

      if (strength === 4) {
        dispatch(register(name, guestUserInfo?.email, password));
      }

      dispatch(
        createGuestOrder({
          orderItems: cartItems,
          shippingAddress: {
            name: shippingName,
            address: formShippingAddress,
            city: shippingCity,
            state: shippingState,
            zipPostalCode: shippingZipPostalCode,
            country,
          },
          paymentMethod: 'PayPal',
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
          email: guestUserInfo?.email,
        })
      );
    }
  }, [
    cartItems,
    country,
    dispatch,
    formShippingAddress,
    guestUserInfo?.email,
    itemsPrice,
    name,
    password,
    paymentMethod,
    readyToCreateGuestOrder,
    shippingCity,
    shippingName,
    shippingPrice,
    shippingState,
    shippingZipPostalCode,
    strength,
    taxPrice,
    totalPrice,
  ]);

  const successPaymentHandler = (paymentResult: any, data: any) => {
    setOrderLoader(true);
    paymentResult.status === 'COMPLETED' &&
      userInfo?.confirmed &&
      data.orderID &&
      setReadyToCreateOrder(true);
    paymentResult.status === 'COMPLETED' &&
      Object.keys(guestUserInfo).length > 0 &&
      data.orderID &&
      setReadyToCreateGuestOrder(true);
  };

  const addressFormIsCompleted = ![
    shippingName,
    formShippingAddress,
    shippingCity,
    shippingState,
    shippingZipPostalCode,
  ].includes('');

  return (
    <Container>
      {orderLoader && <Loader />}
      {errorOrderCreate && (
        <Message variant='danger'>{errorOrderCreate}</Message>
      )}
      {errorGuestOrderCreate && (
        <Message variant='danger'>{errorGuestOrderCreate}</Message>
      )}
      <SubContainer>
        <LeftRail md={8} sm={12} className='left-rail'>
          <LeftRailContainer>
            <Text fontSize='1.75rem' marginBottom='1.8rem' letterSpacing='0'>
              Checkout
            </Text>
            <LeftRailSectionTitle>
              <Text bold='bold' fontSize='0.9375rem'>
                Hi, {userInfo?.name.toUpperCase() ?? guestUserInfo.email}
              </Text>
            </LeftRailSectionTitle>
            <LeftRailSectionTitle>Shipping address</LeftRailSectionTitle>
            {showMessage && (
              <Message
                variant='danger'
                showMessage={showMessage}
                setShowMessage={setShowMessage}
              >
                {message}
              </Message>
            )}
            <Form>
              <Form.Group controlId='name' className='mb-3'>
                <Form.Control
                  type='text'
                  value={shippingName}
                  placeholder='Name'
                  onChange={(e) => setShippingName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='address'>
                <Form.Control
                  type='text'
                  value={formShippingAddress}
                  required
                  onChange={(e) => setFormShippingAddress(e.target.value)}
                  placeholder='Address'
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='city' className='city'>
                <Form.Control
                  type='text'
                  value={shippingCity}
                  required
                  onChange={(e) => setShippingCity(e.target.value)}
                  placeholder='City'
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='state' className='state'>
                <Form.Control
                  value={shippingState}
                  as='select'
                  onChange={({ target }) => setShippingState(target.value)}
                  className='state-select'
                >
                  {STATES.map((obj, i) => (
                    <option key={i} value={obj.value}>
                      {obj.text}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='zipPostalCode' className='zip'>
                <Form.Control
                  type='number'
                  value={shippingZipPostalCode}
                  required
                  onChange={(e) => setShippingZipPostalCode(e.target.value)}
                  placeholder='Zip code'
                ></Form.Control>
              </Form.Group>
            </Form>
          </LeftRailContainer>
          <LeftRailContainer>
            {guestUserInfo !== null &&
              guestUserInfo !== undefined &&
              Object.keys(guestUserInfo).length > 0 && (
                <>
                  <LeftRailSectionTitle>Contact Info</LeftRailSectionTitle>
                  <Form>
                    <Form.Group controlId='name'>
                      <Form.Control
                        type='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                      <Form.Control
                        type='email'
                        value={guestUserInfo?.email || email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                      ></Form.Control>
                    </Form.Group>
                    <EnterAPaswordBtn
                      onClick={() => setShowPasswordInput(!showPasswordInput)}
                    >
                      Enter a password to create an account{' '}
                      <i
                        className={`fas fa-angle-${
                          showPasswordInput ? 'up' : 'down'
                        }`}
                      ></i>
                    </EnterAPaswordBtn>
                    {showPasswordInput && (
                      <>
                        <Text fontSize='0.8rem' marginBottom='1rem'>
                          Save your information so you can check out faster and
                          track orders easily.
                        </Text>
                        <Form.Group controlId='password'>
                          <Form.Control
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                          ></Form.Control>
                        </Form.Group>
                        <PasswordMeter
                          validations={validations}
                          strength={strength}
                        />
                      </>
                    )}
                  </Form>
                </>
              )}
          </LeftRailContainer>
          <LeftRailContainer>
            <LeftRailSectionTitle>
              Secure Payment <i className='fas fa-lock ml-1 fa-sm'></i>
            </LeftRailSectionTitle>
            {addressFormIsCompleted ? (
              <div>
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={totalPrice}
                    onSuccess={successPaymentHandler}
                    onError={(err: any) => console.log('ON ERROR', err)}
                    shippingPreference='NO_SHIPPING'
                  />
                )}
              </div>
            ) : (
              <Image
                onClick={() => {
                  setMessage('Please fill out shipping address');
                  setShowMessage(true);
                }}
                src={
                  theme.mode === 'day' ? PayPalButtonImg : PayPalButtonImgNight
                }
                alt='paypal-buttons'
                className='w-100'
              />
            )}
          </LeftRailContainer>
        </LeftRail>
        <RightRail sm={12} className='right-rail'>
          <Col className='px-0'>
            <Text bold='bold' fontSize='1.125rem' marginBottom='1.125rem'>
              Your items
            </Text>

            <div>
              {cartItems.map((item: any, index: number) => (
                <div className='d-flex my-2' key={index}>
                  <Col className='pl-0'>
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>
                  <Col className='d-flex flex-column pr-0'>
                    <Text fontSize='0.875rem'>{item.name}</Text>
                    <Text fontSize='0.875rem'>{item.size}</Text>

                    <Text>{addDecimals(item.qty * item.price)}</Text>
                  </Col>
                </div>
              ))}
            </div>
          </Col>
          <HorizontalLine></HorizontalLine>
          <div className='d-flex justify-content-between'>
            <Text>
              Subtotal (
              {cartItems.reduce((acc: any, item: any) => acc + item.qty, 0)}{' '}
              item
              {cartItems.length === 1 ? '' : 's'})
            </Text>
            <Text>${itemsPrice}</Text>
          </div>
          <div className='d-flex justify-content-between my-1'>
            <Text>Shipping</Text>
            <Text>${shippingPrice}</Text>
          </div>
          <div className='d-flex justify-content-between'>
            <Text>Tax</Text>
            <Text>${taxPrice}</Text>
          </div>
          <div className='border-0'>
            <Row>
              <Col>
                <hr
                  style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                  }}
                />
              </Col>
            </Row>
          </div>
          <div className='d-flex justify-content-between font-weight-bold mb-4'>
            <Text fontSize='1.125rem'>Order total</Text>
            <Text fontSize='1.125rem'>${totalPrice}</Text>
          </div>
        </RightRail>
      </SubContainer>
    </Container>
  );
};

export default PlaceOrder;
