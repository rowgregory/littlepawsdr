import { useEffect, useState } from 'react';
import {
  toolkitStore,
  useAppDispatch,
  useCartSelector,
  useFormSelector,
  useUserSelector,
} from '../../redux/toolkitStore';
import { createFormActions, setInputs } from '../../redux/features/form/formSlice';
import { useCreateOrderMutation } from '../../redux/services/orderApi';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../redux/features/toastSlice';
import hasPhysicalProduct from '../../utils/shop-utils/hasPhysicalProduct';
import { resetCart } from '../../redux/features/cart/cartSlice';
import CheckoutForm from '../../components/forms/CheckoutForm';

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
  const shippingAddress = user?.addressRef || user?.shippingAddress;

  // Pre-fill form from user profile
  useEffect(() => {
    if (!user) return;
    toolkitStore.dispatch(
      setInputs({
        formName: 'checkoutForm',
        data: {
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          ...(hasPhysical && {
            address: shippingAddress?.address || '',
            city: shippingAddress?.city || '',
            state: shippingAddress?.state || '',
            zipPostalCode: shippingAddress?.zipPostalCode || '',
          }),
        },
      }),
    );
  }, [
    user,
    hasPhysical,
    shippingAddress?.address,
    shippingAddress?.city,
    shippingAddress?.state,
    shippingAddress?.zipPostalCode,
  ]);

  const isStep1Valid =
    !!inputs?.firstName?.trim() &&
    !!inputs?.lastName?.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs?.email || '');

  const isStep2Valid =
    !!inputs?.address?.trim() &&
    !!inputs?.city?.trim() &&
    !!inputs?.state &&
    !!inputs?.zipPostalCode?.trim();

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!inputs?.firstName?.trim()) newErrors.firstName = 'Required';
      if (!inputs?.lastName?.trim()) newErrors.lastName = 'Required';
      if (!inputs?.email?.trim()) newErrors.email = 'Required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) newErrors.email = 'Invalid email';
    }
    if (step === 2) {
      if (!inputs?.address?.trim()) newErrors.address = 'Required';
      if (!inputs?.city?.trim()) newErrors.city = 'Required';
      if (!inputs?.state) newErrors.state = 'Required';
      if (!inputs?.zipPostalCode?.trim()) newErrors.zipPostalCode = 'Required';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setStep(hasPhysical ? step + 1 : step + 2);
  };

  const handleBack = () => setStep(hasPhysical ? step - 1 : step - 2);

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: [step],
    createOrder: (_: any, actions: any) =>
      actions.order.create({
        purchase_units: [{ amount: { value: Number(totalPrice) } }],
        application_context: { shipping_preference: 'NO_SHIPPING' },
      }),
    onApprove: (_: any, actions: any) => {
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
              message: `Failed to create order — ${error?.data?.message}`,
              type: 'error',
            }),
          );
        } finally {
          setOrderLoader(false);
        }
      });
    },
  } as any;

  const toFixed = (n: number) => (n || 0).toFixed(2);

  return (
    <CheckoutForm
      step={step}
      inputs={inputs}
      errors={errors}
      handleInput={handleInput}
      handleNext={handleNext}
      handleBack={handleBack}
      isStep1Valid={isStep1Valid}
      isStep2Valid={isStep2Valid}
      hasPhysical={hasPhysical}
      cartItems={cartItems}
      subtotal={subtotal}
      shippingPrice={shippingPrice}
      totalPrice={totalPrice}
      payPalComponents={payPalComponents}
      orderLoader={orderLoader}
      toFixed={toFixed}
    />
  );
};

export default Checkout;
