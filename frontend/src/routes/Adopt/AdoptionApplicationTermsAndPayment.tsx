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
        console.log('DATA BYPASS CODE:: ', data?.bypassCode, 'FORM DATA: ', formData.bypassCode);
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
            showToast({ message: 'Optional bypass code is incorrect', type: 'warning' })
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
    { number: 1, title: 'Terms & Conditions', icon: '📋' },
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
        <div className='bg-white border-b border-gray-200 sticky top-0 z-10'>
          <div className='max-w-2xl mx-auto px-4 sm:px-6 py-6'>
            <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>Adoption Application</h1>
            <p className='text-gray-600 mt-2'>Complete the process to apply</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className='bg-white border-b border-gray-200'>
          <div className='max-w-2xl mx-auto px-4 sm:px-6 py-6'>
            <div className='flex items-center justify-between'>
              {steps.map((step, index) => (
                <Fragment key={step.number}>
                  <motion.button
                    onClick={() => step.number < currentStep && setCurrentStep(step.number)}
                    className={`flex flex-col items-center space-y-2 cursor-pointer transition-all ${
                      step.number <= currentStep ? 'opacity-100' : 'opacity-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                        step.number < currentStep
                          ? 'bg-green-100 text-green-700'
                          : step.number === currentStep
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step.number < currentStep ? (
                        <CheckCircle className='w-6 h-6' />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className='text-xs sm:text-sm font-medium text-gray-700'>
                      {step.title}
                    </span>
                  </motion.button>

                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-all ${
                        step.number < currentStep ? 'bg-green-100' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </Fragment>
              ))}
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
                <div className='bg-white rounded-lg border border-gray-200 p-8'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                    Adoption Requirements & Process
                  </h2>

                  <div className='space-y-6 text-gray-700 text-sm leading-relaxed max-h-[600px] overflow-y-auto border border-gray-100 rounded-lg p-6 bg-gray-50'>
                    <div>
                      <h3 className='font-bold text-gray-900 mb-3'>Our Mission</h3>
                      <p>
                        Little Paws Dachshund Rescue is an east coast based 501(c)3 exempt nonprofit
                        dedicated to the rescue and re-homing of our favorite short legged breed. We
                        specialize in finding permanent homes for dachshund and dachshund mixes. We
                        strive to make the lives of all dogs better through action, advocacy,
                        awareness, and education.
                      </p>
                    </div>

                    <div>
                      <h3 className='font-bold text-gray-900 mb-3'>Our Goal</h3>
                      <p>
                        It is LPDR's goal to identify abandoned, mistreated, or homeless dogs and
                        oversee their treatment and wellbeing while working to find loving owners
                        for those in our care. If you are looking for a new family member, take a
                        look at our available dachshund and dachshund mixes.
                      </p>
                      <p className='mt-2'>
                        Thank you for considering adopting a rescued dachshund or dachshund mix.
                      </p>
                    </div>

                    <div>
                      <h3 className='font-bold text-gray-900 mb-3'>Application Fee</h3>
                      <p>
                        To ensure that our Applications Team is working with families that are
                        committed to adopting and welcoming a rescued dachshund into their family
                        LPDR's asks for a non-refundable application fee of $15.00. We take the
                        application fee as an additional measure to ensure that a family is ready to
                        move forward as well as to support our current and future rescue dogs.
                      </p>
                    </div>

                    <div>
                      <h3 className='font-bold text-gray-900 mb-3'>
                        Adoption Qualification Requirements
                      </h3>
                      <p className='mb-3'>
                        The following are the standards that our rescue adheres to. Please note,
                        each dog is different and may have additional requirements, however, the
                        list below applies to every adoption.
                      </p>
                      <p className='mb-3'>
                        We require all individuals to read the dog's bio/requirements completely to
                        ensure the dog of interest is the best match for your family and that the
                        needs of the dog can be met.
                      </p>
                      <ul className='space-y-2 list-disc list-inside'>
                        <li>
                          Current and previous pets must be spayed or neutered, with some exceptions
                          for health reasons.
                        </li>
                        <li>
                          Your pets must be current on vaccines, heartworm testing, and heartworm
                          and flea/tick prevention.
                        </li>
                        <li>
                          Veterinary records will be checked, and we utilize the AVMA guidelines for
                          preventative care to confirm annual checkups (2x annually for seniors),
                          dentals, bloodwork, and treatment provided when necessary.
                        </li>
                        <li>
                          You must be at least 21 years old to be considered to adopt one of our
                          dogs.
                        </li>
                        <li>
                          You must be able to take possession of the dog within 2 weeks of being
                          approved.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className='font-bold text-gray-900 mb-3'>
                        The Adoption Application Process
                      </h3>
                      <p className='mb-3'>
                        Once your application is received it will be reviewed by our application
                        coordinator to determine if you meet the dog's requirements. If your
                        application shows you would be a good match, the following will take place:
                      </p>
                      <ul className='space-y-2 list-disc list-inside'>
                        <li>Your past and current veterinarians will be contacted.</li>
                        <li>Your personal references will be contacted.</li>
                        <li>Your landlord will be contacted, if applicable.</li>
                        <li>
                          We will review the information received with the dog's foster team to
                          determine if a home visit will be scheduled.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className='font-bold text-gray-900 mb-3'>Virtual Home Visit</h3>
                      <p className='mb-3'>
                        A virtual home visit will be scheduled at a time that is convenient for you.
                        We require that everyone living in the home be present during the visit,
                        including all animals. The home visit volunteer will inspect the locations
                        where the dachshund will eat, sleep, and play, etc.
                      </p>
                    </div>

                    <div>
                      <h3 className='font-bold text-gray-900 mb-3'>Application Fee Validity</h3>
                      <p className='mb-3'>
                        Your application fee is valid for 7 days from the date of payment. During
                        this time, you will have access to complete the adoption application form.
                        After 7 days, your application will be considered inactive and you will need
                        to submit a new application fee if you wish to continue.
                      </p>
                      <p className='mb-3'>
                        We will keep your application and fee on file, and you are welcome to
                        contact us at applications@littlepawsdr.org within 6 months of your original
                        adoption application submission with the name of another dog that interests
                        you if:
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
                    </div>

                    <div>
                      <p className='text-gray-600'>
                        Little Paws reserves the right to deny an application for any reason. Our
                        application can take 15-30 minutes to complete.
                      </p>
                      <p className='mt-3 text-gray-600'>
                        For help prior to completing an application, please contact us at{' '}
                        <a
                          href='mailto:applications@littlepawsdr.org'
                          className='text-teal-600 hover:underline'
                        >
                          applications@littlepawsdr.org
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className='mt-6 space-y-4'>
                    <label className='flex items-start space-x-3 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={agreeToTerms}
                        onChange={(e) => {
                          setAgreeToTerms(e.target.checked);
                          setError('');
                        }}
                        className='mt-1 w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500'
                      />
                      <span className='text-sm text-gray-700'>
                        I have read and understand the adoption requirements and process. I accept
                        these conditions and am ready to proceed with my application.
                      </span>
                    </label>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700'
                      >
                        {error}
                      </motion.div>
                    )}

                    <button
                      onClick={() => handleNextStep(2)}
                      disabled={!agreeToTerms}
                      className='w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2'
                    >
                      <span>I Accept - Continue</span>
                      <ChevronRight className='w-4 h-4' />
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
                <div className='bg-white rounded-lg border border-gray-200 p-8'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6'>Your Information</h2>

                  <div className='space-y-5'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        First Name <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder='John'
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Last Name <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder='Doe'
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Email Address <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='john@example.com'
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        State <span className='text-red-500'>*</span>
                      </label>
                      <select
                        name='state'
                        value={formData.state}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      >
                        <option value=''>Select a state</option>
                        {STATES.map((state: any, i: number) => (
                          <option key={i} value={state.value}>
                            {state.text}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Bypass Code <span className='text-gray-500'>(Optional)</span>
                      </label>
                      <input
                        type='text'
                        name='bypassCode'
                        value={formData.bypassCode}
                        onChange={handleInputChange}
                        placeholder='Enter code if you have one'
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      />
                      <p className='text-xs text-gray-500 mt-1'>
                        If you have a bypass code, enter it here to skip payment
                      </p>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700'
                      >
                        {error}
                      </motion.div>
                    )}

                    <div className='flex space-x-4 pt-4'>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className='flex-1 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold rounded-lg transition-colors'
                      >
                        Back
                      </button>
                      <button
                        onClick={() => handleNextStep(3)}
                        className='flex-1 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2'
                      >
                        <span>Continue to Payment</span>
                        <ChevronRight className='w-4 h-4' />
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
                <div className='bg-white rounded-lg border border-gray-200 p-8'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6'>Complete Payment</h2>

                  {/* Order Summary */}
                  <div className='bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200'>
                    <div className='space-y-3'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600'>Name</span>
                        <span className='font-medium text-gray-900'>
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600'>Email</span>
                        <span className='font-medium text-gray-900'>{formData.email}</span>
                      </div>
                      <div className='h-px bg-gray-200' />
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600'>Application Fee</span>
                        <span className='font-medium text-gray-900'>$15.00</span>
                      </div>
                      <div className='flex justify-between text-lg font-bold'>
                        <span>Total</span>
                        <span className='text-teal-600'>$15.00</span>
                      </div>
                    </div>
                  </div>

                  {/* PayPal Button */}
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
                        className='p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700'
                      >
                        {error}
                      </motion.div>
                    )}

                    <button
                      onClick={() => setCurrentStep(2)}
                      className='w-full px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold rounded-lg transition-colors'
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
