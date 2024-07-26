import { useState } from 'react';
import { useCreateDonationMutation } from '../../redux/services/donationApi';
import GreenRotatingTransparentCircle from '../Loaders/GreenRotatingTransparentCircle';
import { PayPalButtons } from '@paypal/react-paypal-js';
import toFixed from '../../utils/toFixed';

const validateDonationIdentityForm = (values: any) => {
  const errors = {} as any;
  if (!values?.email) {
    errors.email = 'Email Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values?.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values?.firstName) {
    errors.firstName = 'First Name Required';
  } else if (values?.firstName.length > 50) {
    errors.firstName = 'Must be 50 characters or less';
  }

  if (!values?.lastName) {
    errors.lastName = 'Last Name Required';
  } else if (values?.lastName.length > 50) {
    errors.lastName = 'Must be 50 characters or less';
  }

  return errors;
};

const useDonationForm = () => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    donationAmount: 35,
    otherAmount: '',
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;

    setInputs((inputs: any) => ({
      ...inputs,
      [name]: value,
    }));
  };

  return { inputs, handleInput, setInputs };
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

export const OneTimeDonationForm = ({ type, step, setStep, setOpenModal }: any) => {
  const [orderLoader, setOrderLoader] = useState(false);
  const { inputs, handleInput, setInputs } = useDonationForm();
  const [createDonation] = useCreateDonationMutation();
  const [errors, setErrors] = useState({}) as any;

  const handleStep2 = (e: any) => {
    e.preventDefault();
    const errors = validateDonationIdentityForm(inputs);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      setStep((prev: any) => ({ ...prev, step2: false, step3: true }));
    }
  };

  const handleStep1 = (e: any) => {
    e.preventDefault();

    if (inputs.donationAmount === 0 && +inputs.otherAmount <= 0.99) {
      setErrors((prev: any) => ({
        ...prev,
        donationAmount: 'Amount needs to be greater than or equal to 1',
      }));
    } else {
      setErrors({});
      setStep((prev: any) => ({ ...prev, step1: false, step2: true }));
    }
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
        await createDonation({
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          email: inputs.email,
          donationAmount: Number(inputs.donationAmount || +inputs.otherAmount),
          oneTimeDonationAmount: Number(inputs.donationAmount || +inputs.otherAmount),
          paypalId: details.id,
        })
          .unwrap()
          .then(() => {
            setOpenModal(true);
            setOrderLoader(false);
            setStep({ step1: true, step2: false, step3: false });
          })
          .catch((err: any) => {
            setOrderLoader(false);
            setStep({ step1: true, step2: false, step3: false });
          });
      });
    },
  } as any;

  return (
    <form className={`${type === 'one-time' ? 'block' : 'hidden'}`}>
      {orderLoader && <GreenRotatingTransparentCircle />}
      {step.step3 ? (
        <div className='max-w-sm mx-auto'>
          <PayPalButtons
            style={payPalComponents.style}
            forceReRender={payPalComponents.forceRerender}
            createOrder={payPalComponents.createOrder}
            onApprove={payPalComponents.onApprove}
          />
        </div>
      ) : step.step2 ? (
        <div className='grid grid-cols-12 gap-4'>
          <p className='col-span-12 font-Matter-Light text-sm'>
            Donation Amount:{' '}
            <span className='text-sm font-Matter-Medium'>
              ${toFixed(inputs.donationAmount || +inputs.otherAmount)}
            </span>
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
              <div
                onClick={() => {
                  setInputs((prev: any) => ({
                    ...prev,
                    donationAmount: num,
                    otherAmount: '',
                  }));
                }}
                key={i}
                className={`py-[16px] px-[22px] rounded-lg flex items-center justify-center text-white font-Matter-Medium cursor-pointer ${
                  num === inputs.donationAmount ? 'bg-teal-500' : 'bg-gray-300'
                }`}
              >
                ${num}
              </div>
            ))}
            <input
              name='otherAmount'
              type='number'
              onChange={handleInput}
              placeholder='Other'
              className='border-2 border-gray-300 py-[16px] px-[22px] w-[100px] rounded-lg focus:outline-none font-Matter-Medium'
              value={inputs.otherAmount || ''}
              onClick={() => setInputs((prev: any) => ({ ...prev, donationAmount: 0 }))}
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
