import { PayPalButtons } from '@paypal/react-paypal-js';
import { Fragment, useState } from 'react';
import { useAppDispatch } from '../../redux/toolkitStore';
import { useCreateOrderMutation } from '../../redux/services/orderApi';
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../../redux/features/cart/cartSlice';
import ContactLoader from '../Loaders/ContactLoader/ContactLoader';
import toFixed from '../../utils/toFixed';

const CheckoutStep3 = ({ cart, step, inputs, isProduct, isWelcomeWiener, isEcard }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [orderLoader, setOrderLoader] = useState(false);
  const cartItemsAmount = cart.cartItemsAmount;
  const subtotal = cart.subtotal;
  const totalPrice = cart.totalPrice;
  const shippingPrice = cart.shippingPrice;
  const cartItems = cart.cartItems;

  const [createOrder] = useCreateOrderMutation();

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: [step.step3],
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: Number(toFixed(totalPrice)),
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
        const shippingAddress = {
          address: inputs?.address,
          city: inputs?.city,
          state: inputs?.state,
          zipPostalCode: inputs?.zipPostalCode,
        };

        await createOrder({
          name: inputs.name,
          orderItems: cartItems,
          subtotal,
          totalPrice,
          paypalOrderId: details.id,
          email: inputs.emailAddress,
          ...(isProduct && { shippingAddress }),
          shippingPrice,
          totalItems: cartItemsAmount,
          isProduct,
          isWelcomeWiener,
          isEcard,
          requiresShipping: isProduct,
          processingFee: cart?.processingFee,
        })
          .unwrap()
          .then((data: any) => {
            dispatch(resetCart());
            navigate(`/order/${data?.order?.orderId}`);
            setOrderLoader(false);
          })
          .catch((err: any) => {
            setOrderLoader(false);
          });
      });
    },
    onError: (err: any) => {
      console.error('ON ERROR: ', err);
    },
  } as any;

  return (
    <Fragment>
      {orderLoader && <ContactLoader text='Your donation is greatly appreciated' />}
      <div className='max-w-sm mx-auto'>
        <PayPalButtons
          style={payPalComponents.style}
          forceReRender={payPalComponents.forceRerender}
          createOrder={payPalComponents.createOrder}
          onApprove={payPalComponents.onApprove}
        />
      </div>
    </Fragment>
  );
};

export default CheckoutStep3;
