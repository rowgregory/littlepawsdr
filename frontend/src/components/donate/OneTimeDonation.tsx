import { useState } from 'react';
import { useCreateDonationMutation } from '../../redux/services/donationApi';
import { PayPalButtons } from '@paypal/react-paypal-js';
import toFixed from '../../utils/toFixed';
import { createFormActions, setInputs } from '../../redux/features/form/formSlice';
import { useAppDispatch, useFormSelector, useUserSelector } from '../../redux/toolkitStore';
import { useFormInitialize } from '../../hooks/useFormInitialize';
import { motion } from 'framer-motion';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validateIdentity = (inputs: any, setErrors: (e: any) => void) => {
  const e: any = {};
  if (!inputs?.email?.trim()) e.email = 'Email required';
  else if (!emailRegex.test(inputs.email)) e.email = 'Invalid email address';
  if (!inputs?.firstName?.trim()) e.firstName = 'First name required';
  else if (inputs.firstName.length > 50) e.firstName = 'Must be 50 characters or less';
  if (!inputs?.lastName?.trim()) e.lastName = 'Last name required';
  else if (inputs.lastName.length > 50) e.lastName = 'Must be 50 characters or less';
  setErrors(e);
  return Object.keys(e).length === 0;
};

const validateAmount = (inputs: any, setErrors: (e: any) => void) => {
  const e: any = {};
  if (parseInt(inputs.donationAmount) < 10) e.donationAmount = 'Amount must be greater than $10';
  setErrors(e);
  return Object.keys(e).length === 0;
};

const STEPS = ['Gift Amount', 'Identity', 'Payment'];

export const OneTimeDonationProgressTracker = ({ step, setStep, type }: any) => {
  const current = step.step3 ? 2 : step.step2 ? 1 : 0;

  const goTo = (i: number) => {
    if (i >= current) return; // only allow going back
    setStep({ step1: i === 0, step2: i === 1, step3: false });
  };

  return (
    <div className={`${type === 'one-time' ? 'flex' : 'hidden'} gap-2 sm:gap-4 mt-4 mb-8`}>
      {STEPS.map((label, i) => {
        const active = i === current;
        const clickable = i < current;
        return (
          <button
            key={label}
            type='button'
            onClick={() => goTo(i)}
            disabled={!clickable}
            className={`flex-1 border-b-2 pb-2 font-mono text-[11px] sm:text-xs uppercase tracking-wide text-center whitespace-nowrap transition-colors ${
              active
                ? 'border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark'
                : 'border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark'
            } ${clickable ? 'cursor-pointer hover:text-text-light dark:hover:text-text-dark' : 'cursor-default'}`}
          >
            <span className='hidden sm:inline'>{i + 1}. </span>
            {label}
          </button>
        );
      })}
    </div>
  );
};

const PRESET_AMOUNTS = [25, 35, 50, 150, 500];

const Field = ({ name, label, inputs, errors, handleInput, type = 'text' }: any) => (
  <div>
    <label
      htmlFor={name}
      className='block font-mono text-[11px] uppercase tracking-wide text-muted-light dark:text-muted-dark mb-1.5'
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      onChange={handleInput}
      value={inputs?.[name] || ''}
      aria-invalid={!!errors?.[name]}
      className='w-full bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark py-2.5 px-4 text-base text-text-light dark:text-text-dark focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
    />
    {errors?.[name] && <p className='font-mono text-[11px] text-red-500 mt-1'>{errors[name]}</p>}
  </div>
);

const ContinueButton = ({ onClick }: { onClick: (e: any) => void }) => (
  <button
    type='button'
    onClick={onClick}
    className='w-full font-mono text-sm uppercase tracking-[0.15em] bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark py-4 mt-8 transition-colors hover:bg-secondary-light dark:hover:bg-secondary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
  >
    Continue
  </button>
);

export const OneTimeDonationForm = ({ type, step, setStep, setOpenModal }: any) => {
  const dispatch = useAppDispatch();
  const [orderLoader, setOrderLoader] = useState(false);
  const { handleInput, setErrors } = createFormActions('donationForm', dispatch);
  const [createDonation] = useCreateDonationMutation();
  const { donationForm } = useFormSelector();
  const { user } = useUserSelector();

  const inputs = donationForm?.inputs;
  const errors = donationForm?.errors;
  const amount = Number(inputs?.donationAmount || +inputs?.otherAmount);

  useFormInitialize({
    formName: 'donationForm',
    data: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      donationAmount: inputs?.donationAmount || 50,
    },
  });

  const goToIdentity = (e: any) => {
    e.preventDefault();
    if (validateAmount(inputs, setErrors))
      setStep((p: any) => ({ ...p, step1: false, step2: true }));
  };

  const goToPayment = (e: any) => {
    e.preventDefault();
    if (validateIdentity(inputs, setErrors))
      setStep((p: any) => ({ ...p, step2: false, step3: true }));
  };

  const fieldProps = { inputs, errors, handleInput };

  return (
    <form className={type === 'one-time' ? 'block' : 'hidden'}>
      {/* Step 3 — Payment */}
      {step.step3 && (
        <div className='relative'>
          <PayPalButtons
            style={{ layout: 'vertical' }}
            forceReRender={[step.step2]}
            createOrder={(_d, actions) => {
              if (!actions.order) return Promise.reject(new Error('PayPal order unavailable'));
              return actions.order.create({
                intent: 'CAPTURE',
                purchase_units: [{ amount: { currency_code: 'USD', value: toFixed(amount) } }],
                application_context: { shipping_preference: 'NO_SHIPPING' },
              });
            }}
            onApprove={(_d, actions) => {
              if (!actions.order) return Promise.resolve();
              setOrderLoader(true);
              return actions.order.capture().then(async (details: any) => {
                try {
                  await createDonation({
                    firstName: inputs.firstName,
                    lastName: inputs.lastName,
                    email: inputs.email,
                    donationAmount: amount,
                    payPalId: details.id,
                  }).unwrap();
                  setOpenModal(true);
                } finally {
                  setStep({ step1: true, step2: false, step3: false });
                  setOrderLoader(false);
                }
              });
            }}
          />
          {orderLoader && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='absolute inset-0 bg-surface-light dark:bg-surface-dark flex items-center justify-center z-50'
            >
              <div className='w-6 h-6 border-2 border-primary-light/30 border-t-primary-light dark:border-primary-dark/30 dark:border-t-primary-dark rounded-full animate-spin' />
            </motion.div>
          )}
        </div>
      )}

      {/* Step 2 — Identity */}
      {step.step2 && (
        <div className='space-y-4'>
          <p className='font-mono text-[11px] uppercase tracking-wide text-muted-light dark:text-muted-dark'>
            Donation Amount:{' '}
            <span className='text-primary-light dark:text-primary-dark'>
              ${toFixed(inputs.donationAmount)}
            </span>
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Field name='firstName' label='First name' {...fieldProps} />
            <Field name='lastName' label='Last name' {...fieldProps} />
          </div>
          <Field name='email' label='Email' type='email' {...fieldProps} />
          <ContinueButton onClick={goToPayment} />
        </div>
      )}

      {/* Step 1 — Gift Amount */}
      {!step.step2 && !step.step3 && (
        <div>
          <div className='flex flex-wrap gap-3'>
            {PRESET_AMOUNTS.map((num) => (
              <button
                key={num}
                type='button'
                onClick={() =>
                  dispatch(setInputs({ formName: 'donationForm', data: { donationAmount: num } }))
                }
                className={`py-3 px-6 font-mono text-sm transition-colors ${
                  inputs.donationAmount === num
                    ? 'bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark'
                    : 'bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark'
                }`}
              >
                ${num}
              </button>
            ))}
            <input
              name='donationAmount'
              type='number'
              onChange={handleInput}
              placeholder='Other'
              value={inputs.donationAmount || ''}
              aria-label='Other amount'
              className='w-24 py-3 px-4 font-mono text-sm text-text-light dark:text-text-dark placeholder:text-muted-light/60 dark:placeholder:text-muted-dark/60 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark'
            />
          </div>
          {errors?.donationAmount && (
            <p className='font-mono text-[11px] text-red-500 mt-2'>{errors.donationAmount}</p>
          )}
          <ContinueButton onClick={goToIdentity} />
        </div>
      )}
    </form>
  );
};
