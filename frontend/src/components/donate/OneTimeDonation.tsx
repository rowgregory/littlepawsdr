import { useState } from 'react';
import { useCreateDonationMutation } from '../../redux/services/donationApi';
import { PayPalButtons } from '@paypal/react-paypal-js';
import toFixed from '../../utils/toFixed';
import { createFormActions, setInputs } from '../../redux/features/form/formSlice';
import { useAppDispatch, useFormSelector, useUserSelector } from '../../redux/toolkitStore';
import { useFormInitialize } from '../../hooks/useFormInitialize';
import { motion } from 'framer-motion';

const validateDonationIdentityForm = (inputs: any, setErrors: (errors) => void) => {
  const newErrors = {} as any;

  if (!inputs?.email?.trim()) {
    newErrors.email = 'Email Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs?.email)) {
    newErrors.email = 'Invalid email address';
  }

  if (!inputs?.firstName?.trim()) {
    newErrors.firstName = 'First Name Required';
  } else if (inputs?.firstName.length > 50) {
    newErrors.firstName = 'Must be 50 characters or less';
  }

  if (!inputs?.lastName?.trim()) {
    newErrors.lastName = 'Last Name Required';
  } else if (inputs?.lastName.length > 50) {
    newErrors.lastName = 'Must be 50 characters or less';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const validateGiftAmountForm = (inputs: any, setErrors: (errors) => void) => {
  const newErrors = {} as any;

  if (parseInt(inputs.donationAmount) < 10) {
    newErrors.donationAmount = 'Amount needs to be greater than 10';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const OneTimeDonationProgressTracker = ({ step, setStep, type }: any) => (
  <div className={`${type === 'one-time' ? 'block' : 'hidden'}`}>
    <div className='hidden md:flex justify-evenly mt-4 mb-8 gap-4'>
      <div
        onClick={() =>
          step.step2 || step.step3 ? setStep({ step1: true, step2: false, step3: false }) : {}
        }
        className={`${step.step1 ? 'border-teal-500' : 'border-gray-300 text-gray-300'} ${
          step.step2 || step.step3 ? 'cursor-pointer' : ''
        } border-b-4 text-xl font-Matter-Medium tracking wider px-8 w-full text-center pb-1 whitespace-nowrap`}
      >
        1. Gift Amount
      </div>
      <div
        onClick={() =>
          step.step3 ? setStep((prev: any) => ({ ...prev, step2: true, step3: false })) : {}
        }
        className={`${step.step2 ? 'border-teal-500' : 'border-gray-300 text-gray-300'} ${
          step.step3 ? 'cursor-pointer' : ''
        } border-b-4 text-xl font-Matter-Medium tracking wider px-8 w-full text-center pb-1`}
      >
        2. Identity
      </div>
      <div
        className={`${
          step.step3 ? 'border-teal-500' : 'border-gray-300 text-gray-300'
        }  border-b-4 text-xl font-Matter-Medium tracking wider px-8 w-full text-center pb-1`}
      >
        3. Payment
      </div>
    </div>
    <div className='flex justify-between w-72 mx-auto md:hidden mt-4 mb-8'>
      <div className='relative'>
        <p className='font-Matter-Medium text-gray-300 text-center absolute -top-6 -left-4 whitespace-nowrap'>
          Gift Amount
        </p>
        <div
          className={`${
            step.step1 ? 'bg-teal-500' : 'bg-gray-300'
          } text-2xl font-Museo-Slab-700 w-12 h-12 rounded-full flex items-center justify-center text-white pb-1 aspect-square pt-2 relative after:content-[''] after:w-12 after:absolute after:top-6 after:left-[58px] after:border-2 after:border-gray-300`}
        >
          1
        </div>
      </div>
      <div className='relative'>
        <p className='font-Matter-Medium text-gray-300 text-center absolute -top-6 -left-1 whitespace-nowrap'>
          Identity
        </p>
        <div
          className={`${
            step.step2 ? 'bg-teal-500' : 'bg-gray-300'
          } text-2xl font-Museo-Slab-700 w-12 h-12 rounded-full flex items-center justify-center text-white pb-1 aspect-square pt-2 relative after:content-[''] after:w-12 after:absolute after:top-6 after:left-[58px] after:border-2 after:border-gray-300`}
        >
          2
        </div>
      </div>
      <div className='relative'>
        <p className='font-Matter-Medium text-gray-300 text-center absolute -top-6 -left-2 whitespace-nowrap'>
          Payment
        </p>
        <div
          className={`${
            step.step3 ? 'bg-teal-500' : 'bg-gray-300'
          } text-2xl font-Museo-Slab-700 w-12 h-12 rounded-full flex items-center justify-center text-white pb-1 aspect-square pt-2`}
        >
          3
        </div>
      </div>
    </div>
  </div>
);

const oneTimeDonationOptions = [25, 35, 50, 150, 500];

interface StepFunc {
  preventDefault: () => void;
}

export const OneTimeDonationForm = ({ type, step, setStep, setOpenModal }: any) => {
  const dispatch = useAppDispatch();
  const [orderLoader, setOrderLoader] = useState(false);
  const { handleInput, setErrors } = createFormActions('donationForm', dispatch);
  const [createDonation] = useCreateDonationMutation();
  const { donationForm } = useFormSelector();
  const { user } = useUserSelector();

  const inputs = donationForm?.inputs;
  const errors = donationForm?.errors;

  useFormInitialize({
    formName: 'donationForm',
    data: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      donationAmount: inputs?.donationAmount || 50,
    },
  });

  const handleStep2 = (e: StepFunc) => {
    e.preventDefault();

    if (!validateDonationIdentityForm(inputs, setErrors)) return;

    setStep((prev: any) => ({ ...prev, step2: false, step3: true }));
  };

  const handleStep1 = (e: StepFunc) => {
    e.preventDefault();

    if (!validateGiftAmountForm(inputs, setErrors)) return;

    setStep((prev: any) => ({ ...prev, step1: false, step2: true }));
  };

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: [step.step2],
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: Number(toFixed(inputs.donationAmount || +inputs.otherAmount)),
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
        try {
          await createDonation({
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            email: inputs.email,
            donationAmount: Number(inputs.donationAmount || +inputs.otherAmount),
            payPalId: details.id,
          }).unwrap();

          setOpenModal(true);
          setStep({ step1: true, step2: false, step3: false });
        } catch (error) {
          setStep({ step1: true, step2: false, step3: false });
        } finally {
          setOrderLoader(false);
        }
      });
    },
  } as any;

  return (
    <form className={`${type === 'one-time' ? 'block' : 'hidden'}`}>
      {step.step3 ? (
        <div className='mb-8 relative'>
          <PayPalButtons
            style={payPalComponents.style}
            forceReRender={payPalComponents.forceRerender}
            createOrder={payPalComponents.createOrder}
            onApprove={payPalComponents.onApprove}
          />

          {orderLoader && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 bg-white rounded-lg flex items-center justify-center z-[100]'
            >
              <div className='w-6 h-6 border-2 border-gray-900/20 border-t-gray-900 rounded-full animate-spin' />
            </motion.div>
          )}
        </div>
      ) : step.step2 ? (
        <div className='grid grid-cols-12 gap-4'>
          <p className='col-span-12 font-Matter-Light text-sm'>
            Donation Amount:{' '}
            <span className='text-sm font-Matter-Medium'>${toFixed(inputs.donationAmount)}</span>
          </p>
          <div className='col-span-12 md:col-span-6'>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='firstName'>
              First name
            </label>
            <input
              name='firstName'
              id='firstName'
              onChange={handleInput}
              className='auth-input bg-white border-[1px] w-full border-gray-300 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
              value={inputs?.firstName || ''}
            />
            {errors?.firstName && (
              <p className='font-Matter-Regular text-sm text-red-500'>{errors?.firstName}</p>
            )}
          </div>
          <div className='col-span-12 md:col-span-6'>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='lastName'>
              Last name
            </label>
            <input
              name='lastName'
              id='lastName'
              onChange={handleInput}
              className='auth-input bg-white border-[1px] w-full border-gray-300 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
              value={inputs.lastName || ''}
            />
            {errors?.lastName && (
              <p className='font-Matter-Regular text-sm text-red-500'>{errors?.lastName}</p>
            )}
          </div>
          <div className='col-span-12'>
            <label className='font-Matter-Medium text-sm mb-1' htmlFor='firstName'>
              Email
            </label>
            <input
              name='email'
              id='email'
              onChange={handleInput}
              className='auth-input bg-white border-[1px] w-full border-gray-300 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
              value={inputs.email || ''}
            />
            {errors?.email && (
              <p className='font-Matter-Regular text-sm text-red-500'>{errors?.email}</p>
            )}
          </div>
          <button
            onClick={handleStep2}
            className='col-start-2 col-span-10 sm:col-span-6 sm:col-start-4 bg-teal-500 text-white px-16 h-24 flex items-center justify-center font-Matter-Bold text-3xl my-16'
          >
            CONTINUE
          </button>
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='flex flex-wrap gap-4'>
            {oneTimeDonationOptions.map((num: number, i: number) => (
              <button
                type='button'
                onClick={() => {
                  dispatch(setInputs({ formName: 'donationForm', data: { donationAmount: num } }));
                }}
                key={i}
                className={`py-4 px-6 rounded-lg flex items-center justify-center text-white font-medium cursor-pointer transition-colors ${
                  inputs.donationAmount === num ? 'bg-teal-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                ${num}
              </button>
            ))}

            <input
              name='donationAmount'
              onChange={handleInput}
              placeholder='Other'
              type='number'
              className='border-2 border-gray-300 py-4 px-4 w-24 rounded-lg focus:outline-none focus:border-teal-500 font-medium'
              value={inputs.donationAmount || ''}
            />
          </div>
          {errors?.donationAmount && (
            <p className='font-Matter-Regular text-sm text-red-500 mt-0.5'>
              {errors?.donationAmount}
            </p>
          )}
          <button
            onClick={handleStep1}
            className='bg-teal-500 text-white px-16 h-24 flex items-center justify-center font-Matter-Bold text-3xl mx-auto my-16'
          >
            CONTINUE
          </button>
        </div>
      )}
    </form>
  );
};
