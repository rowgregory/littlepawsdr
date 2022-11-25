import React, { useEffect, useState } from 'react';
import { Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createGuestOrder } from '../../actions/guestOrderActions';
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
import { register } from '../../actions/userActions';
import GoBackToCartModal from '../../components/GoBackToCartModal';
import {
  useCreateAccountCheckoutForm,
  usePlaceOrderShippingForm,
} from '../../utils/formHooks';
import {
  validateAccountCreateCheckoutForm,
  validateShippingForm,
} from '../../utils/validateShippingForm';
import {
  addDecimals,
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalItems,
  totalPrice,
} from '../../utils/placeOrder';
import ShippingForm from '../../components/forms/ShippingForm';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  DEFER_PAYPAL_BUTTON_REQUEST,
  DEFER_PAYPAL_BUTTON_SUCCESS,
} from '../../reducers/paypalReducer';
import LogoDay from '../../components/assets/logo-background-transparent-purple4.png';
import PopoverContent from '../../components/styles/place-order/PopoverContent';
import CreateAccountCheckoutForm from '../../components/forms/CreateAccountCheckoutForm';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';

const GuestPlaceOrder = ({ history }: any) => {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  let [orderLoader, setOrderLoader] = useState(false);
  const [revealShippingAddress, setRevealShippingAddress] = useState(true);
  const [revealContactInfo, setRevealContactInfo] = useState(false);
  const [revealPayment, setRevealPayment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [revealItems, setRevealItems] = useState(true);
  const [skipped, setSkipped] = useState(false);
  const [errors, setErrors] = useState({}) as any;
  const closeModal = () => setShowModal(false) as any;

  const [{ isPending }] = usePayPalScriptReducer();

  const {
    cart: { cartItems },
    guestOrderCreate: {
      success: successGuestOrderCreate,
      error: errorGuestOrderCreate,
      guestOrder,
    },
    guestUserRegister: { guestUserInfo },
    userRegister: {
      loading: loadingUserRegister,
      success: successUserRegister,
    },
    deferPayPalButton: { defer },
  } = useSelector((state: any) => state);

  let formIsValid: boolean = false;

  const closeShippingForm = () => {
    setRevealShippingAddress(false);
    setTimeout(
      () =>
        successUserRegister || skipped
          ? setRevealPayment(true)
          : setRevealContactInfo(true),
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
      setRevealContactInfo(false);
      dispatch(
        register(
          fields.fullName,
          guestUserInfo?.guestUser?.email,
          fields.password
        )
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
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    if (!sdkReady) {
      addPayPalScript();
    }
  }, [dispatch, sdkReady, defer]);

  useEffect(() => {
    if (successUserRegister) {
      setRevealPayment(true);
      dispatch({ type: DEFER_PAYPAL_BUTTON_SUCCESS });
    } else if (successGuestOrderCreate) {
      setOrderLoader(false);
      dispatch({ type: DEFER_PAYPAL_BUTTON_REQUEST });
      history.push(`/guest-order/${guestOrder?._id}`);
    } else if (errorGuestOrderCreate) {
      setOrderLoader(false);
      dispatch({ type: DEFER_PAYPAL_BUTTON_REQUEST });
      history.push({
        pathname: `/paypal/guest-order`,
        state: errorGuestOrderCreate,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    guestOrder,
    successGuestOrderCreate,
    errorGuestOrderCreate,
    successUserRegister,
  ]);

  const successPaymentHandler = (details: any) => {
    if (details.status === 'COMPLETED' && details.id) {
      dispatch(
        createGuestOrder({
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
          email: guestUserInfo?.guestUser?.email,
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
      {(isPending || orderLoader || loadingUserRegister) && <HexagonLoader />}
      <LogoCheckout src={LogoDay} onClick={() => setShowModal(true)} />
      <Checkout>
        <Text fontSize='1.75rem' letterSpacing='0'>
          Checkout ({totalItems(cartItems)} items)
        </Text>
      </Checkout>
      <Container>
        <SubContainer>
          <LeftRail lg={6} md={7} sm={12} className='left-rail'>
            <LeftRailContainer>
              <LeftRailSectionTitle>
                <div className='d-flex align-items-center justify-content-between'>
                  <Text fontSize='1.35rem'>Shipping Address</Text>
                  {!revealShippingAddress ? (
                    <Text
                      onClick={() => {
                        setRevealContactInfo(false);
                        setRevealPayment(false);
                        setTimeout(() => setRevealShippingAddress(true), 300);
                      }}
                      cursor='pointer'
                    >
                      Edit
                    </Text>
                  ) : (
                    formIsValid && (
                      <i
                        onClick={() => {
                          closeShippingForm();
                        }}
                        className='fas fa-times'
                      ></i>
                    )
                  )}
                </div>
                {!revealShippingAddress && (
                  <Text
                    fontFamily='Arial'
                    fontSize='12px'
                    fontWeight='100'
                    marginTop='0.25rem'
                  >
                    {inputs.name}
                    <br />
                    {inputs.address}
                    <br />
                    {`${inputs.city}, ${inputs.state} ${inputs.zipPostalCode}`}
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
                <div className='d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <Text fontSize='1.35rem'>Create Account</Text>{' '}
                    <i className='fas fa-user ml-1 fa-sm'></i>{' '}
                    {successUserRegister && (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    )}
                  </div>
                  {revealContactInfo ? (
                    <PopoverContent validations={validations} />
                  ) : (
                    !successUserRegister &&
                    revealPayment && (
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
                    )
                  )}
                </div>
                <Text fontFamily='Arial' fontSize='12px' fontWeight={100}>
                  Save your information so you can check out faster and track
                  orders easily.
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
                  setSkipped={setSkipped}
                />
              </Accordion>
            </LeftRailContainer>

            <LeftRailContainer>
              <LeftRailSectionTitle>
                <div className='d-flex align-items-center justify-content-between'>
                  <div>
                    Secure Payment <i className='fas fa-lock ml-1 fa-sm'></i>
                  </div>
                  {revealPayment && (
                    <div className='d-flex justify-content-between font-weight-bold w-25'>
                      <Text fontSize='1.125rem'>Order total: </Text>
                      <Text fontSize='1.125rem'>
                        ${totalPrice(inputs.state, cartItems)}
                      </Text>
                    </div>
                  )}
                </div>
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
            <LeftRailSectionTitle>
              <div className='d-flex justify-content-between align-items-center w-100'>
                <Text fontSize='1.35rem'>Your Items</Text>{' '}
                <i
                  style={{
                    transition: '300ms',
                    transform: revealItems ? 'rotate(-180deg)' : '',
                  }}
                  onClick={() => setRevealItems(!revealItems)}
                  className='fas fa-chevron-down fa-sm'
                ></i>
              </div>
            </LeftRailSectionTitle>
            <Accordion toggle={revealItems} maxheight='1000px'>
              <Col className='px-0'>
                <div>
                  {cartItems?.map((item: any, index: number) => (
                    <div className='d-flex my-2' key={index}>
                      <Col className='pl-0' md={3} sm={2}>
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
                <Text fontSize='1.125rem'>Order total</Text>
                <Text fontSize='1.125rem'>
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

export default GuestPlaceOrder;
