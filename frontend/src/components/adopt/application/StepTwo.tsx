import { FC, ReactNode, useEffect, useState } from 'react';
import {
  Accordion,
  PaypalBtnContainer,
} from '../../styles/place-order/Styles';
import { Flex, Text } from '../../styles/Styles';
import { PayPalButtons } from '@paypal/react-paypal-js';
import BasicInfoForm from './BasicInfoForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkIfUserHasActiveAdoptionFeeSession,
  createAdoptionFee,
} from '../../../actions/adoptionActions';
import {
  PriceBox,
  StepTwoContainer,
  StepTwoInnerContainer,
} from '../../styles/adoption-application/styles';
import GearLoader from '../../Loaders/Gear';
import { ADOPTION_FEE_ACTIVE_SESSION_RESET } from '../../../constants/adoptionConstants';
import ContactLoader from '../../Loaders/ContactLoader/ContactLoader';

interface CustomerInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
}
interface SectionHeaderProps {
  title: string;
  setOpen: any;
  open: boolean;
  children?: ReactNode;
}

const StepTwo = ({ setOrderLoader, orderLoader }: any) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const state = useSelector((state: any) => state);
  const [paymentStep, setPaymentStep] = useState('basic-info');
  const [openBasic, setOpenBasic] = useState(true);
  const [openPayment, setOpenPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoProps>({
    firstName: '',
    lastName: '',
    email: '',
    state: '',
  });
  const success = state?.adoptionFeeCreate?.success;
  const token = state?.adoptionFeeCreate?.token;
  const isExpired = state.adoptionFeeCheckActiveSession.isExpired;
  const activeSessionMessage = state.adoptionFeeCheckActiveSession.message;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (success) {
      setOrderLoader(false);
      history(`/adopt/application/verified/${token}`);
    }

    return () => {
      dispatch({ type: ADOPTION_FEE_ACTIVE_SESSION_RESET });
    };
  }, [dispatch, history, setOrderLoader, success, token]);

  useEffect(() => {
    if (isExpired) {
      setOpenBasic(false);
      setOpenPayment(true);
      setPaymentStep('payment');
    }
  }, [isExpired]);

  const onSubmit = (values: any, { setSubmitting }: any) => {
    dispatch(checkIfUserHasActiveAdoptionFeeSession(values.email));
    setCustomerInfo({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      state: values.state,
    });
    setSubmitting(false);
  };

  const SectionHeader: FC<SectionHeaderProps> = ({
    title,
    setOpen,
    open,
    children,
  }) => {
    return (
      <Flex
        height='fit-content'
        flexDirection='column'
        borderTop='1px solid #e8e8e8'
        className='py-3 w-100'
      >
        <Flex className='align-items-center justify-content-between w-100 mb-3'>
          <Text color='#7e7e7e' fontWeight={400}>
            {title}
          </Text>
          <i
            style={{ cursor: 'pointer' }}
            onClick={() => !orderLoader && setOpen(!open)}
            className={
              title === 'Applicant' ? 'fas fa-chevron-down fa-sm' : ''
            }
          ></i>
        </Flex>
        {children}
      </Flex>
    );
  };

  const successPaymentHandler = (details: any) => {
    if (details.status === 'COMPLETED' && details.id) {
      const adoptionFee = {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        feeAmount: 15,
        paypalOrderId: details.id,
        email: customerInfo.email,
        state: customerInfo.state,
      };

      dispatch(createAdoptionFee(adoptionFee));
    }
  };

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: [openPayment],
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: 15,
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
    <StepTwoContainer>
      {orderLoader && <ContactLoader text='Creating your application' />}
      <StepTwoInnerContainer>
        <div>
          <div>
            <SectionHeader
              title='Applicant'
              setOpen={setOpenBasic}
              open={openBasic}
            >
              {paymentStep === 'payment' && (
                <Flex alignItems='center'>
                  <Text
                    fontSize='14px'
                    fontWeight={400}
                    className='d-flex align-items-center'
                    height='24px'
                  >
                    {`${customerInfo.firstName} ${customerInfo.lastName}, ${customerInfo.state}`}{' '}
                  </Text>
                  <span className='ml-2'>
                    {orderLoader ? <GearLoader color='#121212' size='' /> : ''}
                  </span>
                </Flex>
              )}
            </SectionHeader>
            <Accordion toggle={openBasic} maxheight='400px'>
              <BasicInfoForm onSubmit={onSubmit} />
              {activeSessionMessage && (
                <Text
                  color='red'
                  fontSize='12px'
                  fontWeight={500}
                  textAlign='center'
                  marginTop='8px'
                  marginBottom='12px'
                >
                  {activeSessionMessage}
                </Text>
              )}
            </Accordion>
          </div>
          <div style={{ visibility: orderLoader ? 'hidden' : 'visible' }}>
            <SectionHeader
              title=''
              setOpen={setOpenPayment}
              open={openPayment}
            />
            <Accordion toggle={openPayment} maxheight='685px'>
              <PaypalBtnContainer>
                <PayPalButtons
                  style={payPalComponents.style}
                  forceReRender={payPalComponents.forceRerender}
                  createOrder={payPalComponents.createOrder}
                  onApprove={payPalComponents.onApprove}
                />
              </PaypalBtnContainer>
            </Accordion>
          </div>
        </div>
        <PriceBox>
          <div className='d-flex align-items-baseline justify-content-between w-100'>
            <Text fontWeight={400}>Total</Text>
            <Text fontSize='20px' fontWeight={400}>
              $15.00
            </Text>
          </div>
          <hr />
          <div className='d-flex align-items-center justify-content-between w-100'>
            <Text>Application Fee</Text>
            <Text textAlign='end'>$15.00</Text>
          </div>
        </PriceBox>
      </StepTwoInnerContainer>
    </StepTwoContainer>
  );
};

export default StepTwo;
