/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { createOrder } from '../../actions/orderActions';
import { Text } from '../../components/styles/Styles';
import {
  Container,
  LeftRail,
  LeftRailSectionTitle,
  RightRail,
  SubContainer,
  LeftRailContainer,
  Accordion,
  Checkout,
  LogoCheckout,
} from '../../components/styles/place-order/Styles';
import GoBackToCartModal from '../../components/GoBackToCartModal';
import { usePlaceOrderShippingForm } from '../../utils/formHooks';
import {
  addDecimals,
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalItems,
  totalPrice,
} from '../../utils/placeOrder';
import { validateShippingForm } from '../../utils/validateShippingForm';
import ShippingForm from '../../components/forms/ShippingForm';
import LogoDay from '../../components/assets/logo-background-transparent-purple4.png';
import { DEFER_PAYPAL_BUTTON_SUCCESS } from '../../reducers/paypalReducer';
import { DEFER_PAYPAL_BUTTON_REQUEST } from '../../reducers/paypalReducer';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';

const PlaceOrder = ({ history }: any) => {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const [orderLoader, setOrderLoader] = useState(false);
  const [revealPayment, setRevealPayment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [revealShippingAddress, setRevealShippingAddress] = useState(true);
  const [errors, setErrors] = useState({}) as any;
  const closeModal = () => setShowModal(false) as any;

  const [{ isPending }] = usePayPalScriptReducer();

  const {
    cart: { cartItems },
    orderCreate: { order, success, error, loading },
    deferPayPalButton: { defer },
  } = useSelector((state: any) => state);

  let formIsValid: boolean = false;

  const cb = () => {
    const isValid = validateShippingForm(setErrors, inputs, formIsValid);
    if (isValid) {
      setRevealShippingAddress(false);
      setTimeout(() => setRevealPayment(true), 500);
      dispatch({ type: DEFER_PAYPAL_BUTTON_SUCCESS });
    }
  };

  const { handleInputChange, inputs, onSubmit } = usePlaceOrderShippingForm(cb);

  useEffect(() => {
    const addPayPalScript = async () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };
    if (!sdkReady) {
      addPayPalScript();
    }
  }, [sdkReady]);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order?._id}`);
      setOrderLoader(false);
    } else if (error) {
      setOrderLoader(false);
      history.push({
        pathname: `/paypal/order`,
        state: error,
      });
    }
  }, [order, success, error, history]);

  const successPaymentHandler = (details: any) => {
    if (details.status === 'COMPLETED' && details.id) {
      dispatch(
        createOrder({
          orderItems: cartItems,
          shippingAddress: {
            name: inputs.name,
            address: inputs.address,
            city: inputs.city,
            state: inputs.state,
            zipPostalCode: inputs.zipPostalCode,
            country: 'US',
          },
          paymentMethod: 'PayPal',
          itemsPrice: itemsPrice(cartItems),
          shippingPrice,
          taxPrice: taxPrice(inputs.state, cartItems),
          totalPrice: totalPrice(inputs.state, cartItems),
          orderId: details.id,
        })
      );
    }
  };

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: [
      totalPrice(inputs.state, cartItems),
      'USD',
      defer,
      revealPayment,
    ],
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: totalPrice(inputs.state, cartItems),
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      });
    },
    onApprove: (data: any, actions: any) => {
      setOrderLoader(true);
      return actions.order.capture().then((details: any) => {
        successPaymentHandler(details);
      });
    },
  } as any;

  return (
    <>
      <GoBackToCartModal show={showModal} close={closeModal} />
      {(orderLoader || loading || isPending) && <HexagonLoader />}
      <LogoCheckout src={LogoDay} onClick={() => setShowModal(true)} />
      <Checkout>
        <Text fontSize='28px' letterSpacing='0'>
          Checkout ({totalItems(cartItems)} items)
        </Text>
      </Checkout>
      <Container>
        <SubContainer>
          <LeftRail lg={6} md={7} sm={12} className='left-rail'>
            <LeftRailContainer>
              <LeftRailSectionTitle>
                <div className='d-flex align-items-center justify-content-between'>
                  <Text fontSize='21.6px'>Shipping address</Text>
                  {!revealShippingAddress ? (
                    <Text
                      onClick={() => {
                        setRevealPayment(false);
                        setTimeout(() => setRevealShippingAddress(true), 500);
                        dispatch({ type: DEFER_PAYPAL_BUTTON_REQUEST });
                      }}
                      cursor='pointer'
                    >
                      Edit
                    </Text>
                  ) : (
                    <i
                      onClick={() => {
                        setRevealShippingAddress(false);
                        setTimeout(() => setRevealPayment(true), 500);
                      }}
                      className='fas fa-times'
                    ></i>
                  )}
                </div>
                {revealPayment && (
                  <Text fontSize='12px' fontWeight='100' marginTop='4px'>
                    {inputs.name}
                    <br />
                    {`${inputs.address}, ${inputs.city} ${inputs.state} ${inputs.zipPostalCode}`}
                  </Text>
                )}
              </LeftRailSectionTitle>
              <Accordion toggle={revealShippingAddress} maxheight='1000px'>
                <ShippingForm
                  inputs={inputs}
                  handleInputChange={handleInputChange}
                  errors={errors}
                  formIsValid={formIsValid}
                  setErrors={setErrors}
                  onSubmit={onSubmit}
                />
              </Accordion>
            </LeftRailContainer>
            <LeftRailContainer>
              <LeftRailSectionTitle>
                Secure Payment <i className='fas fa-lock ml-1 fa-sm'></i>
              </LeftRailSectionTitle>
              <Accordion toggle={revealPayment} maxheight='1000px'>
                <PayPalButtons
                  style={payPalComponents.style}
                  forceReRender={payPalComponents.forceRerender}
                  createOrder={payPalComponents.createOrder}
                  onApprove={payPalComponents.onApprove}
                />
              </Accordion>
            </LeftRailContainer>
          </LeftRail>
          <RightRail lg={3} md={4} sm={12} className='right-rail'>
            <Col className='px-0'>
              <Text
                fontWeight='bold'
                fontSize='18px'
                marginBottom='18px'
                marginTop='2rem'
              >
                Your items
              </Text>
              <div>
                {cartItems?.map((item: any, index: number) => (
                  <div className='d-flex my-2' key={index}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      style={{
                        width: '100px',
                        height: '100px',
                        aspectRatio: '1/1',
                        marginRight: '16px',
                      }}
                    />

                    <div className='d-flex flex-column pr-0'>
                      <Text fontWeight={400}>{item.name}</Text>
                      <Text>{item.size}</Text>
                      <Text>${addDecimals(item.qty * item.price)}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <hr className='mb-3 mt-5' />
            <div className='d-flex justify-content-between'>
              <Text>
                Subtotal ({totalItems(cartItems)} item
                {totalItems(cartItems) === 1 ? '' : 's'})
              </Text>
              <Text>${itemsPrice(cartItems)}</Text>
            </div>
            <div className='d-flex justify-content-between my-1'>
              <Text>Shipping</Text>
              <Text>${shippingPrice}</Text>
            </div>
            <div className='d-flex justify-content-between'>
              <Text>Tax</Text>
              <Text>${taxPrice(inputs.state, cartItems)}</Text>
            </div>
            <hr className='my-3' />
            <div className='d-flex justify-content-between font-weight-bold mb-4'>
              <Text>Order total</Text>
              <Text fontWeight={400}>
                ${totalPrice(inputs.state, cartItems)}
              </Text>
            </div>
          </RightRail>
        </SubContainer>
      </Container>
    </>
  );
};

export default PlaceOrder;
