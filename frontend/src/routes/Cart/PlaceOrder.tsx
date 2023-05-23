/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
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
import { useCreateAccountCheckoutForm } from '../../utils/formHooks';
import { validateAccountCreateCheckoutForm } from '../../utils/validateShippingForm';
import LogoDay from '../../components/assets/logo-transparent.png';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import CreateAccountCheckoutForm from '../../components/forms/CreateAccountCheckoutForm';
import RightRail from '../../components/place-order/RightRail';
import { createWelcomeWienerOrder } from '../../actions/welcomeWienerOrderActions';

const PlaceOrder = ({ history }: any) => {
  const dispatch = useDispatch();
  const [orderLoader, setOrderLoader] = useState(false);
  const [revealPayment, setRevealPayment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({}) as any;
  const closeModal = () => setShowModal(false) as any;
  const [revealItems, setRevealItems] = useState(true);
  const [revealContactInfo, setRevealContactInfo] = useState(true);

  const [{ isPending }] = usePayPalScriptReducer();

  const state = useSelector((state: any) => state);
  const cartItems = state.cart.cartItems;
  const cartItemsAmount = state.cart.cartItemsAmount;
  const subtotal = state.cart.subtotal;
  const welcomeWienerOrder = state.welcomeWienerOrderCreate.welcomeWienerOrder;
  const success = state.welcomeWienerOrderCreate.success;
  const error = state.welcomeWienerOrderCreate.error;
  const loading = state.welcomeWienerOrderCreate.loading;

  let formIsValid: boolean = false;

  const acCb = () => {
    const isValid = validateAccountCreateCheckoutForm(
      setErrors,
      fields,
      formIsValid
    );
    if (isValid) {
      setRevealContactInfo(false);
      setRevealPayment(true);
    }
  };

  const { handleInput, fields, onCreate } = useCreateAccountCheckoutForm(acCb);

  useEffect(() => {
    if (success) {
      history.push({
        pathname: `/welcome-wiener/order/${welcomeWienerOrder?._id}`,
      });
      setOrderLoader(false);
    } else if (error) {
      setOrderLoader(false);
      history.push({
        pathname: `/paypal/order`,
        state: error,
      });
    }
  }, [welcomeWienerOrder, success, error, history]);

  const successPaymentHandler = (details: any) => {
    console.log('SUCCESS: ', details);
    if (details.status === 'COMPLETED' && details.id) {
      dispatch(
        createWelcomeWienerOrder({
          orderItems: cartItems,
          totalPrice: Number(subtotal.replace(/[^0-9.-]+/g, '')),
          paypalOrderId: details.id,
          emailAddress: fields.emailAddress,
        })
      );
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
              value: Number(subtotal.replace(/[^0-9.-]+/g, '')),
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
                        <Text fontSize='16px' fontWeight={400}>
                          Contact Info
                        </Text>{' '}
                        <i className='fas fa-user ml-1 fa-sm'></i>{' '}
                      </Flex>
                      {revealPayment && (
                        <Text fontSize='12px'>{fields.emailAddress}</Text>
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
              <Accordion toggle={revealContactInfo} maxheight='156px'>
                <CreateAccountCheckoutForm
                  fields={fields}
                  handleInput={handleInput}
                  errors={errors}
                  formIsValid={formIsValid}
                  setErrors={setErrors}
                  onCreate={onCreate}
                />
              </Accordion>
            </LeftRailContainer>
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
              <Accordion toggle={revealPayment} maxheight='267px'>
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
