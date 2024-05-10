import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/toolkitStore';
import {
  usePlaceOrderForm,
  validateContactInfoForm,
  validateShipping,
} from '../../utils/hooks/usePlaceOrderForm';
import { DarkMosaic, WhiteLogo } from '../../components/assets';
import CheckoutProgressTracker from '../../components/checkout/CheckoutProgressTracker';
import CheckoutStep1 from '../../components/checkout/CheckoutStep1';
import CheckoutStep2 from '../../components/checkout/CheckoutStep2';
import CheckoutStep3 from '../../components/checkout/CheckoutStep3';
import LeavePlaceOrderModal from '../../components/modals/LeavePlaceOrderModal';
import ItemsContainer from '../../components/checkout/ItemsContainer';

const checkCartItems = (cartItems: any) => {
  let isWelcomeWiener = false;
  let isEcard = false;
  let isProduct = false;

  for (const product of cartItems) {
    if (product?.isProduct) isProduct = true;

    if (product?.isWelcomeWiener) isWelcomeWiener = true;

    if (product?.isEcard) isEcard = true;

    if (isProduct && isWelcomeWiener && isEcard) {
      break;
    }
  }

  return { isProduct, isWelcomeWiener, isEcard };
};

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({}) as any;
  const [step, setStep] = useState({ step1: true, step2: false, step3: false });
  const { user } = useSelector((state: RootState) => state.auth);

  const closeModal = () => setShowModal(false) as any;

  const state = useSelector((state: any) => state);
  const cart = state.cart;
  const cartItems = cart.cartItems;

  const { isProduct, isWelcomeWiener, isEcard } = checkCartItems(cartItems);

  const submitContactInfo = () => {
    validateContactInfoForm(inputs, setErrors);
    if (Object.keys(errors).length === 0) {
      setStep((prev: any) => ({ ...prev, step1: false }));
      if (isProduct) {
        setStep((prev: any) => ({ ...prev, step2: true }));
      } else {
        setStep((prev: any) => ({ ...prev, step3: true }));
      }
    }
  };

  const submitShippingAddress = (e: any) => {
    e.preventDefault();
    validateShipping(inputs, setErrors);
    if (Object.keys(errors).length === 0) {
      setStep((prev: any) => ({ ...prev, step2: false, step3: true }));
    }
  };

  const { handleInput, inputs } = usePlaceOrderForm(setErrors, user);

  useEffect(() => {
    if (cartItems?.length === 0) navigate('/cart');
  }, [navigate, cartItems]);

  return (
    <Fragment>
      <LeavePlaceOrderModal showModal={showModal} closeModal={closeModal} />
      <div className='mx-auto w-full bg-slate-100 min-h-screen'>
        <div
          style={{ backgroundImage: `url(${DarkMosaic})` }}
          className='
          h-48 md:h-60 bg-repeat top-[65px] border-b-[7px] border-[#9863a8] bg-teal-500 flex flex-col'
        >
          <img
            onClick={() => setShowModal(true)}
            src={WhiteLogo}
            alt='LPDR'
            className='w-20 px-2.5'
          />
          <h1 className='max-w-screen-xl my-auto w-full px-3 text-4xl md:text-6xl font-Matter-Medium text-[#fff]'>
            Checkout
          </h1>
        </div>
        <div className='grid grid-cols-12 gap-6 w-full pt-3 px-[16px] md:px-6 max-w-screen-lg mx-auto pb-24 h-fit bg-white'>
          <div className='col-span-12 lg:col-span-8'>
            <CheckoutProgressTracker step={step} setStep={setStep} isProduct={isProduct} />
            {step.step1 && (
              <CheckoutStep1
                handleInput={handleInput}
                inputs={inputs}
                errors={errors}
                submitContactInfo={submitContactInfo}
              />
            )}
            {step.step2 && (
              <CheckoutStep2
                handleInput={handleInput}
                inputs={inputs}
                errors={errors}
                submitShippingAddress={submitShippingAddress}
              />
            )}
            {step.step3 && (
              <CheckoutStep3
                cart={cart}
                step={step}
                inputs={inputs}
                isProduct={isProduct}
                isWelcomeWiener={isWelcomeWiener}
                isEcard={isEcard}
              />
            )}
          </div>
          <div className='col-span-12 lg:col-span-4'>
            <ItemsContainer cart={cart} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PlaceOrder;
