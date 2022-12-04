/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Image, Spinner } from 'react-bootstrap';
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
  Name,
} from '../../components/styles/place-order/Styles';
import GoBackToCartModal from '../../components/GoBackToCartModal';
import {
  useCreateAccountCheckoutForm,
  usePlaceOrderShippingForm,
} from '../../utils/formHooks';
import {
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalItems,
  totalPrice,
} from '../../utils/placeOrder';
import {
  validateAccountCreateCheckoutForm,
  validateShippingForm,
} from '../../utils/validateShippingForm';
import ShippingForm from '../../components/forms/ShippingForm';
import LogoDay from '../../components/assets/logo-transparent.png';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import CreateAccountCheckoutForm from '../../components/forms/CreateAccountCheckoutForm';
import { register } from '../../actions/userActions';

const PlaceOrder = ({ history, location }: any) => {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const [orderLoader, setOrderLoader] = useState(false);
  const [revealPayment, setRevealPayment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [revealShippingAddress, setRevealShippingAddress] = useState(true);
  const [errors, setErrors] = useState({}) as any;
  const closeModal = () => setShowModal(false) as any;
  const [revealItems, setRevealItems] = useState(true);
  const [revealContactInfo, setRevealContactInfo] = useState(false);
  const [payPalReject, setPayPalReject] = useState(false);

  const [{ isPending }] = usePayPalScriptReducer();

  let {
    cart: { cartItems },
    orderCreate: { order, success, error, loading },
    guestUserRegister: { guestUserInfo },
    userRegister: {
      loading: loadingUserRegister,
      success: successUserRegister,
    },
    userLogin: { userInfo },
  } = useSelector((state: any) => state);

  let formIsValid: boolean = false;

  const closeShippingForm = () => {
    setRevealShippingAddress(false);

    setTimeout(
      () =>
        location?.state?.isGuestUser && !successUserRegister
          ? setRevealContactInfo(true)
          : setRevealPayment(true),
      300
    );
  };

  const cb = () => {
    const isValid = validateShippingForm(setErrors, inputs, formIsValid);
    if (isValid) {
      localStorage.setItem('shippingAddress', JSON.stringify(inputs));
      closeShippingForm();
    }
  };

  const acCb = () => {
    const isValid = validateAccountCreateCheckoutForm(
      setErrors,
      fields,
      formIsValid
    );
    if (isValid) {
      dispatch(
        register(fields.fullName, guestUserInfo?.email, fields.password)
      );
    }
  };

  const { handleInputChange, inputs, onSubmit } = usePlaceOrderShippingForm(cb);
  const { handleInput, fields, onCreate } = useCreateAccountCheckoutForm(acCb);

  const validations = [
    fields.password.length >= 9 ? 1 : 0,
    fields.password.search(/[A-Z]/) > -1 ? 1 : 0,
    fields.password.search(/[0-9]/) > -1 ? 1 : 0,
    fields.password.search(/[~`! @#$%^&*()_+={}|:;"',.?]/) > -1 ? 1 : 0,
  ];

  const strength = validations.reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    const addPayPalScript = async () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID_PROD}`;
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
      history.push({ pathname: `/order/${order?._id}`, state: { order } });
      setOrderLoader(false);
    } else if (successUserRegister) {
      setRevealContactInfo(false);
      setRevealPayment(true);
    } else if (error) {
      setOrderLoader(false);
      history.push({
        pathname: `/paypal/order`,
        state: error,
      });
    }
  }, [order, success, error, history, successUserRegister]);

  const itemsTotal = totalItems(cartItems);

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
          isGuestOrder: location?.state?.isGuestUser,
          guestEmail: location?.state?.guestUserEmail,
          user: {
            id: userInfo?._id,
            email: userInfo?.email,
            name: userInfo?.name,
          },
        })
      );
    }
  };

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: [totalPrice(inputs.state, cartItems), 'USD', revealPayment],
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
        Checkout ({itemsTotal} item{itemsTotal !== 1 && 's'})
      </Checkout>
      <Container>
        <SubContainer>
          <LeftRail lg={6} md={7} sm={12} className='left-rail'>
            <LeftRailContainer>
              <LeftRailSectionTitle>
                <div className='d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <Text fontSize='22px' fontWeight={400}>
                      Shipping Address
                    </Text>
                    <i className='fas fa-truck-loading fa-sm ml-2'></i>
                  </div>
                  {!revealShippingAddress && (
                    <Text
                      onClick={() => {
                        setRevealPayment(false);
                        setTimeout(() => setRevealShippingAddress(true), 500);
                      }}
                      cursor='pointer'
                    >
                      Edit
                    </Text>
                  )}
                </div>
                {!revealShippingAddress && (
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
            {location?.state?.isGuestUser && (
              <LeftRailContainer>
                <LeftRailSectionTitle>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                      <Text fontSize='22px' fontWeight={400}>
                        Create Account
                      </Text>{' '}
                      <i className='fas fa-user ml-1 fa-sm'></i>{' '}
                      {loadingUserRegister ? (
                        <Spinner
                          animation='border'
                          size='sm'
                          className='ml-1'
                        />
                      ) : (
                        successUserRegister && (
                          <i
                            className='fas fa-check ml-1'
                            style={{ color: 'green' }}
                          ></i>
                        )
                      )}
                    </div>
                    {!successUserRegister && revealPayment && (
                      <Text
                        onClick={() => {
                          setRevealPayment(false);
                          setRevealShippingAddress(false);
                          setTimeout(() => setRevealContactInfo(true), 300);
                        }}
                        cursor='pointer'
                      >
                        Edit
                      </Text>
                    )}
                  </div>
                  <Text fontSize='12px' fontWeight={100}>
                    {successUserRegister
                      ? `Please verify your email to create an account. Creating an account is not required for this transaction`
                      : `Save your information so you can check out faster and track
                  orders easily.`}
                  </Text>
                </LeftRailSectionTitle>
                <Accordion toggle={revealContactInfo} maxheight='1000px'>
                  <CreateAccountCheckoutForm
                    fields={fields}
                    handleInput={handleInput}
                    errors={errors}
                    formIsValid={formIsValid}
                    setErrors={setErrors}
                    validations={validations}
                    strength={strength}
                    onCreate={onCreate}
                    loadingUserRegister={loadingUserRegister}
                    setRevealContactInfo={setRevealContactInfo}
                    setRevealPayment={setRevealPayment}
                    guestUserInfo={guestUserInfo}
                  />
                </Accordion>
              </LeftRailContainer>
            )}
            <LeftRailContainer>
              <LeftRailSectionTitle>
                <div className='d-flex justify-content-between w-100'>
                  <div className='d-flex align-items-center'>
                    <Text fontSize='22px' fontWeight={400}>
                      Secure Payment
                    </Text>
                    <i className='fas fa-lock ml-1 fa-sm'></i>
                  </div>
                  <Text>
                    Order total: ${totalPrice(inputs.state, cartItems)}
                  </Text>
                </div>
                <Text
                  fontSize='12px'
                  onClick={() => setPayPalReject(!payPalReject)}
                  marginBottom='9px'
                  cursor='pointer'
                >
                  Please read if PayPal has rejected your card
                </Text>
                <Accordion toggle={payPalReject} maxheight='169px'>
                  <Text marginBottom='6px'>
                    If your credit/debit card is being rejected by PayPal with
                    the message "This card is not accepted. Please use a
                    different card." it might be due to one of the following
                    reasons:
                  </Text>
                  <ol style={{ paddingLeft: '15px' }}>
                    <li style={{ fontSize: '10.5px' }}>
                      Your card was associated with a PayPal account that has
                      since been closed.
                    </li>

                    <li style={{ fontSize: '10.5px' }}>
                      You've linked the card to a PayPal account, but have not
                      yet confirmed it.
                    </li>

                    <li style={{ fontSize: '10.5px' }}>
                      You've exceeded your card limit with the PayPal system.
                    </li>

                    <li style={{ fontSize: '10.5px' }}>
                      Your email address is raising a red flag in PayPal's
                      system.
                    </li>
                    <li style={{ fontSize: '10.5px' }}>
                      Your card is associated with a specific PayPal account,
                      and you're not logging in with that particular account.
                    </li>
                    <li style={{ fontSize: '10.5px' }}>
                      Your browser is not accepting cookies. You should clear
                      any existing cookies and try again.
                    </li>
                  </ol>
                </Accordion>
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
          <RightRail lg={3} md={4} sm={12} className='right-rail pb-0'>
            <LeftRailSectionTitle onClick={() => setRevealItems(!revealItems)}>
              <div className='d-flex justify-content-between align-items-center w-100'>
                <Text fontSize='22px' fontWeight={400}>
                  Your Items
                </Text>{' '}
                <i
                  style={{
                    transition: '300ms',
                    transform: revealItems ? 'rotate(-180deg)' : '',
                  }}
                  className='fas fa-chevron-down fa-sm'
                ></i>
              </div>
            </LeftRailSectionTitle>
            <Accordion
              toggle={revealItems}
              maxheight={`${cartItems?.length * 80 + 165}px`}
            >
              {cartItems?.map((item: any, index: number) => (
                <div
                  className='d-flex justify-content-between mb-4'
                  key={index}
                >
                  <div className='d-flex'>
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      width='50px'
                      height='50px'
                      className='mr-3'
                      style={{ objectFit: 'contain' }}
                    />

                    <div className='d-flex flex-column'>
                      <Name>{item?.name}</Name>
                      <Text fontSize='11px'>Quantity: {item?.qty}</Text>
                      <Text fontSize='11px'>{item?.size}</Text>
                    </div>
                  </div>
                  <Text fontWeight={600}>
                    ${item?.qty * item?.price?.toFixed(2)}
                  </Text>
                </div>
              ))}
              <hr className='my-3' />
              <div className='d-flex justify-content-between'>
                <Text className='d-flex align-items-baseline'>
                  Subtotal
                  <Text fontSize='10px' marginLeft='4px'>
                    ({itemsTotal} item
                    {itemsTotal === 1 ? '' : 's'})
                  </Text>
                </Text>
                <Text>${itemsPrice(cartItems)}</Text>
              </div>
              <div className='d-flex justify-content-between my-1'>
                <Text>Shipping</Text>
                <Text>${shippingPrice}</Text>
              </div>
              <div className='d-flex justify-content-between'>
                <Text className='d-flex align-items-baseline'>
                  Tax{' '}
                  <Text fontSize='10px' marginLeft='4px'>
                    (Calculated during shipping)
                  </Text>
                </Text>
                <Text>${taxPrice(inputs.state, cartItems)}</Text>
              </div>
              <hr className='my-3' />
              <div className='d-flex justify-content-between font-weight-bold mb-4'>
                <Text>Order total</Text>
                <Text fontWeight={600} className='pb-4'>
                  ${totalPrice(inputs.state, cartItems)}
                </Text>
              </div>
            </Accordion>
          </RightRail>
        </SubContainer>
      </Container>
    </>
  );
};

export default PlaceOrder;
