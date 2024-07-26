import { Fragment, useState } from 'react';
import { Accordion } from '../../styles/place-order/Styles';
import { PayPalButtons } from '@paypal/react-paypal-js';
import ApplicantInfoForm, { validateAdoptionApplicationApplicantInfo } from './ApplicantInfoForm';
import { useNavigate } from 'react-router-dom';
import GearLoader from '../../Loaders/Gear';
import ContactLoader from '../../Loaders/ContactLoader/ContactLoader';
import {
  useCheckIfUserHasActiveAdoptionFeeSessionMutation,
  useCreateAdoptionApplicationFeeMutation,
} from '../../../redux/services/adoptionApplicationFeeApi';

interface CustomerInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  bypassCode: string;
}

const StepTwo = ({ setOrderLoader, orderLoader, setStep }: any) => {
  const navigate = useNavigate();
  const [paymentStep, setPaymentStep] = useState('basic-info');
  const [openBasic, setOpenBasic] = useState(true);
  const [openPayment, setOpenPayment] = useState(false);
  const [inputs, setInputs] = useState<CustomerInfoProps>({
    firstName: '',
    lastName: '',
    email: '',
    state: '',
    bypassCode: '',
  });
  const [errors, setErrors] = useState({}) as any;

  const [checkIfUserHasActiveAdoptionFeeSession, { isLoading }] =
    useCheckIfUserHasActiveAdoptionFeeSessionMutation();
  const [createAdoptionFee] = useCreateAdoptionApplicationFeeMutation();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const errors = validateAdoptionApplicationApplicantInfo(inputs);
    if (Object.keys(errors).length > 0) {
      setErrors((prev: any) => ({ ...prev, ...errors }));
    } else {
      setErrors({});
      await checkIfUserHasActiveAdoptionFeeSession(inputs)
        .unwrap()
        .then((data: any) => {
          window.scrollTo(0, 0);
          setOrderLoader(false);
          if (data?.isExpired) {
            setOpenBasic(false);
            setOpenPayment(true);
            setPaymentStep('payment');
            setStep((step: any) => ({ ...step, step3: true }));
            setInputs({
              firstName: inputs.firstName,
              lastName: inputs.lastName,
              email: inputs.email,
              state: inputs.state,
              bypassCode: inputs.bypassCode,
            });
          }
          if (data?.success) {
            navigate(`/adopt/application/verified/${data?.token}`);
          }
        })
        .catch(() => setOrderLoader(false));
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
      return actions.order.capture().then(async (details: any) => {
        const adoptionFee = {
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          feeAmount: 15,
          paypalOrderId: details.id,
          email: inputs.email,
          state: inputs.state,
        };

        await createAdoptionFee(adoptionFee)
          .unwrap()
          .then((data: any) => {
            if (data) {
              setOrderLoader(false);
              navigate(`/adopt/application/verified/${data?.token}`);
            }
          })
          .catch(() => setOrderLoader(false));
      });
    },
  } as any;

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Fragment>
      {orderLoader && <ContactLoader text='Creating your application' />}
      <div className='grid grid-cols-12 p-3 gap-4 w-full px-[20px] mx-auto md:px-[24px] lg:px-8 pt-12 animate-fadeIn'>
        <div className='col-span-12 md:col-span-7'>
          <div>
            <div className='py-3 w-full h-fit flex flex-col border-t-[1px] border-gray-100'>
              <div className='flex items-center justify-between w-full'>
                <p className='text-gray-700 font-Matter-Medium'>Applicant</p>
                {openPayment && (
                  <i
                    onClick={() => {
                      setOpenBasic(true);
                      setOpenPayment(false);
                      setStep((prev: any) => ({ ...prev, step2: true, step3: false }));
                    }}
                    className='fas fa-chevron-down fa-sm cursor-pointer'
                  ></i>
                )}
              </div>
              {paymentStep === 'payment' && (
                <div className='flex items-center'>
                  <p className='text-sm flex items-center h-6'>
                    {`${inputs.firstName} ${inputs.lastName}, ${inputs.state}`}{' '}
                  </p>
                  <span className='ml-2'>
                    {orderLoader ? <GearLoader color='#121212' size='' /> : ''}
                  </span>
                </div>
              )}
            </div>
            <ApplicantInfoForm
              onSubmit={onSubmit}
              handleInput={handleInput}
              inputs={inputs}
              errors={errors}
              openBasic={openBasic}
              isLoading={isLoading}
            />
          </div>
          <div>
            <Accordion toggle={openPayment} maxheight='685px'>
              <div className='px-[16px] md:px-0'>
                <PayPalButtons
                  style={payPalComponents.style}
                  forceReRender={payPalComponents.forceRerender}
                  createOrder={payPalComponents.createOrder}
                  onApprove={payPalComponents.onApprove}
                />
              </div>
            </Accordion>
          </div>
        </div>
        <div className='col-span-12 md:col-span-5 shadow-lg h-fit'>
          <div className='flex items-center justify-between h-fit px-3 py-1.5 w-full bg-gray-100 rounded-lg'>
            <p className='font-Matter-Regular'>Application Fee</p>
            <p className='font-Matter-Regular'>$15.00</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StepTwo;
