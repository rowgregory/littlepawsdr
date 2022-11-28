import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import GoBackToCartModal from '../components/GoBackToCartModal';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { createECardOrder } from '../actions/eCardOrderActions';
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
} from '../components/styles/place-order/Styles';
import LogoDay from '../components/assets/logo-background-transparent-purple4.png';
import { Text } from '../components/styles/Styles';
import { Col, Image } from 'react-bootstrap';
import JumpingInput from '../components/common/JumpingInput';
import { ProceedBtn } from '../components/forms/ShippingForm';
import {
  inputRecipientsFirstName,
  validateMyInfo,
  validatePersonalize,
} from '../utils/validateECardCheckout';
import { taxAmount } from '../utils/placeOrder';

const useECardForm = (cb: any, eCardToPurchase: any) => {
  const [inputs, setInputs] = useState({
    recipientsFirstName: '',
    recipientsEmail: '',
    dateToSend: '',
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    eCardToPurchase: {} as any,
    state: '',
  });

  useEffect(() => {
    if (eCardToPurchase) {
      setInputs((inputs: any) => ({ ...inputs, eCardToPurchase }));
    }
  }, [eCardToPurchase]);

  const handleInputChange = (event: any) => {
    event.persist();

    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    cb();
  };

  return { handleInputChange, inputs, onSubmit };
};

const EcardPlaceOrder = ({ history }: any) => {
  const {
    state: { ecard },
  } = useLocation() as any;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const [orderLoader, setOrderLoader] = useState(false);
  const [revealPersonalize, setRevealPersonalize] = useState(true);
  const [revealMyInfo, setRevealMyInfo] = useState(false);
  const [revealPayment, setRevealPayment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({}) as any;
  const [passedStepOne, setPassedStepOne] = useState(false);
  const [passedStepTwo, setPassedStepTwo] = useState(false);
  const closeModal = () => setShowModal(false) as any;

  const [{ isPending }] = usePayPalScriptReducer();

  const {
    eCardOrderCreate: {
      eCardOrder,
      success,
      loading: loadingCreate,
      error: errorCreate,
    },
  } = useSelector((state: any) => state);

  let formIsValid: boolean = false;

  const personalizeCallback = () => {
    const isValid = validatePersonalize(setErrors, inputs, formIsValid);

    if (isValid) {
      setPassedStepOne(true);
      setRevealPersonalize(false);

      if (passedStepTwo) {
        setRevealPayment(true);
      } else {
        setRevealMyInfo(true);
      }
    }
  };

  const myInfoCallback = () => {
    const isValid = validateMyInfo(setErrors, inputs, formIsValid);

    if (isValid) {
      setPassedStepTwo(true);
      setRevealMyInfo(false);
      setRevealPayment(true);
    }
  };

  const { inputs, handleInputChange, onSubmit } = useECardForm(
    passedStepOne ? myInfoCallback : personalizeCallback,
    ecard
  );

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
      history.push({
        pathname: `/e-card/order/${eCardOrder._id}`,
        state: { eCardOrder },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, eCardOrder]);

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const taxPrice = addDecimals(
    taxAmount(inputs.state) * Number(inputs?.eCardToPurchase?.price)
  );

  const totalPrice = addDecimals(+inputs?.eCardToPurchase?.price + +taxPrice);

  const successPaymentHandler = (details: any) => {
    if (details.status === 'COMPLETED' && details.id) {
      dispatch(
        createECardOrder({
          recipientsFirstName: inputs.recipientsFirstName,
          recipientsEmail: inputs.recipientsEmail,
          dateToSend: inputs.dateToSend,
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          email: inputs.email,
          message: inputs.message,
          taxPrice,
          totalPrice,
          image: inputs.eCardToPurchase.image,
          state: inputs.state,
          name: inputs.eCardToPurchase.name,
          orderId: details.id,
          subTotal: inputs?.eCardToPurchase?.price,
        })
      );
    }
  };

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: [totalPrice, 'USD'],
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: totalPrice,
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
      <GoBackToCartModal show={showModal} close={closeModal} isEcards={true} />
      {(orderLoader || isPending || loadingCreate) && <HexagonLoader />}
      <LogoCheckout src={LogoDay} onClick={() => setShowModal(true)} />
      <Checkout>
        <Text fontSize='1.75rem' letterSpacing='0'>
          Checkout
        </Text>
      </Checkout>
      <Container>
        <SubContainer>
          <LeftRail lg={6} md={7} sm={12} className='left-rail'>
            <LeftRailContainer>
              <LeftRailSectionTitle>
                <div className='d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                    Personalize<i className='fa-solid fa-brush fa-sm ml-1'></i>
                  </div>
                  {!revealPersonalize && (
                    <Text
                      cursor='pointer'
                      onClick={() => {
                        setRevealPayment(false);
                        setRevealMyInfo(false);
                        setPassedStepOne(false);
                        setTimeout(() => setRevealPersonalize(true), 500);
                      }}
                    >
                      Edit
                    </Text>
                  )}
                </div>
                {!revealPersonalize && (
                  <Text
                    fontFamily='Arial'
                    fontSize='12px'
                    fontWeight='100'
                    marginTop='0.25rem'
                  >
                    {inputs.recipientsFirstName} <br />
                    {inputs.recipientsEmail}
                  </Text>
                )}
              </LeftRailSectionTitle>
              <Accordion toggle={revealPersonalize} maxheight='1000px'>
                <JumpingInput
                  name='recipientsFirstName'
                  label='Enter Recipeints First Name'
                  value={inputs.recipientsFirstName || ''}
                  handleInputChange={handleInputChange}
                  type='text'
                  error={errors?.recipientsFirstName}
                  blur={() =>
                    inputRecipientsFirstName(inputs, formIsValid, setErrors)
                  }
                />
                <JumpingInput
                  name='recipientsEmail'
                  label='Enter Recipients Email'
                  value={inputs.recipientsEmail || ''}
                  handleInputChange={handleInputChange}
                  type='email'
                  error={errors?.recipientsEmail}
                  blur={() => {}}
                />
                <JumpingInput
                  name='message'
                  label='Enter Message To Be Sent'
                  value={inputs.message || ''}
                  handleInputChange={handleInputChange}
                  type='text'
                  error={errors?.message}
                  blur={() => {}}
                  showPassword={false}
                  setShowPassword={() => {}}
                  disabled={false}
                  isTextArea={true}
                />
                <JumpingInput
                  name='dateToSend'
                  label='Enter Date'
                  value={inputs.dateToSend || ''}
                  handleInputChange={handleInputChange}
                  type='date'
                  error={errors?.dateToSend}
                />
                <ProceedBtn
                  onClick={onSubmit}
                  type='submit'
                  className='mb-5 mt-4'
                >
                  Save personalizations
                </ProceedBtn>
              </Accordion>
            </LeftRailContainer>
            <LeftRailContainer>
              <LeftRailSectionTitle>
                <div className='d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                    My Info <i className='fas fa-user ml-1 fa-sm'></i>
                  </div>
                  {!revealMyInfo && passedStepTwo && (
                    <Text
                      cursor='pointer'
                      onClick={() => {
                        setRevealPayment(false);
                        setRevealPersonalize(false);
                        setTimeout(() => setRevealMyInfo(true), 500);
                      }}
                    >
                      Edit
                    </Text>
                  )}
                </div>
                {!revealMyInfo && passedStepTwo && (
                  <Text
                    fontFamily='Arial'
                    fontSize='12px'
                    fontWeight='100'
                    marginTop='0.25rem'
                  >
                    {inputs.firstName} {inputs.lastName} {inputs.email}
                  </Text>
                )}
              </LeftRailSectionTitle>
              <Accordion toggle={revealMyInfo} maxheight='1000px'>
                <JumpingInput
                  name='firstName'
                  label='Enter First Name'
                  value={inputs.firstName || ''}
                  handleInputChange={handleInputChange}
                  type='text'
                  error={errors?.firstName}
                  blur={() => {}}
                />
                <JumpingInput
                  name='lastName'
                  label='Enter Last Name'
                  value={inputs.lastName || ''}
                  handleInputChange={handleInputChange}
                  type='text'
                  error={errors?.lastName}
                  blur={() => {}}
                />
                <Text>
                  If you have an account with us, enter that email here
                </Text>
                <JumpingInput
                  name='email'
                  label='Enter Email'
                  value={inputs.email || ''}
                  handleInputChange={handleInputChange}
                  type='text'
                  error={errors?.email}
                />
                <JumpingInput
                  name='state'
                  label='Enter State'
                  value={inputs.state || ''}
                  handleInputChange={handleInputChange}
                  type='text'
                  isSelect
                  error={errors?.state}
                />
                <ProceedBtn
                  onClick={onSubmit}
                  type='submit'
                  className='mb-5 mt-4'
                >
                  Save my info
                </ProceedBtn>
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
                fontSize='1.125rem'
                marginBottom='1.125rem'
                marginTop='2rem'
              >
                Your Ecard
              </Text>
              <div>
                <div className='d-flex my-2'>
                  <Col className='pl-0'>
                    <Image src={ecard.image} alt={ecard.name} fluid />
                  </Col>
                  <Col className='d-flex flex-column pr-0'>
                    <Text fontSize='0.875rem'>{ecard.name}</Text>
                    <Text fontSize='0.875rem'>{ecard.size}</Text>
                    <Text>{ecard.price}</Text>
                  </Col>
                </div>
              </div>
            </Col>
            <hr className='mb-3 mt-5' />
            <div className='d-flex justify-content-between'>
              <Text>Subtotal 1 item</Text>
              <Text>${ecard.price}</Text>
            </div>
            <div className='d-flex justify-content-between'>
              <Text>Tax</Text>
              <Text>
                ${addDecimals(taxAmount(inputs.state) * +ecard.price)}
              </Text>
            </div>
            <hr className='my-3' />
            <div className='d-flex justify-content-between font-weight-bold mb-4'>
              <Text fontSize='1.125rem'>Order total</Text>
              <Text fontSize='1.125rem'>
                $
                {(
                  +ecard.price +
                  +taxAmount(inputs.state) * +ecard.price
                ).toFixed(2)}
              </Text>
            </div>
          </RightRail>
        </SubContainer>
      </Container>
    </>
  );
};

export default EcardPlaceOrder;
