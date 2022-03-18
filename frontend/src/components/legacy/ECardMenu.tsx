import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import Message from '../Message';
import styled from 'styled-components';
import { ContinueBtn, DonateInput } from './DonationMenu';
import { listECards } from '../../actions/eCardActions';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { createECardOrder } from '../../actions/eCardOrderActions';
import Loader from '../Loader';
import { ECARD_ORDER_CREATE_RESET } from '../../constants/eCardOrderContants';

export const ECardPrice = styled.div`
  position: absolute;
  z-index: 10;
  top: 5px;
  right: 5px;
  background-image: ${({ theme }) =>
    `linear-gradient(to bottom, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%)`};

  color: #000;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  :before,
  :after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;

    background-image: ${({ theme }) =>
      `linear-gradient(to bottom, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%)`};
  }

  :before {
    transform: rotate(30deg);
  }
  :after {
    transform: rotate(60deg);
  }
`;

export const ECardImageContainer = styled.div<{ active: boolean }>`
  cursor: pointer;
  z-index: 4;
  width: 250px;
  height: 250px;
  object-fit: cover;
  transition: 300ms;
  position: relative;
  margin-bottom: 3rem;
  img {
    height: 250px;
    width: 250px;
    object-fit: cover;
  }
  :before {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 45%;
    z-index: 3;
    border-bottom: 15px solid ${({ theme }) => theme.header.donationBG};
    border-right: ${({ active }) => (active ? '10px solid transparent' : '')};
    border-left: ${({ active }) => (active ? '10px solid transparent' : '')};
    opacity: 0.8;
  }
  :after {
    content: '';
    position: absolute;
    top: 0px;
    left: 45%;
    z-index: 3;
    border-top: 15px solid ${({ theme }) => theme.header.donationBG};
    border-right: ${({ active }) => (active ? '10px solid transparent' : '')};
    border-left: ${({ active }) => (active ? '10px solid transparent' : '')};
    opacity: 0.8;
  }
`;

const ECardMenu = ({
  menuHeight,
  activeMenu,
  calcHeight,
  setActiveMenu,
}: any) => {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const debitCreditRef = useRef(null) as any;
  const donationRef = useRef(null) as any;

  const eCardList = useSelector((state: any) => state.eCardList);
  const { loading, error, eCards } = eCardList;

  const eCardOrderCreate = useSelector((state: any) => state.eCardOrderCreate);
  const { eCardOrder: createdECardOrder } = eCardOrderCreate;

  const todaysDate = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({}) as any;
  const [errors, setErrors] = useState({}) as any;

  const setField = (field: any, value: any) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  useEffect(() => {
    if (activeMenu === 'main') {
      dispatch(listECards());
    }

    if (
      activeMenu === 'pay-e-card' &&
      debitCreditRef?.current?.offsetHeight !== menuHeight
    ) {
      calcHeight(debitCreditRef?.current?.offsetHeight);
    }

    if (
      activeMenu === 'donation-form' &&
      donationRef?.current?.offsetHeight !== menuHeight
    ) {
      calcHeight(donationRef?.current?.offsetHeight);
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    if (!(window as any).paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, setActiveMenu, debitCreditRef?.current]);

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const taxPrice = addDecimals(0.0625 * Number(form?.eCardToPurchase?.price));

  const totalPrice = addDecimals(
    Number(form?.eCardToPurchase?.price) + Number(taxPrice)
  );

  const successPaymentHandler = (paymentResult: any, data: any) => {
    paymentResult.status === 'COMPLETED' &&
      data.orderID &&
      dispatch(
        createECardOrder({
          recipientsFirstName: form.recipientsFirstName,
          recipientsEmail: form.recipientsEmail,
          dateToSend: form.dateToSend,
          sendYourselfACopy: form.willSendYourselfACopy,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          message: form.message,
          taxPrice,
          totalPrice,
          image: form.eCardToPurchase.image,
        })
      );
    //TODO e card order invoice page
    setActiveMenu('e-card-order-details');
  };

  const resetFields = () => {
    setForm({});
    setErrors({});
    setActiveMenu('main');
    dispatch({ type: ECARD_ORDER_CREATE_RESET });
  };

  const validate = () => {
    const {
      recipientsFirstName,
      recipientsEmail,
      dateToSend,
      firstName,
      lastName,
      email,
      message,
    } = form as any;
    const newErrors = {} as any;

    const validateEmail = (email: string) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    if (!recipientsFirstName || recipientsFirstName === '')
      newErrors.recipientsFirstName = 'Please enter recipients first name';
    if (!validateEmail(recipientsEmail))
      newErrors.recipientsEmail = 'Please enter a valid email';
    if (!dateToSend || dateToSend === '')
      newErrors.dateToSend = 'Please pick a date';
    if (!firstName || firstName === '')
      newErrors.firstName = 'Please enter your first name';
    if (!lastName || lastName === '')
      newErrors.lastName = 'Please enter your last name';
    if (!validateEmail(email)) newErrors.email = 'Please enter a valid email';
    if (!message || message === '')
      newErrors.message = 'Please enter a message';

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setActiveMenu('pay-e-card');
      setErrors({});
    }
  };

  const ErrorText = ({ text }: any) => (
    <div className='text-danger my-1'>{text}</div>
  );

  return (
    <>
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames='menu-primary'
        onEnter={calcHeight}
      >
        <div className='menu'>
          <div>
            {loading ? (
              <div className='d-flex justify-content-center my-4'>
                <Spinner
                  variant='info'
                  as='span'
                  animation='border'
                  role='status'
                  aria-hidden='true'
                />
              </div>
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <div className='d-flex flex-column'>
                <div className='mb-1'>
                  Choose an E-card to send to a friend.
                </div>
                <Form>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    }}
                  >
                    {eCards !== undefined &&
                      eCards.length > 0 &&
                      eCards?.map((eCard: any, i: number) => (
                        <ECardImageContainer
                          active={eCard._id === form?.eCardToPurchase?._id}
                          className={
                            eCard._id === form?.eCardToPurchase?._id
                              ? 'e-card-still'
                              : 'e-card'
                          }
                          onClick={() => {
                            setActiveMenu('img-expand');
                            setField('eCardToPurchase', eCard);
                          }}
                          key={i}
                          style={{
                            position: 'relative',
                            width: '115px',
                            height: '115px',
                            marginBottom: '0.45rem',
                          }}
                        >
                          <Image
                            src={eCard.image}
                            alt='e-card-choices'
                            style={{
                              height: '100%',
                              width: '100%',
                              objectFit: 'cover',
                            }}
                          />
                          <ECardPrice>${eCard.price}</ECardPrice>
                        </ECardImageContainer>
                      ))}
                  </div>
                </Form>
              </div>
            )}
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'donation-form'}
        unmountOnExit
        timeout={500}
        classNames='menu-secondary'
        onEnter={calcHeight}
      >
        <div className='menu'>
          <div
            style={{ cursor: 'pointer', fontSize: '0.7rem' }}
            className='mb-3'
            onClick={() => setActiveMenu('main')}
          >
            Back
          </div>
          <Row ref={donationRef}>
            <Col>
              <Form>
                <h6 className='my-3'>Who will be receiving the eCard?</h6>
                <div className='d-flex'>
                  <div className='d-flex flex-column  w-100 mr-1'>
                    <DonateInput
                      className='mr-2'
                      placeholder='Recipients first name'
                      type='text'
                      value={form.recipientsFirstName || ''}
                      onChange={(e: any) =>
                        setField('recipientsFirstName', e.target.value)
                      }
                    ></DonateInput>
                    {errors.recipientsFirstName && (
                      <ErrorText text={errors.recipientsFirstName}>
                        {errors.recipientsFirstName}
                      </ErrorText>
                    )}
                  </div>
                  <div className='d-flex flex-column  w-100'>
                    <DonateInput
                      placeholder='Recipients email'
                      type='email'
                      value={form.recipientsEmail || ''}
                      onChange={(e: any) => {
                        setField('recipientsEmail', e.target.value);
                      }}
                    ></DonateInput>
                    <ErrorText text={errors.recipientsEmail}>
                      {errors.recipientsEmail}
                    </ErrorText>
                  </div>
                </div>
                <h6 className='my-3'>Date to Send</h6>
                <div className='d-flex align-items-center '>
                  <div className='d-flex  flex-column  w-100 mr-1'>
                    <DonateInput
                      min={todaysDate}
                      type='date'
                      value={form.dateToSend || ''}
                      onChange={(e: any) =>
                        setField('dateToSend', e.target.value)
                      }
                    ></DonateInput>
                    <ErrorText text={errors.dateToSend}>
                      {errors.dateToSend}
                    </ErrorText>
                  </div>
                  <Form.Group
                    controlId='willSendYourselfACopy'
                    className='w-100 ml-3'
                  >
                    <Form.Check
                      label='Send yourself a copy'
                      type='switch'
                      checked={form.willSendYourselfACopy || false}
                      onChange={(e) =>
                        setField('willSendYourselfACopy', e.target.checked)
                      }
                    />
                  </Form.Group>
                </div>
                <h6 className='my-4'>Your Info</h6>
                <div className='d-flex mb-3'>
                  <div className='d-flex  flex-column  w-100 mr-1'>
                    <DonateInput
                      className='mr-2'
                      placeholder='First name'
                      type='text'
                      value={form.firstName || ''}
                      onChange={(e: any) =>
                        setField('firstName', e.target.value)
                      }
                    ></DonateInput>
                    <ErrorText text={errors.firstName}>
                      {errors.firstName}
                    </ErrorText>
                  </div>
                  <div className='d-flex  flex-column  w-100 mr-1'>
                    <DonateInput
                      placeholder='Last name'
                      type='text'
                      value={form.lastName || ''}
                      onChange={(e: any) =>
                        setField('lastName', e.target.value)
                      }
                    ></DonateInput>
                    <ErrorText text={errors.lastName}>
                      {errors.lastName}
                    </ErrorText>
                  </div>
                </div>
                <div className='d-flex  flex-column  w-100 mr-1'>
                  <DonateInput
                    placeholder='Email'
                    required={true}
                    type='email'
                    value={form.email || ''}
                    onChange={(e: any) => setField('email', e.target.value)}
                  ></DonateInput>
                  <ErrorText text={errors.email}>{errors.email}</ErrorText>
                </div>
                <h6 className='my-3'>Message</h6>

                <div className='d-flex  flex-column  w-100 mr-1'>
                  <DonateInput
                    style={{ width: '100%' }}
                    as='textarea'
                    rows={3}
                    value={form.message || ''}
                    onChange={(e: any) => setField('message', e.target.value)}
                  ></DonateInput>
                  <ErrorText text={errors.message}>{errors.message}</ErrorText>
                </div>
                <ContinueBtn
                  className='border-0 my-4 mx-auto w-100'
                  onClick={() => handleSubmit()}
                >
                  CONTINUE
                </ContinueBtn>
              </Form>
            </Col>
          </Row>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'pay-e-card'}
        unmountOnExit
        timeout={500}
        classNames='menu-third'
        onEnter={calcHeight}
      >
        <div className='menu'>
          <div
            style={{ cursor: 'pointer', fontSize: '0.7rem' }}
            className='mb-3'
            onClick={() => setActiveMenu('donation-form')}
          >
            Back
          </div>
          Pay E-Card
          <div>
            {!sdkReady ? (
              <Loader />
            ) : (
              <Row
                ref={debitCreditRef}
                style={{
                  width: '300px',
                  margin: '0 auto',
                }}
              >
                <Col className='my-3'>
                  <PayPalButton
                    amount={totalPrice}
                    onSuccess={successPaymentHandler}
                    shippingPreference='NO_SHIPPING'
                  />
                </Col>
              </Row>
            )}
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'img-expand'}
        unmountOnExit
        timeout={500}
        classNames='menu-fourth'
        onEnter={calcHeight}
      >
        <div className='menu'>
          <div
            style={{ cursor: 'pointer', fontSize: '0.7rem' }}
            className='mb-3'
            onClick={() => setActiveMenu('main')}
          >
            Back
          </div>
          <div style={{ position: 'relative' }}>
            <Image
              src={form?.eCardToPurchase?.image}
              width='100%'
              alt='expand-e-card-picture'
            />
            <ECardPrice>${form?.eCardToPurchase?.price}</ECardPrice>
          </div>
          <ContinueBtn
            className='border-0 my-4 mx-auto w-100'
            onClick={() => {
              setActiveMenu('donation-form');
            }}
          >
            CONTINUE
          </ContinueBtn>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'e-card-order-details'}
        unmountOnExit
        timeout={500}
        classNames='menu-fifth'
        onEnter={calcHeight}
      >
        <div className='menu'>
          <div className='d-flex flex-column'>
            <div className='mb-3 text-success font-weight-bold'>
              <i className='fas fa-check text-success mr-2'></i>
              Thank you.
              <br />
              An email confirmation has been sent to {createdECardOrder?.email}.
            </div>
            <div>E-Card order Id: {createdECardOrder?._id}</div>
            <div>
              Being sent{' '}
              {createdECardOrder?.dateToSend.split('T')[0] === todaysDate
                ? 'today!'
                : `on ${createdECardOrder?.dateToSend.split('T')[0]}`}
            </div>
            <Image
              className='my-2'
              src={form?.eCardToPurchase?.image}
              alt='e-card-choices'
              style={{
                height: '75px',
                width: '75px',
                objectFit: 'cover',
              }}
            />
            <Button
              variant='light'
              className='bg-transparent border-0'
              onClick={() => {
                resetFields();
              }}
            >
              Send another?
            </Button>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ECardMenu;
