import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { Flex, Text } from '../../components/styles/Styles';
import {
  Container,
  LeftRail,
  LeftRailSectionTitle,
  SubContainer,
  LeftRailContainer,
  Accordion,
  Checkout,
  LogoCheckout,
  PaypalBtnContainer,
} from '../../components/styles/place-order/Styles';
import GoBackToCartModal from '../../components/GoBackToCartModal';
import { usePlaceOrderForm } from '../../utils/formHooks';
import {
  inputEmailAddress,
  inputFullName,
  validateContactInfoForm,
  validateShippingForm,
} from '../../utils/validateShippingForm';
import LogoDay from '../../components/assets/logo-transparent.png';
import RightRail from '../../components/place-order/RightRail';
import JumpingInput from '../../components/common/JumpingInput';
import { Button } from 'react-bootstrap';
import ShippingForm from '../../components/forms/ShippingForm';
import { createOrder } from '../../actions/orderActions';
import { useNavigate } from 'react-router-dom';
import ContactLoader from '../../components/Loaders/ContactLoader/ContactLoader';

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [orderLoader, setOrderLoader] = useState(false);
  const [revealShippingAddress, setRevealShippingAddress] = useState(false);
  const [revealPayment, setRevealPayment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({}) as any;
  const [revealItems, setRevealItems] = useState(true);
  const [revealContactInfo, setRevealContactInfo] = useState(true);

  const closeModal = () => setShowModal(false) as any;

  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  const state = useSelector((state: any) => state);
  const cartItems = state.cart.cartItems;
  const cartItemsAmount = state.cart.cartItemsAmount;
  const subtotal = state.cart.subtotal;
  const totalPrice = state.cart.totalPrice;
  const isPhysicalProduct = state.cart.isPhysicalProduct;
  const shippingPrice = state.cart.shippingPrice;
  const order = state.orderCreate.order;
  const success = state.orderCreate.success;
  const error = state.orderCreate.error;
  const loading = state.orderCreate.loading;

  let formIsValid: boolean = false;

  const hasPhysicalProduct = cartItems.some(
    (product: any) => product.isPhysicalProduct
  );

  const submitContactInfo = () => {
    const isValid = validateContactInfoForm(setErrors, inputs, formIsValid);
    if (isValid) {
      setRevealContactInfo(false);
      if (hasPhysicalProduct) {
        setRevealShippingAddress(true);
      } else {
        setRevealPayment(true);
      }
    }
  };

  const submitShippingAddress = (e: any) => {
    e.preventDefault();
    const isValid = validateShippingForm(setErrors, inputs, formIsValid);
    if (isValid) {
      setRevealShippingAddress(false);
      setRevealPayment(true);
    }
  };

  const { handleInput, inputs } = usePlaceOrderForm();

  useEffect(() => {
    if (success) {
      history({
        pathname: `/order/${order?._id}`,
      });
      setOrderLoader(false);
    } else if (error) {
      setOrderLoader(false);
    } else if (cartItems?.length === 0) history('/cart');
  }, [order, success, error, history, cartItems]);

  const successPaymentHandler = (details: any) => {
    if (details.status === 'COMPLETED' && details.id) {
      const shippingAddress = {
        address: inputs?.address,
        city: inputs?.city,
        state: inputs?.state,
        zipPostalCode: inputs?.zipPostalCode,
      };

      const order = {
        name: inputs.name,
        orderItems: cartItems,
        subtotal,
        totalPrice,
        paypalOrderId: details.id,
        email: inputs.emailAddress,
        ...(hasPhysicalProduct && { shippingAddress }),
        shippingPrice,
        isPhysicalProduct,
        totalItems: cartItemsAmount,
      };

      dispatch(createOrder(order));
    }
  };

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: [cartItems, revealPayment],
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: subtotal,
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
      {(orderLoader || loading || isPending) && (
        <ContactLoader text='Your donation is greatly appreciated' />
      )}
      <LogoCheckout
        src={LogoDay}
        onClick={() => setShowModal(true)}
        alt='Place Order Logo'
      />
      <Checkout>
        Checkout ({cartItemsAmount} item{cartItemsAmount !== 1 && 's'})
      </Checkout>
      <Container>
        <SubContainer>
          <LeftRail lg={6} md={7} sm={12} className='left-rail'>
            <LeftRailContainer>
              <LeftRailSectionTitle>
                <div className='d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <Flex flexDirection='column'>
                      <Flex alignItems='center'>
                        <Text fontSize='22px' fontWeight={400}>
                          Contact Info
                        </Text>{' '}
                        <i className='fas fa-user ml-1 fa-sm'></i>{' '}
                      </Flex>
                      {revealPayment && (
                        <Text fontSize='12px'>{inputs.emailAddress}</Text>
                      )}
                    </Flex>
                  </div>
                  {revealPayment && (
                    <Text
                      cursor='pointer'
                      onClick={() => {
                        setRevealPayment(false);
                        setTimeout(() => setRevealContactInfo(true), 300);
                      }}
                    >
                      Edit
                    </Text>
                  )}
                </div>
              </LeftRailSectionTitle>
              <Accordion toggle={revealContactInfo} maxheight='234px'>
                <JumpingInput
                  name='name'
                  label='Name'
                  value={inputs.name || ''}
                  handleInputChange={handleInput}
                  type='text'
                  error={errors?.name}
                  blur={() => inputFullName(inputs, formIsValid, setErrors)}
                />
                <JumpingInput
                  name='emailAddress'
                  label='Email Address'
                  value={inputs.emailAddress || ''}
                  handleInputChange={handleInput}
                  type='text'
                  error={errors?.emailAddress}
                  blur={() =>
                    inputEmailAddress(inputs, formIsValid, setErrors)
                  }
                />

                <Button
                  className='mb-3 mr-3'
                  onClick={() => submitContactInfo()}
                >
                  Continue to {hasPhysicalProduct ? 'shipping' : 'payment'}
                </Button>
              </Accordion>
            </LeftRailContainer>
            {hasPhysicalProduct && (
              <LeftRailContainer>
                <LeftRailSectionTitle>
                  <div className='d-flex justify-content-between w-100'>
                    <div className='d-flex align-items-center'>
                      <Text fontSize='22px' fontWeight={400}>
                        Shipping Address
                      </Text>
                      <i className='fas fa-truck ml-1 fa-sm'></i>
                    </div>
                  </div>
                </LeftRailSectionTitle>
                <Accordion toggle={revealShippingAddress} maxheight='600px'>
                  <ShippingForm
                    inputs={inputs}
                    handleInputChange={handleInput}
                    errors={errors}
                    formIsValid={formIsValid}
                    setErrors={setErrors}
                    submitShippingAddress={submitShippingAddress}
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
                </div>
              </LeftRailSectionTitle>
              <Accordion toggle={revealPayment} maxheight='685px'>
                <PaypalBtnContainer>
                  <PayPalButtons
                    style={payPalComponents.style}
                    forceReRender={payPalComponents.forceRerender}
                    createOrder={payPalComponents.createOrder}
                    onApprove={payPalComponents.onApprove}
                  />
                </PaypalBtnContainer>
              </Accordion>
            </LeftRailContainer>
            {isRejected && (
              <Text>
                Oops! Something went wrong with PayPal. Please refresh the page and try again.
              </Text>
            )}
          </LeftRail>
          <RightRail
            revealItems={revealItems}
            setRevealItems={setRevealItems}
          />
        </SubContainer>
      </Container>
    </>
  );
};

export default PlaceOrder;
