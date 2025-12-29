import { FC, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import ApplicantInfoForm from './ApplicantInfoForm';
import { useNavigate } from 'react-router-dom';
import {
  useCheckIfUserHasActiveAdoptionFeeSessionMutation,
  useCreateAdoptionApplicationFeeMutation,
} from '../../../redux/services/adoptionApplicationFeeApi';
import validateAdoptionApplicationApplicantInfo from '../../../validations/validateAdoptionApplicationApplicantInfo';
import useForm from '../../../hooks/useForm';
import { StepTwoProps } from '../../../types/adopt-types';
import { ADOPTION_APPLICATION_STEP_TWO_FIELDS } from '../../data/form-fields';
import AwesomeIcon from '../../common/AwesomeIcon';
import { chevronDownIcon } from '../../../icons';
import Accordion from '../../common/Accordion';
import { useAppDispatch } from '../../../redux/toolkitStore';
import { showToast } from '../../../redux/features/toastSlice';

const StepTwo: FC<StepTwoProps> = ({ setStep }) => {
  const [orderLoader, setOrderLoader] = useState(false);
  const navigate = useNavigate();
  const [paymentStep, setPaymentStep] = useState('basic-info');
  const [openBasic, setOpenBasic] = useState(true);
  const [openPayment, setOpenPayment] = useState(false);
  const { inputs, errors, handleInput, handleSelect, setInputs, setErrors } = useForm(
    ADOPTION_APPLICATION_STEP_TWO_FIELDS
  );
  const dispatch = useAppDispatch();

  const [checkIfUserHasActiveAdoptionFeeSession, { isLoading }] = useCheckIfUserHasActiveAdoptionFeeSessionMutation();

  const [createAdoptionFee] = useCreateAdoptionApplicationFeeMutation();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const errors = validateAdoptionApplicationApplicantInfo(inputs);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
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
        .catch((err: any) => {
          dispatch(showToast({ message: err?.data?.message, type: 'error' }));
          setOrderLoader(false);
        });
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

  return (
    <div className='flex flex-col gap-y-5 w-full fade-in relative z-10'>
      {orderLoader && (
        <div className='fade-in fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[5000] bg-black/50'>
          <div className='dot-spinner'></div>
        </div>
      )}
      <section>
        <div className='py-3 w-full h-fit flex flex-col'>
          <div className='flex items-center justify-between w-full'>
            <h1 className='text-charcoal font-QBold text-5xl mt-4 mb-3 flex flex-col sm:flex-row sm:items-baseline'>
              $15.00
              <span className='text-xs text-charcoal font-QBook ml-1'>One time fee valid for seven days.</span>
            </h1>
            {openPayment && (
              <AwesomeIcon
                icon={chevronDownIcon}
                onClick={() => {
                  setOpenBasic(true);
                  setOpenPayment(false);
                  setStep((prev: any) => ({ ...prev, step2: true, step3: false }));
                }}
                className='w-4 h-4 text-teal-500 cursor-pointer'
              />
            )}
          </div>
          {paymentStep === 'payment' && (
            <div className='flex items-center'>
              <p className='text-sm flex items-center h-6 font-QBook text-charcoal'>{`${inputs.firstName} ${inputs.lastName}, ${inputs.email}`}</p>
            </div>
          )}
        </div>
        <ApplicantInfoForm
          onSubmit={onSubmit}
          handleInput={handleInput}
          handleSelect={handleSelect}
          inputs={inputs}
          errors={errors}
          openBasic={openBasic}
          isLoading={isLoading}
        />
      </section>
      <section>
        <Accordion toggle={openPayment} maxheight='1000px'>
          <PayPalButtons
            style={payPalComponents.style}
            forceReRender={payPalComponents.forceRerender}
            createOrder={payPalComponents.createOrder}
            onApprove={payPalComponents.onApprove}
          />
        </Accordion>
      </section>
    </div>
  );
};

export default StepTwo;
