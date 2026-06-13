'use client';

import { Fragment, useState, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { STATES } from '../../components/data/states';
import { useNavigate } from 'react-router-dom';
import {
  useCreateAdoptionFeeMutation,
  useGetAdoptionApplicationBypassCodeQuery,
} from '../../redux/services/adoptionApplicationFeeApi';
import { toolkitStore, useDashboardSelector } from '../../redux/toolkitStore';
import { showToast } from '../../redux/features/toastSlice';

const inputClass =
  'w-full px-4 py-2.5 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 focus:outline-none focus:border-primary-light dark:focus:border-primary-dark transition-colors';

const AdoptionApplicationTermsAndPayment = () => {
  const { data } = useGetAdoptionApplicationBypassCodeQuery();
  const [orderLoader, setOrderLoader] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    state: '',
    bypassCode: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { bypassCode } = useDashboardSelector();
  const [error, setError] = useState('');
  const [createAdoptionFee] = useCreateAdoptionFeeMutation();
  const navigate = useNavigate();

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = async (step: SetStateAction<number>) => {
    setError('');

    if (step === 1 && !agreeToTerms) {
      setError('You must agree to the terms');
      return;
    }

    if (step === 3) {
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
        setError('Please fill in all required fields');
        return;
      }

      try {
        // If bypass code is provided, validate and create fee
        if (formData.bypassCode === data?.bypassCode) {
          const result = await createAdoptionFee({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            state: formData.state,
            bypassCode: formData.bypassCode,
            feeAmount: 0, // No fee for bypass code
          }).unwrap();

          if (result.success) {
            // Navigate directly to application
            navigate(`/adopt/application/verified/${result._id}`);
          }
        } else if (formData.bypassCode !== bypassCode) {
          toolkitStore.dispatch(
            showToast({ message: 'Optional bypass code is incorrect', type: 'warning' }),
          );
          return;
        } else {
          // No bypass code, go to payment
          setCurrentStep(3);
        }
      } catch (err: any) {
        setError(err?.data?.message || 'Error processing bypass code');
      } finally {
        setOrderLoader(false);
      }
    }

    setCurrentStep(step);
  };

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: [formData],
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
          firstName: formData.firstName,
          lastName: formData.lastName,
          feeAmount: 15,
          paypalOrderId: details.id,
          email: formData.email,
          state: formData.state,
        };

        await createAdoptionFee(adoptionFee)
          .unwrap()
          .then((data: any) => {
            if (data) {
              navigate(`/adopt/application/verified/${data?._id}`);
            }
          })
          .catch((error: any) => {
            console.error('Error creating adoption fee:', error);
          })
          .finally(() => {
            setOrderLoader(false);
          });
      });
    },
  } as any;

  const steps = [
    { number: 1, title: 'Terms', icon: '📋' },
    { number: 2, title: 'Personal Info', icon: '👤' },
    { number: 3, title: 'Payment', icon: '💳' },
  ];

  return (
    <>
      {orderLoader && (
        <div className='fade-in fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[5000] bg-black/50'>
          <div className='dot-spinner'></div>
        </div>
      )}
      <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
        {/* Header */}
        <div className='bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-10'>
          <div className='max-w-2xl mx-auto px-4 sm:px-6 py-5 sm:py-6'>
            <h1 className='text-2xl sm:text-3xl font-quicksand font-black text-text-light dark:text-text-dark'>
              Adoption Application
            </h1>
            <p className='font-lato text-sm text-muted-light dark:text-muted-dark mt-2'>
              Complete the process to apply
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className='bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark'>
          <div className='max-w-2xl mx-auto px-4 sm:px-6 py-6'>
            <div className='flex items-center justify-between'>
              {steps.map((step, index) => {
                const isComplete = step.number < currentStep;
                const isCurrent = step.number === currentStep;
                const isClickable = isComplete;

                return (
                  <Fragment key={step.number}>
                    <motion.button
                      type='button'
                      onClick={() => isClickable && setCurrentStep(step.number)}
                      disabled={!isClickable}
                      aria-current={isCurrent ? 'step' : undefined}
                      className={`flex flex-col items-center gap-2 transition-opacity focus-visible:outline-none ${
                        step.number <= currentStep ? 'opacity-100' : 'opacity-50'
                      } ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                      whileHover={isClickable ? { scale: 1.05 } : undefined}
                    >
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center font-quicksand font-black text-lg transition-colors ${
                          isComplete
                            ? 'bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark'
                            : isCurrent
                              ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark'
                              : 'bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark'
                        }`}
                      >
                        {isComplete ? (
                          <CheckCircle className='w-5 h-5' aria-hidden='true' />
                        ) : (
                          step.number
                        )}
                      </div>
                      <span className='font-changa text-f10 uppercase tracking-[0.15em] text-text-light dark:text-text-dark text-center'>
                        {step.title}
                      </span>
                    </motion.button>

                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-px mx-2 transition-colors ${
                          isComplete
                            ? 'bg-primary-light dark:bg-primary-dark'
                            : 'bg-border-light dark:bg-border-dark'
                        }`}
                        aria-hidden='true'
                      />
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='max-w-2xl mx-auto px-4 sm:px-6 py-12'>
          <AnimatePresence mode='wait'>
            {/* Step 1: Terms */}
            {currentStep === 1 && (
              <motion.div
                key='step1'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='space-y-6'
              >
                <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-6 sm:p-8'>
                  <h2 className='text-2xl font-quicksand font-black text-text-light dark:text-text-dark mb-6'>
                    Adoption Requirements &amp; Process
                  </h2>

                  <div className='space-y-6 text-sm text-muted-light dark:text-muted-dark leading-relaxed max-h-[600px] overflow-y-auto border border-border-light dark:border-border-dark p-5 sm:p-6 bg-bg-light dark:bg-bg-dark'>
                    {[
                      {
                        h: 'Our Mission',
                        body: (
                          <p>
                            Little Paws Dachshund Rescue is an east coast based 501(c)3 exempt
                            nonprofit dedicated to the rescue and re-homing of our favorite short
                            legged breed. We specialize in finding permanent homes for dachshund and
                            dachshund mixes. We strive to make the lives of all dogs better through
                            action, advocacy, awareness, and education.
                          </p>
                        ),
                      },
                      {
                        h: 'Our Goal',
                        body: (
                          <>
                            <p>
                              It is LPDR's goal to identify abandoned, mistreated, or homeless dogs
                              and oversee their treatment and wellbeing while working to find loving
                              owners for those in our care. If you are looking for a new family
                              member, take a look at our available dachshund and dachshund mixes.
                            </p>
                            <p className='mt-2'>
                              Thank you for considering adopting a rescued dachshund or dachshund
                              mix.
                            </p>
                          </>
                        ),
                      },
                      {
                        h: 'Application Fee',
                        body: (
                          <p>
                            To ensure that our Applications Team is working with families that are
                            committed to adopting and welcoming a rescued dachshund into their
                            family LPDR's asks for a non-refundable application fee of $15.00. We
                            take the application fee as an additional measure to ensure that a
                            family is ready to move forward as well as to support our current and
                            future rescue dogs.
                          </p>
                        ),
                      },
                      {
                        h: 'Adoption Qualification Requirements',
                        body: (
                          <>
                            <p className='mb-3'>
                              The following are the standards that our rescue adheres to. Please
                              note, each dog is different and may have additional requirements,
                              however, the list below applies to every adoption.
                            </p>
                            <p className='mb-3'>
                              We require all individuals to read the dog's bio/requirements
                              completely to ensure the dog of interest is the best match for your
                              family and that the needs of the dog can be met.
                            </p>
                            <ul className='space-y-2 list-disc list-inside'>
                              <li>
                                Current and previous pets must be spayed or neutered, with some
                                exceptions for health reasons.
                              </li>
                              <li>
                                Your pets must be current on vaccines, heartworm testing, and
                                heartworm and flea/tick prevention.
                              </li>
                              <li>
                                Veterinary records will be checked, and we utilize the AVMA
                                guidelines for preventative care to confirm annual checkups (2x
                                annually for seniors), dentals, bloodwork, and treatment provided
                                when necessary.
                              </li>
                              <li>
                                You must be at least 21 years old to be considered to adopt one of
                                our dogs.
                              </li>
                              <li>
                                You must be able to take possession of the dog within 2 weeks of
                                being approved.
                              </li>
                            </ul>
                          </>
                        ),
                      },
                      {
                        h: 'The Adoption Application Process',
                        body: (
                          <>
                            <p className='mb-3'>
                              Once your application is received it will be reviewed by our
                              application coordinator to determine if you meet the dog's
                              requirements. If your application shows you would be a good match, the
                              following will take place:
                            </p>
                            <ul className='space-y-2 list-disc list-inside'>
                              <li>Your past and current veterinarians will be contacted.</li>
                              <li>Your personal references will be contacted.</li>
                              <li>Your landlord will be contacted, if applicable.</li>
                              <li>
                                We will review the information received with the dog's foster team
                                to determine if a home visit will be scheduled.
                              </li>
                            </ul>
                          </>
                        ),
                      },
                      {
                        h: 'Virtual Home Visit',
                        body: (
                          <p>
                            A virtual home visit will be scheduled at a time that is convenient for
                            you. We require that everyone living in the home be present during the
                            visit, including all animals. The home visit volunteer will inspect the
                            locations where the dachshund will eat, sleep, and play, etc.
                          </p>
                        ),
                      },
                      {
                        h: 'Application Fee Validity',
                        body: (
                          <>
                            <p className='mb-3'>
                              Your application fee is valid for 7 days from the date of payment.
                              During this time, you will have access to complete the adoption
                              application form. After 7 days, your application will be considered
                              inactive and you will need to submit a new application fee if you wish
                              to continue.
                            </p>
                            <p className='mb-3'>
                              We will keep your application and fee on file, and you are welcome to
                              contact us at applications@littlepawsdr.org within 6 months of your
                              original adoption application submission with the name of another dog
                              that interests you if:
                            </p>
                            <ul className='space-y-2 list-disc list-inside'>
                              <li>The dog you applied for is adopted by another applicant.</li>
                              <li>
                                The dog you applied for is no longer available by the time your
                                application is received.
                              </li>
                              <li>You do not meet the dog's requirements.</li>
                              <li>The dog you applied for has been removed from availability.</li>
                            </ul>
                          </>
                        ),
                      },
                    ].map(({ h, body }) => (
                      <div key={h}>
                        <h3 className='font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark mb-3'>
                          {h}
                        </h3>
                        {body}
                      </div>
                    ))}

                    <div>
                      <p className='text-muted-light dark:text-muted-dark'>
                        Little Paws reserves the right to deny an application for any reason. Our
                        application can take 15-30 minutes to complete.
                      </p>
                      <p className='mt-3 text-muted-light dark:text-muted-dark'>
                        For help prior to completing an application, please contact us at{' '}
                        <a
                          href='mailto:applications@littlepawsdr.org'
                          className='text-primary-light dark:text-primary-dark hover:underline'
                        >
                          applications@littlepawsdr.org
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className='mt-6 space-y-4'>
                    <label className='flex items-start gap-3 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={agreeToTerms}
                        onChange={(e) => {
                          setAgreeToTerms(e.target.checked);
                          setError('');
                        }}
                        className='mt-1 w-4 h-4 accent-primary-light dark:accent-primary-dark'
                      />
                      <span className='text-sm text-text-light dark:text-text-dark leading-relaxed'>
                        I have read and understand the adoption requirements and process. I accept
                        these conditions and am ready to proceed with my application.
                      </span>
                    </label>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        role='alert'
                        className='p-3 bg-red-500/10 border border-red-500/30 text-sm text-red-500 dark:text-red-400'
                      >
                        {error}
                      </motion.div>
                    )}

                    <button
                      type='button'
                      onClick={() => handleNextStep(2)}
                      disabled={!agreeToTerms}
                      className='w-full flex items-center justify-center gap-2 px-6 py-3 font-changa text-f10 uppercase tracking-[0.2em] text-white dark:text-bg-dark bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                    >
                      I Accept — Continue
                      <ChevronRight className='w-4 h-4' aria-hidden='true' />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Info */}
            {currentStep === 2 && (
              <motion.div
                key='step2'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='space-y-6'
              >
                <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-6 sm:p-8'>
                  <h2 className='text-2xl font-quicksand font-black text-text-light dark:text-text-dark mb-6'>
                    Your Information
                  </h2>

                  <div className='space-y-5'>
                    {[
                      {
                        name: 'firstName',
                        label: 'First Name',
                        type: 'text',
                        placeholder: 'John',
                        required: true,
                        autoComplete: 'given-name',
                      },
                      {
                        name: 'lastName',
                        label: 'Last Name',
                        type: 'text',
                        placeholder: 'Doe',
                        required: true,
                        autoComplete: 'family-name',
                      },
                      {
                        name: 'email',
                        label: 'Email Address',
                        type: 'email',
                        placeholder: 'john@example.com',
                        required: true,
                        autoComplete: 'email',
                      },
                    ].map(({ name, label, type, placeholder, required, autoComplete }) => (
                      <div key={name}>
                        <label
                          htmlFor={`adopt-${name}`}
                          className='block font-changa text-f10 uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark mb-2'
                        >
                          {label} {required && <span className='text-red-500'>*</span>}
                        </label>
                        <input
                          id={`adopt-${name}`}
                          type={type}
                          name={name}
                          autoComplete={autoComplete}
                          value={(formData as any)[name]}
                          onChange={handleInputChange}
                          placeholder={placeholder}
                          className={inputClass}
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        htmlFor='adopt-state'
                        className='block font-changa text-f10 uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark mb-2'
                      >
                        State <span className='text-red-500'>*</span>
                      </label>
                      <select
                        id='adopt-state'
                        name='state'
                        value={formData.state}
                        onChange={handleInputChange}
                        className={inputClass}
                      >
                        <option value=''>Select a state</option>
                        {STATES.map((state: any) => (
                          <option key={state.value} value={state.value}>
                            {state.text}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor='adopt-bypassCode'
                        className='block font-changa text-f10 uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark mb-2'
                      >
                        Bypass Code{' '}
                        <span className='text-muted-light/60 dark:text-muted-dark/60 normal-case tracking-normal'>
                          (Optional)
                        </span>
                      </label>
                      <input
                        id='adopt-bypassCode'
                        type='text'
                        name='bypassCode'
                        value={formData.bypassCode}
                        onChange={handleInputChange}
                        placeholder='Enter code if you have one'
                        className={inputClass}
                      />
                      <p className='text-xs font-lato text-muted-light dark:text-muted-dark mt-1.5 leading-relaxed'>
                        If you have a bypass code, enter it here to skip payment
                      </p>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        role='alert'
                        className='p-3 bg-red-500/10 border border-red-500/30 text-sm text-red-500 dark:text-red-400'
                      >
                        {error}
                      </motion.div>
                    )}

                    <div className='flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4'>
                      <button
                        type='button'
                        onClick={() => setCurrentStep(1)}
                        className='flex-1 px-6 py-3 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-changa text-f10 uppercase tracking-[0.2em] hover:border-primary-light/40 dark:hover:border-primary-dark/40 hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                      >
                        Back
                      </button>
                      <button
                        type='button'
                        onClick={() => handleNextStep(3)}
                        className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white dark:text-bg-dark font-changa text-f10 uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                      >
                        Continue to Payment
                        <ChevronRight className='w-4 h-4' aria-hidden='true' />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <motion.div
                key='step3'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='space-y-6'
              >
                <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-6 sm:p-8'>
                  <h2 className='text-2xl font-quicksand font-black text-text-light dark:text-text-dark mb-6'>
                    Complete Payment
                  </h2>

                  {/* Order Summary */}
                  <div className='bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark p-5 sm:p-6 mb-6'>
                    <div className='space-y-3'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-light dark:text-muted-dark'>Name</span>
                        <span className='font-medium text-text-light dark:text-text-dark'>
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-light dark:text-muted-dark'>Email</span>
                        <span className='font-medium text-text-light dark:text-text-dark break-all'>
                          {formData.email}
                        </span>
                      </div>
                      <div className='h-px bg-border-light dark:bg-border-dark' />
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-light dark:text-muted-dark'>
                          Application Fee
                        </span>
                        <span className='font-medium tabular-nums text-text-light dark:text-text-dark'>
                          $15.00
                        </span>
                      </div>
                      <div className='flex justify-between items-baseline pt-1'>
                        <span className='font-quicksand font-black text-lg text-text-light dark:text-text-dark'>
                          Total
                        </span>
                        <span className='font-quicksand font-black text-lg tabular-nums text-primary-light dark:text-primary-dark'>
                          $15.00
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PayPal */}
                  <div className='space-y-4'>
                    <PayPalButtons
                      style={payPalComponents.style}
                      forceReRender={payPalComponents.forceRerender}
                      createOrder={payPalComponents.createOrder}
                      onApprove={payPalComponents.onApprove}
                    />

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        role='alert'
                        className='p-3 bg-red-500/10 border border-red-500/30 text-sm text-red-500 dark:text-red-400'
                      >
                        {error}
                      </motion.div>
                    )}

                    <button
                      type='button'
                      onClick={() => setCurrentStep(2)}
                      className='w-full px-6 py-3 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-changa text-f10 uppercase tracking-[0.2em] hover:border-primary-light/40 dark:hover:border-primary-dark/40 hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                    >
                      Back
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default AdoptionApplicationTermsAndPayment;
