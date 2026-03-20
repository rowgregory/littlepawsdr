'use client';

import { Link } from 'react-router-dom';
import { AlertCircle, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js';
import { STATES } from '../data/states';

// ─── PayPal loading guard ─────────────────────────────────────────────────────
function PayPalSection({
  payPalComponents,
  orderLoader,
  orderError,
}: {
  payPalComponents: any;
  orderLoader: boolean;
  orderError: string | null;
}) {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  return (
    <div className='relative'>
      {isPending && !orderLoader && (
        <div
          className='flex items-center justify-center py-10'
          aria-label='Loading PayPal'
          role='status'
        >
          <div className='w-5 h-5 border-2 border-border-light dark:border-border-dark border-t-primary-light dark:border-t-primary-dark rounded-full animate-spin' />
          <span className='sr-only'>Loading payment options...</span>
        </div>
      )}

      {isRejected && (
        <div
          role='alert'
          className='py-5 px-4 border-l-2 border-l-red-500 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark'
        >
          <p className='font-changa text-xs uppercase tracking-wide text-red-500 mb-1'>
            Payment failed to load
          </p>
          <p className='font-lato text-xs text-muted-light dark:text-muted-dark'>
            Please refresh the page and try again. If the issue persists, contact us directly.
          </p>
        </div>
      )}

      {!isPending && !isRejected && (
        <PayPalButtons
          style={payPalComponents.style}
          forceReRender={payPalComponents.forceRerender}
          createOrder={payPalComponents.createOrder}
          onApprove={payPalComponents.onApprove}
        />
      )}

      {orderError && (
        <div
          role='alert'
          aria-live='assertive'
          className='mt-4 flex items-start gap-3 px-4 py-3 border-l-2 border-red-500 bg-red-50 dark:bg-red-500/5'
        >
          <AlertCircle className='w-4 h-4 text-red-500 shrink-0 mt-0.5' aria-hidden='true' />
          <p className='font-lato text-xs text-red-600 dark:text-red-400 leading-relaxed'>
            {orderError}
          </p>
        </div>
      )}

      {orderLoader && (
        <div
          className='absolute inset-0 bg-bg-light/90 dark:bg-bg-dark/90 flex items-center justify-center z-10'
          role='status'
          aria-label='Processing your order'
        >
          <div className='text-center'>
            <div className='w-6 h-6 border-2 border-border-light dark:border-border-dark border-t-primary-light dark:border-t-primary-dark rounded-full animate-spin mx-auto mb-2' />
            <p className='font-changa text-f10 uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark'>
              Processing...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  required,
  children,
  id,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className='block font-changa text-f10 uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark mb-2'
      >
        {label}
        {required && (
          <span aria-hidden='true' className='text-red-500 ml-0.5'>
            *
          </span>
        )}
        {required && <span className='sr-only'>(required)</span>}
      </label>
      {children}
      {error && (
        <p role='alert' className='font-lato text-xs text-red-500 mt-1'>
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError?: boolean) =>
  `w-full px-3.5 py-2.5 border-l-2 ${hasError ? 'border-l-red-500' : 'border-l-primary-light dark:border-l-primary-dark'} border-t border-r border-b ${hasError ? 'border-red-500' : 'border-border-light dark:border-border-dark'} bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark font-lato text-sm outline-none transition-all focus:border-primary-light dark:focus:border-primary-dark`;

// ─── Progress indicator ───────────────────────────────────────────────────────
function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div aria-label={`Step ${step} of ${total}`}>
      <p className='font-lato text-xs text-muted-light dark:text-muted-dark mb-3'>
        Step {step} of {total}
      </p>
      <div className='flex gap-1.5' role='list'>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            role='listitem'
            aria-current={i + 1 === step ? 'step' : undefined}
            className={`h-0.5 flex-1 transition-colors duration-300 ${
              i + 1 <= step
                ? 'bg-primary-light dark:bg-primary-dark'
                : 'bg-border-light dark:bg-border-dark'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CheckoutPage({
  step,
  inputs,
  errors,
  handleInput,
  handleNext,
  handleBack,
  isStep1Valid,
  isStep2Valid,
  hasPhysical,
  cartItems,
  subtotal,
  shippingPrice,
  totalPrice,
  payPalComponents,
  orderLoader,
  toFixed,
  orderError,
}: any) {
  const totalSteps = hasPhysical ? 3 : 2;
  const displayStep = hasPhysical ? step : step === 3 ? 2 : step;

  return (
    <div className='min-h-screen bg-bg-light dark:bg-bg-dark'>
      {/* ── Header ── */}
      <header className='border-b border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between'>
          <Link
            to='/'
            className='flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
          >
            <div className='w-4 h-px bg-primary-light dark:bg-primary-dark' aria-hidden='true' />
            <span className='font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark'>
              Little Paws Dachshund Rescue
            </span>
          </Link>
          <Link
            to='/supporter/overview'
            aria-label='My account'
            className='p-1.5 text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
          >
            <User className='w-4 h-4' aria-hidden='true' />
          </Link>
        </div>
      </header>

      <main className='max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-start'>
          {/* ── Left: Form ── */}
          <div>
            <div className='mb-8'>
              <div className='flex items-center gap-3 mb-3'>
                <div
                  className='w-4 h-px bg-primary-light dark:bg-primary-dark'
                  aria-hidden='true'
                />
                <span className='font-changa text-f10 uppercase tracking-[0.25em] text-primary-light dark:text-primary-dark'>
                  Checkout
                </span>
              </div>
              <h1 className='font-changa text-2xl sm:text-3xl uppercase leading-none text-text-light dark:text-text-dark mb-5'>
                Complete Your Order
              </h1>
              <Progress step={displayStep} total={totalSteps} />
            </div>

            {/* ── Step 1: Personal Info ── */}
            {step === 1 && (
              <section aria-labelledby='step1-heading'>
                <h2
                  id='step1-heading'
                  className='font-changa text-xs uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark mb-5'
                >
                  Personal Information
                </h2>
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 min-[400px]:grid-cols-2 gap-4'>
                    <Field label='First Name' id='firstName' required error={errors?.firstName}>
                      <input
                        id='firstName'
                        type='text'
                        name='firstName'
                        value={inputs?.firstName || ''}
                        onChange={handleInput}
                        autoComplete='given-name'
                        aria-required='true'
                        placeholder='Jane'
                        className={inputClass(!!errors?.firstName)}
                      />
                    </Field>
                    <Field label='Last Name' id='lastName' required error={errors?.lastName}>
                      <input
                        id='lastName'
                        type='text'
                        name='lastName'
                        value={inputs?.lastName || ''}
                        onChange={handleInput}
                        autoComplete='family-name'
                        aria-required='true'
                        placeholder='Doe'
                        className={inputClass(!!errors?.lastName)}
                      />
                    </Field>
                  </div>
                  <Field label='Email' id='email' required error={errors?.email}>
                    <input
                      id='email'
                      type='email'
                      name='email'
                      value={inputs?.email || ''}
                      onChange={handleInput}
                      autoComplete='email'
                      aria-required='true'
                      placeholder='jane@example.com'
                      className={inputClass(!!errors?.email)}
                    />
                  </Field>
                </div>

                <div className='flex items-center justify-between gap-3 mt-8'>
                  <Link
                    to='/cart'
                    className='flex items-center gap-2 px-5 py-3 border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark font-changa text-f10 uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                  >
                    <ChevronLeft className='w-4 h-4' aria-hidden='true' />
                    Cart
                  </Link>
                  <button
                    type='button'
                    onClick={handleNext}
                    disabled={!isStep1Valid}
                    aria-disabled={!isStep1Valid}
                    className='flex items-center gap-2 px-5 py-3 bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white font-changa text-f10 uppercase tracking-[0.2em] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                  >
                    Continue
                    <ChevronRight className='w-4 h-4' aria-hidden='true' />
                  </button>
                </div>
              </section>
            )}

            {/* ── Step 2: Address ── */}
            {step === 2 && hasPhysical && (
              <section aria-labelledby='step2-heading'>
                <h2
                  id='step2-heading'
                  className='font-changa text-xs uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark mb-5'
                >
                  Shipping Address
                </h2>
                <div className='space-y-4'>
                  <Field label='Street Address' id='address' required error={errors?.address}>
                    <input
                      id='address'
                      type='text'
                      name='address'
                      value={inputs?.address || ''}
                      onChange={handleInput}
                      autoComplete='street-address'
                      aria-required='true'
                      placeholder='123 Main St'
                      className={inputClass(!!errors?.address)}
                    />
                  </Field>
                  <Field label='City' id='city' required error={errors?.city}>
                    <input
                      id='city'
                      type='text'
                      name='city'
                      value={inputs?.city || ''}
                      onChange={handleInput}
                      autoComplete='address-level2'
                      aria-required='true'
                      placeholder='Boston'
                      className={inputClass(!!errors?.city)}
                    />
                  </Field>
                  <div className='grid grid-cols-1 min-[400px]:grid-cols-2 gap-4'>
                    <Field label='State' id='state' required error={errors?.state}>
                      <select
                        id='state'
                        name='state'
                        value={inputs?.state || ''}
                        onChange={handleInput}
                        autoComplete='address-level1'
                        aria-required='true'
                        className={inputClass(!!errors?.state) + ' appearance-none cursor-pointer'}
                      >
                        <option value='' disabled>
                          Select state
                        </option>
                        {STATES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.text}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      label='ZIP Code'
                      id='zipPostalCode'
                      required
                      error={errors?.zipPostalCode}
                    >
                      <input
                        id='zipPostalCode'
                        type='text'
                        name='zipPostalCode'
                        value={inputs?.zipPostalCode || ''}
                        onChange={handleInput}
                        autoComplete='postal-code'
                        aria-required='true'
                        inputMode='numeric'
                        maxLength={5}
                        placeholder='02101'
                        className={inputClass(!!errors?.zipPostalCode)}
                      />
                    </Field>
                  </div>
                </div>

                <div className='flex items-center justify-between gap-3 mt-8'>
                  <button
                    type='button'
                    onClick={handleBack}
                    className='flex items-center gap-2 px-5 py-3 border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark font-changa text-f10 uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                  >
                    <ChevronLeft className='w-4 h-4' aria-hidden='true' />
                    Back
                  </button>
                  <button
                    type='button'
                    onClick={handleNext}
                    disabled={!isStep2Valid}
                    aria-disabled={!isStep2Valid}
                    className='flex items-center gap-2 px-5 py-3 bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white font-changa text-f10 uppercase tracking-[0.2em] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                  >
                    Continue
                    <ChevronRight className='w-4 h-4' aria-hidden='true' />
                  </button>
                </div>
              </section>
            )}

            {/* ── Payment step ── */}
            {displayStep === totalSteps && (
              <section aria-labelledby='step-payment-heading'>
                <h2
                  id='step-payment-heading'
                  className='font-changa text-xs uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark mb-5'
                >
                  Payment
                </h2>

                <PayPalSection
                  payPalComponents={payPalComponents}
                  orderLoader={orderLoader}
                  orderError={orderError}
                />

                <button
                  type='button'
                  onClick={handleBack}
                  disabled={orderLoader}
                  className='flex items-center gap-2 px-5 py-3 mt-6 border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark font-changa text-f10 uppercase tracking-[0.2em] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                >
                  <ChevronLeft className='w-4 h-4' aria-hidden='true' />
                  Back
                </button>
              </section>
            )}
          </div>

          {/* ── Right: Order Summary ── */}
          <aside aria-label='Order summary' className='lg:sticky lg:top-8'>
            <div className='border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark'>
              {/* Summary header */}
              <div className='flex items-center gap-2 px-5 py-4 border-b border-border-light dark:border-border-dark'>
                <div
                  className='w-3 h-px bg-primary-light dark:bg-primary-dark'
                  aria-hidden='true'
                />
                <h2 className='font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark'>
                  Order Summary
                </h2>
              </div>

              {/* Items */}
              <ul className='divide-y divide-border-light dark:divide-border-dark max-h-64 overflow-y-auto'>
                {cartItems?.map((item: any, idx: number) => (
                  <li key={idx} className='flex gap-3 px-5 py-4'>
                    <img
                      src={item.itemImage}
                      alt={item.itemName}
                      className='w-12 h-12 object-cover bg-surface-light dark:bg-surface-dark shrink-0'
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='font-changa text-xs uppercase tracking-wide text-text-light dark:text-text-dark line-clamp-2'>
                        {item.itemName}
                        {item.isWelcomeWiener && ` for ${item.dachshundName}`}
                      </p>
                      <p className='font-lato text-[10px] text-muted-light dark:text-muted-dark mt-0.5'>
                        ×{item.quantity} · ${toFixed(item.price)}
                      </p>
                    </div>
                    <p className='font-changa text-sm text-text-light dark:text-text-dark shrink-0 tabular-nums'>
                      ${toFixed(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className='px-5 py-4 border-t border-border-light dark:border-border-dark space-y-2.5'>
                {hasPhysical && (
                  <div className='flex justify-between items-center'>
                    <span className='font-lato text-xs text-muted-light dark:text-muted-dark'>
                      Subtotal
                    </span>
                    <span className='font-changa text-xs tabular-nums text-text-light dark:text-text-dark'>
                      ${toFixed(subtotal)}
                    </span>
                  </div>
                )}
                {hasPhysical && (
                  <div className='flex justify-between items-center'>
                    <span className='font-lato text-xs text-muted-light dark:text-muted-dark'>
                      Shipping
                    </span>
                    <span className='font-changa text-xs tabular-nums text-text-light dark:text-text-dark'>
                      ${toFixed(shippingPrice)}
                    </span>
                  </div>
                )}
                <div className='flex justify-between items-center pt-2.5 border-t border-border-light dark:border-border-dark'>
                  <span className='font-changa text-xs uppercase tracking-wide text-text-light dark:text-text-dark'>
                    Total
                  </span>
                  <span className='font-changa text-xl tabular-nums text-primary-light dark:text-primary-dark'>
                    ${toFixed(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Contact summary */}
              {(inputs?.email || inputs?.firstName) && (
                <div className='px-5 py-4 border-t border-border-light dark:border-border-dark space-y-3 bg-bg-light dark:bg-bg-dark'>
                  {inputs?.email && (
                    <div>
                      <p className='font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark mb-1'>
                        Contact
                      </p>
                      <p className='font-lato text-xs text-text-light dark:text-text-dark truncate'>
                        {inputs.email}
                      </p>
                    </div>
                  )}
                  {hasPhysical && inputs?.address && (
                    <div>
                      <p className='font-changa text-f10 uppercase tracking-[0.25em] text-muted-light dark:text-muted-dark mb-1'>
                        Ship to
                      </p>
                      <p className='font-lato text-xs text-text-light dark:text-text-dark leading-relaxed'>
                        {inputs.firstName} {inputs.lastName}
                        <br />
                        {inputs.address}
                        <br />
                        {inputs.city && `${inputs.city},`} {inputs.state} {inputs.zipPostalCode}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
