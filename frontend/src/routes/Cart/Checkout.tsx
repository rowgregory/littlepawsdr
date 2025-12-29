import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, User } from 'lucide-react';
import { useFormInitialize } from '../../hooks/useFormInitialize';
import {
  useAppDispatch,
  useCartSelector,
  useFormSelector,
  useUserSelector,
} from '../../redux/toolkitStore';
import { createFormActions } from '../../redux/features/form/formSlice';
import { PayPalButtons } from '@paypal/react-paypal-js';
import toFixed from '../../utils/toFixed';
import { useCreateOrderMutation } from '../../redux/services/orderApi';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '../../redux/features/toastSlice';
import MotionLink from '../../components/common/MotionLink';
import hasPhysicalProduct from '../../utils/shop-utils/hasPhysicalProduct';
import { STATES } from '../../components/data/states';
import { resetCart } from '../../redux/features/cart/cartSlice';

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useUserSelector();
  const { checkoutForm } = useFormSelector();
  const { handleInput, setErrors } = createFormActions('checkoutForm', dispatch);
  const { subtotal, totalPrice, shippingPrice, cartItems } = useCartSelector();
  const inputs = checkoutForm?.inputs;
  const errors = checkoutForm?.errors;
  const [createOrder] = useCreateOrderMutation();
  const hasPhysical = hasPhysicalProduct(cartItems);

  const [step, setStep] = useState(1);
  const [orderLoader, setOrderLoader] = useState(false);
  // Get address data
  const shippingAddress = user?.addressRef || user?.shippingAddress;

  useFormInitialize({
    formName: 'checkoutForm',
    data: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      ...(hasPhysical && {
        address: shippingAddress?.address || '',
        city: shippingAddress?.city || '',
        state: shippingAddress?.state || '',
        zipPostalCode: shippingAddress?.zipPostalCode || '',
      }),
    },
  });

  const validateStep = (currentStep: number) => {
    const newErrors: any = {};

    if (currentStep === 1) {
      if (!inputs?.firstName?.trim()) newErrors.firstName = 'Required';
      if (!inputs?.lastName?.trim()) newErrors.lastName = 'Required';
      if (!inputs?.email?.trim()) newErrors.email = 'Required';
    }

    if (currentStep === 2) {
      if (!inputs?.address?.trim()) newErrors.address = 'Required';
      if (!inputs?.city?.trim()) newErrors.city = 'Required';
      if (!inputs?.state) newErrors.state = 'Required';
      if (!inputs?.zipPostalCode?.trim()) newErrors.zipPostalCode = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (hasPhysical) {
        setStep(step + 1);
      } else {
        setStep(step + 2);
      }
    }
  };

  const handleBack = () => {
    if (hasPhysical) {
      setStep(step - 1);
    } else {
      setStep(step - 2);
    }
  };

  const isStep1Valid =
    inputs?.firstName?.trim() &&
    inputs?.lastName?.trim() &&
    inputs?.email?.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs?.email);

  const isStep2Valid =
    inputs?.address?.trim() &&
    inputs?.city?.trim() &&
    inputs?.state &&
    inputs?.zipPostalCode?.trim();

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: [step],
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: Number(totalPrice),
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
          const response = await createOrder({
            name: `${inputs?.firstName} ${inputs?.lastName}`,
            email: inputs?.email,
            orderItems: cartItems,
            subtotal,
            shippingPrice: hasPhysical ? shippingPrice : 0,
            totalPrice,
            paypalOrderId: details.id,
            ...(hasPhysical && {
              shippingAddress: {
                name: `${inputs?.firstName} ${inputs?.lastName}`,
                address: inputs?.address,
                city: inputs?.city,
                state: inputs?.state,
                zipPostalCode: inputs?.zipPostalCode,
              },
            }),
          }).unwrap();

          navigate(`/order/${response?.order?.orderId}`);
          dispatch(showToast({ message: 'Order successfully created!', type: 'success' }));
          dispatch(resetCart());
        } catch (error: any) {
          dispatch(
            showToast({
              message: `Failed to create order - ${error?.data?.message}`,
              type: 'error',
            })
          );
        } finally {
          setOrderLoader(false);
        }
      });
    },
  } as any;

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <div className='border-b border-gray-200 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-8 py-4 flex items-center justify-between'>
          <MotionLink
            to='/'
            className='flex items-center gap-2'
            variant='default'
            color='secondary'
            transition={{ duration: 0.5 }}
          >
            <span className='font-bold text-gray-900'>Little Paws Dachshund Rescue</span>
          </MotionLink>

          <MotionLink to='/supporter/overview' variant='icon' transition={{ duration: 0.5 }}>
            <User className='w-5 h-5' />
          </MotionLink>
        </div>
      </div>
      {/* Desktop: 2-Column Layout */}
      <div className='hidden lg:grid lg:grid-cols-12 lg:gap-12 max-w-7xl mx-auto px-8 py-12'>
        {/* Left Column: Form */}
        <div className='lg:col-span-7'>
          <div className='mb-12'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Checkout</h1>
            <p className='text-gray-600'>Step {step} of 3</p>
          </div>

          <AnimatePresence mode='wait'>
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <motion.div
                key='step1'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className='text-lg font-semibold text-gray-900 mb-6'>Personal Information</h2>

                <div className='space-y-6'>
                  <div className='grid grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-900 mb-2'>
                        First Name
                      </label>
                      <input
                        type='text'
                        name='firstName'
                        value={inputs?.firstName || ''}
                        onChange={handleInput}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                          errors?.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder='John'
                      />
                      {errors?.firstName && (
                        <p className='text-red-600 text-xs mt-1'>{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-900 mb-2'>
                        Last Name
                      </label>
                      <input
                        type='text'
                        name='lastName'
                        value={inputs?.lastName || ''}
                        onChange={handleInput}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                          errors?.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder='Doe'
                      />
                      {errors?.lastName && (
                        <p className='text-red-600 text-xs mt-1'>{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>Email</label>
                    <input
                      type='email'
                      name='email'
                      value={inputs?.email || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                        errors?.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='john@example.com'
                    />
                    {errors?.email && <p className='text-red-600 text-xs mt-1'>{errors.email}</p>}
                  </div>
                </div>

                <div className='mt-8 flex justify-between'>
                  <Link to='/cart'>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='flex items-center gap-2 px-8 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors w-fit'
                    >
                      <ChevronLeft className='w-4 h-4' />
                      Cart
                    </motion.div>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={!isStep1Valid}
                    className='flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                  >
                    Continue
                    <ChevronRight className='w-4 h-4 flex-shrink-0' />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Address */}
            {step === 2 && hasPhysical && (
              <motion.div
                key='step2'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className='text-lg font-semibold text-gray-900 mb-6'>Shipping Address</h2>

                <div className='space-y-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                      Street Address
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={inputs?.address || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                        errors?.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='123 Main St'
                    />
                    {errors?.address && (
                      <p className='text-red-600 text-xs mt-1'>{errors.address}</p>
                    )}
                  </div>

                  <div className='grid grid-cols-3 gap-6'>
                    <div className='col-span-2'>
                      <label className='block text-sm font-medium text-gray-900 mb-2'>City</label>
                      <input
                        type='text'
                        name='city'
                        value={inputs?.city || ''}
                        onChange={handleInput}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                          errors?.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder='Boston'
                      />
                      {errors?.city && <p className='text-red-600 text-xs mt-1'>{errors.city}</p>}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-900 mb-2'>State</label>
                      <select
                        name='state'
                        value={inputs?.state || ''}
                        onChange={handleInput}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                          errors?.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        {STATES.map((state) => (
                          <option key={state.value} value={state.value}>
                            {state.text || 'Select a state'}
                          </option>
                        ))}
                      </select>
                      {errors?.state && <p className='text-red-600 text-xs mt-1'>{errors.state}</p>}
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>ZIP Code</label>
                    <input
                      type='text'
                      name='zipPostalCode'
                      value={inputs?.zipPostalCode || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                        errors?.zipPostalCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='02101'
                    />
                    {errors?.zipPostalCode && (
                      <p className='text-red-600 text-xs mt-1'>{errors.zipPostalCode}</p>
                    )}
                  </div>
                </div>

                <div className='mt-8 flex justify-between gap-3'>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className='flex items-center gap-2 px-8 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors'
                  >
                    <ChevronLeft className='w-4 h-4' />
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={!isStep2Valid}
                    className='flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                  >
                    Continue
                    <ChevronRight className='w-4 h-4' />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                key='step3'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className='text-lg font-semibold text-gray-900 mb-6'>Payment</h2>

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

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  disabled={orderLoader}
                  className='flex items-center gap-2 px-8 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors'
                >
                  <ChevronLeft className='w-4 h-4' />
                  Back
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className='lg:col-span-5'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='sticky top-12 bg-gray-50 rounded-lg p-8 border border-gray-200'
          >
            <h3 className='text-lg font-semibold text-gray-900 mb-6'>Order Summary</h3>

            {/* Items */}
            <div className='space-y-3 mb-6 max-h-96 overflow-y-auto'>
              {cartItems?.map((item: any, idx: number) => (
                <div key={idx} className='flex gap-3'>
                  {/* Product Image */}
                  <div className='flex-shrink-0'>
                    <img
                      src={item.itemImage}
                      alt={item.itemName}
                      className='w-14 h-14 rounded-md object-cover bg-gray-100'
                    />
                  </div>

                  {/* Product Info */}
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-gray-900 line-clamp-2'>
                      {item.itemName}
                      {item.quantity > 1 && 's'}{' '}
                      {item.isWelcomeWiener && `for ${item.dachshundName}`}
                    </p>

                    <div className='flex items-center gap-2 mt-1'>
                      <span className='text-xs text-gray-600'>×{item.quantity}</span>
                      <span className='text-xs font-semibold text-gray-900'>
                        ${toFixed(item.price)}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className='text-right flex-shrink-0'>
                    <p className='text-sm font-semibold text-gray-900'>
                      ${toFixed(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            {hasPhysical && <div className='border-t border-gray-300 my-6' />}

            {/* Pricing */}
            <div className='space-y-3'>
              {/* Only show subtotal if there's shipping */}
              {hasPhysical && (
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='text-gray-900'>${toFixed(subtotal)}</span>
                </div>
              )}

              {/* Shipping - only if physical products */}
              {hasPhysical && (
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Shipping</span>
                  <span className='text-gray-900'>${toFixed(shippingPrice)}</span>
                </div>
              )}

              {/* Total */}
              <div className='flex justify-between text-lg font-semibold pt-3 border-t border-gray-300'>
                <span className='text-gray-900'>Total</span>
                <span className='text-gray-900'>${toFixed(totalPrice)}</span>
              </div>
            </div>

            {/* Contact Info */}
            {(inputs?.email || inputs?.firstName) && (
              <div className='mt-8 pt-6 border-t border-gray-300'>
                <p className='text-xs font-semibold text-gray-900 mb-3'>CONTACT</p>
                <p className='text-sm text-gray-600'>{inputs?.email}</p>

                {hasPhysical && (
                  <>
                    <p className='text-xs font-semibold text-gray-900 mt-4 mb-2'>
                      SHIPPING ADDRESS
                    </p>
                    <p className='text-sm text-gray-600'>
                      {inputs?.firstName} {inputs?.lastName}
                      <br />
                      {inputs?.address}
                      <br />
                      {inputs?.city}, {inputs?.state} {inputs?.zipPostalCode}
                    </p>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile: Single Column */}
      <div className='lg:hidden'>
        <div className='px-4 py-8'>
          <div className='mb-8'>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>Checkout</h1>
            <p className='text-gray-600'>Step {step} of 3</p>

            {/* Progress Bar */}
            <div className='mt-4 flex gap-2'>
              {[1, 2, 3].map((s) => (
                <motion.div
                  key={s}
                  animate={{
                    backgroundColor: s <= step ? '#111827' : '#e5e7eb',
                  }}
                  className='h-1 flex-1 rounded-full'
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode='wait'>
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <motion.div
                key='step1'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className='text-lg font-semibold text-gray-900 mb-6'>Personal Information</h2>

                <div className='space-y-4 mb-8'>
                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                      First Name
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      value={inputs?.firstName || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                        errors?.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='John'
                    />
                    {errors?.firstName && (
                      <p className='text-red-600 text-xs mt-1'>{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      value={inputs?.lastName || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                        errors?.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='Doe'
                    />
                    {errors?.lastName && (
                      <p className='text-red-600 text-xs mt-1'>{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>Email</label>
                    <input
                      type='email'
                      name='email'
                      value={inputs?.email || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                        errors?.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='john@example.com'
                    />
                    {errors?.email && <p className='text-red-600 text-xs mt-1'>{errors.email}</p>}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  disabled={!isStep1Valid}
                  className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                >
                  Continue
                  <ChevronRight className='w-4 h-4' />
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Address */}
            {step === 2 && (
              <motion.div
                key='step2'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className='text-lg font-semibold text-gray-900 mb-6'>Shipping Address</h2>

                <div className='space-y-4 mb-8'>
                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>
                      Street Address
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={inputs?.address || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                        errors?.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='123 Main St'
                    />
                    {errors?.address && (
                      <p className='text-red-600 text-xs mt-1'>{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-900 mb-2'>City</label>
                    <input
                      type='text'
                      name='city'
                      value={inputs?.city || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                        errors?.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='Boston'
                    />
                    {errors?.city && <p className='text-red-600 text-xs mt-1'>{errors.city}</p>}
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-900 mb-2'>State</label>
                      <input
                        type='text'
                        name='state'
                        value={inputs?.state || ''}
                        onChange={handleInput}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                          errors?.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder='MA'
                      />
                      {errors?.state && <p className='text-red-600 text-xs mt-1'>{errors.state}</p>}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-900 mb-2'>
                        ZIP Code
                      </label>
                      <input
                        type='text'
                        name='zipPostalCode'
                        value={inputs?.zipPostalCode || ''}
                        onChange={handleInput}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm ${
                          errors?.zipPostalCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder='02101'
                      />
                      {errors?.zipPostalCode && (
                        <p className='text-red-600 text-xs mt-1'>{errors.zipPostalCode}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={!isStep2Valid}
                    className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                  >
                    Continue
                    <ChevronRight className='w-4 h-4' />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors'
                  >
                    <ChevronLeft className='w-4 h-4' />
                    Back
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                key='step3'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>Order Summary</h2>

                <div className='bg-gray-50 rounded-lg p-4 mb-6'>
                  <div className='space-y-2 mb-4 text-sm'>
                    {cartItems?.map((item: any, idx: number) => (
                      <div key={idx} className='flex justify-between'>
                        <span className='text-gray-600'>
                          {item.name} x{item.quantity}
                        </span>
                        <span className='font-medium text-gray-900'>
                          ${toFixed(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className='border-t border-gray-300 pt-3 space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-600'>Subtotal</span>
                      <span className='text-gray-900'>${toFixed(subtotal)}</span>
                    </div>
                    {hasPhysical && (
                      <div className='flex justify-between text-sm'>
                        <span className='text-gray-600'>Shipping</span>
                        <span className='text-gray-900'>${toFixed(shippingPrice)}</span>
                      </div>
                    )}
                    <div className='flex justify-between text-base font-semibold pt-2 border-t border-gray-300'>
                      <span>Total</span>
                      <span>${toFixed(totalPrice)}</span>
                    </div>
                  </div>
                </div>

                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Payment</h3>

                <div className='mb-6'>
                  {orderLoader ? (
                    <div className='flex justify-center py-8'>
                      <div className='w-6 h-6 border-2 border-gray-900/20 border-t-gray-900 rounded-full animate-spin' />
                    </div>
                  ) : (
                    <PayPalButtons
                      style={payPalComponents.style}
                      forceReRender={payPalComponents.forceRerender}
                      createOrder={payPalComponents.createOrder}
                      onApprove={payPalComponents.onApprove}
                    />
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  disabled={orderLoader}
                  className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors'
                >
                  <ChevronLeft className='w-4 h-4' />
                  Back
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
